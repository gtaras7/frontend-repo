# lib

| Path | Holds |
|---|---|
| `api/client.ts` | the typed `apiFetch` wrapper. **The only way this app talks to NestJS.** |
| `api/` | one module per backend area, e.g. `consent.ts`, `bootstrap.ts`, `auth.ts` |
| `onboarding/` | baseline answer types, choices and validation |
| `onboarding-consent-gate.ts` | temporary consent flag shared by the demo form and route guard |
| *(later)* `sse.ts` | the chat stream client |
| *(later)* `auth.ts` | token handling |

## Two boundaries that live here

1. **The BFF contract (AGENTS.md non-negotiable 2).** No API routes, no server actions, no
   `prisma`/`db` imports in this app. ESLint blocks those imports and CI greps for them. If you
   are reaching for one of them, the logic belongs in NestJS.
2. **Auth and SSE are human-owned.** Per AGENTS.md, AI writes about 80% of the code and humans
   own auth, streaming edge cases, GDPR surfaces and final UX. Do not let an agent "just
   implement" the stream parser or the token refresh — pair on those.
