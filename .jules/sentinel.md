## 2025-10-26 - [FastAPI Middleware and Exception Handler Crashing (Unhandled 500s)]
**Vulnerability:** The backend `server.py` had two major issues that caused the server to return unhandled 500 Internal Server Error crashes instead of intended secure responses:
1. `rate_limit_middleware` raised `HTTPException(status_code=429)` which bypasses FastAPI route exception handlers in a Starlette `http` middleware context.
2. `@app.exception_handler` functions returned a raw `dict` instead of a valid `JSONResponse`, causing a `TypeError` within the exception handler framework, falling back to a raw stack-trace or unhandled 500 error.
**Learning:** Raising exceptions in Starlette `http` middleware or returning raw dictionaries from FastAPI exception handlers completely breaks expected security features (rate limiting and secure error responses), turning them into unhandled crashes that can be used for DoS amplification or information leakage.
**Prevention:** Always return a `JSONResponse` (or `Response` subclass) directly from HTTP middleware when short-circuiting a request, and always return a `Response` subclass from `@app.exception_handler` decorators.

## 2025-10-27 - [JSON-LD XSS Vulnerability in SSG React Component]
**Vulnerability:** The `FAQSection.jsx` component used `dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}` to serialize structured schema data. Because `JSON.stringify` does not escape HTML control characters like `<` and `>`, this could allow a cross-site scripting (XSS) payload embedded in the FAQ question or answer to terminate the `<script>` tag and execute arbitrary HTML/JavaScript.
**Learning:** `JSON.stringify` output is not inherently safe to embed in a `<script>` tag inside HTML. The browser's HTML parser will still process the content and can break out of the script tag if a closing `</script>` tag is encountered inside a JSON string.
**Prevention:** When embedding JSON in an HTML `<script>` tag, always escape the `<` character (and ideally others) using something like `.replace(/</g, '\\u003c')` so that the HTML parser doesn't incorrectly interpret it as an HTML tag while still remaining valid JSON.
