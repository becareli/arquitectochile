# Memory Index

- [Vercel deploy from Replit](vercel-deploys.md) — npm installs in Replit write package-firewall.replit.local URLs into package-lock.json; must rewrite to registry.npmjs.org before pushing or Vercel builds fail.

- [Dev DB schema drift](dev-db-schema-drift.md) — dev database can lag shared/schema.ts (missing blog image columns); full-row Drizzle selects then fail. Use narrow selects or run db:push.
