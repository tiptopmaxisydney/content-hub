/**
 * Follow-up to seed-vehicle-and-fare-guides-2026-09-14.ts: adds reciprocal internal links from
 * the vehicle-specific and airport/corporate pages back to the two new hub pages
 * (which-taxi-should-i-book-sydney, how-taxi-fares-are-calculated-sydney), so the hub pages
 * aren't orphaned/only-linked-from-nowhere and internal linking runs both ways.
 *
 * Appends only - never removes or reorders a page's existing relatedLinks - and skips a page
 * if it already links to the target (checked by href, case-insensitive).
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-reciprocal-guide-links-2026-09-14.ts
 * DRY_RUN=true to preview without writing.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";

const VEHICLE_GUIDE_LINK = {
  icon: "🧭",
  title: "Which Vehicle Should I Book?",
  description: "Match your passenger count and luggage to the right TipTop vehicle.",
  href: "/which-taxi-should-i-book-sydney/",
};

const FARE_GUIDE_LINK = {
  icon: "💷",
  title: "How Fares Are Calculated",
  description: "See what determines your upfront fixed fare.",
  href: "/how-taxi-fares-are-calculated-sydney/",
};

const additions: { slug: string; links: (typeof VEHICLE_GUIDE_LINK)[] }[] = [
  { slug: "7-seater-taxi-sydney", links: [VEHICLE_GUIDE_LINK] },
  { slug: "11-seater-taxi-sydney", links: [VEHICLE_GUIDE_LINK] },
  { slug: "sedan", links: [VEHICLE_GUIDE_LINK] },
  { slug: "maxi-suv", links: [VEHICLE_GUIDE_LINK] },
  { slug: "wheelchair-taxi-sydney", links: [VEHICLE_GUIDE_LINK] },
  { slug: "baby-seat-taxi-sydney", links: [VEHICLE_GUIDE_LINK] },
  { slug: "sydney-airport-transfers", links: [VEHICLE_GUIDE_LINK, FARE_GUIDE_LINK] },
  { slug: "corporate-transfers-sydney", links: [FARE_GUIDE_LINK] },
  { slug: "long-distance-taxi-sydney", links: [FARE_GUIDE_LINK] },
];

async function run() {
  const payload = await getPayload({ config });
  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found.`);
  const siteId = site.id as string;

  const dryRun = process.env.DRY_RUN === "true";

  for (const { slug, links } of additions) {
    const res = await payload.find({ collection: "pages", where: { and: [{ site: { equals: siteId } }, { slug: { equals: slug } }] }, limit: 1, depth: 0 });
    const doc = res.docs[0] as any;
    if (!doc) {
      console.warn(`SKIP (page not found): ${slug}`);
      continue;
    }
    const existingHrefs = new Set((doc.relatedLinks ?? []).map((r: any) => (r.href ?? "").toLowerCase()));
    const toAdd = links.filter((l) => !existingHrefs.has(l.href.toLowerCase()));
    if (toAdd.length === 0) {
      console.log(`  [${slug}] already linked, skipping.`);
      continue;
    }
    const updatedLinks = [
      ...(doc.relatedLinks ?? []).map((r: any) => ({ icon: r.icon, title: r.title, description: r.description, href: r.href, targetPage: r.targetPage, targetLocation: r.targetLocation })),
      ...toAdd,
    ];

    if (dryRun) {
      console.log(`  [${slug}] DRY RUN - would add: ${toAdd.map((l) => l.title).join(", ")}`);
      continue;
    }
    await payload.update({ collection: "pages", id: doc.id, data: { relatedLinks: updatedLinks } });
    console.log(`  [${slug}] added: ${toAdd.map((l) => l.title).join(", ")}`);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
