# Comprehensive Security Checklist & Audit Guide
## Monument Construction Website Security Assessment

**Technology Stack:**
- **Frontend**: React 19, Create React App, Radix UI, Tailwind CSS
- **Backend**: FastAPI (Python), MongoDB (Motor)
- **Deployment**: Vercel (Frontend), Custom server (Backend)
- **Package Managers**: npm/yarn (Frontend), pip (Backend)

---

## Table of Contents
1. [SSL/TLS & HTTPS Enforcement](#1-ssltls--https-enforcement)
2. [Dependency Vulnerability Scanning](#2-dependency-vulnerability-scanning)
3. [OWASP Top 10 Testing](#3-owasp-top-10-testing)
4. [Security HTTP Headers Audit](#4-security-http-headers-audit)
5. [Malware & Blacklist Scanning](#5-malware--blacklist-scanning)
6. [Access Control & Authentication](#6-access-control--authentication)
7. [Automated Security Monitoring](#7-automated-security-monitoring)

---

## 1. SSL/TLS & HTTPS Enforcement

### ✅ Manual Checks

#### Check SSL Certificate Validity
```bash
# Using OpenSSL
openssl s_client -connect www.monconbuild.com:443 -servername www.monconbuild.com < /dev/null 2>/dev/null | openssl x509 -noout -dates -subject -issuer

# Expected output should show:
# - Valid notBefore and notAfter dates
# - Subject: CN=www.monconbuild.com
# - Issuer: Trusted CA (Let's Encrypt, DigiCert, etc.)
```

#### Check SSL Labs Grade
```bash
# Visit SSL Labs (automated via API)
curl -s "https://api.ssllabs.com/api/v3/analyze?host=www.monconbuild.com" | jq '.endpoints[0].grade'

# Target grade: A or A+
```

#### Verify HTTPS Redirect
```bash
# Test HTTP to HTTPS redirect
curl -I http://www.monconbuild.com 2>&1 | grep -i location

# Should return: Location: https://www.monconbuild.com
```

### 🔧 Tools & Automation

**Install SSL Testing Tools:**
```bash
# Install testssl.sh
git clone --depth 1 https://github.com/drwetter/testssl.sh.git
cd testssl.sh
./testssl.sh https://www.monconbuild.com

# Or use Docker
docker run --rm -ti drwetter/testssl.sh https://www.monconbuild.com
```

### 📋 Checklist

- [ ] Valid SSL certificate from trusted CA
- [ ] Certificate expiry > 30 days
- [ ] HTTP redirects to HTTPS (301 permanent redirect)
- [ ] HSTS header enabled (Strict-Transport-Security)
- [ ] TLS 1.2 or higher only (TLS 1.0/1.1 disabled)
- [ ] Strong cipher suites enabled
- [ ] SSL Labs grade: A or A+
- [ ] No mixed content warnings (HTTP resources on HTTPS pages)
- [ ] Certificate chain complete and valid

### ⚙️ Vercel Configuration

Your site is deployed on Vercel, which automatically provides:
- Free SSL certificates via Let's Encrypt
- Automatic HTTPS redirect
- HTTP/2 and HTTP/3 support

**Verify in `vercel.json`:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        }
      ]
    }
  ]
}
```

---

## 2. Dependency Vulnerability Scanning

### 🔍 Frontend (React/npm)

#### npm audit
```bash
cd frontend

# Check for vulnerabilities
npm audit

# Fix automatically fixable vulnerabilities
npm audit fix

# Force fix (may introduce breaking changes)
npm audit fix --force

# Generate detailed report
npm audit --json > security-audit-report.json
```

#### Yarn audit
```bash
cd frontend

# Check for vulnerabilities
yarn audit

# Fix vulnerabilities
yarn upgrade-interactive --latest
```

#### Install and use Snyk
```bash
# Install Snyk CLI
npm install -g snyk

# Authenticate
snyk auth

# Test for vulnerabilities
cd frontend
snyk test

# Monitor project
snyk monitor

# Test and fix
snyk test --severity-threshold=high
```

#### Install and use npm-check-updates
```bash
# Check for outdated packages
npm install -g npm-check-updates

cd frontend
ncu

# Update all to latest
ncu -u
npm install
```

### 🐍 Backend (Python/pip)

#### Safety (Python dependency checker)
```bash
cd backend

# Install Safety
pip install safety

# Check dependencies
safety check

# Check with detailed output
safety check --full-report

# Save report
safety check --json > backend-security-report.json
```

#### pip-audit
```bash
# Install pip-audit
pip install pip-audit

cd backend

# Scan dependencies
pip-audit

# Output to JSON
pip-audit --format json > backend-audit.json
```

#### Bandit (Python code security scanner)
```bash
# Install Bandit
pip install bandit

cd backend

# Scan Python code
bandit -r . -f json -o bandit-report.json

# Scan with specific severity
bandit -r . -ll  # Only medium and high severity
```

### 📋 Dependency Security Checklist

- [ ] No critical or high-severity vulnerabilities in npm packages
- [ ] No critical or high-severity vulnerabilities in pip packages
- [ ] All dependencies are up to date (or documented exceptions)
- [ ] No deprecated packages in use
- [ ] Dependencies reviewed for known malware/typosquatting
- [ ] Lock files (package-lock.json, requirements.txt) committed
- [ ] Regular automated scans scheduled (weekly minimum)
- [ ] Dependabot or Renovate bot enabled on GitHub

### 🤖 GitHub Dependabot Setup

Create `.github/dependabot.yml`:
```yaml
version: 2
updates:
  # Frontend dependencies
  - package-ecosystem: "npm"
    directory: "/frontend"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    reviewers:
      - "klassiik"
    labels:
      - "dependencies"
      - "security"

  # Backend dependencies
  - package-ecosystem: "pip"
    directory: "/backend"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    reviewers:
      - "klassiik"
    labels:
      - "dependencies"
      - "security"
```

---

## 3. OWASP Top 10 Testing

### 🛡️ XSS (Cross-Site Scripting)

#### Manual Testing
```bash
# Test common XSS payloads in all form inputs
# Contact form, search boxes, URL parameters, etc.

# Common payloads to test:
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>
javascript:alert('XSS')
"><script>alert('XSS')</script>
```

#### React Built-in Protection
React automatically escapes content rendered in JSX, but verify:
- No use of `dangerouslySetInnerHTML` without sanitization
- User input is never directly inserted into `innerHTML`
- URLs are validated before use in `href` or `src`

#### Code Review Checks
```bash
# Search for dangerous patterns in your codebase
cd frontend/src

# Check for dangerouslySetInnerHTML
grep -r "dangerouslySetInnerHTML" .

# Check for innerHTML usage
grep -r "innerHTML" .

# Check for eval usage
grep -r "eval(" .
```

#### Install DOMPurify (if needed)
```bash
cd frontend
npm install dompurify
npm install --save-dev @types/dompurify
```

**Usage Example:**
```javascript
import DOMPurify from 'dompurify';

// Sanitize user content before rendering
const cleanHTML = DOMPurify.sanitize(userContent);
<div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
```

### 💉 SQL/NoSQL Injection

#### MongoDB Injection Prevention

**Current Risk Assessment:**
Your FastAPI backend uses Pydantic models and Motor (async MongoDB driver). Review:

```python
# ✅ SAFE - Using Pydantic validation
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    # This is parameterized and safe

# ❌ UNSAFE - Direct query string interpolation (AVOID)
query = f"SELECT * FROM users WHERE name = '{user_input}'"

# ✅ SAFE - Parameterized queries
query = {"client_name": user_input}
results = await db.status_checks.find(query)
```

#### Security Audit Script for Backend
```bash
cd backend

# Check for unsafe query patterns
grep -rn "\$where" . --include="*.py"
grep -rn "eval" . --include="*.py"
grep -rn "exec(" . --include="*.py"

# Check for string interpolation in queries
grep -rn "f\".*{.*}.*\"" . --include="*.py" | grep -i "find\|insert\|update\|delete"
```

#### Pydantic Validation Enhancement
```python
# Add to server.py for stricter validation
from pydantic import BaseModel, Field, validator
import re

class StatusCheckCreate(BaseModel):
    client_name: str = Field(..., min_length=1, max_length=100)
    
    @validator('client_name')
    def validate_client_name(cls, v):
        # Allow only alphanumeric, spaces, hyphens
        if not re.match(r'^[a-zA-Z0-9\s\-]+$', v):
            raise ValueError('Invalid characters in client name')
        return v.strip()
```

### 🔐 CSRF (Cross-Site Request Forgery)

#### Current Status
- Your API uses CORS middleware, which provides some protection
- For forms, implement CSRF tokens for state-changing operations

#### Install CSRF Protection for FastAPI
```bash
cd backend
pip install fastapi-csrf-protect
```

**Implementation Example:**
```python
from fastapi_csrf_protect import CsrfProtect
from pydantic import BaseModel

class CsrfSettings(BaseModel):
    secret_key: str = os.getenv('CSRF_SECRET_KEY', 'your-secret-key-here')

@CsrfProtect.load_config
def get_csrf_config():
    return CsrfSettings()

# Use in routes that modify data
@api_router.post("/status")
async def create_status_check(
    input: StatusCheckCreate,
    csrf_protect: CsrfProtect = Depends()
):
    await csrf_protect.validate_csrf(request)
    # ... rest of endpoint
```

#### Frontend CSRF Token Handling
```javascript
// In your axios requests
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // Send cookies with requests
});

