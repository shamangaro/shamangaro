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

type ApiErrorDetailItem = {
  msg?: string;
  message?: string;
};

function stripPydanticPrefix(message: string): string {
  return message.replace(/^Value error,\s*/i, "").trim();
}

function messageFromApiDetail(detail: unknown): string | null {
  if (typeof detail === "string" && detail.trim()) {
    return stripPydanticPrefix(detail.trim());
  }

  if (Array.isArray(detail)) {
    for (const item of detail) {
      if (typeof item === "string" && item.trim()) {
        return stripPydanticPrefix(item.trim());
      }
      if (item && typeof item === "object") {
        const entry = item as ApiErrorDetailItem;
        const raw = entry.msg ?? entry.message;
        if (typeof raw === "string" && raw.trim()) {
          return stripPydanticPrefix(raw.trim());
        }
      }
    }
  }

  return null;
}

function fallbackMessageForStatus(status: number, bodyText: string): string {
  if (status === 0) {
    return "ما قدرناش نوصلو للخادم. تأكدي من الاتصال بالإنترنت وحاولي مرة أخرى.";
  }

  if (status === 502 || status === 503 || status === 504) {
    return "خدمة الطلبات غير متاحة حالياً. حاولي بعد قليل.";
  }

  if (status >= 500) {
    const normalized = bodyText.trim().toLowerCase();
    if (
      !normalized ||
      normalized === "internal server error" ||
      normalized.includes("econnrefused") ||
      normalized.includes("socket hang up")
    ) {
      return "خدمة الطلبات غير متاحة. شغّلي الخادم (backend + قاعدة البيانات) وحاولي مرة أخرى.";
    }
  }

  return "حدث خطأ غير متوقع";
}

async function readApiErrorMessage(res: Response): Promise<string> {
  const bodyText = await res.text();
  if (bodyText) {
    try {
      const parsed = JSON.parse(bodyText) as { detail?: unknown; message?: string };
      const fromDetail = messageFromApiDetail(parsed.detail);
      if (fromDetail) return fromDetail;
      if (typeof parsed.message === "string" && parsed.message.trim()) {
        return stripPydanticPrefix(parsed.message.trim());
      }
    } catch {
      /* plain-text error body */
    }
  }

  return fallbackMessageForStatus(res.status, bodyText);
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
    throw new ApiError(fallbackMessageForStatus(0, ""), 0);
  }

  if (!res.ok) {
    const message = await readApiErrorMessage(res);

    if (process.env.NODE_ENV === "development") {
      console.error("[apiFetch] API error:", {
        method,
        url,
        status: res.status,
        message,
      });
    }

    throw new ApiError(message, res.status);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
