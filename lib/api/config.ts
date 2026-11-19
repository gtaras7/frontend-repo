export const DEFAULT_API_ORIGIN = "http://localhost:3001";
export const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL;
export const apiBaseUrl = configuredApiUrl ?? DEFAULT_API_ORIGIN;
