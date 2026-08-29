/**
 * Migrates the 11 hardcoded Sydney regions from transport-solutions-sydney/lib/locationsData.ts
 * into the new `locations` collection, so /locations/[region] becomes CMS-driven (see the
 * programmatic-SEO plan). Content is transcribed here rather than imported cross-repo.
 *
 * Run with: npm run seed:transport-solutions-locations   (from content-hub/)
 * Requires npm run seed:transport-solutions to have been run first (creates the site doc).
 * Safe to re-run - existing docs (matched by site+slug) are updated, not duplicated.
 */
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { upsertSite, createMediaUploader } from "./seedUtils";

type Payload = Awaited<ReturnType<typeof getPayload>>;

async function upsertLocation(payload: Payload, siteId: string, slug: string, data: Record<string, unknown>) {
  const existing = await payload.find({ collection: "locations", where: { and: [{ site: { equals: siteId } }, { slug: { equals: slug } }] }, limit: 1 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const typedData = data as any;
  if (existing.docs[0]) return payload.update({ collection: "locations", id: existing.docs[0].id, data: typedData, draft: false });
  return payload.create({ collection: "locations", data: typedData, draft: false });
}

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../transport-solutions-sydney/public");

type RegionService = { icon: string; title: string; description: string; href: string };
type Faq = { question: string; answer: string };
type Region = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heroDescription: string;
  image: string;
  intro: string[];
  airportInfo: string;
  westernAirportInfo?: string;
  suburbs: string[];
  services: RegionService[];
  nearbyRegions: string[];
  faqs: Faq[];
};

const regions: Region[] = [
  {
    slug: "sydney-cbd",
    name: "Sydney CBD",
    metaTitle: "Maxi Taxi Sydney CBD | 7 & 11 Seater Airport Transfers",
    metaDescription:
      "Pre-booked maxi taxi service for Sydney CBD, Haymarket, Pyrmont, Barangaroo and Darling Harbour. 7 & 11 seater vehicles, fixed-price Sydney Airport transfers, 24/7.",
    heroDescription:
      "Pre-booked 7 and 11 seater maxi taxis for Sydney CBD, Darling Harbour, Barangaroo and the surrounding city precinct.",
    image: "/images/maxitaxi-1024x683.jpg",
    intro: [
      "TipTop Maxi Sydney provides pre-booked maxi taxi transport for the Sydney CBD, covering hotels, offices, event venues and residential apartments from The Rocks through to Central and Darling Harbour.",
      "The CBD generates a high volume of airport transfers, corporate travel and group bookings for conferences, cruise departures and city events, so our booking system is set up to handle short-notice and pre-scheduled trips alike.",
    ],
    airportInfo:
      "Sydney Airport is around 9km south of the CBD. A pre-booked transfer typically takes 15-25 minutes via General Holmes Drive and the Eastern Distributor, though this can extend significantly during peak-hour traffic or major city events - always allow extra time when travelling to catch a flight.",
    suburbs: ["Sydney CBD", "Haymarket", "The Rocks", "Barangaroo", "Pyrmont", "Ultimo", "Surry Hills", "Darlinghurst", "Chippendale", "Millers Point"],
    services: [
      { icon: "🏢", title: "Corporate Transfers", description: "Executive and business travel across the city", href: "/corporate-transfers-sydney/" },
      { icon: "🚢", title: "Cruise Terminal Transfers", description: "Overseas Passenger Terminal & Circular Quay", href: "/cruise-terminal-transfers-sydney/" },
      { icon: "👥", title: "Group Transport", description: "Conferences, events and larger city groups", href: "/group-transport-sydney/" },
      { icon: "✈️", title: "Sydney Airport Transfers", description: "Fixed-price transfers to T1, T2 and T3", href: "/sydney-airport-transfers/" },
    ],
    nearbyRegions: ["eastern-suburbs", "inner-west", "north-shore"],
    faqs: [
      { question: "Can you collect passengers from CBD hotels?", answer: "Yes, we regularly collect from hotels and serviced apartments across the CBD, including Darling Harbour and Barangaroo. Provide your hotel name and entrance/lobby details when booking." },
      { question: "Do you handle conference and event group bookings in the city?", answer: "Yes, we arrange multiple-vehicle bookings for conferences, corporate events and cruise-ship group departures from CBD venues. Contact us in advance for larger group coordination." },
    ],
  },
  {
    slug: "eastern-suburbs",
    name: "Eastern Suburbs",
    metaTitle: "Maxi Taxi Eastern Suburbs Sydney | Bondi, Randwick, Coogee",
    metaDescription:
      "Pre-booked maxi taxi and airport transfers for Sydney's Eastern Suburbs including Bondi, Bondi Junction, Randwick and Coogee. 7 & 11 seater vehicles, 24/7 booking.",
    heroDescription:
      "Maxi taxi and Sydney Airport transfer service for Bondi, Bondi Junction, Randwick, Coogee and the wider Eastern Suburbs.",
    image: "/images/group-transfers-Sydney-1.jpg",
    intro: [
      "The Eastern Suburbs cover Sydney's beachside and harbourside suburbs, from Bondi and Coogee through to Double Bay, Vaucluse and Randwick, including the UNSW and Randwick hospitals precinct.",
      "TipTop Maxi Sydney is regularly booked in this area for beach-day group transport, wedding and event travel, hospital and university transfers, and airport trips, since several Eastern Suburbs postcodes sit close to Sydney Airport.",
    ],
    airportInfo:
      "Suburbs closer to the airport, such as Maroubra and Kingsford, are typically a 10-15 minute drive to Sydney Airport. From Bondi or Bondi Junction, allow closer to 20-30 minutes via the Eastern Distributor, more in heavy traffic.",
    suburbs: ["Bondi", "Bondi Junction", "Coogee", "Randwick", "Double Bay", "Rose Bay", "Vaucluse", "Maroubra", "Paddington", "Woollahra"],
    services: [
      { icon: "✈️", title: "Sydney Airport Transfers", description: "Fast transfers from the closer eastern suburbs", href: "/sydney-airport-transfers/" },
      { icon: "💍", title: "Wedding Transport", description: "Bridal party and guest transport for beachside venues", href: "/wedding-transport-sydney/" },
      { icon: "👨‍👩‍👧‍👦", title: "Family Taxi", description: "Prams, car seats and family-sized vehicles", href: "/family-taxi-sydney/" },
      { icon: "👥", title: "Group Transport", description: "Beach days, events and larger gatherings", href: "/group-transport-sydney/" },
    ],
    nearbyRegions: ["sydney-cbd", "st-george", "inner-west"],
    faqs: [
      { question: "How long from Bondi to Sydney Airport?", answer: "Typically 20-30 minutes via the Eastern Distributor, depending on traffic. We recommend pre-booking with extra buffer time for early morning or peak-hour flights." },
      { question: "Do you provide transport for beach weddings in the Eastern Suburbs?", answer: "Yes, we arrange bridal party and guest transport for venues across Bondi, Coogee, Vaucluse and Watsons Bay, including multi-vehicle bookings for larger wedding parties." },
    ],
  },
  {
    slug: "inner-west",
    name: "Inner West",
    metaTitle: "Maxi Taxi Inner West Sydney | Newtown, Marrickville, Balmain",
    metaDescription:
      "Maxi taxi and Sydney Airport transfers for the Inner West including Newtown, Marrickville, Leichhardt, Balmain and Strathfield. 7 & 11 seater vehicles, 24/7.",
    heroDescription:
      "Maxi taxi and airport transfer service for Newtown, Marrickville, Leichhardt, Balmain and the wider Inner West.",
    image: "/images/book-a-maxi-taxi.jpg",
    intro: [
      "The Inner West spans a wide band of Sydney between the CBD and Western Sydney, including Newtown, Marrickville, Leichhardt, Balmain, Ashfield and Strathfield.",
      "Many Inner West suburbs sit close to both Sydney Airport and the CBD, making the area a common pickup point for airport transfers, corporate travel and family and group bookings across Sydney University, Canada Bay and the Cooks River corridor.",
    ],
    airportInfo:
      "Most Inner West suburbs are 10-20 minutes from Sydney Airport via Sydenham and General Holmes Drive, though congestion around the Princes Highway and Airport Drive can extend this during peak periods.",
    suburbs: ["Newtown", "Marrickville", "Leichhardt", "Balmain", "Ashfield", "Burwood", "Petersham", "Annandale", "Glebe", "Strathfield"],
    services: [
      { icon: "✈️", title: "Sydney Airport Transfers", description: "Short-notice and pre-booked airport trips", href: "/sydney-airport-transfers/" },
      { icon: "🚐", title: "7 Seater Taxi", description: "Families and small groups with luggage", href: "/7-seater-taxi-sydney/" },
      { icon: "🏢", title: "Corporate Transfers", description: "Business travel across the Inner West", href: "/corporate-transfers-sydney/" },
      { icon: "♿", title: "Wheelchair Taxi", description: "Accessible transport for mobility equipment", href: "/wheelchair-taxi-sydney/" },
    ],
    nearbyRegions: ["sydney-cbd", "western-sydney", "eastern-suburbs"],
    faqs: [
      { question: "Do you cover both sides of the Inner West, from Glebe to Strathfield?", answer: "Yes, we service the full Inner West corridor, including Glebe, Leichhardt, Ashfield, Burwood and Strathfield, along with the suburbs in between." },
      { question: "Is a 7 seater suitable for a family with luggage from the Inner West to the airport?", answer: "In most cases yes, though final capacity depends on the amount of luggage, prams and any child seats required. Tell us your passenger and luggage numbers when booking so we can confirm the right vehicle." },
    ],
  },
  {
    slug: "western-sydney",
    name: "Western Sydney",
    metaTitle: "Maxi Taxi Western Sydney | Parramatta, Blacktown, Auburn",
    metaDescription:
      "Maxi taxi, Sydney Airport and Western Sydney Airport transfers for Parramatta, Blacktown, Auburn, Merrylands and Westmead. 7 & 11 seater vehicles, 24/7 booking.",
    heroDescription: "Maxi taxi service for Parramatta, Blacktown, Auburn, Merrylands and the wider Western Sydney region.",
    image: "/images/maxi-taxi-sydney-airport-rates-1024x768.jpeg",
    intro: [
      "Western Sydney is centred on Parramatta, widely regarded as Sydney's second CBD, along with Blacktown, Auburn, Merrylands, Granville and the Westmead health and education precinct.",
      "This region generates significant demand for both Sydney Airport transfers and, from October 2026, transfers to the new Western Sydney Airport at Badgerys Creek, in addition to everyday corporate, family and group travel.",
    ],
    airportInfo: "Sydney (Kingsford Smith) Airport is around 25km from Parramatta, typically a 30-45 minute drive via the M4, depending on traffic.",
    westernAirportInfo:
      "Western Sydney Airport (Badgerys Creek) is due to open 25 October 2026 and will sit considerably closer for this region than Sydney Airport. Pre-book early during the airport's opening period while local traffic patterns settle.",
    suburbs: ["Parramatta", "Blacktown", "Auburn", "Merrylands", "Granville", "Westmead", "Wentworthville", "Toongabbie", "Harris Park", "Guildford"],
    services: [
      { icon: "✈️", title: "Western Sydney Airport Transfers", description: "New airport at Badgerys Creek, opening Oct 2026", href: "/western-sydney-airport-transfers/" },
      { icon: "🛫", title: "Sydney Airport Transfers", description: "Transfers to Kingsford Smith Airport via the M4", href: "/sydney-airport-transfers/" },
      { icon: "🏢", title: "Corporate Transfers", description: "Business travel to and from Parramatta CBD", href: "/corporate-transfers-sydney/" },
      { icon: "🚐", title: "11 Seater Taxi", description: "Larger groups and family travel", href: "/11-seater-taxi-sydney/" },
    ],
    nearbyRegions: ["hills-district", "south-west-sydney", "inner-west"],
    faqs: [
      { question: "Will TipTop service the new Western Sydney Airport?", answer: "Yes, we are set up to service Western Sydney Airport at Badgerys Creek from its opening on 25 October 2026, in addition to our existing Sydney Airport transfer service." },
      { question: "How far is Parramatta from Sydney Airport?", answer: "Around 25km, typically a 30-45 minute drive via the M4 depending on traffic. We recommend pre-booking with extra time for early flights or peak-hour travel." },
    ],
  },
  {
    slug: "south-west-sydney",
    name: "South-West Sydney",
    metaTitle: "Maxi Taxi South-West Sydney | Liverpool, Campbelltown, Bankstown",
    metaDescription:
      "Maxi taxi and airport transfers for South-West Sydney including Liverpool, Campbelltown, Fairfield and Bankstown. Closest region to Western Sydney Airport. 24/7 booking.",
    heroDescription: "Maxi taxi and airport transfer service for Liverpool, Campbelltown, Fairfield, Cabramatta and the wider South-West Sydney region.",
    image: "/images/Airport-Transfer-Sydney.jpg",
    intro: [
      "South-West Sydney takes in Liverpool, Campbelltown, Fairfield, Cabramatta and Bankstown, and is the region closest to the Western Sydney Airport site being built at Badgerys Creek, near Liverpool.",
      "Campbelltown also acts as a gateway toward the Southern Highlands and NSW South Coast, so this region sees a mix of local, airport and longer-distance transfer bookings.",
    ],
    airportInfo: "Sydney (Kingsford Smith) Airport is typically 30-45 minutes from Liverpool and 45-60 minutes from Campbelltown, depending on traffic on the M5.",
    westernAirportInfo:
      "This region sits closest to the new Western Sydney Airport (Badgerys Creek), opening 25 October 2026. Liverpool in particular will see much shorter transfer times to the new airport than to Sydney Airport.",
    suburbs: ["Liverpool", "Campbelltown", "Fairfield", "Cabramatta", "Bankstown", "Green Valley", "Casula", "Ingleburn", "Prestons", "Moorebank"],
    services: [
      { icon: "✈️", title: "Western Sydney Airport Transfers", description: "Closest region to the new Badgerys Creek airport", href: "/western-sydney-airport-transfers/" },
      { icon: "🛫", title: "Sydney Airport Transfers", description: "Transfers to Kingsford Smith via the M5", href: "/sydney-airport-transfers/" },
      { icon: "🚐", title: "11 Seater Taxi", description: "Larger groups and family transport", href: "/11-seater-taxi-sydney/" },
      { icon: "♿", title: "Wheelchair Taxi", description: "Accessible vehicles across the south-west", href: "/wheelchair-taxi-sydney/" },
    ],
    nearbyRegions: ["western-sydney", "sutherland-shire", "hills-district"],
    faqs: [
      { question: "Is Liverpool close to the new Western Sydney Airport?", answer: "Yes, Liverpool is one of the closest population centres to the Badgerys Creek airport site, so transfer times from this region will typically be shorter than trips to Sydney Airport." },
      { question: "Do you provide transfers from Campbelltown toward the Southern Highlands or South Coast?", answer: "Yes, we arrange longer-distance transfers from South-West Sydney toward regional NSW destinations, subject to availability and advance booking." },
    ],
  },
  {
    slug: "north-shore",
    name: "North Shore",
    metaTitle: "Maxi Taxi North Shore Sydney | Chatswood, North Sydney, Hornsby",
    metaDescription:
      "Maxi taxi and Sydney Airport transfers for the North Shore including Chatswood, North Sydney, Lane Cove and Hornsby. 7 & 11 seater vehicles, 24/7 booking.",
    heroDescription: "Maxi taxi service for Chatswood, North Sydney, Lane Cove, St Leonards and the wider North Shore.",
    image: "/images/corporate-maxi-taxi-sydney.webp",
    intro: [
      "The North Shore spans the business precincts of North Sydney and St Leonards through to the Chatswood retail and technology hub, and extends up to Hornsby on the Upper North Shore.",
      "TipTop Maxi Sydney is regularly booked in this region for corporate travel, airport transfers and family and group trips, with most journeys to the CBD or airport crossing the Sydney Harbour Bridge or Sydney Harbour Tunnel.",
    ],
    airportInfo:
      "Sydney Airport is typically a 30-40 minute drive from Chatswood or North Sydney via the Warringah Freeway and Sydney Harbour Bridge or Tunnel, longer during peak-hour city traffic.",
    suburbs: ["Chatswood", "North Sydney", "Lane Cove", "Willoughby", "St Leonards", "Artarmon", "Mosman", "Hornsby", "Gordon", "Pymble"],
    services: [
      { icon: "🏢", title: "Corporate Transfers", description: "Business travel for North Sydney & Chatswood", href: "/corporate-transfers-sydney/" },
      { icon: "✈️", title: "Sydney Airport Transfers", description: "Transfers via the Harbour Bridge or Tunnel", href: "/sydney-airport-transfers/" },
      { icon: "💍", title: "Wedding Transport", description: "Guest and bridal party transport", href: "/wedding-transport-sydney/" },
      { icon: "🚐", title: "7 Seater Taxi", description: "Families and small groups", href: "/7-seater-taxi-sydney/" },
    ],
    nearbyRegions: ["sydney-cbd", "northern-beaches", "hills-district"],
    faqs: [
      { question: "How long does it take to reach Sydney Airport from Chatswood?", answer: "Typically 30-40 minutes via the Warringah Freeway and Sydney Harbour Bridge or Tunnel, though this can extend during peak-hour traffic. Pre-booking is recommended for early flights." },
      { question: "Do you offer corporate accounts for North Sydney businesses?", answer: "Yes, businesses across North Sydney, St Leonards and Chatswood can apply for a corporate account with invoicing options for regular staff and client travel." },
    ],
  },
  {
    slug: "northern-beaches",
    name: "Northern Beaches",
    metaTitle: "Maxi Taxi Northern Beaches Sydney | Manly, Dee Why, Mona Vale",
    metaDescription:
      "Maxi taxi and Sydney Airport transfers for the Northern Beaches including Manly, Dee Why, Mona Vale and Avalon. 7 & 11 seater vehicles, 24/7 booking.",
    heroDescription: "Maxi taxi and airport transfer service for Manly, Dee Why, Mona Vale, Avalon and the wider Northern Beaches.",
    image: "/images/group-transport-for-sydney.webp",
    intro: [
      "The Northern Beaches run from Manly up to Palm Beach, and have no train line, so road transport plays a bigger role for airport transfers, events and family travel than in most other Sydney regions.",
      "TipTop Maxi Sydney is a common choice here for airport trips, wedding transport to beachside venues, and family or group travel where a larger vehicle and clear pickup time matter, given the longer and more traffic-dependent trip to the airport.",
    ],
    airportInfo:
      "Sydney Airport is typically 45-70 minutes from the Northern Beaches depending on the suburb and traffic, travelling via the Spit Bridge or the Harbour Bridge/Warringah Freeway. Because trip times vary more here than in other regions, we recommend booking with a generous time buffer, particularly for early flights.",
    suburbs: ["Manly", "Dee Why", "Mona Vale", "Narrabeen", "Avalon", "Palm Beach", "Brookvale", "Freshwater", "Newport", "Warriewood"],
    services: [
      { icon: "✈️", title: "Sydney Airport Transfers", description: "Pre-booked transfers with extra time buffer", href: "/sydney-airport-transfers/" },
      { icon: "💍", title: "Wedding Transport", description: "Beachside wedding and event venues", href: "/wedding-transport-sydney/" },
      { icon: "👨‍👩‍👧‍👦", title: "Family Taxi", description: "Family travel with prams and child seats", href: "/family-taxi-sydney/" },
      { icon: "👶", title: "Baby Seat Taxi", description: "Baby capsules and child restraints on request", href: "/baby-seat-taxi-sydney/" },
    ],
    nearbyRegions: ["north-shore", "sydney-cbd"],
    faqs: [
      { question: "Why does the Northern Beaches to airport trip take longer than other regions?", answer: "There is no direct train line and no motorway shortcut, so road traffic on routes like the Spit Bridge or Warringah Freeway has a bigger effect on travel time. We recommend extra buffer time when booking an airport transfer." },
      { question: "Can you arrange transport for a beach wedding at Palm Beach or Avalon?", answer: "Yes, we regularly arrange bridal party and guest transport for Northern Beaches wedding venues, including multi-vehicle bookings for larger guest lists." },
    ],
  },
  {
    slug: "hills-district",
    name: "Hills District",
    metaTitle: "Maxi Taxi Hills District Sydney | Castle Hill, Kellyville, Rouse Hill",
    metaDescription:
      "Maxi taxi and airport transfers for the Hills District including Castle Hill, Baulkham Hills, Kellyville and Rouse Hill. 7 & 11 seater vehicles, 24/7 booking.",
    heroDescription: "Maxi taxi service for Castle Hill, Baulkham Hills, Kellyville, Rouse Hill and the wider Hills District.",
    image: "/images/11-seater-maxi-taxi.webp",
    intro: [
      "The Hills District covers Castle Hill, Baulkham Hills, Kellyville, Rouse Hill and Norwest, an area that has grown quickly since the Sydney Metro Northwest line opened, with Norwest Business Park now a significant commercial precinct.",
      "This region is well placed for the new Western Sydney Airport via the M12 corridor, in addition to existing demand for family, corporate and Sydney Airport travel.",
    ],
    airportInfo: "Sydney Airport is typically 40-55 minutes from Castle Hill or Kellyville, depending on traffic on the M2 and airport-side roads.",
    westernAirportInfo:
      "The Hills District is positioned to benefit from shorter road access to the new Western Sydney Airport (Badgerys Creek) via the M12 Motorway once it opens on 25 October 2026.",
    suburbs: ["Castle Hill", "Baulkham Hills", "Kellyville", "Rouse Hill", "Norwest", "Winston Hills", "Bella Vista", "Glenhaven", "Beaumont Hills", "Box Hill"],
    services: [
      { icon: "🏢", title: "Corporate Transfers", description: "Norwest Business Park and Hills District offices", href: "/corporate-transfers-sydney/" },
      { icon: "✈️", title: "Western Sydney Airport Transfers", description: "M12 access to the new Badgerys Creek airport", href: "/western-sydney-airport-transfers/" },
      { icon: "🚐", title: "11 Seater Taxi", description: "Larger family and group travel", href: "/11-seater-taxi-sydney/" },
      { icon: "👨‍👩‍👧‍👦", title: "Family Taxi", description: "Family transport across the Hills District", href: "/family-taxi-sydney/" },
    ],
    nearbyRegions: ["western-sydney", "north-shore", "south-west-sydney"],
    faqs: [
      { question: "Do you service the Norwest Business Park for corporate travel?", answer: "Yes, we regularly arrange corporate transfers for businesses in Norwest and surrounding Hills District commercial precincts, including account and invoicing options." },
      { question: "Will the Hills District be closer to the new airport once it opens?", answer: "Yes, the M12 Motorway will give the Hills District more direct road access to Western Sydney Airport at Badgerys Creek than the region currently has to Sydney Airport." },
    ],
  },
  {
    slug: "st-george",
    name: "St George",
    metaTitle: "Maxi Taxi St George Sydney | Hurstville, Kogarah, Rockdale",
    metaDescription:
      "Maxi taxi and Sydney Airport transfers for the St George region including Hurstville, Kogarah, Rockdale and Beverly Hills. 7 & 11 seater vehicles, 24/7 booking.",
    heroDescription: "Maxi taxi and airport transfer service for Hurstville, Kogarah, Rockdale, Beverly Hills and the wider St George region.",
    image: "/images/7-seater-maxi-taxi.webp",
    intro: [
      "The St George region, including Hurstville, Kogarah, Rockdale, Beverly Hills and Oatley, is one of the closest residential areas to Sydney Airport, which makes it a popular pickup point for early-morning and late-night airport transfers.",
      "TipTop Maxi Sydney also serves this region for family travel, hospital transfers around Kogarah's medical precinct, and group and cruise-terminal bookings given the short run to both the airport and the city.",
    ],
    airportInfo:
      "Many St George suburbs, including Rockdale and Kogarah, are typically a 10-15 minute drive to Sydney Airport via the M5 or General Holmes Drive, among the shortest airport trip times of any Sydney region.",
    suburbs: ["Hurstville", "Kogarah", "Rockdale", "Beverly Hills", "Peakhurst", "Oatley", "Mortdale", "Penshurst", "Bexley", "Carlton"],
    services: [
      { icon: "✈️", title: "Sydney Airport Transfers", description: "One of the shortest airport trip times in Sydney", href: "/sydney-airport-transfers/" },
      { icon: "🚢", title: "Cruise Terminal Transfers", description: "Quick access to the city's cruise terminals", href: "/cruise-terminal-transfers-sydney/" },
      { icon: "♿", title: "Wheelchair Taxi", description: "Accessible transport near Kogarah's medical precinct", href: "/wheelchair-taxi-sydney/" },
      { icon: "🚐", title: "7 Seater Taxi", description: "Families and small groups", href: "/7-seater-taxi-sydney/" },
    ],
    nearbyRegions: ["sutherland-shire", "eastern-suburbs", "south-west-sydney"],
    faqs: [
      { question: "How close is Hurstville to Sydney Airport?", answer: "Very close - typically a 10-15 minute drive via the M5 or General Holmes Drive, making St George one of the fastest airport transfer regions in Sydney." },
      { question: "Do you provide accessible transport near Kogarah hospital?", answer: "Yes, we offer wheelchair-accessible vehicles for medical appointments and hospital transfers around the Kogarah precinct, pre-bookable in advance." },
    ],
  },
  {
    slug: "sutherland-shire",
    name: "Sutherland Shire",
    metaTitle: "Maxi Taxi Sutherland Shire Sydney | Cronulla, Sutherland, Miranda",
    metaDescription:
      "Maxi taxi and Sydney Airport transfers for the Sutherland Shire including Cronulla, Sutherland, Miranda and Caringbah. 7 & 11 seater vehicles, 24/7 booking.",
    heroDescription: "Maxi taxi and airport transfer service for Cronulla, Sutherland, Miranda, Caringbah and the wider Sutherland Shire.",
    image: "/images/cruise-transfer-sydney.webp",
    intro: [
      "The Sutherland Shire takes in Cronulla's beaches, the Sutherland and Miranda commercial centres, and acts as Sydney's southern gateway to the Royal National Park.",
      "TipTop Maxi Sydney serves this region for airport transfers, family and group travel, and beachside wedding and event transport, with most trips heading north via the Princes Highway or Southern Cross Drive.",
    ],
    airportInfo:
      "Sydney Airport is typically 25-35 minutes from Sutherland or Miranda via the Princes Highway/A1 or Southern Cross Drive, and somewhat longer from Cronulla depending on traffic.",
    suburbs: ["Cronulla", "Sutherland", "Miranda", "Caringbah", "Menai", "Engadine", "Gymea", "Woolooware", "Kirrawee", "Sylvania"],
    services: [
      { icon: "✈️", title: "Sydney Airport Transfers", description: "Transfers via the Princes Highway or Southern Cross Drive", href: "/sydney-airport-transfers/" },
      { icon: "🚗", title: "Long Distance Taxi", description: "Royal National Park and South Coast transfers", href: "/long-distance-taxi-sydney/" },
      { icon: "💍", title: "Wedding Transport", description: "Cronulla beachside wedding and event venues", href: "/wedding-transport-sydney/" },
      { icon: "👨‍👩‍👧‍👦", title: "Family Taxi", description: "Family travel across the Shire", href: "/family-taxi-sydney/" },
    ],
    nearbyRegions: ["st-george", "south-west-sydney"],
    faqs: [
      { question: "How long does it take from Cronulla to Sydney Airport?", answer: "Typically 30-40 minutes depending on traffic and route. We recommend pre-booking with extra time for early-morning or peak-period flights." },
      { question: "Can you arrange transport toward the Royal National Park or South Coast?", answer: "Yes, we provide longer-distance transfers from the Sutherland Shire toward the Royal National Park and NSW South Coast, subject to availability and advance booking." },
    ],
  },
];

async function run() {
  const payload = await getPayload({ config });
  const getOrUploadMedia = createMediaUploader(payload, publicDir);
  const site = await upsertSite(payload, { name: "Transport Solutions Sydney", key: "transport-solutions", domain: "tiptopmaxisydney.com.au" });

  console.log(`Seeding ${regions.length} regions into locations...`);
  const slugToId = new Map<string, string>();

  for (const r of regions) {
    const imageId = await getOrUploadMedia(r.image, `${r.name} maxi taxi service`);
    const data = {
      site: site.id,
      locationType: "region",
      seoStatus: "approved",
      indexOverride: "none",
      slug: r.slug,
      name: r.name,
      metaTitle: r.metaTitle,
      metaDescription: r.metaDescription,
      heroDescription: r.heroDescription,
      image: imageId,
      intro: r.intro.map((text) => ({ text })),
      airportInfo: r.airportInfo,
      westernAirportInfo: r.westernAirportInfo,
      suburbs: r.suburbs.map((name) => ({ name, note: "Maxi taxi & airport transfers" })),
      services: r.services.map((s) => ({ icon: s.icon, title: s.title, description: s.description, href: s.href })),
      faq: r.faqs,
    };
    const doc = await upsertLocation(payload, site.id as string, r.slug, data);
    slugToId.set(r.slug, doc.id as string);
    console.log(`  location: ${r.slug}`);
  }

  console.log("Resolving nearbyRegions -> nearbyLocations...");
  for (const r of regions) {
    const id = slugToId.get(r.slug);
    if (!id) continue;
    const nearbyIds = r.nearbyRegions.map((slug) => slugToId.get(slug)).filter((v): v is string => Boolean(v));
    await payload.update({ collection: "locations", id, data: { nearbyLocations: nearbyIds } });
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
