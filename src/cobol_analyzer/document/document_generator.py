import logging
from typing import Dict, Any, List, Optional
from datetime import datetime
import jinja2
import os

class DocumentGenerator:
    """ドキュメント生成クラス"""

    def __init__(self, template_dir: str):
        self.logger = logging.getLogger(__name__)
        self.template_dir = template_dir
        self.env = jinja2.Environment(
            loader=jinja2.FileSystemLoader(template_dir),
            autoescape=True
        )

    def generate_single_analysis_document(self, 
                                        analysis_results: Dict[str, Any],
                                        file_info: Dict[str, Any]) -> str:
        """
        単一ソース解析結果のドキュメント生成
        Args:
            analysis_results: 解析結果
            file_info: ファイル情報
        Returns:
            str: 生成されたドキュメント
        """
        try:
            template = self.env.get_template('single_analysis.html')
            return template.render(
                analysis_results=analysis_results,
                file_info=file_info,
                generation_time=datetime.now().isoformat()
            )
        except Exception as e:
            self.logger.error(f"単一解析ドキュメント生成エラー: {str(e)}")
            raise

    def generate_summary_document(self, 
                                summary_results: Dict[str, Any],
                                file_list: List[Dict[str, Any]]) -> str:
        """
        サマリ解析結果のドキュメント生成
        Args:
            summary_results: サマリ解析結果
            file_list: 解析対象ファイル情報のリスト
        Returns:
            str: 生成されたドキュメント
        """
        try:
            template = self.env.get_template('summary_analysis.html')
            return template.render(
                summary_results=summary_results,
                file_list=file_list,
                generation_time=datetime.now().isoformat()
            )
        except Exception as e:
            self.logger.error(f"サマリ解析ドキュメント生成エラー: {str(e)}")
            raise

    def generate_mermaid_diagram(self, 
                               diagram_type: str,
                               diagram_data: Dict[str, Any]) -> str:
        """
        Mermaidダイアグラムの生成
        Args:
            diagram_type: ダイアグラムの種類
            diagram_data: ダイアグラムデータ
        Returns:
            str: Mermaid記法のダイアグラム
        """
        try:
            template = self.env.get_template(f'mermaid_{diagram_type}.txt')
            return template.render(diagram_data=diagram_data)
        except Exception as e:
            self.logger.error(f"Mermaidダイアグラム生成エラー: {str(e)}")
            raise

    def save_document(self, content: str, output_path: str) -> bool:
        """
        ドキュメントの保存
        Args:
            content: ドキュメント内容
            output_path: 出力先パス
        Returns:
            bool: 保存が成功したかどうか
        """
        try:
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(content)
            self.logger.info(f"ドキュメントを保存しました: {output_path}")
            return True
        except Exception as e:
            self.logger.error(f"ドキュメント保存エラー: {str(e)}")
            return False