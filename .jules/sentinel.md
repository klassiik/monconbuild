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

## 2024-05-20 - [Fix TypeError vulnerability in API Key comparison]
**Vulnerability:** A `TypeError` crashing the backend with a `500 Internal Server Error` was possible when passing a non-ASCII character (e.g. `test😎`) via the `Authorization` header to an endpoint requiring authentication. This effectively caused a denial of service (DoS) or unexpected application crash due to Python's `hmac.compare_digest` function being unable to process Unicode directly.
**Learning:** Python's `hmac.compare_digest` does not support comparing strings containing non-ASCII characters directly. Supplying such characters crashes the process with `TypeError`. Thus string inputs derived from headers or requests must always be encoded into bytes (e.g., using `.encode('utf-8')`) before comparison.
**Prevention:** Always encode user-provided string inputs and corresponding secrets to UTF-8 bytes before performing cryptographic comparisons like `hmac.compare_digest` in Python to guarantee safe processing regardless of input encoding.
