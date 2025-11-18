from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorClientOptions
from starlette.middleware.sessions import SessionMiddleware
from starlette.middleware.base import Request, Response
import os
import logging
import time
import hashlib
import hmac
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, field_validator
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
from contextlib import asynccontextmanager
import re
import json
import ssl
from collections import defaultdict, deque

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Environment variables with validation
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'monconbuild')
CORS_ORIGINS = os.environ.get('CORS_ORIGINS', '').split(',')
API_SECRET_KEY = os.environ.get('API_SECRET_KEY', '')
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

# MongoDB SSL/TLS configuration
MONGO_TLS = os.environ.get('MONGO_TLS', 'false').lower() == 'true'
MONGO_TLS_INSECURE = os.environ.get('MONGO_TLS_INSECURE', 'false').lower() == 'true'
MONGO_CA_FILE = os.environ.get('MONGO_CA_FILE')
MONGO_CERT_FILE = os.environ.get('MONGO_CERT_FILE')
MONGO_KEY_FILE = os.environ.get('MONGO_KEY_FILE')

# Rate limiting configuration
RATE_LIMIT_REQUESTS = int(os.environ.get('RATE_LIMIT_REQUESTS', '100'))
RATE_LIMIT_WINDOW = int(os.environ.get('RATE_LIMIT_WINDOW', '60'))  # seconds

# Global variables for database connection
client = None
db = None
rate_limit_store = defaultdict(deque)

class RateLimiter:
    """Thread-safe rate limiter using sliding window"""
    
    @staticmethod
    def is_rate_limited(identifier: str) -> bool:
        """Check if identifier is rate limited using sliding window"""
        current_time = time.time()
        window_start = current_time - RATE_LIMIT_WINDOW
        
        # Clean up old entries
        while rate_limit_store[identifier] and rate_limit_store[identifier][0] < window_start:
            rate_limit_store[identifier].popleft()
        
        # Check if limit exceeded
        if len(rate_limit_store[identifier]) >= RATE_LIMIT_REQUESTS:
            return True
        
        # Add current request
        rate_limit_store[identifier].append(current_time)
        return False

class AuthenticationMiddleware:
    """Simple API key based authentication"""
    
    @staticmethod
    async def verify_auth(request: Request) -> Dict[str, Any]:
        """Verify API key from header"""
        auth_header = request.headers.get("Authorization")
        
        if not auth_header:
            raise HTTPException(status_code=401, detail="Missing authorization header")
        
        if not auth_header.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Invalid authorization format")
        
        api_key = auth_header.split(" ")[1]
        
        # Simple API key verification (in production, use proper JWT or OAuth)
        if not API_SECRET_KEY or not hmac.compare_digest(api_key, API_SECRET_KEY):
            raise HTTPException(status_code=401, detail="Invalid API key")
        
        return {"user_id": "authenticated_user", "api_key": api_key[:8] + "..."}

async def rate_limit_middleware(request: Request, call_next):
    """Rate limiting middleware"""
    # Skip rate limiting for health checks
    if request.url.path in ["/health", "/"]:
        response = await call_next(request)
        return response
    
    # Get client identifier (IP + User Agent)
    client_ip = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("User-Agent", "unknown")
    identifier = f"{client_ip}:{hashlib.md5(user_agent.encode()).hexdigest()[:8]}"
    
    if RateLimiter.is_rate_limited(identifier):
        logger.warning(f"Rate limit exceeded for {identifier}")
        raise HTTPException(status_code=429, detail="Rate limit exceeded")
    
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    
    # Log slow requests
    if process_time > 2.0:
        logger.warning(f"Slow request: {request.method} {request.url.path} took {process_time:.2f}s")
    
    return response

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    global client, db
    
    try:
        # Validate required environment variables
        if not CORS_ORIGINS or not CORS_ORIGINS[0].strip():
            raise ValueError("CORS_ORIGINS environment variable must be set")
        
        # MongoDB connection with SSL/TLS configuration
        logger.info("Initializing MongoDB connection...")
        
        # Configure SSL/TLS options
        ssl_options = None
        if MONGO_TLS:
            ssl_options = AsyncIOMotorClientOptions(
                ssl=True,
                ssl_cert_reqs=ssl.CERT_NONE if MONGO_TLS_INSECURE else ssl.CERT_REQUIRED,
                ssl_ca_file=MONGO_CA_FILE if MONGO_CA_FILE else None,
                ssl_certfile=MONGO_CERT_FILE if MONGO_CERT_FILE else None,
                ssl_keyfile=MONGO_KEY_FILE if MONGO_KEY_FILE else None,
            )
        
        client = AsyncIOMotorClient(MONGO_URL, **ssl_options.__dict__ if ssl_options else {})
        
        # Test connection
        await client.admin.command('ping')
        db = client[DB_NAME]
        
        logger.info("MongoDB connection established successfully")
        
        # Create indexes for performance
        await db.status_checks.create_index([("timestamp", 1)])
        await db.status_checks.create_index([("client_name", 1)])
        
        yield
        
    except Exception as e:
        logger.error(f"Failed to initialize application: {e}")
        raise
    finally:
        # Cleanup
        if client:
            logger.info("Closing MongoDB connection...")
            client.close()

