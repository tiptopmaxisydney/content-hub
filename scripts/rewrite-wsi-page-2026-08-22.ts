/**
 * Full rewrite of transport-solutions-sydney's western-sydney-airport-transfers page,
 * agreed 2026-08-22. The live copy was written as though WSI (Nancy-Bird Walton Airport,
 * Badgerys Creek) already has passenger operations running ("meet you at arrivals", "your
 * driver waits inside the terminal with a name board", "We Track Your Flight"), but the
 * airport doesn't open until 25 October 2026 - this replaces the whole page with
 * future-tense, pre-booking-focused copy instead of small find/replace patches.
 *
 * Run with: node --env-file=.env --import tsx scripts/rewrite-wsi-page-2026-08-22.ts
 * (dry-run by default - pass LIVE=true to actually write)
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";
const SLUG = "western-sydney-airport-transfers";

const newContent = {
  metaTitle: "Western Sydney Airport Transfers | Opening 25 Oct 2026",
  metaDescription:
    "Pre-book transport to Western Sydney International Airport, opening 25 October 2026. Maxi taxis, family, group and accessible transfers available.",
  h1: "Western Sydney Airport Transfers",
  heroDescription:
    "Pre-book transport for Western Sydney International Airport, opening 25 October 2026. TipTop Maxi Sydney is preparing fixed-price transport options for individuals, families and groups travelling to and from the new airport at Badgerys Creek. Customers travelling from 25 October 2026 onward can plan transfers in advance, with vehicle options available according to passenger numbers, luggage and accessibility requirements.",
  contentSections: [
    {
      heading: "Western Sydney International Airport Opens 25 October 2026",
      paragraphs: [
        { text: "Western Sydney International (Nancy-Bird Walton) Airport is located at Badgerys Creek in Western Sydney, around 55km west of the Sydney CBD. Passenger operations are scheduled to begin on 25 October 2026." },
        { text: "TipTop Maxi Sydney is preparing pre-booked transport services connecting Western Sydney Airport with destinations throughout Greater Sydney and surrounding areas, ready for the airport's opening." },
      ],
      bulletList: [
        { text: "Sydney CBD" },
        { text: "Parramatta" },
        { text: "Liverpool" },
        { text: "Penrith" },
        { text: "Campbelltown" },
        { text: "Blacktown" },
        { text: "Blue Mountains" },
        { text: "Sydney (Kingsford Smith) Airport" },
        { text: "Surrounding Western Sydney suburbs" },
      ],
    },
    {
      heading: "Planning a Future Western Sydney Airport Transfer",
      paragraphs: [
        { text: "Customers with flights scheduled from 25 October 2026 onward can plan transport in advance. To help us recommend the right vehicle, please provide the following when booking:" },
      ],
      bulletList: [
        { text: "Flight date" },
        { text: "Flight number" },
        { text: "Pickup or destination suburb" },
        { text: "Number of passengers" },
        { text: "Luggage quantity" },
        { text: "Child restraint requirements" },
        { text: "Wheelchair or mobility requirements" },
        { text: "Preferred vehicle size" },
      ],
    },
    {
      heading: undefined,
      paragraphs: [
        { text: "Pickup procedures at the new terminal will be published once confirmed against Western Sydney Airport's official passenger transport arrangements." },
      ],
      bulletList: [],
    },
    {
      heading: "Vehicles for Every Group Size",
      paragraphs: [
        { text: "Our fleet will be available for Western Sydney Airport transfers according to your passenger numbers and luggage requirements." },
      ],
      bulletList: [
        { text: "Sedan — individuals and smaller groups" },
        { text: "SUV — families and passengers requiring additional luggage space" },
        { text: "7 Seater — small groups" },
        { text: "11 Seater — larger groups and airport transfers" },
        { text: "Wheelchair Accessible Vehicle — passengers travelling with mobility requirements (request in advance)" },
        { text: "Child Seat Vehicle — families requiring pre-arranged child restraints" },
      ],
    },
    {
      heading: "Fixed-Price Bookings",
      paragraphs: [
        { text: "For eligible pre-booked journeys, customers will receive a quoted fare before travel. We aim to provide clear, transparent pricing so you know the expected cost of your journey in advance — full pricing details will be confirmed once Western Sydney Airport booking arrangements are finalised." },
      ],
      bulletList: [],
    },
    {
      heading: "Connecting Western Sydney and Sydney (Kingsford Smith) Airport",
      paragraphs: [
        { text: "TipTop Maxi Sydney also provides transfers to and from Sydney (Kingsford Smith) Airport today. Once Western Sydney Airport opens, we'll offer transfers directly between the two airports as well as connections across Greater Sydney." },
      ],
      bulletList: [],
    },
  ],
  faq: [
    {
      question: "When does Western Sydney International Airport open?",
      answer: "Western Sydney International Airport is scheduled to commence passenger operations on 25 October 2026.",
    },
    {
      question: "Can I book a TipTop transfer for Western Sydney Airport?",
      answer: "TipTop Maxi Sydney is preparing pre-booked transport for customers travelling after the airport opens. Availability will depend on travel date, vehicle requirements and pickup location.",
    },
    {
      question: "Where is Western Sydney International Airport located?",
      answer: "Western Sydney International Airport, also known as Nancy-Bird Walton Airport, is located at Badgerys Creek in Western Sydney, approximately 55km west of the Sydney CBD.",
    },
    {
      question: "Do you provide large vehicles to Western Sydney Airport?",
      answer: "We plan to offer vehicles suitable for families and larger groups, subject to availability and your passenger and luggage requirements.",
    },
    {
      question: "Can I book wheelchair-accessible transport to Western Sydney Airport?",
      answer: "Wheelchair-accessible transport can be requested in advance, subject to vehicle availability and your mobility requirements.",
    },
    {
      question: "Are baby seats available for Western Sydney Airport transfers?",
      answer: "Child restraints can be requested when booking. Please provide the child's age and relevant restraint requirements.",
    },
    {
      question: "Will you monitor my flight for a Western Sydney Airport transfer?",
      answer: "Once the airport is operational, our team will be able to monitor flights using the flight number provided at booking to help coordinate pickup timing.",
    },
    {
      question: "What payment methods will be accepted?",
      answer: "We expect to accept cash, credit and debit cards, and secure online payments. We do not accept Cabcharge or NDIS payment cards.",
    },
    {
      question: "How far in advance should I book a Western Sydney Airport transfer?",
      answer: "We recommend booking as early as possible once bookings open for the airport, particularly for early operations, wheelchair-accessible vehicles, and larger groups.",
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

  console.log("Current metaTitle:", doc.metaTitle);
  console.log("Current h1:", doc.h1);
  console.log("New metaTitle:", newContent.metaTitle);
  console.log("New h1:", newContent.h1);
  console.log(`Content sections: ${doc.contentSections?.length ?? 0} -> ${newContent.contentSections.length}`);
  console.log(`FAQ entries: ${doc.faq?.length ?? 0} -> ${newContent.faq.length}`);

  if (process.env.LIVE !== "true") {
    console.log("\nDRY RUN - pass LIVE=true to actually write.");
    process.exit(0);
  }

  await payload.update({
    collection: "pages",
    id: doc.id,
    data: newContent,
  });

  console.log("\nSaved.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
