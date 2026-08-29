/**
 * Drafts a first small batch of suburb HUB pages (locationType: "suburb") for
 * transport-solutions, one per region for spread, distinct from the existing 5 suburb<->airport
 * ROUTE pages (Parramatta/Liverpool/Blacktown/Penrith/Castle Hill - see seed-suburb-route-pages.ts)
 * so there's no keyword/content overlap.
 *
 * All facts here (drive times etc.) are reused directly from the already-seeded region docs
 * (see seed-transport-solutions-locations.ts), not invented - matching the site's existing
 * convention of stating only sourced, approximate-range facts.
 *
 * Seeded as seoStatus: "review", indexOverride: "none" - previewable but NOT indexed until a
 * human reads each page and flips it to "approved" in the CMS. Per the SEO brief: small batches,
 * human-reviewed, never bulk-generated.
 *
 * Run with: npm run seed:suburb-hub-pages   (from content-hub/)
 * Requires npm run seed:transport-solutions-locations to have been run first (creates the regions).
 * Safe to re-run - existing docs (matched by site+slug) are updated, not duplicated.
 */
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { createMediaUploader } from "./seedUtils";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../transport-solutions-sydney/public");

type Service = { icon: string; title: string; description: string; href: string };
type Faq = { question: string; answer: string };

type SuburbInput = {
  slug: string;
  name: string;
  parentRegionSlug: string;
  metaTitle: string;
  metaDescription: string;
  heroDescription: string;
  image: string;
  intro: string[];
  airportInfo: string;
  services: Service[];
  faq: Faq[];
  targetKeyword: string;
};

