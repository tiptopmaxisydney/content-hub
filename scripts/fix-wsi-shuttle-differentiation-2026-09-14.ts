/**
 * Developer instructions, 2026-09-14: WSI service differentiation.
 *
 * Adds a "Why choose TipTop instead of an airport shuttle?" section, a positioning statement,
 * an 8-row comparison table (using the new `comparisonTable` Pages field), an operational
 * notice (`operationalNotice` field), and a consistency FAQ entry - applied identically across
 * all 13 Western Sydney Airport pages (main WSI page, WSI vehicle pages, WSI<->Sydney Airport
 * connection page, and all 5 suburb-to-WSI pages). The exact 13 slugs live in
 * transport-solutions-sydney/lib/wsi.ts (WSI_PAGE_SLUGS) - keep both lists in sync.
 *
 * Prepends the new section to each page's existing contentSections (additive - nothing
 * existing is removed or rewritten) and appends the FAQ entry, skipping either write if a page
 * already has a comparisonTable/matching FAQ (idempotent).
 *
 * The internal booking-tag vocabulary (WSI Arrival, WSI Departure, etc.) and the detailed
 * booking-form fields are implemented in code, not CMS content - see
 * transport-solutions-sydney/lib/wsi.ts and components/home/BookingForm.tsx.
 *
 * A parallel content audit (see conversation notes) found every existing "meet and greet" and
 * NDIS FAQ on these 13 pages already correctly declines/clarifies rather than overclaiming, so
 * no changes were needed there against the "do not claim" list in the brief.
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-wsi-shuttle-differentiation-2026-09-14.ts
 * DRY_RUN=true to preview without writing.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";

const WSI_SLUGS = [
  "western-sydney-airport-transfers",
  "western-sydney-airport-taxi",
  "western-sydney-airport-large-taxi",
  "western-sydney-airport-suv-transfers",
  "western-sydney-airport-baby-seat-taxi",
  "western-sydney-airport-wheelchair-taxi",
  "western-sydney-airport-to-sydney-cbd",
  "sydney-airport-to-western-sydney-airport",
  "blacktown-to-western-sydney-airport-taxi",
  "castle-hill-to-western-sydney-airport-taxi",
  "liverpool-to-western-sydney-airport-taxi",
  "parramatta-to-western-sydney-airport-taxi",
  "penrith-to-western-sydney-airport-taxi",
];

const POSITIONING_TEXT =
  "Private door-to-door Western Sydney Airport transfers for individuals, families, groups and wheelchair passengers—with the right vehicle, luggage space and accessibility arranged before travel.";

const BENEFITS = [
  "Private door-to-door transfer",
  "No interchange or shuttle transfers",
  "Direct home, hotel, business or care-facility pickup",
  "Sedans, SUVs, 7-seaters and 11-seaters",
  "Wheelchair-accessible vehicle options",
  "Baby and child seats available by request",
  "Vehicles matched to passenger and luggage requirements",
  "Multiple pickups and additional stops",
  "Advance bookings for 24-hour airport operations",
  "Flight monitoring and customer updates",
  "WSI-to-Sydney Airport connections",
  "Fixed quotation including applicable known charges",
];

const OPERATIONAL_NOTICE =
  "WSI pickup and commercial-vehicle procedures may change before passenger operations begin. Final pickup instructions and any applicable airport charges will be confirmed with your booking.";

const COMPARISON_ROWS = [
  { feature: "Door-to-door service", valueA: "Yes", valueB: "Limited designated stops" },
  { feature: "Private vehicle", valueA: "Yes", valueB: "Shared" },
  { feature: "Vehicle-size selection", valueA: "Yes", valueB: "Limited" },
  { feature: "Wheelchair option", valueA: "Yes", valueB: "Accessible bus available" },
  { feature: "Baby/child seats", valueA: "By request", valueB: "Not guaranteed" },
  { feature: "Multiple stops", valueA: "Available", valueB: "Fixed route" },
  { feature: "Direct WSI–Sydney Airport transfer", valueA: "Available", valueB: "Planned" },
  { feature: "Pricing", valueA: "Confirmed quotation", valueB: "Pricing not yet published" },
];

const CONSISTENCY_FAQ = {
  question: "How is TipTop different from a Western Sydney Airport shuttle service?",
  answer:
    "TipTop provides a private, door-to-door vehicle matched to your passenger and luggage numbers, with no shared stops or interchanges. Vehicle size, wheelchair accessibility and child seats can all be arranged in advance, with a confirmed quotation including known charges before you travel.",
};

async function run() {
  const payload = await getPayload({ config });
  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found.`);
  const siteId = site.id as string;

  const dryRun = process.env.DRY_RUN === "true";

  for (const slug of WSI_SLUGS) {
    const res = await payload.find({ collection: "pages", where: { and: [{ site: { equals: siteId } }, { slug: { equals: slug } }] }, limit: 1 });
    const doc = res.docs[0] as any;
    if (!doc) {
      console.warn(`SKIP (page not found): ${slug}`);
      continue;
    }

    const alreadyHasSection = (doc.contentSections ?? []).some((s: any) => s.heading === "Why Choose TipTop Instead of an Airport Shuttle?");
    const alreadyHasFaq = (doc.faq ?? []).some((f: any) => f.question === CONSISTENCY_FAQ.question);
    const alreadyHasTable = (doc.comparisonTable?.rows?.length ?? 0) > 0;
    const alreadyHasNotice = !!doc.operationalNotice;

    if (alreadyHasSection && alreadyHasFaq && alreadyHasTable && alreadyHasNotice) {
      console.log(`  [${slug}] already fully applied, skipping.`);
      continue;
    }

    const newContentSections = alreadyHasSection
      ? (doc.contentSections ?? [])
      : [
          {
            heading: "Why Choose TipTop Instead of an Airport Shuttle?",
            paragraphs: [{ text: POSITIONING_TEXT }],
            bulletList: BENEFITS.map((text) => ({ text })),
          },
          ...(doc.contentSections ?? []).map((s: any) => ({
            heading: s.heading,
            paragraphs: (s.paragraphs ?? []).map((p: any) => ({ text: p.text })),
            bulletList: (s.bulletList ?? []).map((b: any) => ({ text: b.text })),
          })),
        ];

    const newFaq = alreadyHasFaq
      ? (doc.faq ?? []).map((f: any) => ({ question: f.question, answer: f.answer }))
      : [...(doc.faq ?? []).map((f: any) => ({ question: f.question, answer: f.answer })), CONSISTENCY_FAQ];

    const data = {
      contentSections: newContentSections,
      faq: newFaq,
      comparisonTable: alreadyHasTable
        ? doc.comparisonTable
        : { title: "TipTop vs an Airport Shuttle", columnA: "TipTop Private Transfer", columnB: "Airport Shuttle", rows: COMPARISON_ROWS },
      operationalNotice: alreadyHasNotice ? doc.operationalNotice : OPERATIONAL_NOTICE,
    };

    if (dryRun) {
      console.log(
        `  [${slug}] DRY RUN - section:${!alreadyHasSection} faq:${!alreadyHasFaq} table:${!alreadyHasTable} notice:${!alreadyHasNotice}`
      );
      continue;
    }

    await payload.update({ collection: "pages", id: doc.id, data });
    console.log(`  [${slug}] updated.`);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
