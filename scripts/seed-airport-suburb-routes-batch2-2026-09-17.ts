/**
 * Follow-up batch to seed-airport-suburb-routes-2026-09-15.ts: the original P0/P1 brief's own
 * example suburb list for the Sydney Airport hub's "Popular Sydney Airport Transfer
 * Destinations" section named 12 suburbs; only 8 got route pages in the first batch. This adds
 * the remaining 4: Ryde, North Sydney, Bondi, Cronulla.
 *
 * North Sydney hit the exact same duplicate-URL situation the 2026-09-15 consolidation fixed
 * for Parramatta/Liverpool/Blacktown/Penrith/Castle Hill: an established, approved page already
 * exists at /north-sydney-to-sydney-airport-taxi/ (created 2026-08-29). Same fix applied here -
 * move its slug to /sydney-airport-transfers/north-sydney/, keep its established
 * h1/metaTitle/heroDescription untouched (avoid compounding ranking risk on top of the URL
 * change), and top up its thinner content (1 section, 2 FAQs, 1 related link) to the same depth
 * as the other 8 route pages. Ryde/Bondi/Cronulla had no pre-existing flat-slug page, so those
 * are plain new docs.
 *
 * Distance/route framing for North Sydney, Bondi and Cronulla reuses what's already published
 * on their /locations/ suburb pages (checked directly against the CMS `locations` collection)
 * so the two systems don't contradict each other - same approach the first batch took for
 * Chatswood/Manly. Ryde has no /locations/ page yet, so its distance/route uses the same
 * qualifying-language pattern as the first batch's unreferenced suburbs (well-known motorway
 * names, broad time ranges, "typically/allow a buffer" framing, no live routing API).
 *
 * Also appends all 4 to the hub page's relatedLinks, and adds reciprocal backlinks from the
 * three of these four that already have a /locations/ suburb page (North Sydney, Bondi,
 * Cronulla - not Ryde, which has none), mirroring fix-airport-route-internal-linking-2026-09-15.ts.
 *
 * The 301 redirect for the old North Sydney URL is added separately to
 * transport-solutions-sydney/next.config.ts, not here.
 *
 * Run with: node --env-file=.env --import tsx scripts/seed-airport-suburb-routes-batch2-2026-09-17.ts
 * DRY_RUN=true to preview without writing.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { upsertBySlug } from "./seedUtils";

const SITE_KEY = "transport-solutions";
const IMAGE_ID = "6a84b455c70a80a8009db6a2"; // sydney-airport-transfers' own image, reused

const STANDARD_RELATED_LINKS = [
  { icon: "✈️", title: "Sydney Airport Transfers", description: "The full Sydney Airport transfer guide.", href: "/sydney-airport-transfers/" },
  { icon: "🧭", title: "Which Vehicle Should I Book?", description: "Match your passengers and luggage to the right vehicle.", href: "/which-taxi-should-i-book-sydney/" },
  { icon: "💷", title: "How Fares Are Calculated", description: "See what determines your upfront fixed fare.", href: "/how-taxi-fares-are-calculated-sydney/" },
];

function terminalSection() {
  return {
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
  };
}

function vehicleSection(suburb: string) {
  return {
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
  };
}

function flightFareSection(suburb: string) {
  return {
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
  };
}

function standardFaqs(suburb: string, distanceKm: string, travelTime: string, routeDescription: string) {
  return [
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
  ];
}

type NewRoute = {
  suburb: string;
  slugSuffix: string;
  region: string;
  distanceKm: string;
  travelTime: string;
  routeDescription: string;
  routeIntro: string;
  nearbyAreas: string[];
};

const NEW_ROUTES: NewRoute[] = [
  {
    suburb: "Ryde",
    slugSuffix: "ryde",
    region: "Northern Sydney",
    distanceKm: "approximately 20km",
    travelTime: "typically 30-45 minutes in normal traffic, longer during peak hour",
    routeDescription: "via the Lane Cove Tunnel and Epping Road, or along Victoria Road by the Parramatta River",
    routeIntro:
      "Ryde sits on the Parramatta River in Northern Sydney, roughly 20km from Sydney Airport. Trips are typically routed via the Lane Cove Tunnel and Epping Road, or along Victoria Road, depending on traffic conditions at the time.",
    nearbyAreas: ["West Ryde", "Meadowbank", "Gladesville", "Eastwood"],
  },
  {
    suburb: "Bondi",
    slugSuffix: "bondi",
    region: "Eastern Suburbs",
    distanceKm: "approximately 12km",
    travelTime: "typically 20-30 minutes in normal traffic, longer during peak hour or busy beach weekends",
    routeDescription: "via the Eastern Distributor and Bondi Road, or Old South Head Road",
    routeIntro:
      "Bondi is one of the closer Sydney Airport routes we run, at roughly 12km via the Eastern Distributor and Bondi Road or Old South Head Road. Allow extra time on busy beach weekends, when Bondi Road traffic can back up.",
    nearbyAreas: ["Bondi Junction", "Bondi Beach", "Tamarama", "North Bondi"],
  },
  {
    suburb: "Cronulla",
    slugSuffix: "cronulla",
    region: "Sutherland Shire",
    distanceKm: "approximately 20km",
    travelTime: "typically 30-40 minutes in normal traffic, longer during peak hour",
    routeDescription: "via the Princes Highway (A1) or Southern Cross Drive and President Avenue",
    routeIntro:
      "Cronulla is roughly 20km south of Sydney Airport, in the Sutherland Shire. Trips are typically routed via the Princes Highway (A1) or Southern Cross Drive and President Avenue, depending on traffic at the time.",
    nearbyAreas: ["Woolooware", "Caringbah", "Miranda", "Sylvania"],
  },
];

function buildNewPage(route: NewRoute) {
  const { suburb, distanceKm, travelTime, routeDescription, routeIntro, nearbyAreas } = route;
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
        paragraphs: [{ text: `${routeIntro} Travel time is ${travelTime} - we recommend booking with a buffer for early-morning or peak-period flights.` }],
        bulletList: [
          { text: `Sydney Airport → ${suburb}: pre-booked pickup at T1 International or T2/T3 Domestic, direct to your ${suburb} address` },
          { text: `${suburb} → Sydney Airport: pre-booked pickup at your ${suburb} address, timed to your flight` },
          { text: `Nearby areas we also serve on this route: ${nearbyAreas.join(", ")}` },
        ],
      },
      terminalSection(),
      vehicleSection(suburb),
      flightFareSection(suburb),
    ],
    faq: standardFaqs(suburb, distanceKm, travelTime, routeDescription),
    relatedLinks: STANDARD_RELATED_LINKS,
  };
}

// North Sydney: consolidate the existing established page rather than create a duplicate.
const NORTH_SYDNEY_OLD_SLUG = "north-sydney-to-sydney-airport-taxi";
const NORTH_SYDNEY_NEW_SLUG = "sydney-airport-transfers/north-sydney";
const NORTH_SYDNEY_SUBURB = "North Sydney";
const NORTH_SYDNEY_DISTANCE = "approximately 13km";
const NORTH_SYDNEY_TIME = "typically 30-40 minutes in normal traffic, longer during peak-hour city traffic";
const NORTH_SYDNEY_ROUTE = "via the Warringah Freeway and Sydney Harbour Bridge or Tunnel";
const NORTH_SYDNEY_NEARBY = ["Crows Nest", "Cammeray", "Neutral Bay", "Milsons Point"];

async function run() {
  const payload = await getPayload({ config });
  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found.`);
  const siteId = site.id as string;

  const dryRun = process.env.DRY_RUN === "true";

  // 1. Ryde, Bondi, Cronulla - plain new docs.
  for (const route of NEW_ROUTES) {
    const data = buildNewPage(route);
    if (dryRun) {
      console.log(`  [${data.slug}] DRY RUN - would upsert (${data.faq.length} FAQs, ${data.contentSections.length} sections).`);
      continue;
    }
    const doc = await upsertBySlug(payload, "pages", siteId, data.slug, { site: siteId, ...data });
    console.log(`  [${data.slug}] upserted (id ${doc.id}).`);
  }

  // 2. North Sydney - consolidate the existing page onto the new nested slug.
  {
    const [oldRes, newRes] = await Promise.all([
      payload.find({ collection: "pages", where: { and: [{ site: { equals: siteId } }, { slug: { equals: NORTH_SYDNEY_OLD_SLUG } }] }, limit: 1 }),
      payload.find({ collection: "pages", where: { and: [{ site: { equals: siteId } }, { slug: { equals: NORTH_SYDNEY_NEW_SLUG } }] }, limit: 1 }),
    ]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const oldDoc = oldRes.docs[0] as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newDupDoc = newRes.docs[0] as any;

    if (!oldDoc) {
      console.warn(`SKIP (established page not found): ${NORTH_SYDNEY_OLD_SLUG}`);
    } else if (dryRun) {
      console.log(`  [${NORTH_SYDNEY_OLD_SLUG} -> ${NORTH_SYDNEY_NEW_SLUG}] DRY RUN - would delete duplicate (${newDupDoc ? "found" : "not found"}), move slug, top up sections/FAQs/links.`);
    } else {
      if (newDupDoc) {
        await payload.delete({ collection: "pages", id: newDupDoc.id });
        console.log(`  [${NORTH_SYDNEY_NEW_SLUG}] deleted duplicate doc ${newDupDoc.id}.`);
      }

      const existingHrefs = new Set(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (oldDoc.relatedLinks ?? []).map((r: any) => (r.href ?? "").toLowerCase()),
      );
      const linksToAdd = STANDARD_RELATED_LINKS.filter((l) => !existingHrefs.has(l.href.toLowerCase()));

      const existingQuestions = new Set(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (oldDoc.faq ?? []).map((f: any) => (f.question ?? "").toLowerCase()),
      );
      const faqsToAdd = standardFaqs(NORTH_SYDNEY_SUBURB, NORTH_SYDNEY_DISTANCE, NORTH_SYDNEY_TIME, NORTH_SYDNEY_ROUTE).filter(
        (f) => !existingQuestions.has(f.question.toLowerCase()),
      );

      await payload.update({
        collection: "pages",
        id: oldDoc.id,
        data: {
          slug: NORTH_SYDNEY_NEW_SLUG,
          contentSections: [
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...(oldDoc.contentSections ?? []).map((s: any) => ({
              heading: s.heading,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              paragraphs: (s.paragraphs ?? []).map((p: any) => ({ text: p.text })),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              bulletList: (s.bulletList ?? []).map((b: any) => ({ text: b.text })),
            })),
            {
              heading: `Sydney Airport ↔ ${NORTH_SYDNEY_SUBURB}: Nearby Areas`,
              paragraphs: [
                {
                  text: `${NORTH_SYDNEY_SUBURB} is ${NORTH_SYDNEY_DISTANCE} from Sydney Airport, ${NORTH_SYDNEY_ROUTE}. We also cover the surrounding North Shore streets on this route.`,
                },
              ],
              bulletList: [
                { text: `Sydney Airport → ${NORTH_SYDNEY_SUBURB}: pre-booked pickup at T1 International or T2/T3 Domestic, direct to your address` },
                { text: `${NORTH_SYDNEY_SUBURB} → Sydney Airport: pre-booked pickup at your address, timed to your flight` },
                { text: `Nearby areas we also serve on this route: ${NORTH_SYDNEY_NEARBY.join(", ")}` },
              ],
            },
            terminalSection(),
            vehicleSection(NORTH_SYDNEY_SUBURB),
          ],
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          faq: [...(oldDoc.faq ?? []).map((f: any) => ({ question: f.question, answer: f.answer })), ...faqsToAdd],
          relatedLinks: [
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...(oldDoc.relatedLinks ?? []).map((r: any) => ({ icon: r.icon, title: r.title, description: r.description, href: r.href, targetPage: r.targetPage, targetLocation: r.targetLocation })),
            ...linksToAdd,
          ],
        },
      });
      console.log(`  [${NORTH_SYDNEY_OLD_SLUG} -> ${NORTH_SYDNEY_NEW_SLUG}] consolidated (id ${oldDoc.id}), +${faqsToAdd.length} FAQs, +${linksToAdd.length} links.`);
    }
  }

  // 3. Hub page relatedLinks: append the 4 new routes.
  {
    const HUB_LINKS = [
      { icon: "🚕", title: "Sydney Airport to Ryde", description: "Maxi taxi transfers to Ryde.", href: "/sydney-airport-transfers/ryde/" },
      { icon: "🚕", title: "Sydney Airport to North Sydney", description: "Maxi taxi transfers to North Sydney.", href: "/sydney-airport-transfers/north-sydney/" },
      { icon: "🚕", title: "Sydney Airport to Bondi", description: "Maxi taxi transfers to Bondi.", href: "/sydney-airport-transfers/bondi/" },
      { icon: "🚕", title: "Sydney Airport to Cronulla", description: "Maxi taxi transfers to Cronulla.", href: "/sydney-airport-transfers/cronulla/" },
    ];
    const res = await payload.find({ collection: "pages", where: { and: [{ site: { equals: siteId } }, { slug: { equals: "sydney-airport-transfers" } }] }, limit: 1, depth: 0 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = res.docs[0] as any;
    if (!doc) {
      console.warn("SKIP (hub page not found): sydney-airport-transfers");
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const existingHrefs = new Set((doc.relatedLinks ?? []).map((r: any) => (r.href ?? "").toLowerCase()));
      const toAdd = HUB_LINKS.filter((l) => !existingHrefs.has(l.href.toLowerCase()));
      if (toAdd.length === 0) {
        console.log("  [sydney-airport-transfers] already linked to all 4 new routes, skipping.");
      } else if (dryRun) {
        console.log(`  [sydney-airport-transfers] DRY RUN - would add ${toAdd.length} route links.`);
      } else {
        const updatedLinks = [
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(doc.relatedLinks ?? []).map((r: any) => ({ icon: r.icon, title: r.title, description: r.description, href: r.href, targetPage: r.targetPage, targetLocation: r.targetLocation })),
          ...toAdd,
        ];
        await payload.update({ collection: "pages", id: doc.id, data: { relatedLinks: updatedLinks } });
        console.log(`  [sydney-airport-transfers] added ${toAdd.length} route links.`);
      }
    }
  }

  // 4. Reciprocal backlinks from the /locations/ pages that exist for these suburbs (not Ryde).
  const LOCATION_BACKLINKS = [
    { slug: "north-sydney", href: "/sydney-airport-transfers/north-sydney/", title: "Sydney Airport to North Sydney" },
    { slug: "bondi", href: "/sydney-airport-transfers/bondi/", title: "Sydney Airport to Bondi Maxi Taxi" },
    { slug: "cronulla", href: "/sydney-airport-transfers/cronulla/", title: "Sydney Airport to Cronulla Maxi Taxi" },
  ];
  for (const { slug, href, title } of LOCATION_BACKLINKS) {
    const res = await payload.find({ collection: "locations", where: { and: [{ site: { equals: siteId } }, { slug: { equals: slug } }] }, limit: 1, depth: 0 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = res.docs[0] as any;
    if (!doc) {
      console.warn(`SKIP (location not found): ${slug}`);
      continue;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingHrefs = new Set((doc.services ?? []).map((s: any) => (s.href ?? "").toLowerCase()));
    if (existingHrefs.has(href.toLowerCase())) {
      console.log(`  [locations/${slug}] already linked, skipping.`);
      continue;
    }
    if (dryRun) {
      console.log(`  [locations/${slug}] DRY RUN - would add service link to ${href}.`);
      continue;
    }
    const updatedServices = [
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(doc.services ?? []).map((s: any) => ({ icon: s.icon, title: s.title, description: s.description, href: s.href })),
      { icon: "✈️", title, description: "Pre-booked Sydney Airport transfers with fixed pricing.", href },
    ];
    await payload.update({ collection: "locations", id: doc.id, data: { services: updatedServices } });
    console.log(`  [locations/${slug}] added service link to ${href}.`);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
