# Security Quick Start Guide

## Immediate Setup (15 minutes)

### 1. Run Initial Security Scan

**On Windows (PowerShell):**
```powershell
.\security-check.ps1
```

**On Mac/Linux (Bash):**
```bash
chmod +x security-check.sh
./security-check.sh
```

### 2. Install Security Tools

**Frontend:**
```bash
cd frontend

# Install npm-check-updates for dependency updates
npm install -g npm-check-updates

# Run security audit
npm run security:audit

# Fix auto-fixable vulnerabilities
npm run security:audit:fix
```

**Backend:**
```bash
cd backend

# Install security scanning tools
pip install safety bandit pip-audit

# Run security checks
safety check
pip-audit
bandit -r . -ll
```

### 3. Enable GitHub Security Features

1. Go to your repository: https://github.com/klassiik/monconbuild
2. Click **Settings** → **Security**
3. Enable:
   - ✅ **Dependency graph**
   - ✅ **Dependabot alerts**
   - ✅ **Dependabot security updates**
   - ✅ **Code scanning** (CodeQL)
   - ✅ **Secret scanning**

### 4. Verify Security Headers

Visit: https://securityheaders.com/?q=www.monconbuild.com

**Expected Grade:** A or A+

If grade is lower:
- Push the updated `vercel.json` (already done in this commit)
- Wait 2-3 minutes for Vercel deployment
- Re-check the score

### 5. Check SSL Certificate

Visit: https://www.ssllabs.com/ssltest/analyze.html?d=www.monconbuild.com

**Expected Grade:** A or A+

---

## Weekly Maintenance (10 minutes)

### Monday Morning Routine

1. **Check Dependabot PRs**
   - Review any security update PRs
   - Merge non-breaking updates
   - Test breaking updates in staging

2. **Run Security Scan**
   ```powershell
   .\security-check.ps1
   ```

3. **Review GitHub Security Alerts**
   - Go to: https://github.com/klassiik/monconbuild/security
   - Address any critical/high severity alerts

4. **Check Uptime & Performance**
   - Review Vercel Analytics dashboard
   - Check for any deployment errors

---

## Monthly Deep Dive (30 minutes)

### First Monday of Each Month

1. **Comprehensive Dependency Update**
   ```bash
   cd frontend
   npm run security:update
   npm test
   npm run build
   ```

2. **Review Security Logs**
   - Check `security-reports/` directory
   - Review any anomalies or trends

3. **Full OWASP Scan**
   ```bash
   # Using Docker
   docker run -t zaproxy/zap-stable zap-baseline.py -t https://www.monconbuild.com
   ```

4. **SSL Certificate Check**
   - Verify expiry date (should be > 60 days)
   - Check for any SSL/TLS warnings

5. **Blacklist Check**
   - Visit: https://mxtoolbox.com/blacklists.aspx
   - Enter: www.monconbuild.com
   - Ensure not listed on any blacklists

---

## Automated Monitoring Setup (One-time, 20 minutes)

### Option 1: UptimeRobot (Free)

1. Sign up: https://uptimerobot.com
2. Create HTTP monitor:
   - **URL:** https://www.monconbuild.com
   - **Monitoring Interval:** 5 minutes
   - **Alert Contacts:** Your email
3. Create SSL monitor:
   - **URL:** www.monconbuild.com
   - **Days Before Expiry Alert:** 30 days

### Option 2: Sentry Error Tracking (Free tier)

1. Sign up: https://sentry.io
2. Create new project (React + Python)
3. Copy DSN keys
4. Add to `.env` files:
   ```bash
   # frontend/.env
   REACT_APP_SENTRY_DSN=your_frontend_dsn

   # backend/.env
   SENTRY_DSN=your_backend_dsn
   ```
5. Install and configure (see SECURITY_CHECKLIST.md section 7)

### Option 3: Snyk Monitoring (Free for Open Source)

1. Sign up: https://snyk.io
2. Connect GitHub repository
3. Snyk will automatically:
   - Scan dependencies weekly
   - Create PRs for fixes
   - Alert on new vulnerabilities

---

## Emergency Response Checklist

### If You Detect a Security Issue:

