/**
 * Closes 3 gaps found in a post-launch review of the Sydney Airport <-> Suburb route pages
 * (seed-airport-suburb-routes-2026-09-15.ts + batch2 2026-09-17):
 *
 * 1. No state/postcode anywhere on the page (the P1 brief's own example showed "Epping NSW").
 * 2. Toll info was a generic "any applicable tolls" line, never route-specific.
 * 3. No distinct "Route Overview" scannable fact block - the same facts existed, but only as
 *    prose spread across sections, not the structured summary the page-structure spec described.
 *
 * This populates the new `routeDetails` group field (added to Pages.ts this same session) for
 * all 12 route pages, without touching their existing prose contentSections/FAQs - the frontend
 * renders `routeDetails` as an additional "Route Overview" block, it doesn't replace anything.
 *
 * Distance/time/corridor/region/nearby values are copied from what's already published in each
 * page's own "Distance & Route" content section (not re-derived), so the new structured fields
 * and the existing prose can't drift apart. Postcodes are standard, unambiguous Australia Post
 * postcodes for these suburbs. Toll info is deliberately qualitative (which toll roads/crossings
 * may apply) rather than a dollar figure - consistent with the site's existing "tolls included
 * in your fixed fare, no live pricing API" pattern.
 *
 * Run with: node --env-file=.env --import tsx scripts/add-route-overview-fields-2026-09-17.ts
 * DRY_RUN=true to preview without writing.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";

const VEHICLE_CATEGORIES = ["Sedan", "SUV", "7 Seater", "11 Seater", "Wheelchair Accessible", "Baby/Child Seat"];

type RouteDetails = {
  slugSuffix: string;
  destinationSuburb: string;
  destinationPostcode: string;
  region: string;
  distanceKm: string;
  travelTime: string;
  mainCorridor: string;
  tollInfo: string;
  nearbySuburbs: string[];
};

const ROUTES: RouteDetails[] = [
  {
    slugSuffix: "epping",
    destinationSuburb: "Epping",
    destinationPostcode: "2121",
    region: "Northern Sydney",
    distanceKm: "approximately 22km",
    travelTime: "typically 30-45 minutes in normal traffic, longer during peak hour",
    mainCorridor: "via the Eastern Distributor or City West Link, connecting to Epping Road and Beecroft Road",
    tollInfo: "This route may use the Eastern Distributor and/or M2 Motorway, both toll roads - toll costs are included in your fixed, upfront fare.",
    nearbySuburbs: ["Eastwood", "Carlingford", "North Epping", "Marsfield"],
  },
  {
    slugSuffix: "parramatta",
    destinationSuburb: "Parramatta",
    destinationPostcode: "2150",
    region: "Greater Western Sydney",
    distanceKm: "approximately 24km",
    travelTime: "typically 35-50 minutes in normal traffic, longer during peak hour",
    mainCorridor: "via the M5 Motorway and Cumberland Highway, or the M4 Motorway through the city",
    tollInfo: "This route may use the M4 or M5 Motorways, both toll roads - toll costs are included in your fixed, upfront fare.",
    nearbySuburbs: ["Harris Park", "Granville", "Westmead", "Rydalmere"],
  },
  {
    slugSuffix: "blacktown",
    destinationSuburb: "Blacktown",
    destinationPostcode: "2148",
    region: "Western Sydney",
    distanceKm: "approximately 35km",
    travelTime: "typically 40-55 minutes in normal traffic, longer during peak hour",
    mainCorridor: "via the M5 and M4 Motorways",
    tollInfo: "This route may use the M4 and M5 Motorways, both toll roads - toll costs are included in your fixed, upfront fare.",
    nearbySuburbs: ["Seven Hills", "Toongabbie", "Doonside", "Marayong"],
  },
  {
    slugSuffix: "penrith",
    destinationSuburb: "Penrith",
    destinationPostcode: "2750",
    region: "Outer Western Sydney",
    distanceKm: "approximately 54km",
    travelTime: "typically 50-70 minutes in normal traffic, longer during peak hour",
    mainCorridor: "via the M5 and M4 Motorways",
    tollInfo: "This route may use the M4 and M5 Motorways, both toll roads - toll costs are included in your fixed, upfront fare.",
    nearbySuburbs: ["Kingswood", "Werrington", "Jamisontown", "Emu Plains"],
  },
  {
    slugSuffix: "liverpool",
    destinationSuburb: "Liverpool",
    destinationPostcode: "2170",
    region: "South Western Sydney",
    distanceKm: "approximately 27km",
    travelTime: "typically 30-45 minutes in normal traffic, longer during peak hour",
    mainCorridor: "via the M5 Motorway",
    tollInfo: "This route may use the M5 Motorway, a toll road - toll costs are included in your fixed, upfront fare.",
    nearbySuburbs: ["Casula", "Moorebank", "Warwick Farm", "Chipping Norton"],
  },
  {
    slugSuffix: "castle-hill",
    destinationSuburb: "Castle Hill",
    destinationPostcode: "2154",
    region: "Hills District",
    distanceKm: "approximately 32km",
    travelTime: "typically 40-55 minutes in normal traffic, longer during peak hour",
    mainCorridor: "via the M2 Motorway and Windsor Road",
    tollInfo: "This route may use the M2 Motorway, a toll road; Windsor Road itself is toll-free - toll costs are included in your fixed, upfront fare.",
    nearbySuburbs: ["Baulkham Hills", "Kellyville", "Cherrybrook", "Beaumont Hills"],
  },
  {
    slugSuffix: "chatswood",
    destinationSuburb: "Chatswood",
    destinationPostcode: "2067",
    region: "North Shore",
    distanceKm: "approximately 17km",
    travelTime: "typically 30-40 minutes, longer during peak-hour city traffic",
    mainCorridor: "via the Warringah Freeway and Sydney Harbour Bridge or Tunnel",
    tollInfo: "This route crosses the Sydney Harbour Bridge or Harbour Tunnel, both toll crossings - toll costs are included in your fixed, upfront fare.",
    nearbySuburbs: ["Willoughby", "Artarmon", "St Leonards", "Lane Cove"],
  },
  {
    slugSuffix: "manly",
    destinationSuburb: "Manly",
    destinationPostcode: "2095",
    region: "Northern Beaches",
    distanceKm: "approximately 22km",
    travelTime: "typically 45-70 minutes depending on traffic",
    mainCorridor: "via the Spit Bridge or the Harbour Bridge and Warringah Freeway",
    tollInfo: "The Spit Bridge crossing is toll-free; the alternative via the Sydney Harbour Bridge or Tunnel is a toll crossing - any toll costs are included in your fixed, upfront fare.",
    nearbySuburbs: ["Fairlight", "Balgowlah", "Freshwater", "Seaforth"],
  },
  {
    slugSuffix: "ryde",
    destinationSuburb: "Ryde",
    destinationPostcode: "2112",
    region: "Northern Sydney",
    distanceKm: "approximately 20km",
    travelTime: "typically 30-45 minutes in normal traffic, longer during peak hour",
    mainCorridor: "via the Lane Cove Tunnel and Epping Road, or along Victoria Road by the Parramatta River",
    tollInfo: "This route may use the Lane Cove Tunnel, a toll road - toll costs are included in your fixed, upfront fare.",
    nearbySuburbs: ["West Ryde", "Meadowbank", "Gladesville", "Eastwood"],
  },
  {
    slugSuffix: "north-sydney",
    destinationSuburb: "North Sydney",
    destinationPostcode: "2060",
    region: "North Shore",
    distanceKm: "approximately 13km",
    travelTime: "typically 30-40 minutes in normal traffic, longer during peak-hour city traffic",
    mainCorridor: "via the Warringah Freeway and Sydney Harbour Bridge or Tunnel",
    tollInfo: "This route crosses the Sydney Harbour Bridge or Harbour Tunnel, both toll crossings - toll costs are included in your fixed, upfront fare.",
    nearbySuburbs: ["Crows Nest", "Cammeray", "Neutral Bay", "Milsons Point"],
  },
  {
    slugSuffix: "bondi",
    destinationSuburb: "Bondi",
    destinationPostcode: "2026",
    region: "Eastern Suburbs",
    distanceKm: "approximately 12km",
    travelTime: "typically 20-30 minutes in normal traffic, longer during peak hour or busy beach weekends",
    mainCorridor: "via the Eastern Distributor and Bondi Road, or Old South Head Road",
    tollInfo: "This route may use the Eastern Distributor, a toll road - toll costs are included in your fixed, upfront fare.",
    nearbySuburbs: ["Bondi Junction", "Bondi Beach", "Tamarama", "North Bondi"],
  },
  {
    slugSuffix: "cronulla",
    destinationSuburb: "Cronulla",
    destinationPostcode: "2230",
    region: "Sutherland Shire",
    distanceKm: "approximately 20km",
    travelTime: "typically 30-40 minutes in normal traffic, longer during peak hour",
    mainCorridor: "via the Princes Highway (A1) or Southern Cross Drive and President Avenue",
    tollInfo: "Via the Princes Highway this trip is typically toll-free; the alternative via Southern Cross Drive/Eastern Distributor is a toll crossing - any toll costs are included in your fixed, upfront fare.",
    nearbySuburbs: ["Woolooware", "Caringbah", "Miranda", "Sylvania"],
  },
];

async function run() {
  const payload = await getPayload({ config });
  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found.`);
  const siteId = site.id as string;

  const dryRun = process.env.DRY_RUN === "true";

  for (const route of ROUTES) {
    const slug = `sydney-airport-transfers/${route.slugSuffix}`;
    const res = await payload.find({ collection: "pages", where: { and: [{ site: { equals: siteId } }, { slug: { equals: slug } }] }, limit: 1, depth: 0 });
    const doc = res.docs[0];
    if (!doc) {
      console.warn(`SKIP (page not found): ${slug}`);
      continue;
    }

    const routeDetails = {
      originLabel: "Sydney Airport",
      destinationSuburb: route.destinationSuburb,
      destinationState: "NSW",
      destinationPostcode: route.destinationPostcode,
      region: route.region,
      distanceKm: route.distanceKm,
      travelTime: route.travelTime,
      mainCorridor: route.mainCorridor,
      tollInfo: route.tollInfo,
      terminals: "T1 International, T2 & T3 Domestic",
      vehicleCategories: VEHICLE_CATEGORIES.map((label) => ({ label })),
      nearbySuburbs: route.nearbySuburbs.map((name) => ({ name })),
    };

    if (dryRun) {
      console.log(`  [${slug}] DRY RUN - would set routeDetails (${route.destinationSuburb} NSW ${route.destinationPostcode}).`);
      continue;
    }

    // routeDetails is newer than most local payload-types.ts snapshots (gitignored, regenerated
    // per-machine via `npm run generate:types`) - cast like seedUtils.upsertBySlug does, so a
    // stale local type snapshot doesn't fail `next build`'s typecheck on this one-off script.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await payload.update({ collection: "pages", id: doc.id, data: { routeDetails } as any });
    console.log(`  [${slug}] routeDetails set.`);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
