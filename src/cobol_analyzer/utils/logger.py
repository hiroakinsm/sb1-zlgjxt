import logging
import os
from datetime import datetime
from typing import Dict, Any

def setup_logger(config: Dict[str, Any]) -> logging.Logger:
    """
    ロガーの設定
    Args:
        config: ログ設定を含む辞書
    Returns:
        logging.Logger: 設定されたロガー
    """
    try:
        # ログディレクトリの作成
        log_dir = os.path.dirname(config['logging']['file'])
        os.makedirs(log_dir, exist_ok=True)

        # ロガーの基本設定
        logging.basicConfig(
            level=getattr(logging, config['logging']['level']),
            format=config['logging']['format'],
            handlers=[
                logging.FileHandler(config['logging']['file']),
                logging.StreamHandler()
            ]
        )

        logger = logging.getLogger(__name__)
        logger.info("ロガーの設定が完了しました")
        return logger

    except Exception as e:
        print(f"ロガー設定エラー: {str(e)}")
        raise