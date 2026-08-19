/**
 * P3 URL restructure for transport-solutions-sydney (see the URL migration plan agreed
 * 2026-08-20): renames 4 existing pages onto their new flat slugs. No net-new pages this
 * batch - all 4 P3 targets already had an existing counterpart. The interstate ->
 * long-distance rename keeps existing content as-is (same as every other rename in this
 * restructure); "long-distance" is a broader keyword than "interstate" but the plan calls
 * this a rename ("Create/migrate"), not a request to rewrite the page's scope.
 * Corresponding next.config.ts redirects were added alongside the P1 batch, except
 * interstate -> long-distance which is added with this batch.
 *
 * Run with: npm run migrate:p3-urls   (from content-hub/)
 * Safe to re-run - renames no-op once already applied.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";

const renames = [
  { from: "taxi-services/wedding-transfers", to: "wedding-transport-sydney" },
  { from: "premium-services/pet-taxi", to: "pet-taxi-sydney" },
  { from: "taxi-services/parcel-delivery-taxi-transfer", to: "parcel-delivery-sydney" },
  { from: "taxi-services/interstate-taxi-transfer-sydney", to: "long-distance-taxi-sydney" },
];

async function run() {
  const payload = await getPayload({ config });

  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found - run seed:transport-solutions first.`);
  const siteId = site.id as string;

  console.log("Renaming slugs...");
  for (const r of renames) {
    const existing = await payload.find({ collection: "pages", where: { and: [{ site: { equals: siteId } }, { slug: { equals: r.from } }] }, limit: 1 });
    if (!existing.docs[0]) {
      console.warn(`  SKIP (not found): ${r.from}`);
      continue;
    }
    if (existing.docs[0].slug === r.to) {
      console.log(`  already renamed: ${r.to}`);
      continue;
    }
    await payload.update({ collection: "pages", id: existing.docs[0].id, data: { slug: r.to } });
    console.log(`  ${r.from} -> ${r.to}`);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
