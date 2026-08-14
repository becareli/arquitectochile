---
name: Vercel deploy from Replit
description: Lockfile firewall URLs break Vercel builds; how the GitHub→Vercel pipeline works for this project
---

**Rule:** Before pushing to GitHub (repo becareli/arquitectochile, public), check `package-lock.json` for `package-firewall.replit.local` URLs and rewrite them: `sed -i 's|http://package-firewall.replit.local/npm/|https://registry.npmjs.org/|g' package-lock.json`.

**Why:** Replit's package firewall proxies npm installs and records its internal host in the lockfile `resolved` fields. Vercel (and any external CI) cannot resolve that host, so `npm install` fails with ENOTFOUND. Happened 2026-08-14 after installing react-helmet-async and security-fix packages.

**How to apply:** Any time an npm install/update happens in this workspace and the user deploys via Vercel, rewrite the lockfile URLs before `git push origin main`. Integrity hashes are unchanged, so the sed rewrite is safe. Production deploys: GitHub push to `main` auto-triggers Vercel; user is on Vercel free tier (repo must stay public).
