/**
 * transport-solutions (tiptopmaxisydney.com.au) - CMS half of the "SUV taxi Bankstown" SEO audit,
 * 2026-11-21 (target keyword "book a taxi suv in bankstown sydney"). The code half is in
 * transport-solutions-sydney, same date: location h1/contentSections rendering, the
 * ?vehicle=suv booking-form preselect, FAQPage schema on suburb pages.
 *
 * Vehicle facts follow the live booking system (POST booking/web/vehicle/pricing, 2026-11-21):
 *   Sedan 4 pax / 2 suitcases + 2 carry-on, no baby seats  |  SUV 5 pax / 5 suitcases + 3 carry-on
 *   Minibus 10 pax / 10 suitcases + 6 carry-on              |  no 7-seat or 11-passenger category
 * so the 7-seater is described as a phone booking and the "11 seater" as Minibus (10 online, call for 11).
 *
 * 1  Bankstown location (/locations/south-west-sydney/bankstown/) rewritten for SUV + maxi intent:
 *    targetKeyword, metaTitle/Description, h1, hero, Bankstown-only intro and airport info (was the
 *    region's Liverpool/Campbelltown copy), "Book an SUV Taxi in Bankstown" section with CTA, vehicle
 *    comparison, airport section, service links, SUV FAQs (the Liverpool/Campbelltown FAQs are gone).
 * 2  /maxi-suv/ re-targeted from "Maxi Cab SUV Sydney" to "SUV Taxi Sydney" (URL unchanged), with
 *    the 5/6/7-seat claims replaced by the real 5-passenger spec and links to Bankstown/airports/booking.
 * 3  vehicle-specs (shown on every location and route page): capacities and names as above, the two
 *    "Book SUV" buttons that pointed to different pages, and the duplicate order 2.
 * 4  WSI wording still in the future tense: two region intros, the Liverpool FAQ (10 location docs)
 *    and three airport-page strings (WSI opened 25 October 2026 - see fix-seo-brief-2026-10-31.ts).
 *
 * Requires the Locations.ts h1 + contentSections fields (same commit) to be DEPLOYED to the CMS
 * before running LIVE, or the deployed admin won't know the new Bankstown fields.
 *
 * Run with: node --env-file=.env --import tsx scripts/seo-suv-bankstown-2026-11-21.ts
 * Dry run by default (writes scripts/backups/seo-suv-bankstown-2026-11-21.diff.txt); LIVE=true
 * writes, after saving every original field to scripts/backups/. Restore with
 * --restore scripts/backups/<file>.json
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";
const PHONE = "02 9669 9390";
const SUV_BOOKING = "/book-taxi/?vehicle=suv#booking-form";
const BANKSTOWN_PATH = "/locations/south-west-sydney/bankstown/";
// Approved flight wording (see fix-seo-brief-2026-10-31.ts / lib/customerInfo.ts on the site).
const FLIGHT = "Give us your flight number when booking so our team can monitor arrival updates and coordinate your pickup.";

type Collection = "pages" | "locations" | "vehicle-specs";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Doc = Record<string, any> & { id: string };

const texts = (items: string[]) => items.map((text) => ({ text }));
const section = (heading: string, paragraphs: string[], bulletList: string[] = [], cta?: { label: string; href: string }) => ({
  heading,
  paragraphs: texts(paragraphs),
  bulletList: texts(bulletList),
  ...(cta ? { ctaLabel: cta.label, ctaHref: cta.href } : {}),
});

const VEHICLE_COMPARISON = (sevenSeaterLink: boolean) => [
  "Sedan taxi: up to 4 passengers and 2 suitcases. Sedans don't carry baby seats.",
  "SUV taxi: up to 5 passengers and 5 suitcases, with baby seats and capsules available.",
  `${sevenSeaterLink ? "[7-seater maxi taxi](/7-seater-taxi-sydney/)" : "7-seater maxi taxi"}: up to 7 seats, booked by phone on ${PHONE} - it isn't bookable online yet, so call to confirm availability.`,
  `[11-seater maxi taxi](/11-seater-taxi-sydney/): books online as Minibus for up to 10 passengers and 10 suitcases - call us for a group of 11.`,
];

// ---- 1. Bankstown ---------------------------------------------------------------------------
function bankstown(pageId: (slug: string) => string) {
  return {
    targetKeyword: "suv taxi bankstown",
    metaTitle: "Book an SUV Taxi in Bankstown | SUV & Maxi Taxi Sydney",
    metaDescription:
      "Book an SUV taxi or maxi taxi in Bankstown. SUVs take up to 5 passengers and 5 suitcases; minibuses up to 10. Fixed fares to both Sydney airports, 24/7.",
    h1: "SUV Taxi & Maxi Taxi Bankstown",
    heroDescription:
      "Book an SUV taxi in Bankstown for up to 5 passengers and 5 suitcases, or a maxi taxi for bigger groups. Pickups across Bankstown and nearby suburbs, with fixed-fare Sydney Airport and Western Sydney Airport transfers, 24/7.",
    intro: texts([
      "TipTop Maxi Sydney picks up across Bankstown and the surrounding Canterbury-Bankstown suburbs, about 20km south-west of the Sydney CBD. Book an SUV taxi for up to five passengers, a sedan for smaller trips, or a maxi taxi when the whole group needs to travel together.",
      "Regular Bankstown pickups include homes and units around the town centre, Bankstown Central, Bankstown-Lidcombe Hospital, Bankstown Sports Club and businesses near Bankstown Airport, as well as nearby Yagoona, Punchbowl, Greenacre, Condell Park, Revesby and Padstow.",
    ]),
    airportInfo:
      "Sydney (Kingsford Smith) Airport is about 20km from Bankstown, usually 25-40 minutes by road via the M5 depending on traffic and the time of day. Allow extra time in weekday peak hours and for early-morning international departures.",
    westernAirportInfo:
      "Western Sydney International Airport at Badgerys Creek, open since 25 October 2026, is roughly 40km west of Bankstown by road - usually 35-50 minutes via the M5 and M7. We take bookings to and from both airports.",
    contentSections: [
      section(
        "Book an SUV Taxi in Bankstown",
        [
          "Our SUV taxi is the step up from a sedan when you have more people or more bags: room for up to 5 passengers with up to 5 suitcases and 3 carry-on bags. It suits family airport runs, couples with plenty of luggage and small groups heading out together.",
          "Enter your Bankstown pickup and destination in the booking form, choose SUV as your vehicle and you'll see the full fare before you pay. The Book SUV Taxi button below opens the form with the SUV already selected.",
        ],
        [
          "Passengers: up to 5",
          "Luggage: up to 5 suitcases plus 3 carry-on bags",
          "Baby seats and capsules: add them when you book",
          "Wheelchairs: not carried in the SUV - book our [wheelchair accessible taxi](/wheelchair-taxi-sydney/) instead",
          "Available 24/7 for Bankstown pickups, including early-morning airport departures",
        ],
        { label: "Book SUV Taxi", href: SUV_BOOKING },
      ),
      section(
        "SUV, 7-Seater or 11-Seater: Which Do You Need?",
        ["Choose by passengers and luggage together - a vehicle with every seat filled has less room left for suitcases."],
        VEHICLE_COMPARISON(true),
      ),
      section("Airport Transfers from Bankstown", [
        `For [Sydney Airport transfers](/sydney-airport-transfers/) we collect from your door in Bankstown and drop off at T1 International or the T2 and T3 domestic terminals. ${FLIGHT}`,
        "We also run [Western Sydney Airport transfers](/western-sydney-airport-transfers/) from Bankstown, with the same choice of sedan, SUV and maxi taxi.",
      ]),
    ],
    services: [
      { icon: "✈️", title: "Sydney Airport Transfers", description: "Bankstown to T1, T2 and T3, usually 25-40 minutes", targetPage: pageId("sydney-airport-transfers") },
      { icon: "🛫", title: "Western Sydney Airport Transfers", description: "Bankstown to Badgerys Creek via the M5 and M7", targetPage: pageId("western-sydney-airport-transfers") },
      { icon: "🚙", title: "SUV Taxi Sydney", description: "Up to 5 passengers and 5 suitcases", targetPage: pageId("maxi-suv") },
      { icon: "🚐", title: "11 Seater Maxi Taxi", description: "Up to 10 passengers online, 11 by phone", targetPage: pageId("11-seater-taxi-sydney") },
      { icon: "🧭", title: "Which Vehicle Should I Book?", description: "Match your passengers and luggage to the right vehicle", targetPage: pageId("which-taxi-should-i-book-sydney") },
    ],
    faq: [
      {
        question: "Can I book an SUV taxi in Bankstown?",
        answer: `Yes. Enter your Bankstown pickup address, destination, date and time in the booking form and choose SUV. You'll see the full fare before you pay and receive a booking confirmation. You can also book by phone on ${PHONE}, 24/7.`,
      },
      {
        question: "How many passengers fit in an SUV taxi?",
        answer: `Up to 5 passengers. For 6 to 10 passengers, book the Minibus (11-seater maxi taxi) online, or call ${PHONE} about a 7-seater or a group of 11.`,
      },
      {
        question: "How much luggage can the SUV take?",
        answer: "Up to 5 suitcases plus 3 carry-on bags. Each pram or stroller you add takes the place of one suitcase. For golf bags or oversized cases, add a note when booking so we can confirm the right vehicle, or choose the Minibus for extra room.",
      },
      {
        question: "Do I need to book my SUV in advance?",
        answer: "Book as early as you can, especially for early-morning airport departures, weekends and public holidays, so an SUV is allocated to your trip. We take bookings 24/7 online and by phone.",
      },
      {
        question: "Can I take an SUV taxi from Bankstown to Sydney Airport or Western Sydney Airport?",
        answer: `Yes, to and from both airports. Sydney Airport is usually 25-40 minutes from Bankstown and Western Sydney International about 35-50 minutes, depending on traffic. For airport pickups, give us your flight number when booking so our team can monitor arrival updates and coordinate your pickup.`,
      },
      {
        question: "How much does an SUV taxi cost in Bankstown?",
        answer: "The fare depends on your trip distance, plus any tolls, airport fees, government levy and time-based surcharges. The booking form shows the full fare before you pay, so you know the price up front.",
      },
      {
        question: "Can I get a baby seat in the SUV?",
        answer: "Yes. Add baby seats or capsules when you book and tell us each child's age. Sedans don't carry baby seats, so choose the SUV or our Baby Seat Transfer option.",
      },
      {
        question: "Do you still offer maxi taxis in Bankstown?",
        answer: `Yes. Our Minibus (11-seater maxi taxi) takes up to 10 passengers and books online, and you can call ${PHONE} for a 7-seater or a group of 11.`,
      },
    ],
  };
}

// ---- 2. /maxi-suv/ ----------------------------------------------------------------------------
function maxiSuv(pageId: (slug: string) => string, locationId: (slug: string) => string) {
  return {
    targetKeyword: "suv taxi sydney",
    metaTitle: "SUV Taxi Sydney | Book an SUV Online, 24/7",
    metaDescription:
      "Book an SUV taxi in Sydney for up to 5 passengers and 5 suitcases. Baby seats available, full fare shown before you pay, airport transfers 24/7.",
    h1: "SUV Taxi Sydney - Book an SUV for Up to 5 Passengers",
    heroDescription:
      "Book an SUV taxi in Sydney when a sedan is too small: room for up to 5 passengers, 5 suitcases and 3 carry-on bags, with baby seats available. Fixed fares for Sydney Airport, Western Sydney Airport and local trips, 24/7.",
    contentSections: [
      section("Book an SUV Taxi in Sydney", [
        "TipTop Maxi Sydney's SUV taxi sits in the middle of our fleet - more room than a [sedan](/sedan/), smaller than a maxi taxi. Choose it for family airport runs, couples or small groups with real luggage, and any trip where you need baby seats.",
        `Enter your pickup and destination in the [booking form](${SUV_BOOKING}) - that link opens it with the SUV already selected - and you'll see the full fare before you pay. You can also call our booking team on ${PHONE}, 24/7.`,
      ]),
      section("SUV Taxi Specifications", [], [
        "Passengers: up to 5",
        "Luggage: up to 5 suitcases plus 3 carry-on bags (each pram or stroller takes one suitcase space)",
        "Baby seats and capsules: available - add them when you book",
        "Wheelchairs: not carried - book a [wheelchair accessible taxi](/wheelchair-taxi-sydney/) instead",
        "Air-conditioned, with a professional, licensed driver",
        "Bookable online or by phone, 24/7",
      ]),
      section(
        "SUV Taxi vs 7-Seater vs 11-Seater Maxi Taxi",
        ["Choose by passengers and luggage together - a vehicle with every seat filled has less room left for suitcases."],
        VEHICLE_COMPARISON(true),
      ),
      section("SUV Airport Transfers", [
        `Book an SUV for [Sydney Airport transfers](/sydney-airport-transfers/) to T1 International or the T2 and T3 domestic terminals, or for [Western Sydney Airport transfers](/western-sydney-airport-transfers/) to Badgerys Creek. ${FLIGHT}`,
      ]),
      section("SUV Taxis Across Sydney", [
        `We collect from homes, hotels and offices across Sydney - for example [SUV taxis in Bankstown](${BANKSTOWN_PATH}) - or browse all the [areas we cover](/locations/).`,
      ]),
      section("How to Book Your SUV Taxi", [], [
        "Open the booking form and enter your pickup, destination, date and time",
        "Choose SUV as your vehicle",
        "Add passengers, luggage, baby seats and any flight details",
        "Check the full fare and pay to confirm your booking",
      ]),
    ],
    faq: [
      { question: "How many passengers fit in your SUV taxi?", answer: `Up to 5 passengers. For 6 to 10 passengers, book the Minibus (11-seater maxi taxi) online, or call ${PHONE} about a 7-seater or a group of 11.` },
      { question: "How much luggage does the SUV take?", answer: "Up to 5 suitcases plus 3 carry-on bags. Each pram or stroller takes the place of one suitcase. For golf bags or oversized cases, add a note when booking so we can confirm the right vehicle." },
      { question: "Can I book an SUV taxi for airport transfers?", answer: `Yes - to and from Sydney Airport (T1, T2 and T3) and Western Sydney International. ${FLIGHT}` },
      { question: "Are baby seats available in the SUV?", answer: "Yes. Add baby seats or capsules when you book and tell us each child's age. Sedans don't carry baby seats, so choose the SUV or our Baby Seat Transfer option." },
      { question: "Is the SUV the same as a 7-seater maxi taxi?", answer: `No. The SUV taxi seats up to 5 passengers and books online. Our 7-seater maxi taxi is booked by phone on ${PHONE} - call to confirm availability. For 6 to 10 passengers online, choose the Minibus (11-seater maxi taxi).` },
      { question: "How much does an SUV taxi cost?", answer: "The fare depends on your trip distance, plus any tolls, airport fees, government levy and time-based surcharges. The booking form shows the full fare before you pay." },
      { question: "Are your SUVs wheelchair accessible?", answer: "No. For a wheelchair user, book our Wheelchair Vehicle, which carries the wheelchair plus companions." },
      { question: "Do you offer SUV taxis 24/7?", answer: "Yes. You can book an SUV online or by phone at any time, including early-morning and late-night airport transfers." },
    ],
    relatedLinks: [
      { icon: "📍", title: "SUV Taxi Bankstown", description: "SUV and maxi taxi pickups across Bankstown", targetLocation: locationId("bankstown") },
      { icon: "✈️", title: "Sydney Airport Transfers", description: "Fixed-fare SUV transfers to T1, T2 and T3", targetPage: pageId("sydney-airport-transfers") },
      { icon: "🛫", title: "Western Sydney Airport Transfers", description: "SUV transfers to and from Badgerys Creek", targetPage: pageId("western-sydney-airport-transfers") },
      { icon: "🚐", title: "7 Seater Taxi Sydney", description: "Our 7-seater maxi taxi, booked by phone", targetPage: pageId("7-seater-taxi-sydney") },
      { icon: "🧭", title: "Which Vehicle Should I Book?", description: "Match your passenger count and luggage to the right TipTop vehicle.", targetPage: pageId("which-taxi-should-i-book-sydney") },
      { icon: "🚙", title: "Book an SUV Taxi", description: "Open the booking form with the SUV selected", href: SUV_BOOKING },
    ],
  };
}

// ---- 3. vehicle-specs, keyed by current title ------------------------------------------------
const VEHICLE_SPECS: Record<string, Record<string, unknown>> = {
  "Sedan Taxi": {
    specs: texts(["Seating for up to 4 passengers", "2 suitcases + 2 carry-on bags"]),
    luggageCapacity: 2,
    luggageNotes: "plus 2 carry-on bags. Sedans don't carry baby seats - choose the SUV or Baby Seat Transfer",
    order: 1,
  },
  "SUV Taxi": {
    specs: texts(["Seating for up to 5 passengers", "Up to 5 suitcases + 3 carry-on bags"]),
    features: texts(["Baby seats and capsules available", "Air conditioning", "Bookable online 24/7"]),
    passengerCapacity: 5,
    luggageCapacity: 5,
    luggageNotes: "plus 3 carry-on bags",
    ctaLabel: "SUV Taxi Details",
    ctaHref: "/maxi-suv/",
    order: 2,
  },
  "7 Seater SUV Maxi Taxi": {
    title: "7-Seater Maxi Taxi",
    badge: "Phone Booking",
    specs: texts(["Up to 7 seats", `Call ${PHONE} to book - not yet bookable online`]),
    features: texts(["Confirm availability and luggage when you call", "Phone bookings 24/7"]),
    passengerCapacity: 7,
    luggageCapacity: null,
    luggageNotes: "Depends on passenger numbers - confirm when you call",
    ctaLabel: "7-Seater Details",
    ctaHref: "/7-seater-taxi-sydney/",
    order: 3,
  },
  "11 Seater Maxi Van": {
    title: "11-Seater Maxi Taxi (Minibus)",
    specs: texts(["Up to 10 passengers online - call for 11", "Up to 10 suitcases + 6 carry-on bags"]),
    passengerCapacity: 10,
    luggageCapacity: 10,
    luggageNotes: "plus 6 carry-on bags, depending on passenger numbers. Tell us about prams or oversized luggage when booking",
    ctaLabel: "11-Seater Details",
    order: 4,
  },
};

// ---- 4. WSI tense, applied to every page/location except the two rewritten above ------------
const TEXT_RULES: [string, string][] = [
  ["near Liverpool, which opens to passengers on 25 October 2026.", "near Liverpool, which opened to passengers on 25 October 2026."],
  [
    "Sydney Airport transfers and, from October 2026, transfers to the new Western Sydney Airport at Badgerys Creek,",
    "Sydney Airport transfers and transfers to Western Sydney International Airport at Badgerys Creek, open since 25 October 2026,",
  ],
  [
    "Liverpool is one of the closest population centres to the Badgerys Creek airport site, so transfer times from this region will typically be shorter than trips to Sydney Airport.",
    "Liverpool is one of the closest population centres to Western Sydney International Airport at Badgerys Creek, so transfers from Liverpool are typically shorter than trips to Sydney Airport.",
  ],
  ["WSI opens to passengers on 25 October 2026.", "WSI opened to passengers on 25 October 2026."],
  ["Western Sydney International Airport Opens to Passengers 25 October 2026", "Western Sydney International Airport: Open to Passengers Since 25 October 2026"],
  ["Flying from WSI from October 2026?", "Flying from WSI?"],
];
// Fields the text rules never touch (identity, relationships, timestamps).
const RULE_SKIP_KEYS = new Set(["id", "site", "slug", "createdAt", "updatedAt", "image", "parentRegion", "nearbyLocations", "relatedFaqs", "targetKeyword"]);
// Reported (not failed) if still present anywhere after the changes - candidates for a follow-up.
const STALE_CLAIMS = /5, 6 (or|&) 7 seat|up to seven|up to 7 passengers|airport site|opens to passengers|from October 2026|will open|being built/i;

function mapStrings(value: unknown, fn: (s: string) => string): unknown {
  if (typeof value === "string") return fn(value);
  if (Array.isArray(value)) return value.map((v) => mapStrings(v, fn));
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k === "id" ? v : mapStrings(v, fn)]));
  return value;
}

function flatten(value: unknown, path: string, out: Map<string, string>) {
  if (typeof value === "string" || typeof value === "number" || value === null) out.set(path, String(value));
  else if (Array.isArray(value)) value.forEach((v, i) => flatten(v, `${path}[${i}]`, out));
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) if (k !== "id") flatten(v, `${path}.${k}`, out);
}

async function run() {
  const live = process.env.LIVE === "true";
  const restoreIdx = process.argv.indexOf("--restore");
  const payload = await getPayload({ config });

  if (restoreIdx !== -1) {
    const backup = JSON.parse(readFileSync(process.argv[restoreIdx + 1], "utf8")) as {
      docs: { collection: Collection; id: string; slug: string; original: Record<string, unknown> }[];
    };
    for (const d of backup.docs) {
      await payload.update({ collection: d.collection, id: d.id, data: d.original });
      console.log(`restored ${d.collection}/${d.slug}`);
    }
    process.exit(0);
  }

  const siteWhere = { "site.key": { equals: SITE_KEY } };
  const find = async (collection: Collection) => (await payload.find({ collection, where: siteWhere, limit: 1000, depth: 0 })).docs as unknown as Doc[];
  const [pages, locations, vehicles] = [await find("pages"), await find("locations"), await find("vehicle-specs")];

  const bySlug = (docs: Doc[], kind: string) => (slug: string) => {
    const doc = docs.find((d) => d.slug === slug);
    if (!doc) throw new Error(`${kind} "${slug}" not found - the CMS changed, re-check this script.`);
    return doc;
  };
  const page = bySlug(pages, "page");
  const location = bySlug(locations, "location");
  const pageId = (slug: string) => page(slug).id;
  const locationId = (slug: string) => location(slug).id;

  type Change = { collection: Collection; doc: Doc; data: Record<string, unknown> };
  const changes: Change[] = [
    { collection: "locations", doc: location("bankstown"), data: bankstown(pageId) },
    { collection: "pages", doc: page("maxi-suv"), data: maxiSuv(pageId, locationId) },
  ];

  for (const [title, data] of Object.entries(VEHICLE_SPECS)) {
    const doc = vehicles.find((v) => v.title === title);
    if (!doc) throw new Error(`vehicle-spec "${title}" not found - the CMS changed, re-check this script.`);
    changes.push({ collection: "vehicle-specs", doc: { ...doc, slug: title }, data });
  }

  const ruleHits = new Map<string, number>();
  const ruleTargets = [
    ...locations.filter((d) => d.slug !== "bankstown").map((doc) => ({ collection: "locations" as const, doc })),
    ...pages.filter((d) => d.slug !== "maxi-suv").map((doc) => ({ collection: "pages" as const, doc })),
  ];
  for (const { collection, doc } of ruleTargets) {
    const data: Record<string, unknown> = {};
    for (const key of Object.keys(doc)) {
      if (RULE_SKIP_KEYS.has(key) || doc[key] == null) continue;
      const next = mapStrings(doc[key], (s) => {
        let out = s;
        for (const [old, rep] of TEXT_RULES) {
          if (out.includes(old)) {
            out = out.split(old).join(rep);
            ruleHits.set(old, (ruleHits.get(old) ?? 0) + 1);
          }
        }
        return out;
      });
      if (JSON.stringify(next) !== JSON.stringify(doc[key])) data[key] = next;
    }
    if (Object.keys(data).length) changes.push({ collection, doc, data });
  }
  const missed = TEXT_RULES.filter(([old]) => !ruleHits.has(old));
  if (missed.length) throw new Error(`Text rule(s) matched nothing - the CMS changed:\n  ${missed.map(([o]) => o).join("\n  ")}`);

  // ---- checks
  const problems: string[] = [];
  for (const c of changes) {
    const t = c.data.metaTitle as string | undefined;
    const d = c.data.metaDescription as string | undefined;
    if (t && t.length > 60) problems.push(`${c.doc.slug}: metaTitle ${t.length} chars (max 60)`);
    if (d && (d.length > 160 || d.length < 70)) problems.push(`${c.doc.slug}: metaDescription ${d.length} chars (70-160)`);
    const kw = c.data.targetKeyword as string | undefined;
    if (kw) {
      const owner = [...pages, ...locations].find((x) => x.targetKeyword === kw && x.id !== c.doc.id);
      if (owner) problems.push(`${c.doc.slug}: targetKeyword "${kw}" already owned by ${owner.slug}`);
    }
  }
  if (problems.length) {
    problems.forEach((p) => console.error(`  PROBLEM: ${p}`));
    throw new Error("Fix the problems above first.");
  }

  // ---- diff
  const diffs: string[] = [];
  for (const c of changes) {
    const before = new Map<string, string>();
    const after = new Map<string, string>();
    for (const k of Object.keys(c.data)) {
      flatten(c.doc[k] ?? null, k, before);
      flatten(c.data[k], k, after);
    }
    const lines = [...new Set([...before.keys(), ...after.keys()])]
      .filter((k) => before.get(k) !== after.get(k))
      .map((k) => `  ${k}\n    - ${before.get(k) ?? "(none)"}\n    + ${after.get(k) ?? "(removed)"}`);
    diffs.push(`### ${c.collection}/${c.doc.slug}\n${lines.join("\n")}`);
  }
  mkdirSync("scripts/backups", { recursive: true });
  const diffPath = "scripts/backups/seo-suv-bankstown-2026-11-21.diff.txt";
  writeFileSync(diffPath, diffs.join("\n\n"));

  const stale: string[] = [];
  const changed = new Map(changes.map((c) => [`${c.collection}/${c.doc.id}`, c]));
  for (const [collection, docs] of [["pages", pages], ["locations", locations]] as const) {
    for (const doc of docs) {
      const c = changed.get(`${collection}/${doc.id}`);
      const merged = c ? { ...doc, ...c.data } : doc;
      const out = new Map<string, string>();
      flatten(merged, "", out);
      for (const [path, value] of out) if (STALE_CLAIMS.test(value)) stale.push(`${collection}/${doc.slug}${path}: ${value.slice(0, 140)}`);
    }
  }

  const count = (col: Collection) => changes.filter((c) => c.collection === col).length;
  console.log(`${count("locations")} locations, ${count("pages")} pages, ${count("vehicle-specs")} vehicle-specs to update. Diff: ${diffPath}`);
  console.log(`Text rules: ${[...ruleHits.values()].join(", ")} hits.`);
  if (stale.length) console.log(`\n${stale.length} remaining capacity/WSI phrases elsewhere (not changed by this script):\n  ${stale.join("\n  ")}`);

  if (!live) {
    console.log("\nDRY RUN - pass LIVE=true to actually write.");
    process.exit(0);
  }

  const backupPath = `scripts/backups/seo-suv-bankstown-${Date.now()}.json`;
  writeFileSync(
    backupPath,
    JSON.stringify(
      {
        docs: changes.map((c) => ({
          collection: c.collection,
          id: c.doc.id,
          slug: c.doc.slug,
          original: Object.fromEntries(Object.keys(c.data).map((k) => [k, c.doc[k] ?? null])),
        })),
      },
      null,
      1,
    ),
  );
  console.log(`Backup of original field values: ${backupPath}`);

  for (const c of changes) {
    await payload.update({ collection: c.collection, id: c.doc.id, data: c.data });
    console.log(`saved ${c.collection}/${c.doc.slug}`);
  }
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
