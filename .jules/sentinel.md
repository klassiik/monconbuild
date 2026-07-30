## 2025-10-26 - [FastAPI Middleware and Exception Handler Crashing (Unhandled 500s)]
**Vulnerability:** The backend `server.py` had two major issues that caused the server to return unhandled 500 Internal Server Error crashes instead of intended secure responses:
1. `rate_limit_middleware` raised `HTTPException(status_code=429)` which bypasses FastAPI route exception handlers in a Starlette `http` middleware context.
2. `@app.exception_handler` functions returned a raw `dict` instead of a valid `JSONResponse`, causing a `TypeError` within the exception handler framework, falling back to a raw stack-trace or unhandled 500 error.
**Learning:** Raising exceptions in Starlette `http` middleware or returning raw dictionaries from FastAPI exception handlers completely breaks expected security features (rate limiting and secure error responses), turning them into unhandled crashes that can be used for DoS amplification or information leakage.
**Prevention:** Always return a `JSONResponse` (or `Response` subclass) directly from HTTP middleware when short-circuiting a request, and always return a `Response` subclass from `@app.exception_handler` decorators.
## 2023-10-26 - [XSS via JSON-LD Schema Injection]
**Vulnerability:** The application used `{JSON.stringify(schema)}` inside `<script type="application/ld+json">` tags, and also used `dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}` without escaping. This exposes the application to XSS attacks where an attacker could inject `</script><script>alert(1)</script>` into schema data.
**Learning:** React's default protection against XSS does not apply when rendering raw strings inside script tags or using `dangerouslySetInnerHTML`.
**Prevention:** Always escape `<` characters when injecting JSON data into script tags using `.replace(/</g, '\\u003c')`.
