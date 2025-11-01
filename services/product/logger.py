import os
import sys
from loguru import logger

from config import Config

LOG_DIR = os.path.join(os.getcwd(), "logs")
os.makedirs(LOG_DIR, exist_ok=True)


LOG_FORMAT = "{time:YYYY-MM-DD HH:mm:ss} | {level} | {message}"

logger.remove()

logger.add(f"{LOG_DIR}/info.log", level="INFO", format=LOG_FORMAT, rotation="1 MB", compression="zip")
logger.add(f"{LOG_DIR}/debug.log", level="DEBUG", format=LOG_FORMAT, rotation="1 MB", compression="zip")
logger.add(f"{LOG_DIR}/error.log", level="ERROR", format=LOG_FORMAT, rotation="1 MB", compression="zip")
logger.add(f"{LOG_DIR}/all.log", level="TRACE", format=LOG_FORMAT, rotation="1 MB", compression="zip")

if Config.ENVIRONMENT == "development":
    logger.add(sys.stdout, level="DEBUG", format=LOG_FORMAT)

