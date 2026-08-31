/**
 * Consolidates the 4-page aged-care duplicate cluster identified in the cannibalisation
 * audit: /aged-care-transport-sydney/ (kept as canonical - richest existing content, and
 * already the target of new internal links from today's other work) absorbs unique wording
 * from /aged-care-home-transfers/, /nursing-home-transfers/ and /old-age-home-transfers/.
 *
 * Deliberately NOT deleting the 3 duplicate docs - only soft-retiring them
 * (seoStatus: draft, indexOverride: forceNoindex, dropping them from robots/sitemap per
 * lib/seo.ts) so the merge is fully reversible if the canonical choice turns out wrong
 * once real Search Console data is available. The actual URL consolidation for live
 * traffic/SEO equity happens via the 301s added in wheelchair-taxi-sydney/next.config.ts
 * alongside this script, not via deleting these docs.
 *
 * Run with: npm run merge:wheelchair-aged-care-cluster   (from content-hub/)
 * Safe to re-run.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const CANONICAL_SLUG = "aged-care-transport-sydney";
const RETIRE_SLUGS = ["aged-care-home-transfers", "nursing-home-transfers", "old-age-home-transfers"];

// New items only - nothing here duplicates what's already on the canonical page.
const newIntroItems = [
  "Transfers to and from hospital",
  "Recurring treatment transport (e.g. dialysis)",
];

const newFeature = {
  title: "Recurring & Regular Treatment Transport",
  description: "We can help arrange regular transport for residents with ongoing treatment schedules, such as dialysis, alongside wheelchair restraint systems fitted for a safe journey.",
};

const newFaqs = [
  { question: "Can nursing home or facility staff book on behalf of a resident?", answer: "Yes, staff members can arrange bookings on behalf of residents with appropriate details about the trip." },
  { question: "Do you provide transport for residents with dementia or memory-related conditions?", answer: "Yes, our drivers aim to provide a calm, reassuring experience. Please share any relevant guidance when booking." },
  { question: "Can you accommodate a wheelchair with attached medical equipment?", answer: "Please provide details of any attached equipment when booking so we can confirm vehicle suitability." },
  { question: "Can you arrange a return trip on the same day?", answer: "Yes, please let us know your appointment time and expected duration so we can arrange a return pickup." },
];

async function run() {
  const payload = await getPayload({ config });
  const site = await payload.find({ collection: "sites", where: { key: { equals: "wheelchair" } }, limit: 1 });
  const siteId = site.docs[0]?.id;
  if (!siteId) throw new Error('Site "wheelchair" not found.');

  const canonicalResult = await payload.find({
    collection: "pages",
    where: { and: [{ site: { equals: siteId } }, { slug: { equals: CANONICAL_SLUG } }] },
    limit: 1,
    depth: 0,
  });
  const canonical = canonicalResult.docs[0] as Record<string, unknown>;
  if (!canonical) throw new Error(`Canonical page "${CANONICAL_SLUG}" not found.`);

  type TextItem = { text: string };
  const existingIntroItems = (canonical.introItems as TextItem[] | undefined) ?? [];
  const existingFeatures = (canonical.features as { title: string; description: string }[] | undefined) ?? [];
  const existingFaq = (canonical.faq as { question: string; answer: string }[] | undefined) ?? [];

  const mergedIntroItems = [...existingIntroItems, ...newIntroItems.map((text) => ({ text }))];
  const mergedFeatures = [...existingFeatures, newFeature];
  const mergedFaq = [...existingFaq, ...newFaqs];

  await payload.update({
    collection: "pages",
    id: canonical.id as string,
    data: { introItems: mergedIntroItems, features: mergedFeatures, faq: mergedFaq },
  });
  console.log(`Enhanced canonical page: ${CANONICAL_SLUG} (+${newIntroItems.length} intro items, +1 feature, +${newFaqs.length} FAQs)`);

  for (const slug of RETIRE_SLUGS) {
    const result = await payload.find({
      collection: "pages",
      where: { and: [{ site: { equals: siteId } }, { slug: { equals: slug } }] },
      limit: 1,
    });
    const doc = result.docs[0];
    if (!doc) {
      console.warn(`  SKIP ${slug}: not found.`);
      continue;
    }
    await payload.update({ collection: "pages", id: doc.id, data: { seoStatus: "draft", indexOverride: "forceNoindex" } });
    console.log(`  soft-retired: ${slug} (content kept, removed from sitemap/index)`);
  }

  console.log("Done. Add matching 301 redirects in wheelchair-taxi-sydney/next.config.ts.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
