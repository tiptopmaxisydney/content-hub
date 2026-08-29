import type { Payload } from "payload";

export type Opportunity = { url: string; impressions: number; avgPosition: number; matchedSlug?: string; collection?: "pages" | "locations" };

const MIN_IMPRESSIONS = 10;
const MIN_POSITION = 4;
const MAX_POSITION = 20;

/**
 * Pages with real search visibility (enough impressions) that are ranking just outside page 1
 * (position 4-20) - good targets for content/internal-linking improvements. Reads whatever has
 * already been ingested into search-console-metrics (see scripts/ingest-search-console.ts);
 * returns an empty list rather than erroring when nothing has been ingested yet.
 */
export async function findOpportunities(payload: Payload, siteId: string): Promise<Opportunity[]> {
  const metrics = await payload.find({
    collection: "search-console-metrics",
    where: { site: { equals: siteId } },
    limit: 5000,
    depth: 0,
  });

  const byUrl = new Map<string, { impressions: number; positionSum: number; rows: number }>();
  for (const row of metrics.docs) {
    const entry = byUrl.get(row.url) ?? { impressions: 0, positionSum: 0, rows: 0 };
    entry.impressions += row.impressions;
    entry.positionSum += row.position * (row.impressions || 1);
    entry.rows += row.impressions || 1;
    byUrl.set(row.url, entry);
  }

  const opportunities: Opportunity[] = [];
  for (const [url, entry] of byUrl) {
    const avgPosition = entry.positionSum / entry.rows;
    if (entry.impressions < MIN_IMPRESSIONS) continue;
    if (avgPosition < MIN_POSITION || avgPosition > MAX_POSITION) continue;

    const slug = url.replace(/^\/|\/$/g, "");
    const page = await payload.find({ collection: "pages", where: { and: [{ site: { equals: siteId } }, { slug: { equals: slug } }] }, limit: 1, depth: 0 });
    const location = page.docs[0]
      ? undefined
      : await payload.find({ collection: "locations", where: { and: [{ site: { equals: siteId } }, { slug: { equals: slug } }] }, limit: 1, depth: 0 });

    opportunities.push({
      url,
      impressions: entry.impressions,
      avgPosition: Math.round(avgPosition * 10) / 10,
      matchedSlug: page.docs[0]?.slug ?? location?.docs[0]?.slug,
      collection: page.docs[0] ? "pages" : location?.docs[0] ? "locations" : undefined,
    });
  }

  return opportunities.sort((a, b) => b.impressions - a.impressions);
}
