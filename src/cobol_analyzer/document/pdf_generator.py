import logging
from typing import Dict, Any, List
from datetime import datetime
import jinja2
import os
from weasyprint import HTML, CSS

class PDFGenerator:
    """PDFドキュメント生成クラス"""

    def __init__(self, template_dir: str):
        self.logger = logging.getLogger(__name__)
        self.template_dir = template_dir
        self.env = jinja2.Environment(
            loader=jinja2.FileSystemLoader(template_dir),
            autoescape=True
        )

    async def generate_single_analysis_pdf(self, 
                                         analysis_results: Dict[str, Any],
                                         file_info: Dict[str, Any],
                                         output_path: str) -> bool:
        """
        単一ソース解析のPDF生成
        Args:
            analysis_results: 解析結果
            file_info: ファイル情報
            output_path: 出力先パス
        Returns:
            bool: 生成が成功したかどうか
        """
        try:
            # HTMLテンプレートの読み込み
            template = self.env.get_template('single_analysis_pdf.html')
            
            # セクション情報の構築
            sections = self._build_sections(analysis_results)
            
            # ドキュメント制御設定の取得
            controls = self._get_document_controls()
            
            # 目次の生成
            if controls.get('include_table_of_contents') == 'true':
                table_of_contents = self._generate_table_of_contents(sections)
            else:
                table_of_contents = None

            # HTMLの生成
            html_content = template.render(
                file_info=file_info,
                analysis_results=analysis_results,
                sections=sections,
                table_of_contents=table_of_contents,
                controls=controls,
                generation_time=datetime.now().isoformat()
            )

            # CSSの読み込み
            css = CSS(filename=os.path.join(self.template_dir, 'pdf_styles.css'))

            # PDFの生成
            HTML(string=html_content).write_pdf(
                output_path,
                stylesheets=[css]
            )

            self.logger.info(f"単一ソース解析PDFを生成しました: {output_path}")
            return True

        except Exception as e:
            self.logger.error(f"単一ソース解析PDF生成エラー: {str(e)}")
            return False

    async def generate_summary_pdf(self,
                                 summary_results: Dict[str, Any],
                                 file_list: List[Dict[str, Any]],
                                 output_path: str) -> bool:
        """
        サマリ解析のPDF生成
        Args:
            summary_results: サマリ解析結果
            file_list: 解析対象ファイル情報のリスト
            output_path: 出力先パス
        Returns:
            bool: 生成が成功したかどうか
        """
        try:
            # HTMLテンプレートの読み込み
            template = self.env.get_template('summary_analysis_pdf.html')
            
            # セクション情報の構築
            sections = self._build_summary_sections(summary_results)
            
            # ドキュメント制御設定の取得
            controls = self._get_document_controls()
            
            # 目次の生成
            if controls.get('include_table_of_contents') == 'true':
                table_of_contents = self._generate_table_of_contents(sections)
            else:
                table_of_contents = None

            # HTMLの生成
            html_content = template.render(
                summary_results=summary_results,
                file_list=file_list,
                sections=sections,
                table_of_contents=table_of_contents,
                controls=controls,
                generation_time=datetime.now().isoformat()
            )

            # CSSの読み込み
            css = CSS(filename=os.path.join(self.template_dir, 'pdf_styles.css'))

            # PDFの生成
            HTML(string=html_content).write_pdf(
                output_path,
                stylesheets=[css]
            )

            self.logger.info(f"サマリ解析PDFを生成しました: {output_path}")
            return True

        except Exception as e:
            self.logger.error(f"サマリ解析PDF生成エラー: {str(e)}")
            return False

    def _get_document_controls(self) -> Dict[str, str]:
        """ドキュメント制御設定の取得"""
        try:
            # 設定の取得（実際はデータベースから取得）
            return {
                'include_table_of_contents': 'true',
                'enable_syntax_highlight': 'true',
                'page_numbers': 'true',
                'header_footer': 'true'
            }
        except Exception as e:
            self.logger.error(f"ドキュメント制御設定取得エラー: {str(e)}")
            return {}

    def _generate_table_of_contents(self, sections: List[Dict[str, Any]]) -> str:
        """
        目次の生成
        Args:
            sections: セクション情報のリスト
        Returns:
            str: 目次のHTML
        """
        try:
            template = self.env.get_template('table_of_contents.html')
            return template.render(sections=sections)
        except Exception as e:
            self.logger.error(f"目次生成エラー: {str(e)}")
            return ''

    def _build_sections(self, analysis_results: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        セクション情報の構築
        Args:
            analysis_results: 解析結果
        Returns:
            List[Dict[str, Any]]: セクション情報のリスト
        """
        try:
            return [
                {
                    'id': 'structure',
                    'title': '構造分析',
                    'subsections': [
                        {'id': 'program_info', 'title': 'プログラム基本情報'},
                        {'id': 'metrics', 'title': 'コードメトリクス'},
                        {'id': 'complexity', 'title': '複雑度分析'}
                    ]
                },
                {
                    'id': 'code_flow',
                    'title': 'コードフロー分析',
                    'subsections': [
                        {'id': 'control_flow', 'title': '制御フロー分析'},
                        {'id': 'data_flow', 'title': 'データフロー分析'},
                        {'id': 'integrated_flow', 'title': '統合フロー分析'}
                    ]
                },
                {
                    'id': 'quality',
                    'title': '品質分析',
                    'subsections': [
                        {'id': 'coding_standards', 'title': 'コーディング規約準拠性'},
                        {'id': 'problem_code', 'title': '問題コード検出'},
                        {'id': 'refactoring', 'title': 'リファクタリング提案'}
                    ]
                }
            ]
        except Exception as e:
            self.logger.error(f"セクション情報構築エラー: {str(e)}")
            return []

    def _build_summary_sections(self, summary_results: Dict[str, Any]) -> List[Dict[str, Any]]:
        """
        サマリ解析のセクション情報の構築
        Args:
            summary_results: サマリ解析結果
        Returns:
            List[Dict[str, Any]]: セクション情報のリスト
        """
        try:
            return [
                {
                    'id': 'overall_structure',
                    'title': '全体構造分析',
                    'subsections': [
                        {'id': 'program_hierarchy', 'title': 'プログラム階層構造の総合分析'},
                        {'id': 'code_flow', 'title': 'コードフローの総合分析'},
                        {'id': 'quality_metrics', 'title': '品質メトリクスの総合評価'}
                    ]
                },
                {
                    'id': 'system_dependencies',
                    'title': '依存関係の総合分析',
                    'subsections': [
                        {'id': 'system_integration', 'title': 'システム間連携の総合分析'},
                        {'id': 'data_flow', 'title': 'データフローの総合分析'},
                        {'id': 'interface', 'title': 'インターフェースの総合分析'}
                    ]
                },
                {
                    'id': 'diagnostics',
                    'title': '診断分析の総合評価',
                    'subsections': [
                        {'id': 'modernization', 'title': 'モダン化適性の総合評価'},
                        {'id': 'risk', 'title': 'リスクの総合定量化'},
                        {'id': 'migration', 'title': '移行優先度の総合評価'}
                    ]
                }
            ]
        except Exception as e:
            self.logger.error(f"サマリセクション情報構築エラー: {str(e)}")
            return []