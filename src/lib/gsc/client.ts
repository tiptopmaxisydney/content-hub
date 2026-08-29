import { google } from "googleapis";

export type GscRow = { url: string; date: string; query: string; impressions: number; clicks: number; ctr: number; position: number };

export type GscResult<T> = { configured: true; data: T } | { configured: false };

function getCredentials() {
  const clientEmail = process.env.GSC_CLIENT_EMAIL;
  const privateKey = process.env.GSC_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const siteUrl = process.env.GSC_SITE_URL;
  if (!clientEmail || !privateKey || !siteUrl) return undefined;
  return { clientEmail, privateKey, siteUrl };
}

/** True as soon as env vars are present - doesn't verify the credentials actually work against the API. */
export function isGscConfigured(): boolean {
  return Boolean(getCredentials());
}

/**
 * Pulls Search Console query/impression/click/position rows for a date range. Returns
 * { configured: false } instead of throwing when GSC_* env vars aren't set yet, so every caller
 * (the ingest script, the opportunities endpoint, the dashboard) can render a "not connected"
 * state instead of crashing.
 */
export async function fetchSearchAnalytics(startDate: string, endDate: string): Promise<GscResult<GscRow[]>> {
  const creds = getCredentials();
  if (!creds) return { configured: false };

  const auth = new google.auth.JWT({
    email: creds.clientEmail,
    key: creds.privateKey,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
  const searchconsole = google.searchconsole({ version: "v1", auth });

  const rows: GscRow[] = [];
  let startRow = 0;
  const rowLimit = 25000;

  for (;;) {
    const res = await searchconsole.searchanalytics.query({
      siteUrl: creds.siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["page", "query", "date"],
        rowLimit,
        startRow,
      },
    });

    const page = res.data.rows ?? [];
    for (const row of page) {
      const [pageUrl, query, date] = row.keys ?? [];
      if (!pageUrl || !query || !date) continue;
      rows.push({
        url: new URL(pageUrl).pathname,
        date,
        query,
        impressions: row.impressions ?? 0,
        clicks: row.clicks ?? 0,
        ctr: row.ctr ?? 0,
        position: row.position ?? 0,
      });
    }

    if (page.length < rowLimit) break;
    startRow += rowLimit;
  }

  return { configured: true, data: rows };
}
