import type { CollectionConfig } from "payload";
import { siteScopedAccess } from "../access/siteScoped";

export const VehicleSpecs: CollectionConfig = {
  slug: "vehicle-specs",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "site", "passengerCapacity", "order"],
    description: "Fleet/vehicle facts (capacity, luggage, features) shared by the Vehicle Options and Passenger Capacity page modules.",
  },
  access: {
    read: () => true,
    create: siteScopedAccess,
    update: siteScopedAccess,
    delete: siteScopedAccess,
  },
  fields: [
    { name: "site", type: "relationship", relationTo: "sites", required: true, index: true },
    { name: "icon", type: "text", admin: { description: "A single emoji, e.g. 🚐" } },
    { name: "badge", type: "text", required: true, admin: { description: "e.g. Standard, Premium, Group, Large Group, Accessible, Family" } },
    { name: "title", type: "text", required: true },
    { name: "specs", type: "array", labels: { singular: "Spec", plural: "Specs" }, fields: [{ name: "text", type: "text", required: true }] },
    { name: "features", type: "array", fields: [{ name: "text", type: "text", required: true }] },
    { name: "passengerCapacity", type: "number", required: true },
    { name: "luggageCapacity", type: "number", admin: { description: "Approximate number of standard suitcases." } },
    { name: "luggageNotes", type: "text" },
    { name: "ctaLabel", type: "text", required: true, defaultValue: "Book Now" },
    { name: "ctaHref", type: "text", admin: { description: "Overrides the default booking link, if this vehicle should link somewhere specific." } },
    { name: "order", type: "number", defaultValue: 0, admin: { description: "Lower numbers display first." } },
  ],
};
