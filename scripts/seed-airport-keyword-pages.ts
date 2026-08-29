/**
 * Category C from the user's keyword-cluster list (2026-08-30): 9 genuinely new pages with no
 * existing coverage, after cross-referencing all 24 clusters against the live page list.
 * Category A (5 exact matches) and B (7 clusters overlapping existing pages) were explicitly
 * skipped per the user's decision - only these 9 get created.
 *
 * Each page targets a distinct angle (departure vs arrival vs booking-process vs near-me vs
 * quote-process) even though several sit in the same "Sydney Airport taxi" topic space, so they
 * don't read as templated duplicates of each other. Facts reused from already-approved pages
 * (T1/T2/T3 pickup areas, fixed-fare/tolls pricing language, flight monitoring) rather than
 * invented. Seeded seoStatus: "review" - not indexed until approved in the CMS.
 *
 * Run with: npm run seed:airport-keyword-pages   (from content-hub/)
 * Safe to re-run - existing docs (matched by site+slug) are updated, not duplicated.
 */
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { createMediaUploader } from "./seedUtils";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../transport-solutions-sydney/public");

type ContentSection = { heading: string; paragraphs: string[]; bulletList?: string[] };
type Faq = { question: string; answer: string };
type RelatedLink = { icon: string; title: string; description: string; href: string };

type PageInput = {
  slug: string;
  targetKeyword: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroDescription: string;
  image: string;
  contentSections: ContentSection[];
  faq: Faq[];
  relatedLinks: RelatedLink[];
};

