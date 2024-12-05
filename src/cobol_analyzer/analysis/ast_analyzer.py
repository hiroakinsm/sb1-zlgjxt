import logging
from typing import Dict, Any, List, Optional
from datetime import datetime

class ASTAnalyzer:
    """ASTデータの解析クラス"""

    def __init__(self):
        self.logger = logging.getLogger(__name__)

    def analyze_structure(self, ast_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        プログラム構造の解析
        Args:
            ast_data: AST情報を含む辞書
        Returns:
            Dict[str, Any]: 解析結果
        """
        try:
            result = {
                'program_info': self._analyze_program_info(ast_data),
                'divisions': self._analyze_divisions(ast_data),
                'code_metrics': self._calculate_metrics(ast_data)
            }
            return result
        except Exception as e:
            self.logger.error(f"構造解析エラー: {str(e)}")
            raise

    def _analyze_program_info(self, ast_data: Dict[str, Any]) -> Dict[str, Any]:
        """プログラム基本情報の解析"""
        try:
            identification_div = ast_data.get('identification_division', {})
            return {
                'program_name': identification_div.get('program_id'),
                'author': identification_div.get('author'),
                'installation': identification_div.get('installation'),
                'date_written': identification_div.get('date_written'),
                'remarks': identification_div.get('remarks')
            }
        except Exception as e:
            self.logger.error(f"プログラム情報解析エラー: {str(e)}")
            return {}

    def _analyze_divisions(self, ast_data: Dict[str, Any]) -> Dict[str, Any]:
        """DIVISION構造の解析"""
        try:
            divisions = {}
            for div_name in ['identification_division', 'environment_division', 
                           'data_division', 'procedure_division']:
                if div_name in ast_data:
                    divisions[div_name] = self._analyze_division_content(
                        ast_data[div_name]
                    )
            return divisions
        except Exception as e:
            self.logger.error(f"DIVISION解析エラー: {str(e)}")
            return {}

    def _analyze_division_content(self, division_data: Dict[str, Any]) -> Dict[str, Any]:
        """各DIVISIONの内容解析"""
        try:
            return {
                'sections': self._get_sections(division_data),
                'line_count': self._count_lines(division_data),
                'complexity': self._calculate_division_complexity(division_data)
            }
        except Exception as e:
            self.logger.error(f"DIVISION内容解析エラー: {str(e)}")
            return {}

    def _calculate_metrics(self, ast_data: Dict[str, Any]) -> Dict[str, Any]:
        """コードメトリクスの計算"""
        try:
            return {
                'total_lines': self._count_total_lines(ast_data),
                'comment_lines': self._count_comment_lines(ast_data),
                'code_lines': self._count_code_lines(ast_data),
                'cyclomatic_complexity': self._calculate_cyclomatic_complexity(ast_data),
                'maintainability_index': self._calculate_maintainability_index(ast_data)
            }
        except Exception as e:
            self.logger.error(f"メトリクス計算エラー: {str(e)}")
            return {}

    def _get_sections(self, division_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """SECTIONの取得"""
        sections = []
        try:
            for section_name, section_data in division_data.get('sections', {}).items():
                sections.append({
                    'name': section_name,
                    'content': self._analyze_section_content(section_data)
                })
            return sections
        except Exception as e:
            self.logger.error(f"SECTION取得エラー: {str(e)}")
            return []

    def _analyze_section_content(self, section_data: Dict[str, Any]) -> Dict[str, Any]:
        """SECTIONの内容解析"""
        try:
            return {
                'paragraphs': self._get_paragraphs(section_data),
                'line_count': self._count_lines(section_data),
                'complexity': self._calculate_section_complexity(section_data)
            }
        except Exception as e:
            self.logger.error(f"SECTION内容解析エラー: {str(e)}")
            return {}

    def _get_paragraphs(self, section_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """PARAGRAPHの取得"""
        paragraphs = []
        try:
            for para_name, para_data in section_data.get('paragraphs', {}).items():
                paragraphs.append({
                    'name': para_name,
                    'content': self._analyze_paragraph_content(para_data)
                })
            return paragraphs
        except Exception as e:
            self.logger.error(f"PARAGRAPH取得エラー: {str(e)}")
            return []

    def _analyze_paragraph_content(self, para_data: Dict[str, Any]) -> Dict[str, Any]:
        """PARAGRAPHの内容解析"""
        try:
            return {
                'statements': self._get_statements(para_data),
                'line_count': self._count_lines(para_data),
                'complexity': self._calculate_paragraph_complexity(para_data)
            }
        except Exception as e:
            self.logger.error(f"PARAGRAPH内容解析エラー: {str(e)}")
            return {}

    def _get_statements(self, para_data: Dict[str, Any]) -> List[Dict[str, Any]]:
        """文の取得"""
        statements = []
        try:
            for stmt in para_data.get('statements', []):
                statements.append({
                    'type': stmt.get('type'),
                    'content': stmt.get('content'),
                    'line_number': stmt.get('line_number')
                })
            return statements
        except Exception as e:
            self.logger.error(f"文の取得エラー: {str(e)}")
            return []

    def _count_lines(self, node_data: Dict[str, Any]) -> int:
        """行数のカウント"""
        try:
            return len(node_data.get('source_lines', []))
        except Exception as e:
            self.logger.error(f"行数カウントエラー: {str(e)}")
            return 0

    def _calculate_division_complexity(self, division_data: Dict[str, Any]) -> int:
        """DIVISION複雑度の計算"""
        try:
            complexity = 0
            for section in division_data.get('sections', {}).values():
                complexity += self._calculate_section_complexity(section)
            return complexity
        except Exception as e:
            self.logger.error(f"DIVISION複雑度計算エラー: {str(e)}")
            return 0

    def _calculate_section_complexity(self, section_data: Dict[str, Any]) -> int:
        """SECTION複雑度の計算"""
        try:
            complexity = 0
            for para in section_data.get('paragraphs', {}).values():
                complexity += self._calculate_paragraph_complexity(para)
            return complexity
        except Exception as e:
            self.logger.error(f"SECTION複雑度計算エラー: {str(e)}")
            return 0

    def _calculate_paragraph_complexity(self, para_data: Dict[str, Any]) -> int:
        """PARAGRAPH複雑度の計算"""
        try:
            complexity = 1  # 基本複雑度
            for stmt in para_data.get('statements', []):
                if stmt.get('type') in ['IF', 'EVALUATE', 'PERFORM UNTIL']:
                    complexity += 1
            return complexity
        except Exception as e:
            self.logger.error(f"PARAGRAPH複雑度計算エラー: {str(e)}")
            return 1

    def _count_total_lines(self, ast_data: Dict[str, Any]) -> int:
        """総行数のカウント"""
        try:
            return len(ast_data.get('source_lines', []))
        except Exception as e:
            self.logger.error(f"総行数カウントエラー: {str(e)}")
            return 0

    def _count_comment_lines(self, ast_data: Dict[str, Any]) -> int:
        """コメント行数のカウント"""
        try:
            return len([line for line in ast_data.get('source_lines', [])
                       if line.strip().startswith('*')])
        except Exception as e:
            self.logger.error(f"コメント行数カウントエラー: {str(e)}")
            return 0

    def _count_code_lines(self, ast_data: Dict[str, Any]) -> int:
        """実行コード行数のカウント"""
        try:
            total = self._count_total_lines(ast_data)
            comments = self._count_comment_lines(ast_data)
            empty = len([line for line in ast_data.get('source_lines', [])
                        if not line.strip()])
            return total - comments - empty
        except Exception as e:
            self.logger.error(f"コード行数カウントエラー: {str(e)}")
            return 0

    def _calculate_cyclomatic_complexity(self, ast_data: Dict[str, Any]) -> int:
        """循環的複雑度の計算"""
        try:
            complexity = 1  # 基本複雑度
            for div in ast_data.values():
                if isinstance(div, dict):
                    complexity += self._calculate_division_complexity(div)
            return complexity
        except Exception as e:
            self.logger.error(f"循環的複雑度計算エラー: {str(e)}")
            return 1

    def _calculate_maintainability_index(self, ast_data: Dict[str, Any]) -> float:
        """保守性指標の計算"""
        try:
            # 保守性指標の計算式
            # MI = 171 - 5.2 * ln(HV) - 0.23 * CC - 16.2 * ln(LOC)
            # HV: Halstead Volume
            # CC: Cyclomatic Complexity
            # LOC: Lines of Code
            cc = self._calculate_cyclomatic_complexity(ast_data)
            loc = self._count_code_lines(ast_data)
            hv = 1000  # 仮の値（実際にはHalstead Volumeを計算する必要がある）

            from math import log
            mi = 171 - 5.2 * log(hv) - 0.23 * cc - 16.2 * log(loc)
            return round(max(0, min(100, mi)), 2)
        except Exception as e:
            self.logger.error(f"保守性指標計算エラー: {str(e)}")
            return 0.0