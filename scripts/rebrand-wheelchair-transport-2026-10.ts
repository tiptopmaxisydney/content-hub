/**
 * Wheelchair site rebrand: "Wheelchair Taxi Sydney" -> registered business name
 * "Accessible Wheelchair Transport Sydney", and "taxi" -> "transport" terminology in
 * customer-facing copy (H1, navLabel/breadcrumb, eyebrow, hero, body, FAQ answers,
 * related-link anchor text).
 *
 * Deliberately NOT changed (SEO-specific areas, per the rebrand brief):
 *  - slug / URLs, metaTitle, metaDescription, targetKeyword
 *  - FAQ questions (searcher phrasing such as "book a wheelchair taxi"), except the brand name
 *  - the NSW "Taxi Transport Subsidy Scheme" name and other literal taxi references
 *  - the keyword landing pages in SEO_LANDING_PAGES below (not in the site navigation)
 *
 * Run with:
 *   npm run rebrand:wheelchair-transport              (dry run - prints every change)
 *   npm run rebrand:wheelchair-transport -- --apply   (writes; backs up first)
 *   npm run rebrand:wheelchair-transport -- --restore scripts/backups/<file>.json
 * Safe to re-run - the replacements are idempotent.
 */
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { getPayload } from "payload";
import config from "../src/payload.config";

const SEO_LANDING_PAGES = new Set([
  "wheelchair-sydney-taxi-fare-estimator",
  "wheelchair-accessible-taxi-in-sydney",
  "silver-service-wheelchair-taxi-sydney",
]);

/** Fields never rewritten, wherever they appear in the doc tree. */
const PROTECTED_KEYS = new Set([
  "id", "site", "slug", "href", "targetPage", "targetLocation", "image", "pageType",
  "seoStatus", "indexOverride", "createdAt", "updatedAt",
  "metaTitle", "metaDescription", "targetKeyword",
]);

const BRAND: [RegExp, string][] = [
  [/Wheelchair Taxi Sydney Airport/g, "Sydney Airport Wheelchair Transport"],
  [/Wheelchair Taxi Sydney CBD/g, "Wheelchair Transport Sydney CBD"],
  [/Wheelchair Taxi Sydney/g, "Accessible Wheelchair Transport Sydney"],
];

// Order matters: specific phrases before the generic "Wheelchair Taxi <Suburb>" rule.
const PHRASES: [RegExp, string][] = [
  ...BRAND,
  [/Sydney Domestic Airport Wheelchair Taxi/g, "Sydney Domestic Airport Accessible Transport"],
  [/Western Sydney Airport Wheelchair Taxi/g, "Western Sydney Airport Accessible Transport"],
  [/Wheelchair Taxi International Airport/g, "International Airport Accessible Transport"],
  [/Wheelchair Taxi for Electric Wheelchairs/g, "Electric Wheelchair Transport"],
  [/Wheelchair Taxi for Manual Wheelchairs/g, "Manual Wheelchair Transport"],
  [/Wheelchair Taxi for Mobility Scooters/g, "Mobility Scooter Transport"],
  [/Wheelchair Taxi Services/g, "Wheelchair Transport Services"],
  [/Wheelchair Taxi Booking Online/g, "Book Accessible Transport Online"],
  [/Wheelchair Taxi Service Near Me/g, "Accessible Transport Near Me"],
  [/Wheelchair Taxi Number/g, "Contact Our Booking Team"],
  [/Advance Wheelchair Taxi Booking/g, "Advance Transport Booking"],
  [/Same-Day Wheelchair Taxi/g, "Same-Day Accessible Transport"],
  [/Private Wheelchair Taxi Service/g, "Private Wheelchair Transport"],
  [/Disabled Taxi Service/g, "Accessible Transport for People with Disability"],
  [/TTSS Taxi Sydney/g, "TTSS Information"],
  [/Wheelchair Accessible Taxi(?! In Sydney)/g, "Wheelchair Accessible Transport"],
  [/Wheelchair Taxi (?=[A-Z])/g, "Wheelchair Transport "],
  [/Wheelchair accessible taxi transport/g, "Wheelchair accessible transport"],
  [/wheelchair taxi transport/g, "wheelchair accessible transport"],
  [/Booking a wheelchair accessible taxi means/g, "Booking wheelchair accessible transport means"],
  [/Request a wheelchair accessible taxi online/g, "Request wheelchair accessible transport online"],
  [/(A|a) wheelchair accessible taxi service/g, "$1 wheelchair accessible transport service"],
  [/wheelchair accessible taxi service/g, "wheelchair accessible transport service"],
  [/(An|an) accessible taxi service/g, "$1 accessible transport service"],
  [/accessible taxi service/g, "accessible transport service"],
  [/Accessible taxi coverage/g, "Accessible transport coverage"],
  [/disabled taxi service/g, "accessible transport service"],
  [/private wheelchair taxi service/g, "private wheelchair transport service"],
];

