# content-hub

Shared Payload CMS serving content (pages, blog posts, media) to all four Tiptop
marketing sites: baby-seat-taxi-sydney, transport-solutions-sydney, wheelchair-taxi-sydney,
tiptopride-landing. One admin panel, one database, each site scoped by the `sites` collection.

All four sites are wired up: baby-seat-taxi-sydney, wheelchair-taxi-sydney,
transport-solutions-sydney, and tiptopride-landing.

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
npm run seed:transport-solutions          # blog posts (from a clean data array)
npm run seed:transport-solutions-pages    # service pages (hand-transcribed, see below)
npm run seed:tiptopride-landing-pages     # ~176 SEO landing pages (hand-transcribed, see below)
```

**transport-solutions-sydney is a different shape from the other two**, worth knowing about
before touching its schema or seed scripts:
- Its blog posts stored raw HTML (`contentHtml`) instead of a heading+paragraphs array, so
  `BlogPosts.content` (richText) was added alongside the existing `BlogPosts.sections` -
  each site's frontend only reads the field its own posts actually use. The HTML was
  converted to lexical JSON at seed time via `@payloadcms/richtext-lexical`'s
  `convertHTMLToLexical` (needs `jsdom`, a devDependency) - see `seedUtils.ts`'s
  `createHtmlToLexicalConverter`.
- Its service pages were never in a clean data array - they were hardcoded directly in 25
  separate JSX route files (several nested, e.g. `/taxi-services/sydney-airport-transfer/`),
  so there was nothing to freeze automatically. They were transcribed by hand into
  `scripts/source-snapshots/transport-solutions/servicePages.ts` instead. `Pages.contentSections`
  (a generic repeatable heading+paragraphs+bulletList block) was added to accommodate this -
  the original site's fixed `intro`/`features`/`faq` fields were too rigid for pages with
  3+ distinct prose sections each with their own heading.
- Several of those 25 pages also used bespoke one-off visual widgets (a fare table, fleet
  spec grids, a reviews grid, a service-area grid, stat-tile rows) that don't reduce to
  plain text - those were deliberately **not** migrated and don't exist anywhere in the new
  frontend template. The original markup is still recoverable via git history in
  transport-solutions-sydney (the route files were committed before being deleted) if
  someone wants to rebuild any of them as a proper widget later.

**tiptopride-landing** is a large programmatic-SEO site - ~176 pages, one per suburb/service
combo (e.g. `maxi-taxi-parramatta`, `baby-seat-taxi-auburn`), each a separate hardcoded route
importing its own uniquely-named Hero/About/OtherContent component. Like transport-solutions,
there was no clean data array, so it was hand-transcribed into
`scripts/source-snapshots/tiptopride-landing/servicePages.ts`, reusing the same
`Pages.contentSections`/`faq`/`image` fields - no further schema changes were needed. Two
things worth knowing if you touch this site's content again:
- Its "Services" and "FAQ" sections are each one of ~13-14 shared components reused across
  many pages by category (not unique per suburb) - see `FAQ_SETS` and `SERVICES_SETS` in
  `servicePages.ts`, each keyed by the original component's name, transcribed once and
  referenced from every page entry that used it, rather than duplicated 176 times.
- Its hero "feature chip" strips (e.g. "Fixed Fare", "24/7 Service") are unique per page and
  ARE captured - folded into the first `contentSections` entry's `bulletList` alongside that
  section's own content, rather than getting a dedicated field.
- 7 pages were excluded entirely (stay hardcoded): about-us, contact-us, areas-we-serve,
  privacy-policy, app-privacy-policy, cancellation-policy, terms-of-service - core/legal
  pages, not instances of the SEO template.
- This site runs Next 15 (the other three run Next 16) - its `/api/revalidate` route calls
  `revalidateTag(tag)` with one argument, not the two-argument form Next 16 requires.

## How a frontend site consumes this

Each frontend fetches its own content straight from the REST API, scoped with
`?where[site.key][equals]=<site-key>`. See `baby-seat-taxi-sydney/lib/cmsClient.ts` for
the pattern. Pages are cached with Next.js ISR (1hr) and revalidated on-demand: every
`pages`/`blog-posts` write here pings the frontend's `/api/revalidate` (see
`FRONTEND_URLS` in `.env` and `src/hooks/revalidateFrontend.ts`).

## Adding another site

All four Tiptop sites are migrated now. If a fifth site is ever added, this runbook applies
as long as it has a list of distinct addressable pages and/or blog posts (like all four
current sites, despite their differing shapes) - a genuinely different kind of site (e.g. a
single static page with no page/post list) would need its own content type designed instead
of reusing `pages`/`blog-posts`.

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
