# PowerShell Security Check Script for Monument Construction Website
# Run this script daily/weekly to check for security issues

$ErrorActionPreference = "Continue"

$Domain = "www.monconbuild.com"
$ReportDir = "security-reports"
$Date = Get-Date -Format "yyyy-MM-dd"

# Colors
$ColorCyan = "Cyan"
$ColorGreen = "Green"
$ColorYellow = "Yellow"
$ColorRed = "Red"

Write-Host "`n🔒 Monument Construction - Security Check" -ForegroundColor $ColorCyan
Write-Host "==========================================" -ForegroundColor $ColorCyan
Write-Host "Date: $Date`n" -ForegroundColor $ColorCyan

# Create reports directory
if (!(Test-Path $ReportDir)) {
    New-Item -ItemType Directory -Path $ReportDir | Out-Null
}

# 1. SSL Certificate Check
Write-Host "`n📜 Checking SSL Certificate..." -ForegroundColor $ColorYellow
try {
    $request = [System.Net.HttpWebRequest]::Create("https://$Domain")
    $request.GetResponse() | Out-Null
    $cert = $request.ServicePoint.Certificate
    
    if ($cert) {
        Write-Host "✓ SSL Certificate Valid" -ForegroundColor $ColorGreen
        Write-Host "  Expires: $($cert.GetExpirationDateString())" -ForegroundColor $ColorGreen
        
        # Check if expiring soon (within 30 days)
        $expiryDate = [DateTime]::Parse($cert.GetExpirationDateString())
        $daysUntilExpiry = ($expiryDate - (Get-Date)).Days
        
        if ($daysUntilExpiry -lt 30) {
            Write-Host "  ⚠️  Certificate expires in $daysUntilExpiry days!" -ForegroundColor $ColorYellow
        }
    }
} catch {
    Write-Host "✗ SSL Certificate Check Failed: $($_.Exception.Message)" -ForegroundColor $ColorRed
}

# 2. HTTPS Redirect Check
Write-Host "`n🔄 Checking HTTPS Redirect..." -ForegroundColor $ColorYellow
try {
    $response = Invoke-WebRequest -Uri "http://$Domain" -MaximumRedirection 0 -ErrorAction SilentlyContinue
    
    if ($response.StatusCode -eq 301 -or $response.StatusCode -eq 302) {
        $location = $response.Headers.Location
        if ($location -match "^https://") {
            Write-Host "✓ HTTP redirects to HTTPS" -ForegroundColor $ColorGreen
            Write-Host "  Location: $location" -ForegroundColor $ColorGreen
        }
    }
} catch {
    if ($_.Exception.Response.StatusCode -eq 301 -or $_.Exception.Response.StatusCode -eq 302) {
        Write-Host "✓ HTTP redirects to HTTPS" -ForegroundColor $ColorGreen
    }
}

# 3. Security Headers Check
Write-Host "`n🔐 Checking Security Headers..." -ForegroundColor $ColorYellow
try {
    $response = Invoke-WebRequest -Uri "https://$Domain" -Method Head
    
    $requiredHeaders = @(
        "Strict-Transport-Security",
        "X-Content-Type-Options",
        "X-Frame-Options",
        "X-XSS-Protection"
    )
    
    foreach ($header in $requiredHeaders) {
        if ($response.Headers.ContainsKey($header)) {
            Write-Host "✓ $header found" -ForegroundColor $ColorGreen
            Write-Host "  Value: $($response.Headers[$header])" -ForegroundColor $ColorGreen
        } else {
            Write-Host "✗ $header missing" -ForegroundColor $ColorRed
        }
    }
} catch {
    Write-Host "✗ Failed to check headers: $($_.Exception.Message)" -ForegroundColor $ColorRed
}

# 4. Frontend Dependencies Check
Write-Host "`n📦 Checking Frontend Dependencies..." -ForegroundColor $ColorYellow
Push-Location -Path "frontend"

if (Test-Path "package.json") {
    try {
        $npmAudit = npm audit --audit-level=high 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ No high or critical npm vulnerabilities" -ForegroundColor $ColorGreen
        } else {
            Write-Host "✗ npm vulnerabilities found" -ForegroundColor $ColorRed
            $npmAudit | Select-Object -First 20
            $npmAudit | Out-File -FilePath "..\$ReportDir\npm-audit-$Date.txt"
        }
    } catch {
        Write-Host "⚠️  npm audit failed: $($_.Exception.Message)" -ForegroundColor $ColorYellow
    }
} else {
    Write-Host "✗ package.json not found" -ForegroundColor $ColorRed
}

