/**
 * Part 3 of the 2026-09-14 SEO/AEO audit fixes (items #15 and #16).
 *
 * Creates two new authoritative, question-first pages for transport-solutions-sydney that the
 * audit specifically called out as strong AEO citation targets - a "which vehicle should I
 * book" guide and a "how are fares calculated" explainer. Each answers its core question in
 * plain factual language up front, matching the audit's "Question -> direct 40-80 word answer
 * -> supporting evidence -> relevant service -> booking action" pattern.
 *
 * Both reuse an existing Media doc (no new image upload) and are seoStatus "approved" with
 * enough content to pass the frontend's qualityGate() - see transport-solutions-sydney/lib/seo.ts.
 * relatedLinks on each point at the vehicle/service pages they support; a follow-up script
 * should add reciprocal relatedLinks back from 7-seater/11-seater/airport/etc pages once these
 * are live (not done here to keep this script idempotent and focused).
 *
 * Run with: node --env-file=.env --import tsx scripts/seed-vehicle-and-fare-guides-2026-09-14.ts
 * DRY_RUN=true to preview without writing.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { upsertBySlug } from "./seedUtils";

const SITE_KEY = "transport-solutions";

// Reused from existing pages - see conversation notes / scripts/_get_image_ids.ts (11-seater-taxi-sydney's image).
const VEHICLE_GUIDE_IMAGE_ID = "6a84b440c70a80a8009db606";
const FARE_GUIDE_IMAGE_ID = "6a84b44dc70a80a8009db666"; // long-distance-taxi-sydney's image

const pages = [
  {
    slug: "which-taxi-should-i-book-sydney",
    pageType: "service",
    seoStatus: "approved",
    indexOverride: "none",
    metaTitle: "Which Taxi Should I Book? | Vehicle Guide | TipTop Maxi Sydney",
    metaDescription:
      "Not sure which vehicle to book? Match your passenger count, luggage and accessibility needs to the right TipTop Maxi Sydney vehicle with this quick guide.",
    h1: "Which TipTop Vehicle Should I Book?",
    heroDescription:
      "Vehicle choice comes down to two things: how many passengers, and how much luggage. Use the guide below to find your match, or tell us your numbers when booking and we'll confirm the right vehicle for you.",
    image: VEHICLE_GUIDE_IMAGE_ID,
    contentSections: [
      {
        heading: "Vehicle Guide by Passengers and Luggage",
        paragraphs: [
          {
            text: "Seating capacity and luggage capacity are not the same thing - a vehicle carrying close to its maximum passenger count has less room for bags. Use this as a general guide, then confirm your exact numbers when booking.",
          },
        ],
        bulletList: [
          { text: "1-4 passengers, standard luggage: Sedan" },
          { text: "Small group with extra luggage, or 1-4 passengers with prams/equipment: SUV" },
          { text: "Up to 7 passengers, moderate luggage: 7 Seater" },
          { text: "7 passengers with substantial luggage: 11 Seater Van" },
          { text: "8-11 passengers: 11 Seater Van, subject to luggage" },
          { text: "Wheelchair passenger: Wheelchair-accessible vehicle (request when booking)" },
          { text: "Infant or young child travelling: any vehicle, plus a requested child restraint" },
        ],
      },
      {
        heading: "Common Vehicle-Choice Questions",
        paragraphs: [
          {
            text: "Which taxi should I book for 7 passengers and 6 suitcases? An 11-seater vehicle is usually more suitable, because a 7-seater operating near its passenger capacity has limited luggage space. Final suitability depends on suitcase sizes, prams and other equipment, so tell us your exact numbers when booking.",
          },
          {
            text: "Can I fit a pram and a wheelchair in the same booking? Let us know all mobility equipment and luggage when booking so we can confirm a vehicle with enough space, or arrange a wheelchair-accessible vehicle with additional room.",
          },
          {
            text: "What if I'm not sure which vehicle I need? Contact our booking team with your passenger count and luggage description and we'll recommend the right vehicle before you confirm.",
          },
        ],
        bulletList: [],
      },
    ],
    faq: [
      {
        question: "Which taxi should I book for 7 passengers and 6 suitcases?",
        answer:
          "An 11-seater vehicle is usually more suitable because a 7-seater operating near passenger capacity has limited luggage space. Final suitability depends on suitcase sizes, prams and other equipment.",
      },
      {
        question: "Does a bigger vehicle always mean more luggage space?",
        answer:
          "Not necessarily. Luggage space depends on how many of the seats are filled with passengers, not just the vehicle's maximum seating capacity. Tell us your numbers when booking so we can confirm suitability.",
      },
      {
        question: "Can I request a wheelchair-accessible vehicle with a child seat?",
        answer:
          "Yes. Mention both requirements when booking so we can arrange a suitable wheelchair-accessible vehicle fitted with the requested child restraint.",
      },
      {
        question: "What vehicle is best for an airport transfer with a large family?",
        answer:
          "For most families with moderate luggage, a 7-seater is sufficient. For larger families or heavier luggage loads, an 11-seater is usually the better choice.",
      },
    ],
    relatedLinks: [
      { icon: "🚕", title: "Sedan", description: "Individuals and smaller groups with standard luggage.", href: "/sedan/" },
      { icon: "🚙", title: "SUV / Maxi SUV", description: "Extra luggage space for smaller groups.", href: "/maxi-suv/" },
      { icon: "🚐", title: "7 Seater Taxi", description: "Families and small groups, up to 7 passengers.", href: "/7-seater-taxi-sydney/" },
      { icon: "🚌", title: "11 Seater Taxi", description: "Larger groups and airport transfers, up to 11 passengers.", href: "/11-seater-taxi-sydney/" },
      { icon: "♿", title: "Wheelchair Taxi", description: "Wheelchair-accessible vehicles across Sydney.", href: "/wheelchair-taxi-sydney/" },
      { icon: "🍼", title: "Baby Seat Taxi", description: "Child restraints available on request.", href: "/baby-seat-taxi-sydney/" },
      { icon: "✈️", title: "Sydney Airport Transfers", description: "Pickup points, delays and vehicle options for the airport.", href: "/sydney-airport-transfers/" },
    ],
  },
  {
    slug: "how-taxi-fares-are-calculated-sydney",
    pageType: "service",
    seoStatus: "approved",
    indexOverride: "none",
    metaTitle: "How Are Taxi Fares Calculated? | Fixed Fares | TipTop Maxi Sydney",
    metaDescription:
      "TipTop Maxi Sydney quotes a fixed, upfront fare based on vehicle type, pickup, destination and any applicable tolls or airport fees. Here's how it works.",
    h1: "How TipTop Maxi Sydney Fares Are Calculated",
    heroDescription:
      "Your fare is calculated from vehicle type, pickup location, destination and booking requirements, plus any applicable tolls or airport access fees, giving you one upfront quoted fare before you travel.",
    image: FARE_GUIDE_IMAGE_ID,
    contentSections: [
      {
        heading: "What Determines Your Fare",
        paragraphs: [
          {
            text: "Rather than a running meter, most TipTop Maxi Sydney bookings are quoted as one fixed, upfront fare, calculated from the following factors:",
          },
        ],
        bulletList: [
          { text: "Vehicle type - sedan, SUV, 7 seater, 11 seater, or a wheelchair-accessible vehicle" },
          { text: "Pickup location and destination, including distance and route" },
          { text: "Applicable tolls" },
          { text: "Sydney Airport access fees, where the trip starts or ends at the airport" },
          { text: "Booking requirements such as child restraints or additional stops" },
        ],
      },
      {
        heading: "No Surge Pricing on Fixed Fares",
        paragraphs: [
          {
            text: "Where a fixed fare is quoted, that is the price you pay - it doesn't change with demand, traffic or time of day. Any variation to your quote (for example, an added stop or a different drop-off point) is confirmed with you before the trip.",
          },
        ],
        bulletList: [],
      },
      {
        heading: "Example Routes",
        paragraphs: [
          {
            text: "Typical fixed-fare routes include Sydney Airport to Sydney CBD, Sydney Airport to Parramatta, and Sydney Airport to Western Sydney suburbs. Contact us or use the online booking form for an upfront quote on your specific route.",
          },
        ],
        bulletList: [],
      },
    ],
    faq: [
      {
        question: "How is my taxi fare calculated?",
        answer:
          "Your fare is based on vehicle type, pickup location, destination and booking requirements, plus any applicable tolls or Sydney Airport access fees, combined into one upfront quoted fare.",
      },
      {
        question: "Will my fare change during the trip?",
        answer:
          "No, where a fixed fare has been quoted, that is the price you pay. Any change to pickup, destination or requirements is confirmed with you before the trip, not added afterward.",
      },
      {
        question: "Do you charge surge pricing at busy times?",
        answer: "No. Fixed fares do not change based on demand, traffic or time of day.",
      },
      {
        question: "Are tolls and airport fees included in the quote?",
        answer:
          "Yes, where applicable, tolls and Sydney Airport access fees are factored into your upfront quoted fare so there are no surprises on arrival.",
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept major credit cards, debit cards, online payments, and cash payments where applicable.",
      },
    ],
    relatedLinks: [
      { icon: "✈️", title: "Sydney Airport Transfers", description: "Fares, tolls and airport fees for airport transfers.", href: "/sydney-airport-transfers/" },
      { icon: "🏢", title: "Corporate Transfers", description: "Invoicing and business account options.", href: "/corporate-transfers-sydney/" },
      { icon: "🛣️", title: "Long Distance Taxi", description: "Regional NSW, Canberra and Blue Mountains transfers.", href: "/long-distance-taxi-sydney/" },
      { icon: "🚌", title: "11 Seater Taxi", description: "Fares for larger groups and airport transfers.", href: "/11-seater-taxi-sydney/" },
    ],
  },
] as const;

async function run() {
  const payload = await getPayload({ config });
  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found.`);
  const siteId = site.id as string;

  const dryRun = process.env.DRY_RUN === "true";

  for (const p of pages) {
    if (dryRun) {
      console.log(`  [${p.slug}] DRY RUN - would upsert page (pageType=${p.pageType}, seoStatus=${p.seoStatus}).`);
      continue;
    }
    const doc = await upsertBySlug(payload, "pages", siteId, p.slug, { site: siteId, ...p });
    console.log(`  [${p.slug}] upserted (id ${doc.id}).`);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
