/**
 * API base URL resolution.
 *
 * Production (browser): always `/api` — nginx strips the prefix and proxies to FastAPI.
 * Local dev (browser): `NEXT_PUBLIC_API_URL` e.g. http://localhost:8000
 * Server / middleware: `INTERNAL_API_URL` (Docker) or fallbacks without /api prefix.
 */
export function getApiBase(): string {
  if (typeof window !== "undefined") {
    const env = process.env.NEXT_PUBLIC_API_URL ?? "";
    if (env.includes("localhost") || env.includes("127.0.0.1")) {
      return env.replace(/\/$/, "");
    }
    return "/api";
  }

  return (
    process.env.INTERNAL_API_URL ??
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
    "http://localhost:8000"
  );
}
