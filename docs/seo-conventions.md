# SEO editorial conventions

Read this before publishing new `pages` or `locations` docs for transport-solutions (or any site
using the same fields). Enforced-in-code rules are noted; everything else is editor discipline.

## Publish workflow (`seoStatus`)

Every `pages`/`locations`/`blog-posts` doc has a `seoStatus`: `draft` -> `review` -> `approved`.
A page is only indexed (sitemap + `<meta name="robots">`) once **both** are true:

- `seoStatus` is `approved`
- it passes the frontend's structural quality check (title/description length, h1, image,
  hero description, at least one body-content block - see `transport-solutions-sydney/lib/seo.ts`)

Use `indexOverride` (`forceIndex` / `forceNoindex`) to bypass that combined rule in either
direction - e.g. to hand-publish a thin page you've reviewed and are confident in, or to pull a
page from the index without deleting it.

New docs default to `draft`, so a brand-new suburb/service page is safely un-indexed until you
flip it to `approved`.

## One keyword, one URL (`targetKeyword`)

Set `targetKeyword` to the primary search phrase this page should own. **Enforced in code**: you
cannot save two `pages`/`locations` docs on the same site with the same `targetKeyword` - the
cannibalization guard blocks it with the conflicting doc's slug. If two pages seem to want the
same keyword, that's a signal to either merge them or sharpen one page's angle (e.g. "maxi taxi
Parramatta" vs "11 seater taxi Parramatta" - different intent, different URL).

## Internal links (`relatedLinks` / `services`)

Prefer the `targetPage` / `targetLocation` relationship fields over typing a path into `href`.
A relationship stays correct automatically if the target's slug ever changes; a typed `href`
silently breaks. `href` still works as a fallback when neither relationship field is set.

## FAQs: page-specific vs. shared library

Each page/location has its own embedded `faq` list for questions specific to that page. For a
question that's likely to recur across many pages (car seats, luggage, payment, cancellation),
add it once to the `faq-library` collection with the right tags, then attach it via `relatedFaqs`
instead of retyping the answer on every page. The frontend merges both lists (deduped by
question) when rendering.

## Vehicle facts (`vehicle-specs`)

Passenger capacity, luggage capacity and fleet features live in the `vehicle-specs` collection,
not typed inline into page content. If a vehicle's capacity changes, update it once there and
every page using the Vehicle Options / Passenger Capacity modules picks it up automatically.

## Don't bulk-generate

Per the original SEO brief: new location/service pages should be created and reviewed in small
batches (a handful at a time, `seoStatus: review`), not generated en masse. Flip to `approved`
only after a human has actually read the page.