/** Hand-written copy where a phrase swap would read badly, or the brief specifies exact wording. */
const OVERRIDES: Record<string, (doc: Record<string, any>) => Record<string, unknown>> = {
  "wheelchair-accessible-taxi": (doc) => ({
    h1: "Wheelchair Accessible Transport Sydney",
    heroDescription: "Wheelchair accessible transport built around the needs of Sydney passengers with mobility equipment.",
    intro: withText(doc.intro, {
      0: "Genuinely wheelchair accessible transport is about more than a ramp; it requires the right vehicle, trained drivers and a booking process that accounts for each passenger's equipment and needs. We aim to provide that combination across every trip we operate.",
    }, ["Customers searching for a wheelchair accessible taxi in Sydney can book suitable accessible transport through our team."]),
  }),
  "disabled-taxi-service": (doc) => ({
    h1: "Accessible Transport for People with Disability",
    heroDescription: "Accessible transport supporting Sydney passengers with a range of mobility and accessibility needs.",
    intro: withText(doc.intro, {
      0: "Accessible Wheelchair Transport Sydney supports passengers with a wide range of mobility and accessibility requirements, including wheelchair users, mobility scooter users and passengers requiring additional boarding assistance.",
    }),
  }),
  "ttss-taxi-sydney": () => ({ h1: "TTSS Information for Sydney Passengers" }),
};

/** Replaces intro texts by index; appends `extra` paragraphs unless already present (idempotent). */
function withText(items: { text: string }[] = [], byIndex: Record<number, string>, extra: string[] = []) {
  const next = items.map((item, i) => (byIndex[i] ? { ...item, text: byIndex[i] } : item));
  for (const text of extra) if (!next.some((item) => item.text === text)) next.push({ text } as { text: string });
  return next;
}

function rewrite(value: string, rules: [RegExp, string][]): string {
  return rules.reduce((s, [rx, rep]) => s.replace(rx, rep), value);
}

/** Recursively rewrites strings, honouring PROTECTED_KEYS; FAQ questions only get the brand rule. */
function transform(value: unknown, key: string, parentKey: string): unknown {
  if (PROTECTED_KEYS.has(key)) return value;
  if (typeof value === "string") return rewrite(value, parentKey === "faq" && key === "question" ? BRAND : PHRASES);
  if (Array.isArray(value)) return value.map((v) => transform(v, key, parentKey));
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = transform(v, k, key);
    return out;
  }
  return value;
}

function diffStrings(before: unknown, after: unknown, path: string, out: string[]) {
  if (typeof before === "string" || typeof after === "string") {
    if (before !== after) out.push(`  ${path}\n    - ${before ?? "(none)"}\n    + ${after}`);
    return;
  }
  if (Array.isArray(after)) {
    after.forEach((v, i) => diffStrings((before as unknown[] | undefined)?.[i], v, `${path}[${i}]`, out));
    return;
  }
  if (after && typeof after === "object") {
    for (const [k, v] of Object.entries(after)) diffStrings((before as Record<string, unknown> | undefined)?.[k], v, path ? `${path}.${k}` : k, out);
  }
}

async function run() {
  const args = process.argv.slice(2);
  const apply = args.includes("--apply");
  const restoreIdx = args.indexOf("--restore");
  const payload = await getPayload({ config });

  if (restoreIdx !== -1) {
    const backup = JSON.parse(readFileSync(args[restoreIdx + 1], "utf8")) as { id: string; slug: string; data: Record<string, unknown> }[];
    for (const entry of backup) {
      await payload.update({ collection: "pages", id: entry.id, data: entry.data });
      console.log(`restored: ${entry.slug}`);
    }
    process.exit(0);
  }

  const site = await payload.find({ collection: "sites", where: { key: { equals: "wheelchair" } }, limit: 1 });
  const siteId = site.docs[0]?.id;
  if (!siteId) throw new Error('Site "wheelchair" not found.');

  const pages = await payload.find({ collection: "pages", where: { site: { equals: siteId } }, limit: 1000, depth: 0 });
  const backup: { id: string; slug: string; data: Record<string, unknown> }[] = [];
  const pending: { id: string; slug: string; data: Record<string, unknown> }[] = [];

  for (const doc of pages.docs as unknown as Record<string, any>[]) {
    if (SEO_LANDING_PAGES.has(doc.slug)) continue;

    const transformed = transform(doc, "", "") as Record<string, any>;
    Object.assign(transformed, OVERRIDES[doc.slug]?.(transformed) ?? {});

    const data: Record<string, unknown> = {};
    const original: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(transformed)) {
      if (PROTECTED_KEYS.has(key)) continue;
      if (JSON.stringify(value) !== JSON.stringify(doc[key])) {
        data[key] = value;
        original[key] = doc[key];
      }
    }
    if (Object.keys(data).length === 0) continue;

    const lines: string[] = [];
    diffStrings(original, data, "", lines);
    console.log(`\n## ${doc.slug}\n${lines.join("\n")}`);
    pending.push({ id: doc.id, slug: doc.slug, data });
    backup.push({ id: doc.id, slug: doc.slug, data: original });
  }

  console.log(`\n${pending.length} pages to update.`);
  if (!apply) {
    console.log("Dry run - nothing written. Re-run with --apply to write.");
    process.exit(0);
  }

  mkdirSync("scripts/backups", { recursive: true });
  const backupPath = `scripts/backups/rebrand-wheelchair-transport-${Date.now()}.json`;
  writeFileSync(backupPath, JSON.stringify(backup, null, 1));
  console.log(`Backup of original field values: ${backupPath}`);

  for (const { id, slug, data } of pending) {
    await payload.update({ collection: "pages", id, data });
    console.log(`updated: ${slug} (${Object.keys(data).join(", ")})`);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
