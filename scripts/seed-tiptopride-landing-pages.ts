/**
 * One-time migration: creates tiptopride-landing's ~176 programmatic-SEO landing pages in
 * Payload from a hand-transcribed snapshot (./source-snapshots/tiptopride-landing/servicePages.ts).
 *
 * Like transport-solutions, this content was never in a clean data array in the source repo
 * - each page was a hardcoded route importing its own uniquely-named Hero/About/OtherContent
 * component (e.g. src/app/(innerpage)/maxi-taxi-parramatta/page.tsx), so it was transcribed
 * by hand rather than frozen automatically. See servicePages.ts's header comment for what
 * was intentionally left out (decorative shape/blob images) and the 7 core/legal pages that
 * were intentionally excluded (they stay hardcoded).
 *
 * Run with: npm run seed:tiptopride-landing-pages   (from content-hub/)
 * Safe to re-run - existing docs (matched by site+slug) are updated, not duplicated.
 */
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { upsertSite, upsertBySlug, createMediaUploader } from "./seedUtils";
import { servicePages } from "./source-snapshots/tiptopride-landing/servicePages";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../tiptopride-landing/public");

async function run() {
  const payload = await getPayload({ config });
  const getOrUploadMedia = createMediaUploader(payload, publicDir);
  const site = await upsertSite(payload, { name: "Tiptopride Landing", key: "tiptopride-landing", domain: "tiptopride.com.au" });

  console.log(`Seeding ${servicePages.length} service pages...`);
  for (const p of servicePages) {
    const imageId = await getOrUploadMedia(p.image.src, p.image.alt);
    const data = {
      site: site.id,
      pageType: "service",
      slug: p.slug,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      eyebrow: p.eyebrow,
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
