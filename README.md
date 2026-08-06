# TanStack + shadcn/ui + Vercel

A small React starter built with Vite, TanStack Router, TanStack Query, Tailwind CSS, and shadcn/ui conventions.

## UI preset

This project uses the shadcn/ui preset `b59jJA8cVf`, applied with `npx shadcn@latest apply --preset b59jJA8cVf`.

## Run locally

```bash
npm install
npm run dev
```

## Deploy on Vercel

Push the repository to GitHub, GitLab, or Bitbucket and import it in Vercel. Vercel detects Vite and runs `npm run build`; the included `vercel.json` serves `index.html` for client-side routes.

## Project structure

- `src/router.tsx` — typed route definitions and app shell
- `src/routes` — page components
- `src/components/ui` — shadcn-compatible UI primitives
- `src/lib/utils.ts` — the `cn` class utility
