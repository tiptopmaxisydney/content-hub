/**
 * Tier 2 suburb pages for the wheelchair site: Hurstville, Ryde, Strathfield, Hornsby,
 * Castle Hill, Kellyville, Bondi, Sutherland, Burwood, Fairfield. Same conventions as
 * seed-wheelchair-locations-2026-09.ts (Tier 1) - flat `pages` collection docs, real local
 * landmarks, plain href between pages in this batch/Tier 1 (never targetPage, to avoid the
 * relationship-depth hang bug), targetPage only for pre-existing stable service pages.
 *
 * Seeded as seoStatus: "review", indexOverride: "none" - not indexed until approved.
 *
 * Run with: npm run seed:wheelchair-locations-tier2   (from content-hub/)
 * Requires npm run seed:wheelchair-locations (Tier 1) to have been run first, since several
 * relatedLinks here point to Tier 1 suburb slugs via href.
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
    slug: "wheelchair-taxi-hurstville",
    navLabel: "Hurstville",
    targetKeyword: "Wheelchair Taxi Hurstville",
    metaTitle: "Wheelchair Taxi Hurstville | Accessible Transport Service",
    metaDescription: "Wheelchair accessible taxi service for Hurstville and the St George region, covering St George Hospital, NDIS appointments and Sydney Airport transfers.",
    eyebrow: "Sydney Locations",
    h1: "Wheelchair Taxi Hurstville",
    heroDescription: "Wheelchair accessible taxi transport for Hurstville, the commercial hub of Sydney's St George region.",
    image: "organisations-and-customers-we-assist.webp",
    imageAlt: "Wheelchair accessible taxi service for Hurstville and the St George region",
    intro: [
      "Hurstville is the commercial centre of the St George region, with Hurstville Westfield, a busy train interchange and a growing residential population, and sits close to St George Hospital in nearby Kogarah.",
      "We regularly arrange wheelchair accessible transport to and from St George Hospital, NDIS appointment transport, aged care transfers, and Sydney Airport transfers, which are a relatively short trip from Hurstville.",
    ],
    introItemsIntro: "In and around Hurstville, we regularly provide:",
    introItems: [
      "Transport to and from St George Hospital in Kogarah",
      "NDIS appointment and therapy transport",
      "Aged care and retirement village transfers",
      "Sydney Airport transfers",
      "Local trips around Hurstville Westfield and the surrounding St George area",
    ],
    features: [
      { title: "St George Hospital Transport", description: "Appointment, discharge and transfer transport to and from St George Hospital in Kogarah." },
      { title: "NDIS & Aged Care Coverage", description: "Eligible NDIS participants, aged care residents and their families can book directly with our team." },
      { title: "Short Airport Transfer", description: "Hurstville is one of the closer suburbs to Sydney Airport - typically a short trip via the M5 or General Holmes Drive." },
      { title: "Recurring Transport", description: "Set up an ongoing schedule for regular appointments in the St George region." },
    ],
    faq: [
      { question: "Do you provide wheelchair taxi transport to St George Hospital?", answer: "Yes, this is one of our regular Hurstville routes." },
      { question: "Can you pick up from Hurstville Westfield or the train station?", answer: "Yes, provide your exact pickup point when booking." },
      { question: "How far is Hurstville from Sydney Airport?", answer: "Typically a short trip via the M5 or General Holmes Drive - we still recommend pre-booking with extra buffer time." },
      { question: "Can I set up recurring transport from Hurstville?", answer: "Yes, see our Recurring Wheelchair Transport service." },
    ],
    relatedLinks: [
      { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", targetSlug: "hospital-transport-sydney" },
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "✈️", title: "Wheelchair Taxi Sydney Airport", description: "Accessible transfers to Sydney Airport.", targetSlug: "wheelchair-taxi-airport-sydney" },
      { icon: "📍", title: "Wheelchair Taxi Sutherland", description: "Accessible transport for Sutherland.", href: "/wheelchair-taxi-sutherland/" },
    ],
  },
  {
    slug: "wheelchair-taxi-ryde",
    navLabel: "Ryde",
    targetKeyword: "Wheelchair Taxi Ryde",
    metaTitle: "Wheelchair Taxi Ryde | Accessible Transport Service",
    metaDescription: "Wheelchair accessible taxi service for Ryde, covering Ryde Hospital, NDIS appointments, aged care transfers and Sydney Airport transfers.",
    eyebrow: "Sydney Locations",
    h1: "Wheelchair Taxi Ryde",
    heroDescription: "Wheelchair accessible taxi transport for Ryde and the surrounding Macquarie Park area.",
    image: "wheelchair-taxi-booking.png",
    imageAlt: "Wheelchair accessible taxi service for Ryde and Macquarie Park",
    intro: [
      "Ryde sits between the Lane Cove and Parramatta River, close to Macquarie Park, Macquarie University and Top Ryde shopping centre, with Ryde Hospital serving the local area.",
      "We regularly arrange wheelchair accessible transport to and from Ryde Hospital, NDIS appointment transport, aged care transfers, and trips connecting Ryde with Chatswood and other North Shore suburbs.",
    ],
    introItemsIntro: "In and around Ryde, we regularly provide:",
    introItems: [
      "Transport to and from Ryde Hospital",
      "NDIS appointment and therapy transport",
      "Aged care and retirement village transfers",
      "Sydney Airport transfers",
      "Local trips around Top Ryde and Macquarie Park",
    ],
    features: [
      { title: "Ryde Hospital Transport", description: "Appointment, discharge and transfer transport to and from Ryde Hospital." },
      { title: "NDIS & Aged Care Coverage", description: "Eligible NDIS participants, aged care residents and their families can book directly with our team." },
      { title: "North Shore Connections", description: "Regular trips connecting Ryde with Chatswood and surrounding North Shore suburbs." },
      { title: "Recurring Transport", description: "Set up an ongoing schedule for regular appointments in Ryde." },
    ],
    faq: [
      { question: "Do you provide wheelchair taxi transport to Ryde Hospital?", answer: "Yes, this is one of our regular Ryde routes." },
      { question: "Can you pick up from Top Ryde or Macquarie Park?", answer: "Yes, provide your exact pickup point when booking." },
      { question: "Do you cover trips between Ryde and Chatswood?", answer: "Yes, this is a regular route across the North Shore." },
      { question: "Can I set up recurring transport from Ryde?", answer: "Yes, see our Recurring Wheelchair Transport service." },
    ],
    relatedLinks: [
      { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", targetSlug: "hospital-transport-sydney" },
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "📍", title: "Wheelchair Taxi Chatswood", description: "Accessible transport for Chatswood.", href: "/wheelchair-taxi-chatswood/" },
      { icon: "📍", title: "Wheelchair Taxi Strathfield", description: "Accessible transport for Strathfield.", href: "/wheelchair-taxi-strathfield/" },
    ],
  },
  {
    slug: "wheelchair-taxi-strathfield",
    navLabel: "Strathfield",
    targetKeyword: "Wheelchair Taxi Strathfield",
    metaTitle: "Wheelchair Taxi Strathfield | Accessible Transport Service",
    metaDescription: "Wheelchair accessible taxi service for Strathfield, covering Concord Hospital, NDIS appointments and Sydney Airport transfers.",
    eyebrow: "Sydney Locations",
    h1: "Wheelchair Taxi Strathfield",
    heroDescription: "Wheelchair accessible taxi transport for Strathfield, a major transport interchange between the Sydney CBD, the Inner West and Parramatta.",
    image: "silver-service-wheelchair-taxi.jpg",
    imageAlt: "Wheelchair accessible taxi service for Strathfield",
    intro: [
      "Strathfield is a major rail interchange connecting the Sydney CBD, the Inner West, Parramatta and beyond, with Strathfield Plaza and a dense residential and commercial centre, close to Concord Hospital.",
      "We regularly arrange wheelchair accessible transport to and from Concord Hospital, NDIS appointment transport, and trips connecting Strathfield with Burwood, Ryde and the wider Inner West.",
    ],
    introItemsIntro: "In and around Strathfield, we regularly provide:",
    introItems: [
      "Transport to and from Concord Hospital",
      "NDIS appointment and therapy transport",
      "Aged care and retirement village transfers",
      "Sydney Airport transfers",
      "Local trips around Strathfield Plaza and the surrounding Inner West",
    ],
    features: [
      { title: "Concord Hospital Transport", description: "Appointment, discharge and transfer transport to and from Concord Hospital." },
      { title: "NDIS & Aged Care Coverage", description: "Eligible NDIS participants, aged care residents and their families can book directly with our team." },
      { title: "Central Interchange Location", description: "Strathfield's central position makes for straightforward connections across Sydney." },
      { title: "Recurring Transport", description: "Set up an ongoing schedule for regular appointments in Strathfield." },
    ],
    faq: [
      { question: "Do you provide wheelchair taxi transport to Concord Hospital?", answer: "Yes, this is one of our regular Strathfield routes." },
      { question: "Can you pick up from Strathfield station or Strathfield Plaza?", answer: "Yes, provide your exact pickup point when booking." },
      { question: "Do you cover trips between Strathfield and Burwood?", answer: "Yes, this is a regular route across the Inner West." },
      { question: "Can I set up recurring transport from Strathfield?", answer: "Yes, see our Recurring Wheelchair Transport service." },
    ],
    relatedLinks: [
      { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", targetSlug: "hospital-transport-sydney" },
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "📍", title: "Wheelchair Taxi Burwood", description: "Accessible transport for Burwood.", href: "/wheelchair-taxi-burwood/" },
      { icon: "📍", title: "Wheelchair Taxi Ryde", description: "Accessible transport for Ryde.", href: "/wheelchair-taxi-ryde/" },
    ],
  },
  {
    slug: "wheelchair-taxi-hornsby",
    navLabel: "Hornsby",
    targetKeyword: "Wheelchair Taxi Hornsby",
    metaTitle: "Wheelchair Taxi Hornsby | Accessible Transport Service",
    metaDescription: "Wheelchair accessible taxi service for Hornsby, covering Hornsby Ku-ring-gai Hospital, NDIS appointments and aged care transfers.",
    eyebrow: "Sydney Locations",
    h1: "Wheelchair Taxi Hornsby",
    heroDescription: "Wheelchair accessible taxi transport for Hornsby, the gateway between Sydney's Upper North Shore and the Central Coast.",
    image: "maxi-van.png",
    imageAlt: "Wheelchair accessible vehicle for Hornsby transport",
    intro: [
      "Hornsby is a major hub at the northern edge of Sydney, home to Hornsby Ku-ring-gai Hospital, Hornsby Westfield and a large train and bus interchange serving the Upper North Shore.",
      "We regularly arrange wheelchair accessible transport to and from Hornsby Ku-ring-gai Hospital, NDIS appointment transport, and aged care transfers across the Upper North Shore.",
    ],
    introItemsIntro: "In and around Hornsby, we regularly provide:",
    introItems: [
      "Transport to and from Hornsby Ku-ring-gai Hospital",
      "NDIS appointment and therapy transport",
      "Aged care and retirement village transfers",
      "Sydney Airport transfers",
      "Local trips around Hornsby Westfield and the Upper North Shore",
    ],
    features: [
      { title: "Hornsby Ku-ring-gai Hospital Transport", description: "Appointment, discharge and transfer transport to and from the hospital." },
      { title: "NDIS & Aged Care Coverage", description: "Eligible NDIS participants, aged care residents and their families can book directly with our team." },
      { title: "Upper North Shore Coverage", description: "Regular transport across Hornsby and the surrounding Upper North Shore." },
      { title: "Recurring Transport", description: "Set up an ongoing schedule for regular appointments in Hornsby." },
    ],
    faq: [
      { question: "Do you provide wheelchair taxi transport to Hornsby Ku-ring-gai Hospital?", answer: "Yes, this is one of our regular Hornsby routes." },
      { question: "Can you pick up from Hornsby Westfield or the station?", answer: "Yes, provide your exact pickup point when booking." },
      { question: "Do you cover aged care facilities in the Upper North Shore?", answer: "Yes, see our Aged Care Transport Sydney service." },
      { question: "Can I set up recurring transport from Hornsby?", answer: "Yes, see our Recurring Wheelchair Transport service." },
    ],
    relatedLinks: [
      { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", targetSlug: "hospital-transport-sydney" },
      { icon: "🧓", title: "Aged Care Transport Sydney", description: "Wheelchair transport for aged care residents.", targetSlug: "aged-care-transport-sydney" },
      { icon: "📍", title: "Wheelchair Taxi Castle Hill", description: "Accessible transport for Castle Hill.", href: "/wheelchair-taxi-castle-hill/" },
    ],
  },
  {
    slug: "wheelchair-taxi-castle-hill",
    navLabel: "Castle Hill",
    targetKeyword: "Wheelchair Taxi Castle Hill",
    metaTitle: "Wheelchair Taxi Castle Hill | Accessible Transport Service",
    metaDescription: "Wheelchair accessible taxi service for Castle Hill and the Hills District, covering NDIS appointments, aged care transfers and airport transfers.",
    eyebrow: "Sydney Locations",
    h1: "Wheelchair Taxi Castle Hill",
    heroDescription: "Wheelchair accessible taxi transport for Castle Hill and the wider Hills District.",
    image: "wheelchair-taxi-sydney.jpg",
    imageAlt: "Wheelchair accessible taxi service for Castle Hill and the Hills District",
    intro: [
      "Castle Hill is a major centre in Sydney's Hills District, home to Castle Towers shopping centre, the Norwest Business Park and a stop on the Metro Northwest line, with a large and growing residential population.",
      "We regularly arrange wheelchair accessible transport for NDIS appointments, aged care transfers, and trips connecting Castle Hill with Kellyville and the wider Hills District.",
    ],
    introItemsIntro: "In and around Castle Hill, we regularly provide:",
    introItems: [
      "NDIS appointment and therapy transport",
      "Aged care and retirement village transfers",
      "Sydney Airport transfers",
      "Local trips around Castle Towers and Norwest Business Park",
      "Transport connecting Castle Hill with Kellyville and the Hills District",
    ],
    features: [
      { title: "Hills District Coverage", description: "Regular transport across Castle Hill, Kellyville and the wider Hills District." },
      { title: "NDIS & Aged Care Coverage", description: "Eligible NDIS participants, aged care residents and their families can book directly with our team." },
      { title: "Business Park Access", description: "Straightforward pickups around the Norwest Business Park and Castle Towers." },
      { title: "Recurring Transport", description: "Set up an ongoing schedule for regular appointments in Castle Hill." },
    ],
    faq: [
      { question: "Can you pick up from Castle Towers or Norwest Business Park?", answer: "Yes, provide your exact pickup point when booking." },
      { question: "Do you cover trips between Castle Hill and Kellyville?", answer: "Yes, this is a regular route across the Hills District." },
      { question: "Do you provide NDIS transport in the Hills District?", answer: "Yes, see our NDIS Transport Sydney service." },
      { question: "Can I set up recurring transport from Castle Hill?", answer: "Yes, see our Recurring Wheelchair Transport service." },
    ],
    relatedLinks: [
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "🧓", title: "Aged Care Transport Sydney", description: "Wheelchair transport for aged care residents.", targetSlug: "aged-care-transport-sydney" },
      { icon: "📍", title: "Wheelchair Taxi Kellyville", description: "Accessible transport for Kellyville.", href: "/wheelchair-taxi-kellyville/" },
      { icon: "📍", title: "Wheelchair Taxi Hornsby", description: "Accessible transport for Hornsby.", href: "/wheelchair-taxi-hornsby/" },
    ],
  },
  {
    slug: "wheelchair-taxi-kellyville",
    navLabel: "Kellyville",
    targetKeyword: "Wheelchair Taxi Kellyville",
    metaTitle: "Wheelchair Taxi Kellyville | Accessible Transport Service",
    metaDescription: "Wheelchair accessible taxi service for Kellyville and the Hills District, covering NDIS appointments, aged care transfers and airport transfers.",
    eyebrow: "Sydney Locations",
    h1: "Wheelchair Taxi Kellyville",
    heroDescription: "Wheelchair accessible taxi transport for Kellyville, one of the fastest-growing suburbs in the Hills District.",
    image: "best-wheelchair-taxi-service-sydney.webp",
    imageAlt: "Wheelchair accessible taxi service for Kellyville",
    intro: [
      "Kellyville is one of Sydney's fastest-growing residential areas, close to Rouse Hill Town Centre and served by the Metro Northwest line, with a large and growing population of families and older residents.",
      "We regularly arrange wheelchair accessible transport for NDIS appointments, aged care transfers, and trips connecting Kellyville with Castle Hill and the wider Hills District.",
    ],
    introItemsIntro: "In and around Kellyville, we regularly provide:",
    introItems: [
      "NDIS appointment and therapy transport",
      "Aged care and retirement village transfers",
      "Sydney Airport transfers",
      "Local trips around Rouse Hill Town Centre",
      "Transport connecting Kellyville with Castle Hill and the Hills District",
    ],
    features: [
      { title: "Hills District Coverage", description: "Regular transport across Kellyville, Castle Hill and the wider Hills District." },
      { title: "NDIS & Aged Care Coverage", description: "Eligible NDIS participants, aged care residents and their families can book directly with our team." },
      { title: "Rouse Hill Access", description: "Straightforward pickups around Rouse Hill Town Centre." },
      { title: "Recurring Transport", description: "Set up an ongoing schedule for regular appointments in Kellyville." },
    ],
    faq: [
      { question: "Can you pick up from Rouse Hill Town Centre?", answer: "Yes, provide your exact pickup point when booking." },
      { question: "Do you cover trips between Kellyville and Castle Hill?", answer: "Yes, this is a regular route across the Hills District." },
      { question: "Do you provide aged care transport in Kellyville?", answer: "Yes, see our Aged Care Transport Sydney service." },
      { question: "Can I set up recurring transport from Kellyville?", answer: "Yes, see our Recurring Wheelchair Transport service." },
    ],
    relatedLinks: [
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "🧓", title: "Aged Care Transport Sydney", description: "Wheelchair transport for aged care residents.", targetSlug: "aged-care-transport-sydney" },
      { icon: "📍", title: "Wheelchair Taxi Castle Hill", description: "Accessible transport for Castle Hill.", href: "/wheelchair-taxi-castle-hill/" },
    ],
  },
  {
    slug: "wheelchair-taxi-bondi",
    navLabel: "Bondi",
    targetKeyword: "Wheelchair Taxi Bondi",
    metaTitle: "Wheelchair Taxi Bondi | Accessible Transport Service",
    metaDescription: "Wheelchair accessible taxi service for Bondi and Bondi Beach, covering NDIS appointments, the Randwick health precinct and Sydney Airport transfers.",
    eyebrow: "Sydney Locations",
    h1: "Wheelchair Taxi Bondi",
    heroDescription: "Wheelchair accessible taxi transport for Bondi, Bondi Beach and Bondi Junction.",
    image: "wheelchair-taxi-sydney-banner.webp",
    imageAlt: "Wheelchair accessible taxi service for Bondi and Bondi Beach",
    intro: [
      "Bondi is one of Sydney's best-known beachside suburbs, with Bondi Beach, Campbell Parade and the Bondi Junction transport interchange drawing a steady mix of residents, visitors and beachgoers.",
      "We regularly arrange wheelchair accessible transport for local trips, NDIS appointment transport, transfers to and from the nearby Randwick health precinct, and Sydney Airport transfers.",
    ],
    introItemsIntro: "In and around Bondi, we regularly provide:",
    introItems: [
      "Local trips around Bondi Beach and Bondi Junction",
      "NDIS appointment transport",
      "Transport to and from the Randwick health precinct",
      "Sydney Airport transfers",
      "Aged care and retirement village transfers",
    ],
    features: [
      { title: "Beachside Accessibility", description: "Wheelchair accessible transport for Bondi Beach, Campbell Parade and Bondi Junction." },
      { title: "Randwick Health Precinct Access", description: "A short trip to Prince of Wales Hospital, Sydney Children's Hospital and the Royal Hospital for Women." },
      { title: "NDIS Coverage", description: "Eligible NDIS participants can book directly with our team." },
      { title: "Airport Transfers", description: "Accessible transfers to Sydney Airport from Bondi." },
    ],
    faq: [
      { question: "Can you pick up from Bondi Beach or Bondi Junction?", answer: "Yes, provide your exact pickup point when booking." },
      { question: "Do you cover transport to the Randwick hospital precinct?", answer: "Yes, this is a regular route from Bondi." },
      { question: "How far is Bondi from Sydney Airport?", answer: "Typically 20-30 minutes via the Eastern Distributor, depending on traffic - we recommend pre-booking with extra buffer time." },
      { question: "Can I set up recurring transport from Bondi?", answer: "Yes, see our Recurring Wheelchair Transport service." },
    ],
    relatedLinks: [
      { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", targetSlug: "hospital-transport-sydney" },
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "📍", title: "Wheelchair Taxi Randwick", description: "Accessible transport for the Randwick health precinct.", href: "/wheelchair-taxi-randwick/" },
      { icon: "📍", title: "Wheelchair Taxi Sydney CBD", description: "Accessible transport for the Sydney CBD.", href: "/wheelchair-taxi-sydney-cbd/" },
    ],
  },
  {
    slug: "wheelchair-taxi-sutherland",
    navLabel: "Sutherland",
    targetKeyword: "Wheelchair Taxi Sutherland",
    metaTitle: "Wheelchair Taxi Sutherland | Accessible Transport Service",
    metaDescription: "Wheelchair accessible taxi service for Sutherland and the Sutherland Shire, covering Sutherland Hospital, NDIS appointments and airport transfers.",
    eyebrow: "Sydney Locations",
    h1: "Wheelchair Taxi Sutherland",
    heroDescription: "Wheelchair accessible taxi transport for Sutherland and the wider Sutherland Shire.",
    image: "benefits-of-disabled-taxi-sydney.webp",
    imageAlt: "Wheelchair accessible taxi service for Sutherland and the Sutherland Shire",
    intro: [
      "Sutherland is the commercial hub of the Sutherland Shire in Southern Sydney, home to Sutherland Hospital and a busy train interchange, with Westfield Miranda nearby.",
      "We regularly arrange wheelchair accessible transport to and from Sutherland Hospital, NDIS appointment transport, aged care transfers, and trips connecting Sutherland with Hurstville and the wider southern Sydney region.",
    ],
    introItemsIntro: "In and around Sutherland, we regularly provide:",
    introItems: [
      "Transport to and from Sutherland Hospital",
      "NDIS appointment and therapy transport",
      "Aged care and retirement village transfers",
      "Sydney Airport transfers",
      "Local trips around Sutherland and Westfield Miranda",
    ],
    features: [
      { title: "Sutherland Hospital Transport", description: "Appointment, discharge and transfer transport to and from Sutherland Hospital." },
      { title: "NDIS & Aged Care Coverage", description: "Eligible NDIS participants, aged care residents and their families can book directly with our team." },
      { title: "Sutherland Shire Coverage", description: "Regular transport across Sutherland and the wider Shire." },
      { title: "Recurring Transport", description: "Set up an ongoing schedule for regular appointments in Sutherland." },
    ],
    faq: [
      { question: "Do you provide wheelchair taxi transport to Sutherland Hospital?", answer: "Yes, this is one of our regular Sutherland routes." },
      { question: "Can you pick up from Westfield Miranda?", answer: "Yes, provide your exact pickup point when booking." },
      { question: "Do you cover trips between Sutherland and Hurstville?", answer: "Yes, this is a regular route across southern Sydney." },
      { question: "Can I set up recurring transport from Sutherland?", answer: "Yes, see our Recurring Wheelchair Transport service." },
    ],
    relatedLinks: [
      { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", targetSlug: "hospital-transport-sydney" },
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "📍", title: "Wheelchair Taxi Hurstville", description: "Accessible transport for Hurstville.", href: "/wheelchair-taxi-hurstville/" },
    ],
  },
  {
    slug: "wheelchair-taxi-burwood",
    navLabel: "Burwood",
    targetKeyword: "Wheelchair Taxi Burwood",
    metaTitle: "Wheelchair Taxi Burwood | Accessible Transport Service",
    metaDescription: "Wheelchair accessible taxi service for Burwood, covering Concord Hospital, NDIS appointments, aged care transfers and Sydney Airport.",
    eyebrow: "Sydney Locations",
    h1: "Wheelchair Taxi Burwood",
    heroDescription: "Wheelchair accessible taxi transport for Burwood, a key Inner West commercial and transport hub.",
    image: "accessible-van-assistance.webp",
    imageAlt: "Wheelchair accessible taxi service for Burwood",
    intro: [
      "Burwood is a major Inner West centre, with Westfield Burwood, a busy train interchange, and a dense mix of residential and commercial activity, close to Concord Hospital.",
      "We regularly arrange wheelchair accessible transport to and from Concord Hospital, NDIS appointment transport, aged care transfers, and trips connecting Burwood with Strathfield and the wider Inner West.",
    ],
    introItemsIntro: "In and around Burwood, we regularly provide:",
    introItems: [
      "Transport to and from Concord Hospital",
      "NDIS appointment and therapy transport",
      "Aged care and retirement village transfers",
      "Sydney Airport transfers",
      "Local trips around Westfield Burwood and the Inner West",
    ],
    features: [
      { title: "Concord Hospital Transport", description: "Appointment, discharge and transfer transport to and from Concord Hospital." },
      { title: "NDIS & Aged Care Coverage", description: "Eligible NDIS participants, aged care residents and their families can book directly with our team." },
      { title: "Inner West Coverage", description: "Regular trips connecting Burwood with Strathfield and the wider Inner West." },
      { title: "Recurring Transport", description: "Set up an ongoing schedule for regular appointments in Burwood." },
    ],
    faq: [
      { question: "Do you provide wheelchair taxi transport to Concord Hospital?", answer: "Yes, this is one of our regular Burwood routes." },
      { question: "Can you pick up from Westfield Burwood or the station?", answer: "Yes, provide your exact pickup point when booking." },
      { question: "Do you cover trips between Burwood and Strathfield?", answer: "Yes, this is a regular route across the Inner West." },
      { question: "Can I set up recurring transport from Burwood?", answer: "Yes, see our Recurring Wheelchair Transport service." },
    ],
    relatedLinks: [
      { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", targetSlug: "hospital-transport-sydney" },
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "📍", title: "Wheelchair Taxi Strathfield", description: "Accessible transport for Strathfield.", href: "/wheelchair-taxi-strathfield/" },
    ],
  },
  {
    slug: "wheelchair-taxi-fairfield",
    navLabel: "Fairfield",
    targetKeyword: "Wheelchair Taxi Fairfield",
    metaTitle: "Wheelchair Taxi Fairfield | Accessible Transport Service",
    metaDescription: "Wheelchair accessible taxi service for Fairfield, covering Fairfield Hospital, NDIS appointments, aged care transfers and airport transfers.",
    eyebrow: "Sydney Locations",
    h1: "Wheelchair Taxi Fairfield",
    heroDescription: "Wheelchair accessible taxi transport for Fairfield and the surrounding South Western Sydney area.",
    image: "wheelchair-accessible-ford-transit-custom.jpg",
    imageAlt: "Wheelchair accessible vehicle for Fairfield transport",
    intro: [
      "Fairfield is a major centre in South Western Sydney, home to Fairfield Hospital and the Fairfield Forum shopping centre, serving a large and diverse local community.",
      "We regularly arrange wheelchair accessible transport to and from Fairfield Hospital, NDIS appointment transport, aged care transfers, and trips connecting Fairfield with Liverpool and Bankstown.",
    ],
    introItemsIntro: "In and around Fairfield, we regularly provide:",
    introItems: [
      "Transport to and from Fairfield Hospital",
      "NDIS appointment and therapy transport",
      "Aged care and retirement village transfers",
      "Sydney Airport transfers",
      "Local trips around Fairfield Forum and the surrounding area",
    ],
    features: [
      { title: "Fairfield Hospital Transport", description: "Appointment, discharge and transfer transport to and from Fairfield Hospital." },
      { title: "NDIS & Aged Care Coverage", description: "Eligible NDIS participants, aged care residents and their families can book directly with our team." },
      { title: "South Western Sydney Coverage", description: "Regular trips connecting Fairfield with Liverpool and Bankstown." },
      { title: "Recurring Transport", description: "Set up an ongoing schedule for regular appointments in Fairfield." },
    ],
    faq: [
      { question: "Do you provide wheelchair taxi transport to Fairfield Hospital?", answer: "Yes, this is one of our regular Fairfield routes." },
      { question: "Can you pick up from Fairfield Forum?", answer: "Yes, provide your exact pickup point when booking." },
      { question: "Do you cover trips between Fairfield and Liverpool?", answer: "Yes, this is a regular route across South Western Sydney." },
      { question: "Can I set up recurring transport from Fairfield?", answer: "Yes, see our Recurring Wheelchair Transport service." },
    ],
    relatedLinks: [
      { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", targetSlug: "hospital-transport-sydney" },
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "📍", title: "Wheelchair Taxi Liverpool", description: "Accessible transport for Liverpool.", href: "/wheelchair-taxi-liverpool/" },
      { icon: "📍", title: "Wheelchair Taxi Bankstown", description: "Accessible transport for Bankstown.", href: "/wheelchair-taxi-bankstown/" },
    ],
  },
];

async function run() {
  const payload = await getPayload({ config });
  const getOrUploadMedia = createMediaUploader(payload, publicDir);
  const site = await payload.find({ collection: "sites", where: { key: { equals: "wheelchair" } }, limit: 1 });
  const siteId = site.docs[0]?.id;
  if (!siteId) throw new Error('Site "wheelchair" not found - run npm run seed:wheelchair first.');

  console.log(`Pass 1: upserting ${pages.length} Tier 2 location pages (seoStatus: review, no relatedLinks yet)...`);
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

  console.log("Pass 2: resolving relatedLinks (plain href between pages, targetPage for pre-existing pages)...");
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

  console.log("Done. All 10 Tier 2 location pages are seoStatus: review - not indexed until approved in the CMS.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
