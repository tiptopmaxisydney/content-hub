/**
 * Stage 2 of the SEO rollout: Maxi Taxi hub pages + Sydney Airport route pages for every
 * suburb already listed in the 10 approved regions' suburbs[] arrays, excluding the 10 suburbs
 * already covered (5 airport-route pages from seed-suburb-route-pages.ts's original set, 5 hub
 * pages from seed-suburb-hub-pages.ts's pilot batch).
 *
 * This is a template-driven generator, not 180 hand-written pages: each suburb's content is
 * assembled from real, already-approved region-level facts (drive times, services) plus a small
 * rotating set of intro-paragraph phrasings (picked deterministically per suburb so runs are
 * reproducible), matching Phase 3's "pages must not be identical templates" requirement without
 * inventing unverified suburb-specific claims. No postcode/hospital/hotel data is included -
 * that would require real data this script doesn't have; adding it later needs a verified source.
 *
 * Every doc is seeded seoStatus: "review", indexOverride: "none" - previewable, not indexed,
 * until a human approves each one. Per the brief: Stage 2 is a draft batch for review, not an
 * automatic publish.
 *
 * Run with: npm run seed:stage2-suburb-pages   (from content-hub/)
 * Requires seed:transport-solutions-locations to have been run first.
 * Safe to re-run - existing docs (matched by site+slug) are updated, not duplicated.
 */
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { createMediaUploader } from "./seedUtils";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../transport-solutions-sydney/public");

type Payload = Awaited<ReturnType<typeof getPayload>>;

const regionSuburbs: Record<string, string[]> = {
  // "Sydney CBD" excluded - identical name to its own region, would duplicate the region hub page.
  "sydney-cbd": ["Haymarket", "The Rocks", "Barangaroo", "Pyrmont", "Ultimo", "Surry Hills", "Darlinghurst", "Chippendale", "Millers Point"],
  "eastern-suburbs": ["Bondi", "Bondi Junction", "Coogee", "Randwick", "Double Bay", "Rose Bay", "Vaucluse", "Maroubra", "Paddington", "Woollahra"],
  "inner-west": ["Newtown", "Marrickville", "Leichhardt", "Balmain", "Ashfield", "Burwood", "Petersham", "Annandale", "Glebe", "Strathfield"],
  "western-sydney": ["Parramatta", "Blacktown", "Auburn", "Merrylands", "Granville", "Westmead", "Wentworthville", "Toongabbie", "Harris Park", "Guildford"],
  "south-west-sydney": ["Liverpool", "Campbelltown", "Fairfield", "Cabramatta", "Bankstown", "Green Valley", "Casula", "Ingleburn", "Prestons", "Moorebank"],
  "north-shore": ["Chatswood", "North Sydney", "Lane Cove", "Willoughby", "St Leonards", "Artarmon", "Mosman", "Hornsby", "Gordon", "Pymble"],
  "northern-beaches": ["Manly", "Dee Why", "Mona Vale", "Narrabeen", "Avalon", "Palm Beach", "Brookvale", "Freshwater", "Newport", "Warriewood"],
  "hills-district": ["Castle Hill", "Baulkham Hills", "Kellyville", "Rouse Hill", "Norwest", "Winston Hills", "Bella Vista", "Glenhaven", "Beaumont Hills", "Box Hill"],
  "st-george": ["Hurstville", "Kogarah", "Rockdale", "Beverly Hills", "Peakhurst", "Oatley", "Mortdale", "Penshurst", "Bexley", "Carlton"],
  "sutherland-shire": ["Cronulla", "Sutherland", "Miranda", "Caringbah", "Menai", "Engadine", "Gymea", "Woolooware", "Kirrawee", "Sylvania"],
};

// Already covered by seed-suburb-route-pages.ts (route) and seed-suburb-hub-pages.ts (hub pilot).
const alreadyCovered = new Set(["Parramatta", "Liverpool", "Blacktown", "Penrith", "Castle Hill", "Bondi", "Chatswood", "Cronulla", "Manly", "Hurstville"]);

