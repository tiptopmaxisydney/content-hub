import type { CollectionConfig } from "payload";
import { siteScopedAccess } from "../access/siteScoped";

/**
 * Ingested Search Console rows (see scripts/ingest-search-console.ts and src/lib/gsc/client.ts).
 * Not hand-edited - one doc per (site, url, date, query) combination, upserted by the ingest script.
 */
export const SearchConsoleMetrics: CollectionConfig = {
  slug: "search-console-metrics",
  admin: {
    useAsTitle: "url",
    defaultColumns: ["url", "site", "date", "query", "impressions", "clicks", "position"],
    description: "Google Search Console query/impression/click data, imported by scripts/ingest-search-console.ts.",
  },
  access: {
    read: () => true,
    create: siteScopedAccess,
    update: siteScopedAccess,
    delete: siteScopedAccess,
  },
  fields: [
    { name: "site", type: "relationship", relationTo: "sites", required: true, index: true },
    { name: "url", type: "text", required: true, index: true, admin: { description: "Site-relative path this row's metrics belong to, e.g. /parramatta-to-sydney-airport-taxi/" } },
    { name: "date", type: "date", required: true, index: true },
    { name: "query", type: "text", required: true },
    { name: "impressions", type: "number", required: true, defaultValue: 0 },
    { name: "clicks", type: "number", required: true, defaultValue: 0 },
    { name: "ctr", type: "number", required: true, defaultValue: 0 },
    { name: "position", type: "number", required: true, defaultValue: 0 },
  ],
};
