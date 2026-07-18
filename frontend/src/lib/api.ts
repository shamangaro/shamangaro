import { getApiBase } from "./api-base";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${getApiBase()}${path}`;
  const method = options.method ?? "GET";

  if (process.env.NODE_ENV === "development") {
    console.debug("[apiFetch]", method, url, options.body ?? "");
  }

  let res: Response;
  try {
    res = await fetch(url, {
      ...options,
      credentials: options.credentials ?? "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("[apiFetch] network error:", { method, url, err });
    }
    const message =
      err instanceof Error ? err.message : "Network request failed";
    throw new ApiError(message, 0);
  }

  if (!res.ok) {
    let message = "حدث خطأ غير متوقع";
    let detail: unknown;
    try {
      detail = await res.json();
      const data = detail as { detail?: string | { msg?: string }[] };
      if (data.detail) {
        message =
          typeof data.detail === "string"
            ? data.detail
            : (data.detail[0]?.msg ?? message);
      }
    } catch {
      /* ignore non-JSON error bodies */
    }

    if (process.env.NODE_ENV === "development") {
      console.error("[apiFetch] API error:", {
        method,
        url,
        status: res.status,
        message,
        detail,
      });
    }

    throw new ApiError(message, res.status);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