const pages: PageInput[] = [
  {
    slug: "sydney-airport-taxi",
    targetKeyword: "sydney airport taxi",
    metaTitle: "Sydney Airport Taxi | Pre-Book Airport Pickup",
    metaDescription: "Book a Sydney Airport taxi for airport pickup or drop-off. Add your flight, passenger and luggage details and request your trip quote online.",
    h1: "Sydney Airport Taxi, Fixed Price, Every Time",
    heroDescription: "A pre-booked Sydney Airport taxi with one fixed fare, agreed before you travel - sedan through to 11-seater maxi taxi, matched to your passengers and luggage.",
    image: "Sydney-Airport-Transfer.jpg",
    contentSections: [
      {
        heading: "Why Book a Sydney Airport Taxi With Us",
        paragraphs: ["Unlike a metered taxi, every Sydney Airport trip is quoted as a fixed fare before you travel, so the price you're told is the price you pay regardless of traffic or time of day."],
        bulletList: [
          "Fixed fare agreed before you travel, no meter and no surge pricing",
          "Sedan, SUV, 7 seater or 11 seater maxi taxi depending on your group",
          "Flight monitoring on every booking, so delays are handled automatically",
          "24/7 availability for early departures and late arrivals",
        ],
      },
      {
        heading: "Which Terminal Are You Travelling Through?",
        paragraphs: ["Sydney Airport has separate pickup arrangements for the international and domestic terminals - tell us your terminal and flight details when booking so your driver knows exactly where to meet you."],
        bulletList: ["T1 International - Rideshare Pickup Area", "T2/T3 Domestic - Priority Pickup Area"],
      },
    ],
    faq: [
      { question: "How much does a Sydney Airport taxi cost?", answer: "Fares are fixed and confirmed at the time of booking based on your pickup point, destination, vehicle size and any tolls - request a quote online or by phone for an exact price." },
      { question: "Where do I get picked up at Sydney Airport?", answer: "Pickup is from the designated vehicle pickup area for your terminal - T1 Rideshare Pickup Area for international, or the T2/T3 Priority Pickup Area for domestic." },
    ],
    relatedLinks: [
      { icon: "✈️", title: "Sydney Airport Transfers", description: "Full airport transfer service details", href: "/sydney-airport-transfers/" },
      { icon: "🚐", title: "7 Seater Taxi Sydney", description: "For families and small groups", href: "/7-seater-taxi-sydney/" },
    ],
  },
  {
    slug: "taxi-to-sydney-airport",
    targetKeyword: "taxi to sydney airport",
    metaTitle: "Taxi to Sydney Airport | Pre-Book Your Transfer",
    metaDescription: "Need a taxi to Sydney Airport? Pre-book your airport transfer with pickup details, flight time, passengers and luggage and request a trip quote.",
    h1: "Taxi to Sydney Airport, Booked and Confirmed Before You Travel",
    heroDescription: "Pre-book your taxi to Sydney Airport from home, hotel or office, with your pickup time built around your flight so you arrive with time to spare.",
    image: "Sydney-maxi-taxi.jpg",
    contentSections: [
      {
        heading: "Planning Your Trip to Sydney Airport",
        paragraphs: ["We recommend pre-booking your taxi to Sydney Airport with extra buffer time ahead of your flight, particularly for early-morning departures or when travelling from further out in Sydney - your exact travel time depends on your pickup suburb and time of day."],
        bulletList: [
          "Pickup from any home, hotel or office address in Sydney",
          "Fixed fare agreed before you travel",
          "Vehicle sized to your passengers and luggage, sedan through 11 seater",
          "Available 24/7, including 3am and 4am departures",
        ],
      },
      {
        heading: "What to Tell Us When Booking",
        paragraphs: ["To confirm the right vehicle and pickup time, provide the following when you book:"],
        bulletList: ["Pickup address and suburb", "Flight date and departure time", "Number of passengers", "Luggage quantity", "Any child seat or wheelchair requirements"],
      },
    ],
    faq: [
      { question: "How early should I book a taxi to Sydney Airport?", answer: "Book as early as you can once your flight is confirmed, and allow extra buffer time for early-morning departures or peak-hour traffic - we recommend building in more time than you think you'll need." },
      { question: "Can I book a taxi to Sydney Airport for a very early flight?", answer: "Yes, we operate 24/7 including 3am and 4am pickups for early departures." },
    ],
    relatedLinks: [
      { icon: "✈️", title: "Sydney Airport Transfers", description: "Full airport transfer service details", href: "/sydney-airport-transfers/" },
      { icon: "🚕", title: "Sydney Airport Taxi", description: "General airport taxi service", href: "/sydney-airport-taxi/" },
    ],
  },
  {
    slug: "taxi-from-sydney-airport",
    targetKeyword: "taxi from sydney airport",
    metaTitle: "Taxi from Sydney Airport | Pre-Book Your Pickup",
    metaDescription: "Pre-book a taxi from Sydney Airport to your home, hotel or destination. Provide your flight, passenger and luggage details when booking.",
    h1: "Taxi from Sydney Airport, Waiting When You Land",
    heroDescription: "Your driver tracks your flight and is ready at the designated pickup area when you land, so a taxi from Sydney Airport is one less thing to plan after a long trip.",
    image: "maxitaxi-1024x683.jpg",
    contentSections: [
      {
        heading: "Arriving at Sydney Airport?",
        paragraphs: ["We monitor your flight number in real time from the moment you book, so early landings and delays are handled automatically without you needing to call us."],
        bulletList: [
          "Live flight monitoring on every booking",
          "Pickup at the designated vehicle pickup area for your terminal",
          "Full luggage assistance loading your bags",
          "Door-to-door drop-off anywhere in Sydney",
        ],
      },
      {
        heading: "Which Terminal Are You Arriving At?",
        paragraphs: ["Let us know your arrival terminal and flight number when booking so your driver meets you in the right place."],
        bulletList: ["T1 International - Rideshare Pickup Area", "T2/T3 Domestic - Priority Pickup Area"],
      },
    ],
    faq: [
      { question: "Do you track my flight if it's delayed?", answer: "Yes. Once you provide your flight number at booking, we monitor it live and adjust your driver's arrival automatically." },
      { question: "Where do I meet my driver after landing at Sydney Airport?", answer: "At the designated vehicle pickup area for your terminal - T1 Rideshare Pickup Area for international, or the T2/T3 Priority Pickup Area for domestic. Driver details are provided before you land." },
    ],
    relatedLinks: [
      { icon: "✈️", title: "Sydney Airport Transfers", description: "Full airport transfer service details", href: "/sydney-airport-transfers/" },
      { icon: "👨‍👩‍👧‍👦", title: "Family Taxi Sydney", description: "Family travel with prams and child seats", href: "/family-taxi-sydney/" },
    ],
  },
  {
    slug: "book-taxi-to-sydney-airport",
    targetKeyword: "book taxi to sydney airport",
    metaTitle: "Book a Taxi to Sydney Airport | Pre-Book Online",
    metaDescription: "Book your taxi to Sydney Airport online. Enter your pickup, flight, passenger and luggage details to arrange the appropriate airport transfer.",
    h1: "Book Your Taxi to Sydney Airport in Minutes",
    heroDescription: "Booking a taxi to Sydney Airport takes a few minutes online or by phone - enter your details once and get an instant fixed-fare quote.",
    image: "book-a-maxi-taxi.jpg",
    contentSections: [
      {
        heading: "How to Book Your Sydney Airport Taxi",
        paragraphs: ["The booking process is the same whether you book online or call us directly:"],
        bulletList: [
          "Enter your pickup address and Sydney Airport as the destination",
          "Add your flight date and departure time",
          "Choose your vehicle based on passengers and luggage",
          "Receive an instant fixed-fare quote",
          "Confirm your booking with immediate confirmation",
        ],
      },
      {
        heading: "What Happens After You Book",
        paragraphs: ["Once your booking is confirmed, you'll receive your driver and vehicle details in advance, and we monitor your flight from the day of travel so your pickup time stays accurate."],
      },
    ],
    faq: [
      { question: "What information do I need to book a taxi to Sydney Airport?", answer: "Your pickup address, flight date and time, number of passengers, and luggage quantity - any child seat or wheelchair requirements are worth mentioning too, so we send the right vehicle." },
      { question: "Can I book online or do I need to call?", answer: "Both options are available - book online for an instant quote and confirmation, or call our team directly if you'd rather speak to someone." },
    ],
    relatedLinks: [
      { icon: "🚕", title: "Taxi to Sydney Airport", description: "Departure-focused airport transfers", href: "/taxi-to-sydney-airport/" },
      { icon: "💬", title: "Sydney Airport Transfer Quote", description: "Request your fare upfront", href: "/sydney-airport-transfer-quote/" },
    ],
  },
  {
    slug: "taxi-near-me-sydney",
    targetKeyword: "taxi near me sydney",
    metaTitle: "Taxi Near Me Sydney | Pre-Book Your Trip Online",
    metaDescription: "Looking for a taxi near you in Sydney? Pre-book transport for airport trips, groups and planned journeys and request your trip quote online.",
    h1: "Taxi Near Me in Sydney, Pre-Booked and On Time",
    heroDescription: "Wherever you are across Greater Sydney, TipTop Maxi Sydney covers your suburb for pre-booked taxi and maxi taxi transport.",
    image: "Sydney-cabs-Taxi.jpg",
    contentSections: [
      {
        heading: "Sydney-Wide Taxi Coverage",
        paragraphs: ["From the CBD and Eastern Suburbs through to Western Sydney and the Sutherland Shire, we cover Greater Sydney for pre-booked taxi and maxi taxi transport - browse our locations to find your area."],
        bulletList: ["Sydney CBD, Eastern Suburbs, Inner West and North Shore", "Western Sydney, South-West Sydney and the Hills District", "Northern Beaches, St George and Sutherland Shire", "Sydney Airport transfers from any of these areas"],
      },
      {
        heading: "Book a Taxi Near You",
        paragraphs: ["Provide your pickup suburb, destination, date, time, passenger count and luggage when booking, and we'll confirm the right vehicle for your trip."],
      },
    ],
    faq: [
      { question: "Do you cover my suburb?", answer: "We service Greater Sydney across all major regions - see our locations pages for suburb-level coverage, or contact us directly to confirm your specific address." },
      { question: "How quickly can a taxi near me be booked?", answer: "We recommend pre-booking where possible, but short-notice bookings are often available depending on vehicle type and your location - contact us to check current availability." },
    ],
    relatedLinks: [
      { icon: "📍", title: "Sydney Locations", description: "Browse maxi taxi coverage by region", href: "/locations/" },
      { icon: "✈️", title: "Sydney Airport Transfers", description: "Full airport transfer service details", href: "/sydney-airport-transfers/" },
    ],
  },
  {
    slug: "maxi-taxi-near-me",
    targetKeyword: "maxi taxi near me",
    metaTitle: "Maxi Taxi Near Me Sydney | Group Taxi Booking",
    metaDescription: "Looking for a maxi taxi near you in Sydney? Pre-book transport for groups, airport transfers and larger travel requirements and request a quote.",
    h1: "Maxi Taxi Near Me, Group Transport Across Sydney",
    heroDescription: "7 and 11 seater maxi taxis, pre-bookable across Greater Sydney for group travel, airport transfers and family trips.",
    image: "11-seater-maxi-taxi.webp",
    contentSections: [
      {
        heading: "Maxi Taxi Coverage Across Sydney",
        paragraphs: ["Our 7 and 11 seater maxi taxis are available for pre-booked group travel across Greater Sydney, from local suburb trips through to Sydney Airport transfers."],
        bulletList: ["7 seater taxis for families and small groups", "11 seater maxi vans for larger groups", "Fixed fare for the whole vehicle, not per passenger", "Available across all Sydney regions, 24/7"],
      },
      {
        heading: "Book a Maxi Taxi Near You",
        paragraphs: ["Tell us your pickup suburb, passenger numbers and luggage when booking, and we'll confirm the right size vehicle for your group."],
      },
    ],
    faq: [
      { question: "Do you have maxi taxis available near me?", answer: "Our maxi taxi fleet covers Greater Sydney - provide your pickup suburb when booking and we'll confirm vehicle availability for your area." },
      { question: "How many passengers can a maxi taxi near me seat?", answer: "Our maxi taxis seat up to 7 or 11 passengers depending on the vehicle, with the fare fixed for the whole vehicle regardless of how many seats you use." },
    ],
    relatedLinks: [
      { icon: "🚐", title: "7 Seater Taxi Sydney", description: "For families and small groups", href: "/7-seater-taxi-sydney/" },
      { icon: "🚌", title: "11 Seater Taxi Sydney", description: "For larger groups", href: "/11-seater-taxi-sydney/" },
    ],
  },
  {
    slug: "airport-taxi-near-me",
    targetKeyword: "airport taxi near me",
    metaTitle: "Airport Taxi Near Me Sydney | Pre-Book Online",
    metaDescription: "Need an airport taxi near you in Sydney? Pre-book your Sydney Airport trip with pickup, passenger, luggage and flight details online.",
    h1: "Airport Taxi Near Me, Pre-Booked Sydney Airport Transfers",
    heroDescription: "Wherever you're travelling from in Sydney, we come to you for a pre-booked, fixed-fare trip to or from Sydney Airport.",
    image: "Airport-Transfer-Sydney.jpg",
    contentSections: [
      {
        heading: "Airport Taxi Pickup Across Sydney",
        paragraphs: ["We collect from any Sydney suburb for Sydney Airport transfers, with your pickup time built around your flight and traffic conditions on the day."],
        bulletList: ["Pickup from home, hotel or office anywhere in Sydney", "Fixed fare for the full journey to the airport", "Flight monitoring on every booking", "Sedan through to 11 seater maxi taxi available"],
      },
      {
        heading: "Book Your Airport Taxi",
        paragraphs: ["Provide your pickup suburb, flight details, passenger count and luggage when booking, and we'll confirm your fare and vehicle."],
      },
    ],
    faq: [
      { question: "Do you provide airport taxi pickup from my suburb?", answer: "Yes, we cover Greater Sydney for Sydney Airport pickups and drop-offs - provide your suburb when booking to confirm." },
      { question: "How do I book an airport taxi near me?", answer: "Book online or by phone with your pickup address, flight details, passenger count and luggage, and you'll receive an instant fixed-fare quote." },
    ],
    relatedLinks: [
      { icon: "✈️", title: "Sydney Airport Transfers", description: "Full airport transfer service details", href: "/sydney-airport-transfers/" },
      { icon: "📍", title: "Sydney Locations", description: "Browse maxi taxi coverage by region", href: "/locations/" },
    ],
  },
  {
    slug: "maxi-taxi-quote",
    targetKeyword: "maxi taxi quote",
    metaTitle: "Maxi Taxi Quote Sydney | Get a Trip Quote Online",
    metaDescription: "Request a maxi taxi quote in Sydney for airport transfers, group travel and planned trips. Enter your journey, passenger and luggage details online.",
    h1: "Get a Maxi Taxi Quote in Minutes",
    heroDescription: "Request a fixed-fare maxi taxi quote for your Sydney trip - the price you're quoted is the price you pay, with no meter and no surprises.",
    image: "maxi-taxi-sydney-airport-rates-1024x768.jpeg",
    contentSections: [
      {
        heading: "How Your Maxi Taxi Quote Is Calculated",
        paragraphs: ["Your maxi taxi quote is based on distance, travel time, tolls and vehicle size - once confirmed, that fare is fixed for the whole vehicle regardless of traffic or how many of the seats you use."],
        bulletList: ["Distance and estimated travel time", "Vehicle size needed for your passengers and luggage", "Any tolls on the route", "No surge pricing, no metered surprises"],
      },
      {
        heading: "Request Your Quote Online",
        paragraphs: ["Enter your pickup, destination, date, time, passenger count and luggage to receive an instant fixed-fare quote."],
      },
    ],
    faq: [
      { question: "Is the quote I receive the final price?", answer: "Yes, once your quote is confirmed at booking, that's the fixed fare you pay - no meter, no surge pricing and no add-ons at drop-off." },
      { question: "Does my maxi taxi quote include tolls?", answer: "Yes, tolls on your route are included in the fixed fare agreed at booking." },
    ],
    relatedLinks: [
      { icon: "✈️", title: "Sydney Airport Transfer Quote", description: "Airport-specific quote request", href: "/sydney-airport-transfer-quote/" },
      { icon: "🚌", title: "11 Seater Taxi Sydney", description: "For larger groups", href: "/11-seater-taxi-sydney/" },
    ],
  },
  {
    slug: "sydney-airport-transfer-quote",
    targetKeyword: "sydney airport transfer quote",
    metaTitle: "Sydney Airport Transfer Quote | Request Online",
    metaDescription: "Request a Sydney Airport transfer quote online. Provide your pickup, destination, flight, passenger and luggage details for your trip.",
    h1: "Request Your Sydney Airport Transfer Quote",
    heroDescription: "Get a fixed-fare quote for your Sydney Airport transfer before you book - no meter, no surge pricing, agreed upfront.",
    image: "book-taxi-to-Sydney-airport.jpg",
    contentSections: [
      {
        heading: "What Affects Your Sydney Airport Transfer Quote",
        paragraphs: ["A few details determine your Sydney Airport transfer fare - provide these when requesting a quote so it's accurate:"],
        bulletList: ["Pickup or drop-off suburb", "Vehicle size needed for passengers and luggage", "Time of day and flight schedule", "Any child seat or wheelchair requirements"],
      },
      {
        heading: "Get Your Quote Online",
        paragraphs: ["Enter your pickup, destination, flight details, passenger count and luggage online for an instant fixed-fare quote, or call our team directly."],
      },
    ],
    faq: [
      { question: "Will my Sydney Airport transfer quote change on the day?", answer: "No, once your fare is confirmed at booking it's fixed - it won't change due to traffic, time of day or minor flight delays." },
      { question: "Do I need my flight number for a quote?", answer: "It's not required for the quote itself, but providing it lets us monitor your flight and adjust pickup timing automatically." },
    ],
    relatedLinks: [
      { icon: "✈️", title: "Sydney Airport Transfers", description: "Full airport transfer service details", href: "/sydney-airport-transfers/" },
      { icon: "🚕", title: "Maxi Taxi Quote", description: "General maxi taxi quote request", href: "/maxi-taxi-quote/" },
    ],
  },
];