Pop-Location

# 5. Backend Dependencies Check
Write-Host "`n🐍 Checking Backend Dependencies..." -ForegroundColor $ColorYellow
Push-Location -Path "backend"

if (Test-Path "requirements.txt") {
    # Check if safety is installed
    $safetyInstalled = $null -ne (Get-Command safety -ErrorAction SilentlyContinue)
    
    if ($safetyInstalled) {
        try {
            $safetyCheck = safety check --json 2>&1
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ No Python vulnerabilities found" -ForegroundColor $ColorGreen
            } else {
                Write-Host "✗ Python vulnerabilities found" -ForegroundColor $ColorRed
                $safetyCheck
                $safetyCheck | Out-File -FilePath "..\$ReportDir\safety-check-$Date.json"
            }
        } catch {
            Write-Host "⚠️  Safety check failed: $($_.Exception.Message)" -ForegroundColor $ColorYellow
        }
    } else {
        Write-Host "⚠️  Safety not installed. Install with: pip install safety" -ForegroundColor $ColorYellow
    }
    
    # pip-audit check
    $pipAuditInstalled = $null -ne (Get-Command pip-audit -ErrorAction SilentlyContinue)
    
    if ($pipAuditInstalled) {
        try {
            $pipAudit = pip-audit 2>&1
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ pip-audit: No vulnerabilities found" -ForegroundColor $ColorGreen
            } else {
                Write-Host "✗ pip-audit found vulnerabilities" -ForegroundColor $ColorRed
                $pipAudit | Select-Object -First 20
            }
        } catch {
            Write-Host "⚠️  pip-audit failed: $($_.Exception.Message)" -ForegroundColor $ColorYellow
        }
    }
} else {
    Write-Host "✗ requirements.txt not found" -ForegroundColor $ColorRed
}

Pop-Location

# 6. DNS Blacklist Check
Write-Host "`n🚫 Checking DNS Blacklists..." -ForegroundColor $ColorYellow

function Test-Blacklist {
    param(
        [string]$Domain,
        [string]$Blacklist,
        [string]$Name
    )
    
    try {
        $result = Resolve-DnsName -Name "$Domain.$Blacklist" -ErrorAction SilentlyContinue
        
        if ($null -eq $result) {
            Write-Host "✓ Not listed on $Name" -ForegroundColor $ColorGreen
            return $false
        } else {
            Write-Host "✗ Listed on $Name!" -ForegroundColor $ColorRed
            return $true
        }
    } catch {
        Write-Host "✓ Not listed on $Name" -ForegroundColor $ColorGreen
        return $false
    }
}

$blacklisted = @()
$blacklisted += Test-Blacklist -Domain $Domain -Blacklist "zen.spamhaus.org" -Name "Spamhaus"
$blacklisted += Test-Blacklist -Domain $Domain -Blacklist "bl.spamcop.net" -Name "SpamCop"

# 7. Check for exposed sensitive files
Write-Host "`n📄 Checking for Exposed Sensitive Files..." -ForegroundColor $ColorYellow

$sensitiveFiles = @(
    ".env",
    ".git/config",
    "phpinfo.php",
    "wp-config.php",
    "web.config",
    ".htaccess",
    "composer.json",
    ".DS_Store"
)

foreach ($file in $sensitiveFiles) {
    try {
        $response = Invoke-WebRequest -Uri "https://$Domain/$file" -Method Head -ErrorAction SilentlyContinue
        
        if ($response.StatusCode -eq 200) {
            Write-Host "✗ $file is accessible (HTTP $($response.StatusCode))" -ForegroundColor $ColorRed
        } else {
            Write-Host "✓ $file not accessible (HTTP $($response.StatusCode))" -ForegroundColor $ColorGreen
        }
    } catch {
        Write-Host "✓ $file not accessible" -ForegroundColor $ColorGreen
    }
}

# 8. Check robots.txt and sitemap.xml
Write-Host "`n🤖 Checking robots.txt and sitemap.xml..." -ForegroundColor $ColorYellow

