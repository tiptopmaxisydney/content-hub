import type { CollectionConfig } from "payload";
import { siteScopedAccess } from "../access/siteScoped";
import { enforceUniqueSlugPerSite } from "../hooks/enforceUniqueSlugPerSite";
import { enforceUniqueTargetKeyword } from "../hooks/enforceUniqueTargetKeyword";
import { revalidateOnChange, revalidateOnDelete } from "../hooks/revalidateFrontend";
import { seoWorkflowFields } from "../fields/seoWorkflowFields";

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
    beforeValidate: [enforceUniqueSlugPerSite, enforceUniqueTargetKeyword],
    afterChange: [revalidateOnChange],
    afterDelete: [revalidateOnDelete],
  },
  fields: [
    { name: "site", type: "relationship", relationTo: "sites", required: true, index: true },
    ...seoWorkflowFields,
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

    {
      name: "routeDetails",
      type: "group",
      admin: {
        description:
          "Structured origin/destination route facts for Airport <-> Suburb route pages (e.g. /sydney-airport-transfers/<suburb>/). Optional - leave blank for pages that aren't a specific route. Rendered as a 'Route Overview' fact block near the top of the page.",
      },
      fields: [
        { name: "originLabel", type: "text", defaultValue: "Sydney Airport" },
        { name: "destinationSuburb", type: "text" },
        { name: "destinationState", type: "text", defaultValue: "NSW" },
        { name: "destinationPostcode", type: "text" },
        { name: "region", type: "text", admin: { description: "e.g. Northern Sydney, Eastern Suburbs" } },
        { name: "distanceKm", type: "text", admin: { description: "Qualify as approximate, e.g. \"approximately 22km\" - never a bare number presented as exact." } },
        { name: "travelTime", type: "text", admin: { description: "Qualify as approximate/traffic-dependent, e.g. \"typically 30-45 minutes, longer during peak hour\" - never a guaranteed duration." } },
        { name: "mainCorridor", type: "text", admin: { description: "Main route/corridor, e.g. \"via the Eastern Distributor and Epping Road\"" } },
        { name: "tollInfo", type: "text", admin: { description: "Route-specific toll roads/crossings, if any. Avoid stating exact toll dollar amounts - note that tolls are included in the fixed fare instead." } },
        { name: "terminals", type: "text", defaultValue: "T1 International, T2 & T3 Domestic" },
        {
          name: "vehicleCategories",
          type: "array",
          labels: { singular: "Vehicle Category", plural: "Vehicle Categories" },
          fields: [{ name: "label", type: "text", required: true }],
        },
        {
          name: "nearbySuburbs",
          type: "array",
          labels: { singular: "Nearby Suburb", plural: "Nearby Suburbs" },
          fields: [{ name: "name", type: "text", required: true }],
        },
      ],
    },

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
      name: "comparisonTable",
      type: "group",
      admin: { description: "Optional 'us vs the alternative' feature comparison (e.g. private transfer vs airport shuttle), rendered as a table below the intro." },
      fields: [
        { name: "title", type: "text" },
        { name: "columnA", type: "text", defaultValue: "TipTop Private Transfer" },
        { name: "columnB", type: "text", defaultValue: "Alternative" },
        {
          name: "rows",
          type: "array",
          fields: [
            { name: "feature", type: "text", required: true },
            { name: "valueA", type: "text", required: true },
            { name: "valueB", type: "text", required: true },
          ],
        },
      ],
    },
    {
      name: "operationalNotice",
      type: "textarea",
      admin: { description: "Short callout shown near the top of the page for time-sensitive operational caveats (e.g. a not-yet-open airport's pickup procedures still being finalised). Leave blank for none." },
    },
    {
      name: "faq",
      type: "array",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
    {
      name: "relatedFaqs",
      type: "relationship",
      relationTo: "faq-library",
      hasMany: true,
      admin: { description: "Shared/tagged FAQs pulled in alongside the page-specific FAQ list above." },
      filterOptions: ({ data }) => (data?.site ? { site: { equals: data.site } } : true),
    },
    {
      name: "relatedLinks",
      type: "array",
      labels: { singular: "Related Link", plural: "Related Links" },
      admin: { description: "Internal links to other pages on this site, e.g. suburb <-> airport <-> vehicle routes. Rendered as a linked card grid near the bottom of the page (same component as the /locations pages)." },
      fields: [
        { name: "icon", type: "text", admin: { description: "A single emoji, e.g. ✈️" } },
        { name: "title", type: "text", required: true },
        { name: "description", type: "text", required: true },
        {
          name: "targetPage",
          type: "relationship",
          relationTo: "pages",
          admin: { description: "Prefer this over typing a path below - the link stays correct automatically if the target's slug changes." },
          filterOptions: ({ data }) => (data?.site ? { site: { equals: data.site } } : true),
        },
        {
          name: "targetLocation",
          type: "relationship",
          relationTo: "locations",
          filterOptions: ({ data }) => (data?.site ? { site: { equals: data.site } } : true),
        },
        {
          name: "href",
          type: "text",
          admin: { description: "Site-relative path, e.g. /parramatta-to-sydney-airport-taxi/. Only used as a fallback when neither target field above is set." },
        },
      ],
    },
  ],
};
