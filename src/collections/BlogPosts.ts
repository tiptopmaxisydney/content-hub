import type { CollectionConfig } from "payload";
import { siteScopedAccess } from "../access/siteScoped";
import { enforceUniqueSlugPerSite } from "../hooks/enforceUniqueSlugPerSite";
import { revalidateOnChange, revalidateOnDelete } from "../hooks/revalidateFrontend";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "site", "slug", "date"],
  },
  access: {
    read: () => true,
    create: siteScopedAccess,
    update: siteScopedAccess,
    delete: siteScopedAccess,
  },
  hooks: {
    beforeValidate: [enforceUniqueSlugPerSite],
    afterChange: [revalidateOnChange],
    afterDelete: [revalidateOnDelete],
  },
  fields: [
    { name: "site", type: "relationship", relationTo: "sites", required: true, index: true },
    { name: "slug", type: "text", required: true, index: true },
    { name: "title", type: "text", required: true },

    { type: "collapsible", label: "SEO", fields: [
      { name: "metaTitle", type: "text", required: true },
      { name: "metaDescription", type: "textarea", required: true },
    ]},

    { name: "excerpt", type: "textarea", required: true },
    { name: "date", type: "date", required: true, defaultValue: () => new Date().toISOString() },
    { name: "image", type: "upload", relationTo: "media", required: true },

    {
      name: "sections",
      type: "array",
      admin: { description: "Structured heading+paragraph blocks. Used by baby-seat and wheelchair; leave empty if using Content below." },
      fields: [
        { name: "heading", type: "text" },
        { name: "paragraphs", type: "array", fields: [{ name: "text", type: "textarea", required: true }] },
      ],
    },
    {
      name: "content",
      type: "richText",
      admin: { description: "Rich text body. Used by transport-solutions (imported from its original raw-HTML posts); leave empty if using Sections above." },
    },
  ],
};