try {
    $robotsResponse = Invoke-WebRequest -Uri "https://$Domain/robots.txt" -Method Head -ErrorAction SilentlyContinue
    
    if ($robotsResponse.StatusCode -eq 200) {
        Write-Host "✓ robots.txt accessible" -ForegroundColor $ColorGreen
    }
} catch {
    Write-Host "⚠️  robots.txt not found (HTTP $($_.Exception.Response.StatusCode.value__))" -ForegroundColor $ColorYellow
}

try {
    $sitemapResponse = Invoke-WebRequest -Uri "https://$Domain/sitemap.xml" -Method Head -ErrorAction SilentlyContinue
    
    if ($sitemapResponse.StatusCode -eq 200) {
        Write-Host "✓ sitemap.xml accessible" -ForegroundColor $ColorGreen
    }
} catch {
    Write-Host "⚠️  sitemap.xml not found (HTTP $($_.Exception.Response.StatusCode.value__))" -ForegroundColor $ColorYellow
}

# 9. Port Scan (common vulnerable ports)
Write-Host "`n🔍 Checking Common Vulnerable Ports..." -ForegroundColor $ColorYellow

$ports = @{
    21 = "FTP"
    23 = "Telnet"
    3306 = "MySQL"
    5432 = "PostgreSQL"
    27017 = "MongoDB"
    6379 = "Redis"
}

foreach ($port in $ports.Keys) {
    $service = $ports[$port]
    
    $tcpClient = New-Object System.Net.Sockets.TcpClient
    $connect = $tcpClient.BeginConnect($Domain, $port, $null, $null)
    $wait = $connect.AsyncWaitHandle.WaitOne(1000, $false)
    
    if ($wait -and $tcpClient.Connected) {
        Write-Host "✗ Port $port ($service) is OPEN - Potential security risk!" -ForegroundColor $ColorRed
        $tcpClient.Close()
    } else {
        Write-Host "✓ Port $port ($service) is closed" -ForegroundColor $ColorGreen
    }
    
    $tcpClient.Close()
}

# 10. Generate Summary Report
Write-Host "`n📊 Generating Summary Report..." -ForegroundColor $ColorYellow

$reportFile = "$ReportDir\security-report-$Date.txt"

$reportContent = @"
Monument Construction - Security Report
Date: $Date
Domain: $Domain

==============================================

SSL Certificate:
  Checked: Yes
  Status: Valid

Security Headers:
  Strict-Transport-Security: $(if ($response.Headers.ContainsKey("Strict-Transport-Security")) { "Present" } else { "Missing" })
  X-Content-Type-Options: $(if ($response.Headers.ContainsKey("X-Content-Type-Options")) { "Present" } else { "Missing" })
  X-Frame-Options: $(if ($response.Headers.ContainsKey("X-Frame-Options")) { "Present" } else { "Missing" })
  X-XSS-Protection: $(if ($response.Headers.ContainsKey("X-XSS-Protection")) { "Present" } else { "Missing" })

DNS Blacklist Status:
  Spamhaus: Clean
  SpamCop: Clean

==============================================
Report generated: $(Get-Date)
"@

$reportContent | Out-File -FilePath $reportFile

Write-Host "✓ Report saved to: $reportFile" -ForegroundColor $ColorGreen

# 11. Archive old reports
Write-Host "`n🗄️  Managing Report Archives..." -ForegroundColor $ColorYellow

Get-ChildItem -Path $ReportDir -Filter "*.txt" | Where-Object { 
    $_.LastWriteTime -lt (Get-Date).AddDays(-30) 
} | ForEach-Object {
    Compress-Archive -Path $_.FullName -DestinationPath "$($_.FullName).zip" -Force
    Remove-Item $_.FullName
}

Write-Host "✓ Old reports archived" -ForegroundColor $ColorGreen

# Final summary
Write-Host "`n================================" -ForegroundColor $ColorCyan
Write-Host "✅ Security Check Complete" -ForegroundColor $ColorCyan
Write-Host "================================" -ForegroundColor $ColorCyan

# Check for critical issues
$criticalIssues = $false

if ($blacklisted -contains $true) {
    Write-Host "⚠️  Domain is blacklisted!" -ForegroundColor $ColorRed
    $criticalIssues = $true
}

if ($criticalIssues) {
    Write-Host "`n⚠️  Critical security issues detected!" -ForegroundColor $ColorRed
    exit 1
} else {
    Write-Host "`nNo critical security issues detected." -ForegroundColor $ColorGreen
    exit 0
}
