/**
 * One-off backfill: the new `seoStatus` field (see src/fields/seoWorkflowFields.ts) defaults to
 * "draft" on every doc, but every `pages`/`blog-posts` doc for transport-solutions is already
 * live and indexed today. This must run in the SAME deploy as the frontend's robots-meta and
 * sitemap-filtering wiring - shipping the gate without this backfill would silently noindex /
 * drop from the sitemap the entire live site.
 *
 * Run with: npm run backfill:seo-status   (from content-hub/)
 * Safe to re-run - only touches docs still at the default "draft" status.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";

async function run() {
  const payload = await getPayload({ config });

  const site = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const siteDoc = site.docs[0];
  if (!siteDoc) {
    console.log(`No site found for key "${SITE_KEY}" - nothing to backfill.`);
    process.exit(0);
  }

  // Existing docs predate this field entirely (absent in Mongo, not literally "draft"), so match
  // anything that isn't already "approved" rather than filtering for the schema's default value.
  for (const collectionSlug of ["pages", "blog-posts"] as const) {
    const docs = await payload.find({
      collection: collectionSlug,
      where: { and: [{ site: { equals: siteDoc.id } }, { seoStatus: { not_equals: "approved" } }] },
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
