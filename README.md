# hypermotion-landing

Landing page for [hypermotion.app](https://hypermotion.app). Single-page
marketing site built on Next.js 15 + Tailwind v4.

## Run

```sh
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm start        # serve the build
pnpm typecheck    # tsc --noEmit
```

Requires Node 20+ and pnpm 9+.

## Stack

- **Next.js 15** (App Router, React 19, Server Components)
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **TypeScript strict**

Single page — `app/page.tsx`. No routing, no CMS, no client-side
JavaScript unless explicitly needed. The whole thing is a static
prerender.

## Deploy

The build output is a static + edge-function bundle. Two production-ready
deploy targets:

### Vercel

Connect the repo on Vercel; it auto-detects Next.js. No configuration
needed. Set `hypermotion.app` as the production domain in the project's
domain settings.

### Cloudflare Pages

Use the `@cloudflare/next-on-pages` adapter:

```sh
pnpm add -D @cloudflare/next-on-pages
pnpm next-on-pages
```

Then point Pages at the `.vercel/output/static` directory.

## DNS

Point `hypermotion.app` → A / CNAME records per your platform's
instructions. Apex domain support requires either ALIAS / ANAME records
or Cloudflare's CNAME flattening.

## Editing copy

All page copy lives inline in `app/page.tsx`. Each section is a small
function component — change the strings, save, hot-reload picks it up.
When the page grows enough that sections feel cramped in one file,
split them into `app/_components/`.

## License

Licensed under the [Apache License, Version 2.0](./LICENSE).

Copyright 2026 Siddharth Ponnapalli.