const regionServices: Record<string, { icon: string; title: string; href: string }[]> = {
  "sydney-cbd": [{ icon: "✈️", title: "Sydney Airport Transfers", href: "/sydney-airport-transfers/" }, { icon: "👥", title: "Group Transport", href: "/group-transport-sydney/" }],
  "eastern-suburbs": [{ icon: "✈️", title: "Sydney Airport Transfers", href: "/sydney-airport-transfers/" }, { icon: "👨‍👩‍👧‍👦", title: "Family Taxi", href: "/family-taxi-sydney/" }],
  "inner-west": [{ icon: "✈️", title: "Sydney Airport Transfers", href: "/sydney-airport-transfers/" }, { icon: "🚐", title: "7 Seater Taxi", href: "/7-seater-taxi-sydney/" }],
  "western-sydney": [{ icon: "✈️", title: "Sydney Airport Transfers", href: "/sydney-airport-transfers/" }, { icon: "🚐", title: "11 Seater Taxi", href: "/11-seater-taxi-sydney/" }],
  "south-west-sydney": [{ icon: "✈️", title: "Sydney Airport Transfers", href: "/sydney-airport-transfers/" }, { icon: "🚐", title: "11 Seater Taxi", href: "/11-seater-taxi-sydney/" }],
  "north-shore": [{ icon: "🏢", title: "Corporate Transfers", href: "/corporate-transfers-sydney/" }, { icon: "✈️", title: "Sydney Airport Transfers", href: "/sydney-airport-transfers/" }],
  "northern-beaches": [{ icon: "✈️", title: "Sydney Airport Transfers", href: "/sydney-airport-transfers/" }, { icon: "👨‍👩‍👧‍👦", title: "Family Taxi", href: "/family-taxi-sydney/" }],
  "hills-district": [{ icon: "🏢", title: "Corporate Transfers", href: "/corporate-transfers-sydney/" }, { icon: "🚐", title: "11 Seater Taxi", href: "/11-seater-taxi-sydney/" }],
  "st-george": [{ icon: "✈️", title: "Sydney Airport Transfers", href: "/sydney-airport-transfers/" }, { icon: "🚢", title: "Cruise Terminal Transfers", href: "/cruise-terminal-transfers-sydney/" }],
  "sutherland-shire": [{ icon: "✈️", title: "Sydney Airport Transfers", href: "/sydney-airport-transfers/" }, { icon: "🚗", title: "Long Distance Taxi", href: "/long-distance-taxi-sydney/" }],
};

const images = ["Sydney-maxi-taxi.jpg", "Sydney-scaled.jpg", "maxtaxi2.webp", "tiptop-maxi-sydney-banner.webp", "Maxi-Cab-service-1.png", "maxitaxi-1024x683.jpg", "Sydney-Airport-Transfer.jpg"];

const introTemplatesA = [
  (s: string, r: string) => `${s} is one of the well-known pickup and drop-off points across ${r}, with a steady mix of local residents, commuters and visitors booking transport day to day.`,
  (s: string, r: string) => `TipTop Maxi Sydney regularly covers ${s}, part of the wider ${r} area, for everything from routine trips to larger group and airport travel.`,
  (s: string, r: string) => `${s} sits within ${r}, an area where TipTop Maxi Sydney is a familiar choice for pre-booked maxi taxi transport.`,
  (s: string, r: string) => `As part of ${r}, ${s} is well covered by TipTop Maxi Sydney's maxi taxi service, from single-passenger trips through to larger group bookings.`,
];

const introTemplatesB = [
  (s: string) => `Pre-book a 7 or 11 seater maxi taxi from ${s} for airport transfers, family trips or larger group travel, with a fixed fare agreed before you book.`,
  (s: string) => `Whether it's an early airport run or a larger group heading out together, TipTop Maxi Sydney's ${s} service is set up to handle both short-notice and pre-scheduled bookings.`,
  (s: string) => `From ${s}, TipTop Maxi Sydney arranges everything from a single passenger to full group bookings, with vehicle size matched to your passenger and luggage numbers.`,
  (s: string) => `Book online or by phone for a maxi taxi from ${s}, with 24/7 availability and a driver briefed on your pickup point in advance.`,
];

const faqTemplatesA = [
  (s: string) => ({ question: `Can I pre-book a maxi taxi from ${s}?`, answer: `Yes. Provide your pickup address in ${s}, along with your destination, date, time, passenger count and luggage, and we'll confirm the right vehicle for your trip.` }),
];