const suburbs: SuburbInput[] = [
  {
    slug: "bondi",
    name: "Bondi",
    parentRegionSlug: "eastern-suburbs",
    metaTitle: "Maxi Taxi Bondi | 7 & 11 Seater Airport Transfers",
    metaDescription: "Pre-booked maxi taxi service for Bondi and Bondi Beach. 7 & 11 seater vehicles, fixed-price Sydney Airport transfers, 24/7 booking.",
    heroDescription: "Pre-booked 7 and 11 seater maxi taxis for Bondi, Bondi Beach and Bondi Junction, with fixed-price transfers to Sydney Airport.",
    image: "Sydney-maxi-taxi.jpg",
    intro: [
      "Bondi is one of Sydney's best-known beachside suburbs, drawing a steady mix of residents, visitors and beachgoers around Campbell Parade, Bondi Beach and the surrounding cafe and retail strip.",
      "TipTop Maxi Sydney is regularly booked here for beach-day group transport, airport transfers and hotel pickups, with Bondi Junction's transport interchange also a common meeting point for larger group bookings.",
    ],
    airportInfo:
      "From Bondi or Bondi Junction, allow around 20-30 minutes to Sydney Airport via the Eastern Distributor, more in heavy traffic. We recommend pre-booking with extra buffer time for early morning or peak-hour flights.",
    services: [
      { icon: "✈️", title: "Sydney Airport Transfers", description: "Fixed-price transfers via the Eastern Distributor", href: "/sydney-airport-transfers/" },
      { icon: "💍", title: "Wedding Transport", description: "Bridal party and guest transport for beachside venues", href: "/wedding-transport-sydney/" },
      { icon: "👨‍👩‍👧‍👦", title: "Family Taxi", description: "Prams, car seats and family-sized vehicles", href: "/family-taxi-sydney/" },
      { icon: "👥", title: "Group Transport", description: "Beach days, events and larger gatherings", href: "/group-transport-sydney/" },
    ],
    faq: [
      { question: "How long from Bondi Beach to Sydney Airport?", answer: "Typically 20-30 minutes via the Eastern Distributor, depending on traffic. We recommend pre-booking with extra buffer time for early morning or peak-hour flights." },
      { question: "Do you provide transport for beach weddings or events in Bondi?", answer: "Yes, we arrange bridal party and guest transport for Bondi and Bondi Beach venues, including multi-vehicle bookings for larger wedding parties." },
    ],
    targetKeyword: "maxi taxi bondi",
  },
  {
    slug: "chatswood",
    name: "Chatswood",
    parentRegionSlug: "north-shore",
    metaTitle: "Maxi Taxi Chatswood | 7 & 11 Seater Airport Transfers",
    metaDescription: "Pre-booked maxi taxi service for Chatswood and the North Shore. 7 & 11 seater vehicles, fixed-price Sydney Airport transfers, 24/7 booking.",
    heroDescription: "Pre-booked 7 and 11 seater maxi taxis for Chatswood, Lane Cove and the surrounding North Shore retail and business precinct.",
    image: "Sydney-scaled.jpg",
    intro: [
      "Chatswood is one of Sydney's busiest North Shore hubs, combining a major shopping and dining precinct with a growing cluster of technology and corporate offices around Victoria Avenue and the Chatswood Interchange.",
      "TipTop Maxi Sydney is a regular choice here for corporate travel, family shopping trips and Sydney Airport transfers, with most journeys to the CBD or airport crossing the Sydney Harbour Bridge or Tunnel.",
    ],
    airportInfo:
      "Sydney Airport is typically a 30-40 minute drive from Chatswood via the Warringah Freeway and Sydney Harbour Bridge or Tunnel, longer during peak-hour city traffic. We recommend pre-booking with extra buffer time for early flights.",
    services: [
      { icon: "🏢", title: "Corporate Transfers", description: "Business travel for Chatswood offices", href: "/corporate-transfers-sydney/" },
      { icon: "✈️", title: "Sydney Airport Transfers", description: "Transfers via the Harbour Bridge or Tunnel", href: "/sydney-airport-transfers/" },
      { icon: "🚐", title: "7 Seater Taxi", description: "Families and small groups", href: "/7-seater-taxi-sydney/" },
    ],
    faq: [
      { question: "How long does it take to reach Sydney Airport from Chatswood?", answer: "Typically 30-40 minutes via the Warringah Freeway and Sydney Harbour Bridge or Tunnel, though this can extend during peak-hour traffic. Pre-booking is recommended for early flights." },
      { question: "Do you offer corporate accounts for Chatswood businesses?", answer: "Yes, businesses in Chatswood can apply for a corporate account with invoicing options for regular staff and client travel." },
    ],
    targetKeyword: "maxi taxi chatswood",
  },
  {
    slug: "cronulla",
    name: "Cronulla",
    parentRegionSlug: "sutherland-shire",
    metaTitle: "Maxi Taxi Cronulla | 7 & 11 Seater Airport Transfers",
    metaDescription: "Pre-booked maxi taxi service for Cronulla and the Sutherland Shire. 7 & 11 seater vehicles, fixed-price Sydney Airport transfers, 24/7 booking.",
    heroDescription: "Pre-booked 7 and 11 seater maxi taxis for Cronulla, Cronulla Beach and the wider Sutherland Shire.",
    image: "maxtaxi2.webp",
    intro: [
      "Cronulla is Sydney's southernmost beach suburb, with a busy beachfront, the Cronulla Mall shopping strip, and the ferry terminal connecting across Port Hacking to Bundeena and the Royal National Park.",
      "TipTop Maxi Sydney serves this area for beach-day group travel, family trips and Sydney Airport transfers, along with longer-distance transfers toward the Royal National Park and South Coast.",
    ],
    airportInfo:
      "Sydney Airport is typically 30-40 minutes from Cronulla depending on traffic and route, via the Princes Highway/A1 or Southern Cross Drive. We recommend pre-booking with extra time for early-morning or peak-period flights.",
    services: [
      { icon: "✈️", title: "Sydney Airport Transfers", description: "Transfers via the Princes Highway or Southern Cross Drive", href: "/sydney-airport-transfers/" },
      { icon: "🚗", title: "Long Distance Taxi", description: "Royal National Park and South Coast transfers", href: "/long-distance-taxi-sydney/" },
      { icon: "💍", title: "Wedding Transport", description: "Cronulla beachside wedding and event venues", href: "/wedding-transport-sydney/" },
      { icon: "👨‍👩‍👧‍👦", title: "Family Taxi", description: "Family travel across Cronulla and the Shire", href: "/family-taxi-sydney/" },
    ],
    faq: [
      { question: "How long does it take from Cronulla to Sydney Airport?", answer: "Typically 30-40 minutes depending on traffic and route. We recommend pre-booking with extra time for early-morning or peak-period flights." },
      { question: "Can you arrange transport toward the Royal National Park or South Coast from Cronulla?", answer: "Yes, we provide longer-distance transfers from Cronulla toward the Royal National Park and NSW South Coast, subject to availability and advance booking." },
    ],
    targetKeyword: "maxi taxi cronulla",
  },
  {
    slug: "manly",
    name: "Manly",
    parentRegionSlug: "northern-beaches",
    metaTitle: "Maxi Taxi Manly | 7 & 11 Seater Airport Transfers",
    metaDescription: "Pre-booked maxi taxi service for Manly and the Northern Beaches. 7 & 11 seater vehicles, fixed-price Sydney Airport transfers, 24/7 booking.",
    heroDescription: "Pre-booked 7 and 11 seater maxi taxis for Manly, Manly Beach and the wider Northern Beaches, with fixed-price transfers to Sydney Airport.",
    image: "tiptop-maxi-sydney-banner.webp",
    intro: [
      "Manly sits at the southern end of the Northern Beaches, with a well-known beachfront, the Corso pedestrian strip, and the ferry wharf connecting to Circular Quay.",
      "TipTop Maxi Sydney is a common choice for Manly airport transfers, wedding and event transport, and family travel, given the Northern Beaches' longer and more traffic-dependent road trip to Sydney Airport.",
    ],
    airportInfo:
      "Sydney Airport is typically 45-70 minutes from Manly depending on traffic, travelling via the Spit Bridge or the Harbour Bridge/Warringah Freeway. Because trip times vary more in this area, we recommend booking with a generous time buffer, particularly for early flights.",
    services: [
      { icon: "✈️", title: "Sydney Airport Transfers", description: "Pre-booked transfers with extra time buffer", href: "/sydney-airport-transfers/" },
      { icon: "💍", title: "Wedding Transport", description: "Beachside wedding and event venues", href: "/wedding-transport-sydney/" },
      { icon: "👨‍👩‍👧‍👦", title: "Family Taxi", description: "Family travel with prams and child seats", href: "/family-taxi-sydney/" },
      { icon: "👶", title: "Baby Seat Taxi", description: "Baby capsules and child restraints on request", href: "/baby-seat-taxi-sydney/" },
    ],
    faq: [
      { question: "Why does the trip from Manly to the airport take longer than other parts of Sydney?", answer: "There is no direct train line and no motorway shortcut from Manly, so road traffic on routes like the Spit Bridge or Warringah Freeway has a bigger effect on travel time. We recommend extra buffer time when booking an airport transfer." },
      { question: "Can you arrange transport for a wedding at a Manly beachside venue?", answer: "Yes, we regularly arrange bridal party and guest transport for Manly wedding venues, including multi-vehicle bookings for larger guest lists." },
    ],
    targetKeyword: "maxi taxi manly",
  },
  {
    slug: "hurstville",
    name: "Hurstville",
    parentRegionSlug: "st-george",
    metaTitle: "Maxi Taxi Hurstville | 7 & 11 Seater Airport Transfers",
    metaDescription: "Pre-booked maxi taxi service for Hurstville and the St George region. 7 & 11 seater vehicles, fixed-price Sydney Airport transfers, 24/7 booking.",
    heroDescription: "Pre-booked 7 and 11 seater maxi taxis for Hurstville and the wider St George region, one of the closest areas to Sydney Airport.",
    image: "Maxi-Cab-service-1.png",
    intro: [
      "Hurstville is the commercial hub of the St George region, with a large shopping and dining precinct around Hurstville Westfield and the train station, plus growing high-density residential development nearby.",
      "TipTop Maxi Sydney is regularly booked here for Sydney Airport transfers given the short travel time, along with family travel and group transport across the wider St George area.",
    ],
    airportInfo:
      "Hurstville is typically a 10-15 minute drive to Sydney Airport via the M5 or General Holmes Drive, among the shortest airport trip times of any Sydney region.",
    services: [
      { icon: "✈️", title: "Sydney Airport Transfers", description: "One of the shortest airport trip times in Sydney", href: "/sydney-airport-transfers/" },
      { icon: "🚢", title: "Cruise Terminal Transfers", description: "Quick access to the city's cruise terminals", href: "/cruise-terminal-transfers-sydney/" },
      { icon: "🚐", title: "7 Seater Taxi", description: "Families and small groups", href: "/7-seater-taxi-sydney/" },
    ],
    faq: [
      { question: "How close is Hurstville to Sydney Airport?", answer: "Very close - typically a 10-15 minute drive via the M5 or General Holmes Drive, among the fastest airport transfer times of any Sydney suburb." },
      { question: "Do you cover Hurstville Westfield and the train station for pickups?", answer: "Yes, we regularly collect from Hurstville Westfield, the train station forecourt and surrounding streets. Provide your exact pickup point when booking." },
    ],
    targetKeyword: "maxi taxi hurstville",
  },
];

