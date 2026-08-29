import type { CollectionConfig, Where } from "payload";
import { siteScopedAccess } from "../access/siteScoped";
import { enforceUniqueSlugPerSite } from "../hooks/enforceUniqueSlugPerSite";
import { enforceUniqueTargetKeyword } from "../hooks/enforceUniqueTargetKeyword";
import { revalidateOnChange, revalidateOnDelete } from "../hooks/revalidateFrontend";
import { seoWorkflowFields } from "../fields/seoWorkflowFields";

export const Locations: CollectionConfig = {
  slug: "locations",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "site", "locationType", "slug"],
    description: "Sydney regions and suburbs, e.g. /locations/western-sydney or /locations/western-sydney/parramatta",
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
      name: "locationType",
      type: "select",
      required: true,
      defaultValue: "region",
      options: [
        { label: "Region", value: "region" },
        { label: "Suburb", value: "suburb" },
      ],
    },
    {
      name: "parentRegion",
      type: "relationship",
      relationTo: "locations",
      admin: { description: "For a suburb page, the region it belongs to. Leave empty for a region." },
      filterOptions: ({ data }) => {
        const and: Where[] = [{ locationType: { equals: "region" } }];
        if (data?.site) and.push({ site: { equals: data.site } });
        return { and };
      },
    },
    { name: "slug", type: "text", required: true, index: true, admin: { description: "URL path segment, e.g. western-sydney or parramatta" } },
    { name: "name", type: "text", required: true },

    { type: "collapsible", label: "SEO", fields: [
      { name: "metaTitle", type: "text", required: true },
      { name: "metaDescription", type: "textarea", required: true },
    ]},

    { name: "heroDescription", type: "textarea", required: true },
    { name: "image", type: "upload", relationTo: "media", required: true },

    { name: "intro", type: "array", labels: { singular: "Paragraph", plural: "Intro Paragraphs" }, fields: [{ name: "text", type: "textarea", required: true }] },
    { name: "airportInfo", type: "textarea", admin: { description: "Sydney (Kingsford Smith) Airport drive time/route info for this location." } },
    { name: "westernAirportInfo", type: "textarea", admin: { description: "Western Sydney Airport (Badgerys Creek) info, if relevant to this location." } },

    {
      name: "suburbs",
      type: "array",
      admin: { description: "Free-text suburb list shown on a region page (e.g. in a coverage-area grid). Not the same as suburb-type Location docs." },
      fields: [
        { name: "name", type: "text", required: true },
        { name: "note", type: "text" },
      ],
    },
    {
      name: "services",
      type: "array",
      fields: [
        { name: "icon", type: "text", admin: { description: "A single emoji, e.g. ✈️" } },
        { name: "title", type: "text", required: true },
        { name: "description", type: "text", required: true },
        {
          name: "targetPage",
          type: "relationship",
          relationTo: "pages",
          filterOptions: ({ data }) => (data?.site ? { site: { equals: data.site } } : true),
        },
        { name: "href", type: "text", admin: { description: "Fallback path, only used when targetPage above is not set." } },
      ],
    },
    {
      name: "nearbyLocations",
      type: "relationship",
      relationTo: "locations",
      hasMany: true,
      admin: { description: "Other regions/suburbs on this site to cross-link from this page." },
      filterOptions: ({ data }) => (data?.site ? { site: { equals: data.site } } : true),
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
      admin: { description: "Shared/tagged FAQs pulled in alongside the location-specific FAQ list above." },
      filterOptions: ({ data }) => (data?.site ? { site: { equals: data.site } } : true),
    },
  ],
};
