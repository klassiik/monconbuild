## 2025-10-26 - [FastAPI Middleware and Exception Handler Crashing (Unhandled 500s)]
**Vulnerability:** The backend `server.py` had two major issues that caused the server to return unhandled 500 Internal Server Error crashes instead of intended secure responses:
1. `rate_limit_middleware` raised `HTTPException(status_code=429)` which bypasses FastAPI route exception handlers in a Starlette `http` middleware context.
2. `@app.exception_handler` functions returned a raw `dict` instead of a valid `JSONResponse`, causing a `TypeError` within the exception handler framework, falling back to a raw stack-trace or unhandled 500 error.
**Learning:** Raising exceptions in Starlette `http` middleware or returning raw dictionaries from FastAPI exception handlers completely breaks expected security features (rate limiting and secure error responses), turning them into unhandled crashes that can be used for DoS amplification or information leakage.
**Prevention:** Always return a `JSONResponse` (or `Response` subclass) directly from HTTP middleware when short-circuiting a request, and always return a `Response` subclass from `@app.exception_handler` decorators.

## 2025-10-26 - [XSS via JSON-LD injection]
**Vulnerability:** In `frontend/src/components/FAQSection.jsx`, the JSON-LD `<script>` tag injected dynamically-generated JSON string using `dangerouslySetInnerHTML` without escaping HTML entities. If user-provided text contained `</script><script>alert(1)</script>`, it could break out of the JSON string and script tag context, leading to Cross-Site Scripting (XSS).
**Learning:** `dangerouslySetInnerHTML` treats the string literally. While JSON.stringify quotes strings, it does not escape HTML control characters like `<`. The browser parses the script block looking for `</script>`, and it will interpret it as the end of the script block even if it's inside a JSON string literal.
**Prevention:** Always escape `<` characters using `.replace(/</g, '\\u003c')` when injecting stringified JSON into script tags via `dangerouslySetInnerHTML` to prevent context switching.
