/**
 * Fourth-pass capacity/luggage wording fix, agreed 2026-08-22, across 7-seater-taxi-sydney,
 * 11-seater-taxi-sydney and large-taxi-sydney. The FAQ luggage overclaims on 7-seater and
 * large-taxi were already fixed in an earlier pass (verified still correct live), but this
 * covers the remaining body/bullet overclaims on those two pages, plus 11-seater-taxi-sydney
 * (untouched until now - the most overclaiming of the three), and adds a small text-only
 * "which vehicle do you need" comparison section to the 11-seater page.
 *
 * Note: the shared [...slug] page template renders contentSections bulletList items as plain
 * text (no links), so the comparison section can't include actual hyperlinks without changing
 * that shared template - it's plain guidance text only.
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-capacity-wording-2026-08-22.ts
 * (dry-run by default - pass LIVE=true to actually write)
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";

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

const comparisonSection = {
  heading: "Which Vehicle Do You Need?",
  paragraphs: [
    { text: "Use this as a general guide - always tell us your exact passenger and luggage numbers when booking so we can confirm the right vehicle." },
  ],
  bulletList: [
    { text: "Up to 7 passengers, moderate luggage: 7 Seater" },
    { text: "7 passengers with substantial luggage: consider our 11 Seater Van" },
    { text: "8 to 11 passengers: 11 Seater Van, subject to luggage" },
    { text: "Large group with substantial luggage: confirm requirements before booking" },
  ],
};

const pageFixes: { slug: string; replacements: Replacement[]; appendSection?: typeof comparisonSection }[] = [
  {
    slug: "7-seater-taxi-sydney",
    replacements: [
      {
        old: "Seating for up to 7 passengers plus luggage",
        new: "Seating for up to 7 passengers, subject to luggage requirements and vehicle configuration",
      },
    ],
  },
  {
    slug: "11-seater-taxi-sydney",
    replacements: [
      {
        old: "Need a big taxi for a group, huge luggage, or an airport transfer?",
        new: "Need a big taxi for a large group or an airport transfer?",
      },
      {
        old: "Our 11 seater vans are ideal for groups who want more space than a regular taxi but prefer a private, door-to-door service over public transport. With ample room for passengers and luggage, TipTop Maxi Sydney's maxi cabs are perfect for:",
        new: "Our 11 seater vans are ideal for groups who want more space than a regular taxi but prefer a private, door-to-door service over public transport. Vehicle suitability depends on both passenger and luggage requirements - maximum seating capacity does not mean maximum luggage capacity at the same time. TipTop Maxi Sydney's maxi cabs are perfect for:",
      },
      {
        old: "Luggage: Designed for large luggage and multiple suitcases",
        new: "Luggage: Larger vehicles provide additional luggage capacity, but available space depends on passenger numbers, suitcase sizes and other equipment",
      },
      {
        old: "Generous luggage capacity to accommodate large bags and equipment",
        new: "Luggage space depends on passenger numbers - tell us your requirements so we can confirm suitability",
      },
      {
        old: "TipTop Maxi Sydney provides spacious 11 seater minibuses designed to comfortably carry up to 11 passengers along with their luggage. These vehicles are ideal for group travel, airport transfers, corporate events, and special occasions in Sydney.",
        new: "TipTop Maxi Sydney provides larger vehicles suitable for groups of up to 11 passengers. Actual suitability depends on passenger numbers, luggage quantity and vehicle configuration. These vehicles are ideal for group travel, airport transfers, corporate events, and special occasions in Sydney.",
      },
      {
        old: "Yes, TipTop Maxi Sydney's 11 seater minibuses are perfect for Sydney Airport transfers, offering ample space for passengers and luggage to make your group travel comfortable and hassle-free.",
        new: "Yes, TipTop Maxi Sydney's 11 seater minibuses are well suited to Sydney Airport transfers for larger groups. Let us know your passenger and luggage requirements when booking so we can confirm the right vehicle.",
      },
      {
        old: "Our minibuses are designed with generous luggage capacity to accommodate large bags and equipment for the whole group.",
        new: "Luggage capacity varies according to passenger numbers, suitcase sizes, prams and other equipment. Tell us how many passengers and bags you're travelling with so we can recommend the appropriate vehicle.",
      },
    ],
    appendSection: comparisonSection,
  },
  {
    slug: "large-taxi-sydney",
    replacements: [
      {
        old: "nobody gets left behind, and nothing gets left behind either. Whether it's a family with prams and suitcases or a group heading to the same event, we size the vehicle to the job:",
        new: "we match the vehicle to your passenger, luggage and trip requirements before booking. Whether it's a family with prams and suitcases or a group heading to the same event, we size the vehicle to the job:",
      },
      {
        old: "Seating for up to 11 passengers in one vehicle",
        new: "Vehicle options for groups of up to 11 passengers, subject to luggage requirements and vehicle configuration",
      },
      {
        old: "11 Seater Van - built for bigger groups, sports teams and airport runs with heavy bags",
        new: "11 Seater Van - suitable for larger groups, with luggage capacity confirmed according to passenger and baggage requirements",
      },
    ],
  },
];

async function run() {
  const payload = await getPayload({ config });

  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found.`);
  const siteId = site.id as string;

  for (const page of pageFixes) {
    const existing = await payload.find({
      collection: "pages",
      where: { and: [{ site: { equals: siteId } }, { slug: { equals: page.slug } }] },
      limit: 1,
    });
    const doc = existing.docs[0];
    if (!doc) {
      console.warn(`SKIP (page not found): ${page.slug}`);
      continue;
    }

    const counts = page.replacements.map(() => 0);
    const patched = deepReplace(doc, page.replacements, counts);

    page.replacements.forEach((r, i) => {
      if (counts[i] === 0) {
        console.warn(`  [${page.slug}] NOT FOUND (0 matches): "${r.old.slice(0, 60)}..."`);
      } else {
        console.log(`  [${page.slug}] replaced ${counts[i]}x: "${r.old.slice(0, 50)}..."`);
      }
    });

    let contentSections = patched.contentSections;
    if (page.appendSection) {
      contentSections = [...contentSections, page.appendSection];
      console.log(`  [${page.slug}] appending new section: "${page.appendSection.heading}"`);
    }

    const totalMatches = counts.reduce((a, b) => a + b, 0);
    if (totalMatches === 0 && !page.appendSection) {
      console.warn(`  [${page.slug}] no changes made, skipping write.`);
      continue;
    }

    if (process.env.LIVE !== "true") {
      console.log(`  [${page.slug}] DRY RUN - would write ${totalMatches} change(s)${page.appendSection ? " + 1 new section" : ""}, not saving.\n`);
      continue;
    }

    await payload.update({
      collection: "pages",
      id: doc.id,
      data: {
        heroDescription: patched.heroDescription,
        contentSections,
        faq: patched.faq,
      },
    });
    console.log(`  [${page.slug}] saved.\n`);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