# Create FastAPI application
app = FastAPI(
    title="Monconbuild API",
    description="Secure API for Monument Construction website",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# Add middleware
app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(
    TrustedHostMiddleware, 
    allowed_hosts=ALLOWED_HOSTS
)

# Security headers middleware
@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Content-Security-Policy"] = "default-src 'self'"
    return response

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[origin.strip() for origin in CORS_ORIGINS if origin.strip()],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
)

# Add rate limiting middleware
app.middleware("http")(rate_limit_middleware)

# Create router with /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str = Field(..., min_length=1, max_length=100)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    
    @field_validator('client_name')
    @classmethod
    def validate_client_name(cls, v: str) -> str:
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

class ErrorResponse(BaseModel):
    error: str
    detail: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Routes
@api_router.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Monconbuild API",
        "version": "1.0.0",
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Check MongoDB connection
        if client:
            await client.admin.command('ping')
            db_status = "connected"
        else:
            db_status = "disconnected"
        
        return {
            "status": "healthy",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "database": db_status,
            "uptime": time.time()
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(status_code=503, detail="Service unavailable")

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(
    input: StatusCheckCreate,
    auth: Dict[str, Any] = Depends(AuthenticationMiddleware.verify_auth)
):
    """Create status check with authentication"""
    try:
        status_dict = input.model_dump()
        status_obj = StatusCheck(**status_dict)
        
        # Convert to dict and serialize datetime to ISO string for MongoDB
        doc = status_obj.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        doc['authenticated_user'] = auth.get('user_id')
        
        result = await db.status_checks.insert_one(doc)
        
        if result.inserted_id:
            logger.info(f"Status check created for user: {auth.get('user_id')}")
            return status_obj
        else:
            raise HTTPException(status_code=500, detail="Failed to create status check")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating status check: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks(
    limit: int = 100,
    auth: Dict[str, Any] = Depends(AuthenticationMiddleware.verify_auth)
):
    """Get status checks with authentication"""
    try:
        # Validate limit
        limit = min(max(limit, 1), 1000)  # Between 1 and 1000
        
        # Exclude MongoDB's _id field from the query results
        status_checks = await db.status_checks.find(
            {}, 
            {"_id": 0}
        ).sort("timestamp", -1).limit(limit).to_list(limit)
        
        # Convert ISO string timestamps back to datetime objects
        for check in status_checks:
            if isinstance(check.get('timestamp'), str):
                check['timestamp'] = datetime.fromisoformat(check['timestamp'])
        
        logger.info(f"Retrieved {len(status_checks)} status checks for user: {auth.get('user_id')}")
        return status_checks
        
    except Exception as e:
        logger.error(f"Error retrieving status checks: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Error handlers
@app.exception_handler(404)
async def not_found_handler(request: Request, exc: HTTPException):
    return {"error": "Not Found", "detail": "The requested resource was not found"}

@app.exception_handler(500)
async def internal_error_handler(request: Request, exc: Exception):
    logger.error(f"Internal server error: {exc}")
    return {"error": "Internal Server Error", "detail": "An internal error occurred"}

# Include router
app.include_router(api_router)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)