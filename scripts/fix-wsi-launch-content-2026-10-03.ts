/**
 * WSI launch-readiness content pass for transport-solutions, agreed 2026-10-03 (three weeks
 * before passenger opening). Earlier passes (2026-08-22, 2026-09-14) fixed copy that described
 * WSI as already operating; this pass updates what is now confirmed and removes what is now
 * outdated or unsupported:
 *
 * - Opening wording upgraded from "scheduled to commence passenger operations" to the confirmed
 *   "opens to passengers on Sunday, 25 October 2026", and "being built" / "due to open" removed.
 * - Official name + terminal address (40 Nancy Drive, Luddenham NSW 2745) on the main pages.
 * - New "Flying from WSI" (launch airlines/routes) and "24/7 transfers" sections on the hub page.
 * - "Airport access fee included" removed from WSI pages - WSI commercial-vehicle charges are
 *   not yet published. Sydney Airport pages are deliberately left alone (those fees are known).
 * - "Rideshare/taxi zone" pickup wording removed - WSI has given Uber an exclusive pickup zone,
 *   so pre-booked private-hire pickup arrangements are still unconfirmed.
 * - "From day one" / "specialists" claims softened to "from opening day".
 *
 * Launch routes verified 2026-10-03 against infrastructure.gov.au and airline announcements:
 * Jetstar (Gold Coast, Melbourne, Brisbane) from 25 Oct; Air New Zealand (Auckland) from 26 Oct;
 * Singapore Airlines (Singapore) from 23 Nov, subject to approvals; Qantas (Melbourne, Brisbane)
 * from 28 Mar 2027.
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-wsi-launch-content-2026-10-03.ts
 * (dry-run by default - pass LIVE=true to actually write)
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";

// Mirrors transport-solutions-sydney/lib/wsi.ts WSI_PAGE_SLUGS - fee/pickup/"day one" fixes are
// scoped to these so Sydney Airport pages keep their (accurate) access-fee wording.
const WSI_PAGE_SLUGS = new Set([
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
]);

type Replacement = { old: string; new: string };

const OPENS = "opens to passengers on Sunday, 25 October 2026";
const CHARGES_NOTE = "any applicable WSI airport charges confirmed in your quote";

// Applied to every transport-solutions page and location doc. Order matters: longer, more
// specific strings come before the shorter ones they contain.
const globalReplacements: Replacement[] = [
  {
    old: "Not yet. Western Sydney International (Nancy-Bird Walton) Airport is scheduled to commence passenger operations on 25 October 2026.",
    new: `Western Sydney International (Nancy-Bird Walton) Airport ${OPENS}.`,
  },
  {
    old: "Western Sydney International (Nancy-Bird Walton) Airport is being built at Bradfield, in the Badgerys Creek precinct, and is scheduled to commence passenger operations on 25 October 2026.",
    new: `Western Sydney International (Nancy-Bird Walton) Airport ${OPENS}, with its passenger terminal at 40 Nancy Drive in the Badgerys Creek/Luddenham precinct.`,
  },
  {
    old: "Airport at Bradfield is scheduled to commence passenger operations on 25 October 2026.",
    new: `Airport ${OPENS}.`,
  },
  { old: "is scheduled to commence passenger operations on 25 October 2026", new: OPENS },
  {
    old: "Western Sydney Airport (Badgerys Creek) is due to open 25 October 2026 and",
    new: "Western Sydney International Airport (Badgerys Creek) opens to passengers on 25 October 2026 and",
  },
  {
    old: "the Western Sydney Airport site being built at Badgerys Creek, near Liverpool.",
    new: "Western Sydney International (Nancy-Bird Walton) Airport at Badgerys Creek, near Liverpool, which opens to passengers on 25 October 2026.",
  },
];

// WSI pages only.
const wsiReplacements: Replacement[] = [
  // Fees - WSI commercial-vehicle charges not yet published.
  { old: "tolls and the airport access fee included", new: `tolls included and ${CHARGES_NOTE}` },
  { old: "covering the vehicle, driver assistance and the airport access fee,", new: `covering the vehicle and driver assistance, with ${CHARGES_NOTE},` },
  { old: "including the airport access fee. No meter", new: `with ${CHARGES_NOTE}. No meter` },
  { old: "The fare you're quoted, including the airport access fee, is the fare you pay.", new: `The fare you're quoted is the fare you pay, with ${CHARGES_NOTE}.` },
  // Pickup zones - Uber holds WSI's exclusive rideshare zone; ours is unconfirmed.
  {
    old: "Pickup at the terminal's designated rideshare/taxi zone once confirmed",
    new: "Pickup at the WSI-designated area for pre-booked vehicles, confirmed with your booking",
  },
  {
    old: "Exact terminal pickup zones will be confirmed as Bradfield finalises operations",
    new: "Exact pickup arrangements will be confirmed once WSI publishes its commercial-vehicle procedures",
  },
  // Claims we can't substantiate before passenger operations start.
  { old: "Western Sydney Airport specialists from day one", new: "Prepared for Western Sydney Airport transfers from opening day" },
  { old: "part of our normal service from day one", new: "part of our normal service from opening day" },
  { old: "we'll be ready to cover them from day one", new: "we'll be ready to cover them from opening day" },
  { old: "expected to be part of normal operations from day one", new: "expected to be part of normal operations from opening day" },
];

// Hub-page structural changes (sections inserted, not string-patched).
const AIRLINES_SECTION = {
  heading: "Flying from WSI from October 2026?",
  paragraphs: [
    { text: "Airlines have confirmed the first passenger routes from Western Sydney International. If you're booked on one of these launch services, you can pre-book your transfer now:" },
  ],
  bulletList: [
    { text: "Jetstar — Gold Coast, Melbourne and Brisbane, from opening day (25 October 2026)" },
    { text: "Air New Zealand — Auckland, from 26 October 2026" },
    { text: "Singapore Airlines — Singapore, from November 2026 (subject to approvals)" },
    { text: "Qantas — Melbourne and Brisbane, from March 2027" },
  ],
};
const TWENTY_FOUR_SEVEN_SECTION = {
  heading: "24/7 Western Sydney Airport Transfers",
  paragraphs: [
    { text: "WSI operates without a curfew, meaning flights can arrive and depart throughout the day and night. TipTop offers advance-booked transport for early-morning departures, late-night arrivals, families, groups and passengers requiring accessible vehicles." },
  ],
  bulletList: [],
};

const hubReplacements: Replacement[] = [
  {
    old: "Western Sydney International Airport Opens 25 October 2026",
    new: "Western Sydney International Airport Opens to Passengers 25 October 2026",
  },
  {
    old: "Western Sydney International (Nancy-Bird Walton) Airport is located at Badgerys Creek in Western Sydney, around 55km west of the Sydney CBD. Passenger operations are scheduled to begin on 25 October 2026.",
    new: "Western Sydney International (Nancy-Bird Walton) Airport (WSI) will begin passenger operations on Sunday, 25 October 2026. The passenger terminal is at 40 Nancy Drive, Luddenham NSW 2745, in the Badgerys Creek/Luddenham precinct around 55km west of the Sydney CBD.",
  },
  {
    old: "TipTop Maxi Sydney is preparing pre-booked transport services connecting Western Sydney Airport with destinations throughout Greater Sydney and surrounding areas, ready for the airport's opening.",
    new: "TipTop Maxi Sydney is accepting advance enquiries and pre-booked transfers for travel from opening day onwards, including private airport transfers, 7 and 11 seat vehicles, wheelchair-accessible transport and baby-seat bookings, connecting WSI with destinations throughout Greater Sydney.",
  },
  {
    old: "Western Sydney International Airport, also known as Nancy-Bird Walton Airport, is located at Badgerys Creek in Western Sydney, approximately 55km west of the Sydney CBD.",
    new: "Western Sydney International (Nancy-Bird Walton) Airport's passenger terminal is at 40 Nancy Drive, Luddenham NSW 2745, in the Badgerys Creek/Luddenham precinct approximately 55km west of the Sydney CBD.",
  },
  {
    old: "TipTop Maxi Sydney is preparing pre-booked transport for customers travelling after the airport opens. Availability will depend on travel date, vehicle requirements and pickup location.",
    new: "Yes. You can pre-book a transfer now for travel from 25 October 2026 onwards. Availability will depend on travel date, vehicle requirements and pickup location.",
  },
  {
    old: "We recommend booking as early as possible once bookings open for the airport, particularly for early operations, wheelchair-accessible vehicles, and larger groups.",
    new: "We recommend booking as early as possible, particularly for the opening weeks, early-morning or late-night flights, wheelchair-accessible vehicles and larger groups.",
  },
];

const hubExtraFaq = [
  {
    question: "Which airlines fly from Western Sydney Airport?",
    answer: "Jetstar launches Gold Coast, Melbourne and Brisbane services from opening day, Air New Zealand flies to Auckland from 26 October 2026, Singapore Airlines plans Singapore flights from November 2026 (subject to approvals), and Qantas starts Melbourne and Brisbane services from March 2027.",
  },
  {
    question: "Do you offer transfers for early-morning and late-night WSI flights?",
    answer: "Yes. WSI operates without a curfew, so we take advance bookings at any hour for early-morning departures and late-night arrivals.",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepReplace(value: any, pairs: Replacement[], counts: number[]): any {
  if (typeof value === "string") {
    let out = value;
    pairs.forEach((p, i) => {
      if (out.includes(p.old)) {
        counts[i] += out.split(p.old).length - 1;
        out = out.split(p.old).join(p.new);
      }
    });
    return out;
  }
  if (Array.isArray(value)) return value.map((v) => deepReplace(v, pairs, counts));
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = deepReplace(v, pairs, counts);
    return out;
  }
  return value;
}

const SKIP_KEYS = new Set(["id", "site", "createdAt", "updatedAt"]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function changedFields(before: any, after: any): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  for (const key of Object.keys(after)) {
    if (SKIP_KEYS.has(key)) continue;
    if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) data[key] = after[key];
  }
  return data;
}

async function run() {
  const live = process.env.LIVE === "true";
  const payload = await getPayload({ config });

  const site = (await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 })).docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found.`);

  const globalCounts = globalReplacements.map(() => 0);
  const wsiCounts = wsiReplacements.map(() => 0);
  const hubCounts = hubReplacements.map(() => 0);

  for (const collection of ["pages", "locations"] as const) {
    const { docs } = await payload.find({ collection, where: { site: { equals: site.id } }, depth: 0, limit: 1000, pagination: false });

    for (const doc of docs) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let patched: any = deepReplace(doc, globalReplacements, globalCounts);
      const isWsi = collection === "pages" && WSI_PAGE_SLUGS.has(doc.slug as string);
      if (isWsi) patched = deepReplace(patched, wsiReplacements, wsiCounts);

      if (collection === "pages" && doc.slug === "western-sydney-airport-transfers") {
        patched = deepReplace(patched, hubReplacements, hubCounts);
        const sections = patched.contentSections as { heading?: string }[];
        if (!sections.some((s) => s.heading === AIRLINES_SECTION.heading)) {
          // After the opening-date section, before "Planning a Future..." - routes are what a
          // WSI searcher wants first, then 24/7, then the booking checklist.
          const at = sections.findIndex((s) => s.heading?.startsWith("Western Sydney International Airport Opens")) + 1;
          if (at === 0) throw new Error("Hub opening-date section not found - aborting rather than guessing placement.");
          sections.splice(at, 0, AIRLINES_SECTION, TWENTY_FOUR_SEVEN_SECTION);
        }
        const faq = patched.faq as { question: string }[];
        for (const f of hubExtraFaq) if (!faq.some((x) => x.question === f.question)) faq.splice(1, 0, f);
      }

      const data = changedFields(doc, patched);
      if (Object.keys(data).length === 0) continue;
      console.log(`${live ? "WRITE" : "DRY RUN"} ${collection}/${doc.slug}: ${Object.keys(data).join(", ")}`);
      if (live) await payload.update({ collection, id: doc.id, data });
    }
  }

  const report = (label: string, pairs: Replacement[], counts: number[]) =>
    pairs.forEach((p, i) => console.log(`  [${label}] ${counts[i] === 0 ? "NOT FOUND" : `${counts[i]}x`}: "${p.old.slice(0, 70)}..."`));
  console.log("\nReplacement counts:");
  report("global", globalReplacements, globalCounts);
  report("wsi", wsiReplacements, wsiCounts);
  report("hub", hubReplacements, hubCounts);
  console.log(live ? "\nSaved." : "\nDRY RUN - pass LIVE=true to actually write.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
