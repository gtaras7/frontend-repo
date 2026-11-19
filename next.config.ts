import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import { apiBaseUrl, DEFAULT_API_ORIGIN } from "./lib/api/config";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

function apiConnectOrigin(): string {
  try {
    return new URL(apiBaseUrl).origin;
  } catch {
    return DEFAULT_API_ORIGIN;
  }
}

/** Report-only starter CSP — tighten to enforcing once origins stabilize (see docs/security-hardening.md). */
const cspReportOnly = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob:",
  `connect-src 'self' ${apiConnectOrigin()}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy-Report-Only", value: cspReportOnly },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // BFF contract: this app renders. It never talks to a database.
  // Nothing in the Next.js codebase may import prisma/db or define an API route.
  headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
