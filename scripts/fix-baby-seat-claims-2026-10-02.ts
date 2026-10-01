/**
 * Baby Seat Taxi Sydney accuracy pass, 2026-10-02 (SEO audit priorities 1, 12 and 14/28).
 *
 * 1. Removes claims that can't be documented for every driver/seat/booking: "exceeds AS/NZS 1754",
 *    "checked by authorised checking stations", WWCC / First Aid / CPR for all drivers, monthly
 *    inspections, weekly professional cleaning, product features (Isofix, side-impact, climate
 *    control), discounted round trips, unsourced population stats and fixed journey times.
 * 2. Standardises restraint descriptions: no fixed age bands (0-6 months, 0-12 months, 1-5 years,
 *    6 months-2 years etc. contradicted each other) - parents give each child's age and approximate
 *    size and an appropriate restraint is arranged. Restates the NSW taxi rules accurately.
 * 3. Corrects the "Do taxis need baby seats" blog post, which said babies under 12 months may
 *    travel in a taxi without a restraint - NSW rules require one.
 * 4. Rewrites the Sydney Airport hub with practical booking information. (The Western Sydney
 *    Airport page is not touched - next.config redirects it to tiptopmaxisydney.com.au.)
 *
 * After the replacements, every page is rescanned for leftover risky wording and anything found is
 * printed, so live text that has drifted from the source snapshot is not silently missed.
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-baby-seat-claims-2026-10-02.ts
 * (dry-run by default - pass LIVE=true to actually write; a backup of every original field is
 * written to scripts/backups/ first, restorable with --restore scripts/backups/<file>.json)
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "baby-seat";

type Replacement = { old: string; new: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepReplace(value: any, pairs: Replacement[], counts: number[]): any {
  if (typeof value === "string") {
    let out = value;
    pairs.forEach((p, i) => {
      if (out.includes(p.old)) {
        counts[i] += out.split(p.old).length - 1;
        out = out.split(p.old).join(p.new);
      }
    });
    return out;
  }
  if (Array.isArray(value)) return value.map((v) => deepReplace(v, pairs, counts));
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = deepReplace(v, pairs, counts);
    return out;
  }
  return value;
}

const RESTRAINT_ON_REQUEST =
  "Tell us each child's age and approximate size when booking and we'll arrange an appropriate restraint for the journey. You're also welcome to use your own approved child restraint.";
const OWN_SEAT_ANSWER =
  "No. Request a child restraint when you book - tell us each child's age and approximate size and an appropriate restraint will be arranged for your trip. You're also welcome to use your own approved restraint.";
const INFANT_FEATURE = {
  title: "Baby / Infant Restraints",
  description: "Rear-facing options for babies who need an appropriate rear-facing restraint, including newborns leaving hospital.",
};
const CHILD_FEATURE = {
  title: "Toddler / Child Restraints & Boosters",
  description: "Child restraints arranged according to your child's age and size, plus booster seats for older children where appropriate.",
};
const FAMILY_FEATURE = {
  title: "Planned Around Your Family",
  description: "Passengers, child restraints, prams and luggage are recorded at booking so the vehicle suits your family.",
};
const NSW_TAXI_RULES =
  "In NSW taxis, children up to 6 months must use a rear-facing child restraint, children aged 6 to 12 months must use a rear-facing restraint or a forward-facing restraint with an inbuilt harness, and children over 12 months must use a booster seat or a properly adjusted and fastened seatbelt. Booked hire and rideshare vehicles follow different rules - see our NSW taxi baby seat laws guide.";

// Applied to every baby-seat page. Strings are taken from the live source snapshot
// (scripts/source-snapshots/baby-seat/servicePages.ts).
const replacements: Replacement[] = [
  // --- baby-capsule-taxi-sydney
  {
    old: "Every restraint is checked before the journey to ensure correct installation and maximum safety.",
    new: "Tell us your baby's age when booking so a suitable rear-facing restraint is arranged before your journey.",
  },
  { old: "Clean and Sanitised Vehicles", new: "Room for Prams and Baby Gear" },
  {
    old: "All baby capsules and vehicles are regularly cleaned and maintained to provide a hygienic environment for your family.",
    new: "Tell us about prams, baby bags and luggage when booking so we can arrange a suitably sized vehicle.",
  },
  // --- taxi-with-baby-seat-sydney
  {
    old: "provides professionally fitted baby capsules and child seats for safe, family-friendly transport throughout Sydney, available 24/7.",
    new: "arranges baby capsules, child restraints and booster seats at booking for family transport throughout Sydney, available 24/7.",
  },
  {
    old: "Safe, reliable and family-friendly transport across Sydney — professionally fitted baby capsules and child seats so your child travels safely and comfortably.",
    new: "Pre-booked family transport across Sydney, with the child restraint requested for your journey.",
  },
  {
    old: "we provide professionally fitted baby capsules and child seats to ensure your child travels safely and comfortably throughout Sydney.",
    new: "we arrange baby capsules, child restraints and booster seats for journeys throughout Sydney.",
  },
  {
    old: "Professionally Fitted Baby Seats — installed and checked before every trip",
    new: "Child Restraints Requested at Booking — tell us each child's age and approximate size",
  },
  {
    old: "Sydney Airport Specialists — reliable transfers with flight monitoring and luggage/pram assistance",
    new: "Sydney Airport Transfers — flight number recorded against your booking, with room for luggage and prams",
  },
  { old: "Baby Capsule Taxi Sydney (Newborn to 12 Months)", new: INFANT_FEATURE.title },
  {
    old: "Rear-facing baby capsules suitable for newborn babies and young infants, providing the highest level of protection and comfort during travel.",
    new: INFANT_FEATURE.description,
  },
  { old: "Child Seat Taxi Sydney (6 Months to 4 Years)", new: CHILD_FEATURE.title },
  {
    old: "Approved forward-facing child restraints for toddlers and young children that meet Australian safety requirements.",
    new: CHILD_FEATURE.description,
  },
  {
    old: "Child restraints are checked before every trip, vehicles are clean and sanitised, and drivers are family-friendly. Advance booking is recommended.",
    new: "Tell us each child's age and approximate size when booking so we can arrange an appropriate restraint. Advance booking is recommended.",
  },
  // --- baby-car-seat-taxi-sydney
  { old: "Baby Car Seat Taxi Sydney | Certified AS1754 Child Restraints", new: "Baby Car Seat Taxi Sydney | Capsules, Child Seats & Boosters" },
  {
    old: "with baby capsules, child car seats and boosters certified to Australian Standard AS 1754.",
    new: "with baby capsules, child car seats and boosters arranged at booking.",
  },
  {
    old: "all our cars and minivans are equipped with the latest Australian-compliant safety baby capsules, child car seats and boosters.",
    new: "baby capsules, child car seats and boosters can be arranged for your booking.",
  },
  {
    old: "According to the Sydney transport department, there are strict rules regarding the facing of infants and babies while secured in taxi seats: children aged 0 to 6 months must be restrained with a secure, rear-facing baby car seat, and children aged 6 months to 4 years must be rear-facing or forward-facing in their seat with proper restraint. All our cars and minivans are equipped with the latest Australian-compliant safety baby capsules, child car seats and boosters, for children and babies of all ages and sizes.",
    new: NSW_TAXI_RULES,
  },
  {
    old: "Our passengers' safety is our number one priority — all our car seats are fully certified to Australian Standard AS 1754, fully labelled, and checked regularly by authorised checking stations. Our driving staff are all experienced with driving children and families, and our range of vehicles includes luxury limousines and Maxi Taxis to fit the whole family and their luggage.",
    new: `${RESTRAINT_ON_REQUEST} Vehicles range from sedans to maxi taxis, selected around your family's passengers, child restraints and luggage.`,
  },
  { old: "AS 1754 Certified Restraints", new: "Restraints Arranged at Booking" },
  {
    old: "All car seats are fully certified to Australian Standard AS 1754, fully labelled, and checked regularly by authorised checking stations.",
    new: RESTRAINT_ON_REQUEST,
  },
  {
    old: "All drivers are fully trained and experienced to ensure your baby or child is comfortable and safely seated in their car seat, capsule or booster.",
    new: "Drivers allow time at pickup for your child to be seated in their capsule, child seat or booster before departure.",
  },
  { old: "Always On Time", new: "Time to Settle In" },
  {
    old: "Drivers arrive well ahead of schedule, leaving enough time to safely and securely place your child or baby in their seat.",
    new: "Tell us about prams, luggage and the number of children when booking so enough time is allowed at pickup.",
  },
  {
    old: "Children aged 0 to 6 months need to be restrained with a secure, rear-facing baby car seat. Children aged 6 months to 4 years must travel rear-facing or forward-facing in their seat with proper restraint.",
    new: NSW_TAXI_RULES,
  },
  { old: "Are your car seats certified?", new: "Can I choose which restraint my child uses?" },
  {
    old: "Yes. All our car seats are fully certified to Australian Standard AS 1754, fully labelled, and checked regularly by authorised checking stations.",
    new: "Tell us each child's age and approximate size and we'll arrange an appropriate restraint. You're also welcome to use your own approved restraint.",
  },
  {
    old: "Our range includes the latest sedans and luxury vehicles as well as Maxi Taxis and limousines, so we can fit the whole family and their luggage.",
    new: "We arrange sedans, SUVs, 7-seat vehicles and maxi taxis depending on your family's passengers, child restraints and luggage.",
  },
  // --- baby-seat-taxi-sydney-airport
  {
    old: "with professionally fitted baby capsules and child seats from doorstep to terminal.",
    new: "with baby capsules, child seats and booster seats arranged at booking.",
  },
  {
    old: "we provide professionally fitted baby capsules and child seats so your family can travel safely from your doorstep to the terminal.",
    new: "tell us who's travelling and we'll arrange the child restraints and a vehicle with room for your luggage and pram.",
  },
  {
    old: "We provide professionally fitted baby capsules and child seats ensuring your family can travel safely from your doorstep to the airport terminal.",
    new: "Baby capsules, child seats and booster seats are arranged at booking, with each child's restraint requirements recorded against your trip.",
  },
  { old: "Guaranteed child seat availability, better planning", new: "Child restraint requirements recorded in advance, better planning" },
  {
    old: "Yes, multiple baby seats and booster seats can be arranged.",
    new: "Yes. Request a restraint for each child - multiple restraints are subject to vehicle configuration and availability.",
  },
  // --- Parramatta
  {
    old: "certified child restraints fitted correctly to AS/NZS 1754, fixed prices",
    new: "child restraints arranged at booking, fixed prices",
  },
  {
    old: "Every vehicle in our fleet comes fitted with certified child restraints, installed correctly, cleaned before every ride, and ready to go when you are. You don't need to bring your own seat, wrestle with unfamiliar clips, or hope for the best. We handle the safety side, you just handle the kids.",
    new: "Tell us each child's age and approximate size when you book and the requested child restraint is arranged for your trip. You don't need to bring your own seat - though you're welcome to.",
  },
  {
    old: "We carry infant capsules (0-6 months) for newborns and rear-facing infant car seats (6 months-2 years) for babies who've outgrown the capsule, both properly harnessed and installed to Australian Standard AS/NZS 1754.",
    new: "We arrange rear-facing restraints for babies, child restraints for toddlers and booster seats for older children, based on each child's age and approximate size.",
  },
  { old: "Certified Seats, Always Fitted Correctly", new: "Restraints Arranged at Booking" },
  {
    old: "Every child restraint meets Australian Standard AS/NZS 1754. Our drivers are trained in correct installation - before your trip, the seat is checked, secured and adjusted for your child's age and weight.",
    new: RESTRAINT_ON_REQUEST,
  },
  {
    old: "No. Every booking includes the child restraint - you don't need to bring, carry or install anything yourself. Just tell us your child's age when you book and the correct seat will be ready in the vehicle.",
    new: OWN_SEAT_ANSWER,
  },
  // --- Blacktown
  { old: "certified child restraints to AS/NZS 1754, fixed fares", new: "child restraints arranged at booking, fixed fares" },
  { old: "Baby Seat Taxi Blacktown - Certified Child Seats, Every Ride", new: "Baby Seat Taxi Blacktown - Child Seats Arranged for Every Booking" },
  {
    old: "with every vehicle fitted with certified child restraints, correctly installed and matched to your child's age.",
    new: "with child restraints arranged at booking to suit your child's age and size.",
  },
  {
    old: "Blacktown is home to more than 50,000 residents, and over half of all households here are families with children. Standard cabs and rideshare apps don't guarantee a fitted child seat, don't adjust the harness for your baby's weight, and don't arrive with a cleaned, correctly installed infant capsule already in the vehicle - that's where we're different.",
    new: "Standard cabs and rideshare apps don't guarantee a child restraint for your journey. With us, you request the restraint when you book, so it's arranged before pickup.",
  },
  {
    old: "Every seat meets Australian Standard AS/NZS 1754, the standard set by Transport for NSW for child restraints in commercial vehicles. Our drivers know how child restraints work - they can explain the harness position, check the tether, and make sure your child is correctly seated before the vehicle moves.",
    new: RESTRAINT_ON_REQUEST,
  },
  { old: "Every Seat Meets AS/NZS 1754", new: "Requirements Recorded at Booking" },
  {
    old: "Our seats are certified, labelled and checked regularly against the Transport for NSW standard for child restraints in commercial vehicles.",
    new: "Each child's restraint requirements are recorded against your booking so the vehicle is prepared before pickup.",
  },
  {
    old: "No. The child restraint is included with every booking - fitted, ready and matched to your child's age. Just tell us your child's age when you book and we'll handle the rest.",
    new: OWN_SEAT_ANSWER,
  },
  // --- Liverpool
  { old: "certified AS/NZS 1754 child restraints, fixed fares", new: "child restraints arranged at booking, fixed fares" },
  {
    old: "Liverpool is one of south-western Sydney's fastest growing areas, with a population of over 250,000 and a median age of just 33. Baby Seat Taxi Sydney covers Liverpool with certified child restraints matched to your child's age, installed correctly and cleaned before every ride.",
    new: "Liverpool is one of south-western Sydney's fastest growing areas. Baby Seat Taxi Sydney covers Liverpool with child restraints arranged at booking to suit your child's age and size.",
  },
  {
    old: "Liverpool Hospital is undergoing an $830 million redevelopment, the suburb sits just 25 minutes from Western Sydney Airport, and its proximity to the M5 and M7 makes it one of the most connected parts of south-western Sydney - all of which means families here need transport that actually works for them.",
    new: "With Liverpool Hospital, Western Sydney International Airport nearby and the M5 and M7 on the doorstep, Liverpool is one of the most connected parts of south-western Sydney - and families here need transport that works for them.",
  },
  {
    old: "Every seat we use meets Australian Standard AS/NZS 1754, the mandatory child restraint standard for commercial vehicles in NSW. Our drivers are trained in correct installation - the tether, the harness tension, the chest clip position - and they check every one before the vehicle moves.",
    new: RESTRAINT_ON_REQUEST,
  },
  {
    old: "Liverpool to Western Sydney Airport (25 minutes) and Sydney Kingsford Smith Airport (45 minutes via the M5)",
    new: "Liverpool to Western Sydney International Airport (passenger flights from 25 October 2026) and Sydney Airport - journey times vary with traffic",
  },
  { old: "Certified Child Restraints - Every Time", new: "Restraints Arranged Before Pickup" },
  {
    old: "Every vehicle assigned to Liverpool bookings is fitted with the correct restraint for your child's age before we leave for your pickup.",
    new: "Tell us each child's age and approximate size at booking and the requested restraint is arranged before we leave for your pickup.",
  },
  { old: "Australian Standard AS/NZS 1754 Compliant", new: "Use Your Own Restraint If You Prefer" },
  {
    old: "Every seat we use meets the mandatory child restraint standard for commercial vehicles in NSW.",
    new: "You're welcome to use your own approved child restraint instead.",
  },
  {
    old: "No. Every booking includes the child restraint, fitted, cleaned and matched to your child's age before we arrive at your Liverpool address. Just tell us your child's age when you book.",
    new: OWN_SEAT_ANSWER,
  },
  {
    old: "Yes. Liverpool sits less than 25 minutes from Western Sydney Airport and around 45 minutes from Sydney Kingsford Smith Airport via the M5 - both routes we do regularly with child seats included.",
    new: "Yes. We travel from Liverpool to both Sydney Airport and Western Sydney International Airport (passenger flights from 25 October 2026). Journey times depend on traffic - allow extra time at peak periods.",
  },
  // --- Campbelltown
  {
    old: "certified AS/NZS 1754 infant capsules and child seats, background-checked drivers and metro-wide coverage from Campbelltown.",
    new: "baby capsules, child seats and booster seats arranged at booking, with metro-wide coverage from Campbelltown.",
  },
  {
    old: "We provide fully equipped taxis with certified baby capsules and approved child seats for safe, comfortable journeys with your little ones. When safety matters most, trust our experienced drivers and premium child restraint systems.",
    new: "Pre-booked family transport from Campbelltown, with baby capsules, child restraints and booster seats arranged for your booking.",
  },
  {
    old: "Every baby capsule and child seat in our Campbelltown fleet meets strict Australian and New Zealand safety regulations (AS/NZS 1754), with monthly safety inspections and regular cleaning to maintain hygiene and functionality.",
    new: RESTRAINT_ON_REQUEST,
  },
  {
    old: "Rear-facing design protects head and neck, with a harness system that keeps baby safely secured and compatibility with most pram systems.",
    new: INFANT_FEATURE.description,
  },
  {
    old: "Forward-facing installation with multi-point harness systems and padded seating for comfort on longer trips.",
    new: CHILD_FEATURE.description,
  },
  { old: "Background-Checked, Trained Drivers", new: FAMILY_FEATURE.title },
  {
    old: "Professional drivers with child safety training and years of experience transporting families safely across Campbelltown.",
    new: FAMILY_FEATURE.description,
  },
  {
    old: "No! Our Campbelltown taxis come equipped with certified capsules and child seats. You don't need to bring anything.",
    new: OWN_SEAT_ANSWER,
  },
  // --- Chatswood
  {
    old: "certified AS/NZS 1754 infant capsules and child seats, WWCC-checked drivers and North Shore coverage from Chatswood.",
    new: "baby capsules, child seats and booster seats arranged at booking, with North Shore coverage from Chatswood.",
  },
  {
    old: "We provide fully equipped taxis with certified infant capsules and approved child seats for safe, comfortable journeys with your little ones, serving the North Shore community with trusted child restraint systems.",
    new: "Pre-booked family transport across the North Shore, with baby capsules, child restraints and booster seats arranged for your booking.",
  },
  {
    old: "Every infant capsule and child seat in our Chatswood fleet exceeds Australian and New Zealand safety regulations (AS/NZS 1754), with monthly safety inspections, weekly cleaning and sanitisation between each use.",
    new: RESTRAINT_ON_REQUEST,
  },
  {
    old: "Newborn hospital discharge - safe first journey home with a certified capsule",
    new: "Newborn hospital discharge - first journey home with a rear-facing restraint arranged at booking",
  },
  {
    old: "Rear-facing installation with a five-point harness, Isofix-compatible capsules and climate-controlled taxi interiors.",
    new: INFANT_FEATURE.description,
  },
  {
    old: "Forward-facing installation with side-impact protection and a height-adjustable headrest that follows your child's growth.",
    new: CHILD_FEATURE.description,
  },
  {
    old: "No! Our Chatswood taxis come fully equipped with certified infant capsules and child seats. You don't need to bring anything except your little one.",
    new: OWN_SEAT_ANSWER,
  },
  { old: "Are your drivers trained in child safety?", new: "What do you need to know about my children?" },
  {
    old: "Yes, all drivers complete a Working with Children Check, First Aid & CPR certification and child passenger safety training.",
    new: "Each child's age and approximate size, so we can arrange an appropriate restraint - plus the number of adults, luggage and any pram.",
  },
  // --- Bondi
  {
    old: "certified AS/NZS 1754 infant capsules and child seats for Bondi Beach, Bondi Junction and the Eastern Suburbs, with WWCC-checked drivers.",
    new: "baby capsules, child seats and booster seats arranged at booking for Bondi Beach, Bondi Junction and the Eastern Suburbs.",
  },
  {
    old: "We provide fully equipped taxis with certified infant capsules and approved child seats for safe, comfortable journeys, serving Bondi's vibrant young families with trusted child restraint systems and drivers who understand the Eastern Suburbs lifestyle.",
    new: "Pre-booked family transport across Bondi and the Eastern Suburbs, with baby capsules, child restraints and booster seats arranged for your booking.",
  },
  {
    old: "Every infant capsule and child seat in our Bondi fleet exceeds Australian and New Zealand safety regulations (AS/NZS 1754), with monthly safety inspections, weekly professional cleaning and sanitisation between each use.",
    new: RESTRAINT_ON_REQUEST,
  },
  {
    old: "Rear-facing installation for optimal neck and spinal support, with Isofix-compatible models for enhanced stability.",
    new: INFANT_FEATURE.description,
  },
  {
    old: "Forward-facing installation with side-impact protection, built for beach trips, shopping and Eastern Suburbs adventures.",
    new: CHILD_FEATURE.description,
  },
  {
    old: "No! Our Bondi taxis come fully equipped with certified infant capsules and child seats. You don't need to bring anything except your little one.",
    new: OWN_SEAT_ANSWER,
  },
  { old: "Are the seats clean and hygienic, especially after beach trips?", new: "Can I use my own child seat?" },
  {
    old: "Yes, all seats undergo monthly safety inspections, weekly professional cleaning and sanitisation between each use.",
    new: "Yes. You're welcome to use your own approved child restraint if you prefer.",
  },
  // Shared feature cards on Campbelltown / Chatswood / Bondi (run last - titles repeat across pages).
  { old: "Certified Infant Capsules (0-12 Months)", new: INFANT_FEATURE.title },
  { old: "Approved Child Seats (1-5 Years)", new: CHILD_FEATURE.title },
  { old: "Trained, Vetted Drivers", new: FAMILY_FEATURE.title },
  {
    old: "All drivers complete a Working with Children Check, First Aid & CPR certification and child passenger safety training.",
    new: FAMILY_FEATURE.description,
  },
];

// Blog post fixes. The NSW laws post stated the opposite of the taxi rule for babies under 12 months.
const blogReplacements: Replacement[] = [
  {
    old: "Children under 7 years cannot sit in the front seat unless all rear seats are occupied by younger children.",
    new: "Children under 4 years must not sit in the front seat of a vehicle with two or more rows of seats, and children aged 4 to under 7 years can only sit in the front if all other seats are occupied by younger children in a child restraint or booster seat.",
  },
  { old: "Yes — taxis are treated differently under NSW law.", new: "Not entirely - taxis have their own child restraint rules under NSW law." },
  {
    old: "In Sydney taxis: children under 12 months may travel without a baby seat, children aged 1 to 7 years may travel without a child restraint if seated in the back seat, and children under 7 years are not permitted in the front seat unless all rear seats are occupied.",
    new: "In NSW taxis, children up to 6 months must use a rear-facing child restraint, and children aged 6 to 12 months must use a rear-facing restraint or a forward-facing restraint with an inbuilt harness. Children over 12 months must use a booster seat or wear a properly adjusted and fastened seatbelt. Booked hire and rideshare vehicles follow different rules.",
  },
  {
    old: "Although taxis are legally exempt from carrying baby seats, this does not mean it is the safest option.",
    new: "For children over 12 months a seatbelt may be legal in a taxi - but many parents prefer the restraint their child uses in the family car.",
  },
  { old: "Are Taxis Exempt From Baby Seat Laws in NSW?", new: "What Are the Child Restraint Rules for NSW Taxis?" },
  {
    old: "why booking a professional baby seat taxi service is the safest choice for families traveling in Sydney.",
    new: "how to pre-book a taxi with the child restraint you need when travelling in Sydney.",
  },
  {
    old: "why booking a professional baby seat taxi service is the safest choice for families.",
    new: "how to pre-book a taxi with the child restraint you need.",
  },
  {
    old: "choosing a dedicated baby seat taxi service is one of the safest ways to travel with children in Sydney.",
    new: "a pre-booked baby seat taxi lets you travel with the child restraint you've requested.",
  },
  { old: "Even though NSW taxi laws allow exemptions,", new: "Even where NSW taxi laws allow a seatbelt for older children," },
  {
    old: "While NSW taxi laws allow children to travel without baby seats in some situations, safety should always come first.",
    new: "While NSW taxi laws allow children over 12 months to use a seatbelt, safety should always come first.",
  },
];
const BLOG_RISKY = /exempt|without (a )?baby seat|without a child restraint|under 12 months may/i;

// Whole-field rewrites for pages the audit asked to rebuild rather than patch.
type Rewrite = {
  metaTitle?: string;
  metaDescription?: string;
  h1?: string;
  heroDescription?: string;
  intro?: { text: string }[];
  introItemsIntro?: string;
  introItems?: { text: string }[];
  features?: { title: string; description: string }[];
  faq?: { question: string; answer: string }[];
};
const t = (items: string[]) => items.map((text) => ({ text }));

const rewrites: Record<string, Rewrite> = {
  "sydney-airport-transfers-with-baby-seats": {
    h1: "Sydney Airport Transfers with Baby Seats",
    heroDescription:
      "Flying into or out of Sydney with children? Pre-book a transfer with baby capsules, child restraints and booster seats arranged for each child, and a vehicle sized for your luggage and pram.",
    intro: t([
      "Flying into Sydney with children? Tell us who's travelling and what you're bringing, and we'll arrange the child restraints and a vehicle with room for your family. We cover T1 International and T2/T3 Domestic arrivals and departures, 24/7.",
      "Example booking: 2 adults and 2 children (an 8-month-old and a 4-year-old), 2 large suitcases, 2 carry-ons and 1 folded pram. Enter these details when booking and we'll arrange the appropriate vehicle and child restraints.",
    ]),
    introItemsIntro: "What to provide when booking:",
    introItems: t([
      "Flight number - so the booking is associated with the correct arrival",
      "Number and ages of children, with approximate size",
      "Number of adults",
      "Suitcases and carry-on bags",
      "Pram or stroller (single or double)",
      "Oversized items",
      "Destination - home, hotel or cruise terminal",
      "Return flight, if you'd like to book both legs together",
    ]),
    features: [
      {
        title: "Restraints for Every Child",
        description: "Request a restraint for each child - baby, toddler or booster. Multiple restraints are subject to vehicle configuration and availability.",
      },
      {
        title: "Vehicle Sized for Your Luggage",
        description: "Child restraints change the number of usable seats. Tell us about every suitcase and pram and we'll confirm a vehicle that fits.",
      },
      {
        title: "Arrivals, Departures & Return Trips",
        description: "Early departures, late arrivals and overnight flights - and you can book your return transfer at the same time.",
      },
    ],
    faq: [
      {
        question: "Do you pick up from T1, T2 and T3?",
        answer: "Yes. We provide transfers from T1 International and T2/T3 Domestic terminals.",
      },
      {
        question: "What happens if my flight is delayed?",
        answer: "Add your flight number when booking so the booking is associated with the correct arrival, and contact us if your plans change.",
      },
      {
        question: "Can I book two or three child seats?",
        answer: "Yes. Request a restraint for each child. Multiple restraints are subject to vehicle configuration and availability.",
      },
      {
        question: "Can overseas visitors book before arriving?",
        answer: "Yes. Book online before you travel, including the child restraints you need for your arrival.",
      },
      {
        question: "Can I book both airport legs together?",
        answer: "Yes. Many families book the arrival and return transfer at the same time.",
      },
    ],
  },
};

// Anything still matching after the pass is printed for manual review.
const RISKY = /AS\/?NZS|AS ?1754|exceed|certified|Working with Children|WWCC|First Aid|CPR|monthly|weekly|sanitis|Isofix|side-impact|\d+\s*minutes|\b0-6\b|0-12 Months|1-5 Years|6 months-2 years|most trusted|safest|number one|#1|discounted/i;

function findRisky(value: unknown, path: string, out: string[], re: RegExp = RISKY) {
  if (typeof value === "string") {
    if (re.test(value)) out.push(`${path}: ${value.slice(0, 140)}`);
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => findRisky(v, `${path}[${i}]`, out, re));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (["id", "site", "image", "createdAt", "updatedAt"].includes(k)) continue;
      findRisky(v, path ? `${path}.${k}` : k, out, re);
    }
  }
}

type PlannedUpdate = {
  collection: "pages" | "blog-posts";
  id: string;
  slug: string;
  original: Record<string, unknown>;
  data: Record<string, unknown>;
};

const PAGE_FIELDS = [
  "metaTitle",
  "metaDescription",
  "h1",
  "heroDescription",
  "intro",
  "introItemsIntro",
  "introItems",
  "features",
  "contentSections",
  "faq",
] as const;
const BLOG_FIELDS = ["metaDescription", "excerpt", "sections"] as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pick = (doc: any, fields: readonly string[]) => Object.fromEntries(fields.map((f) => [f, doc[f]]));

async function run() {
  // Restore mode: node ... scripts/fix-baby-seat-claims-2026-10-02.ts --restore scripts/backups/<file>.json
  const restoreIdx = process.argv.indexOf("--restore");

  const payload = await getPayload({ config });

  if (restoreIdx !== -1) {
    const backup = JSON.parse(readFileSync(process.argv[restoreIdx + 1], "utf8")) as PlannedUpdate[];
    for (const entry of backup) {
      await payload.update({ collection: entry.collection, id: entry.id, data: entry.original });
      console.log(`restored [${entry.collection}] ${entry.slug}`);
    }
    process.exit(0);
  }

  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found.`);

  const planned: PlannedUpdate[] = [];

  const pages = await payload.find({ collection: "pages", where: { site: { equals: site.id } }, limit: 500, depth: 0 });
  const totals = replacements.map(() => 0);
  for (const doc of pages.docs) {
    const counts = replacements.map(() => 0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let patched: any = deepReplace(doc, replacements, counts);
    counts.forEach((c, i) => (totals[i] += c));

    const rewrite = rewrites[doc.slug as string];
    if (rewrite) patched = { ...patched, ...rewrite };

    const changes = counts.reduce((a, b) => a + b, 0);
    const residual: string[] = [];
    findRisky(patched, "", residual);

    if (changes === 0 && !rewrite && residual.length === 0) continue;
    console.log(`\n[${doc.slug}] ${changes} replacement(s)${rewrite ? " + full rewrite" : ""}`);
    residual.forEach((r) => console.warn(`  REVIEW: ${r}`));
    if (changes === 0 && !rewrite) continue;

    planned.push({ collection: "pages", id: doc.id as string, slug: doc.slug as string, original: pick(doc, PAGE_FIELDS), data: pick(patched, PAGE_FIELDS) });
  }

  const posts = await payload.find({ collection: "blog-posts", where: { site: { equals: site.id } }, limit: 500, depth: 0 });
  const blogTotals = blogReplacements.map(() => 0);
  for (const doc of posts.docs) {
    const counts = blogReplacements.map(() => 0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const patched: any = deepReplace(doc, blogReplacements, counts);
    counts.forEach((c, i) => (blogTotals[i] += c));
    const changes = counts.reduce((a, b) => a + b, 0);
    const residual: string[] = [];
    findRisky(patched, "", residual);
    findRisky(patched, "", residual, BLOG_RISKY);

    if (changes === 0 && residual.length === 0) continue;
    console.log(`\n[blog: ${doc.slug}] ${changes} replacement(s)`);
    residual.forEach((r) => console.warn(`  REVIEW: ${r}`));
    if (changes === 0) continue;

    planned.push({ collection: "blog-posts", id: doc.id as string, slug: doc.slug as string, original: pick(doc, BLOG_FIELDS), data: pick(patched, BLOG_FIELDS) });
  }

  console.log("\nReplacements with 0 live matches (text has drifted from the snapshot - check manually):");
  replacements.forEach((r, i) => {
    if (totals[i] === 0) console.warn(`  "${r.old.slice(0, 90)}..."`);
  });
  blogReplacements.forEach((r, i) => {
    if (blogTotals[i] === 0) console.warn(`  [blog] "${r.old.slice(0, 90)}..."`);
  });

  if (process.env.LIVE !== "true") {
    console.log(`\nDRY RUN - ${planned.length} document(s) would be updated, nothing saved.`);
    process.exit(0);
  }

  mkdirSync("scripts/backups", { recursive: true });
  const backupPath = `scripts/backups/fix-baby-seat-claims-${Date.now()}.json`;
  writeFileSync(backupPath, JSON.stringify(planned, null, 1));
  console.log(`\nBackup of original field values: ${backupPath}`);

  for (const entry of planned) {
    await payload.update({ collection: entry.collection, id: entry.id, data: entry.data });
    console.log(`saved [${entry.collection}] ${entry.slug}`);
  }

  console.log("\nDone.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
