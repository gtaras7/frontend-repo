# Security hardening — CardioGuard frontend

Living checklist for the Next.js app. **Auth, SSE, and GDPR gates are human-owned**
(AGENTS.md); this file records what the frontend must not invent alone.

Related: BFF contract in `AGENTS.md`, NestJS owns JWT/patient data/SSE source.

## Audit snapshot (2026-09-15)

### Clean / low risk today

- No committed secrets; `.env*` ignored except `.env.example`
- No auth/JWT persistence yet (`apiFetch` Bearer hook is unused)
- No SSE client yet
- Locale JSON import gated by `hasLocale` → `notFound()`
- No open `returnUrl` redirects
- Chat bubbles render React text children (not HTML)
- `AssetIcon` renders static trusted SVG from `icons-figma.ts`

### Fixed in the do-now pass

- Onboarding mocks are **opt-in** (`NEXT_PUBLIC_MOCK_ONBOARDING=1` + non-production)
- Interim non-PHI consent cookie gate before `/register` (replace with NestJS progress)
- Baseline security headers + CSP **Report-Only** in `next.config.ts`
- Production requires `https://` `NEXT_PUBLIC_API_URL`
- CI: `npm audit`, BFF gate includes `"use server"`, mock flag rejected, Dependabot

## Future backlog (with NestJS / product)

### Auth and sessions (human-owned)

- [ ] Prefer **httpOnly + Secure + SameSite** refresh cookies **or** short-lived Bearer **in memory** — never long-lived JWT in `localStorage`
- [ ] NestJS CORS allowlist (web origin only); no `*`
- [ ] If cookies: CSRF strategy (double-submit or SameSite strict + custom header)
- [ ] Protect `(app)` and clinician routes via NestJS session check — not UI-only
- [ ] Replace interim `cardioguard.onboarding.consent` cookie with NestJS progress/auth (D1/D2)

### Chat and SSE

- [ ] Keep AI output as text or sanitize markdown (e.g. rehype-sanitize); never `dangerouslySetInnerHTML` on model output
- [ ] SSE: auth on connect, reconnect backoff, **no token in query string**, abort on logout
- [ ] Treat stream payloads as untrusted text
- [ ] Review textarea sizing before wiring ChatComposer to live chat
- [ ] Define how callers guarantee required clinical disclaimers and nonempty source lists

### Client data / GDPR ops

- [ ] No health payloads in `localStorage` / `sessionStorage`
- [ ] Clear in-memory TanStack/Zustand caches on logout
- [ ] No PHI in client logs, Sentry breadcrumbs, or analytics without DPA review
- [ ] Guest path (`04g`): reversible local-only mode must not look like persisted clinical consent
- [ ] Delete mock seams (`isOnboardingMockEnabled`, `consentFail` sessionStorage) when NestJS mocks are gone
- [ ] Replace `lib/api/mock-account.ts` and demo Query hooks with approved NestJS/OpenAPI contracts.
  The fixed demo marker is not authentication or consent evidence. Only that marker and synthetic
  failure switches use sessionStorage; passwords/email input are never passed to the mock service,
  and age answers remain in memory. Reset clears the demo marker and its Query cache. Production
  disables mocks even when the opt-in flag is set. See [the mock guard](../lib/api/mock-onboarding.ts).

### CSP and hosting

- [ ] Move CSP from Report-Only to enforcing once font/API/SSE origins stabilize
- [ ] Review the API client's production URL validation together with the CSP origin fallback before changing either behavior
- [ ] Review stronger BFF checks for route export forms and component server actions that the current grep misses
- [ ] EU hosting / cookie domain decisions with Backend
- [ ] Revisit `dangerouslySetInnerHTML` for icons if SVG sources ever become user/CMS-fed

## Local development

```bash
cp .env.example .env.local
# NEXT_PUBLIC_MOCK_ONBOARDING=1 keeps splash/consent walkable without NestJS
npm run dev
```

Production / CI builds must **not** set `NEXT_PUBLIC_MOCK_ONBOARDING=1`, and must set
`NEXT_PUBLIC_API_URL` to an `https://` NestJS origin.