// Intercept requests to add CSRF token
api.interceptors.request.use((config) => {
  const csrfToken = getCookie('csrf_token');
  if (csrfToken) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }
  return config;
});
```

### 📋 OWASP Top 10 Checklist

- [ ] **A01:2021 - Broken Access Control**: Verify authentication on all protected endpoints
- [ ] **A02:2021 - Cryptographic Failures**: Use HTTPS everywhere, encrypt sensitive data
- [ ] **A03:2021 - Injection**: Validate all inputs, use parameterized queries
- [ ] **A04:2021 - Insecure Design**: Security requirements in design phase
- [ ] **A05:2021 - Security Misconfiguration**: Remove default credentials, error messages
- [ ] **A06:2021 - Vulnerable Components**: Keep dependencies updated (see section 2)
- [ ] **A07:2021 - Authentication Failures**: Implement MFA, strong password policies
- [ ] **A08:2021 - Software Integrity Failures**: Use SRI for CDN resources
- [ ] **A09:2021 - Logging Failures**: Log security events, monitor logs
- [ ] **A10:2021 - Server-Side Request Forgery**: Validate and sanitize URLs

### 🔧 Automated OWASP Testing

#### OWASP ZAP (Zed Attack Proxy)
```bash
# Install OWASP ZAP
# Download from: https://www.zaproxy.org/download/

