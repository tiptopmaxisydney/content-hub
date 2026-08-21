/**
 * Replaces the two off-topic bullets on group-transport-sydney (interstate/long-distance
 * intent, which belongs on the dedicated long-distance page, not here) with two bullets
 * that strengthen group-transport semantics without keyword-stuffing. Agreed 2026-08-22.
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-group-bullets-2026-08-22.ts
 * (dry-run by default - pass LIVE=true to actually write)
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";
const SLUG = "group-transport-sydney";

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
    old: "Reliable interstate taxi services across NSW and beyond",
    new: "Pre-booked group transport for airport, cruise, corporate and event travel",
  },
  {
    old: "24/7 availability for long-distance travel",
    new: "One coordinated booking for groups travelling together",
  },
];

async function run() {
  const payload = await getPayload({ config });
  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const siteId = siteResult.docs[0].id as string;

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
    console.log(counts[i] === 0 ? `NOT FOUND: "${r.old}"` : `replaced ${counts[i]}x: "${r.old}"`);
  });

  const total = counts.reduce((a, b) => a + b, 0);
  if (total === 0) {
    console.warn("No changes, skipping write.");
    process.exit(0);
  }
  if (process.env.LIVE !== "true") {
    console.log(`DRY RUN - would write ${total} change(s), not saving.`);
    process.exit(0);
  }

  await payload.update({
    collection: "pages",
    id: doc.id,
    data: { contentSections: patched.contentSections },
  });
  console.log("Saved.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
