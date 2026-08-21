/**
 * Migration-consistency audit, agreed 2026-08-22: compares each page's slug against its
 * h1/metaTitle by word overlap, to surface pages where a URL rename (see migrate-p1/p2/p3-
 * urls.ts) changed the slug field but left the old pre-rename title/H1 in place - a real
 * bug class, not a stale-search-index false alarm (see fix-title-h1-mismatch-2026-08-22.ts
 * and rewrite-longdistance-2026-08-22.ts, both found via this script).
 *
 * Heuristic only: flags low word-overlap, doesn't understand meaning. Re-run any time a
 * batch of URLs gets renamed to catch the next round of leftovers quickly, but always read
 * the flagged page's actual content before assuming it's broken - some flags are just
 * stylistic/creative headlines that don't literally repeat the slug's keywords.
 *
 * Run with: node --env-file=.env --import tsx scripts/_audit_slug_title_h1.ts
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";

const STOPWORDS = new Set(["sydney", "taxi", "taxis", "cab", "cabs", "maxi", "transfer", "transfers", "transport", "the", "and", "for", "a", "to", "of", "in"]);

function words(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/[\s-]+/)
      .filter((w) => w.length > 1 && !STOPWORDS.has(w))
  );
}

async function run() {
  const payload = await getPayload({ config });
  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const siteId = siteResult.docs[0].id as string;

  const res = await payload.find({ collection: "pages", where: { site: { equals: siteId } }, limit: 500, depth: 0 });
  console.log(`Total pages: ${res.docs.length}\n`);

  const flagged: string[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const doc of res.docs as any[]) {
    const slugWords = words(doc.slug.split("/").pop());
    const h1Words = words(doc.h1 ?? "");
    const titleWords = words(doc.metaTitle ?? "");

    const overlapH1 = [...slugWords].filter((w) => h1Words.has(w));
    const overlapTitle = [...slugWords].filter((w) => titleWords.has(w));

    const h1Ratio = slugWords.size ? overlapH1.length / slugWords.size : 1;
    const titleRatio = slugWords.size ? overlapTitle.length / slugWords.size : 1;

    const isFlagged = h1Ratio < 0.5 || titleRatio < 0.5;
    if (isFlagged) {
      flagged.push(
        `slug: ${doc.slug}\n  h1: "${doc.h1}"  (overlap ${overlapH1.length}/${slugWords.size})\n  metaTitle: "${doc.metaTitle}"  (overlap ${overlapTitle.length}/${slugWords.size})`
      );
    }
  }

  console.log(`Flagged (low slug<->h1/title word overlap): ${flagged.length}\n`);
  console.log(flagged.join("\n\n"));
  process.exit(0);
}
run().catch((err) => {
  console.error(err);
  process.exit(1);
});
