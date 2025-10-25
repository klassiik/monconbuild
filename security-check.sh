#!/bin/bash
# Daily Security Check Script for Monument Construction Website
# Run this script daily to check for security issues

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

DOMAIN="www.monconbuild.com"
REPORT_DIR="security-reports"
DATE=$(date +"%Y-%m-%d")

echo -e "${CYAN}🔒 Monument Construction - Daily Security Check${NC}"
echo -e "${CYAN}================================================${NC}"
echo -e "Date: $DATE\n"

# Create reports directory
mkdir -p "$REPORT_DIR"

# 1. SSL Certificate Check
echo -e "${YELLOW}📜 Checking SSL Certificate...${NC}"
SSL_OUTPUT=$(echo | openssl s_client -connect $DOMAIN:443 -servername $DOMAIN 2>/dev/null | openssl x509 -noout -dates 2>/dev/null)

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ SSL Certificate Valid${NC}"
    echo "$SSL_OUTPUT"
    
    # Check expiry
    EXPIRY_DATE=$(echo "$SSL_OUTPUT" | grep "notAfter" | cut -d'=' -f2)
    echo "Certificate expires: $EXPIRY_DATE"
else
    echo -e "${RED}✗ SSL Certificate Check Failed${NC}"
fi

# 2. HTTPS Redirect Check
echo -e "\n${YELLOW}🔄 Checking HTTPS Redirect...${NC}"
HTTP_REDIRECT=$(curl -sI http://$DOMAIN 2>&1 | grep -i "location: https")

if [ -n "$HTTP_REDIRECT" ]; then
    echo -e "${GREEN}✓ HTTP redirects to HTTPS${NC}"
    echo "$HTTP_REDIRECT"
else
    echo -e "${RED}✗ HTTP redirect not working properly${NC}"
fi

# 3. Security Headers Check
echo -e "\n${YELLOW}🔐 Checking Security Headers...${NC}"
HEADERS=$(curl -sI https://$DOMAIN 2>&1)

# Check each header
declare -a REQUIRED_HEADERS=(
    "Strict-Transport-Security"
    "X-Content-Type-Options"
    "X-Frame-Options"
    "X-XSS-Protection"
)

for HEADER in "${REQUIRED_HEADERS[@]}"; do
    if echo "$HEADERS" | grep -qi "$HEADER"; then
        echo -e "${GREEN}✓ $HEADER found${NC}"
        echo "$HEADERS" | grep -i "$HEADER"
    else
        echo -e "${RED}✗ $HEADER missing${NC}"
    fi
done

# 4. Frontend Dependencies Check
echo -e "\n${YELLOW}📦 Checking Frontend Dependencies...${NC}"
cd frontend

if [ -f "package.json" ]; then
    NPM_AUDIT=$(npm audit --audit-level=high 2>&1)
    NPM_EXIT_CODE=$?
    
    if [ $NPM_EXIT_CODE -eq 0 ]; then
        echo -e "${GREEN}✓ No high or critical npm vulnerabilities${NC}"
    else
        echo -e "${RED}✗ npm vulnerabilities found${NC}"
        echo "$NPM_AUDIT" | head -n 20
        echo "$NPM_AUDIT" > "../$REPORT_DIR/npm-audit-$DATE.txt"
    fi
else
    echo -e "${RED}✗ package.json not found${NC}"
fi

cd ..

# 5. Backend Dependencies Check
echo -e "\n${YELLOW}🐍 Checking Backend Dependencies...${NC}"
cd backend

if [ -f "requirements.txt" ]; then
    # Check if safety is installed
    if command -v safety &> /dev/null; then
        SAFETY_CHECK=$(safety check --json 2>&1)
        SAFETY_EXIT_CODE=$?
        
        if [ $SAFETY_EXIT_CODE -eq 0 ]; then
            echo -e "${GREEN}✓ No Python vulnerabilities found${NC}"
        else
            echo -e "${RED}✗ Python vulnerabilities found${NC}"
            echo "$SAFETY_CHECK" | jq '.' 2>/dev/null || echo "$SAFETY_CHECK"
            echo "$SAFETY_CHECK" > "../$REPORT_DIR/safety-check-$DATE.json"
        fi
    else
        echo -e "${YELLOW}⚠ Safety not installed. Install with: pip install safety${NC}"
    fi
else
    echo -e "${RED}✗ requirements.txt not found${NC}"
fi

cd ..

# 6. DNS Blacklist Check
echo -e "\n${YELLOW}🚫 Checking DNS Blacklists...${NC}"

# Check Spamhaus
SPAMHAUS=$(host $DOMAIN.zen.spamhaus.org 2>&1)
if echo "$SPAMHAUS" | grep -q "NXDOMAIN\|not found"; then
    echo -e "${GREEN}✓ Not listed on Spamhaus${NC}"
else
    echo -e "${RED}✗ Listed on Spamhaus!${NC}"
    echo "$SPAMHAUS"
fi

# Check SpamCop
SPAMCOP=$(host $DOMAIN.bl.spamcop.net 2>&1)
if echo "$SPAMCOP" | grep -q "NXDOMAIN\|not found"; then
    echo -e "${GREEN}✓ Not listed on SpamCop${NC}"
else
    echo -e "${RED}✗ Listed on SpamCop!${NC}"
    echo "$SPAMCOP"
fi

# 7. Port Scan (common vulnerable ports)
echo -e "\n${YELLOW}🔍 Checking Common Vulnerable Ports...${NC}"

declare -a PORTS=(
    "21:FTP"
    "23:Telnet"
    "3306:MySQL"
    "5432:PostgreSQL"
    "27017:MongoDB"
    "6379:Redis"
)

for PORT_INFO in "${PORTS[@]}"; do
    PORT=$(echo "$PORT_INFO" | cut -d':' -f1)
    SERVICE=$(echo "$PORT_INFO" | cut -d':' -f2)
    
    if timeout 2 bash -c "echo >/dev/tcp/$DOMAIN/$PORT" 2>/dev/null; then
        echo -e "${RED}✗ Port $PORT ($SERVICE) is OPEN - Potential security risk!${NC}"
    else
        echo -e "${GREEN}✓ Port $PORT ($SERVICE) is closed${NC}"
    fi
done

# 8. Check for exposed sensitive files
echo -e "\n${YELLOW}📄 Checking for Exposed Sensitive Files...${NC}"

declare -a SENSITIVE_FILES=(
    ".env"
    ".git/config"
    "phpinfo.php"
    "wp-config.php"
    "web.config"
    ".htaccess"
    "composer.json"
    ".DS_Store"
)

for FILE in "${SENSITIVE_FILES[@]}"; do
    HTTP_CODE=$(curl -sI "https://$DOMAIN/$FILE" -w "%{http_code}" -o /dev/null)
    
    if [ "$HTTP_CODE" == "200" ]; then
        echo -e "${RED}✗ $FILE is accessible (HTTP $HTTP_CODE)${NC}"
    else
        echo -e "${GREEN}✓ $FILE not accessible (HTTP $HTTP_CODE)${NC}"
    fi
done

# 9. Check robots.txt and sitemap.xml
echo -e "\n${YELLOW}🤖 Checking robots.txt and sitemap.xml...${NC}"

ROBOTS_CODE=$(curl -sI "https://$DOMAIN/robots.txt" -w "%{http_code}" -o /dev/null)
if [ "$ROBOTS_CODE" == "200" ]; then
    echo -e "${GREEN}✓ robots.txt accessible${NC}"
else
    echo -e "${YELLOW}⚠ robots.txt not found (HTTP $ROBOTS_CODE)${NC}"
fi

SITEMAP_CODE=$(curl -sI "https://$DOMAIN/sitemap.xml" -w "%{http_code}" -o /dev/null)
if [ "$SITEMAP_CODE" == "200" ]; then
    echo -e "${GREEN}✓ sitemap.xml accessible${NC}"
else
    echo -e "${YELLOW}⚠ sitemap.xml not found (HTTP $SITEMAP_CODE)${NC}"
fi

# 10. Generate Summary Report
echo -e "\n${CYAN}📊 Generating Summary Report...${NC}"

REPORT_FILE="$REPORT_DIR/daily-security-report-$DATE.txt"

cat > "$REPORT_FILE" << EOF
Monument Construction - Daily Security Report
Date: $DATE
Domain: $DOMAIN

==============================================

SSL Certificate Status:
$SSL_OUTPUT

Security Headers Check:
$HEADERS

NPM Audit Summary:
$(cd frontend && npm audit --audit-level=high 2>&1 | head -n 10)

Python Safety Check:
$(cd backend && command -v safety &> /dev/null && safety check 2>&1 | head -n 10 || echo "Safety not installed")

DNS Blacklist Status:
Spamhaus: $(echo "$SPAMHAUS" | grep -q "NXDOMAIN" && echo "Clean" || echo "LISTED")
SpamCop: $(echo "$SPAMCOP" | grep -q "NXDOMAIN" && echo "Clean" || echo "LISTED")

==============================================
Report saved to: $REPORT_FILE
EOF

echo -e "${GREEN}✓ Report saved to: $REPORT_FILE${NC}"

# 11. Check report size and archive old reports
echo -e "\n${YELLOW}🗄️  Managing Report Archives...${NC}"

# Archive reports older than 30 days
find "$REPORT_DIR" -name "*.txt" -mtime +30 -exec gzip {} \;
echo -e "${GREEN}✓ Old reports archived${NC}"

# Final summary
echo -e "\n${CYAN}================================${NC}"
echo -e "${CYAN}✅ Daily Security Check Complete${NC}"
echo -e "${CYAN}================================${NC}"

# Exit with error if critical issues found
if echo "$NPM_AUDIT" | grep -qi "critical\|high"; then
    echo -e "${RED}⚠️  Critical/High vulnerabilities found in dependencies!${NC}"
    exit 1
fi

if ! echo "$SPAMHAUS" | grep -q "NXDOMAIN"; then
    echo -e "${RED}⚠️  Domain is blacklisted!${NC}"
    exit 1
fi

echo -e "${GREEN}No critical security issues detected.${NC}"
exit 0
