# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
# Development
npm run dev          # Start dev server (Next.js)
npm run build        # Production build
npm run lint         # ESLint

# Database
npm run db:generate  # Generate Drizzle migrations from schema changes
npm run db:migrate   # Run pending migrations
npm run db:push      # Push schema directly to DB (dev only)
npm run db:setup     # Run custom migration script (scripts/migrate.js)
```

## Architecture

**Wedding invitation generator** — users create digital wedding cards, share via unique URL slug.

**Stack:** Next.js 16 App Router · React 19 · PostgreSQL via Drizzle ORM · S3-compatible storage (Supabase) · Tailwind CSS v4

### Request Flow

1. `/` — landing page with template showcases
2. `/create` — multi-step client form (5 steps: template → couple info → dates → photos → preview)
3. `POST /api/invitations` — creates DB record, returns slug
4. `POST /api/invitations/[slug]/photos` — uploads photos to S3, updates record
5. `/wedding/[slug]` — server-rendered invitation display (redirects home if expired H+1 after wedding date)
6. `GET /api/photos/[...path]` — proxies S3 photos with immutable cache headers

### Key Directories

- `src/app/` — Next.js App Router pages and API routes
- `src/components/templates/` — Three invitation template components (`ElegantTemplate`, `ModernTemplate`, `RusticTemplate`) registered in `index.ts`
- `src/db/` — Drizzle schema (`schema.ts`), DB pool (`index.ts`), SQL migrations
- `src/lib/storage.ts` — DB operations: find/save invitation, slug generation
- `src/types/invitation.ts` — Shared TypeScript interfaces

### Database Schema

Single `invitations` table with: `id` (uuid PK), `slug` (unique), `templateId`, bride/groom names, wedding date/time, venue details, `akadVenue`/`akadTime` (Islamic ceremony), `googleMapsUrl`, `photos` (jsonb array), `message`, timestamps.

### Environment Variables

```
DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME
DATABASE_URL=postgresql://...
S3_ENDPOINT, S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_PUBLIC_URL
```

### Conventions

- Path alias `@/*` maps to `src/*`
- UI text is in Indonesian (Bahasa Indonesia)
- `src/app/create/page.tsx` is a client component (`'use client'`); most other pages/routes are server-side
- Dockerfile uses `output: "standalone"` for containerization
