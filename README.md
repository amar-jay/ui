# Amarjay UI

A component documentation site and shadcn registry built with Vite, TanStack Router, Tailwind CSS, and shadcn/ui conventions.

## UI preset

This project uses the shadcn/ui preset `b59jJA8cVf`, applied with `npx shadcn@latest apply --preset b59jJA8cVf`.

## Run locally

```bash
npm install
npm run dev
```

## Deploy on Vercel

Push the repository to GitHub, GitLab, or Bitbucket and import it in Vercel. Vercel detects Vite and runs `npm run build`; the included `vercel.json` serves `index.html` for client-side routes.

## shadcn registry

The registry source is [registry.json](./registry.json). `npm run build` generates installable registry items in `public/r`, which are served by the deployed site.

After deploying, install an item with its public URL:

```bash
npx shadcn@latest add https://YOUR-DEPLOYMENT-URL/r/audio-player.json
```

The live registry is available at `https://ui.amarjay.com/r`. A custom domain is optional; it only replaces this base URL with a branded one.

## Project structure

- `src/router.tsx` — typed route definitions and app shell
- `src/routes` — page components
- `src/components/ui` — shadcn-compatible UI primitives
- `src/lib/utils.ts` — the `cn` class utility
