/**
 * P2 URL restructure for transport-solutions-sydney (see the URL migration plan agreed
 * 2026-08-20): renames 7 existing pages onto their new flat slugs and creates 6 net-new
 * pages. Corresponding next.config.ts redirects (same-domain and cross-domain from the
 * sibling sites) were already added alongside the P1 batch.
 *
 * Deliberately NOT included: the four western-sydney-airport-to-<suburb> corridor pages
 * (Parramatta/Penrith/Liverpool/Campbelltown) - the plan hedges these as "create when
 * content/demand supports", not a firm create.
 *
 * Run with: npm run migrate:p2-urls   (from content-hub/)
 * Safe to re-run - renames no-op once already applied, new pages upsert by slug.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { upsertBySlug } from "./seedUtils";

const SITE_KEY = "transport-solutions";

// Reused from existing pages' media docs (some from the baby-seat site's media - the
// Media collection isn't site-scoped, so cross-site reuse is fine), matching this
// project's established practice of sharing hero images across related service pages.
const IMG_WHEELCHAIR = "6a84b45dc70a80a8009db6de";
const IMG_WSI_BABY_SEAT = "6a84b460c70a80a8009db6f3";
const IMG_FAMILY = "6a834abd7619ebc3c6c03c69";
const IMG_FAMILY_AIRPORT = "6a834aae7619ebc3c6c03c57";
const IMG_CRUISE = "6a84b44bc70a80a8009db659";

const renames = [
  { from: "premium-services/wheelchair-accessible-taxi-sydney", to: "wheelchair-taxi-sydney" },
  { from: "premium-services/taxi-with-baby-seat", to: "baby-seat-taxi-sydney" },
  { from: "taxi-services/corporate-transfers", to: "corporate-transfers-sydney" },
  { from: "taxi-services/cruise-terminal-transfer-sydney", to: "cruise-terminal-transfers-sydney" },
  { from: "western-sydney-airport-transfers/western-sydney-airport-to-sydney-cbd", to: "western-sydney-airport-to-sydney-cbd" },
  { from: "western-sydney-airport-transfers/western-sydney-airport-baby-seat-taxi", to: "western-sydney-airport-baby-seat-taxi" },
  { from: "western-sydney-airport-transfers/western-sydney-airport-wheelchair-taxi", to: "western-sydney-airport-wheelchair-taxi" },
];

type NewPage = {
  slug: string;
  pageType: "service" | "location";
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroDescription: string;
  image: string;
  contentSections: { heading: string; paragraphs: string[]; bulletList: string[] }[];
  faq: { question: string; answer: string }[];
};

const newPages: NewPage[] = [
  {
    slug: "sydney-airport-wheelchair-taxi",
    pageType: "service",
    metaTitle: "Sydney Airport Wheelchair Taxi | Accessible Transfers",
    metaDescription:
      "Wheelchair-accessible taxi transfers to and from Sydney Airport. Trained drivers, accessible vehicles and flight monitoring, available 24/7 with TipTop Maxi Sydney.",
    h1: "Sydney Airport Wheelchair Taxi – Accessible Transfers, Done Right",
    heroDescription:
      "Flying with a wheelchair or mobility scooter shouldn't add stress to your trip. Our wheelchair-accessible vehicles and trained drivers handle Sydney Airport transfers with the dignity and care every passenger deserves.",
    image: IMG_WHEELCHAIR,
    contentSections: [
      {
        heading: "What Our Wheelchair Airport Service Includes",
        paragraphs: ["Every wheelchair taxi booking to or from Sydney Airport comes with the same standard of care:"],
        bulletList: [
          "Vehicles fitted for manual and electric wheelchairs, plus mobility scooters",
          "Drivers trained in safe, respectful assistance",
          "Real-time flight monitoring so your pickup adjusts automatically",
          "Meet & greet at arrivals for extra peace of mind",
          "Fixed fares agreed before you travel",
        ],
      },
      {
        heading: "Arriving or Departing With a Wheelchair",
        paragraphs: [],
        bulletList: [
          "Arrivals: your driver waits inside the terminal and assists from the gate area where permitted",
          "Departures: extra time built in for boarding and luggage",
          "Support for carers or family travelling alongside you",
        ],
      },
      {
        heading: "More Accessible Transport",
        paragraphs: [
          "Need wheelchair-accessible transport beyond the airport? See our Wheelchair Taxi Sydney page for our full accessible service across the city.",
        ],
        bulletList: [],
      },
    ],
    faq: [
      {
        question: "1. Are your wheelchair taxis suitable for electric wheelchairs?",
        answer: "Yes, our accessible vehicles are fitted to carry both manual and electric wheelchairs, as well as mobility scooters.",
      },
      {
        question: "2. Do you track my flight for wheelchair airport transfers?",
        answer: "Yes, we monitor your flight in real time and adjust your pickup automatically for delays or early arrivals.",
      },
      {
        question: "3. Can a carer or family member travel with me?",
        answer: "Yes, our vehicles have room for carers and family members travelling alongside you.",
      },
      {
        question: "4. Is the fare fixed for a wheelchair airport transfer?",
        answer: "Yes, you're quoted a fixed fare before you travel, with no surprises on the day.",
      },
      {
        question: "5. Can I book a wheelchair taxi for Western Sydney Airport too?",
        answer: "Yes, see our Western Sydney Airport Wheelchair Taxi page for that service.",
      },
    ],
  },
  {
    slug: "sydney-airport-baby-seat-taxi",
    pageType: "service",
    metaTitle: "Sydney Airport Baby Seat Taxi | Family Transfers",
    metaDescription:
      "Book a Sydney Airport taxi with a baby or child seat fitted. Safe, family-friendly transfers with flight monitoring, available 24/7 with TipTop Maxi Sydney.",
    h1: "Sydney Airport Baby Seat Taxi – Safe Transfers for Families",
    heroDescription:
      "Travelling with little ones is tiring enough without worrying about a safe seat. Our Sydney Airport transfers come with properly fitted baby and child seats, so your family's ride home starts stress-free.",
    image: IMG_WSI_BABY_SEAT,
    contentSections: [
      {
        heading: "Family-Friendly Airport Transfers",
        paragraphs: [
          "We fit the right seat for your child's age and size, so you can focus on getting through the airport, not installing a car seat.",
        ],
        bulletList: [
          "Baby capsules, child seats and booster seats available",
          "Real-time flight monitoring for arrivals",
          "Extra space for prams, luggage and travel gear",
          "Meet & greet at arrivals with luggage assistance",
          "Fixed fares agreed before you travel",
        ],
      },
      {
        heading: "What to Tell Us When Booking",
        paragraphs: [
          "Let us know your child's age (or seat type needed) when booking, and we'll have the right seat fitted and ready before you land.",
        ],
        bulletList: [],
      },
      {
        heading: "Travelling as a Bigger Family?",
        paragraphs: [
          "Larger families or groups can book our 7 Seater or 11 Seater vehicles with baby seats included, so everyone travels together.",
        ],
        bulletList: [],
      },
    ],
    faq: [
      {
        question: "1. What baby and child seats do you provide?",
        answer: "We offer baby capsules, forward-facing child seats and booster seats, fitted to suit your child's age and size.",
      },
      {
        question: "2. Do I need to bring my own car seat?",
        answer: "No, our seats are provided and fitted for you, just let us know your child's age when booking.",
      },
      {
        question: "3. Can I book a baby seat taxi for Sydney Airport at any time?",
        answer: "Yes, we operate 24/7, including early morning and late-night flights.",
      },
      {
        question: "4. Is there room for a pram and luggage?",
        answer: "Yes, our vehicles are chosen with extra space for prams and family luggage.",
      },
      {
        question: "5. Can you fit multiple child seats in one vehicle?",
        answer: "Yes, and for larger families we can also offer our 7 or 11 seater vehicles with multiple seats fitted.",
      },
    ],
  },
  {
    slug: "family-taxi-sydney",
    pageType: "service",
    metaTitle: "Family Taxi Sydney | Safe Rides for the Whole Family",
    metaDescription:
      "TipTop Maxi Sydney's family taxi service offers baby and child seats, extra luggage space and roomy vehicles for family trips across Sydney, 24/7.",
    h1: "Family Taxi Sydney – Room for Everyone, Seats for the Kids",
    heroDescription:
      "From the school run to the airport, our family taxi service is built around what families actually need: properly fitted child seats, room for prams and luggage, and drivers who don't mind a bit of noise in the back seat.",
    image: IMG_FAMILY,
    contentSections: [
      {
        heading: "What Makes Us a Family-Friendly Taxi",
        paragraphs: [],
        bulletList: [
          "Baby capsules, child seats and booster seats fitted on request",
          "Extra space for prams, nappy bags and family luggage",
          "Vehicles seating up to 11, so extended family can travel together",
          "Friendly, patient drivers used to travelling with kids",
          "Fixed fares, so surprises stay off the itinerary",
        ],
      },
      {
        heading: "Where Families Book Us",
        paragraphs: [],
        bulletList: [
          "Sydney Airport and Western Sydney Airport family transfers",
          "School events, sports and after-school activities",
          "Family celebrations, reunions and day trips",
          "Grandparent and multi-generation family outings",
        ],
      },
      {
        heading: "Travelling With a Baby or Toddler?",
        paragraphs: ["See our Baby Seat Taxi Sydney page for more on our child seat options, or let us know your child's age when booking any trip."],
        bulletList: [],
      },
    ],
    faq: [
      {
        question: "1. Do you provide child seats for family trips?",
        answer: "Yes, baby capsules, child seats and booster seats are available on request for any booking.",
      },
      {
        question: "2. How many people can travel in one family taxi?",
        answer: "Our fleet seats up to 11 passengers in one vehicle, so bigger families can travel together.",
      },
      {
        question: "3. Is there room for a pram in a family taxi?",
        answer: "Yes, our vehicles are chosen with enough space for prams and family luggage.",
      },
      {
        question: "4. Can I book a family taxi for the airport?",
        answer: "Yes, family airport transfers are one of our most popular bookings, see our Family Airport Transfers Sydney page for details.",
      },
      {
        question: "5. Are your drivers experienced with family travel?",
        answer: "Yes, our drivers are used to travelling with children of all ages and help make the trip as smooth as possible.",
      },
    ],
  },
  {
    slug: "family-airport-transfers-sydney",
    pageType: "service",
    metaTitle: "Family Airport Transfers Sydney | TipTop Maxi Sydney",
    metaDescription:
      "Family airport transfers across Sydney with baby seats, extra luggage space and flight monitoring. Fixed fares, 24/7 availability with TipTop Maxi Sydney.",
    h1: "Family Airport Transfers Sydney – Stress-Free From Kerb to Terminal",
    heroDescription:
      "Airports are hectic enough with kids in tow. Our family airport transfers come with baby and child seats fitted, extra luggage space, and a driver who tracks your flight so you're never left waiting.",
    image: IMG_FAMILY_AIRPORT,
    contentSections: [
      {
        heading: "Built Around Family Travel",
        paragraphs: [],
        bulletList: [
          "Baby capsules, child seats and booster seats fitted before you land",
          "Real-time flight monitoring for arrivals",
          "Meet & greet at arrivals with luggage assistance",
          "Extra space for prams, car seats and travel gear",
          "Fixed fares agreed before you travel",
        ],
      },
      {
        heading: "Landing or Flying Out With the Kids?",
        paragraphs: [],
        bulletList: [
          "Arrivals: your driver waits inside the terminal, ready to help with bags and buckle in the little ones",
          "Departures: we build in extra time for family check-in and security",
        ],
      },
      {
        heading: "Flying via Western Sydney Airport?",
        paragraphs: [
          "We run the same family-friendly service to Western Sydney Airport - see our Western Sydney Airport Baby Seat Taxi page for that route.",
        ],
        bulletList: [],
      },
    ],
    faq: [
      {
        question: "1. Do you fit baby seats before we land?",
        answer: "Yes, your child seat is fitted and ready before your driver meets you at arrivals.",
      },
      {
        question: "2. How much luggage space is there for a family?",
        answer: "Our vehicles are chosen with enough room for prams, car seats and a full family's luggage.",
      },
      {
        question: "3. Do you track our flight for the transfer?",
        answer: "Yes, we monitor your flight in real time so your pickup adjusts automatically for delays.",
      },
      {
        question: "4. Can you handle a large family or extended group?",
        answer: "Yes, our 7 and 11 seater vehicles can seat larger families and groups together.",
      },
      {
        question: "5. Is the fare fixed for family airport transfers?",
        answer: "Yes, you're quoted one fixed fare for the whole family before you travel.",
      },
    ],
  },
  {
    slug: "white-bay-cruise-terminal-transfers",
    pageType: "location",
    metaTitle: "White Bay Cruise Terminal Transfers | TipTop Maxi Sydney",
    metaDescription:
      "Fixed-price taxi transfers to and from White Bay Cruise Terminal. Luggage assistance, group vehicles and 24/7 availability with TipTop Maxi Sydney.",
    h1: "White Bay Cruise Terminal Transfers, Sorted",
    heroDescription:
      "Embarking or disembarking at White Bay Cruise Terminal? We handle the transfer with fixed fares, luggage assistance and vehicles sized for solo travellers up to full groups.",
    image: IMG_CRUISE,
    contentSections: [
      {
        heading: "Cruise Transfers to White Bay",
        paragraphs: [],
        bulletList: [
          "Fixed fares to and from White Bay Cruise Terminal, Rozelle",
          "Luggage assistance for cruise-sized suitcases",
          "Vehicles from sedans up to 11-seater vans for group bookings",
          "24/7 availability for early boarding or late disembarkation",
          "Direct transfers to and from Sydney Airport",
        ],
      },
      {
        heading: "Boarding or Just Off the Ship?",
        paragraphs: [],
        bulletList: [
          "Boarding: we build in time for terminal check-in and luggage drop-off",
          "Disembarking: your driver can meet you at the terminal with a name board for larger groups",
        ],
      },
      {
        heading: "Cruising From Overseas Passenger Terminal Instead?",
        paragraphs: ["See our Overseas Passenger Terminal Transfers page if your cruise departs from Circular Quay instead."],
        bulletList: [],
      },
    ],
    faq: [
      {
        question: "1. Do you offer fixed fares to White Bay Cruise Terminal?",
        answer: "Yes, your fare is agreed before you travel, with no surprises based on traffic or wait times.",
      },
      {
        question: "2. Can you handle cruise-sized luggage?",
        answer: "Yes, our drivers assist with luggage and our vehicles are chosen with enough space for cruise-length trips.",
      },
      {
        question: "3. Can I book a group transfer to White Bay?",
        answer: "Yes, vehicles up to 11 seats are available for groups travelling to the terminal together.",
      },
      {
        question: "4. Do you transfer between White Bay and Sydney Airport?",
        answer: "Yes, we run direct transfers between White Bay Cruise Terminal and Sydney Airport.",
      },
      {
        question: "5. Can I book an early morning transfer for boarding?",
        answer: "Yes, we operate 24/7, including early boarding times.",
      },
    ],
  },
  {
    slug: "overseas-passenger-terminal-transfers",
    pageType: "location",
    metaTitle: "Overseas Passenger Terminal Transfers | TipTop Maxi Sydney",
    metaDescription:
      "Fixed-price taxi transfers to and from Overseas Passenger Terminal, Circular Quay. Luggage assistance, group vehicles and 24/7 availability.",
    h1: "Overseas Passenger Terminal Transfers, Circular Quay",
    heroDescription:
      "Sailing from Circular Quay? We run fixed-fare transfers to and from Overseas Passenger Terminal, with luggage assistance and vehicles sized for solo travellers up to full groups.",
    image: IMG_CRUISE,
    contentSections: [
      {
        heading: "Cruise Transfers to Circular Quay",
        paragraphs: [],
        bulletList: [
          "Fixed fares to and from Overseas Passenger Terminal",
          "Luggage assistance for cruise-sized suitcases",
          "Vehicles from sedans up to 11-seater vans for group bookings",
          "24/7 availability for early boarding or late disembarkation",
          "Direct transfers to and from Sydney Airport",
        ],
      },
      {
        heading: "Boarding or Just Off the Ship?",
        paragraphs: [],
        bulletList: [
          "Boarding: we build in time for terminal check-in and Circular Quay traffic",
          "Disembarking: your driver can meet you at the terminal with a name board for larger groups",
        ],
      },
      {
        heading: "Cruising From White Bay Instead?",
        paragraphs: ["See our White Bay Cruise Terminal Transfers page if your cruise departs from Rozelle instead."],
        bulletList: [],
      },
    ],
    faq: [
      {
        question: "1. Do you offer fixed fares to Overseas Passenger Terminal?",
        answer: "Yes, your fare is agreed before you travel, with no surprises based on traffic or wait times.",
      },
      {
        question: "2. Can you handle cruise-sized luggage?",
        answer: "Yes, our drivers assist with luggage and our vehicles are chosen with enough space for cruise-length trips.",
      },
      {
        question: "3. Can I book a group transfer to Circular Quay?",
        answer: "Yes, vehicles up to 11 seats are available for groups travelling to the terminal together.",
      },
      {
        question: "4. Do you transfer between Circular Quay and Sydney Airport?",
        answer: "Yes, we run direct transfers between Overseas Passenger Terminal and Sydney Airport.",
      },
      {
        question: "5. Can I book an early morning transfer for boarding?",
        answer: "Yes, we operate 24/7, including early boarding times.",
      },
    ],
  },
];

async function run() {
  const payload = await getPayload({ config });

  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found - run seed:transport-solutions first.`);
  const siteId = site.id as string;

  console.log("Renaming slugs...");
  for (const r of renames) {
    const existing = await payload.find({ collection: "pages", where: { and: [{ site: { equals: siteId } }, { slug: { equals: r.from } }] }, limit: 1 });
    if (!existing.docs[0]) {
      console.warn(`  SKIP (not found): ${r.from}`);
      continue;
    }
    if (existing.docs[0].slug === r.to) {
      console.log(`  already renamed: ${r.to}`);
      continue;
    }
    await payload.update({ collection: "pages", id: existing.docs[0].id, data: { slug: r.to } });
    console.log(`  ${r.from} -> ${r.to}`);
  }

  console.log(`Creating ${newPages.length} new pages...`);
  for (const p of newPages) {
    const { slug, ...rest } = p;
    await upsertBySlug(payload, "pages", siteId, slug, {
      site: siteId,
      slug,
      ...rest,
      contentSections: rest.contentSections.map((s) => ({
        heading: s.heading,
        paragraphs: s.paragraphs.map((text) => ({ text })),
        bulletList: s.bulletList.map((text) => ({ text })),
      })),
    });
    console.log(`  page: ${slug}`);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
