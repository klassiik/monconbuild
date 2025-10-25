#!/bin/bash

##
# Lighthouse Metrics - Quick Test Script
# Test single URL or all pages with Lighthouse API
##

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

API_URL="https://lighthouse-metrics.com/v1/lighthouse/checks"

# Function to run Lighthouse test
run_test() {
    local url=$1
    local name=$2
    
    echo -e "${BLUE}🔍 Testing: ${name}${NC}"
    echo -e "   URL: ${url}"
    
    response=$(curl -s -X POST "${API_URL}" \
        -H "Content-Type: application/json" \
        -d "{\"url\":\"${url}\",\"regions\":[\"us-west1\"]}")
    
    # Check if response contains an ID
    if echo "$response" | grep -q '"id"'; then
        id=$(echo "$response" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
        echo -e "${GREEN}✅ Test initiated successfully${NC}"
        echo -e "   Test ID: ${id}"
        echo -e "   View results: https://lighthouse-metrics.com/checks/${id}"
    else
        echo -e "${RED}❌ Test failed${NC}"
        echo "   Response: ${response}"
    fi
    echo ""
}

# Main execution
echo -e "${GREEN}🚀 Lighthouse Metrics - Performance Testing${NC}"
echo ""

if [ "$1" == "--all" ]; then
    echo "Testing all pages..."
    echo ""
    
    # Array of pages to test
    declare -a pages=(
        "https://www.monconbuild.com/|Home"
        "https://www.monconbuild.com/services|Services"
        "https://www.monconbuild.com/about|About"
        "https://www.monconbuild.com/portfolio|Portfolio"
        "https://www.monconbuild.com/contact|Contact"
        "https://www.monconbuild.com/services/finish-carpentry|Finish Carpentry"
    )
    
    for page in "${pages[@]}"; do
        IFS='|' read -r url name <<< "$page"
        run_test "$url" "$name"
        sleep 2  # Rate limiting
    done
    
elif [ -n "$1" ]; then
    # Test specific URL
    run_test "$1" "Custom URL"
else
    # Test homepage
    run_test "https://www.monconbuild.com/" "Home"
fi

echo -e "${GREEN}✨ Testing complete!${NC}"
echo -e "📈 View all reports at: ${BLUE}https://lighthouse-metrics.com${NC}"
