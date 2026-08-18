/**
 * One-time migration: reads wheelchair-taxi-sydney's original hardcoded content and
 * creates matching docs in Payload, uploading each referenced image into Media along
 * the way. Source is a frozen snapshot (./source-snapshots/wheelchair/) - see
 * seed-baby-seat.ts for why this doesn't read the live frontend repo's lib/ files.
 *
 * Run with: npm run seed:wheelchair   (from content-hub/)
 * Safe to re-run - existing docs (matched by site+slug) are updated, not duplicated.
 */
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { upsertSite, upsertBySlug, createMediaUploader } from "./seedUtils";
import { servicePages } from "./source-snapshots/wheelchair/servicePages";
import { blogPosts } from "./source-snapshots/wheelchair/blogPosts";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../wheelchair-taxi-sydney/public");

async function run() {
  const payload = await getPayload({ config });
  const getOrUploadMedia = createMediaUploader(payload, publicDir);
  const site = await upsertSite(payload, { name: "Wheelchair Taxi Sydney", key: "wheelchair", domain: "wheelchairtaxisydney.com.au" });

  // Unlike baby-seat, this site's pages aren't split into services vs suburb/location
  // pages - all 29 are one flat list, so every doc gets pageType "service".
  console.log(`Seeding ${servicePages.length} service pages...`);
  for (const p of servicePages) {
    const imageId = await getOrUploadMedia(p.image.src, p.image.alt);
    const data = {
      site: site.id,
      pageType: "service",
      slug: p.slug,
      navLabel: p.navLabel,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      eyebrow: p.eyebrow,
      h1: p.h1,
      heroDescription: p.heroDescription,
      image: imageId,
      imageFirst: p.imageFirst ?? false,
      intro: p.intro.map((text) => ({ text })),
      introItemsIntro: p.introItemsIntro,
      introItems: (p.introItems ?? []).map((text) => ({ text })),
      features: p.features,
      faq: p.faq,
    };
    await upsertBySlug(payload, "pages", site.id as string, p.slug, data);
    console.log(`  page: ${p.slug}`);
  }

  console.log(`Seeding ${blogPosts.length} blog posts...`);
  for (const b of blogPosts) {
    const imageId = await getOrUploadMedia(b.image.src, b.image.alt);
    const data = {
      site: site.id,
      slug: b.slug,
      title: b.title,
      metaTitle: b.metaTitle,
      metaDescription: b.metaDescription,
      excerpt: b.excerpt,
      date: new Date(b.date).toISOString(),
      image: imageId,
      sections: b.sections.map((s) => ({ heading: s.heading, paragraphs: s.paragraphs.map((text) => ({ text })) })),
    };
    await upsertBySlug(payload, "blog-posts", site.id as string, b.slug, data);
    console.log(`  blog post: ${b.slug}`);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
