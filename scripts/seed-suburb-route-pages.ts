/**
 * Adds the high-value suburb <-> airport route landing pages for transport-solutions-sydney
 * (Parramatta, Liverpool, Blacktown, Penrith, Castle Hill x Sydney Airport + Western Sydney
 * Airport). See ./source-snapshots/transport-solutions/suburbRoutePages.ts for the content.
 *
 * Run with: npm run seed:suburb-route-pages   (from content-hub/)
 * Requires npm run seed:transport-solutions to have been run first (creates the site doc).
 * Safe to re-run - existing docs (matched by site+slug) are updated, not duplicated.
 */
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { upsertSite, upsertBySlug, createMediaUploader } from "./seedUtils";
import { suburbRoutePages } from "./source-snapshots/transport-solutions/suburbRoutePages";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../transport-solutions-sydney/public");

async function run() {
  const payload = await getPayload({ config });
  const getOrUploadMedia = createMediaUploader(payload, publicDir);
  const site = await upsertSite(payload, { name: "Transport Solutions Sydney", key: "transport-solutions", domain: "tiptopmaxisydney.com.au" });

  console.log(`Seeding ${suburbRoutePages.length} suburb route pages...`);
  for (const p of suburbRoutePages) {
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
