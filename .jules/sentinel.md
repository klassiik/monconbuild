## 2025-10-26 - [FastAPI Middleware and Exception Handler Crashing (Unhandled 500s)]
**Vulnerability:** The backend `server.py` had two major issues that caused the server to return unhandled 500 Internal Server Error crashes instead of intended secure responses:
1. `rate_limit_middleware` raised `HTTPException(status_code=429)` which bypasses FastAPI route exception handlers in a Starlette `http` middleware context.
2. `@app.exception_handler` functions returned a raw `dict` instead of a valid `JSONResponse`, causing a `TypeError` within the exception handler framework, falling back to a raw stack-trace or unhandled 500 error.
**Learning:** Raising exceptions in Starlette `http` middleware or returning raw dictionaries from FastAPI exception handlers completely breaks expected security features (rate limiting and secure error responses), turning them into unhandled crashes that can be used for DoS amplification or information leakage.
**Prevention:** Always return a `JSONResponse` (or `Response` subclass) directly from HTTP middleware when short-circuiting a request, and always return a `Response` subclass from `@app.exception_handler` decorators.

## 2023-10-26 - [XSS via dangerouslySetInnerHTML and JSON-LD]
**Vulnerability:** The `FAQSection.jsx` component used `dangerouslySetInnerHTML` to inject a dynamically generated JSON-LD string (`JSON.stringify(faqSchema)`). If `faq.answer` or `faq.question` contained `</script>`, it could break out of the script tag and lead to Cross-Site Scripting (XSS).
**Learning:** `vite-react-ssg` serialization incorrectly escapes double quotes in regular JSX text children, necessitating the use of `dangerouslySetInnerHTML` for `<script>` tags like JSON-LD. However, using `dangerouslySetInnerHTML` directly with unescaped JSON strings creates an XSS vulnerability that must be manually mitigated in this codebase.
**Prevention:** Always escape `<` characters (e.g., using `.replace(/</g, '\u003c')`) when injecting JSON-LD schemas or other JSON data into `<script>` tags via `dangerouslySetInnerHTML` in the frontend.
