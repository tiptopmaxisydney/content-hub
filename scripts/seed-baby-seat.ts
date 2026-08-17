/**
 * One-time migration: reads baby-seat-taxi-sydney's original hardcoded content and
 * creates matching docs in Payload, uploading each referenced image into Media along
 * the way. The source data is a frozen snapshot (./source-snapshots/baby-seat/) taken
 * from lib/servicePages.ts + lib/blogPosts.ts at the commit before that site was
 * rewired to fetch from this CMS - those files no longer hold this data themselves,
 * so this script intentionally doesn't depend on the live frontend repo's lib/ files.
 *
 * Run with: npm run seed:baby-seat   (from content-hub/)
 * Safe to re-run - existing docs (matched by site+slug) are updated, not duplicated.
 */
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { servicePages } from "./source-snapshots/baby-seat/servicePages";
import { blogPosts } from "./source-snapshots/baby-seat/blogPosts";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const babySeatPublicDir = path.resolve(dirname, "../../baby-seat-taxi-sydney/public");

// Location pages get pageType "location" for admin filtering; everything else is "service".
const LOCATION_SLUGS = new Set([
  "baby-seat-taxi-parramatta",
  "baby-seat-taxi-blacktown",
  "baby-seat-taxi-liverpool",
  "baby-seat-taxi-penrith",
  "baby-seat-taxi-campbelltown",
  "baby-seat-taxi-chatswood",
  "baby-seat-taxi-bondi",
]);

async function run() {
  const payload = await getPayload({ config });
  const mediaCache = new Map<string, string>();

  const site = await upsertSite(payload);

  async function getOrUploadMedia(src: string, alt: string): Promise<string> {
    const cached = mediaCache.get(src);
    if (cached) return cached;

    const existing = await payload.find({ collection: "media", where: { filename: { equals: path.basename(src) } }, limit: 1 });
    if (existing.docs[0]) {
      mediaCache.set(src, existing.docs[0].id as string);
      return existing.docs[0].id as string;
    }

    const filePath = path.join(babySeatPublicDir, src.replace(/^\//, ""));
    const doc = await payload.create({
      collection: "media",
      data: { alt },
      filePath,
    });
    mediaCache.set(src, doc.id as string);
    console.log(`  uploaded media: ${src}`);
    return doc.id as string;
  }

  console.log(`Seeding ${servicePages.length} service/location pages...`);
  for (const p of servicePages) {
    const imageId = await getOrUploadMedia(p.image.src, p.image.alt);
    const data = {
      site: site.id,
      pageType: LOCATION_SLUGS.has(p.slug) ? "location" : "service",
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

async function upsertSite(payload: Awaited<ReturnType<typeof getPayload>>) {
  const existing = await payload.find({ collection: "sites", where: { key: { equals: "baby-seat" } }, limit: 1 });
  if (existing.docs[0]) return existing.docs[0];
  return payload.create({
    collection: "sites",
    data: { name: "Baby Seat Taxi Sydney", key: "baby-seat", domain: "babyseattaxisydney.com.au" },
  });
}

async function upsertBySlug(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: "pages" | "blog-posts",
  siteId: string,
  slug: string,
  data: Record<string, unknown>,
) {
  const existing = await payload.find({ collection, where: { and: [{ site: { equals: siteId } }, { slug: { equals: slug } }] }, limit: 1 });
  if (existing.docs[0]) {
    return payload.update({ collection, id: existing.docs[0].id, data, draft: false });
  }
  return payload.create({ collection, data, draft: false });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
