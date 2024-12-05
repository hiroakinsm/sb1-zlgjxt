import asyncio
import logging
from typing import Dict, Any, List
import yaml
from pathlib import Path

from cobol_analyzer.models.config import Config
from cobol_analyzer.database.data_manager import DataManager
from cobol_analyzer.analysis.ast_analyzer import ASTAnalyzer
from cobol_analyzer.analysis.data_flow_analyzer import DataFlowAnalyzer
from cobol_analyzer.analysis.control_flow_analyzer import ControlFlowAnalyzer
from cobol_analyzer.analysis.security_analyzer import SecurityAnalyzer
from cobol_analyzer.analysis.dependency_analyzer import DependencyAnalyzer
from cobol_analyzer.analysis.summary_analyzer import SummaryAnalyzer
from cobol_analyzer.document.document_generator import DocumentGenerator
from cobol_analyzer.utils.logger import setup_logger

async def analyze_source(ast_data: Dict[str, Any], file_info: Dict[str, Any]) -> Dict[str, Any]:
    """単一ソースの解析を実行"""
    # 各分析器のインスタンス化と実行（既存の実装）
    # ...（既存のコードは変更なし）

async def analyze_summary(data_manager: DataManager, file_list: List[str]) -> Dict[str, Any]:
    """
    複数ソースのサマリ解析を実行
    Args:
        data_manager: データマネージャインスタンス
        file_list: 解析対象ファイル名のリスト
    Returns:
        Dict[str, Any]: サマリ解析結果
    """
    summary_analyzer = SummaryAnalyzer(data_manager)
    return await summary_analyzer.analyze_summary(file_list)

async def main():
    try:
        # 設定ファイルの読み込みと初期化（既存の実装）
        config_path = Path('config/config.yml')
        with open(config_path) as f:
            config_data = yaml.safe_load(f)

        config = Config(**config_data)
        logger = setup_logger(config_data)
        data_manager = DataManager(config_data)
        await data_manager.initialize()

        # コマンドライン引数やAPIリクエストから解析モードと対象ファイルを取得
        # （ここでは例としてハードコード）
        analysis_mode = "summary"  # or "single"
        target_files = ["sample1.cbl", "sample2.cbl", "sample3.cbl"]

        if analysis_mode == "single":
            # 単一ソース解析（既存の実装）
            source_files = await data_manager.read_source_files()
            # ...（既存のコードは変更なし）

        elif analysis_mode == "summary":
            # サマリ解析の実行
            summary_results = await analyze_summary(data_manager, target_files)

            # ドキュメント生成
            doc_generator = DocumentGenerator('templates')
            doc_content = doc_generator.generate_summary_document(
                summary_results,
                target_files
            )

            # ドキュメントの保存
            output_path = "output/docs/summary_analysis.html"
            doc_generator.save_document(doc_content, output_path)

        # リソースのクリーンアップ
        await data_manager.close()

    except Exception as e:
        logger.error(f"メイン処理エラー: {str(e)}")
        raise

if __name__ == "__main__":
    asyncio.run(main())