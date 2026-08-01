## 2025-10-26 - [FastAPI Middleware and Exception Handler Crashing (Unhandled 500s)]
**Vulnerability:** The backend `server.py` had two major issues that caused the server to return unhandled 500 Internal Server Error crashes instead of intended secure responses:
1. `rate_limit_middleware` raised `HTTPException(status_code=429)` which bypasses FastAPI route exception handlers in a Starlette `http` middleware context.
2. `@app.exception_handler` functions returned a raw `dict` instead of a valid `JSONResponse`, causing a `TypeError` within the exception handler framework, falling back to a raw stack-trace or unhandled 500 error.
**Learning:** Raising exceptions in Starlette `http` middleware or returning raw dictionaries from FastAPI exception handlers completely breaks expected security features (rate limiting and secure error responses), turning them into unhandled crashes that can be used for DoS amplification or information leakage.
**Prevention:** Always return a `JSONResponse` (or `Response` subclass) directly from HTTP middleware when short-circuiting a request, and always return a `Response` subclass from `@app.exception_handler` decorators.

## 2025-10-26 - [XSS Vulnerability via JSON-LD in dangerouslySetInnerHTML]
**Vulnerability:** The `FAQSection.jsx` component used `dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}` to inject JSON-LD into a `<script>` tag. This is vulnerable to Cross-Site Scripting (XSS) if the FAQ data contains user-controlled strings with `</script><script>...` tags, which breaks out of the JSON-LD script context before JSON parsing happens.
**Learning:** React's vite-react-ssg requires `dangerouslySetInnerHTML` for script tags because standard JSX text serialization incorrectly HTML-escapes double quotes (creating invalid JSON). However, `JSON.stringify` does not escape `<` characters, leaving the payload vulnerable to script injection.
**Prevention:** Always escape `<` characters (e.g., using `.replace(/</g, '\\u003c')`) when injecting stringified JSON into script tags via `dangerouslySetInnerHTML`.
