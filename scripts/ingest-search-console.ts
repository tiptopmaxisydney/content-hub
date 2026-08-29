/**
 * One-off/manual Search Console ingest: pulls the last 30 days of query/impression/click/position
 * data (see src/lib/gsc/client.ts) and upserts it into the search-console-metrics collection.
 * Requires GSC_CLIENT_EMAIL, GSC_PRIVATE_KEY, GSC_SITE_URL in .env - logs and exits cleanly if
 * they're not set yet rather than erroring, since this is buildable ahead of credentials existing.
 *
 * Run with: npm run ingest:search-console   (from content-hub/)
 * Not scheduled yet - run manually until a cron/job decision is made once credentials exist.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { fetchSearchAnalytics } from "../src/lib/gsc/client";

const SITE_KEY = "transport-solutions";

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

async function run() {
  const payload = await getPayload({ config });

  const site = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const siteDoc = site.docs[0];
  if (!siteDoc) {
    console.log(`No site found for key "${SITE_KEY}".`);
    process.exit(0);
  }

  const result = await fetchSearchAnalytics(daysAgo(30), daysAgo(1));
  if (!result.configured) {
    console.log("GSC_CLIENT_EMAIL / GSC_PRIVATE_KEY / GSC_SITE_URL not set - nothing to ingest yet.");
    process.exit(0);
  }

  console.log(`Upserting ${result.data.length} Search Console rows for ${SITE_KEY}...`);
  for (const row of result.data) {
    const existing = await payload.find({
      collection: "search-console-metrics",
      where: {
        and: [
          { site: { equals: siteDoc.id } },
          { url: { equals: row.url } },
          { date: { equals: row.date } },
          { query: { equals: row.query } },
        ],
      },
      limit: 1,
    });
    const data = { site: siteDoc.id, ...row };
    if (existing.docs[0]) {
      await payload.update({ collection: "search-console-metrics", id: existing.docs[0].id, data });
    } else {
      await payload.create({ collection: "search-console-metrics", data });
    }
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
