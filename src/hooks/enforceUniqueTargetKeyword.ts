import type { CollectionBeforeValidateHook } from "payload";

/**
 * A keyword should have exactly one target URL per site (the "keyword -> URL mapping" rule -
 * prevents two pages competing for the same search intent). Checks both `pages` and `locations`
 * since either collection can own a keyword.
 */
export const enforceUniqueTargetKeyword: CollectionBeforeValidateHook = async ({ data, req, originalDoc, collection }) => {
  const site = data?.site ?? originalDoc?.site;
  const targetKeyword = data?.targetKeyword ?? originalDoc?.targetKeyword;
  if (!site || !targetKeyword) return data;

  const siteId = typeof site === "string" ? site : site.id;
  const selfId = originalDoc?.id;

  for (const collectionSlug of ["pages", "locations"] as const) {
    const existing = await req.payload.find({
      collection: collectionSlug,
      where: {
        and: [
          { site: { equals: siteId } },
          { targetKeyword: { equals: targetKeyword } },
          ...(collectionSlug === collection.slug && selfId ? [{ id: { not_equals: selfId } }] : []),
        ],
      },
      limit: 1,
      req,
    });

    if (existing.docs.length > 0) {
      throw new Error(`Target keyword "${targetKeyword}" is already owned by another page on this site ("${existing.docs[0].slug}").`);
    }
  }

  return data;
};
