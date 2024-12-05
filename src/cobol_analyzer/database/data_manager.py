import os
import logging
from typing import Dict, List, Any, Optional
from datetime import datetime
import asyncio
import asyncpg
import motor.motor_asyncio
from pymilvus import connections, Collection, utility
import paramiko
from pathlib import Path

class DataManager:
    """データ管理クラス"""

    def __init__(self, config: Dict[str, Any]):
        """
        初期化
        Args:
            config: 設定情報を含む辞書
        """
        self.config = config
        self.logger = logging.getLogger(__name__)

        # データベース接続情報
        self.pg_pool = None  # PostgreSQL connection pool
        self.mongo_client = None  # MongoDB client
        self.milvus_collection = None  # Milvus collection

        # SSHクライアント
        self.ssh_client = None

    async def initialize(self) -> bool:
        """
        各種接続の初期化
        Returns:
            bool: 初期化が成功したかどうか
        """
        try:
            # PostgreSQL接続プール作成
            self.pg_pool = await asyncpg.create_pool(
                user=self.config['postgresql']['user'],
                password=self.config['postgresql']['password'],
                database=self.config['postgresql']['dbname'],
                host=self.config['postgresql']['host'],
                port=self.config['postgresql']['port']
            )
            self.logger.info("PostgreSQL接続プール作成完了")

            # MongoDB接続
            self.mongo_client = motor.motor_asyncio.AsyncIOMotorClient(
                f"mongodb://{self.config['mongodb']['username']}:"
                f"{self.config['mongodb']['password']}@"
                f"{self.config['mongodb']['host']}:"
                f"{self.config['mongodb']['port']}"
            )
            self.logger.info("MongoDB接続完了")

            # Milvus接続
            connections.connect(
                alias="default",
                host=self.config['milvus']['host'],
                port=self.config['milvus']['port']
            )
            self.logger.info("Milvus接続完了")

            self.logger.info("データマネージャの初期化が完了しました")
            return True

        except Exception as e:
            self.logger.error(f"初期化エラー: {str(e)}")
            raise

    async def read_source_files(self) -> List[Dict[str, Any]]:
        """
        ソースファイルの読み込み
        Returns:
            List[Dict[str, Any]]: 読み込んだファイル情報のリスト
        """
        try:
            # SSH接続
            self.ssh_client = paramiko.SSHClient()
            self.ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            
            self.logger.info(f"SSH接続を開始: {self.config['source_server']['host']}")
            self.ssh_client.connect(
                hostname=self.config['source_server']['host'],
                username=self.config['source_server']['username'],
                password=self.config['source_server']['password']
            )

            source_path = self.config['source_server']['source_path']
            
            # ファイル一覧取得
            sftp = self.ssh_client.open_sftp()
            files = sftp.listdir(source_path)

            source_files = []
            for file_name in files:
                if file_name.endswith(('.cbl', '.cob', '.CBL', '.COB')):
                    file_path = os.path.join(source_path, file_name)
                    file_stat = sftp.stat(file_path)

                    # ファイル内容の読み込み
                    with sftp.open(file_path, 'r') as f:
                        content = f.read().decode('utf-8')

                    source_files.append({
                        'file_name': file_name,
                        'content': content,
                        'size': file_stat.st_size,
                        'modified_time': datetime.fromtimestamp(file_stat.st_mtime)
                    })

            self.logger.info(f"{len(source_files)}個のソースファイルを読み込みました")
            return source_files

        except Exception as e:
            self.logger.error(f"ファイル読み込みエラー: {str(e)}")
            raise
        finally:
            if self.ssh_client:
                self.ssh_client.close()

    async def update_postgresql_metadata(self, file_info: Dict[str, Any]) -> bool:
        """
        PostgreSQLメタデータの更新
        Args:
            file_info: ファイル情報を含む辞書
        Returns:
            bool: 更新が成功したかどうか
        """
        try:
            async with self.pg_pool.acquire() as conn:
                # 既存のメタデータを取得
                existing = await conn.fetchrow(
                    """
                    SELECT * FROM metadata 
                    WHERE file_name = $1
                    """,
                    file_info['file_name']
                )

                if existing:
                    # 新しい処理情報を追加
                    await conn.execute(
                        """
                        UPDATE metadata 
                        SET additional_info = additional_info || $1::jsonb,
                            last_modified = $2,
                            processing_duration = $3
                        WHERE file_name = $4
                        """,
                        {
                            'doc_generation': {
                                'started_at': datetime.now().isoformat(),
                                'file_size': file_info['size'],
                                'status': 'processing'
                            }
                        },
                        file_info['modified_time'],
                        None,  # processing_duration will be updated later
                        file_info['file_name']
                    )
                else:
                    # 新規メタデータの作成
                    await conn.execute(
                        """
                        INSERT INTO metadata (
                            file_name, file_size, last_modified, additional_info
                        ) VALUES ($1, $2, $3, $4)
                        """,
                        file_info['file_name'],
                        file_info['size'],
                        file_info['modified_time'],
                        {
                            'doc_generation': {
                                'started_at': datetime.now().isoformat(),
                                'status': 'processing'
                            }
                        }
                    )

                self.logger.info(f"PostgreSQLメタデータを更新: {file_info['file_name']}")
                return True

        except Exception as e:
            self.logger.error(f"PostgreSQLメタデータ更新エラー: {str(e)}")
            return False

    async def update_mongodb_ast(self, file_info: Dict[str, Any], ast_data: Dict[str, Any]) -> bool:
        """
        MongoDB ASTデータの更新
        Args:
            file_info: ファイル情報を含む辞書
            ast_data: AST情報を含む辞書
        Returns:
            bool: 更新が成功したかどうか
        """
        try:
            db = self.mongo_client[self.config['mongodb']['db']]
            collection = db[self.config['mongodb']['collections']['ast']]

            # 既存のドキュメントを検索
            existing = await collection.find_one({'file_name': file_info['file_name']})

            if existing:
                # 新しい処理情報を追加
                result = await collection.update_one(
                    {'file_name': file_info['file_name']},
                    {
                        '$set': {
                            'last_modified': file_info['modified_time'],
                            'doc_generation': {
                                'started_at': datetime.now().isoformat(),
                                'status': 'processing'
                            }
                        }
                    }
                )
            else:
                # 新規ドキュメントの作成
                result = await collection.insert_one({
                    'file_name': file_info['file_name'],
                    'ast': ast_data,
                    'last_modified': file_info['modified_time'],
                    'doc_generation': {
                        'started_at': datetime.now().isoformat(),
                        'status': 'processing'
                    }
                })

            self.logger.info(f"MongoDB ASTデータを更新: {file_info['file_name']}")
            return True

        except Exception as e:
            self.logger.error(f"MongoDB AST更新エラー: {str(e)}")
            return False

    async def close(self):
        """リソースのクリーンアップ"""
        try:
            if self.pg_pool:
                await self.pg_pool.close()
                self.logger.info("PostgreSQL接続をクローズしました")

            if self.mongo_client:
                self.mongo_client.close()
                self.logger.info("MongoDB接続をクローズしました")

            connections.disconnect("default")
            self.logger.info("Milvus接続をクローズしました")

            if self.ssh_client and self.ssh_client.get_transport():
                self.ssh_client.close()
                self.logger.info("SSH接続をクローズしました")

            self.logger.info("全ての接続をクローズしました")

        except Exception as e:
            self.logger.error(f"クリーンアップエラー: {str(e)}")