# Or use Docker
docker pull zaproxy/zap-stable

# Run baseline scan
docker run -t zaproxy/zap-stable zap-baseline.py -t https://www.monconbuild.com

# Full scan (takes longer)
docker run -t zaproxy/zap-stable zap-full-scan.py -t https://www.monconbuild.com
```

#### Nikto Web Scanner
```bash
# Install Nikto
git clone https://github.com/sullo/nikto
cd nikto/program

# Scan website
./nikto.pl -h https://www.monconbuild.com -ssl

# With tuning for specific tests
./nikto.pl -h https://www.monconbuild.com -Tuning 123
```

---

## 4. Security HTTP Headers Audit

### 🔒 Current Headers (from vercel.json)

Your current configuration includes:
```json
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block"
}
```

### ✅ Recommended Headers Configuration

Update your `frontend/vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
        }
      ]
    },
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 🧪 Test Security Headers

#### Online Tools
```bash
# SecurityHeaders.com
curl -I https://www.monconbuild.com | grep -i "X-\|Content-Security\|Strict-Transport"

# Or visit:
# https://securityheaders.com/?q=www.monconbuild.com
# Target grade: A or A+
```

#### Command Line Testing
```bash
# Check all security headers
curl -I https://www.monconbuild.com 2>&1 | grep -E "Strict-Transport-Security|X-Frame-Options|X-Content-Type-Options|Content-Security-Policy|X-XSS-Protection|Referrer-Policy|Permissions-Policy"

# Verify CSP
curl -I https://www.monconbuild.com 2>&1 | grep "Content-Security-Policy"
```