async function run() {
  const payload = await getPayload({ config });
  const getOrUploadMedia = createMediaUploader(payload, publicDir);
  const site = await payload.find({ collection: "sites", where: { key: { equals: "transport-solutions" } }, limit: 1 });
  const siteId = site.docs[0].id as string;

  console.log(`Seeding ${pages.length} airport-keyword pages (seoStatus: review)...`);
  for (const p of pages) {
    const imageId = await getOrUploadMedia(`/images/${p.image}`, p.h1);
    const data = {
      site: siteId,
      pageType: "service" as const,
      seoStatus: "review" as const,
      indexOverride: "none" as const,
      targetKeyword: p.targetKeyword,
      slug: p.slug,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      h1: p.h1,
      heroDescription: p.heroDescription,
      image: imageId,
      contentSections: p.contentSections.map((s) => ({
        heading: s.heading,
        paragraphs: s.paragraphs.map((text) => ({ text })),
        bulletList: (s.bulletList ?? []).map((text) => ({ text })),
      })),
      faq: p.faq,
      relatedLinks: p.relatedLinks,
    };

    const existing = await payload.find({ collection: "pages", where: { and: [{ site: { equals: siteId } }, { slug: { equals: p.slug } }] }, limit: 1 });
    if (existing.docs[0]) {
      await payload.update({ collection: "pages", id: existing.docs[0].id, data });
    } else {
      await payload.create({ collection: "pages", data });
    }
    console.log(`  page: ${p.slug}`);
  }

  console.log("Done. All docs are seoStatus: review - not indexed until approved in the CMS.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
