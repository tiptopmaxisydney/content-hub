# content-hub

Shared Payload CMS serving content (pages, blog posts, media) to all four Tiptop
marketing sites: baby-seat-taxi-sydney, transport-solutions-sydney, wheelchair-taxi-sydney,
tiptopride-landing. One admin panel, one database, each site scoped by the `sites` collection.

baby-seat-taxi-sydney and wheelchair-taxi-sydney are wired up so far. transport-solutions-sydney
and tiptopride-landing still serve hardcoded content. See "Adding another site" below.

## Local dev

```
cp .env.example .env   # fill in DATABASE_URI etc - see below
npm install
npm run dev             # http://localhost:3001/admin
```

First run: the admin panel prompts you to create the first user (becomes `role: admin`).

**Database**: reuses the existing Tiptop MongoDB Atlas cluster (see
`Tiptop Website/tipopride-backend/.env` for the base connection string), under its own
`content-hub` database so it never touches live booking data. Verify the Atlas DB user
has access to that database, not just `tiptopride-live` (Atlas users can be scoped
per-database). A `docker-compose.yml` is included if you'd rather run a throwaway local
Mongo instead.

**Note on `transactionOptions: false`** (`src/payload.config.ts`): this shared Atlas
cluster returned `NoSuchTransaction` errors under Payload's default multi-document
transactions during the initial seed. Transactions are disabled - content edits here are
single-document writes, so the atomicity they'd provide isn't load-bearing. Revisit if
the Atlas tier changes.

## Seeding

One-time migration into Payload per site, images included, from a frozen snapshot of
each site's original hardcoded content (`scripts/source-snapshots/<site>/`, taken from
`lib/servicePages.ts` / `lib/blogPosts.ts` before that site was rewired to fetch from
this CMS - those files no longer hold the raw data themselves). Safe to re-run (upserts
by site+slug).

```
npm run seed:baby-seat
npm run seed:wheelchair
```

## How a frontend site consumes this

Each frontend fetches its own content straight from the REST API, scoped with
`?where[site.key][equals]=<site-key>`. See `baby-seat-taxi-sydney/lib/cmsClient.ts` for
the pattern. Pages are cached with Next.js ISR (1hr) and revalidated on-demand: every
`pages`/`blog-posts` write here pings the frontend's `/api/revalidate` (see
`FRONTEND_URLS` in `.env` and `src/hooks/revalidateFrontend.ts`).

## Adding another site (transport-solutions, tiptopride-landing)

1. Add a `sites` doc for it in the admin panel (or extend the `key` options in
   `src/collections/Sites.ts` first).
2. Look at that site's `lib/*.ts` content files and decide whether the existing `pages`
   / `blog-posts` schema fits, or whether it needs its own fields - baby-seat and
   wheelchair happened to share the exact same `ServicePage`/`BlogPost` shape, but don't
   assume the rest will.
3. Copy `scripts/seed-wheelchair.ts` as a starting point for that site's migration
   script - it (and seed-baby-seat.ts) share their upsert/media-upload logic via
   `scripts/seedUtils.ts`.
4. Add `lib/cmsClient.ts` + rewire `lib/*.ts` in that site's repo the same way it was
   done for baby-seat-taxi-sydney and wheelchair-taxi-sydney (see either repo's
   `lib/servicePages.ts` / `lib/blogPosts.ts` / `lib/cmsClient.ts`, and grep that repo
   for `from "@/lib/servicePages"` / `from "@/lib/blogPosts"` to find every call site -
   it was 4 files for baby-seat, 3 for wheelchair, don't assume the count).
5. Add an `/api/revalidate` route (copy from either migrated site) and a
   `remotePatterns` entry for the CMS in `next.config.ts`.
6. Add the new site's dev URL to `FRONTEND_URLS` in `content-hub/.env`, and
   `NEXT_PUBLIC_CMS_URL` + `REVALIDATE_SECRET` to the site's own `.env.local`.

## Deploying (DigitalOcean)

Runs at **cms.babyseattaxisydney.com.au** on port **3020**, same pattern as the other
Tiptop services (see `deploy/nginx-content-hub.conf` and `content-hub/README.md`'s
deploy runbook run from the actual chat session for the exact commands used - DNS for
that subdomain must point at the droplet before the certbot step will succeed). In
short: `npm ci && npm run build`, then
`pm2 start npm --name "content-hub" -- start -- -p 3020`, `pm2 save`, add the nginx
vhost, `certbot --nginx -d cms.babyseattaxisydney.com.au`.

Set real values for `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`
(`https://cms.babyseattaxisydney.com.au`), `CORS_ORIGINS` / `REVALIDATE_SECRET` /
`FRONTEND_URLS` (each frontend's production URL, e.g.
`{"baby-seat":"https://new.babyseattaxisydney.com.au"}`) in the server's `.env` - do not
reuse the local dev secrets checked into this repo's `.env`.
