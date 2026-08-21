/**
 * Full rewrite of long-distance-taxi-sydney, agreed 2026-08-22. This CMS page's slug was
 * renamed from interstate-taxi-transfer-sydney during the URL restructure, but its title,
 * H1 and content were never updated - it was still 100% "Interstate Taxi Transfer Sydney"
 * branded content, word-for-word matching the separate static page at
 * /taxi-services/interstate-taxi-transfer-sydney/ (restored earlier this session at the
 * user's explicit request, kept as its own page rather than folded into this one). That's
 * genuine duplicate content across two live URLs.
 *
 * This rewrite keeps the genuinely generic sections (fleet, trust bullets) and reframes the
 * interstate-specific sections around long-distance/regional NSW travel instead, per the
 * site's own nav (lib/navigation.ts) treating "Long Distance Transfer" and "Interstate
 * Transfer Sydney" as two distinct links.
 *
 * Run with: node --env-file=.env --import tsx scripts/rewrite-longdistance-2026-08-22.ts
 * (dry-run by default - pass LIVE=true to actually write)
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";
const SLUG = "long-distance-taxi-sydney";

const P = (text: string) => ({ text });
const B = (text: string) => ({ text });

const newContent = {
  metaTitle: "Long Distance Taxi Transfer Sydney",
  metaDescription:
    "Book a long distance taxi transfer from Sydney to regional NSW destinations - Wollongong, Newcastle, Blue Mountains, Southern Highlands and more. Fixed fares, 7-11 seater vehicles, 24/7.",
  h1: "Long Distance Taxi Transfer Sydney",
  heroDescription:
    "Need to travel further than a standard Sydney taxi trip? TipTop Maxi Sydney provides long-distance transfers to regional NSW destinations, with a fixed fare agreed before you travel. Choose from 7-11 seater maxi cabs, sedans, or wheelchair-accessible vehicles for a comfortable, stress-free journey.",
  contentSections: [
    {
      heading: "Sydney Long Distance Taxi Transfers",
      paragraphs: [
        P("TipTop Maxi Sydney provides long-distance taxi transfers from Sydney to regional NSW destinations and beyond. Whether you're travelling from Sydney Airport, the CBD, or your local suburb, one driver handles the entire journey, with a fixed fare agreed before you travel."),
        P("Travelling interstate to Canberra or the ACT specifically? See our dedicated Interstate Taxi Transfer Sydney page."),
      ],
      bulletList: [],
    },
    {
      heading: "Regional NSW Destinations We Cover",
      paragraphs: [
        P("We provide long-distance transfers from Sydney and Sydney Airport to regional NSW towns and hubs, including:"),
      ],
      bulletList: [
        B("Wollongong (85-90 minutes)"),
        B("Kiama (130-145 km)"),
        B("Jervis Bay (200-210 km)"),
        B("Southern Highlands - Bowral, Mittagong"),
        B("Blue Mountains - Lithgow, Blackheath"),
        B("Newcastle (~160 km)"),
        B("Port Stephens (200-220 km)"),
        B("Canberra (~247 km) - for interstate travel to the ACT, see our Interstate Taxi Transfer page"),
      ],
    },
    {
      heading: "Why Book a Long Distance Transfer With Us",
      paragraphs: [
        P("Long-distance trips deserve the same reliability as a short Sydney ride. Our long-distance service includes:"),
      ],
      bulletList: [
        B("Fixed fares agreed before you travel"),
        B("Reliable long-distance taxi services across NSW"),
        B("7, 9 and 11-seater Maxi Taxis for groups"),
        B("Wheelchair-accessible vehicles available"),
        B("Baby seats and child capsules on request"),
        B("Professional drivers experienced on regional NSW routes"),
        B("24/7 availability, including early-morning departures"),
      ],
    },
    {
      heading: "Booking Your Long Distance Transfer",
      paragraphs: [
        P("Booking your long-distance taxi transfer is quick and hassle-free - get a fare estimate online or call us directly. Pricing is based on distance, travel time, tolls and vehicle requirements, and is agreed before you travel."),
      ],
      bulletList: [],
    },
    {
      heading: "Our Maxi Taxi Fleet",
      paragraphs: [P("Tiptop Maxi Cabs are designed for comfort and flexibility:")],
      bulletList: [
        B("7, 9, and 11-seater Maxi Taxis"),
        B("Extra luggage space"),
        B("Air-conditioned, spacious interiors"),
        B("Baby seat & baby capsule options"),
        B("Wheelchair-accessible taxis available"),
        B("Large group travel support"),
      ],
    },
    {
      heading: undefined,
      paragraphs: [P("Perfect for:")],
      bulletList: [
        B("Families with young children"),
        B("Groups with luggage"),
        B("Airport to hotel transfers"),
        B("Long-distance & regional journeys"),
        B("Corporate travel"),
        B("Cruise terminal drop-offs"),
      ],
    },
    {
      heading: "Why Choose Tiptop Transport Solutions?",
      paragraphs: [
        P("Tiptop provides fast, reliable, and comfortable transfers from Sydney International Airport and Sydney Domestic Airport to anywhere you need to go."),
      ],
      bulletList: [
        B("24/7 service - always available"),
        B("Direct, door-to-door travel"),
        B("Family-friendly vehicles"),
        B("Baby seats & capsules on request"),
        B("Wheelchair-accessible taxi service"),
        B("Fixed pricing - no hidden fees"),
        B("Clean & sanitized vehicles"),
        B("Easy online, phone, or app-based booking"),
        B("Flight monitoring ensures on-time airport pickups"),
        B("Maxi Cabs built for luggage-heavy trips"),
        B("Vehicles regularly serviced for safety"),
      ],
    },
  ],
  faq: [
    {
      question: "1. Do you provide long-distance taxi transfers from Sydney?",
      answer: "Yes. We offer long-distance transfers to regional NSW destinations and beyond.",
    },
    {
      question: "2. Can I travel directly without changing vehicles?",
      answer: "Yes. Direct door-to-door transport is available.",
    },
    {
      question: "3. How is long-distance taxi pricing calculated?",
      answer: "Pricing is based on distance, travel time, tolls, and vehicle requirements.",
    },
    {
      question: "4. Can I book a return long-distance transfer?",
      answer: "Yes. Return journeys can be arranged.",
    },
    {
      question: "5. Is luggage included?",
      answer: "Standard luggage is included. Let us know your passenger and luggage quantities when booking so we can confirm the right vehicle.",
    },
  ],
};

async function run() {
  const payload = await getPayload({ config });

  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found.`);
  const siteId = site.id as string;

  const existing = await payload.find({
    collection: "pages",
    where: { and: [{ site: { equals: siteId } }, { slug: { equals: SLUG } }] },
    limit: 1,
  });
  const doc = existing.docs[0];
  if (!doc) throw new Error(`Page with slug "${SLUG}" not found.`);

  console.log("Current metaTitle:", doc.metaTitle, "-> New:", newContent.metaTitle);
  console.log("Current h1:", doc.h1, "-> New:", newContent.h1);
  console.log(`Content sections: ${doc.contentSections?.length ?? 0} -> ${newContent.contentSections.length}`);
  console.log(`FAQ entries: ${doc.faq?.length ?? 0} -> ${newContent.faq.length}`);

  if (process.env.LIVE !== "true") {
    console.log("\nDRY RUN - pass LIVE=true to actually write.");
    process.exit(0);
  }

  await payload.update({ collection: "pages", id: doc.id, data: newContent });
  console.log("\nSaved.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
