## 2025-10-26 - [FastAPI Middleware and Exception Handler Crashing (Unhandled 500s)]
**Vulnerability:** The backend `server.py` had two major issues that caused the server to return unhandled 500 Internal Server Error crashes instead of intended secure responses:
1. `rate_limit_middleware` raised `HTTPException(status_code=429)` which bypasses FastAPI route exception handlers in a Starlette `http` middleware context.
2. `@app.exception_handler` functions returned a raw `dict` instead of a valid `JSONResponse`, causing a `TypeError` within the exception handler framework, falling back to a raw stack-trace or unhandled 500 error.
**Learning:** Raising exceptions in Starlette `http` middleware or returning raw dictionaries from FastAPI exception handlers completely breaks expected security features (rate limiting and secure error responses), turning them into unhandled crashes that can be used for DoS amplification or information leakage.
**Prevention:** Always return a `JSONResponse` (or `Response` subclass) directly from HTTP middleware when short-circuiting a request, and always return a `Response` subclass from `@app.exception_handler` decorators.

## 2025-10-26 - [XSS via JSON-LD in dangerouslySetInnerHTML]
**Vulnerability:** In `FAQSection.jsx`, user-provided or dynamic FAQ content was serialized directly into a `<script type="application/ld+json">` tag using `dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}` without escaping. An attacker could embed `</script><script>alert(1)</script>` into a question or answer, which `JSON.stringify` leaves as-is, terminating the script block and executing arbitrary JavaScript.
**Learning:** `JSON.stringify` does not escape HTML characters like `<` and `>`. When injecting JSON directly into HTML using `dangerouslySetInnerHTML` (which is necessary here because Vite's SSG incorrectly escapes double quotes in React text children), the output must be manually sanitized for HTML context.
**Prevention:** Always escape `<` characters (e.g., using `.replace(/</g, '\u003c')`) when injecting JSON payloads into HTML `<script>` blocks via `dangerouslySetInnerHTML`.

## 2025-10-26 - [hmac.compare_digest TypeError on Non-ASCII Strings (DoS Vector)]
**Vulnerability:** In `AuthenticationMiddleware.verify_auth`, `hmac.compare_digest` was called directly on string inputs (e.g., `hmac.compare_digest(api_key, API_SECRET_KEY)`). If the `api_key` string contained non-ASCII characters, Python's `hmac.compare_digest` would raise a `TypeError`, causing an unhandled 500 Internal Server Error crash. This could be exploited as a Denial of Service (DoS) attack.
**Learning:** Python's `hmac.compare_digest` only supports comparing ASCII strings or bytes. Passing non-ASCII strings directly causes a `TypeError` which can bypass standard error handling and crash requests ungracefully.
**Prevention:** Always encode strings to bytes (e.g., `.encode('utf-8')`) before passing them to `hmac.compare_digest` when comparing potentially unsafe or user-provided input.
