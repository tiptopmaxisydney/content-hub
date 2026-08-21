/**
 * Fixes a keyword/URL mismatch left over from the P1 URL rename (see migrate-p1-urls.ts):
 * that migration only renamed the `slug` field, not metaTitle/h1/metaDescription, so these
 * two pages have been serving at their new canonical URL with their OLD pre-rename title
 * ever since - directly undermining the keyword-ownership mapping this project is built on.
 *
 * taxi-services/sydney-airport-transfer -> sydney-airport-transfers: title still said
 * "Sydney Airport Transfer" (singular) instead of matching the plural URL / "Sydney Airport
 * Transfers" keyword target.
 *
 * taxi-services/group-transfers-sydney -> group-transport-sydney: title still said "Group
 * Transfers Sydney" instead of "Group Transport Sydney" - the actual URL/keyword target.
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-title-h1-mismatch-2026-08-22.ts
 * (dry-run by default - pass LIVE=true to actually write)
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";

const pageFixes = [
  {
    slug: "group-transport-sydney",
    metaTitle: "Group Transport Sydney | Maxi Taxi & Group Transfers",
    metaDescription:
      "Convenient group transport in Sydney with spacious maxi taxis for family outings, airport travel, and event transportation.",
    h1: "Group Transport Sydney",
  },
  {
    slug: "sydney-airport-transfers",
    metaTitle: "Sydney Airport Transfers | Pre-Booked 24/7",
    metaDescription:
      "Professional Sydney Airport transfers with maxi taxis, fixed pricing, flight tracking, and 24/7 airport pickups across Sydney.",
    h1: "Sydney Airport Transfers",
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

    console.log(`[${page.slug}]`);
    console.log(`  metaTitle: "${doc.metaTitle}" -> "${page.metaTitle}"`);
    console.log(`  h1: "${doc.h1}" -> "${page.h1}"`);

    if (process.env.LIVE !== "true") {
      console.log("  DRY RUN - not saving.\n");
      continue;
    }

    await payload.update({
      collection: "pages",
      id: doc.id,
      data: {
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        h1: page.h1,
      },
    });
    console.log("  saved.\n");
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