function pick<T>(items: T[], key: string): T {
  const hash = [...key].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return items[hash % items.length];
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function upsertLocation(payload: Payload, siteId: string, slug: string, data: Record<string, unknown>) {
  const existing = await payload.find({ collection: "locations", where: { and: [{ site: { equals: siteId } }, { slug: { equals: slug } }] }, limit: 1 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const typedData = data as any;
  if (existing.docs[0]) return payload.update({ collection: "locations", id: existing.docs[0].id, data: typedData, draft: false });
  return payload.create({ collection: "locations", data: typedData, draft: false });
}

async function upsertPage(payload: Payload, siteId: string, slug: string, data: Record<string, unknown>) {
  const existing = await payload.find({ collection: "pages", where: { and: [{ site: { equals: siteId } }, { slug: { equals: slug } }] }, limit: 1 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const typedData = data as any;
  if (existing.docs[0]) return payload.update({ collection: "pages", id: existing.docs[0].id, data: typedData, draft: false });
  return payload.create({ collection: "pages", data: typedData, draft: false });
}

async function run() {
  const payload = await getPayload({ config });
  const getOrUploadMedia = createMediaUploader(payload, publicDir);
  const site = await payload.find({ collection: "sites", where: { key: { equals: "transport-solutions" } }, limit: 1 });
  const siteId = site.docs[0].id as string;

  const regions = await payload.find({ collection: "locations", where: { and: [{ site: { equals: siteId } }, { locationType: { equals: "region" } }] }, limit: 20 });
  const regionBySlug = new Map(regions.docs.map((r) => [r.slug, r]));

  const targets: { suburb: string; regionSlug: string }[] = [];
  for (const [regionSlug, suburbs] of Object.entries(regionSuburbs)) {
    for (const suburb of suburbs) {
      if (alreadyCovered.has(suburb)) continue;
      targets.push({ suburb, regionSlug });
    }
  }
  console.log(`Generating ${targets.length} suburb hub pages + ${targets.length} airport route pages (${targets.length * 2} total, seoStatus: review)...`);

  let i = 0;
  for (const { suburb, regionSlug } of targets) {
    const region = regionBySlug.get(regionSlug);
    if (!region) {
      console.warn(`  SKIP ${suburb}: region "${regionSlug}" not found`);
      continue;
    }
    const suburbSlug = slugify(suburb);
    const image = images[i % images.length];
    i++;

    // --- Hub page: Maxi Taxi {Suburb} (Locations, locationType: suburb) ---
    const imageId = await getOrUploadMedia(`/images/${image}`, `${suburb} maxi taxi service`);
    const introA = pick(introTemplatesA, suburb)(suburb, region.name as string);
    const introB = pick(introTemplatesB, suburb)(suburb);
    const services = (regionServices[regionSlug] ?? []).map((s) => ({ icon: s.icon, title: s.title, description: `Serving ${suburb} and the wider ${region.name}`, href: s.href }));

    const hubData = {
      site: siteId,
      locationType: "suburb" as const,
      parentRegion: region.id,
      seoStatus: "review" as const,
      indexOverride: "none" as const,
      targetKeyword: `maxi taxi ${suburb.toLowerCase()}`,
      slug: suburbSlug,
      name: suburb,
      metaTitle: `Maxi Taxi ${suburb} | 7 & 11 Seater Airport Transfers`,
      metaDescription: `Pre-booked maxi taxi service for ${suburb} and surrounding ${region.name} suburbs. 7 & 11 seater vehicles, fixed-price Sydney Airport transfers, 24/7 booking.`,
      heroDescription: `Pre-booked 7 and 11 seater maxi taxis for ${suburb} and the wider ${region.name}, with fixed-price transfers to Sydney Airport.`,
      image: imageId,
      intro: [{ text: introA }, { text: introB }],
      airportInfo: `${suburb} is part of ${region.name}. ${region.airportInfo ?? ""}`,
      westernAirportInfo: region.westernAirportInfo ?? undefined,
      services,
      nearbyLocations: [region.id],
      faq: [faqTemplatesA[0](suburb)],
    };
    await upsertLocation(payload, siteId, suburbSlug, hubData);

    // --- Route page: {Suburb} to Sydney Airport Taxi (Pages, pageType: service) ---
    const routeSlug = `${suburbSlug}-to-sydney-airport-taxi`;
    const routeImageId = await getOrUploadMedia("/images/Sydney-Airport-Transfer.jpg", "TipTop Maxi Sydney airport transfer vehicle");
    const routeData = {
      site: siteId,
      pageType: "service" as const,
      seoStatus: "review" as const,
      indexOverride: "none" as const,
      targetKeyword: `${suburb.toLowerCase()} to sydney airport taxi`,
      slug: routeSlug,
      metaTitle: `${suburb} to Sydney Airport Taxi | Fixed-Price Transfers`,
      metaDescription: `Pre-booked taxi from ${suburb} to Sydney Airport. Fixed fare, flight monitoring, sedan to 11-seater maxi taxi. 24/7 booking.`,
      h1: `${suburb} to Sydney Airport, Fixed Price, Every Time`,
      heroDescription: `A fixed-fare taxi from ${suburb} to Sydney Airport, with a vehicle sized for one passenger or a whole group travelling together.`,
      image: routeImageId,
      contentSections: [
        {
          heading: `The Drive from ${suburb} to Sydney Airport`,
          paragraphs: [{ text: region.airportInfo as string }],
          bulletList: [
            "Fixed fare for the full journey, tolls included",
            "Flight monitoring so a delayed flight doesn't mean a driver who's given up",
            "Sedan, SUV or maxi taxi depending on your group and luggage",
            "Available 24/7 for early departures and late arrivals",
          ].map((text) => ({ text })),
        },
      ],
      faq: [
        { question: `How much does a taxi from ${suburb} to Sydney Airport cost?`, answer: "Fares are fixed and confirmed at the time of booking based on your pickup point, vehicle size and any tolls - contact us or use the online booking form for an exact quote." },
        { question: "Can I pre-book in advance for an early flight?", answer: "Yes, we recommend pre-booking for early-morning or peak-period flights so your pickup time and vehicle are confirmed ahead of time." },
      ],
      relatedLinks: [{ icon: "🏙️", title: `Maxi Taxi ${suburb}`, description: `General maxi taxi service for ${suburb}`, href: `/locations/${regionSlug}/${suburbSlug}/` }],
    };
    await upsertPage(payload, siteId, routeSlug, routeData);

    console.log(`  ${i}/${targets.length}: ${suburb} (${regionSlug}) -> hub + route`);
  }

  console.log("Done. All docs are seoStatus: review - not indexed until approved in the CMS.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
