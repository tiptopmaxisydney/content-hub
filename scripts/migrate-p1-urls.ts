/**
 * P1 URL restructure for transport-solutions-sydney (see the URL migration plan agreed
 * 2026-08-20): renames 4 existing pages onto their new flat slugs, deletes 1 duplicate
 * WSI page (content-hub already had two docs for the same WSI maxi/large-taxi page), and
 * creates 5 net-new pages. Corresponding next.config.ts redirects (old path -> new path,
 * same-domain; and cross-domain from the three sibling sites) were added separately.
 *
 * Run with: npm run migrate:p1-urls   (from content-hub/)
 * Safe to re-run - renames/deletes no-op once already applied, new pages upsert by slug.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { upsertBySlug } from "./seedUtils";

const SITE_KEY = "transport-solutions";

// Reused from existing pages' media docs, matching this project's established
// practice of sharing one hero image across multiple related service pages.
const IMG_11_SEATER_VAN = "6a84b440c70a80a8009db606";
const IMG_SUV = "6a84b443c70a80a8009db625";
const IMG_GROUP_TRANSFERS = "6a84b44fc70a80a8009db673";
const IMG_SYDNEY_AIRPORT = "6a84b455c70a80a8009db6a2";

const renames = [
  { from: "maxi-11-seater-van", to: "11-seater-taxi-sydney" },
  { from: "taxi-services/group-transfers-sydney", to: "group-transport-sydney" },
  { from: "taxi-services/sydney-airport-transfer", to: "sydney-airport-transfers" },
  { from: "western-sydney-airport-transfers/western-sydney-airport-maxi-taxi", to: "western-sydney-airport-large-taxi" },
];

// Duplicate of western-sydney-airport-transfers/western-sydney-airport-maxi-taxi (renamed
// above) - both existed pre-restructure targeting the same content; this one is retired.
const duplicateToDelete = "taxi-services/western-sydney-airport-maxi-taxi";

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
    slug: "large-taxi-sydney",
    pageType: "service",
    metaTitle: "Large Taxi Sydney | Maxi Cabs for Groups & Luggage",
    metaDescription:
      "Need a large taxi in Sydney? TipTop Maxi Sydney's fleet seats up to 11 passengers with room for luggage, prams and equipment. Fixed fares, 24/7 booking.",
    h1: "Large Taxi Sydney – Roomy Rides for Groups, Luggage & Gear",
    heroDescription:
      "When a regular taxi just won't fit everyone (or everything), TipTop Maxi Sydney's large taxi fleet has you covered. From 7-seater SUVs to 11-seater vans, we match you with a vehicle that has the space you actually need, at a fixed fare.",
    image: IMG_11_SEATER_VAN,
    contentSections: [
      {
        heading: "Why Book a Large Taxi With Us",
        paragraphs: [
          "A large taxi from TipTop Maxi Sydney means nobody gets left behind, and nothing gets left behind either. Whether it's a family with prams and suitcases or a group heading to the same event, we size the vehicle to the job:",
        ],
        bulletList: [
          "Seating for up to 11 passengers in one vehicle",
          "Genuine boot and cabin space for luggage, sports gear or equipment",
          "Fixed, upfront fares - no per-passenger surprises",
          "Airport, CBD and long-distance transfers across Sydney",
          "Professional drivers who help load and unload",
        ],
      },
      {
        heading: "Which Large Taxi Do You Need?",
        paragraphs: [
          "Our large taxi fleet covers a range of group sizes, so you only pay for the space you use:",
          "Not sure which size fits your group? Call us and we'll recommend the right vehicle before you book.",
        ],
        bulletList: [
          "5, 6 & 7 Seater SUV - ideal for small groups with extra luggage",
          "11 Seater Van - built for bigger groups, sports teams and airport runs with heavy bags",
          "Wheelchair-accessible large taxis available on request",
        ],
      },
      {
        heading: "Where We Take Large Taxi Groups",
        paragraphs: [],
        bulletList: [
          "Sydney Airport and Western Sydney Airport transfers",
          "Corporate events, conferences and race days",
          "Weddings and group celebrations",
          "Cruise terminal transfers with luggage",
          "Interstate and long-distance trips",
        ],
      },
    ],
    faq: [
      {
        question: "1. How many passengers can a large taxi in Sydney seat?",
        answer:
          "Our large taxi fleet seats up to 11 passengers in one vehicle, with smaller 5, 6 and 7 seater options available for medium-sized groups.",
      },
      {
        question: "2. Is there enough room for luggage in a large taxi?",
        answer:
          "Yes. Our large vehicles are chosen specifically for their luggage capacity, so suitcases, prams and sports equipment travel with you, not in a second car.",
      },
      {
        question: "3. Can I book a large taxi for Sydney Airport?",
        answer:
          "Absolutely. Large taxi airport transfers are one of our most popular bookings, with flight monitoring and meet & greet included.",
      },
      {
        question: "4. Do large taxi fares cost more per passenger?",
        answer: "No, our fares are fixed for the whole vehicle, so a full large taxi is often cheaper per person than booking multiple smaller cars.",
      },
      {
        question: "5. Are wheelchair-accessible large taxis available?",
        answer: "Yes, wheelchair-accessible large vehicles can be arranged - just let us know your requirements when booking.",
      },
    ],
  },
  {
    slug: "7-seater-taxi-sydney",
    pageType: "service",
    metaTitle: "7 Seater Taxi Sydney | TipTop Maxi SUV Fleet",
    metaDescription:
      "Book a 7 seater taxi in Sydney with TipTop Maxi Sydney. Spacious SUVs for airport transfers, families and small groups, with fixed fares and 24/7 availability.",
    h1: "7 Seater Taxi Sydney – Comfortable Rides for Small Groups",
    heroDescription:
      "A 7 seater taxi strikes the balance between comfort and capacity - roomy enough for a family or small group, without booking a full-size van. TipTop Maxi Sydney's 7 seater SUVs are available 24/7 across Sydney, at a fixed fare.",
    image: IMG_SUV,
    contentSections: [
      {
        heading: "Why Choose a 7 Seater Taxi",
        paragraphs: [
          "Perfect for families, small work teams or friends travelling together, our 7 seater taxis give everyone their own seat and legroom, with space left for luggage.",
        ],
        bulletList: [
          "Seating for up to 7 passengers plus luggage",
          "Airport transfers, city trips and event travel",
          "Child seats available on request",
          "Air-conditioned, late-model SUVs",
          "24/7 availability across Sydney",
        ],
      },
      {
        heading: "Popular Uses for Our 7 Seater SUVs",
        paragraphs: [],
        bulletList: [
          "Sydney Airport and Western Sydney Airport transfers",
          "Family trips with prams and extra bags",
          "Small corporate groups travelling together",
          "Weekend getaways and day trips",
          "Cruise terminal pickups and drop-offs",
        ],
      },
      {
        heading: "Need a Bigger Vehicle?",
        paragraphs: [
          "If your group has grown past 7, our 11 Seater Van has the extra space to match, still at one fixed fare for the whole vehicle.",
        ],
        bulletList: [],
      },
    ],
    faq: [
      {
        question: "1. How many bags fit in a 7 seater taxi?",
        answer: "Our 7 seater SUVs comfortably fit a full set of luggage for 7 passengers, though very large loads may suit our 11 seater van better.",
      },
      {
        question: "2. Can I book a 7 seater taxi for the airport?",
        answer: "Yes, 7 seater airport transfers are one of our most requested bookings, with flight tracking included as standard.",
      },
      {
        question: "3. Is the fare fixed for a 7 seater taxi?",
        answer: "Yes, you're quoted one fixed fare for the whole vehicle, regardless of how many of the 7 seats you use.",
      },
      {
        question: "4. Do you provide child seats in the 7 seater SUV?",
        answer: "Yes, child and booster seats can be requested at the time of booking at no extra hassle.",
      },
      {
        question: "5. Can I book a 7 seater taxi at short notice?",
        answer: "We operate 24/7, so a 7 seater is often available same-day, subject to fleet availability.",
      },
    ],
  },
  {
    slug: "sydney-airport-large-taxi",
    pageType: "service",
    metaTitle: "Sydney Airport Large Taxi | Maxi Cab Transfers",
    metaDescription:
      "Landing with a group or extra luggage? Book a large taxi to or from Sydney Airport with TipTop Maxi Sydney. Flight tracking, meet & greet, fixed fares.",
    h1: "Sydney Airport Large Taxi – One Ride for Your Whole Group",
    heroDescription:
      "Arriving with family, colleagues or a stack of luggage? Our large taxis handle Sydney Airport transfers for groups of up to 11, with flight monitoring and meet & greet included, so nobody's left waiting on the kerb.",
    image: IMG_11_SEATER_VAN,
    contentSections: [
      {
        heading: "Large Taxi Transfers, Built for the Airport",
        paragraphs: [
          "Airport transfers are where a large taxi earns its keep - one booking, one fare, and everyone (and every bag) arrives together.",
        ],
        bulletList: [
          "Real-time flight monitoring, so we adjust automatically if you're delayed",
          "Meet & greet at arrivals with a name board",
          "Seating for up to 11 passengers with luggage space to match",
          "Fixed fares agreed before you travel",
          "24/7 pickups and drop-offs, including red-eye flights",
        ],
      },
      {
        heading: "Landing or Departing?",
        paragraphs: ["Whichever direction you're travelling, we make the large taxi booking simple:"],
        bulletList: [
          "Arrivals: your driver waits inside the terminal and helps load bags",
          "Departures: we build in extra time for groups and heavy luggage",
          "Group check-in coordination for larger parties, on request",
        ],
      },
      {
        heading: "Also Flying via Western Sydney Airport?",
        paragraphs: [
          "We run the same large taxi service to Western Sydney Airport - see our Western Sydney Airport Large Taxi page for details.",
        ],
        bulletList: [],
      },
    ],
    faq: [
      {
        question: "1. How many passengers fit in a Sydney Airport large taxi?",
        answer: "Our large taxis seat up to 11 passengers in one vehicle, with luggage space to suit.",
      },
      {
        question: "2. Do you track my flight for airport transfers?",
        answer: "Yes, we monitor your flight in real time and adjust your pickup automatically if it's early or delayed.",
      },
      {
        question: "3. Is there a meet and greet option?",
        answer: "Yes, your driver waits inside arrivals with a name board and helps with luggage.",
      },
      {
        question: "4. How much does a large taxi to Sydney Airport cost?",
        answer: "Fares are fixed and agreed before you travel, so there are no surprises based on traffic or wait times.",
      },
      {
        question: "5. Can I book a large taxi for an early morning flight?",
        answer: "Yes, we operate 24/7, including early departures and late-night arrivals.",
      },
    ],
  },
  {
    slug: "sydney-airport-group-transfers",
    pageType: "service",
    metaTitle: "Sydney Airport Group Transfers | Maxi Taxi Bookings",
    metaDescription:
      "Travelling as a group through Sydney Airport? TipTop Maxi Sydney offers fixed-fare group transfers with flight tracking and vehicles up to 11 seats.",
    h1: "Sydney Airport Group Transfers – Everyone, One Vehicle",
    heroDescription:
      "Splitting a group across multiple taxis is expensive and stressful. Our Sydney Airport group transfers keep your whole party together, in one vehicle, for one fixed fare.",
    image: IMG_GROUP_TRANSFERS,
    contentSections: [
      {
        heading: "Group Transfers Done Properly",
        paragraphs: [
          "From sports teams to wedding parties, we've coordinated group airport transfers across Sydney for years. Here's what that looks like in practice:",
        ],
        bulletList: [
          "Vehicles seating from 7 up to 11 passengers",
          "Multi-vehicle coordination for larger groups",
          "Flight monitoring so the whole group's pickup adjusts together",
          "Fixed fares agreed in advance, split however suits your group",
          "Luggage space built in, not an afterthought",
        ],
      },
      {
        heading: "Who Books Group Airport Transfers With Us",
        paragraphs: [],
        bulletList: [
          "Sports teams and touring groups",
          "Wedding parties and family gatherings",
          "Corporate teams flying in for conferences",
          "School and community groups",
          "Cruise passengers travelling together",
        ],
      },
      {
        heading: "Booking for a Larger Group?",
        paragraphs: [
          "If your group needs more than one vehicle, let us know your numbers when you book and we'll coordinate multiple cars to arrive and depart together.",
        ],
        bulletList: [],
      },
    ],
    faq: [
      {
        question: "1. What's the biggest group you can transfer in one vehicle?",
        answer: "Our largest single vehicle seats 11 passengers; larger groups are coordinated across multiple vehicles arriving together.",
      },
      {
        question: "2. Is a group transfer cheaper than booking separate taxis?",
        answer: "Usually, yes - one fixed fare for the vehicle is typically cheaper than several individual taxi fares.",
      },
      {
        question: "3. Can you coordinate transfers for a group arriving on different flights?",
        answer: "Yes, let us know each flight and we'll schedule pickups so your group can travel on together.",
      },
      {
        question: "4. Do you provide group transfers for events, not just the airport?",
        answer: "Yes, we handle group transport for weddings, corporate events and race days as well as airport transfers.",
      },
      {
        question: "5. How far in advance should I book a group transfer?",
        answer: "As early as possible for larger groups, though we can often accommodate shorter notice depending on fleet availability.",
      },
    ],
  },
  {
    slug: "sydney-airport-to-western-sydney-airport",
    pageType: "location",
    metaTitle: "Sydney Airport to Western Sydney Airport Transfer",
    metaDescription:
      "Direct transfers between Sydney Airport (Kingsford Smith) and Western Sydney Airport. Fixed fares, flight tracking and 24/7 availability with TipTop Maxi Sydney.",
    h1: "Sydney Airport to Western Sydney Airport, Direct",
    heroDescription:
      "Connecting through Sydney's two airports? We run direct, fixed-fare transfers between Sydney Airport (Kingsford Smith) and Western Sydney International Airport, roughly 50km apart, so you're not left working out public transport with luggage in tow.",
    image: IMG_SYDNEY_AIRPORT,
    contentSections: [
      {
        heading: "A Direct Link Between Sydney's Two Airports",
        paragraphs: [
          "With Western Sydney Airport now operating alongside Sydney Airport, more travellers are connecting between the two - for onward flights, work, or simply because it's the closer option to home. We make that transfer straightforward.",
        ],
        bulletList: [
          "Fixed fare for the full journey, door to door",
          "Real-time flight monitoring at both ends",
          "Roughly 45-60 minutes depending on traffic and exact terminals",
          "Available 24/7, including tight connection times",
          "Room for luggage from a full international flight",
        ],
      },
      {
        heading: "Making a Tight Connection?",
        paragraphs: [
          "If you're connecting between the two airports on the same day, tell us your flight times when booking and we'll plan your pickup to give you the best chance of making it comfortably.",
        ],
        bulletList: [],
      },
      {
        heading: "Travelling the Other Way?",
        paragraphs: ["The same fixed-fare service runs from Western Sydney Airport to Sydney Airport - just let us know your direction when you book."],
        bulletList: [],
      },
    ],
    faq: [
      {
        question: "1. How far apart are Sydney Airport and Western Sydney Airport?",
        answer: "They're roughly 50 kilometres apart, with a drive time of around 45-60 minutes depending on traffic.",
      },
      {
        question: "2. Can you time my pickup around a connecting flight?",
        answer: "Yes, tell us both flight times when booking and we'll plan your transfer to suit your connection.",
      },
      {
        question: "3. Is the fare fixed for this transfer?",
        answer: "Yes, you're quoted one fixed fare for the direct trip between the two airports.",
      },
      {
        question: "4. Do you monitor flights for this route?",
        answer: "Yes, we track your flight at the originating airport so your pickup adjusts automatically for delays.",
      },
      {
        question: "5. Can I book this transfer for a group?",
        answer: "Yes, vehicles up to 11 seats are available for groups travelling between the two airports together.",
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

  console.log("Deleting duplicate...");
  const dup = await payload.find({ collection: "pages", where: { and: [{ site: { equals: siteId } }, { slug: { equals: duplicateToDelete } }] }, limit: 1 });
  if (dup.docs[0]) {
    await payload.delete({ collection: "pages", id: dup.docs[0].id });
    console.log(`  deleted: ${duplicateToDelete}`);
  } else {
    console.log(`  already gone: ${duplicateToDelete}`);
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
