import type { CollectionBeforeValidateHook } from "payload";

/** Payload doesn't support compound-unique indexes declaratively, so slugs are enforced unique per-site here. */
export const enforceUniqueSlugPerSite: CollectionBeforeValidateHook = async ({ data, req, originalDoc, collection }) => {
  const site = data?.site ?? originalDoc?.site;
  const slug = data?.slug ?? originalDoc?.slug;
  if (!site || !slug) return data;

  const siteId = typeof site === "string" ? site : site.id;
  const existing = await req.payload.find({
    collection: collection.slug as "pages" | "blog-posts",
    where: {
      and: [{ site: { equals: siteId } }, { slug: { equals: slug } }, ...(originalDoc?.id ? [{ id: { not_equals: originalDoc.id } }] : [])],
    },
    limit: 1,
    req,
  });

  if (existing.docs.length > 0) {
    throw new Error(`Slug "${slug}" is already used by another page on this site.`);
  }

  return data;
};
