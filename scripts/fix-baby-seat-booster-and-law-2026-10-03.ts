/**
 * Baby Seat Taxi Sydney P0 accuracy pass, 2026-10-03 (follows fix-baby-seat-claims-2026-10-02.ts).
 *
 * 1. Booster seats are NOT a service we provide - removes every place a page offers, arranges or
 *    fits booster seats (meta, hero, features, FAQs, blogs). The booster-seat-taxi-sydney page itself
 *    is redirected to /child-seat-taxi-sydney/ by the site (lib/redirects.ts), so it isn't edited.
 * 2. Restates the NSW rules from the Point to Point Transport Commissioner's child restraint page
 *    (pointtopoint.nsw.gov.au/child-restraints, checked October 2026): under 12 months a restraint
 *    is required in a taxi; over 12 months a seatbelt is allowed but a restraint is strongly
 *    recommended; hire and rideshare follow the private-vehicle rules.
 * 3. Removes installation claims we can't document for every booking ("professionally fitted",
 *    "installed and checked before every journey", drivers who "know how to install") in favour
 *    of: child restraints are requested when booking and prepared according to the confirmed
 *    journey requirements.
 * 4. Western Sydney Airport mentions on suburb pages are dated to passenger services commencing
 *    25 October 2026.
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-baby-seat-booster-and-law-2026-10-03.ts
 * (dry-run by default - pass LIVE=true to actually write; a backup of every original field is
 * written to scripts/backups/ first, restorable with --restore scripts/backups/<file>.json)
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "baby-seat";

// Redirected away by the site, so their content is never shown - left untouched.
const SKIP_SLUGS = ["booster-seat-taxi-sydney", "baby-seat-taxi-western-sydney-airport"];

type Replacement = { old: string; new: string };

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

const PREPARED =
  "Child restraints are requested when booking and prepared according to the confirmed journey requirements.";
const NO_BOOSTER = "We do not provide booster seats - if your child uses a booster seat, please bring your own approved booster.";
const NSW_TAXI_RULES =
  "In a NSW taxi, children under 12 months must be secured in a suitable approved child restraint - rear-facing up to 6 months, and rear-facing or forward-facing with an inbuilt harness from 6 to 12 months. Children over 12 months may travel wearing a properly fastened and adjusted seatbelt, although a suitable approved child restraint is strongly recommended. Hire and rideshare vehicles follow the private-vehicle rules instead - see our NSW taxi baby seat laws guide.";

const replacements: Replacement[] = [
  // --- Booster seats offered on location / service pages
  {
    old: "Baby Seat Taxi Bondi - baby capsules, child seats and booster seats arranged at booking for Bondi Beach, Bondi Junction and the Eastern Suburbs.",
    new: "Baby Seat Taxi Bondi - baby capsules and child seats arranged at booking for Bondi Beach, Bondi Junction and the Eastern Suburbs.",
  },
  {
    old: "Pre-booked family transport across Bondi and the Eastern Suburbs, with baby capsules, child restraints and booster seats arranged for your booking.",
    new: "Pre-booked family transport across Bondi and the Eastern Suburbs, with baby capsules and child seats arranged for your booking.",
  },
  {
    old: "Baby Seat Taxi Chatswood - baby capsules, child seats and booster seats arranged at booking, with North Shore coverage from Chatswood.",
    new: "Baby Seat Taxi Chatswood - baby capsules and child seats arranged at booking, with North Shore coverage from Chatswood.",
  },
  {
    old: "Pre-booked family transport across the North Shore, with baby capsules, child restraints and booster seats arranged for your booking.",
    new: "Pre-booked family transport across the North Shore, with baby capsules and child seats arranged for your booking.",
  },
  {
    old: "Baby Seat Taxi Campbelltown - baby capsules, child seats and booster seats arranged at booking, with metro-wide coverage from Campbelltown.",
    new: "Baby Seat Taxi Campbelltown - baby capsules and child seats arranged at booking, with metro-wide coverage from Campbelltown.",
  },
  {
    old: "Pre-booked family transport from Campbelltown, with baby capsules, child restraints and booster seats arranged for your booking.",
    new: "Pre-booked family transport from Campbelltown, with baby capsules and child seats arranged for your booking.",
  },
  { old: "Toddler / Child Restraints & Boosters", new: "Toddler / Child Restraints" },
  {
    old: "Child restraints arranged according to your child's age and size, plus booster seats for older children where appropriate.",
    new: "Child restraints arranged according to your child's age and size, including forward-facing restraints with an inbuilt harness.",
  },
  {
    old: "We arrange rear-facing restraints for babies, child restraints for toddlers and booster seats for older children, based on each child's age and approximate size.",
    new: "We arrange rear-facing restraints for babies and child seats for toddlers and young children, based on each child's age and approximate size.",
  },
  {
    old: "Stress-free Sydney Airport transfers for families travelling with children, with baby capsules, child seats and booster seats arranged at booking.",
    new: "Stress-free Sydney Airport transfers for families travelling with children, with baby capsules and child seats arranged at booking.",
  },
  {
    old: "Baby capsules, child seats and booster seats are arranged at booking, with each child's restraint requirements recorded against your trip.",
    new: "Baby capsules and child seats are arranged at booking, with each child's restraint requirements recorded against your trip.",
  },
  { old: "Baby Car Seat Taxi Sydney | Capsules, Child Seats & Boosters", new: "Baby Car Seat Taxi Sydney | Baby Capsules & Child Seats" },
  {
    old: "with baby capsules, child car seats and boosters arranged at booking.",
    new: "with baby capsules and child car seats arranged at booking.",
  },
  {
    old: "baby capsules, child car seats and boosters can be arranged for your booking.",
    new: "baby capsules and child car seats can be arranged for your booking.",
  },
  {
    old: "In NSW taxis, children up to 6 months must use a rear-facing child restraint, children aged 6 to 12 months must use a rear-facing restraint or a forward-facing restraint with an inbuilt harness, and children over 12 months must use a booster seat or a properly adjusted and fastened seatbelt. Booked hire and rideshare vehicles follow different rules - see our NSW taxi baby seat laws guide.",
    new: NSW_TAXI_RULES,
  },
  {
    old: "seated in their capsule, child seat or booster before departure.",
    new: "seated in their capsule or child seat before departure.",
  },
  {
    old: "Taxi With Baby Seat Sydney arranges baby capsules, child restraints and booster seats at booking for family transport throughout Sydney, available 24/7.",
    new: "Taxi With Baby Seat Sydney arranges baby capsules and child seats at booking for family transport throughout Sydney, available 24/7.",
  },
  {
    old: "we arrange baby capsules, child restraints and booster seats for journeys throughout Sydney.",
    new: "we arrange baby capsules and child seats for journeys throughout Sydney.",
  },
  {
    old: "Pre-book a transfer with baby capsules, child restraints and booster seats arranged for each child, and a vehicle sized for your luggage and pram.",
    new: "Pre-book a transfer with baby capsules and child seats arranged for each child, and a vehicle sized for your luggage and pram.",
  },
  {
    old: "Request a restraint for each child - baby, toddler or booster.",
    new: "Request a restraint for each child - a baby capsule or a child seat.",
  },

  // --- Installation claims
  {
    old: "Yes, we do this run regularly, with the correct seats fitted and return pickups available if you book both legs at once.",
    new: `Yes. ${PREPARED} You can book the return leg at the same time.`,
  },
  {
    old: "which is why we focus on reliable service, clean vehicles, and properly fitted child restraints.",
    new: "which is why we focus on reliable service, clean vehicles, and child restraints prepared according to your confirmed journey requirements.",
  },
  { old: "Are your child seats professionally fitted?", new: "How are child restraints arranged?" },
  {
    old: "Yes. All child restraints are installed and checked before your journey.",
    new: `${PREPARED} Tell us each child's age and approximate size when booking.`,
  },
  {
    old: "with approved baby capsules fitted before every journey.",
    new: "with an approved baby capsule arranged at booking.",
  },
  {
    old: "with an approved baby capsule fitted correctly before every journey.",
    new: "with an approved baby capsule arranged for the journey.",
  },
  {
    old: "who require an approved baby capsule fitted correctly before every journey.",
    new: "who need an approved baby capsule arranged for their journey.",
  },
  { old: "Professionally Fitted Baby Capsules", new: "Baby Capsules Arranged at Booking" },

  // --- Western Sydney Airport: passenger services commence 25 October 2026
  {
    old: "Blacktown to Sydney Airport and Western Sydney Airport, with return pickups available",
    new: "Blacktown to Sydney Airport, and to Western Sydney International Airport for travel from 25 October 2026 - book both legs together",
  },
];

const blogReplacements: Replacement[] = [
  // "do-taxis-need-baby-seats-in-sydney-nsw-laws-explained"
  {
    old: "Under NSW road rules, children must normally use an approved child restraint suitable for their age and size.",
    new: "In private vehicles - and in hire and rideshare vehicles, which follow the same rules - children under 7 must use an approved child restraint suitable for their age and size.",
  },
  {
    old: "In NSW taxis, children up to 6 months must use a rear-facing child restraint, and children aged 6 to 12 months must use a rear-facing restraint or a forward-facing restraint with an inbuilt harness. Children over 12 months must use a booster seat or wear a properly adjusted and fastened seatbelt. Booked hire and rideshare vehicles follow different rules.",
    new: "In a NSW taxi, children under 12 months must be secured in a suitable approved child restraint - rear-facing up to 6 months, and rear-facing or forward-facing with an inbuilt harness from 6 to 12 months. The taxi driver must not start the trip if neither the driver nor the adult passenger has one. Children over 12 months may travel wearing a properly fastened and adjusted seatbelt, although a suitable approved child restraint is strongly recommended. Hire and rideshare vehicles follow the private-vehicle rules above, not the taxi rules.",
  },
  {
    old: "For this reason, many Sydney families now choose professional taxi services that provide baby capsules, rear-facing baby seats, forward-facing child seats and booster seats.",
    new: "For this reason, many Sydney families pre-book a taxi with a baby capsule or child seat arranged for the journey.",
  },
  {
    old: "Professional baby seat taxi services may offer a baby capsule (rear-facing), suitable for newborns and infants; a rear-facing baby seat, recommended for babies under 6 months and younger toddlers; a forward-facing child seat, suitable for toddlers and younger children; and a booster seat, ideal for older children who have outgrown harness restraints.",
    new: `Baby Seat Taxi Sydney arranges baby capsules (rear-facing, for newborns and babies) and child seats (including forward-facing seats with an inbuilt harness for toddlers and young children). ${NO_BOOSTER}`,
  },
  {
    old: "Correct seat installation: experienced drivers know how to properly install and secure approved child restraints.",
    new: `Restraint arranged in advance: ${PREPARED.charAt(0).toLowerCase()}${PREPARED.slice(1)}`,
  },
  { old: "A pre-installed baby seat removes extra stress.", new: "A child restraint arranged in advance removes extra stress." },
  {
    old: "Using a professionally installed child restraint provides better protection",
    new: "Using a suitable approved child restraint provides better protection",
  },
  // "benefits-of-booking-a-taxi-with-a-baby-seat"
  { old: "booking a taxi with a professionally fitted baby seat in Sydney", new: "booking a taxi with a baby seat arranged in advance in Sydney" },
  {
    old: "Children require different restraint types as they grow. Baby seat taxi services often provide baby capsules (suitable for newborns and young infants), rear-facing baby seats (ideal for younger children requiring additional support), forward-facing child seats (designed for growing toddlers), and booster seats (suitable for older children who have outgrown traditional child restraints).",
    new: `Children require different restraint types as they grow - from rear-facing baby capsules for newborns and young infants to forward-facing child seats for toddlers. Baby Seat Taxi Sydney arranges baby capsules and child seats. ${NO_BOOSTER}`,
  },
  {
    old: "Professional baby seat taxi services understand these requirements and provide suitable seating options for infants, toddlers, and older children.",
    new: "When you book, tell us each child's age and approximate size so a suitable restraint can be arranged for babies and young children.",
  },
  { old: "5. Professional Installation of Child Seats", new: "5. Child Restraints Arranged in Advance" },
  { old: "Professional baby seat taxi services typically ensure that seats are fitted correctly before each journey.", new: PREPARED },
  {
    old: "the correct restraint is available, the seat is professionally installed, and the vehicle is ready when needed",
    new: "the requested restraint has been arranged, and the vehicle is ready when needed",
  },
  {
    old: "We provide baby capsules, child seats, booster seats, airport transfers, family-friendly transport, professional drivers, and reliable pre-booked services across Sydney.",
    new: "We arrange baby capsules and child seats, airport transfers, family-friendly transport and reliable pre-booked services across Sydney.",
  },
];

// Anything still matching after the pass is printed for manual review.
const RISKY =
  /booster|professionally (fitted|installed)|install(ed|s)? (and|&) check|fitted (correctly )?before|certified|AS\/?NZS|exceed|Working with Children|WWCC|First Aid|CPR|sanitis|\d+\s*minutes|over 12 months must use a booster/i;

function findRisky(value: unknown, path: string, out: string[]) {
  if (typeof value === "string") {
    if (RISKY.test(value)) out.push(`${path}: ${value.slice(0, 160)}`);
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => findRisky(v, `${path}[${i}]`, out));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (["id", "site", "image", "createdAt", "updatedAt"].includes(k)) continue;
      findRisky(v, path ? `${path}.${k}` : k, out);
    }
  }
}

type PlannedUpdate = {
  collection: "pages" | "blog-posts";
  id: string;
  slug: string;
  original: Record<string, unknown>;
  data: Record<string, unknown>;
};

const PAGE_FIELDS = [
  "metaTitle",
  "metaDescription",
  "h1",
  "heroDescription",
  "intro",
  "introItemsIntro",
  "introItems",
  "features",
  "contentSections",
  "faq",
] as const;
const BLOG_FIELDS = ["title", "metaTitle", "metaDescription", "excerpt", "sections"] as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pick = (doc: any, fields: readonly string[]) => Object.fromEntries(fields.map((f) => [f, doc[f]]));

async function run() {
  // Restore mode: node ... scripts/fix-baby-seat-booster-and-law-2026-10-03.ts --restore scripts/backups/<file>.json
  const restoreIdx = process.argv.indexOf("--restore");

  const payload = await getPayload({ config });

  if (restoreIdx !== -1) {
    const backup = JSON.parse(readFileSync(process.argv[restoreIdx + 1], "utf8")) as PlannedUpdate[];
    for (const entry of backup) {
      await payload.update({ collection: entry.collection, id: entry.id, data: entry.original });
      console.log(`restored [${entry.collection}] ${entry.slug}`);
    }
    process.exit(0);
  }

  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found.`);

  const planned: PlannedUpdate[] = [];

  const collections = [
    { collection: "pages" as const, pairs: replacements, fields: PAGE_FIELDS },
    { collection: "blog-posts" as const, pairs: blogReplacements, fields: BLOG_FIELDS },
  ];
  const totals = new Map<Replacement, number>();

  for (const { collection, pairs, fields } of collections) {
    const result = await payload.find({ collection, where: { site: { equals: site.id } }, limit: 500, depth: 0 });
    for (const doc of result.docs) {
      if (SKIP_SLUGS.includes(doc.slug as string)) continue;
      const counts = pairs.map(() => 0);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const patched: any = deepReplace(doc, pairs, counts);
      pairs.forEach((p, i) => totals.set(p, (totals.get(p) ?? 0) + counts[i]));

      const changes = counts.reduce((a, b) => a + b, 0);
      const residual: string[] = [];
      findRisky(pick(patched, fields), "", residual);

      if (changes === 0 && residual.length === 0) continue;
      console.log(`\n[${collection}: ${doc.slug}] ${changes} replacement(s)`);
      residual.forEach((r) => console.warn(`  REVIEW: ${r}`));
      if (changes === 0) continue;

      planned.push({ collection, id: doc.id as string, slug: doc.slug as string, original: pick(doc, fields), data: pick(patched, fields) });
    }
  }

  const unmatched = [...replacements, ...blogReplacements].filter((r) => !totals.get(r));
  if (unmatched.length) {
    console.log("\nReplacements with 0 live matches (live text has drifted - check manually):");
    unmatched.forEach((r) => console.warn(`  "${r.old.slice(0, 90)}..."`));
  }

  if (process.env.LIVE !== "true") {
    console.log(`\nDRY RUN - ${planned.length} document(s) would be updated, nothing saved.`);
    process.exit(0);
  }

  mkdirSync("scripts/backups", { recursive: true });
  const backupPath = `scripts/backups/fix-baby-seat-booster-and-law-${Date.now()}.json`;
  writeFileSync(backupPath, JSON.stringify(planned, null, 1));
  console.log(`\nBackup of original field values: ${backupPath}`);

  for (const entry of planned) {
    await payload.update({ collection: entry.collection, id: entry.id, data: entry.data });
    console.log(`saved [${entry.collection}] ${entry.slug}`);
  }

  console.log("\nDone.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
