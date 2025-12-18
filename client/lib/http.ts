type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export class HttpError extends Error {
  constructor(
    message: string,
    public status: number,
    public payload?: unknown
  ) {
    super(message);
  }
}

export async function http<TResponse>(
  url: string,
  options?: {
    method?: HttpMethod;
    body?: Json;
    headers?: Record<string, string>;
    signal?: AbortSignal;
  }
): Promise<TResponse> {
  const res = await fetch(url, {
    method: options?.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
    signal: options?.signal,
  });

  const contentType = res.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await res.json().catch(() => null) : await res.text().catch(() => null);

  if (!res.ok) {
    const msg =
      (payload && typeof payload === "object" && "message" in payload && (payload as any).message) ||
      `Request failed (${res.status})`;
    throw new HttpError(String(msg), res.status, payload);
  }

  return payload as TResponse;
}
