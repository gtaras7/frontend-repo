import { apiBaseUrl, configuredApiUrl } from "./config";

if (process.env.NODE_ENV === "production") {
  if (configuredApiUrl === undefined || configuredApiUrl.length === 0) {
    throw new Error("NEXT_PUBLIC_API_URL must be set to an https:// NestJS origin in production.");
  }
  if (!configuredApiUrl.startsWith("https://")) {
    throw new Error(
      `NEXT_PUBLIC_API_URL must use https:// in production (got "${configuredApiUrl}").`,
    );
  }
}

export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, message: string, body: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

type ApiFetchOptions = Omit<RequestInit, "body"> & {
  json?: unknown;
  token?: string;
};

/**
 * The only way this app talks to NestJS. All patient data, auth and AI calls go through here.
 * Do not add an API route or a server action to do the same job — see the BFF contract in AGENTS.md.
 */
export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { json, token, headers, ...init } = options;

  const requestHeaders = new Headers(headers);
  requestHeaders.set("Accept", "application/json");
  if (json !== undefined) requestHeaders.set("Content-Type", "application/json");
  if (token !== undefined) requestHeaders.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: requestHeaders,
    body: json === undefined ? undefined : JSON.stringify(json),
  });

  if (!response.ok) {
    const body: unknown = await response.json().catch(() => null);
    throw new ApiError(response.status, `Request to ${path} failed`, body);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
