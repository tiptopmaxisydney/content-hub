/**
 * Seeds the vehicle-specs collection for transport-solutions from figures already stated on the
 * site's own /sedan/, /maxi-suv/, /7-seater-taxi-sydney/ and /11-seater-taxi-sydney/ pages (see
 * scripts/check-capacity.ts for the source check). Wheelchair Accessible and Baby Seat are
 * deliberately NOT included here - the site describes them as accessibility features available
 * across the fleet, not a fixed-capacity vehicle size, and neither page states a passenger number.
 *
 * Run with: npm run seed:vehicle-specs   (from content-hub/)
 * Requires npm run seed:transport-solutions to have been run first (creates the site doc).
 * Safe to re-run - existing docs (matched by site+title) are updated, not duplicated.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

type VehicleSpecInput = {
  icon: string;
  badge: string;
  title: string;
  specs: string[];
  features: string[];
  passengerCapacity: number;
  luggageNotes?: string;
  ctaLabel: string;
  ctaHref: string;
  order: number;
};

const vehicles: VehicleSpecInput[] = [
  {
    icon: "🚗",
    badge: "Standard",
    title: "Sedan Taxi",
    passengerCapacity: 4,
    luggageNotes: "Sufficient space for small to medium bags",
    specs: ["Seating for up to 4 passengers", "Child safety seats available on request"],
    features: ["Air conditioning", "Professional, courteous drivers", "Modern, well-maintained vehicles", "24/7 availability"],
    ctaLabel: "Book Sedan",
    ctaHref: "/sedan/",
    order: 1,
  },
  {
    icon: "🚙",
    badge: "Premium",
    title: "SUV Taxi",
    passengerCapacity: 7,
    specs: ["5, 6 or 7 seater options depending on group size", "Ample luggage space for suitcases and carry-on bags"],
    features: ["Air conditioning", "Child safety seats available on request", "Advanced safety features (airbags, ABS)", "24/7 availability"],
    ctaLabel: "Book SUV",
    ctaHref: "/maxi-suv/",
    order: 2,
  },
  {
    icon: "🚐",
    badge: "Group",
    title: "7 Seater Maxi Taxi",
    passengerCapacity: 7,
    luggageNotes: "Subject to luggage requirements and vehicle configuration",
    specs: ["Seating for up to 7 passengers", "Child seats available on request"],
    features: ["Air-conditioned, late-model SUVs", "24/7 availability across Sydney"],
    ctaLabel: "Book 7 Seater",
    ctaHref: "/7-seater-taxi-sydney/",
    order: 3,
  },
  {
    icon: "🚌",
    badge: "Large Group",
    title: "11 Seater Maxi Van",
    passengerCapacity: 11,
    luggageNotes: "Depends on passenger numbers - tell us your requirements when booking",
    specs: ["Seating for up to 11 passengers", "Wheelchair accessible options available", "Easy access sliding doors"],
    features: ["Air conditioning", "Child safety seats available on request", "GPS tracking and real-time updates", "Onboard charging ports (select vehicles)"],
    ctaLabel: "Book 11 Seater",
    ctaHref: "/11-seater-taxi-sydney/",
    order: 4,
  },
];

async function run() {
  const payload = await getPayload({ config });
  const site = await payload.find({ collection: "sites", where: { key: { equals: "transport-solutions" } }, limit: 1 });
  const siteId = site.docs[0].id;

  console.log(`Seeding ${vehicles.length} vehicle-specs...`);
  for (const v of vehicles) {
    const data = {
      site: siteId,
      icon: v.icon,
      badge: v.badge,
      title: v.title,
      passengerCapacity: v.passengerCapacity,
      luggageNotes: v.luggageNotes,
      specs: v.specs.map((text) => ({ text })),
      features: v.features.map((text) => ({ text })),
      ctaLabel: v.ctaLabel,
      ctaHref: v.ctaHref,
      order: v.order,
    };
    const existing = await payload.find({ collection: "vehicle-specs", where: { and: [{ site: { equals: siteId } }, { title: { equals: v.title } }] }, limit: 1 });
    if (existing.docs[0]) {
      await payload.update({ collection: "vehicle-specs", id: existing.docs[0].id, data });
    } else {
      await payload.create({ collection: "vehicle-specs", data });
    }
    console.log(`  vehicle: ${v.title}`);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
