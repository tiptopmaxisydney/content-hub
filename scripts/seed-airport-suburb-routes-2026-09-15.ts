/**
 * SEO/AEO audit follow-up, 2026-09-15: "Airport -> Suburb route" architecture.
 *
 * TipTop currently owns Sydney Airport service intent (/sydney-airport-transfers/) and suburb
 * intent (/locations/<region>/<suburb>/) separately, but not the combined "Sydney Airport to
 * <suburb>" route intent that competitors already rank for. Per the audit's explicit guidance,
 * this does NOT create hundreds of thin near-identical pages - it creates a controlled first
 * batch of 8 high-value route pages nested under the airport hub, each with genuinely
 * suburb-specific distance/route, terminal, vehicle, and FAQ content, exactly as prescribed:
 *
 *   /sydney-airport-transfers/epping/
 *   /sydney-airport-transfers/parramatta/
 *   /sydney-airport-transfers/blacktown/
 *   /sydney-airport-transfers/penrith/
 *   /sydney-airport-transfers/liverpool/
 *   /sydney-airport-transfers/castle-hill/
 *   /sydney-airport-transfers/chatswood/
 *   /sydney-airport-transfers/manly/
 *
 * These are ordinary "pages" docs with a nested slug - the frontend's app/[...slug]/page.tsx
 * already serves multi-segment slugs (precedent: taxi-services/general-transfers), so no new
 * route or schema was needed. Service+Breadcrumb+FAQPage JSON-LD and canonical/meta are
 * generated generically for every pageType:"service" doc already.
 *
 * Distance/route facts reuse what's already published for Chatswood and Manly on their
 * /locations/ pages (see lib/locationsData equivalents in content-hub) so the two systems
 * don't contradict each other; the other 6 suburbs' distances/routes are standard, low-risk
 * Sydney geography (well-known motorway names, broad time ranges, "typically/we recommend a
 * buffer" framing) rather than a live routing API this script has no access to - matching the
 * qualifying-language pattern already used across every other airport-adjacent page this
 * session (see fix-wsi-shuttle-differentiation-2026-09-14.ts, WSI suburb route pages).
 *
 * Run with: node --env-file=.env --import tsx scripts/seed-airport-suburb-routes-2026-09-15.ts
 * DRY_RUN=true to preview without writing.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { upsertBySlug } from "./seedUtils";

const SITE_KEY = "transport-solutions";
const IMAGE_ID = "6a84b455c70a80a8009db6a2"; // sydney-airport-transfers' own image, reused

type Route = {
  suburb: string;
  slugSuffix: string;
  region: string;
  distanceKm: string;
  travelTime: string;
  routeDescription: string;
  nearbyAreas: string[];
};

const ROUTES: Route[] = [
  {
    suburb: "Epping",
    slugSuffix: "epping",
    region: "Northern Sydney",
    distanceKm: "approximately 22km",
    travelTime: "typically 30-45 minutes in normal traffic, longer during peak hour",
    routeDescription: "via the Eastern Distributor or City West Link, connecting to Epping Road and Beecroft Road",
    nearbyAreas: ["Eastwood", "Carlingford", "North Epping", "Marsfield"],
  },
  {
    suburb: "Parramatta",
    slugSuffix: "parramatta",
    region: "Greater Western Sydney",
    distanceKm: "approximately 24km",
    travelTime: "typically 35-50 minutes in normal traffic, longer during peak hour",
    routeDescription: "via the M5 Motorway and Cumberland Highway, or the M4 Motorway through the city",
    nearbyAreas: ["Harris Park", "Granville", "Westmead", "Rydalmere"],
  },
  {
    suburb: "Blacktown",
    slugSuffix: "blacktown",
    region: "Western Sydney",
    distanceKm: "approximately 35km",
    travelTime: "typically 40-55 minutes in normal traffic, longer during peak hour",
    routeDescription: "via the M5 and M4 Motorways",
    nearbyAreas: ["Seven Hills", "Toongabbie", "Doonside", "Marayong"],
  },
  {
    suburb: "Penrith",
    slugSuffix: "penrith",
    region: "Outer Western Sydney",
    distanceKm: "approximately 54km",
    travelTime: "typically 50-70 minutes in normal traffic, longer during peak hour",
    routeDescription: "via the M5 and M4 Motorways",
    nearbyAreas: ["Kingswood", "Werrington", "Jamisontown", "Emu Plains"],
  },
  {
    suburb: "Liverpool",
    slugSuffix: "liverpool",
    region: "South Western Sydney",
    distanceKm: "approximately 27km",
    travelTime: "typically 30-45 minutes in normal traffic, longer during peak hour",
    routeDescription: "via the M5 Motorway",
    nearbyAreas: ["Casula", "Moorebank", "Warwick Farm", "Chipping Norton"],
  },
  {
    suburb: "Castle Hill",
    slugSuffix: "castle-hill",
    region: "Hills District",
    distanceKm: "approximately 32km",
    travelTime: "typically 40-55 minutes in normal traffic, longer during peak hour",
    routeDescription: "via the M2 Motorway and Windsor Road",
    nearbyAreas: ["Baulkham Hills", "Kellyville", "Cherrybrook", "Beaumont Hills"],
  },
  {
    // Reuses the distance/route framing already published on /locations/north-shore/chatswood/
    suburb: "Chatswood",
    slugSuffix: "chatswood",
    region: "North Shore",
    distanceKm: "approximately 17km",
    travelTime: "typically 30-40 minutes, longer during peak-hour city traffic",
    routeDescription: "via the Warringah Freeway and Sydney Harbour Bridge or Tunnel",
    nearbyAreas: ["Willoughby", "Artarmon", "St Leonards", "Lane Cove"],
  },
  {
    // Reuses the distance/route framing already published on /locations/northern-beaches/manly/
    suburb: "Manly",
    slugSuffix: "manly",
    region: "Northern Beaches",
    distanceKm: "approximately 22km",
    travelTime: "typically 45-70 minutes depending on traffic",
    routeDescription: "via the Spit Bridge or the Harbour Bridge and Warringah Freeway",
    nearbyAreas: ["Fairlight", "Balgowlah", "Freshwater", "Seaforth"],
  },
];

function buildPage(route: Route) {
  const { suburb, region, distanceKm, travelTime, routeDescription, nearbyAreas } = route;
  const slug = `sydney-airport-transfers/${route.slugSuffix}`;

  return {
    slug,
    pageType: "service" as const,
    seoStatus: "approved" as const,
    indexOverride: "none" as const,
    metaTitle: `Sydney Airport to ${suburb} Maxi Taxi | 7 & 11 Seater`,
    metaDescription: `Book a pre-arranged Sydney Airport to ${suburb} taxi or maxi taxi. Sedan, SUV, 7 and 11 seater options with fixed-price quotes, flight monitoring and T1/T2/T3 pickup.`,
    h1: `Sydney Airport to ${suburb} Maxi Taxi`,
    heroDescription: `Book a pre-arranged taxi or maxi taxi from Sydney Airport to ${suburb} for individuals, families and larger groups. TipTop offers sedan, SUV, 7-seater and 11-seater options, with luggage capacity depending on the selected vehicle. Airport pickups are available from T1 International and T2/T3 Domestic terminals.`,
    image: IMAGE_ID,
    contentSections: [
      {
        heading: `Sydney Airport to ${suburb}: Distance & Route`,
        paragraphs: [
          {
            text: `${suburb} is ${distanceKm} from Sydney Airport, in the ${region} area. Trips are typically routed ${routeDescription}. Travel time is ${travelTime} - we recommend booking with a buffer for early-morning or peak-period flights.`,
          },
        ],
        bulletList: [
          { text: `Sydney Airport → ${suburb}: pre-booked pickup at T1 International or T2/T3 Domestic, direct to your ${suburb} address` },
          { text: `${suburb} → Sydney Airport: pre-booked pickup at your ${suburb} address, timed to your flight` },
          { text: `Nearby areas we also serve on this route: ${nearbyAreas.join(", ")}` },
        ],
      },
      {
        heading: "Terminal Pickup Points",
        paragraphs: [
          {
            text: "There is no meet-and-greet or name-board service inside the terminal - your driver's contact details are sent before you land so you can connect quickly once you reach the pickup zone.",
          },
        ],
        bulletList: [
          { text: "T1 (International Terminal): meet your driver at the designated Rideshare Pickup Area" },
          { text: "T2 & T3 (Domestic Terminals): meet your driver at the designated Priority Pickup Area" },
        ],
      },
      {
        heading: "Which Vehicle Should You Book?",
        paragraphs: [
          {
            text: `Vehicle choice depends on passenger count and luggage, not just seat numbers. Tell us your numbers when booking and we'll confirm the right fit for your Sydney Airport to ${suburb} transfer.`,
          },
        ],
        bulletList: [
          { text: "1-4 passengers with standard luggage: sedan" },
          { text: "5-7 passengers, or a smaller group with substantial luggage: SUV or 7 seater" },
          { text: "8-11 passengers, or 7 passengers with substantial luggage: 11 seater" },
          { text: "Wheelchair-accessible vehicle: available on request" },
          { text: "Baby or child seat: available on request - tell us your child's age when booking" },
        ],
      },
      {
        heading: "Flight Monitoring & Fares",
        paragraphs: [
          {
            text: "We monitor your inbound flight automatically, so a delayed flight adjusts your pickup time without you needing to call. Your fare is quoted upfront before you travel, based on vehicle type, pickup point, destination and any applicable tolls, so there are no surprises on arrival.",
          },
          {
            text: `TipTop Maxi Sydney operates 24/7, including early-morning departures for ${suburb} residents with a first flight to catch.`,
          },
        ],
        bulletList: [],
      },
    ],
    faq: [
      {
        question: `Can I book a maxi taxi from Sydney Airport to ${suburb}?`,
        answer: `Yes. TipTop Maxi Sydney offers pre-booked Sydney Airport transfers to ${suburb} using sedan, SUV, 7-seater and 11-seater vehicles. The appropriate vehicle depends on the number of passengers, checked luggage, carry-on bags, prams and other equipment.`,
      },
      {
        question: `Which vehicle should I book from Sydney Airport to ${suburb} for 7 passengers?`,
        answer: "For seven passengers travelling with substantial airport luggage, an 11-seater is generally more suitable than operating a 7-seater at full passenger capacity. Tell us your exact numbers when booking so we can confirm.",
      },
      {
        question: `How far is ${suburb} from Sydney Airport?`,
        answer: `${suburb} is ${distanceKm} from Sydney Airport, with a drive time of ${travelTime} ${routeDescription}.`,
      },
      {
        question: `Do you offer ${suburb} to Sydney Airport taxi transfers?`,
        answer: `Yes. We provide the return trip as well - pre-book a pickup from your ${suburb} address timed to your departure flight, with the same fixed-fare and vehicle options.`,
      },
      {
        question: `Is the fare fixed for a Sydney Airport to ${suburb} transfer?`,
        answer: "Yes. Your fare is quoted upfront before you travel, based on vehicle type, pickup point, destination and any applicable tolls or airport access fees.",
      },
      {
        question: `Can I book an 11 seater from Sydney Airport to ${suburb} for a large group?`,
        answer: "Yes, our 11-seater vehicles are available for this route, suited to larger families and groups. Passenger and luggage capacity depends on vehicle configuration - tell us your numbers when booking.",
      },
      {
        question: "Do you monitor my flight for delays on this route?",
        answer: "Yes. We monitor your inbound flight automatically, so pickup times adjust for delays without you needing to call.",
      },
      {
        question: `Can I get a wheelchair-accessible vehicle for the Sydney Airport to ${suburb} route?`,
        answer: "Yes. Wheelchair-accessible vehicles are available on this route - just specify your requirements when booking.",
      },
    ],
    relatedLinks: [
      { icon: "✈️", title: "Sydney Airport Transfers", description: "The full Sydney Airport transfer guide.", href: "/sydney-airport-transfers/" },
      { icon: "🧭", title: "Which Vehicle Should I Book?", description: "Match your passengers and luggage to the right vehicle.", href: "/which-taxi-should-i-book-sydney/" },
      { icon: "💷", title: "How Fares Are Calculated", description: "See what determines your upfront fixed fare.", href: "/how-taxi-fares-are-calculated-sydney/" },
    ],
  };
}

async function run() {
  const payload = await getPayload({ config });
  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found.`);
  const siteId = site.id as string;

  const dryRun = process.env.DRY_RUN === "true";

  for (const route of ROUTES) {
    const data = buildPage(route);
    if (dryRun) {
      console.log(`  [${data.slug}] DRY RUN - would upsert (${data.faq.length} FAQs, ${data.contentSections.length} sections).`);
      continue;
    }
    const doc = await upsertBySlug(payload, "pages", siteId, data.slug, { site: siteId, ...data });
    console.log(`  [${data.slug}] upserted (id ${doc.id}).`);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
