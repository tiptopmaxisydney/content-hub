/**
 * WSI airport taxi page (transport-solutions /western-sydney-airport-taxi/) - live-audit
 * corrections agreed 2026-10-09, sixteen days before WSI passenger opening.
 *
 * The audit found claims the operation can't stand behind, so this pass rewrites the page's CMS
 * fields rather than string-patching them (almost every section had at least one problem):
 *
 * P0 claims removed or corrected:
 * - Booster seats (FAQ "capsule, seat or booster") - only capsules and child seats are offered.
 * - "Direct contact with your driver after landing" -> TipTop dispatch contact (phone/WhatsApp).
 * - "Pre-booking guarantees the right vehicle is waiting" -> matching subject to confirmed
 *   availability and suitability.
 * - "Flight monitoring included, adjusted for delays or early arrivals" / "track your flight from
 *   wheels-up" -> customer notifies dispatch, dispatch coordinates (no automatic-monitoring
 *   guarantee until a working integration is confirmed).
 * - "One Fixed Price - No Exceptions" -> confirmed quotation, qualified for itinerary changes,
 *   extra stops, waiting and additional services under the booking terms.
 * - "Luggage assistance and an escort to the vehicle" -> removed (no terminal escort/access).
 * - "11 passengers with luggage" -> capacity depends on passengers, luggage and configuration.
 *
 * P1 content added:
 * - Key facts (name, WSI code, 40 Nancy Drive, 25 Oct 2026 opening), step-by-step pickup guide,
 *   drop-off guide, WSI vs SYD warning, vehicle guide, pricing, flight-delay procedure, contact.
 * - Ground-transport note: WSI has a dedicated Uber pickup zone and separate commercial pickup
 *   arrangements, so TipTop only uses the area confirmed for its vehicle.
 * - Shuttle comparison updated: Super Shuttle WSI (NSBC Group) launches 25 Oct 2026, express
 *   electric buses to Parramatta, Sydney CBD and Sydney Airport, launch fares from $25 one-way
 *   (Parramatta), $55 (City), $65 (SYD) - verified 2026-10-09 (busnews.com.au, timeout.com,
 *   centreforaviation.com, WSI's own announcement).
 *
 * P2: H1, meta title and description per the audit; the duplicated benefit lists ("The
 * unglamorous details...", "Why Travellers Choose Us") are merged into one corrected list.
 *
 * Not done here (needs the business): the verified WSI pickup-zone MAP (no approved image yet),
 * Nexus-assigned pickup zone instructions, and a booking-tracking link.
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-wsi-taxi-audit-2026-10-09.ts
 * (dry-run by default - pass LIVE=true to actually write; the original field values are backed up
 * to scripts/backups/ first, restorable with --restore scripts/backups/<file>.json)
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";
const SLUG = "western-sydney-airport-taxi";
// The page as read on 2026-10-09. If it has been edited since, stop rather than overwrite that
// edit - re-read the page and fold the change into this script first.
const EXPECTED_UPDATED_AT = "2026-10-03T08:28:23.254Z";

const PHONE = "02 9669 9390";
const WHATSAPP = "+61 410 025 786";
const BOOK_URL = "https://bookings.tiptopmaxisydney.com.au/";

const t = (text: string) => ({ text });
const section = (heading: string, paragraphs: string[], bullets: string[] = []) => ({
  heading,
  paragraphs: paragraphs.map(t),
  bulletList: bullets.map(t),
});

const NEW = {
  metaTitle: "Western Sydney Airport Taxi & Maxi Transfers | TipTop",
  metaDescription:
    "Pre-book Western Sydney Airport (WSI) taxis, 7 and 11 seaters, family transfers and wheelchair-accessible vehicles. Get a quote with TipTop Maxi Sydney.",
  h1: "Western Sydney Airport Taxi & Maxi Transfers",
  heroDescription:
    "Pre-book reliable airport transport with TipTop Maxi Sydney. Travelling to or from Western Sydney International Airport (WSI)? Book a sedan, SUV, 7-seater, 11-seater or wheelchair-accessible vehicle to suit your travel requirements.",
  operationalNotice:
    "WSI opens to passengers on 25 October 2026. Pickup instructions for your assigned vehicle and any applicable airport charges are confirmed with your booking, and may be updated as WSI ground-transport arrangements settle in.",
  contentSections: [
    section(
      "Pre-Booked Western Sydney Airport Transfers",
      [
        "We offer pre-booked airport transfers for individuals, families, business travellers and larger groups, with confirmed quotations and 24/7 booking support.",
      ],
      [
        "Airport: Western Sydney International (Nancy-Bird Walton) Airport",
        "Airport code: WSI",
        "Location: 40 Nancy Drive, Luddenham NSW",
        "Passenger opening: 25 October 2026",
      ],
    ),
    section(
      "Where to Meet Your TipTop Driver at WSI",
      [
        "After landing, follow the airport signs to arrivals and baggage collection.",
        "Once you have collected your luggage, contact TipTop dispatch approximately 10–15 minutes before you are ready for collection.",
        "Your confirmed pickup instructions will direct you to the appropriate authorised transport pickup area for your assigned vehicle.",
        "Our standard service does not include inside-terminal meet-and-greet or name-board collection.",
        `Need help? Call ${PHONE} or WhatsApp ${WHATSAPP}.`,
      ],
    ),
    section(
      "WSI Ground Transport: Use the Area in Your Booking",
      [
        "WSI has separate pickup arrangements for different kinds of transport - including a dedicated Uber pickup zone and separate commercial-vehicle pickup arrangements. Taxi, rideshare and pre-booked vehicle areas are not interchangeable.",
        "TipTop vehicles only use the pickup area authorised for your assigned vehicle. Please follow the pickup instructions in your booking confirmation rather than the rideshare signage.",
      ],
    ),
    section(
      "Airport Drop-Off Service",
      [
        "For departures, your driver will collect you from your nominated address and transport you to Western Sydney International Airport's designated departure drop-off area.",
        "Please choose your pickup time with enough allowance for road traffic, airline check-in and airport security.",
      ],
    ),
    section(
      "WSI or Sydney Airport (SYD)? Check Before You Book",
      [
        "Western Sydney International (WSI) at Badgerys Creek/Luddenham and Sydney Kingsford Smith Airport (SYD) at Mascot are two different airports, a long drive apart. Check the airport code on your ticket before booking.",
        "Connecting between WSI and SYD on the same day? Tick the Sydney Airport connection option in the booking form and allow plenty of time between flights - your transfer can't make up for a tight connection.",
      ],
    ),
    section(
      "Vehicles for Every Journey",
      [
        "We provide pre-booked sedans, SUVs, 7-seater and 11-seater vehicles, as well as wheelchair-accessible transport by arrangement.",
        "Vehicle selection depends on your passenger numbers, luggage requirements, child restraints and mobility equipment. Vehicles are matched to your booking subject to confirmed availability and suitability.",
      ],
      [
        "Sedan - for individual travellers and small groups of 1–4 passengers.",
        "SUV - extra room for luggage and passengers.",
        "7 Seater - for medium-sized groups, with luggage capacity depending on passenger numbers and baggage.",
        "11 Seater - for larger groups, with final capacity depending on passenger numbers, luggage and vehicle configuration.",
        "Wheelchair-accessible vehicle - by arrangement, with the wheelchair type and dimensions confirmed when you book.",
        "Baby capsules and child seats - available on request; tell us each child's age and approximate size. We don't provide booster seats.",
      ],
    ),
    section(
      "Transparent Airport Transfer Pricing",
      [
        "Receive a confirmed quotation before booking. Your quotation will identify the agreed journey fare and any applicable confirmed tolls or airport access charges.",
        "Changes to the itinerary, extra stops, waiting time or additional services may affect the final fare in accordance with the booking terms.",
      ],
    ),
    section(
      "What Happens If My Flight Is Delayed?",
      [
        "Please notify TipTop if your flight is delayed, arrives early or changes schedule.",
        "Our dispatch team will coordinate updated pickup arrangements and advise you of any changes to your booking.",
      ],
    ),
    section(
      "Why Choose TipTop Instead of an Airport Shuttle?",
      [
        "Private door-to-door Western Sydney Airport transfers for individuals, families, groups and wheelchair passengers, with the vehicle, luggage space and accessibility arranged before travel.",
      ],
      [
        "Private vehicle, door-to-door - no shared stops or interchanges",
        "Pickup from your home, hotel, business or care facility",
        "Multiple pickups and additional stops on request",
        "Wheelchair-accessible vehicles and child restraints by arrangement",
        "Advance bookings for early-morning and late-night flights - WSI has no curfew",
        "A confirmed quotation for the whole vehicle before you travel",
      ],
    ),
    section(
      "Who Books the WSI Airport Transfer",
      [],
      [
        "Business travellers - a confirmed quotation in advance makes expense reporting simple.",
        "Families - one vehicle, door-to-door, with child restraints arranged on request.",
        "Visitors heading to Sydney CBD or Parramatta hotels.",
        "Groups and teams travelling together in a 7 or 11 seater, subject to luggage.",
        "Passengers who need a wheelchair-accessible vehicle, arranged in advance subject to confirmed availability and suitability.",
      ],
    ),
    section(
      "Book Your Western Sydney Airport Transfer",
      ["Arrange your upcoming WSI airport transfer online or contact our dispatch team."],
      [`Book online: ${BOOK_URL}`, `Phone: ${PHONE}`, `WhatsApp: ${WHATSAPP}`],
    ),
  ],
  faq: [
    {
      question: "Is Western Sydney Airport open yet?",
      answer: "Western Sydney International (Nancy-Bird Walton) Airport opens to passengers on Sunday, 25 October 2026. We're taking pre-bookings now.",
    },
    {
      question: "Where do I meet my TipTop driver at WSI?",
      answer: `Collect your luggage, then contact TipTop dispatch about 10–15 minutes before you're ready. Your booking confirmation directs you to the authorised pickup area for your assigned vehicle - not the rideshare zone. There is no inside-terminal meet-and-greet. Call ${PHONE} or WhatsApp ${WHATSAPP}.`,
    },
    {
      question: "Is WSI the same as Sydney Airport?",
      answer: "No. Western Sydney International (WSI) is at Badgerys Creek/Luddenham; Sydney Kingsford Smith Airport (SYD) is at Mascot. Check the airport code on your ticket, and if you're connecting between the two, tick the Sydney Airport connection option when booking.",
    },
    {
      question: "How much does a taxi to Western Sydney Airport cost?",
      answer: "It depends on distance, vehicle size and time of travel. You receive a confirmed quotation before booking showing the agreed fare and any applicable confirmed tolls or airport charges. Itinerary changes, extra stops, waiting or added services may change the final fare under the booking terms.",
    },
    {
      question: "Can I book a maxi taxi for a group?",
      answer: "Yes. Our 7 and 11 seaters suit families, teams and groups travelling together. Luggage capacity depends on how many passengers are travelling, so tell us your passenger and bag numbers and we'll confirm the right vehicle.",
    },
    {
      question: "Do you have wheelchair accessible vehicles?",
      answer: "Yes, by arrangement. Tell us the wheelchair type and dimensions when you book, and the vehicle is confirmed subject to availability and suitability.",
    },
    {
      question: "Can you supply a baby seat?",
      answer: "Yes. We arrange baby capsules and child seats - tell us each child's age and approximate size when you book. We don't provide booster seats, so bring your own if your child uses one.",
    },
    {
      question: "What happens if my flight is delayed?",
      answer: "Please let TipTop dispatch know if your flight is delayed, arrives early or changes schedule. Our dispatch team will coordinate updated pickup arrangements and advise you of any changes to your booking.",
    },
    {
      question: "Is there a shuttle bus from WSI?",
      answer: "Yes. Super Shuttle WSI runs shared express electric buses between WSI and Parramatta, Sydney CBD and Sydney Airport from 25 October 2026, with per-person fares. TipTop is a private alternative: one vehicle for your group, door-to-door, at the time you choose.",
    },
    {
      question: "How early should I book my transfer?",
      answer: "For early-morning flights, large groups or accessible vehicles, book at least 24 hours ahead. Otherwise, we take same-day bookings whenever a suitable vehicle is free.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "Cash, credit and debit cards, bank transfer, corporate accounts and secure online payments. We're not an NDIS registered provider, so NDIS-funded invoicing and NDIS cards aren't accepted, but NDIS participants are welcome to book.",
    },
  ],
  comparisonTable: {
    title: "TipTop vs the WSI Airport Shuttle",
    columnA: "TipTop Private Transfer",
    columnB: "Super Shuttle WSI",
    rows: [
      { feature: "Door-to-door service", valueA: "Yes", valueB: "Fixed stops: Parramatta, Sydney CBD, Sydney Airport" },
      { feature: "Private vehicle", valueA: "Yes", valueB: "Shared bus" },
      { feature: "Departure time", valueA: "The time you book", valueB: "Timed around flights" },
      { feature: "Vehicle-size selection", valueA: "Sedan to 11 seater", valueB: "One bus size" },
      { feature: "Wheelchair option", valueA: "Accessible vehicle by arrangement", valueB: "Low-floor bus, space for two wheelchairs" },
      { feature: "Baby/child seats", valueA: "Capsules and child seats on request", valueB: "Not provided" },
      { feature: "Multiple stops", valueA: "On request", valueB: "Fixed route" },
      { feature: "WSI–Sydney Airport transfer", valueA: "Private, door-to-door", valueB: "Express bus" },
      { feature: "Pricing", valueA: "Confirmed quotation for the whole vehicle", valueB: "Per-person fares (from $25 one-way at launch)" },
    ],
  },
};

const FIELDS = ["metaTitle", "metaDescription", "h1", "heroDescription", "operationalNotice", "contentSections", "faq", "comparisonTable"] as const;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pick = (doc: any) => Object.fromEntries(FIELDS.map((f) => [f, doc[f]]));

// Anything matching here in the NEW copy means a claim the audit asked us to drop crept back in.
const BANNED = /booster|direct contact with your driver|guarantee|flight monitoring|wheels-up|no exceptions|escort|passengers with luggage/i;

function scan(value: unknown, path: string, out: string[]) {
  if (typeof value === "string") {
    const m = value.match(BANNED);
    // "We don't provide booster seats" is the one allowed booster mention.
    if (m && !/don't provide booster seats/i.test(value)) out.push(`${path}: ${value.slice(0, 140)}`);
  } else if (Array.isArray(value)) value.forEach((v, i) => scan(v, `${path}[${i}]`, out));
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) scan(v, path ? `${path}.${k}` : k, out);
}

async function run() {
  const restoreIdx = process.argv.indexOf("--restore");
  const payload = await getPayload({ config });

  if (restoreIdx !== -1) {
    const backup = JSON.parse(readFileSync(process.argv[restoreIdx + 1], "utf8")) as { id: string; original: Record<string, unknown> };
    await payload.update({ collection: "pages", id: backup.id, data: backup.original });
    console.log(`restored ${SLUG}`);
    process.exit(0);
  }

  const doc = (
    await payload.find({
      collection: "pages",
      where: { and: [{ slug: { equals: SLUG } }, { "site.key": { equals: SITE_KEY } }] },
      limit: 1,
      depth: 0,
    })
  ).docs[0];
  if (!doc) throw new Error(`Page "${SLUG}" not found for site "${SITE_KEY}".`);
  if (doc.updatedAt !== EXPECTED_UPDATED_AT && process.env.FORCE !== "true") {
    throw new Error(`Page was edited since 2026-10-09 (updatedAt ${doc.updatedAt}) - review that change before overwriting (FORCE=true to override).`);
  }

  const problems: string[] = [];
  scan(NEW, "", problems);
  if (problems.length) {
    problems.forEach((p) => console.error(`  BANNED CLAIM: ${p}`));
    throw new Error("New copy still contains a claim the audit removed - fix the script first.");
  }

  console.log(`[${SLUG}] fields to replace: ${FIELDS.join(", ")}`);
  console.log(`  h1: "${doc.h1}" -> "${NEW.h1}"`);
  console.log(`  sections: ${(doc.contentSections as unknown[]).length} -> ${NEW.contentSections.length}, faq: ${(doc.faq as unknown[]).length} -> ${NEW.faq.length}`);

  if (process.env.LIVE !== "true") {
    console.log("\nDRY RUN - pass LIVE=true to actually write.");
    process.exit(0);
  }

  mkdirSync("scripts/backups", { recursive: true });
  const backupPath = `scripts/backups/fix-wsi-taxi-audit-${Date.now()}.json`;
  writeFileSync(backupPath, JSON.stringify({ id: doc.id, original: pick(doc) }, null, 1));
  console.log(`Backup of original field values: ${backupPath}`);

  await payload.update({ collection: "pages", id: doc.id, data: NEW });
  console.log(`saved ${SLUG}`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
