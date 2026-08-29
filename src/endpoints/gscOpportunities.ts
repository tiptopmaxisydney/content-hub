import type { Endpoint } from "payload";
import { findOpportunities } from "../lib/gsc/opportunities";
import { isGscConfigured } from "../lib/gsc/client";

/**
 * GET /api/gsc-opportunities?siteKey=transport-solutions
 * Returns { configured: false } until GSC_* env vars are set and scripts/ingest-search-console.ts
 * has been run at least once - the dashboard (Stage 13) renders a "not connected" state for that.
 */
export const gscOpportunitiesEndpoint: Endpoint = {
  path: "/gsc-opportunities",
  method: "get",
  handler: async (req) => {
    if (!isGscConfigured()) {
      return Response.json({ configured: false });
    }

    const siteKey = new URL(req.url ?? "", "http://localhost").searchParams.get("siteKey");
    if (!siteKey) {
      return Response.json({ error: "Missing siteKey query param" }, { status: 400 });
    }

    const site = await req.payload.find({ collection: "sites", where: { key: { equals: siteKey } }, limit: 1 });
    const siteDoc = site.docs[0];
    if (!siteDoc) {
      return Response.json({ error: `No site found for key "${siteKey}"` }, { status: 404 });
    }

    const opportunities = await findOpportunities(req.payload, siteDoc.id as string);
    return Response.json({ configured: true, opportunities });
  },
};