async function run() {
  const payload = await getPayload({ config });
  const getOrUploadMedia = createMediaUploader(payload, publicDir);
  const site = await payload.find({ collection: "sites", where: { key: { equals: "transport-solutions" } }, limit: 1 });
  const siteId = site.docs[0].id;

  console.log(`Seeding ${suburbs.length} suburb hub pages (seoStatus: review)...`);
  for (const s of suburbs) {
    const region = await payload.find({ collection: "locations", where: { and: [{ site: { equals: siteId } }, { slug: { equals: s.parentRegionSlug } }] }, limit: 1 });
    const regionId = region.docs[0]?.id;
    if (!regionId) {
      console.warn(`  SKIP ${s.slug}: parent region "${s.parentRegionSlug}" not found - run seed:transport-solutions-locations first.`);
      continue;
    }

    const imageId = await getOrUploadMedia(`/images/${s.image}`, `${s.name} maxi taxi service`);
    const data = {
      site: siteId,
      locationType: "suburb" as const,
      parentRegion: regionId,
      seoStatus: "review" as const,
      indexOverride: "none" as const,
      targetKeyword: s.targetKeyword,
      slug: s.slug,
      name: s.name,
      metaTitle: s.metaTitle,
      metaDescription: s.metaDescription,
      heroDescription: s.heroDescription,
      image: imageId,
      intro: s.intro.map((text) => ({ text })),
      airportInfo: s.airportInfo,
      services: s.services,
      nearbyLocations: [regionId],
      faq: s.faq,
    };

    const existing = await payload.find({ collection: "locations", where: { and: [{ site: { equals: siteId } }, { slug: { equals: s.slug } }] }, limit: 1 });
    if (existing.docs[0]) {
      await payload.update({ collection: "locations", id: existing.docs[0].id, data });
    } else {
      await payload.create({ collection: "locations", data });
    }
    console.log(`  suburb: ${s.slug} (region: ${s.parentRegionSlug})`);
  }

  console.log("Done. All docs are seoStatus: review - not indexed until approved in the CMS.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