#### Helmet.js for Express (if using Node backend)
```bash
# If you migrate to Node.js backend
npm install helmet

# In server.js
const helmet = require('helmet');
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

### 📋 Security Headers Checklist

- [ ] **Strict-Transport-Security**: max-age=31536000; includeSubDomains; preload
- [ ] **X-Content-Type-Options**: nosniff
- [ ] **X-Frame-Options**: DENY or SAMEORIGIN
- [ ] **X-XSS-Protection**: 1; mode=block (legacy browser support)
- [ ] **Content-Security-Policy**: Restrictive policy without 'unsafe-eval'
- [ ] **Referrer-Policy**: strict-origin-when-cross-origin or no-referrer
- [ ] **Permissions-Policy**: Restrict unnecessary browser features
- [ ] **X-Permitted-Cross-Domain-Policies**: none
- [ ] No Server header revealing technology stack
- [ ] No X-Powered-By header

### 🔍 CSP Violation Monitoring

Add to your CSP header:
```
Content-Security-Policy: ...; report-uri https://your-csp-report-endpoint.com/report
```

Or use report-only mode while testing:
```
Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-violation-report
```

---

## 5. Malware & Blacklist Scanning

### 🦠 Malware Scanning

#### Google Safe Browsing
```bash
# Check if your site is flagged
curl "https://transparencyreport.google.com/safe-browsing/search?url=www.monconbuild.com"

# Or use the Safe Browsing API
# https://developers.google.com/safe-browsing/v4
```

#### VirusTotal Scan
```bash
# Install jq for JSON parsing
# Windows: choco install jq
# Mac: brew install jq

# Scan URL
curl --request POST \
  --url 'https://www.virustotal.com/vtapi/v2/url/scan' \
  --data 'apikey=YOUR_API_KEY&url=https://www.monconbuild.com'

# Check results
curl --request GET \
  --url 'https://www.virustotal.com/vtapi/v2/url/report?apikey=YOUR_API_KEY&resource=https://www.monconbuild.com' \
  | jq '.positives'
```

#### Sucuri SiteCheck
```bash
# Visit: https://sitecheck.sucuri.net/results/www.monconbuild.com
# Or API:
curl "https://sitecheck.sucuri.net/api/v1/?scan=www.monconbuild.com"
```

### 🚫 Blacklist Checking

#### Check Multiple Blacklists
```bash
# Install mxtoolbox or use online
# https://mxtoolbox.com/blacklists.aspx

# Check DNS-based blacklists
host www.monconbuild.com.zen.spamhaus.org
host www.monconbuild.com.bl.spamcop.net
host www.monconbuild.com.cbl.abuseat.org

# If no response, you're not blacklisted
```

#### PhishTank Check
```bash
# Check if flagged as phishing
curl "http://checkurl.phishtank.com/checkurl/" \
  --data "url=https://www.monconbuild.com&format=json"
```

### 📋 Malware & Blacklist Checklist

- [ ] Not flagged by Google Safe Browsing
- [ ] Clean VirusTotal scan (0 positives)
- [ ] Not listed on major DNS blacklists (Spamhaus, SpamCop, etc.)
- [ ] Not flagged on PhishTank
- [ ] No malicious scripts or iframes injected
- [ ] All external resources (CDNs) use SRI (Subresource Integrity)
- [ ] Regular malware scans scheduled (weekly)
- [ ] File integrity monitoring in place

### 🔐 Subresource Integrity (SRI)

If using CDN resources, add integrity attributes:
```html
<!-- Example with SRI -->
<script 
  src="https://cdn.example.com/library.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/ux..."
  crossorigin="anonymous">
