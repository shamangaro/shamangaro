/**
 * API base URL resolution.
 *
 * Browser: always same-origin `/api`
 *   - production: nginx proxies /api/* → FastAPI
 *   - local dev: Next.js rewrite proxies /api/* → http://localhost:8000
 *
 * Server / middleware: direct backend URL (Docker internal or localhost:8000).
 */
export function getApiBase(): string {
  if (typeof window !== "undefined") {
    return "/api";
  }

  return (
    process.env.INTERNAL_API_URL ??
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
    "http://localhost:8000"
  );
}
