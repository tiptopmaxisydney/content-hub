import type { CollectionConfig } from "payload";
import { siteScopedAccess } from "../access/siteScoped";
import { enforceUniqueSlugPerSite } from "../hooks/enforceUniqueSlugPerSite";
import { revalidateOnChange, revalidateOnDelete } from "../hooks/revalidateFrontend";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "h1",
    defaultColumns: ["h1", "site", "pageType", "slug"],
    description: "Service and location landing pages, e.g. /baby-capsule-taxi-sydney",
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
    {
      name: "pageType",
      type: "select",
      required: true,
      defaultValue: "service",
      options: [
        { label: "Service", value: "service" },
        { label: "Location", value: "location" },
        { label: "Other", value: "other" },
      ],
    },
    { name: "slug", type: "text", required: true, index: true, admin: { description: "URL path segment, e.g. baby-capsule-taxi-sydney" } },
    { name: "navLabel", type: "text", admin: { description: "Short label used in nav menus, if this page appears there." } },

    { type: "collapsible", label: "SEO", fields: [
      { name: "metaTitle", type: "text", required: true },
      { name: "metaDescription", type: "textarea", required: true },
    ]},

    { name: "eyebrow", type: "text" },
    { name: "h1", type: "text", required: true },
    { name: "heroDescription", type: "textarea", required: true },
    { name: "image", type: "upload", relationTo: "media", required: true },
    { name: "imageFirst", type: "checkbox", defaultValue: false },

    { name: "intro", type: "array", labels: { singular: "Paragraph", plural: "Intro Paragraphs" }, fields: [{ name: "text", type: "textarea", required: true }] },
    { name: "introItemsIntro", type: "text", admin: { description: "Heading line shown above the intro bullet list, if any." } },
    { name: "introItems", type: "array", labels: { singular: "Item", plural: "Intro Bullet List" }, fields: [{ name: "text", type: "text", required: true }] },

    {
      name: "features",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
    {
      name: "contentSections",
      type: "array",
      labels: { singular: "Content Section", plural: "Content Sections" },
      admin: { description: "Repeatable heading + paragraphs + optional bullet list, for pages with more than one distinct body section (e.g. transport-solutions service pages)." },
      fields: [
        { name: "heading", type: "text" },
        { name: "paragraphs", type: "array", fields: [{ name: "text", type: "textarea", required: true }] },
        { name: "bulletList", type: "array", labels: { singular: "Bullet", plural: "Bullet List" }, fields: [{ name: "text", type: "text", required: true }] },
      ],
    },
    {
      name: "faq",
      type: "array",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
  ],
};
