import logging
from typing import Dict, Any, List
from datetime import datetime

class SummaryAnalyzer:
    """サマリ解析クラス"""

    def __init__(self, data_manager):
        self.logger = logging.getLogger(__name__)
        self.data_manager = data_manager

    async def analyze_summary(self, file_list: List[str]) -> Dict[str, Any]:
        """
        複数ソースのサマリ解析を実行
        Args:
            file_list: 解析対象ファイル名のリスト
        Returns:
            Dict[str, Any]: サマリ解析結果
        """
        try:
            # 解析タスクの作成
            task_id = await self._create_summary_task(file_list)

            # 各ファイルの解析データを取得または生成
            analysis_data = await self._get_or_create_analysis_data(file_list)

            # サマリ解析の実行
            summary_results = {
                'total_metrics': self._calculate_total_metrics(analysis_data),
                'complexity_distribution': self._analyze_complexity_distribution(analysis_data),
                'common_patterns': self._identify_common_patterns(analysis_data),
                'quality_metrics': self._calculate_quality_metrics(analysis_data),
                'security_overview': self._analyze_security_overview(analysis_data),
                'dependency_graph': self._create_dependency_graph(analysis_data)
            }

            # 解析結果をデータベースに保存
            await self._save_summary_results(task_id, summary_results)

            return summary_results

        except Exception as e:
            self.logger.error(f"サマリ解析エラー: {str(e)}")
            raise

    async def _create_summary_task(self, file_list: List[str]) -> int:
        """サマリ解析タスクの作成"""
        try:
            async with self.data_manager.pg_pool.acquire() as conn:
                task_id = await conn.fetchval(
                    """
                    INSERT INTO analysis_tasks (
                        task_type, status, target_sources, started_at
                    ) VALUES (
                        'summary', 'processing', $1, $2
                    ) RETURNING id
                    """,
                    {'files': file_list},
                    datetime.now()
                )
                return task_id
        except Exception as e:
            self.logger.error(f"タスク作成エラー: {str(e)}")
            raise

    async def _get_or_create_analysis_data(self, file_list: List[str]) -> List[Dict[str, Any]]:
        """解析データの取得または生成"""
        analysis_data = []
        try:
            for file_name in file_list:
                # PostgreSQLから解析結果を検索
                async with self.data_manager.pg_pool.acquire() as conn:
                    existing_analysis = await conn.fetchrow(
                        """
                        SELECT * FROM single_analysis_results
                        WHERE file_name = $1
                        ORDER BY created_at DESC
                        LIMIT 1
                        """,
                        file_name
                    )

                if existing_analysis:
                    # 既存の解析結果を使用
                    analysis_data.append(existing_analysis)
                else:
                    # 単一解析を実行
                    from cobol_analyzer.main import analyze_source
                    
                    # ソースファイルの読み込み
                    file_info = await self._get_source_file(file_name)
                    
                    # ASTデータの取得
                    ast_data = await self._get_ast_data(file_name)
                    
                    # 単一解析の実行
                    analysis_result = await analyze_source(ast_data, file_info)
                    
                    # 解析結果の保存
                    await self._save_single_analysis(analysis_result)
                    
                    analysis_data.append(analysis_result)

            return analysis_data

        except Exception as e:
            self.logger.error(f"解析データ取得エラー: {str(e)}")
            raise

    async def _save_summary_results(self, task_id: int, summary_results: Dict[str, Any]) -> None:
        """サマリ解析結果の保存"""
        try:
            async with self.data_manager.pg_pool.acquire() as conn:
                # サマリ解析結果の保存
                await conn.execute(
                    """
                    INSERT INTO summary_analysis_results (
                        task_id, analysis_category, analysis_item, analysis_data
                    ) VALUES ($1, $2, $3, $4)
                    """,
                    task_id,
                    'summary',
                    'total_analysis',
                    summary_results
                )

                # タスクステータスの更新
                await conn.execute(
                    """
                    UPDATE analysis_tasks
                    SET status = 'completed',
                        completed_at = $1
                    WHERE id = $2
                    """,
                    datetime.now(),
                    task_id
                )

        except Exception as e:
            self.logger.error(f"サマリ結果保存エラー: {str(e)}")
            raise

    def _calculate_total_metrics(self, analysis_data: List[Dict[str, Any]]) -> Dict[str, Any]:
        """全体メトリクスの計算"""
        try:
            total_lines = sum(d['structure_analysis']['code_metrics']['total_lines'] 
                            for d in analysis_data)
            code_lines = sum(d['structure_analysis']['code_metrics']['code_lines'] 
                           for d in analysis_data)
            comment_lines = sum(d['structure_analysis']['code_metrics']['comment_lines'] 
                              for d in analysis_data)
            
            return {
                'total_lines': total_lines,
                'code_lines': code_lines,
                'comment_lines': comment_lines,
                'avg_cyclomatic_complexity': self._calculate_avg_complexity(analysis_data),
                'avg_maintainability_index': self._calculate_avg_maintainability(analysis_data),
                'comment_rate': (comment_lines / total_lines * 100) if total_lines > 0 else 0,
                'duplicate_code_rate': self._calculate_duplicate_code_rate(analysis_data)
            }
        except Exception as e:
            self.logger.error(f"メトリクス計算エラー: {str(e)}")
            return {}

    def _analyze_complexity_distribution(self, analysis_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """複雑度分布の分析"""
        try:
            return [
                {
                    'x': d['structure_analysis']['code_metrics']['total_lines'],
                    'y': d['structure_analysis']['code_metrics']['cyclomatic_complexity']
                }
                for d in analysis_data
            ]
        except Exception as e:
            self.logger.error(f"複雑度分布分析エラー: {str(e)}")
            return []

    def _identify_common_patterns(self, analysis_data: List[Dict[str, Any]]) -> Dict[str, Any]:
        """共通パターンの特定"""
        try:
            return {
                'code_patterns': self._analyze_code_patterns(analysis_data),
                'data_structures': self._analyze_data_structures(analysis_data),
                'control_flows': self._analyze_control_flows(analysis_data)
            }
        except Exception as e:
            self.logger.error(f"共通パターン特定エラー: {str(e)}")
            return {}