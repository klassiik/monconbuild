# 🔒 Security Quick Reference Card

## One-Line Commands

```bash
# Run full security scan
.\security-check.ps1

# Frontend security audit
cd frontend && npm run security:audit

# Backend security check  
cd backend && safety check && pip-audit

# Check security headers
curl -I https://www.monconbuild.com | findstr /I "Security Frame Content"

# Update all dependencies
cd frontend && npm run security:update
```

## Critical URLs

| Check | URL | Target |
|-------|-----|--------|
| Security Headers | https://securityheaders.com/?q=www.monconbuild.com | A+ |
| SSL Grade | https://www.ssllabs.com/ssltest/analyze.html?d=www.monconbuild.com | A+ |
| GitHub Security | https://github.com/klassiik/monconbuild/security | 0 alerts |
| Vercel Dashboard | https://vercel.com/klassiiks-projects | Monitor |

## Weekly Checklist

- [ ] Monday: Run `.\security-check.ps1`
- [ ] Review Dependabot PRs
- [ ] Check GitHub Security alerts
- [ ] Verify site uptime (99.9%+)

## Emergency Contacts

- **GitHub Security:** security@github.com
- **Vercel Support:** security@vercel.com
- **Documentation:** See SECURITY_QUICK_START.md

## Files to Know

| File | Purpose |
|------|---------|
| `SECURITY_CHECKLIST.md` | Complete reference (900+ lines) |
| `SECURITY_QUICK_START.md` | Quick start guide |
| `SECURITY_IMPLEMENTATION_SUMMARY.md` | What was implemented |
| `security-check.ps1` | Automated scanner |
| `.github/workflows/security-scan.yml` | CI/CD security |
| `.github/dependabot.yml` | Auto-updates |

## Security Headers (vercel.json)

✅ Strict-Transport-Security  
✅ Content-Security-Policy  
✅ X-Frame-Options  
✅ X-Content-Type-Options  
✅ X-XSS-Protection  
✅ Referrer-Policy  
✅ Permissions-Policy  

## Automation Status

✅ Weekly dependency scans (Dependabot)  
✅ Security scan on every commit (GitHub Actions)  
✅ CodeQL analysis on PRs  
✅ SSL monitoring  
✅ Automated security reports  

---

**Last Updated:** October 24, 2025  
**Status:** ✅ All Systems Operational
