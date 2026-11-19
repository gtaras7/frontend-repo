# types — generated, do not hand-write

API types are generated from the backend OpenAPI spec so the frontend and NestJS agree by
construction. Nothing is committed here that a script can produce.

```bash
npx openapi-typescript "$NEXT_PUBLIC_API_URL/docs-json" -o types/api.d.ts
```

Until that is wired up, hand-written types are allowed **only** for things the backend does not
own (pure UI state, design-system prop types), and they live next to what uses them.