1. **Immediate Actions:**
   - [ ] Document the issue (what, when, how discovered)
   - [ ] Assess severity (Critical/High/Medium/Low)
   - [ ] Determine if site needs to be taken offline

2. **For Critical Issues:**
   - [ ] Disable affected functionality immediately
   - [ ] Notify users if data was compromised
   - [ ] Apply fix or temporary mitigation
   - [ ] Deploy fix to production
   - [ ] Verify fix worked

3. **For High/Medium Issues:**
   - [ ] Create GitHub issue (private if security-sensitive)
   - [ ] Develop and test fix
   - [ ] Deploy during next maintenance window
   - [ ] Update security documentation

4. **Post-Incident:**
   - [ ] Document root cause
   - [ ] Update security checklist to prevent recurrence
   - [ ] Schedule security audit review

---

## Common Security Tasks

### Update Dependencies with Vulnerabilities

```bash
# Frontend
cd frontend
npm audit fix
# If that doesn't work:
npm audit fix --force

# Backend
cd backend
pip install --upgrade [package-name]
```

### Test Security Headers Locally

```bash
# Start local server
cd frontend
npm start

# In another terminal, check headers
curl -I http://localhost:3000
```

### Generate Security Report

```bash
# Run full security scan
.\security-check.ps1

# Report saved to: security-reports/security-report-YYYY-MM-DD.txt
```

### Check for Exposed Secrets

```bash
# Install gitleaks
# Windows: choco install gitleaks
# Mac: brew install gitleaks

# Scan repository
gitleaks detect --source . --verbose
```

---

## Performance vs Security Trade-offs

### Current Configuration Balance:

| Feature | Security Level | Performance Impact |
|---------|---------------|-------------------|
| HSTS | ✅ Max | None |
| CSP | ✅ Restrictive | Minimal (blocks inline scripts) |
| X-Frame-Options | ✅ DENY | None |
| Rate Limiting | ⚠️ Not implemented | Would add ~5ms latency |
| CSRF Tokens | ⚠️ Not implemented | Would add ~10ms latency |
| Input Validation | ✅ Pydantic | ~2ms per request |

**Recommendation:** Implement rate limiting on backend API endpoints for production.

---

## Security Metrics to Track

### Key Performance Indicators (KPIs):

1. **Dependency Health**
   - Target: 0 critical/high vulnerabilities
   - Measure: Weekly via Dependabot

2. **Security Header Score**
   - Target: A+ on securityheaders.com
   - Measure: Monthly manual check

3. **SSL/TLS Grade**
   - Target: A+ on SSL Labs
   - Measure: Monthly manual check

4. **Uptime**
   - Target: 99.9% uptime
   - Measure: UptimeRobot continuous monitoring

5. **Time to Patch**
   - Target: < 7 days for critical issues
   - Measure: Track in GitHub issues

---

## Resources & References

### Tools Used:
- **npm audit** - Frontend dependency scanning
- **Safety** - Python dependency scanning
- **Bandit** - Python code security analysis
- **OWASP ZAP** - Web application security scanner
- **SSL Labs** - SSL/TLS configuration testing
- **SecurityHeaders.com** - HTTP header analysis

### Documentation:
- [Full Security Checklist](./SECURITY_CHECKLIST.md)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Vercel Security](https://vercel.com/docs/security)
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)

### Support:
- **GitHub Security Advisories:** https://github.com/klassiik/monconbuild/security/advisories
- **Vercel Support:** https://vercel.com/support
- **OWASP Community:** https://owasp.org/slack/invite

---

## Quick Reference Commands

```bash
# Frontend security check
cd frontend && npm run security:audit

# Backend security check
cd backend && safety check && bandit -r . -ll

# Full site security scan
.\security-check.ps1

# Update all dependencies
cd frontend && npm run security:update
cd backend && pip-audit --fix

# Check security headers
curl -I https://www.monconbuild.com | grep -E "X-|Security|Policy"

# Check SSL certificate
echo | openssl s_client -connect www.monconbuild.com:443 | openssl x509 -noout -dates
```

---

**Last Updated:** October 24, 2025  
**Review Schedule:** Update this guide quarterly or after any security incident
