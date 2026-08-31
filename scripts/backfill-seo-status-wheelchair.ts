/**
 * One-off backfill: the wheelchair site's `pages`/`blog-posts` docs predate the `seoStatus`
 * workflow field entirely and are already live and indexed today. wheelchair-taxi-sydney's
 * frontend was just wired up to gate robots-meta and sitemap inclusion on seoStatus==="approved"
 * (see lib/seo.ts) - shipping that gate without this backfill would silently noindex / drop
 * from the sitemap the entire live site. Mirrors backfill-seo-status.ts (written for
 * transport-solutions when the same gating was added there).
 *
 * Run with: npm run backfill:seo-status-wheelchair   (from content-hub/)
 * Safe to re-run - only touches docs still not "approved" (the 8 organisations/recurring
 * pages seeded separately stay "review" and are correctly left alone).
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "wheelchair";

async function run() {
  const payload = await getPayload({ config });

  const site = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const siteDoc = site.docs[0];
  if (!siteDoc) {
    console.log(`No site found for key "${SITE_KEY}" - nothing to backfill.`);
    process.exit(0);
  }

  for (const collectionSlug of ["pages", "blog-posts"] as const) {
    const docs = await payload.find({
      collection: collectionSlug,
      where: { and: [{ site: { equals: siteDoc.id } }, { seoStatus: { not_equals: "approved" } }, { seoStatus: { not_equals: "review" } }] },
      limit: 1000,
    });

    console.log(`Backfilling seoStatus=approved on ${docs.docs.length} live "${collectionSlug}" docs for ${SITE_KEY}...`);
    for (const doc of docs.docs) {
      await payload.update({ collection: collectionSlug, id: doc.id, data: { seoStatus: "approved" } });
      console.log(`  ${collectionSlug}: ${doc.slug}`);
    }
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
