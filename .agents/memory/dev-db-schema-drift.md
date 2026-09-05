---
name: Dev DB schema drift
description: Development database can be behind shared/schema.ts, breaking full-row Drizzle queries
---
The development (Neon) database was missing `image_width`/`image_height` columns on `blog_posts` even though `shared/schema.ts` declares them, so any `db.select().from(blogPosts)` (full-row) query failed with "column does not exist" (Aug 2026).

**Why:** Drizzle full-row selects enumerate every schema column; if the live DB lags the schema, the query errors even when the missing columns aren't needed.

**How to apply:** When adding server routes that read tables with recently added columns, either run `npm run db:push` first or use a narrow `.select({...})` with only the columns needed (safer for read-only endpoints like sitemaps).
