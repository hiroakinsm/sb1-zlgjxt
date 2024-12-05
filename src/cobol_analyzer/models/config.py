from pydantic import BaseModel
from typing import Dict, Any, Optional

class DatabaseConfig(BaseModel):
    host: str
    port: int
    username: Optional[str]
    password: Optional[str]
    dbname: Optional[str]
    collections: Optional[Dict[str, str]]

class ServerConfig(BaseModel):
    host: str
    username: str
    password: Optional[str]
    source_path: Optional[str]

class Config(BaseModel):
    database: Dict[str, DatabaseConfig]
    servers: Dict[str, ServerConfig]
    logging: Dict[str, Any]