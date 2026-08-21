/**
 * Third-pass fix for western-sydney-airport-to-sydney-cbd, agreed 2026-08-22: the
 * meet-and-greet/name-board phrases were fixed in the second pass, but the H1, hero
 * description, one content-section paragraph and one FAQ answer still read as though
 * WSI is already operating ("before you land", "After 15 hours in the air") or
 * overclaimed luggage capacity ("with full luggage").
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-wsi-cbd-hero-2026-08-22.ts
 * (dry-run by default - pass LIVE=true to actually write)
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";
const SLUG = "western-sydney-airport-to-sydney-cbd";

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

const replacements: Replacement[] = [
  {
    old: "WSI Airport to Sydney CBD, Fixed Price, Door to Door.",
    new: "Western Sydney Airport to Sydney CBD Transfers",
  },
  {
    old: "We'll have a clean, comfortable vehicle at your terminal, driver included, fare already agreed before you land.",
    new: "Planning travel from Western Sydney International Airport to Sydney CBD after the airport opens on 25 October 2026? Pre-book a fixed-price, door-to-door transfer with vehicle options for individuals, families and groups.",
  },
  {
    old: "After 15 hours in the air, the last thing you want is to navigate unfamiliar transport options. We make the arrival side of this route simple.",
    new: "Once Western Sydney Airport opens, the last thing you'll want after a long flight is to navigate unfamiliar transport options. We're preparing to make the arrival side of this route simple.",
  },
  {
    old: "Yes. Our Maxi Taxi seats up to 11 passengers with full luggage. For larger groups we co-ordinate multiple vehicles.",
    new: "Our larger vehicles can accommodate groups of up to 11 passengers, subject to luggage quantity and vehicle configuration. Please provide passenger and luggage details when booking so we can recommend the appropriate vehicle. For larger groups we co-ordinate multiple vehicles.",
  },
];

async function run() {
  const payload = await getPayload({ config });

  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found.`);
  const siteId = site.id as string;

  const existing = await payload.find({
    collection: "pages",
    where: { and: [{ site: { equals: siteId } }, { slug: { equals: SLUG } }] },
    limit: 1,
  });
  const doc = existing.docs[0];
  if (!doc) throw new Error(`Page with slug "${SLUG}" not found.`);

  const counts = replacements.map(() => 0);
  const patched = deepReplace(doc, replacements, counts);

  replacements.forEach((r, i) => {
    if (counts[i] === 0) {
      console.warn(`NOT FOUND (0 matches): "${r.old.slice(0, 60)}..."`);
    } else {
      console.log(`replaced ${counts[i]}x: "${r.old.slice(0, 50)}..."`);
    }
  });

  const totalMatches = counts.reduce((a, b) => a + b, 0);
  if (totalMatches === 0) {
    console.warn("No changes made, skipping write.");
    process.exit(0);
  }

  if (process.env.LIVE !== "true") {
    console.log(`\nDRY RUN - would write ${totalMatches} change(s), not saving.`);
    process.exit(0);
  }

  await payload.update({
    collection: "pages",
    id: doc.id,
    data: {
      h1: patched.h1,
      heroDescription: patched.heroDescription,
      contentSections: patched.contentSections,
      faq: patched.faq,
    },
  });
  console.log("\nSaved.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
