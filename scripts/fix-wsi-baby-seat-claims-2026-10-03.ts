/**
 * transport-solutions "western-sydney-airport-baby-seat-taxi" page, 2026-10-03 - the page
 * babyseattaxisydney.com.au's WSI URL redirects to (baby-seat lib/redirects.ts). Runs after
 * fix-wsi-launch-content-2026-10-03.ts (opening date / fees / pickup zone) and only touches what
 * that pass doesn't, per the Baby Seat Taxi Sydney SEO audit:
 *
 * - Booster seats are not provided: removed from meta, hero and FAQs.
 * - Installation claims we can't document for every booking ("fitted and checked", "our drivers
 *   install ... correctly") replaced with: child restraints are requested when booking and prepared
 *   according to the confirmed journey requirements.
 * - Until passenger services commence on 25 October 2026, nothing reads as if WSI pickups already
 *   operate: temporary H1 and hero, and the "driver waits at the designated pickup zone" line now
 *   says the pickup point is confirmed with the booking. Revisit the H1/hero after 25 October.
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-wsi-baby-seat-claims-2026-10-03.ts
 * (dry-run by default - pass LIVE=true to actually write; a backup of every original field is
 * written to scripts/backups/ first, restorable with --restore scripts/backups/<file>.json)
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";
const SLUG = "western-sydney-airport-baby-seat-taxi";

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

const replacements: Replacement[] = [
  {
    old: "One less thing to pack, carry or wrestle with after a flight.",
    new: "Western Sydney Airport Baby Seat Transfers – Pre-Book for Travel From 25 October 2026",
  },
  {
    old: "Baby capsules, toddler seats and boosters fitted before you arrive. Tell us your child's age when you book the right seat will already be fitted when we pull up.",
    new: "Pre-book a Western Sydney Airport family transfer for travel from 25 October 2026, with a baby capsule or child seat arranged for each child. Tell us each child's age and approximate size when you book.",
  },
  {
    old: "Tell us your child's age when you book and the right seat will already be fitted when we pull up.",
    new: "Passenger services at Western Sydney International Airport commence on 25 October 2026, and advance family-transfer bookings are available for travel from the commencement of passenger operations. Tell us each child's age and approximate size when you book, and a baby capsule or child seat is arranged for your trip.",
  },
  {
    old: "a rear-facing capsule for infants, a forward-facing harnessed seat once they're steadier, then a booster as they grow into adult belts properly.",
    new: "a rear-facing restraint for babies, then a forward-facing seat with an inbuilt harness as they grow. We arrange baby capsules and child seats - we don't provide booster seats, so bring your own if your child uses one.",
  },
  {
    old: "The seat's fitted and checked before we knock on your door",
    new: "The child restraint you request is prepared according to your confirmed booking",
  },
  {
    old: "We watch the flight, not the clock: Your driver's timing is set against your actual flight number",
    new: "Your flight number on the booking: Your driver's timing is planned around your flight number",
  },
  {
    old: "Terminal pickup point: Driver waits at the designated pickup zone, seat already fitted.",
    new: "Pickup point confirmed before you travel: WSI pickup arrangements for pre-booked transfers are still being finalised, so your exact pickup point is confirmed with your booking.",
  },
  {
    old: "and we'll have the right capsule, seat or booster fitted before we arrive.",
    new: "and we'll arrange a baby capsule or child seat for your trip. We don't provide booster seats.",
  },
  {
    old: "Age is the starting point, roughly a rear-facing capsule under six months, a forward-facing harnessed seat from six months to around four years, then a booster from about four to seven. Size matters too.",
    new: "Age is the starting point - roughly a rear-facing restraint for babies and a forward-facing seat with an inbuilt harness for toddlers and young children - but size matters too, so we ask for both. We arrange baby capsules and child seats; we don't provide booster seats.",
  },
  { old: "Is the seat actually fitted properly, or just placed in the car?", new: "How is the child seat prepared?" },
  {
    old: "Fitted properly. Our drivers install capsules, seats and boosters correctly before your child gets in, it's not adjusted on the go once you're already moving.",
    new: `${PREPARED} Tell us each child's age and approximate size, or use your own approved restraint if you prefer.`,
  },
  {
    old: "Yes. Tell us each child's age when you book and we'll bring a vehicle fitted with the right seat for every one of them.",
    new: "Yes. Tell us each child's age and approximate size when you book and a restraint is arranged for each child, subject to vehicle configuration and availability.",
  },
];

const RISKY = /booster|fitted|install|certified|AS\/?NZS|exceed|driver waits|we watch the flight/i;

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

const FIELDS = ["metaTitle", "metaDescription", "h1", "heroDescription", "contentSections", "faq", "features", "intro", "introItems"] as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pick = (doc: any) => Object.fromEntries(FIELDS.map((f) => [f, doc[f]]));

async function run() {
  const restoreIdx = process.argv.indexOf("--restore");
  const payload = await getPayload({ config });

  if (restoreIdx !== -1) {
    const backup = JSON.parse(readFileSync(process.argv[restoreIdx + 1], "utf8")) as { id: string; original: Record<string, unknown> };
    await payload.update({ collection: "pages", id: backup.id, data: backup.original });
    console.log(`restored ${SLUG}`);
    process.exit(0);
  }

  const result = await payload.find({
    collection: "pages",
    where: { and: [{ slug: { equals: SLUG } }, { "site.key": { equals: SITE_KEY } }] },
    limit: 1,
    depth: 0,
  });
  const doc = result.docs[0];
  if (!doc) throw new Error(`Page "${SLUG}" not found for site "${SITE_KEY}".`);

  const counts = replacements.map(() => 0);
  const patched = deepReplace(pick(doc), replacements, counts);
  console.log(`[${SLUG}] ${counts.reduce((a, b) => a + b, 0)} replacement(s)`);
  replacements.forEach((r, i) => {
    if (counts[i] === 0) console.warn(`  NO MATCH (text drifted - check manually): "${r.old.slice(0, 90)}..."`);
  });
  const residual: string[] = [];
  findRisky(patched, "", residual);
  residual.forEach((r) => console.warn(`  REVIEW: ${r}`));

  if (process.env.LIVE !== "true") {
    console.log("\nDRY RUN - nothing saved.");
    process.exit(0);
  }

  mkdirSync("scripts/backups", { recursive: true });
  const backupPath = `scripts/backups/fix-wsi-baby-seat-claims-${Date.now()}.json`;
  writeFileSync(backupPath, JSON.stringify({ id: doc.id, original: pick(doc) }, null, 1));
  console.log(`Backup of original field values: ${backupPath}`);

  await payload.update({ collection: "pages", id: doc.id, data: patched });
  console.log(`saved ${SLUG}`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
