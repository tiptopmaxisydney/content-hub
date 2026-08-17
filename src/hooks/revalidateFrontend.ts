import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

/**
 * Tells the relevant frontend site to drop its cached copy of this page/post so the
 * edit shows up immediately instead of waiting for the next scheduled revalidation.
 * FRONTEND_URLS is a JSON map of site key -> base URL, e.g.
 *   {"baby-seat":"http://localhost:3000","wheelchair":"http://localhost:3004"}
 *
 * Fire-and-forget, and deliberately does NOT pass `req` to the nested findByID call -
 * reusing the parent operation's transaction/session here can leave that session in a
 * broken state for whatever Local API call runs next if the fetch fails or is slow.
 */
function pingRevalidate(siteId: string, slug: string, req: Parameters<CollectionAfterChangeHook>[0]["req"]) {
  // Bulk scripts (seeding, migrations) fire many writes back-to-back; overlapping fire-and-forget
  // reads against the same MongoDB session pool while the next write's transaction is opening has
  // been observed to corrupt Atlas transaction state ("NoSuchTransaction"). Those scripts opt out.
  if (process.env.DISABLE_REVALIDATE_HOOKS === "true") return;

  void (async () => {
    try {
      const frontendUrls = JSON.parse(process.env.FRONTEND_URLS ?? "{}") as Record<string, string>;
      const site = await req.payload.findByID({ collection: "sites", id: siteId, depth: 0 });
      const base = site?.key ? frontendUrls[site.key] : undefined;
      if (!base) return;

      await fetch(`${base}/api/revalidate?secret=${process.env.REVALIDATE_SECRET}&slug=${encodeURIComponent(slug)}`, {
        method: "POST",
      });
    } catch (err) {
      req.payload.logger.warn({ err }, "Failed to ping frontend revalidate endpoint");
    }
  })();
}

export const revalidateOnChange: CollectionAfterChangeHook = ({ doc, req }) => {
  if (doc?.site && doc?.slug) pingRevalidate(typeof doc.site === "string" ? doc.site : doc.site.id, doc.slug, req);
  return doc;
};

export const revalidateOnDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  if (doc?.site && doc?.slug) pingRevalidate(typeof doc.site === "string" ? doc.site : doc.site.id, doc.slug, req);
  return doc;
};
