from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import List
import uuid
from datetime import datetime, timezone
from contextlib import asynccontextmanager
import re

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection will be managed by lifespan
mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']
client = None
db = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize MongoDB connection
    global client, db
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    yield
    # Shutdown: Close MongoDB connection
    if client:
        client.close()

# Create the main app with lifespan handler
app = FastAPI(lifespan=lifespan)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str = Field(..., min_length=1, max_length=100)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    @field_validator('client_name')
    @classmethod
    def validate_client_name(cls, v: str) -> str:
        # Allow alphanumeric, spaces, hyphens, and underscores
        if not re.match(r'^[a-zA-Z0-9\s\-_]+$', v):
            raise ValueError('Client name contains invalid characters')
        return v.strip()

class StatusCheckCreate(BaseModel):
    client_name: str = Field(..., min_length=1, max_length=100)
    
    @field_validator('client_name')
    @classmethod
    def validate_client_name(cls, v: str) -> str:
        if not re.match(r'^[a-zA-Z0-9\s\-_]+$', v):
            raise ValueError('Client name contains invalid characters')
        return v.strip()

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

# CORS configuration - must specify allowed origins explicitly
cors_origins = os.environ.get('CORS_ORIGINS', '')
if not cors_origins:
    raise ValueError("CORS_ORIGINS environment variable must be set")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[origin.strip() for origin in cors_origins.split(',')],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)