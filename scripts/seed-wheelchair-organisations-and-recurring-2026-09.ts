/**
 * Adds the "organisations/referrer funnel" + "recurring transport" + "safety & accessibility"
 * pages to the wheelchair site - the genuine content gaps identified against the live 40-URL
 * sitemap (powered wheelchair/mobility scooter/manual wheelchair/TTSS are already covered by
 * existing pages, so they are NOT duplicated here).
 *
 * Seeded as seoStatus: "review", indexOverride: "none" - previewable in the CMS but NOT
 * indexed (see lib/seo.ts's isIndexable() in wheelchair-taxi-sydney) until a human reads each
 * page and flips it to "approved". Images are reused from wheelchair-taxi-sydney/public/images
 * (already-live site photography) rather than new uploads - see createMediaUploader.
 *
 * Run in two passes:
 *   1. Upsert all 8 pages (content only, no relatedLinks yet - some link targets are
 *      pages created in this same run, so their IDs don't exist until pass 1 finishes).
 *   2. Re-fetch every page by slug and update each page's relatedLinks. Links to
 *      PRE-EXISTING pages (ndis-transport-sydney, hospital-transport-sydney, etc.) use a
 *      real targetPage relationship. Links between two pages IN THIS BATCH deliberately use
 *      a plain href string instead - resolveLink() renders either the same way, but a
 *      targetPage relationship graph with cycles (hub <-> sub-pages linking back to each
 *      other) made Payload's depth-based population hang indefinitely on read in testing.
 *      href avoids the relationship traversal entirely, so no cycle is possible.
 *
 * Run with: npm run seed:wheelchair-organisations-and-recurring   (from content-hub/)
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
  pageType: "service" | "location" | "other";
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
    slug: "recurring-wheelchair-transport-sydney",
    pageType: "service",
    navLabel: "Recurring Wheelchair Transport",
    targetKeyword: "Recurring Wheelchair Transport Sydney",
    metaTitle: "Recurring Wheelchair Transport Sydney | Set Up Regular Trips",
    metaDescription:
      "Set up regular wheelchair accessible transport in Sydney for weekly therapy, day programs, dialysis or NDIS appointments. One booking, ongoing reliable trips.",
    eyebrow: "Regular & Ongoing Transport",
    h1: "Recurring Wheelchair Transport Sydney",
    heroDescription:
      "Set up regular wheelchair accessible trips - weekly therapy, day programs, medical appointments or school runs - with one consistent booking arrangement instead of booking each trip from scratch.",
    image: "wheelchair-taxi-booking.png",
    imageAlt: "Wheelchair taxi booking set up for a recurring transport schedule",
    intro: [
      "Many of our passengers need the same trip on a regular basis - a weekly physiotherapy appointment, a Monday-to-Friday day program, fortnightly dialysis, or a school or workplace run. Booking each of these individually is unnecessary admin for you, your family or your care team.",
      "Recurring wheelchair transport lets you set up the schedule once - pickup, destination, days and times, wheelchair or mobility equipment details, and any support worker or carer arrangements - and we take care of allocating a suitable accessible vehicle for each trip.",
      "This is available for private passengers, families, aged care residents, hospital outpatients and eligible NDIS participants, including where a support coordinator or plan manager is arranging transport on someone's behalf.",
    ],
    introItemsIntro: "A recurring transport arrangement can cover:",
    introItems: [
      "Weekly or twice-weekly therapy (physiotherapy, occupational therapy, speech pathology)",
      "Day programs and community participation activities",
      "Dialysis and other regular medical treatment",
      "School, TAFE or workplace transport",
      "Standing hospital or specialist appointments",
      "Return trips on a fixed roster (e.g. supported accommodation to day program and back)",
    ],
    features: [
      { title: "One Setup, Ongoing Trips", description: "Tell us the schedule once - passenger details, wheelchair type, pickup and destination, days and times - and we handle it as an ongoing arrangement rather than a fresh booking each time." },
      { title: "Consistent Vehicle Allocation", description: "We aim to match your regular trip to a vehicle and driver familiar with the passenger's equipment and needs wherever the roster allows." },
      { title: "Works with Carers and Support Workers", description: "If a carer or support worker travels with the passenger, or coordinates the booking on their behalf, that's built into the arrangement from the start." },
      { title: "NDIS-Friendly", description: "As an NDIS registered provider, available to eligible self-managed, plan-managed and NDIA-managed NDIS participants, and to support coordinators and plan managers arranging transport for a client." },
      { title: "Change or Pause Anytime", description: "Appointments move, programs change and circumstances shift - let us know and we'll adjust the recurring schedule accordingly." },
      { title: "Billing That Suits Your Arrangement", description: "Recurring trips can be billed to the passenger, a family member, a facility, or a plan manager, depending on how the booking is set up." },
    ],
    faq: [
      { question: "How do I set up recurring wheelchair transport?", answer: "Call or message our booking team with the pickup and destination, the days and times you need the trip, and the passenger's wheelchair or mobility equipment details. We'll confirm the arrangement and allocate a suitable accessible vehicle for each scheduled trip." },
      { question: "Can a support coordinator or plan manager set this up on behalf of a client?", answer: "Yes. Support coordinators and plan managers can arrange recurring transport for a participant, including passing on wheelchair/mobility details, carer arrangements and billing information." },
      { question: "What if an appointment time changes or is cancelled?", answer: "Let us know as early as you can and we'll adjust or pause that trip in the schedule. Recurring transport is flexible around changing appointments and programs." },
      { question: "Is recurring transport available for NDIS participants?", answer: "Yes. As an NDIS registered provider we can arrange recurring transport for self-managed, plan-managed and NDIA-managed participants, subject to the participant's plan and funding arrangements." },
      { question: "Can the same driver do our regular trip each time?", answer: "We aim to allocate a driver and vehicle familiar with the passenger's equipment and routine wherever our roster allows, though this can't be guaranteed for every trip." },
    ],
    relatedLinks: [
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital and medical appointments.", targetSlug: "hospital-transport-sydney" },
      { icon: "🧓", title: "Aged Care Transport Sydney", description: "Regular transport for aged care residents and facilities.", targetSlug: "aged-care-transport-sydney" },
      { icon: "🤝", title: "For Support Coordinators", description: "Arrange reliable transport for your clients.", href: "/support-coordinator-transport-sydney/" },
    ],
  },
  {
    slug: "organisations",
    pageType: "other",
    navLabel: "Organisations",
    targetKeyword: "Accessible Transport for Organisations Sydney",
    metaTitle: "Accessible Transport for Organisations | Wheelchair Taxi Sydney",
    metaDescription:
      "Support coordinators, plan managers, aged care facilities, hospitals and disability organisations - arrange reliable wheelchair accessible transport for your clients and residents.",
    eyebrow: "For Organisations & Referrers",
    h1: "Accessible Transport for Organisations",
    heroDescription:
      "We work with support coordinators, plan managers, aged care facilities, hospitals, clinics and disability organisations to arrange reliable wheelchair accessible transport for the people you support.",
    image: "organisations-and-customers-we-assist.webp",
    imageAlt: "Organisations and customers Wheelchair Taxi Sydney assists",
    intro: [
      "If you're arranging transport on behalf of someone else - a client, resident, patient or participant - the priorities are different to booking a single ride for yourself. You need a provider who understands wheelchair and mobility equipment, can take instructions from a third party, and can bill the right person or organisation.",
      "We work directly with the organisations below to set up individual bookings, recurring transport schedules, and clear points of contact for your team.",
    ],
    introItemsIntro: "We work with:",
    introItems: [
      "Support coordinators",
      "Plan managers",
      "Aged care facilities and retirement villages",
      "Hospitals, clinics and rehabilitation centres",
      "Disability service providers and community organisations",
    ],
    features: [
      { title: "Direct Line for Your Team", description: "A consistent point of contact for booking, changes and questions, rather than starting from scratch with each request." },
      { title: "Wheelchair & Equipment Detail Captured Upfront", description: "We record mobility device type, dimensions where relevant, carer requirements and any special instructions against each client or resident." },
      { title: "Flexible Billing", description: "Invoicing can be arranged to the organisation, a plan manager, or the individual, depending on the arrangement." },
      { title: "One-Off and Recurring Bookings", description: "From a single hospital transfer to an ongoing weekly roster, we can accommodate both." },
    ],
    faq: [
      { question: "How do we set up an account or ongoing arrangement?", answer: "Contact our team with your organisation's details and the type of transport you're likely to need (one-off, recurring, or both). We'll confirm how bookings and billing will work for your organisation." },
      { question: "Can you take bookings directly from our staff rather than the client?", answer: "Yes. Support coordinators, plan managers, facility staff and clinicians can book directly on behalf of the person travelling." },
      { question: "Do you invoice our organisation or the client directly?", answer: "Either, depending on what you set up with us - invoices can go to your organisation, a plan manager, or the individual passenger." },
      { question: "Can you handle a mix of wheelchair, mobility scooter and ambulant passengers?", answer: "Yes. Let us know each passenger's mobility equipment when booking so we can allocate a suitable vehicle." },
    ],
    relatedLinks: [
      { icon: "🤝", title: "For Support Coordinators", description: "Arrange reliable transport for your clients.", href: "/support-coordinator-transport-sydney/" },
      { icon: "💳", title: "For Plan Managers", description: "Invoicing and transport for plan-managed clients.", href: "/plan-manager-transport-sydney/" },
      { icon: "🧓", title: "For Aged Care Providers", description: "Resident appointments, transfers and outings.", href: "/aged-care-provider-transport-sydney/" },
      { icon: "🏥", title: "For Hospitals & Clinics", description: "Discharge, transfers and outpatient transport.", href: "/hospital-referral-transport-sydney/" },
      { icon: "🧩", title: "For Disability Organisations", description: "Client and community transport for your organisation.", href: "/disability-organisation-transport-sydney/" },
      { icon: "🔁", title: "Recurring Wheelchair Transport", description: "Set up an ongoing schedule for your clients.", href: "/recurring-wheelchair-transport-sydney/" },
    ],
  },
  {
    slug: "support-coordinator-transport-sydney",
    pageType: "service",
    navLabel: "For Support Coordinators",
    targetKeyword: "NDIS Transport for Support Coordinators",
    metaTitle: "Transport for Support Coordinators | NDIS Transport Sydney",
    metaDescription:
      "Arrange wheelchair accessible transport for your NDIS clients - one-off trips or recurring schedules - with a provider that understands mobility equipment and NDIS billing.",
    eyebrow: "For Support Coordinators",
    h1: "Wheelchair Transport for Support Coordinators",
    heroDescription:
      "Arrange reliable, wheelchair accessible transport for your NDIS clients - from a single appointment to a standing weekly schedule.",
    image: "best-wheelchair-taxi-service-sydney.webp",
    imageAlt: "Wheelchair taxi arranged by a support coordinator for an NDIS client",
    intro: [
      "As a support coordinator, you're often the one who has to sort out transport when a client's usual arrangement falls through, or when they need accessible transport for a new appointment, activity or program.",
      "We can take bookings directly from you on a client's behalf, work from the wheelchair or mobility equipment details you provide, and set up a recurring schedule where that's what the client needs.",
      "As an NDIS registered provider, we can support self-managed, plan-managed and NDIA-managed participants, subject to their plan and funding arrangements.",
    ],
    introItemsIntro: "This typically covers:",
    introItems: [
      "Appointment and therapy transport",
      "Community participation and day program transport",
      "Recurring weekly or fortnightly schedules",
      "One-off transport when a client's regular arrangement isn't available",
      "Coordination with the client's carer or support worker where relevant",
    ],
    features: [
      { title: "Book on a Client's Behalf", description: "Give us the client's wheelchair or mobility equipment details, pickup/destination and schedule - we don't need the client to make contact themselves." },
      { title: "Registered Provider", description: "As an NDIS registered provider, we can support participants regardless of whether their plan is self-managed, plan-managed or NDIA-managed." },
      { title: "Recurring or One-Off", description: "Set up a standing weekly schedule for a client, or book a single trip when needed." },
      { title: "Clear Communication", description: "We can confirm bookings and any changes with you directly as the coordinator, alongside the client or their carer." },
    ],
    faq: [
      { question: "Can I book transport for a client without them contacting you directly?", answer: "Yes. As their support coordinator you can provide the client's details, wheelchair/mobility equipment information and the trip requirements, and we'll arrange it from there." },
      { question: "Do you work with both plan-managed and NDIA-managed clients?", answer: "Yes. As an NDIS registered provider we can support self-managed, plan-managed and NDIA-managed participants, subject to their plan and funding arrangements." },
      { question: "Can you set up a recurring transport schedule for a client?", answer: "Yes - see our Recurring Wheelchair Transport service, which we can set up directly from a support coordinator referral." },
      { question: "How do I get in touch to arrange transport for a client?", answer: "Contact our booking team by phone, email or WhatsApp with the client's details and requirements." },
    ],
    relatedLinks: [
      { icon: "🏢", title: "Organisations", description: "Accessible transport for organisations and referrers.", href: "/organisations/" },
      { icon: "🔁", title: "Recurring Wheelchair Transport", description: "Set up an ongoing schedule for a client.", href: "/recurring-wheelchair-transport-sydney/" },
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "💳", title: "For Plan Managers", description: "Invoicing and transport for plan-managed clients.", href: "/plan-manager-transport-sydney/" },
    ],
  },
  {
    slug: "plan-manager-transport-sydney",
    pageType: "service",
    navLabel: "For Plan Managers",
    targetKeyword: "NDIS Transport for Plan Managers",
    metaTitle: "Transport for NDIS Plan Managers | Wheelchair Taxi Sydney",
    metaDescription:
      "Wheelchair accessible transport for plan-managed NDIS participants, with clear invoicing for plan managers and straightforward booking arrangements.",
    eyebrow: "For Plan Managers",
    h1: "Wheelchair Transport for Plan Managers",
    heroDescription:
      "Wheelchair accessible transport for your plan-managed clients, with invoicing set up to suit how your organisation processes payments.",
    image: "wheelchair-taxi-fare-estimator.png",
    imageAlt: "Wheelchair taxi fare and invoicing for NDIS plan managers",
    intro: [
      "If you manage NDIS funding for participants who use a wheelchair, powered wheelchair or mobility scooter, transport is one of the services you're likely to be asked to help arrange or pay for.",
      "We can set up transport bookings for your clients directly, and arrange invoicing to your organisation rather than the participant, so it fits your existing payment process.",
      "As an NDIS registered provider, we can support plan-managed participants as well as self-managed and NDIA-managed arrangements where relevant.",
    ],
    introItemsIntro: "This can cover:",
    introItems: [
      "Invoicing to your organisation for a client's transport",
      "One-off and recurring trip bookings",
      "Clear records of trips against a specific participant",
      "Coordination with the participant, their family, carer or support coordinator",
    ],
    features: [
      { title: "Invoicing That Suits Plan Management", description: "We can invoice your organisation directly for a participant's transport, with records that make reconciliation straightforward." },
      { title: "Registered Provider", description: "As an NDIS registered provider, we can support plan-managed participants under NDIS funding arrangements." },
      { title: "Recurring Trip Billing", description: "For an ongoing weekly or regular schedule, invoicing can be set up to match the recurring arrangement rather than billed trip-by-trip if that suits your process." },
      { title: "Works Alongside Support Coordinators", description: "Where a participant also has a support coordinator, we can take booking instructions from either party." },
    ],
    faq: [
      { question: "Can you invoice our organisation directly instead of the participant?", answer: "Yes, we can set up invoicing to your organisation for a plan-managed client's transport." },
      { question: "Do you work with self-managed and NDIA-managed participants too?", answer: "Yes. As an NDIS registered provider we support self-managed, plan-managed and NDIA-managed participants, subject to their plan and funding arrangements." },
      { question: "What information do you need to set up billing for a client?", answer: "Your organisation's invoicing details, the participant's name, and confirmation of the transport arrangement (one-off or recurring)." },
      { question: "Can we set up recurring invoicing for a standing transport schedule?", answer: "Yes - let us know when setting up a Recurring Wheelchair Transport arrangement and we'll align invoicing with it." },
    ],
    relatedLinks: [
      { icon: "🏢", title: "Organisations", description: "Accessible transport for organisations and referrers.", href: "/organisations/" },
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "🔁", title: "Recurring Wheelchair Transport", description: "Set up an ongoing schedule for a client.", href: "/recurring-wheelchair-transport-sydney/" },
      { icon: "🤝", title: "For Support Coordinators", description: "Arrange reliable transport for your clients.", href: "/support-coordinator-transport-sydney/" },
    ],
  },
  {
    slug: "aged-care-provider-transport-sydney",
    pageType: "service",
    navLabel: "For Aged Care Providers",
    targetKeyword: "Wheelchair Transport for Aged Care Providers",
    metaTitle: "Transport for Aged Care Providers | Wheelchair Taxi Sydney",
    metaDescription:
      "Set up reliable wheelchair accessible transport for your aged care facility - resident appointments, hospital transfers, outings and recurring schedules.",
    eyebrow: "For Aged Care Providers",
    h1: "Wheelchair Transport for Aged Care Providers",
    heroDescription:
      "Reliable, wheelchair accessible transport for your residents - medical appointments, hospital transfers, family outings and recurring schedules - arranged directly with your facility.",
    image: "aged-care-home-transfers.png",
    imageAlt: "Wheelchair transport for an aged care facility resident",
    intro: [
      "Aged care facilities regularly need to arrange transport for residents who use a wheelchair, walker or mobility scooter - a specialist appointment, a hospital transfer, a family visit, or a standing weekly outing.",
      "We can take bookings directly from facility staff, work from each resident's mobility and care details on file, and set up recurring transport for residents with a regular schedule.",
      "Where a staff member or family member needs to travel with the resident, that's factored into the booking.",
    ],
    introItemsIntro: "We support facilities with:",
    introItems: [
      "Specialist and GP appointment transport",
      "Hospital transfers and discharge trips",
      "Family visits and outings",
      "Recurring weekly or fortnightly transport for residents with a standing schedule",
      "Transport for residents using manual wheelchairs, powered wheelchairs or mobility scooters",
    ],
    features: [
      { title: "Book Directly as a Facility", description: "Facility staff can book on behalf of a resident, providing mobility equipment details and any care instructions." },
      { title: "Staff or Family Escort", description: "If a staff member or family member is travelling with the resident, let us know when booking." },
      { title: "Recurring Resident Transport", description: "Set up an ongoing schedule for residents with regular appointments or outings." },
      { title: "Facility Billing", description: "Invoicing can be arranged to your facility rather than the resident, depending on your arrangement." },
    ],
    faq: [
      { question: "Can facility staff book transport on behalf of a resident?", answer: "Yes. Provide the resident's mobility equipment details and trip requirements, and our team will arrange a suitable accessible vehicle." },
      { question: "Can a staff member or family member travel with the resident?", answer: "Yes, let us know when booking so we can allocate a vehicle with enough space." },
      { question: "Do you support residents using powered wheelchairs and mobility scooters, not just manual wheelchairs?", answer: "Yes, subject to the vehicle configuration and the equipment's dimensions - let us know the type of mobility device when booking." },
      { question: "Can we set up recurring transport for residents with a regular schedule?", answer: "Yes - see our Recurring Wheelchair Transport service, which we can set up directly for your facility's residents." },
    ],
    relatedLinks: [
      { icon: "🏢", title: "Organisations", description: "Accessible transport for organisations and referrers.", href: "/organisations/" },
      { icon: "🧓", title: "Aged Care Transport Sydney", description: "Wheelchair transport for aged care residents.", targetSlug: "aged-care-transport-sydney" },
      { icon: "🔁", title: "Recurring Wheelchair Transport", description: "Set up an ongoing schedule for residents.", href: "/recurring-wheelchair-transport-sydney/" },
      { icon: "🏥", title: "For Hospitals & Clinics", description: "Discharge, transfers and outpatient transport.", href: "/hospital-referral-transport-sydney/" },
    ],
  },
  {
    slug: "hospital-referral-transport-sydney",
    pageType: "service",
    navLabel: "For Hospitals & Clinics",
    targetKeyword: "Wheelchair Transport for Hospitals and Clinics",
    metaTitle: "Transport for Hospitals & Clinics | Wheelchair Taxi Sydney",
    metaDescription:
      "Arrange wheelchair accessible transport for patient discharge, transfers and outpatient appointments - a direct booking option for hospital and clinic staff.",
    eyebrow: "For Hospitals & Clinics",
    h1: "Wheelchair Transport for Hospitals and Clinics",
    heroDescription:
      "A direct booking option for hospital and clinic staff arranging wheelchair accessible transport for patient discharge, transfers and outpatient appointments.",
    image: "wheelchair-accessible-ford-transit-custom.jpg",
    imageAlt: "Wheelchair accessible vehicle used for hospital patient transfers",
    intro: [
      "Discharge planning and outpatient scheduling often come down to whether accessible transport can be arranged in time. We work with hospital and clinic staff to book wheelchair accessible transport for patients directly, without requiring the patient to make the booking themselves.",
      "This covers discharge transport home or to a rehabilitation or aged care facility, transfers between facilities, and recurring outpatient appointments such as dialysis or rehabilitation.",
      "Where a family member or support worker is travelling with the patient, or where luggage and equipment need to come too, let us know when booking.",
    ],
    introItemsIntro: "Clinical and administrative staff use this for:",
    introItems: [
      "Hospital discharge transport",
      "Inter-facility transfers",
      "Recurring outpatient appointments (dialysis, rehabilitation, therapy)",
      "Transport coordinated with a patient's family, carer or aged care facility",
    ],
    features: [
      { title: "Book Directly as Clinical/Admin Staff", description: "Staff can arrange transport on a patient's behalf, including wheelchair or mobility equipment details and any assistance required." },
      { title: "Discharge-Ready Scheduling", description: "Where possible, we work with your discharge timeframe rather than requiring a fixed booking window." },
      { title: "Recurring Outpatient Transport", description: "Set up a standing schedule for patients attending regular treatment such as dialysis or rehabilitation." },
      { title: "Coordination with Family and Facilities", description: "We can coordinate pickup/drop-off with a patient's family, carer, or receiving aged care or rehabilitation facility." },
    ],
    faq: [
      { question: "Can hospital staff book transport directly for a patient?", answer: "Yes. Provide the patient's mobility equipment details, pickup/destination and timing, and our team will arrange a suitable vehicle." },
      { question: "Can you support tight discharge timeframes?", answer: "We'll do our best to work with your discharge timing - contact our team as early as possible so we can confirm vehicle availability." },
      { question: "Can you arrange recurring transport for outpatients attending regular treatment?", answer: "Yes - see our Recurring Wheelchair Transport service, which we can set up directly from a hospital or clinic referral." },
      { question: "Can transport be booked between two facilities rather than to a home address?", answer: "Yes, we arrange inter-facility transfers as well as trips to and from a patient's home." },
    ],
    relatedLinks: [
      { icon: "🏢", title: "Organisations", description: "Accessible transport for organisations and referrers.", href: "/organisations/" },
      { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", targetSlug: "hospital-transport-sydney" },
      { icon: "🩺", title: "Rehabilitation Transport Sydney", description: "Transport for rehabilitation appointments.", targetSlug: "rehabilitation-transport-sydney" },
      { icon: "🔁", title: "Recurring Wheelchair Transport", description: "Set up an ongoing schedule for outpatients.", href: "/recurring-wheelchair-transport-sydney/" },
      { icon: "🧓", title: "For Aged Care Providers", description: "Resident appointments, transfers and outings.", href: "/aged-care-provider-transport-sydney/" },
    ],
  },
  {
    slug: "disability-organisation-transport-sydney",
    pageType: "service",
    navLabel: "For Disability Organisations",
    targetKeyword: "Wheelchair Transport for Disability Organisations",
    metaTitle: "Transport for Disability Organisations | Wheelchair Taxi Sydney",
    metaDescription:
      "Wheelchair accessible transport for disability service providers and community organisations - client transport, group activities and recurring schedules.",
    eyebrow: "For Disability Organisations",
    h1: "Wheelchair Transport for Disability Organisations",
    heroDescription:
      "Wheelchair accessible transport for the clients and participants your organisation supports - individual trips, community activities and recurring schedules.",
    image: "benefits-of-disabled-taxi-sydney.webp",
    imageAlt: "Wheelchair accessible transport for a disability organisation's clients",
    intro: [
      "Disability service providers and community organisations often need to arrange transport for clients attending programs, appointments or community activities, sometimes at short notice.",
      "We work directly with organisation staff to book transport for individual clients or small groups, using each person's mobility equipment and support needs on file.",
      "Recurring transport can be set up for clients with a standing program or activity schedule.",
    ],
    introItemsIntro: "We support organisations with:",
    introItems: [
      "Individual client transport to appointments and activities",
      "Community participation and day program transport",
      "Recurring weekly transport for clients with a standing schedule",
      "Coordination with a client's carer, support worker or family",
    ],
    features: [
      { title: "Book on Behalf of Clients", description: "Organisation staff can arrange transport directly, providing each client's mobility equipment and support details." },
      { title: "Individual and Group Bookings", description: "From a single client's appointment to a small group heading to the same activity, let us know the numbers and equipment involved." },
      { title: "Recurring Program Transport", description: "Set up an ongoing schedule for clients attending a regular program or activity." },
      { title: "Works Alongside Support Coordinators", description: "Where a client also has a support coordinator or plan manager, we can take instructions from whichever party is arranging the booking." },
    ],
    faq: [
      { question: "Can our organisation book transport directly for a client?", answer: "Yes. Provide the client's mobility equipment details and trip requirements, and we'll arrange a suitable vehicle." },
      { question: "Can you transport a small group heading to the same activity?", answer: "Yes, subject to vehicle capacity and each passenger's mobility equipment - let us know the group size and equipment when booking." },
      { question: "Can we set up recurring transport for clients attending a weekly program?", answer: "Yes - see our Recurring Wheelchair Transport service, which we can set up directly for your organisation's clients." },
      { question: "Do you work with clients who have a support coordinator or plan manager?", answer: "Yes, we can take booking and billing instructions from whichever party is arranging the client's transport." },
    ],
    relatedLinks: [
      { icon: "🏢", title: "Organisations", description: "Accessible transport for organisations and referrers.", href: "/organisations/" },
      { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "🔁", title: "Recurring Wheelchair Transport", description: "Set up an ongoing schedule for clients.", href: "/recurring-wheelchair-transport-sydney/" },
      { icon: "🤝", title: "For Support Coordinators", description: "Arrange reliable transport for your clients.", href: "/support-coordinator-transport-sydney/" },
    ],
  },
  {
    slug: "safety-accessibility",
    pageType: "other",
    navLabel: "Safety & Accessibility",
    targetKeyword: "Wheelchair Taxi Safety and Accessibility Sydney",
    metaTitle: "Safety & Accessibility | Wheelchair Taxi Sydney",
    metaDescription:
      "How our wheelchair accessible vehicles, equipment and drivers work - securement, ramps and lifts, boarding assistance, and how to raise a concern.",
    eyebrow: "Trust & Accessibility",
    h1: "Safety and Accessibility",
    heroDescription: "How our wheelchair accessible vehicles, equipment and drivers work, so you know what to expect before you book.",
    image: "accessible-van-assistance.webp",
    imageAlt: "Driver providing boarding assistance for a wheelchair accessible vehicle",
    intro: [
      "Booking a wheelchair accessible taxi means trusting a stranger with your safety, your equipment and your time. Here's how our vehicles, equipment and drivers work, in plain terms.",
      "This page covers what to expect from our vehicles and drivers. If anything doesn't match what you experience on a trip, we want to know - contact details are at the bottom of this page.",
    ],
    introItemsIntro: "In general, our accessible vehicles are set up with:",
    introItems: [
      "A ramp or hydraulic lift for wheelchair boarding",
      "Wheelchair restraint points to secure the wheelchair during travel",
      "Configurable interior space for manual wheelchairs, powered wheelchairs and mobility scooters, subject to size and vehicle availability",
      "Space for a carer, support worker or family member to travel alongside the passenger, where the vehicle configuration allows",
    ],
    features: [
      { title: "Boarding and Securement", description: "Drivers assist with boarding via the vehicle's ramp or lift and securing the wheelchair using the vehicle's restraint points before the trip begins." },
      { title: "Vehicle Checks", description: "Accessible vehicles and their ramps, lifts and restraints are checked as part of our regular vehicle maintenance." },
      { title: "Equipment Matching", description: "We ask for wheelchair or mobility scooter details when you book so we can allocate a vehicle suited to the equipment, rather than guessing on the day." },
      { title: "Driver Assistance", description: "Drivers are expected to assist respectfully with boarding, securing equipment and any reasonable assistance a passenger needs during the trip." },
      { title: "Raising a Concern", description: "If a trip didn't go the way it should have - equipment handling, driver conduct or anything else - contact our team directly and we'll follow it up." },
    ],
    faq: [
      { question: "How is my wheelchair secured during the trip?", answer: "Our accessible vehicles have wheelchair restraint points, and drivers secure the wheelchair using these before the vehicle moves." },
      { question: "Can I stay in my wheelchair for the whole trip?", answer: "In most cases yes, once it's secured in the vehicle - let us know your wheelchair type when booking so we can confirm vehicle suitability." },
      { question: "What if my wheelchair or mobility scooter is larger than usual?", answer: "Tell us the dimensions and type when booking (manual, powered, or mobility scooter) so we can check vehicle suitability before confirming the trip." },
      { question: "What happens if something goes wrong with a booking or a driver?", answer: "Contact our team directly with the details - we follow up on every concern raised about a trip." },
      { question: "Are your drivers trained to assist wheelchair passengers?", answer: "Drivers assisting with wheelchair accessible bookings are expected to know how to use the vehicle's ramp/lift and restraint system safely and to provide respectful assistance to passengers." },
    ],
    relatedLinks: [
      { icon: "♿", title: "Wheelchair Accessible Taxi", description: "Our core wheelchair accessible taxi service.", targetSlug: "wheelchair-accessible-taxi" },
      { icon: "🩺", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", targetSlug: "ndis-transport-sydney" },
      { icon: "🧓", title: "Aged Care Transport Sydney", description: "Wheelchair transport for aged care residents.", targetSlug: "aged-care-transport-sydney" },
      { icon: "ℹ️", title: "About Us", description: "Who we are and how we work.", href: "/aboutus/" },
    ],
  },
];

async function run() {
  const payload = await getPayload({ config });
  const getOrUploadMedia = createMediaUploader(payload, publicDir);
  const site = await payload.find({ collection: "sites", where: { key: { equals: "wheelchair" } }, limit: 1 });
  const siteId = site.docs[0]?.id;
  if (!siteId) throw new Error('Site "wheelchair" not found - run npm run seed:wheelchair first.');

  console.log(`Pass 1: upserting ${pages.length} pages (seoStatus: review, no relatedLinks yet)...`);
  for (const p of pages) {
    const imageId = await getOrUploadMedia(`/images/${p.image}`, p.imageAlt);
    const data = {
      site: siteId,
      pageType: p.pageType,
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

  console.log("Pass 2: resolving relatedLinks between the new pages (and existing pages they reference)...");
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

  console.log("Done. All 8 pages are seoStatus: review - not indexed until approved in the CMS.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