</script>
```

Generate SRI hashes:
```bash
# Generate SRI hash for a file
curl https://cdn.example.com/library.js | openssl dgst -sha384 -binary | openssl base64 -A
```

---

## 6. Access Control & Authentication

### 🔑 Current Authentication Status

**Your Current Setup:**
- Public-facing website (no user authentication required)
- Backend API with basic CORS protection
- No admin panel or protected routes

### 🛡️ Recommended Implementations

#### Rate Limiting

**For FastAPI Backend:**
```bash
cd backend
pip install slowapi
```

```python
# Add to server.py
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Apply to endpoints
@api_router.post("/status")
@limiter.limit("5/minute")  # Max 5 requests per minute
async def create_status_check(request: Request, input: StatusCheckCreate):
    # ... endpoint code
```

**For Vercel (Frontend):**
Vercel Edge Middleware for rate limiting:

Create `frontend/middleware.ts`:
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimit = new Map();

export function middleware(request: NextRequest) {
  const ip = request.ip ?? 'anonymous';
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const max = 100; // max requests per window

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
  } else {
    const record = rateLimit.get(ip);
    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
    } else {
      record.count++;
      if (record.count > max) {
        return new NextResponse('Too Many Requests', { status: 429 });
      }
    }
  }

  return NextResponse.next();
}
```

#### API Key Authentication (for backend)

```python
# Add to server.py
from fastapi import Security, HTTPException, status
from fastapi.security import APIKeyHeader

API_KEY = os.getenv("API_KEY", "your-secret-api-key")
api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)

async def verify_api_key(api_key: str = Security(api_key_header)):
    if api_key != API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API Key"
        )
    return api_key

# Use in protected endpoints
@api_router.post("/status")
async def create_status_check(
    input: StatusCheckCreate,
    api_key: str = Depends(verify_api_key)
):
    # ... endpoint code
```

#### JWT Authentication (if needed)

```bash
cd backend
pip install python-jose[cryptography] passlib[bcrypt]
```

```python
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

### 📋 Access Control Checklist

- [ ] Rate limiting implemented on all public endpoints
- [ ] API keys required for sensitive operations
- [ ] Failed login attempt tracking and lockout
- [ ] Strong password policy (if applicable)
- [ ] Multi-factor authentication for admin access
- [ ] Session timeout configured (30 minutes max)
- [ ] Logout functionality clears all session data
- [ ] No sensitive data in URL parameters
- [ ] CORS properly configured (not using '*' in production)
- [ ] Input validation on all endpoints

### 🔒 CORS Security Review

**Current Configuration (server.py):**
```python
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Recommended Production Config:**
```python
# In .env file
CORS_ORIGINS=https://www.monconbuild.com,https://monconbuild.com

# In server.py
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS').split(','),  # Remove default '*'
    allow_methods=["GET", "POST"],  # Specific methods only
    allow_headers=["Content-Type", "Authorization", "X-API-Key"],  # Specific headers
    max_age=600,  # Cache preflight requests
)
```

---

## 7. Automated Security Monitoring & Alerts

### 🤖 GitHub Actions Security Workflow

Create `.github/workflows/security-scan.yml`:

