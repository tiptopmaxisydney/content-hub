import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { useAsTitle: "alt" },
  access: {
    read: () => true,
  },
  upload: {
    imageSizes: [
      { name: "thumbnail", width: 400 },
      { name: "card", width: 800 },
      { name: "hero", width: 1600 },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [
    { name: "alt", type: "text", required: true },
    { name: "width", type: "number" },
    { name: "height", type: "number" },
  ],
};
