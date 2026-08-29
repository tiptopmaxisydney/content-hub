import type { CollectionConfig } from "payload";

export const Sites: CollectionConfig = {
  slug: "sites",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "key", "domain"],
    description: "The four frontend websites this hub serves content to.",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "key",
      type: "select",
      required: true,
      unique: true,
      admin: { description: "Stable identifier the frontend passes in API queries, e.g. baby-seat." },
      options: [
        { label: "Baby Seat Taxi Sydney", value: "baby-seat" },
        { label: "Tiptop Maxi Sydney", value: "transport-solutions" },
        { label: "Wheelchair Taxi Sydney", value: "wheelchair" },
        { label: "Tiptopride Landing", value: "tiptopride-landing" },
      ],
    },
    { name: "domain", type: "text", admin: { description: "Production domain, e.g. babyseattaxisydney.com.au" } },
  ],
};
