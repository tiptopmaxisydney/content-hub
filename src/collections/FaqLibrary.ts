import type { CollectionConfig } from "payload";
import { siteScopedAccess } from "../access/siteScoped";

export const FaqLibrary: CollectionConfig = {
  slug: "faq-library",
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "site", "tags"],
    description: "Reusable, tagged FAQs. Pages/Locations reference these via relatedFaqs instead of retyping a recurring question inline.",
  },
  access: {
    read: () => true,
    create: siteScopedAccess,
    update: siteScopedAccess,
    delete: siteScopedAccess,
  },
  fields: [
    { name: "site", type: "relationship", relationTo: "sites", required: true, index: true },
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    {
      name: "tags",
      type: "select",
      hasMany: true,
      required: true,
      options: [
        { label: "Vehicles", value: "vehicles" },
        { label: "Airport", value: "airport" },
        { label: "Pricing", value: "pricing" },
        { label: "Booking", value: "booking" },
        { label: "Accessibility", value: "accessibility" },
        { label: "General", value: "general" },
        { label: "Baby Seat", value: "baby-seat" },
        { label: "Wheelchair", value: "wheelchair" },
      ],
    },
    { name: "usageNotes", type: "text", admin: { description: "Admin-only guidance on when to attach this FAQ to a page. Not rendered on the frontend." } },
  ],
};
