/**
 * Adds the first 10 Sydney suburb location pages to the wheelchair site (Parramatta,
 * Westmead, Liverpool, Blacktown, Penrith, Campbelltown, Bankstown, Randwick, Chatswood,
 * Sydney CBD), per the doc's "geographic authority" phase.
 *
 * Built as flat `pages` collection docs (pageType: "location", e.g. /wheelchair-taxi-parramatta/)
 * rather than the separate `Locations` collection + nested /locations/[region]/ route tree
 * that transport-solutions-sydney uses - wheelchair-taxi-sydney's frontend only has
 * single-segment [slug] routing, and the source doc itself asked for exactly this flat URL
 * shape. Reuses the same infrastructure proven in seed-wheelchair-organisations-and-recurring.
 *
 * Each page includes real, verifiable local landmarks (major hospitals/medical precincts,
 * shopping centres, motorways) - no invented statistics or drive-time claims beyond a
 * hedged "typically X-Y minutes, depending on traffic" per the doc's content-quality rule.
 *
 * relatedLinks between two pages in THIS batch use a plain href (not a targetPage
 * relationship) - a circular targetPage graph between new pages caused Payload's
 * depth-based population to hang indefinitely when this was tried for the organisations
 * pages. Links to pre-existing stable pages (hospital-transport-sydney etc.) use targetPage.
 *
 * Seeded as seoStatus: "review", indexOverride: "none" - not indexed until approved.
 *
 * Run with: npm run seed:wheelchair-locations   (from content-hub/)
 * Requires npm run seed:wheelchair to have been run first (creates the site doc).
 * Safe to re-run - existing docs (matched by site+slug) are updated, not duplicated.
 */
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { upsertBySlug, createMediaUploader } from "./seedUtils";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../wheelchair-taxi-sydney/public");

type Feature = { title: string; description: string };
type Faq = { question: string; answer: string };
type RelatedLinkInput = { icon: string; title: string; description: string; targetSlug?: string; href?: string };

type PageInput = {
  slug: string;
  navLabel: string;
  targetKeyword: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  heroDescription: string;
  image: string;
  imageAlt: string;
  intro: string[];
  introItemsIntro?: string;
  introItems?: string[];
  features: Feature[];
  faq: Faq[];
  relatedLinks: RelatedLinkInput[];
};

