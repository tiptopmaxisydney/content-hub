/**
 * One-time migration: creates transport-solutions-sydney's service pages in Payload from
 * a hand-transcribed snapshot (./source-snapshots/transport-solutions/servicePages.ts).
 *
 * Unlike baby-seat/wheelchair, this content was never in a clean data array in the source
 * repo - it was embedded directly in JSX across 25 separate route files (several nested,
 * e.g. /taxi-services/sydney-airport-transfer/), so it was transcribed by hand rather than
 * frozen automatically. See servicePages.ts's header comment for what was intentionally
 * left out (bespoke visual widgets stay hardcoded in the frontend template).
 *
 * Run with: npm run seed:transport-solutions-pages   (from content-hub/)
 * Requires npm run seed:transport-solutions to have been run first (creates the site doc).
 * Safe to re-run - existing docs (matched by site+slug) are updated, not duplicated.
 */
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { upsertSite, upsertBySlug, createMediaUploader } from "./seedUtils";
import { servicePages } from "./source-snapshots/transport-solutions/servicePages";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../transport-solutions-sydney/public");

async function run() {
  const payload = await getPayload({ config });
  const getOrUploadMedia = createMediaUploader(payload, publicDir);
  const site = await upsertSite(payload, { name: "Transport Solutions Sydney", key: "transport-solutions", domain: "tiptopmaxisydney.com.au" });

  console.log(`Seeding ${servicePages.length} service pages...`);
  for (const p of servicePages) {
    const imageId = await getOrUploadMedia(p.image.src, p.image.alt);
    const data = {
      site: site.id,
      pageType: "service",
      slug: p.slug,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      h1: p.h1,
      heroDescription: p.heroDescription,
      image: imageId,
      contentSections: p.contentSections.map((s) => ({
        heading: s.heading,
        paragraphs: s.paragraphs.map((text) => ({ text })),
        bulletList: (s.bulletList ?? []).map((text) => ({ text })),
      })),
      faq: p.faq ?? [],
    };
    await upsertBySlug(payload, "pages", site.id as string, p.slug, data);
    console.log(`  page: ${p.slug}`);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