```yaml
name: Security Scan

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    # Run every Monday at 9 AM UTC
    - cron: '0 9 * * 1'
  workflow_dispatch:

jobs:
  npm-audit:
    name: NPM Security Audit
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci
        
      - name: Run npm audit
        working-directory: ./frontend
        run: npm audit --audit-level=high
        continue-on-error: true
        
      - name: Run Snyk test
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high --file=frontend/package.json

  python-security:
    name: Python Security Audit
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'
          
      - name: Install dependencies
        working-directory: ./backend
        run: |
          pip install -r requirements.txt
          pip install safety bandit pip-audit
          
      - name: Run Safety check
        working-directory: ./backend
        run: safety check --json
        continue-on-error: true
        
      - name: Run Bandit security scan
        working-directory: ./backend
        run: bandit -r . -f json -o bandit-report.json
        continue-on-error: true
        
      - name: Upload Bandit report
        uses: actions/upload-artifact@v3
        with:
          name: bandit-security-report
          path: backend/bandit-report.json

  codeql-analysis:
    name: CodeQL Analysis
    runs-on: ubuntu-latest
    permissions:
      security-events: write
      actions: read
      contents: read
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        
      - name: Initialize CodeQL
        uses: github/codeql-action/init@v2
        with:
          languages: javascript, python
          
      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v2

  dependency-review:
    name: Dependency Review
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        
      - name: Dependency Review
        uses: actions/dependency-review-action@v3
        with:
          fail-on-severity: high

  ssl-check:
    name: SSL Certificate Check
    runs-on: ubuntu-latest
    steps:
      - name: Check SSL certificate
        run: |
          echo | openssl s_client -connect www.monconbuild.com:443 -servername www.monconbuild.com 2>/dev/null | openssl x509 -noout -dates
          
      - name: Check SSL Labs grade
        run: |
          curl -s "https://api.ssllabs.com/api/v3/analyze?host=www.monconbuild.com" | jq '.endpoints[0].grade'
```

### 📊 Security Monitoring Services

#### Snyk Integration
```bash
# Sign up at https://snyk.io
# Add to GitHub repository

# In GitHub repository settings:
# Settings > Security > Enable Dependency graph
# Settings > Security > Enable Dependabot alerts
# Settings > Security > Enable Dependabot security updates
```

#### Sentry for Error Tracking

**Frontend Setup:**
```bash
cd frontend
npm install --save @sentry/react
```

```javascript
// In src/index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

**Backend Setup:**
```bash
cd backend
pip install sentry-sdk[fastapi]
```

```python
# In server.py
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN"),
    integrations=[FastApiIntegration()],
    traces_sample_rate=1.0,
    environment=os.getenv("ENVIRONMENT", "production"),
)
```

### 🔔 Uptime & Security Monitoring

#### UptimeRobot
```bash
# Sign up at https://uptimerobot.com
# Create monitors for:
# - https://www.monconbuild.com (HTTP monitor)
# - https://www.monconbuild.com/api/health (Keyword monitor)
# - SSL certificate expiry monitor

# Set up alerts:
# - Email alerts
# - Slack/Discord webhooks
# - SMS for critical issues
```

#### Vercel Monitoring
Vercel provides built-in monitoring:
- Navigate to your project dashboard
- Check "Analytics" tab for traffic and errors
- Enable "Web Vitals" monitoring
- Set up "Deployment Protection" for security

### 📋 Monitoring & Alerts Checklist

- [ ] GitHub Dependabot enabled and configured
- [ ] Snyk monitoring active on GitHub repository
- [ ] CodeQL analysis running on all PRs
- [ ] Sentry error tracking configured (frontend & backend)
- [ ] Uptime monitoring with alerting
- [ ] SSL certificate expiry monitoring (30-day warning)
- [ ] Security scan scheduled weekly via GitHub Actions
- [ ] Log aggregation and analysis (e.g., Logtail, Papertrail)
- [ ] WAF (Web Application Firewall) enabled (Cloudflare, AWS WAF)
- [ ] DDoS protection configured

### 📧 Security Alert Escalation

**Severity Levels:**

| Severity | Response Time | Notification Method |
|----------|--------------|---------------------|
| Critical | Immediate | SMS, Phone, Email, Slack |
| High | 1 hour | Email, Slack |
| Medium | 4 hours | Email |
| Low | 24 hours | Email digest |

### 🔍 Log Monitoring

**Backend Logging Enhancement:**
```python
# Add to server.py
import logging
from logging.handlers import RotatingFileHandler

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        RotatingFileHandler(
            'security.log',
            maxBytes=10485760,  # 10MB
            backupCount=5
        ),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

