import type { Field } from "payload";

/**
 * Shared SEO workflow fields spread into Pages, Locations, BlogPosts and FaqLibrary.
 * seoStatus + the computed quality gate (see transport-solutions-sydney/lib/seo.ts) together
 * decide whether a doc is indexed; indexOverride is the manual escape hatch either way.
 */
export const seoWorkflowFields: Field[] = [
  {
    name: "seoStatus",
    type: "select",
    required: true,
    defaultValue: "draft",
    options: [
      { label: "Draft", value: "draft" },
      { label: "In Review", value: "review" },
      { label: "Approved", value: "approved" },
    ],
    admin: {
      description:
        "Only 'Approved' docs that also pass the frontend's structural quality check are indexed. Use indexOverride below to force either way.",
    },
  },
  {
    name: "targetKeyword",
    type: "text",
    admin: {
      description: "The primary search phrase this URL owns. Must be unique per site - prevents two pages competing for the same keyword.",
    },
  },
  {
    name: "indexOverride",
    type: "select",
    defaultValue: "none",
    options: [
      { label: "None (use seoStatus + quality gate)", value: "none" },
      { label: "Force Index", value: "forceIndex" },
      { label: "Force Noindex", value: "forceNoindex" },
    ],
  },
  { name: "lastReviewed", type: "date" },
];