const pages: PageInput[] = [
  {
    slug: "wheelchair-taxi-parramatta",
    navLabel: "Parramatta",
    targetKeyword: "Wheelchair Taxi Parramatta",
    metaTitle: "Wheelchair Taxi Parramatta | Accessible Transport Service",
    metaDescription: "Wheelchair accessible taxi service for Parramatta, covering Westmead hospitals, NDIS appointments, aged care transfers and Sydney Airport transfers.",
    eyebrow: "Sydney Locations",
    h1: "Wheelchair Taxi Parramatta",
    heroDescription: "Wheelchair accessible taxi transport for Parramatta and the surrounding area, covering appointments, the nearby Westmead medical precinct, and airport transfers.",
    image: "wheelchair-taxi-sydney-banner.webp",
    imageAlt: "Wheelchair accessible taxi service for Parramatta and Western Sydney",
    intro: [
      "Parramatta is Sydney's second CBD, with Parramatta Westfield, the Parramatta River foreshore, Western Sydney University's city campus and CommBank Stadium all within the town centre - and a steady mix of residents, workers, students and event-goers who rely on accessible transport to get around.",
      "Parramatta sits only a few kilometres from the Westmead medical precinct, one of the largest hospital campuses in Sydney, so many of our Parramatta bookings continue on to or from an appointment there. We also regularly cover NDIS appointments, aged care transfers, and Sydney Airport and Western Sydney Airport transfers from Parramatta.",
      "Wherever you're travelling from within Parramatta - the CBD, Harris Park, North Parramatta or nearby - our booking team confirms your wheelchair or mobility equipment details before allocating a suitable vehicle.",
    ],
    introItemsIntro: "In and around Parramatta, we regularly provide:",
    introItems: [
      "Transport to and from the Westmead hospital precinct",
      "NDIS appointment and therapy transport",
      "Aged care and retirement village transfers",
      "Sydney Airport and Western Sydney Airport transfers",
      "Local trips around Parramatta CBD, Harris Park and North Parramatta",
    ],
    features: [
      { title: "Close to Westmead", description: "Parramatta is a short trip from the Westmead medical precinct - we regularly arrange transport between the two." },
      { title: "NDIS & Aged Care Coverage", description: "Eligible NDIS participants, aged care residents and their families can book directly with our team." },
      { title: "Airport Transfers", description: "Wheelchair accessible transfers to Sydney Airport and Western Sydney Airport from Parramatta and surrounds." },
      { title: "Local Knowledge", description: "Our drivers are familiar with Parramatta CBD, the Westfield precinct and surrounding suburbs." },
    ],
    faq: [
      { question: "Do you provide wheelchair taxi transport between Parramatta and Westmead Hospital?", answer: "Yes, this is one of our most regular Parramatta routes given how close the two are." },
      { question: "Can you pick up from Parramatta Westfield or the Parramatta transport interchange?", answer: "Yes, provide your exact pickup point (e.g. a specific entrance or set-down area) when booking." },
      { question: "Do you cover Western Sydney Airport transfers from Parramatta?", answer: "Yes, we arrange wheelchair accessible transfers to both Sydney Airport and Western Sydney Airport from Parramatta." },
      { question: "Can I set up a recurring trip from Parramatta?", answer: "Yes, see our Recurring Wheelchair Transport service for weekly or ongoing bookings." },
    ],
    relatedLinks: [
      { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", targetSlug: "hospital-transport-sydney" },
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "✈️", title: "Wheelchair Taxi Sydney Airport", description: "Accessible transfers to Sydney Airport.", targetSlug: "wheelchair-taxi-airport-sydney" },
      { icon: "📍", title: "Wheelchair Taxi Westmead", description: "Accessible transport for the Westmead medical precinct.", href: "/wheelchair-taxi-westmead/" },
      { icon: "📍", title: "Wheelchair Taxi Blacktown", description: "Accessible transport for Blacktown.", href: "/wheelchair-taxi-blacktown/" },
    ],
  },
  {
    slug: "wheelchair-taxi-westmead",
    navLabel: "Westmead",
    targetKeyword: "Wheelchair Taxi Westmead",
    metaTitle: "Wheelchair Taxi Westmead | Accessible Hospital Transport",
    metaDescription: "Wheelchair accessible taxi service for Westmead, covering Westmead Hospital, the Children's Hospital, Westmead Private and nearby appointments.",
    eyebrow: "Sydney Locations",
    h1: "Wheelchair Taxi Westmead",
    heroDescription: "Wheelchair accessible taxi transport for Westmead, home to one of Sydney's largest hospital and medical research precincts.",
    image: "wheelchair-accessible-ford-transit-custom.jpg",
    imageAlt: "Wheelchair accessible vehicle used for Westmead hospital transport",
    intro: [
      "Westmead is home to one of the largest hospital and medical research precincts in Sydney, including Westmead Hospital, the Children's Hospital at Westmead and Westmead Private Hospital, alongside numerous specialist clinics and allied health providers in the surrounding streets.",
      "Because of this, a large share of our Westmead bookings are patients, families and carers travelling to or from an appointment, admission, or discharge at one of these facilities - often connecting to or from Parramatta, Blacktown or further afield across Western Sydney.",
      "We ask for your wheelchair or mobility equipment details when booking so we can allocate a vehicle suited to hospital pickup zones and any equipment you're travelling with.",
    ],
    introItemsIntro: "Around Westmead, we regularly provide:",
    introItems: [
      "Transport to and from Westmead Hospital, the Children's Hospital at Westmead and Westmead Private",
      "Hospital discharge transport home or to a rehabilitation or aged care facility",
      "Recurring outpatient transport (dialysis, rehabilitation, specialist follow-up)",
      "NDIS appointment transport for participants attending Westmead-based services",
      "Transport connecting Westmead with Parramatta, Blacktown and surrounding suburbs",
    ],
    features: [
      { title: "Hospital Precinct Familiarity", description: "Our drivers are used to the pickup and set-down arrangements around the Westmead hospital campus." },
      { title: "Discharge & Transfer Transport", description: "Book ahead for a hospital discharge or an inter-facility transfer to or from Westmead." },
      { title: "Recurring Outpatient Transport", description: "Set up an ongoing schedule for regular treatment such as dialysis or rehabilitation." },
      { title: "NDIS & Family/Carer Travel", description: "Eligible NDIS participants and accompanying family members or carers are welcome to travel together where vehicle space allows." },
    ],
    faq: [
      { question: "Can you pick up directly from Westmead Hospital or the Children's Hospital at Westmead?", answer: "Yes, let us know which specific entrance or pickup zone you'll be at when booking." },
      { question: "Do you arrange hospital discharge transport from Westmead?", answer: "Yes, contact our team with your discharge timing as early as possible so we can confirm vehicle availability." },
      { question: "Can hospital or clinic staff book transport on a patient's behalf?", answer: "Yes - see our dedicated page for Hospitals & Clinics, which covers booking directly for patients." },
      { question: "Is recurring transport available for regular treatment at Westmead?", answer: "Yes, see our Recurring Wheelchair Transport service for weekly or ongoing outpatient bookings." },
    ],
    relatedLinks: [
      { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", targetSlug: "hospital-transport-sydney" },
      { icon: "🩺", title: "Rehabilitation Transport Sydney", description: "Transport for rehabilitation appointments.", targetSlug: "rehabilitation-transport-sydney" },
      { icon: "🏥", title: "For Hospitals & Clinics", description: "Direct booking option for hospital and clinic staff.", href: "/hospital-referral-transport-sydney/" },
      { icon: "📍", title: "Wheelchair Taxi Parramatta", description: "Accessible transport for Parramatta.", href: "/wheelchair-taxi-parramatta/" },
      { icon: "📍", title: "Wheelchair Taxi Blacktown", description: "Accessible transport for Blacktown.", href: "/wheelchair-taxi-blacktown/" },
    ],
  },
  {
    slug: "wheelchair-taxi-liverpool",
    navLabel: "Liverpool",
    targetKeyword: "Wheelchair Taxi Liverpool",
    metaTitle: "Wheelchair Taxi Liverpool | Accessible Transport Service",
    metaDescription: "Wheelchair accessible taxi service for Liverpool, covering Liverpool Hospital, NDIS appointments, aged care transfers and airport transfers.",
    eyebrow: "Sydney Locations",
    h1: "Wheelchair Taxi Liverpool",
    heroDescription: "Wheelchair accessible taxi transport for Liverpool, a major South Western Sydney hub with its own hospital and university campus.",
    image: "silver-service-wheelchair-taxi.jpg",
    imageAlt: "Wheelchair accessible taxi service for Liverpool and South Western Sydney",
    intro: [
      "Liverpool is one of South Western Sydney's main commercial and medical centres, home to Liverpool Hospital, Westfield Liverpool and a Western Sydney University campus, with growing residential development throughout the area.",
      "Liverpool Hospital is a major regional hospital, so a large part of our Liverpool bookings involve appointments, discharges or transfers to and from it. We also regularly arrange NDIS appointment transport, aged care transfers and airport transfers from Liverpool.",
      "Liverpool is also within reach of Western Sydney Airport as it comes online, and our team can advise on transfer times as operations develop in the area.",
    ],
    introItemsIntro: "In and around Liverpool, we regularly provide:",
    introItems: [
      "Transport to and from Liverpool Hospital",
      "NDIS appointment and community participation transport",
      "Aged care and retirement village transfers",
      "Sydney Airport and Western Sydney Airport transfers",
      "Local trips around Liverpool CBD and surrounding suburbs",
    ],
    features: [
      { title: "Liverpool Hospital Transport", description: "We regularly arrange appointment, discharge and transfer transport to and from Liverpool Hospital." },
      { title: "NDIS & Aged Care Coverage", description: "Eligible NDIS participants, aged care residents and their families can book directly with our team." },
      { title: "Airport Transfers", description: "Accessible transfers to Sydney Airport and Western Sydney Airport from Liverpool." },
      { title: "Recurring Transport", description: "Set up an ongoing schedule for regular appointments or programs in Liverpool." },
    ],
    faq: [
      { question: "Do you provide wheelchair taxi transport to Liverpool Hospital?", answer: "Yes, this is one of our regular Liverpool routes for appointments, discharges and transfers." },
      { question: "Can you pick up from Westfield Liverpool or the train station?", answer: "Yes, provide your exact pickup point when booking." },
      { question: "Do you cover Western Sydney Airport transfers from Liverpool?", answer: "Yes, contact our team for the latest transfer information as Western Sydney Airport operations develop." },
      { question: "Can our organisation set up recurring transport for clients in Liverpool?", answer: "Yes - see our Organisations page and Recurring Wheelchair Transport service." },
    ],
    relatedLinks: [
      { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", targetSlug: "hospital-transport-sydney" },
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "✈️", title: "Wheelchair Taxi Sydney Airport", description: "Accessible transfers to Sydney Airport.", targetSlug: "wheelchair-taxi-airport-sydney" },
      { icon: "📍", title: "Wheelchair Taxi Campbelltown", description: "Accessible transport for Campbelltown.", href: "/wheelchair-taxi-campbelltown/" },
      { icon: "📍", title: "Wheelchair Taxi Bankstown", description: "Accessible transport for Bankstown.", href: "/wheelchair-taxi-bankstown/" },
    ],
  },
  {
    slug: "wheelchair-taxi-blacktown",
    navLabel: "Blacktown",
    targetKeyword: "Wheelchair Taxi Blacktown",
    metaTitle: "Wheelchair Taxi Blacktown | Accessible Transport Service",
    metaDescription: "Wheelchair accessible taxi service for Blacktown, covering Blacktown Hospital, NDIS appointments, aged care transfers and airport transfers.",
    eyebrow: "Sydney Locations",
    h1: "Wheelchair Taxi Blacktown",
    heroDescription: "Wheelchair accessible taxi transport for Blacktown and surrounding Western Sydney suburbs.",
    image: "maxi-van.png",
    imageAlt: "Wheelchair accessible vehicle for Blacktown and Western Sydney transport",
    intro: [
      "Blacktown is one of the fastest-growing areas of Western Sydney, with Blacktown Hospital, Westpoint Blacktown shopping centre and a large and expanding residential population.",
      "We regularly arrange wheelchair accessible transport to and from Blacktown Hospital, along with NDIS appointment transport, aged care transfers and trips connecting Blacktown with Parramatta, Westmead and other Western Sydney suburbs.",
      "Blacktown's position along the M7 and close to the growing Western Sydney Airport catchment makes it a common starting point for both local appointments and longer transfers.",
    ],
    introItemsIntro: "In and around Blacktown, we regularly provide:",
    introItems: [
      "Transport to and from Blacktown Hospital",
      "NDIS appointment and therapy transport",
      "Aged care and retirement village transfers",
      "Sydney Airport and Western Sydney Airport transfers",
      "Local trips around Blacktown CBD and surrounding suburbs",
    ],
    features: [
      { title: "Blacktown Hospital Transport", description: "Appointment, discharge and transfer transport to and from Blacktown Hospital." },
      { title: "NDIS & Aged Care Coverage", description: "Eligible NDIS participants, aged care residents and their families can book directly with our team." },
      { title: "Airport Transfers", description: "Accessible transfers to Sydney Airport and Western Sydney Airport from Blacktown." },
      { title: "Connects Western Sydney", description: "Regular trips connecting Blacktown with Parramatta, Westmead and Penrith." },
    ],
    faq: [
      { question: "Do you provide wheelchair taxi transport to Blacktown Hospital?", answer: "Yes, this is one of our regular Blacktown routes." },
      { question: "Can you pick up from Westpoint Blacktown?", answer: "Yes, provide your exact pickup point when booking." },
      { question: "Do you cover Western Sydney Airport transfers from Blacktown?", answer: "Yes, contact our team for current transfer arrangements." },
      { question: "Can I set up recurring transport from Blacktown?", answer: "Yes, see our Recurring Wheelchair Transport service." },
    ],
    relatedLinks: [
      { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", targetSlug: "hospital-transport-sydney" },
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "✈️", title: "Wheelchair Taxi Sydney Airport", description: "Accessible transfers to Sydney Airport.", targetSlug: "wheelchair-taxi-airport-sydney" },
      { icon: "📍", title: "Wheelchair Taxi Parramatta", description: "Accessible transport for Parramatta.", href: "/wheelchair-taxi-parramatta/" },
      { icon: "📍", title: "Wheelchair Taxi Penrith", description: "Accessible transport for Penrith.", href: "/wheelchair-taxi-penrith/" },
    ],
  },
  {
    slug: "wheelchair-taxi-penrith",
    navLabel: "Penrith",
    targetKeyword: "Wheelchair Taxi Penrith",
    metaTitle: "Wheelchair Taxi Penrith | Accessible Transport Service",
    metaDescription: "Wheelchair accessible taxi service for Penrith, covering Nepean Hospital, NDIS appointments, aged care transfers and Western Sydney Airport.",
    eyebrow: "Sydney Locations",
    h1: "Wheelchair Taxi Penrith",
    heroDescription: "Wheelchair accessible taxi transport for Penrith, at the gateway between Western Sydney and the Blue Mountains.",
    image: "wheelchair-taxi-sydney.jpg",
    imageAlt: "Wheelchair accessible taxi service for Penrith",
    intro: [
      "Penrith sits at the western edge of the Sydney metropolitan area, with Nepean Hospital, Westfield Penrith and a large catchment stretching towards the Blue Mountains, alongside growing residential areas closer to the new Western Sydney International Airport site at Badgerys Creek.",
      "We regularly arrange wheelchair accessible transport to and from Nepean Hospital, NDIS appointment transport, aged care transfers, and trips connecting Penrith with Blacktown, Liverpool and the wider Western Sydney region.",
      "As Western Sydney Airport comes online, Penrith is one of the closer catchment suburbs, and our team can advise on transfer arrangements as they develop.",
    ],
    introItemsIntro: "In and around Penrith, we regularly provide:",
    introItems: [
      "Transport to and from Nepean Hospital",
      "NDIS appointment and therapy transport",
      "Aged care and retirement village transfers",
      "Western Sydney Airport and Sydney Airport transfers",
      "Local trips around Penrith CBD and surrounding suburbs",
    ],
    features: [
      { title: "Nepean Hospital Transport", description: "Appointment, discharge and transfer transport to and from Nepean Hospital." },
      { title: "NDIS & Aged Care Coverage", description: "Eligible NDIS participants, aged care residents and their families can book directly with our team." },
      { title: "Western Sydney Airport Ready", description: "Penrith is one of the closer suburbs to the new Western Sydney Airport - ask us about current transfer arrangements." },
      { title: "Recurring Transport", description: "Set up an ongoing schedule for regular appointments or programs in Penrith." },
    ],
    faq: [
      { question: "Do you provide wheelchair taxi transport to Nepean Hospital?", answer: "Yes, this is one of our regular Penrith routes." },
      { question: "How far is Penrith from Western Sydney Airport?", answer: "Penrith is one of the closer catchment suburbs to the new airport site at Badgerys Creek - contact our team for current transfer information as operations develop." },
      { question: "Can you pick up from Westfield Penrith?", answer: "Yes, provide your exact pickup point when booking." },
      { question: "Can I set up recurring transport from Penrith?", answer: "Yes, see our Recurring Wheelchair Transport service." },
    ],
    relatedLinks: [
      { icon: "✈️", title: "Wheelchair Taxi Sydney Airport", description: "Accessible transfers to Sydney Airport.", targetSlug: "wheelchair-taxi-airport-sydney" },
      { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", targetSlug: "hospital-transport-sydney" },
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "📍", title: "Wheelchair Taxi Blacktown", description: "Accessible transport for Blacktown.", href: "/wheelchair-taxi-blacktown/" },
    ],
  },
  {
    slug: "wheelchair-taxi-campbelltown",
    navLabel: "Campbelltown",
    targetKeyword: "Wheelchair Taxi Campbelltown",
    metaTitle: "Wheelchair Taxi Campbelltown | Accessible Transport Service",
    metaDescription: "Wheelchair accessible taxi service for Campbelltown, covering Campbelltown Hospital, NDIS appointments, aged care transfers and airport transfers.",
    eyebrow: "Sydney Locations",
    h1: "Wheelchair Taxi Campbelltown",
    heroDescription: "Wheelchair accessible taxi transport for Campbelltown and the wider Macarthur region.",
    image: "best-wheelchair-taxi-service-sydney.webp",
    imageAlt: "Wheelchair accessible taxi service for Campbelltown and the Macarthur region",
    intro: [
      "Campbelltown is the commercial hub of the Macarthur region, home to Campbelltown Hospital, Macarthur Square shopping centre and a Western Sydney University campus, serving a wide catchment across South Western Sydney.",
      "We regularly arrange wheelchair accessible transport to and from Campbelltown Hospital, NDIS appointment and community participation transport, and aged care transfers for residents across the Macarthur area.",
      "Campbelltown also connects well to Liverpool and Bankstown, and we regularly arrange transport between these South Western Sydney hubs.",
    ],
    introItemsIntro: "In and around Campbelltown, we regularly provide:",
    introItems: [
      "Transport to and from Campbelltown Hospital",
      "NDIS appointment and community participation transport",
      "Aged care and retirement village transfers",
      "Sydney Airport transfers",
      "Local trips around Campbelltown, Macarthur Square and surrounding suburbs",
    ],
    features: [
      { title: "Campbelltown Hospital Transport", description: "Appointment, discharge and transfer transport to and from Campbelltown Hospital." },
      { title: "NDIS & Aged Care Coverage", description: "Eligible NDIS participants, aged care residents and their families can book directly with our team." },
      { title: "Macarthur Region Coverage", description: "Regular trips across Campbelltown, Liverpool and the wider Macarthur area." },
      { title: "Recurring Transport", description: "Set up an ongoing schedule for regular appointments or community programs." },
    ],
    faq: [
      { question: "Do you provide wheelchair taxi transport to Campbelltown Hospital?", answer: "Yes, this is one of our regular Campbelltown routes." },
      { question: "Can you pick up from Macarthur Square?", answer: "Yes, provide your exact pickup point when booking." },
      { question: "Do you cover aged care facilities in the Macarthur region?", answer: "Yes, see our Aged Care Transport Sydney service and our dedicated page for aged care providers." },
      { question: "Can I set up recurring transport from Campbelltown?", answer: "Yes, see our Recurring Wheelchair Transport service." },
    ],
    relatedLinks: [
      { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", targetSlug: "hospital-transport-sydney" },
      { icon: "🧓", title: "Aged Care Transport Sydney", description: "Wheelchair transport for aged care residents.", targetSlug: "aged-care-transport-sydney" },
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "📍", title: "Wheelchair Taxi Liverpool", description: "Accessible transport for Liverpool.", href: "/wheelchair-taxi-liverpool/" },
      { icon: "📍", title: "Wheelchair Taxi Bankstown", description: "Accessible transport for Bankstown.", href: "/wheelchair-taxi-bankstown/" },
    ],
  },
  {
    slug: "wheelchair-taxi-bankstown",
    navLabel: "Bankstown",
    targetKeyword: "Wheelchair Taxi Bankstown",
    metaTitle: "Wheelchair Taxi Bankstown | Accessible Transport Service",
    metaDescription: "Wheelchair accessible taxi service for Bankstown, covering Bankstown Hospital, NDIS appointments, aged care transfers and airport transfers.",
    eyebrow: "Sydney Locations",
    h1: "Wheelchair Taxi Bankstown",
    heroDescription: "Wheelchair accessible taxi transport for Bankstown and surrounding South Western Sydney suburbs.",
    image: "benefits-of-disabled-taxi-sydney.webp",
    imageAlt: "Wheelchair accessible taxi service for Bankstown",
    intro: [
      "Bankstown is a major South Western Sydney centre, home to Bankstown Hospital and Bankstown Central shopping centre, with good access to the M5 motorway connecting toward the CBD and Sydney Airport.",
      "We regularly arrange wheelchair accessible transport to and from Bankstown Hospital, NDIS appointment transport, aged care transfers, and airport transfers from Bankstown.",
      "Bankstown also connects well to Liverpool and Campbelltown, and we regularly arrange trips between these South Western Sydney suburbs.",
    ],
    introItemsIntro: "In and around Bankstown, we regularly provide:",
    introItems: [
      "Transport to and from Bankstown Hospital",
      "NDIS appointment and therapy transport",
      "Aged care and retirement village transfers",
      "Sydney Airport transfers",
      "Local trips around Bankstown Central and surrounding suburbs",
    ],
    features: [
      { title: "Bankstown Hospital Transport", description: "Appointment, discharge and transfer transport to and from Bankstown Hospital." },
      { title: "NDIS & Aged Care Coverage", description: "Eligible NDIS participants, aged care residents and their families can book directly with our team." },
      { title: "Airport Transfers", description: "Bankstown's position near the M5 makes for a straightforward transfer to Sydney Airport." },
      { title: "South Western Sydney Coverage", description: "Regular trips connecting Bankstown with Liverpool and Campbelltown." },
    ],
    faq: [
      { question: "Do you provide wheelchair taxi transport to Bankstown Hospital?", answer: "Yes, this is one of our regular Bankstown routes." },
      { question: "Can you pick up from Bankstown Central?", answer: "Yes, provide your exact pickup point when booking." },
      { question: "How far is Bankstown from Sydney Airport?", answer: "Typically a straightforward trip via the M5, though we recommend pre-booking with extra buffer time for peak-hour traffic." },
      { question: "Can I set up recurring transport from Bankstown?", answer: "Yes, see our Recurring Wheelchair Transport service." },
    ],
    relatedLinks: [
      { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", targetSlug: "hospital-transport-sydney" },
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "🧓", title: "Aged Care Transport Sydney", description: "Wheelchair transport for aged care residents.", targetSlug: "aged-care-transport-sydney" },
      { icon: "📍", title: "Wheelchair Taxi Liverpool", description: "Accessible transport for Liverpool.", href: "/wheelchair-taxi-liverpool/" },
      { icon: "📍", title: "Wheelchair Taxi Campbelltown", description: "Accessible transport for Campbelltown.", href: "/wheelchair-taxi-campbelltown/" },
    ],
  },
  {
    slug: "wheelchair-taxi-randwick",
    navLabel: "Randwick",
    targetKeyword: "Wheelchair Taxi Randwick",
    metaTitle: "Wheelchair Taxi Randwick | Accessible Hospital Transport",
    metaDescription: "Wheelchair accessible taxi service for Randwick, covering the Randwick health precinct, NDIS appointments, aged care transfers and Sydney Airport.",
    eyebrow: "Sydney Locations",
    h1: "Wheelchair Taxi Randwick",
    heroDescription: "Wheelchair accessible taxi transport for Randwick, home to one of Sydney's major eastern suburbs medical precincts.",
    image: "wheelchair-taxi-sydney-banner.webp",
    imageAlt: "Wheelchair accessible taxi service for the Randwick health precinct",
    intro: [
      "Randwick hosts one of Sydney's major medical precincts, including Prince of Wales Hospital, Sydney Children's Hospital and the Royal Hospital for Women, alongside UNSW and the Randwick Racecourse precinct.",
      "A large share of our Randwick bookings are patients, families and carers travelling to or from an appointment, admission or discharge at one of these hospitals. We also regularly arrange NDIS appointment transport and Sydney Airport transfers, which are a relatively short trip from Randwick.",
      "We ask for your wheelchair or mobility equipment details when booking so we can allocate a vehicle suited to hospital pickup zones in the precinct.",
    ],
    introItemsIntro: "Around Randwick, we regularly provide:",
    introItems: [
      "Transport to and from Prince of Wales Hospital, Sydney Children's Hospital and the Royal Hospital for Women",
      "Hospital discharge and inter-facility transfer transport",
      "Recurring outpatient transport for regular treatment",
      "NDIS appointment transport",
      "Sydney Airport transfers",
    ],
    features: [
      { title: "Randwick Health Precinct Familiarity", description: "Our drivers are used to the pickup and set-down arrangements around the Randwick hospital campus." },
      { title: "Discharge & Transfer Transport", description: "Book ahead for a hospital discharge or an inter-facility transfer to or from Randwick." },
      { title: "Airport Transfers", description: "Randwick is a relatively short, straightforward trip to Sydney Airport." },
      { title: "Recurring Outpatient Transport", description: "Set up an ongoing schedule for regular treatment such as dialysis or rehabilitation." },
    ],
    faq: [
      { question: "Can you pick up directly from Prince of Wales Hospital or Sydney Children's Hospital?", answer: "Yes, let us know which specific entrance or pickup zone you'll be at when booking." },
      { question: "Do you arrange hospital discharge transport from Randwick?", answer: "Yes, contact our team with your discharge timing as early as possible so we can confirm vehicle availability." },
      { question: "How far is Randwick from Sydney Airport?", answer: "A relatively short trip - we recommend pre-booking with extra buffer time for peak-hour traffic." },
      { question: "Is recurring transport available for regular treatment at Randwick?", answer: "Yes, see our Recurring Wheelchair Transport service." },
    ],
    relatedLinks: [
      { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", targetSlug: "hospital-transport-sydney" },
      { icon: "✈️", title: "Wheelchair Taxi Sydney Airport", description: "Accessible transfers to Sydney Airport.", targetSlug: "wheelchair-taxi-airport-sydney" },
      { icon: "🏥", title: "For Hospitals & Clinics", description: "Direct booking option for hospital and clinic staff.", href: "/hospital-referral-transport-sydney/" },
      { icon: "📍", title: "Wheelchair Taxi Sydney CBD", description: "Accessible transport for the Sydney CBD.", href: "/wheelchair-taxi-sydney-cbd/" },
    ],
  },
  {
    slug: "wheelchair-taxi-chatswood",
    navLabel: "Chatswood",
    targetKeyword: "Wheelchair Taxi Chatswood",
    metaTitle: "Wheelchair Taxi Chatswood | Accessible Transport Service",
    metaDescription: "Wheelchair accessible taxi service for Chatswood and the North Shore, covering NDIS appointments, aged care transfers and Sydney Airport.",
    eyebrow: "Sydney Locations",
    h1: "Wheelchair Taxi Chatswood",
    heroDescription: "Wheelchair accessible taxi transport for Chatswood and the wider North Shore.",
    image: "silver-service-wheelchair-taxi.jpg",
    imageAlt: "Wheelchair accessible taxi service for Chatswood and the North Shore",
    intro: [
      "Chatswood is the commercial hub of Sydney's Lower North Shore, with Westfield Chatswood and Chatswood Chase, a major transport interchange, and a dense mix of residential and business activity.",
      "We regularly arrange wheelchair accessible transport for local appointments, NDIS appointment transport, and Sydney Airport transfers from Chatswood, along with aged care and retirement village transfers across the North Shore.",
      "Chatswood is also within reach of the Royal North Shore Hospital precinct in nearby St Leonards, and we regularly arrange transport between the two.",
    ],
    introItemsIntro: "In and around Chatswood, we regularly provide:",
    introItems: [
      "Local appointment and therapy transport",
      "Transport to and from the Royal North Shore Hospital precinct",
      "NDIS appointment transport",
      "Aged care and retirement village transfers",
      "Sydney Airport transfers",
    ],
    features: [
      { title: "North Shore Coverage", description: "Regular transport across Chatswood and the wider Lower North Shore." },
      { title: "Royal North Shore Hospital Access", description: "We regularly arrange transport between Chatswood and the nearby Royal North Shore Hospital precinct." },
      { title: "NDIS & Aged Care Coverage", description: "Eligible NDIS participants, aged care residents and their families can book directly with our team." },
      { title: "Airport Transfers", description: "Accessible transfers to Sydney Airport from Chatswood." },
    ],
    faq: [
      { question: "Can you pick up from Westfield Chatswood or the Chatswood interchange?", answer: "Yes, provide your exact pickup point when booking." },
      { question: "Do you cover transport to Royal North Shore Hospital?", answer: "Yes, this is a regular route between Chatswood and the nearby St Leonards medical precinct." },
      { question: "Do you arrange Sydney Airport transfers from Chatswood?", answer: "Yes, contact our team to book, with extra buffer time recommended for peak-hour traffic." },
      { question: "Can I set up recurring transport from Chatswood?", answer: "Yes, see our Recurring Wheelchair Transport service." },
    ],
    relatedLinks: [
      { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", targetSlug: "hospital-transport-sydney" },
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "✈️", title: "Wheelchair Taxi Sydney Airport", description: "Accessible transfers to Sydney Airport.", targetSlug: "wheelchair-taxi-airport-sydney" },
      { icon: "📍", title: "Wheelchair Taxi Sydney CBD", description: "Accessible transport for the Sydney CBD.", href: "/wheelchair-taxi-sydney-cbd/" },
    ],
  },
  {
    slug: "wheelchair-taxi-sydney-cbd",
    navLabel: "Sydney CBD",
    targetKeyword: "Wheelchair Taxi Sydney CBD",
    metaTitle: "Wheelchair Taxi Sydney CBD | Accessible Transport Service",
    metaDescription: "Wheelchair accessible taxi service for the Sydney CBD, covering hotels, hospitals, business appointments and Sydney Airport transfers.",
    eyebrow: "Sydney Locations",
    h1: "Wheelchair Taxi Sydney CBD",
    heroDescription: "Wheelchair accessible taxi transport for the Sydney CBD, covering hotels, offices, appointments and Sydney Airport transfers.",
    image: "accessible-van-assistance.webp",
    imageAlt: "Wheelchair accessible taxi service for the Sydney CBD",
    intro: [
      "The Sydney CBD is a dense mix of hotels, offices, retail, entertainment venues and public transport interchanges around Central Station and Circular Quay, with a steady stream of business travellers, tourists and residents who need accessible transport.",
      "We regularly arrange wheelchair accessible transport for hotel pickups and drop-offs, business appointments, and connections to and from Sydney Airport, along with transport to nearby hospitals such as Royal Prince Alfred Hospital in Camperdown and St Vincent's Hospital in Darlinghurst.",
      "Given the CBD's traffic and one-way streets, we recommend confirming your exact pickup location (hotel entrance, building lobby or set-down zone) when booking.",
    ],
    introItemsIntro: "In the Sydney CBD, we regularly provide:",
    introItems: [
      "Hotel pickups and drop-offs for visitors and business travellers",
      "Transport to nearby hospitals including Royal Prince Alfred and St Vincent's",
      "Business and appointment transport",
      "Sydney Airport transfers",
      "NDIS appointment transport for participants working or attending appointments in the CBD",
    ],
    features: [
      { title: "Hotel & Business Pickups", description: "We regularly arrange accessible transport for hotel guests and business travellers in the CBD." },
      { title: "Nearby Hospital Access", description: "Transport to and from Royal Prince Alfred Hospital, St Vincent's Hospital and other inner-city medical facilities." },
      { title: "Airport Transfers", description: "Accessible transfers between the Sydney CBD and Sydney Airport." },
      { title: "Traffic-Aware Booking", description: "We factor in CBD traffic and one-way streets when confirming pickup and set-down arrangements." },
    ],
    faq: [
      { question: "Can you pick up from a hotel in the Sydney CBD?", answer: "Yes, provide the hotel name and entrance/set-down point when booking." },
      { question: "Do you provide transport to Royal Prince Alfred or St Vincent's Hospital?", answer: "Yes, these are regular routes from the CBD given their proximity." },
      { question: "How long does it take to get from the CBD to Sydney Airport?", answer: "This varies with traffic - we recommend pre-booking with extra buffer time, especially at peak hour." },
      { question: "Can a support coordinator or plan manager book CBD transport for a client?", answer: "Yes - see our Organisations page for support coordinators and plan managers." },
    ],
    relatedLinks: [
      { icon: "✈️", title: "Wheelchair Taxi Sydney Airport", description: "Accessible transfers to Sydney Airport.", targetSlug: "wheelchair-taxi-airport-sydney" },
      { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", targetSlug: "hospital-transport-sydney" },
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "📍", title: "Wheelchair Taxi Randwick", description: "Accessible transport for Randwick.", href: "/wheelchair-taxi-randwick/" },
      { icon: "📍", title: "Wheelchair Taxi Chatswood", description: "Accessible transport for Chatswood.", href: "/wheelchair-taxi-chatswood/" },
    ],
  },
];

async function run() {
  const payload = await getPayload({ config });
  const getOrUploadMedia = createMediaUploader(payload, publicDir);
  const site = await payload.find({ collection: "sites", where: { key: { equals: "wheelchair" } }, limit: 1 });
  const siteId = site.docs[0]?.id;
  if (!siteId) throw new Error('Site "wheelchair" not found - run npm run seed:wheelchair first.');

  console.log(`Pass 1: upserting ${pages.length} location pages (seoStatus: review, no relatedLinks yet)...`);
  for (const p of pages) {
    const imageId = await getOrUploadMedia(`/images/${p.image}`, p.imageAlt);
    const data = {
      site: siteId,
      pageType: "location" as const,
      seoStatus: "review" as const,
      indexOverride: "none" as const,
      targetKeyword: p.targetKeyword,
      slug: p.slug,
      navLabel: p.navLabel,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      eyebrow: p.eyebrow,
      h1: p.h1,
      heroDescription: p.heroDescription,
      image: imageId,
      intro: p.intro.map((text) => ({ text })),
      introItemsIntro: p.introItemsIntro,
      introItems: (p.introItems ?? []).map((text) => ({ text })),
      features: p.features,
      faq: p.faq,
    };
    await upsertBySlug(payload, "pages", siteId as string, p.slug, data);
    console.log(`  page: ${p.slug}`);
  }

  console.log("Pass 2: resolving relatedLinks (plain href between pages in this batch, targetPage for pre-existing pages)...");
  for (const p of pages) {
    if (p.relatedLinks.length === 0) continue;

    const resolvedLinks = [];
    for (const link of p.relatedLinks) {
      if (link.targetSlug) {
        const target = await payload.find({
          collection: "pages",
          where: { and: [{ site: { equals: siteId } }, { slug: { equals: link.targetSlug } }] },
          limit: 1,
        });
        const targetId = target.docs[0]?.id;
        if (!targetId) {
          console.warn(`  SKIP link "${link.title}" on ${p.slug}: target page "${link.targetSlug}" not found.`);
          continue;
        }
        resolvedLinks.push({ icon: link.icon, title: link.title, description: link.description, targetPage: targetId });
      } else {
        resolvedLinks.push({ icon: link.icon, title: link.title, description: link.description, href: link.href });
      }
    }

    const current = await payload.find({
      collection: "pages",
      where: { and: [{ site: { equals: siteId } }, { slug: { equals: p.slug } }] },
      limit: 1,
    });
    const pageId = current.docs[0]?.id;
    if (!pageId) continue;

    await payload.update({ collection: "pages", id: pageId, data: { relatedLinks: resolvedLinks } });
    console.log(`  relatedLinks resolved: ${p.slug} (${resolvedLinks.length} links)`);
  }

  console.log("Done. All 10 location pages are seoStatus: review - not indexed until approved in the CMS.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