# Log security events
@api_router.post("/status")
async def create_status_check(request: Request, input: StatusCheckCreate):
    client_ip = request.client.host
    logger.info(f"Status check created by {input.client_name} from {client_ip}")
    # ... rest of endpoint
```

---

## 📝 Quick Reference Scripts

### Daily Security Check Script

Create `security-check.sh`:
```bash
#!/bin/bash

echo "🔒 Running Daily Security Checks..."
echo "=================================="

# Check SSL certificate
echo "\n📜 SSL Certificate Status:"
echo | openssl s_client -connect www.monconbuild.com:443 -servername www.monconbuild.com 2>/dev/null | openssl x509 -noout -dates

# Check dependencies
echo "\n📦 Frontend Dependencies:"
cd frontend && npm audit --audit-level=high

echo "\n🐍 Backend Dependencies:"
cd ../backend && safety check

# Check security headers
echo "\n🔐 Security Headers:"
curl -I https://www.monconbuild.com 2>&1 | grep -E "Strict-Transport|X-Frame|X-Content-Type|Content-Security"

# Check blacklist status
echo "\n🚫 Blacklist Status:"
host www.monconbuild.com.zen.spamhaus.org || echo "✓ Not blacklisted"

echo "\n✅ Security check complete!"
```

Make executable:
```bash
chmod +x security-check.sh
./security-check.sh
```

### Weekly Security Audit Script (PowerShell)

Create `security-audit.ps1`:
```powershell
Write-Host "🔒 Weekly Security Audit" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan

# SSL Check
Write-Host "`n📜 Checking SSL Certificate..." -ForegroundColor Yellow
$cert = Invoke-WebRequest -Uri "https://www.monconbuild.com" -UseBasicParsing
$cert.BaseResponse.Server

# NPM Audit
Write-Host "`n📦 Checking NPM Dependencies..." -ForegroundColor Yellow
Set-Location frontend
npm audit --audit-level=high

# Python Security
Write-Host "`n🐍 Checking Python Dependencies..." -ForegroundColor Yellow
Set-Location ..\backend
pip-audit

# Security Headers
Write-Host "`n🔐 Checking Security Headers..." -ForegroundColor Yellow
$headers = Invoke-WebRequest -Uri "https://www.monconbuild.com" -Method Head
$headers.Headers | Where-Object { $_.Key -match "X-|Security|Policy" }

Write-Host "`n✅ Weekly audit complete!" -ForegroundColor Green
```

Run weekly:
```powershell
.\security-audit.ps1
```

---

## 🎯 Summary & Priority Actions

### Immediate Actions (Do Today)

1. ✅ **Add HSTS header** to vercel.json
2. ✅ **Implement CSP header** with restrictive policy
3. ✅ **Enable Dependabot** on GitHub repository
4. ✅ **Run npm audit** and fix high/critical vulnerabilities
5. ✅ **Configure CORS** with specific origins (remove '*')

### Short-term Actions (This Week)

6. ✅ **Set up GitHub Actions** security workflow
7. ✅ **Implement rate limiting** on API endpoints
8. ✅ **Enable CodeQL** analysis
9. ✅ **Set up Sentry** error tracking
10. ✅ **Create monitoring alerts** for SSL expiry

### Long-term Actions (This Month)

11. ✅ **Implement CSRF protection** for forms
12. ✅ **Set up WAF** (Cloudflare or AWS WAF)
13. ✅ **Create incident response plan**
14. ✅ **Schedule penetration testing**
15. ✅ **Document security policies**

---

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [MDN Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Vercel Security Best Practices](https://vercel.com/docs/security)
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)
- [React Security Best Practices](https://react.dev/learn/security)

---

**Last Updated:** October 24, 2025  
**Maintained By:** klassiik  
**Review Schedule:** Quarterly security audits
