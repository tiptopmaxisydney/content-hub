import type { CollectionConfig } from "payload";
import { siteScopedAccess } from "../access/siteScoped";
import { enforceUniqueSlugPerSite } from "../hooks/enforceUniqueSlugPerSite";
import { revalidateOnChange, revalidateOnDelete } from "../hooks/revalidateFrontend";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "site", "slug", "date", "_status"],
  },
  versions: { drafts: { autosave: { interval: 1000 } } },
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
      required: true,
      fields: [
        { name: "heading", type: "text" },
        { name: "paragraphs", type: "array", fields: [{ name: "text", type: "textarea", required: true }] },
      ],
    },
  ],
};
