/**
 * transport-solutions (tiptopmaxisydney.com.au) - critical customer-information corrections from
 * the Tip Top Transport Solution x OMG growth plan brief, 2026-10-24 (the day before WSI opens).
 *
 * Task 1 - Driver contact: no page may say customers get the driver's personal number or should
 *   call/message the driver. Replaced with the approved "Driver & Pickup Coordination" wording
 *   (booking team on 02 9669 9390 / WhatsApp +61 410 025 786 coordinates with the driver).
 * Task 2 - Cabcharge: "we do not accept Cabcharge" (and blog posts saying it's always accepted)
 *   replaced with the approved conditional wording.
 * Task 3 - Meet & greet: inside-terminal meet-and-greet / name-board promises removed, and the
 *   flat "we do not offer meet-and-greet" answers replaced with the approved wording (standard
 *   pickups at designated locations; special assistance by prior arrangement).
 * Also - automatic/real-time flight monitoring claims normalised to the brief's approved wording
 *   ("provide your flight number so our team can monitor arrival updates and coordinate your
 *   pickup"), consistent with the 2026-10-09 WSI taxi audit that removed the same guarantee.
 * Task 7 - WSI hub (/western-sydney-airport-transfers/): brief's H1, intro and pickup wording;
 *   SYD vs WSI section; P1 Commercial Pick-Up zone for pre-booked vehicles, verified against the
 *   NSW Point to Point Transport Commission notice "Getting ready to operate at Western Sydney
 *   International Airport" (23 Oct 2026); shuttle comparison rows corrected (Super Shuttle WSI
 *   runs express buses to SYD with published fares - see fix-wsi-taxi-audit-2026-10-09.ts).
 *
 * Every replacement is an exact, whole-string match (page fields, or a blog post's Lexical text
 * node), and each must match at least once - a miss means the CMS changed since 2026-10-24 and
 * the script stops rather than guess. Docs edited after the snapshot also stop the run.
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-customer-info-2026-10-24.ts
 * (dry-run by default - pass LIVE=true to write; original values are backed up to
 * scripts/backups/ first, restorable with --restore scripts/backups/<file>.json)
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";
// The CMS as read on 2026-10-24 (public API snapshot). Any doc this script touches that has been
// edited after this moment stops the run - re-read it and fold the change in first.
const SNAPSHOT_AT = "2026-10-24T00:00:00.000Z";

const PHONE = "02 9669 9390";
const WHATSAPP = "+61 410 025 786";

// ---- Approved wording (kept word-for-word; same text as transport-solutions-sydney/lib/customerInfo.ts)
const DRIVER = `Once a driver has been assigned, you will receive the relevant driver and vehicle details. For pickup assistance or updates, please contact our booking team on ${PHONE} or WhatsApp ${WHATSAPP}. Our team will coordinate directly with your driver.`;
const CABCHARGE =
  "Cabcharge payments may be accepted for approved bookings, subject to confirmation from our booking team and the availability of a compatible payment terminal. Please confirm your payment method before travelling.";
const SYD_1 =
  "Standard airport pickups are arranged at designated pickup locations. Passengers will receive pickup instructions and vehicle details before collection.";
const SYD_2 =
  "Special pickup assistance may be arranged in advance for elderly passengers, passengers requiring additional assistance, or customers with specific travel needs, subject to airport regulations and prior confirmation.";
const WSI_PICKUP =
  "Pickup and drop-off arrangements at Western Sydney International Airport are subject to the airport's designated transport zones and access regulations. Confirmed customers will receive the relevant meeting instructions before travelling.";
const FLIGHT = "Provide your flight number when booking so our team can monitor arrival updates and coordinate your pickup.";
const FLIGHT_FAQ = `Yes. ${FLIGHT} If your flight is delayed, arrives early or changes, please also let our booking team know.`;
const WSI_MEET_FAQ = `Not as standard. ${WSI_PICKUP} ${SYD_2}`;

// ---- Pages: [exact current string, replacement] - applied to every string field of every page
const PAGE_REPLACEMENTS: [string, string][] = [
  // Sydney Airport hub + suburb route pages
  [
    "There is no meet-and-greet or name-board service inside the terminal - your driver's contact details are sent before you land so you can connect quickly once you reach the pickup zone.",
    `${SYD_1} ${DRIVER}`,
  ],
  [
    "Pickup location depends on which terminal you're arriving into. There is no meet-and-greet or name-board service inside the terminal - your driver's contact details are sent before you land so you can connect quickly once you reach the pickup zone.",
    `Pickup location depends on which terminal you're arriving into. ${SYD_1} ${SYD_2}`,
  ],
  ["Driver contact details (name, vehicle, phone number) are sent before your flight lands", "Driver and vehicle details are sent once a driver has been assigned"],
  [
    "We monitor your inbound flight automatically, so a delayed flight adjusts your pickup time without you needing to call. Waiting time at the pickup zone is free within a reasonable window after landing - if your bags are taking longer than expected, message or call your driver directly.",
    `${FLIGHT} Waiting time at the pickup zone is free within a reasonable window after landing - if your bags are taking longer than expected, contact our booking team on ${PHONE} or WhatsApp ${WHATSAPP} and they will coordinate directly with your driver.`,
  ],
  [
    "T1 (International) pickups meet at the designated Rideshare Pickup Area. T2 and T3 (Domestic) pickups meet at the designated Priority Pickup Area. Your driver's contact details are sent before you land.",
    "T1 (International) pickups meet at the designated Rideshare Pickup Area. T2 and T3 (Domestic) pickups meet at the designated Priority Pickup Area. You'll receive pickup instructions and vehicle details before collection.",
  ],
  [
    "No. Sydney Airport pickups take place at the designated pickup areas outside the terminal, not inside arrivals. Driver details are shared beforehand so you can connect quickly.",
    `Not as standard. ${SYD_1} ${SYD_2}`,
  ],
  [
    "No. Sydney Airport pickups take place at the designated vehicle pickup area. T1 uses the Rideshare Pickup Area and T2/T3 use Priority Pickup Areas. Driver details are provided before collection where applicable.",
    `Not as standard. ${SYD_1} T1 uses the Rideshare Pickup Area and T2/T3 use Priority Pickup Areas. ${SYD_2}`,
  ],
  [
    "TipTop Maxi Sydney provides pre-booked, fixed-fare transfers to and from Sydney Airport, 24/7. T1 (International) pickups meet at the designated Rideshare Pickup Area; T2 and T3 (Domestic) pickups meet at the Priority Pickup Area. Your flight is tracked automatically, so pickup times adjust for delays. Vehicles range from a sedan to an 11-seater maxi cab, with baby seats and wheelchair-accessible vehicles available on request.",
    "TipTop Maxi Sydney provides pre-booked, fixed-fare transfers to and from Sydney Airport, 24/7. T1 (International) pickups meet at the designated Rideshare Pickup Area; T2 and T3 (Domestic) pickups meet at the Priority Pickup Area. Provide your flight number so our team can monitor arrival updates and coordinate your pickup. Vehicles range from a sedan to an 11-seater maxi cab, with baby seats and wheelchair-accessible vehicles available on request.",
  ],
  [
    "Real-Time Flight Tracking: We monitor your flight so we're always on time, even if your schedule isn't.",
    "Flight Updates: Give us your flight number so our team can monitor arrival updates and coordinate your pickup.",
  ],
  [
    "We monitor your inbound flight automatically, so a delayed flight adjusts your pickup time without you needing to call. Your fare is quoted upfront before you travel, based on vehicle type, pickup point, destination and any applicable tolls, so there are no surprises on arrival.",
    `${FLIGHT} Your fare is quoted upfront before you travel, based on vehicle type, pickup point, destination and any applicable tolls, so there are no surprises on arrival.`,
  ],
  ["Yes. We monitor your inbound flight automatically, so pickup times adjust for delays without you needing to call.", FLIGHT_FAQ],
  ["Flight monitoring covers early-morning and late-night flights automatically", "Early-morning and late-night arrivals covered - give us your flight number so our team can coordinate your pickup"],
  ["Yes, we track your flight number and adjust your pickup time automatically for delays or early arrivals.", FLIGHT_FAQ],
  ["Yes, we track your flight number and adjust your pickup time for delays or early arrivals.", FLIGHT_FAQ],
  ["Flight monitoring adjusts your pickup automatically", "Give us your flight number so our team can monitor arrival updates and coordinate your pickup"],
  ["Yes, we track your flight number and adjust your driver's arrival automatically for early or delayed flights.", FLIGHT_FAQ],
  ["Flight monitoring adjusts your pickup automatically if your flight time changes", "Give us your flight number so our team can monitor arrival updates and coordinate your pickup"],
  ["Yes. We track your flight number and adjust your pickup time automatically for early or delayed flights.", FLIGHT_FAQ],

  // Sydney Airport keyword pages
  [
    "It's not required for the quote itself, but providing it lets us monitor your flight and adjust pickup timing automatically.",
    "It's not required for the quote itself, but providing it lets our team monitor arrival updates and coordinate your pickup timing.",
  ],
  ["Taxi from Sydney Airport, Waiting When You Land", "Taxi from Sydney Airport, Pre-Booked Before You Land"],
  [
    "Your driver tracks your flight and is ready at the designated pickup area when you land, so a taxi from Sydney Airport is one less thing to plan after a long trip.",
    "Pre-book your taxi from Sydney Airport and give us your flight number - our team monitors arrival updates and coordinates your pickup at the designated pickup area, so it's one less thing to plan after a long trip.",
  ],
  [
    "We monitor your flight number in real time from the moment you book, so early landings and delays are handled automatically without you needing to call us.",
    "Provide your flight number when you book so our team can monitor arrival updates and coordinate your pickup if you land early or late.",
  ],
  ["Live flight monitoring on every booking", "Flight number taken on every airport booking so our team can monitor arrival updates"],
  [
    "Let us know your arrival terminal and flight number when booking so your driver meets you in the right place.",
    "Let us know your arrival terminal and flight number when booking. You'll receive pickup instructions and vehicle details before collection.",
  ],
  ["Yes. Once you provide your flight number at booking, we monitor it live and adjust your driver's arrival automatically.", FLIGHT_FAQ],
  ["Flight monitoring on every booking, so delays are handled automatically", "Flight number taken on every airport booking so our team can coordinate your pickup"],
  [
    "Sydney Airport has separate pickup arrangements for the international and domestic terminals - tell us your terminal and flight details when booking so your driver knows exactly where to meet you.",
    "Sydney Airport has separate pickup arrangements for the international and domestic terminals - tell us your terminal and flight details when booking, and you'll receive pickup instructions and vehicle details before collection.",
  ],
  ["Real-time flight monitoring so your pickup adjusts automatically", "Flight number taken so our team can monitor arrival updates and coordinate your pickup"],
  ["Yes, we monitor your flight in real time and adjust your pickup automatically for delays or early arrivals.", FLIGHT_FAQ],
  ["Real-time flight monitoring, so we adjust automatically if you're delayed", "Flight number taken so our team can monitor arrival updates and coordinate your pickup"],
  ["Yes, we monitor your flight in real time and adjust your pickup automatically if it's early or delayed.", FLIGHT_FAQ],

  // Family airport transfers
  [
    "Airports are hectic enough with kids in tow. Our family airport transfers come with baby and child seats fitted, extra luggage space, and a driver who tracks your flight so you're never left waiting.",
    "Airports are hectic enough with kids in tow. Our family airport transfers come with baby and child seats on request, extra luggage space, and a booking team that coordinates your pickup using your flight number.",
  ],
  ["Real-time flight monitoring for arrivals", "Flight number taken so our team can monitor arrival updates"],
  ["Meet & greet at arrivals with luggage assistance", "Pickup at the designated pickup area - special assistance can be arranged in advance"],
  [
    "Arrivals: your driver waits inside the terminal, ready to help with bags and buckle in the little ones",
    "Arrivals: you'll receive pickup instructions and vehicle details before collection, and your driver can help with bags at the vehicle",
  ],
  [
    "Yes, your child seat is fitted and ready before your driver meets you at arrivals.",
    "Yes. Tell us each child's age and approximate size when booking so the right restraint is arranged for your pickup.",
  ],
  ["Yes, we monitor your flight in real time so your pickup adjusts automatically for delays.", FLIGHT_FAQ],

  // Cruise terminals
  [
    "Disembarking: your driver can meet you at the terminal with a name board for larger groups",
    "Disembarking: you'll receive pickup instructions and vehicle details before collection - for larger groups or passengers needing assistance, ask about special pickup arrangements when booking",
  ],

  // WSI pages (WSI hub's own fields are rewritten separately below)
  [
    "No meet-and-greet service inside the terminal - pickup will be at the designated vehicle pickup area once confirmed",
    "Standard pickups use WSI's designated transport zones - confirmed customers receive meeting instructions before travelling",
  ],
  [
    "No. Pickups will take place at the designated vehicle pickup area, with driver details provided before collection. We do not offer name-board meet-and-greet services inside terminals.",
    WSI_MEET_FAQ,
  ],
  [
    "No. Once Western Sydney Airport opens, pickups will take place at the designated vehicle pickup area, with driver details provided before collection. We do not offer name-board meet-and-greet services inside terminals.",
    WSI_MEET_FAQ,
  ],
  [
    "Once this route is available, we'll track your flight at the originating airport so your pickup adjusts automatically for delays.",
    "Once this route is available, give us your flight number so our team can monitor arrival updates and coordinate your pickup.",
  ],
  [
    "Accessible pickup point: Driver waits at the designated accessible pickup zone with the ramp already down.",
    "Accessible pickup: Pickup and drop-off at WSI are subject to the airport's designated transport zones and access regulations - confirmed customers receive meeting instructions before travelling. Tell us your mobility requirements so a suitable vehicle is assigned.",
  ],
  ["Yes. We track your flight number and adjust your driver's arrival automatically if you land early or are delayed.", FLIGHT_FAQ],
  [
    "Return Transfers Available: Book your CBD pickup for the return leg at the same time. Flight delays on the return are monitored and adjusted automatically.",
    "Return Transfers Available: Book your CBD pickup for the return leg at the same time. Give us your return flight number so our team can coordinate your pickup.",
  ],
  [
    "Live Flight Monitoring: We watch your flight number in real time. Land early or touch down late, your driver's schedule adjusts automatically.",
    "Flight Updates: Give us your flight number so our team can monitor arrival updates and coordinate your pickup if you land early or late.",
  ],
  [
    "Flight Monitoring, Once Available: Once bookings open, your flight will be monitored live, with delays or early arrivals handled automatically, no calls needed.",
    `Flight Updates: ${FLIGHT}`,
  ],
  [
    "Flight Monitoring, Once Available: Once bookings open, your driver will track your flight from wheels-up, so a two-hour delay means your driver arrives two hours later.",
    "Flight Delays: If your flight is delayed, our team uses your flight number to coordinate an updated pickup time - please also let our booking team know of any changes.",
  ],
  [
    "Pickup at the Designated Area Every Time: Luggage assistance and an escort to the vehicle — that's how every airport pickup will work once WSI opens.",
    `Designated Pickup Areas: ${WSI_PICKUP}`,
  ],
  [
    "Once bookings open, we'll track your flight number in real time and adjust your driver's schedule automatically.",
    "Give us your flight number when booking so our team can monitor arrival updates and coordinate your pickup.",
  ],
  [
    "Yes. We operate Wheelchair Accessible Vehicles (WAVs) with hydraulic ramps and trained drivers. We're not an NDIS registered provider and don't process NDIS funding or Cabcharge; standard payment methods apply.",
    `Yes. We operate Wheelchair Accessible Vehicles (WAVs) with hydraulic ramps and trained drivers. We're not an NDIS registered provider and don't process NDIS funding. ${CABCHARGE}`,
  ],
  [
    "Our standard service does not include inside-terminal meet-and-greet or name-board collection.",
    `Standard pickups are arranged at designated pickup locations. ${SYD_2}`,
  ],
  [
    "Collect your luggage, then contact TipTop dispatch about 10–15 minutes before you're ready. Your booking confirmation directs you to the authorised pickup area for your assigned vehicle - not the rideshare zone. There is no inside-terminal meet-and-greet. Call 02 9669 9390 or WhatsApp +61 410 025 786.",
    "Collect your luggage, then contact TipTop dispatch about 10–15 minutes before you're ready. Your booking confirmation directs you to the authorised pickup area for your assigned vehicle - not the rideshare zone. Special pickup assistance can be arranged in advance, subject to airport regulations. Call 02 9669 9390 or WhatsApp +61 410 025 786.",
  ],
  [
    "Live flight monitoring, once available: Once bookings open, we'll track your flight number in real time, so early landings and delays can be handled without you calling us.",
    `Flight updates: ${FLIGHT}`,
  ],
  [
    "Once bookings open, we'll track your flight number and adjust your driver's arrival automatically if you land early or are delayed.",
    "Give us your flight number when booking so our team can monitor arrival updates and coordinate your pickup.",
  ],
  [
    "Live Flight Tracking: We watch your flight number in real time. Land early or touch down late, your driver adjusts without you needing to call us.",
    "Flight Updates: Give us your flight number so our team can monitor arrival updates and coordinate your pickup if you land early or late.",
  ],
  [
    "Flight Monitoring, Once Available: Once bookings open, our team will monitor your flight live, with any delay handled automatically, no need to call.",
    `Flight Updates: ${FLIGHT}`,
  ],
  [
    "Live Flight Monitoring: Your driver's schedule moves with your flight. Land two hours late and your driver will still be there, no rebooking, no stress.",
    "Flight Delays: If your flight is delayed, our team uses your flight number to coordinate an updated pickup - please also let our booking team know of any changes.",
  ],
  ["Yes. Once you provide your flight number at booking, our dispatch team monitors it live and adjusts your driver's schedule automatically.", FLIGHT_FAQ],
  // No customer-facing tracking link exists (see fix-wsi-taxi-audit-2026-10-09.ts "Not done here").
  [
    "Real-Time Driver Tracking: See where your driver is before you clear customs. Share the tracking link so nobody in the group is left guessing.",
    `Booking Updates: Once a driver has been assigned, you'll receive the relevant driver and vehicle details. For pickup updates, contact our booking team on ${PHONE} or WhatsApp ${WHATSAPP}.`,
  ],
  [
    "Your flight number is linked to the booking, so your driver's arrival shifts with it automatically. No need to call us.",
    "Your flight number is recorded with your booking so our team can monitor arrival updates and coordinate your pickup. Please also let our booking team know if your flight changes.",
  ],
  [
    "We expect to accept cash, credit and debit cards, and secure online payments. We do not accept Cabcharge or NDIS payment cards.",
    `Accepted payment methods are confirmed when you book. We're not an NDIS registered provider and don't process NDIS payment cards. ${CABCHARGE}`,
  ],
];

// ---- Technical SEO (brief Task 8) found by the 2026-10-24 crawl of the built site
// Hand-typed relatedLinks href pointing at a region as if it were its own suburb (404).
PAGE_REPLACEMENTS.push(["/locations/sydney-cbd/sydney-cbd/", "/locations/sydney-cbd/"]);
// Seven posts inherited the rideshare-comparison post's meta description (and excerpt) when they
// were imported - duplicate descriptions across 8 indexable URLs. The rideshare post keeps it.
const SHARED_BLOG_DESCRIPTION =
  "Compare rideshare and group airport transfers in Sydney. Discover why maxi cabs are better for large groups with fixed fares, comfort, and reliability.";
const BLOG_DESCRIPTIONS: Record<string, string> = {
  "your-trusted-transport-partner-in-sydney":
    "Why Sydney travellers trust TipTop Transport Solutions for airport transfers, medical appointments, family trips and group travel, with wheelchair access and child seats.",
  "why-tiptop-transport-solutions-is-becoming-sydneys-most-trusted-travel-partner":
    "How TipTop Transport Solutions builds trust across Sydney: punctual pickups, professional drivers, clear pricing and customer care on every booking.",
  "the-best-way-to-travel-from-sydney-airport-why-tiptop-transport-solutions-is-the-1-choice-for-maxi-taxi-transfers":
    "Travelling from Sydney Airport T1 or T2/T3 with family, extra luggage or a long-distance destination? Why a pre-booked maxi taxi is the easier way to travel.",
  "sydneys-most-reliable-taxi-experience-how-tiptop-transport-keeps-your-journey-stress-free-every-time":
    "How TipTop Transport keeps Sydney journeys on time and stress-free, from airport pickups to corporate and medical bookings.",
  "sydney-new-years-eve-is-here-dont-get-stuck-without-a-ride-best-time-to-arrive-at-sydney-airport-2":
    "Heading out for Sydney New Year's Eve? Pre-book a taxi or maxi taxi for fireworks, harbour events and the ride home after midnight.",
  "maxi-taxi-sydney-the-complete-guide-to-1-11-seater-group-transfers-airport-pickups-events":
    "A complete guide to maxi taxis in Sydney: 1-11 seater vehicles for group transfers, airport pickups, weddings, events and corporate travel.",
  "best-time-to-arrive-at-sydney-airport":
    "How early to arrive at Sydney Airport for domestic and international flights, and how to time your airport transfer so you're not rushed.",
};

// ---- Blog posts: [exact current Lexical text node, replacement]
const BLOG_REPLACEMENTS: [string, string][] = [
  [
    "The reliability extends to your arrival in Sydney, too. Reputable transfer companies use flight tracking technology to monitor your inbound flight in real-time. If your plane is delayed or even arrives early, your driver automatically adjusts the pickup schedule. This means you never have to worry about paying waiting fees for a late flight, and you are guaranteed a seamless meet-and-greet experience the moment you step out of the terminal.",
    "The reliability extends to your arrival in Sydney, too. When you provide your flight number, our team can monitor arrival updates and coordinate your pickup if your plane is delayed or arrives early. Standard pickups are arranged at designated pickup locations, and you'll receive pickup instructions and vehicle details before collection.",
  ],
  [
    "Your driver will meet you at a designated pickup area for pre-booked transport. For domestic flights (T2 & T3), this is typically at the Priority Pickup area. For international flights (T1), your driver will be waiting in the Express Pickup zone. You will receive detailed instructions, including the driver’s name and contact number, in your booking confirmation. This ensures a smooth and easy connection as soon as you’ve collected your luggage and are ready to go.",
    `Your driver will meet you at a designated pickup area for pre-booked transport. For domestic flights (T2 & T3), this is typically at the Priority Pickup area. For international flights (T1), it's the designated Rideshare Pickup Area. ${DRIVER}`,
  ],
  ["The driver’s name and contact number", "Your assigned driver and vehicle details"],
  // Payment paragraphs that list methods must carry the Cabcharge wording too (brief Task 2).
  [
    "We offer flexible and convenient payment options to suit your preference. You can pay your driver directly in the vehicle using cash, EFTPOS, or any major credit card (Visa, Mastercard, American Express). For added convenience, we also offer secure online pre-payment when you book through our website. All transactions are transparent, and you will receive a receipt for your journey, making expense claims simple and straightforward. We aim for a seamless process from booking to payment.",
    `We offer flexible and convenient payment options to suit your preference. You can pay your driver directly in the vehicle using cash, EFTPOS, or any major credit card (Visa, Mastercard, American Express). For added convenience, we also offer secure online pre-payment when you book through our website. All transactions are transparent, and you will receive a receipt for your journey, making expense claims simple and straightforward. ${CABCHARGE}`,
  ],
  [
    "Once you book, you’ll receive an instant confirmation via both email and SMS, so you have a complete record of your trip details. We offer flexible and secure payment methods to suit your preference – you can pay online with a credit card when you book, or you can choose to pay the driver directly at the end of your journey. Should you have any questions or need to make a change, our friendly customer support team is available 24/7 to assist. Ready to travel with ease?",
    `Once you book, you’ll receive an instant confirmation via both email and SMS, so you have a complete record of your trip details. We offer flexible and secure payment methods to suit your preference – you can pay online with a credit card when you book, or you can choose to pay the driver directly at the end of your journey. ${CABCHARGE} Should you have any questions or need to make a change, our friendly customer support team is available 24/7 to assist. Ready to travel with ease?`,
  ],
  [
    " service is the most direct and comfortable way to travel from Sydney Airport (both Domestic and International terminals) to your ship. We monitor your flight’s arrival time and automatically adjust your pickup for any delays. For ultimate convenience, ask about our meet-and-greet service, where your driver will be waiting for you inside the terminal.",
    ` service is the most direct and comfortable way to travel from Sydney Airport (both Domestic and International terminals) to your ship. Give us your flight number so our team can monitor arrival updates and coordinate your pickup. ${SYD_2}`,
  ],
  [
    "We believe in clear, upfront communication. That’s why we also offer a variety of convenient payment methods to make your journey seamless. You can settle your fare using Cabcharge, all major credit cards (Visa, Mastercard, AMEX), or modern digital wallets like Apple Pay and Google Pay.",
    `We believe in clear, upfront communication. Accepted payment methods are confirmed when you book, including major credit cards (Visa, Mastercard, AMEX). ${CABCHARGE}`,
  ],
  ["Cabcharge and other corporate transport payment solutions", "Corporate payment options - Cabcharge may be accepted for approved bookings, subject to confirmation"],
  [
    "The best part of a pre-booked transfer is the meet-and-greet service. After a long flight, there’s no need to search for a ride. Your professional driver will be waiting for you in the arrivals hall, holding a sign with your name on it. They will assist with your luggage and guide you directly to your waiting vehicle. It’s the stress-free welcome to Sydney you deserve.",
    `The best part of a pre-booked transfer is knowing your ride is arranged. After a long flight, there’s no need to search for a ride or queue at the rank. ${SYD_1} ${SYD_2}`,
  ],
  [
    "Arriving on a long-haul flight into T1 International often means you’re tired and managing heavy luggage. Our service makes this transition seamless. Once you clear customs and collect your bags, your driver will meet you at a pre-arranged point inside the arrivals hall. From there, you’ll be escorted to the designated pre-booked vehicle pickup zone, bypassing the long public taxi queues. Your ",
    "Arriving on a long-haul flight into T1 International often means you’re tired and managing heavy luggage. Our service makes this transition seamless. Once you clear customs and collect your bags, follow the pickup instructions you received before collection to the designated pickup area, bypassing the long public taxi queues. Your ",
  ],
  [
    "Yes, Sydney Airport has dedicated pickup zones for pre-booked transport. At the International Terminal (T1), the area is located in the P7 car park. At the Domestic Terminals (T2/T3), it’s situated between the terminals. Your driver will contact you upon landing with precise instructions and their vehicle details, making your sydney cruise terminal transport connection seamless and easy to find.",
    `Yes, Sydney Airport has dedicated pickup zones for pre-booked transport. At the International Terminal (T1), the area is located in the P7 car park. At the Domestic Terminals (T2/T3), it’s situated between the terminals. ${DRIVER}`,
  ],
  [
    " As soon as you land, you’ll receive a text message with your professional driver’s name and contact details.",
    " Once a driver has been assigned, you’ll receive the relevant driver and vehicle details. For pickup assistance, contact our booking team on 02 9669 9390 or WhatsApp +61 410 025 786.",
  ],
  [
    " Bypass the crowded, confusing rideshare pickup zones and enjoy a seamless meet-and-greet service.",
    " Skip the taxi queue - pickup instructions and vehicle details are sent before collection, and special assistance can be arranged in advance.",
  ],
  [
    "We make payment simple and convenient. You can pay for your transfer directly in the vehicle at the end of your trip. We accept all major payment methods, including cash, EFTPOS, Cabcharge, and all major credit cards such as Visa, Mastercard, and American Express. Our goal is to provide a seamless and hassle-free service from the moment you book until the moment you pay.",
    `We make payment simple and convenient. Accepted payment methods are confirmed when you book, including major credit cards such as Visa, Mastercard, and American Express. ${CABCHARGE}`,
  ],
  [
    "Follow the clear green signage from the arrivals hall to your terminal's designated pickup zone. There's no meet-and-greet inside the terminal - your driver's details are sent before you land, so you can head straight to the pickup area to find your vehicle waiting.",
    `Follow the clear green signage from the arrivals hall to your terminal's designated pickup zone. ${SYD_1} ${SYD_2}`,
  ],
  [
    "We offer flexible and convenient payment options to make your experience as smooth as possible. You can pay for your ride using all major credit and debit cards (including Visa, Mastercard, and AMEX), Cabcharge, or cash. Our vehicles are equipped with modern payment terminals for secure transactions at the end of your trip. We aim to provide a completely hassle-free service from booking to payment, ensuring your journey with us is simple and stress-free.",
    `We offer flexible and convenient payment options to make your experience as smooth as possible. Accepted payment methods are confirmed when you book, including major credit and debit cards (Visa, Mastercard, and AMEX). ${CABCHARGE}`,
  ],
  ["Meet and greet airport pickups", "Airport pickups at designated pickup locations"],
  [
    " Once confirmed, you’ll get an SMS and email with your booking summary and, closer to the pickup time, your professional driver’s details and contact number.",
    " Once confirmed, you’ll get an SMS and email with your booking summary and, once a driver has been assigned, the relevant driver and vehicle details.",
  ],
  [
    "To ensure a prompt, on-time pickup, clear details are essential. When you book, be ready to provide your precise pickup and drop-off addresses, including any specific building names or entry points. For airport arrivals, supply your flight number and scheduled arrival time so your driver can monitor your flight. Finally, a reliable contact number ensures your driver can reach you easily on the day.",
    "To ensure a prompt, on-time pickup, clear details are essential. When you book, be ready to provide your precise pickup and drop-off addresses, including any specific building names or entry points. For airport arrivals, supply your flight number and scheduled arrival time so our team can monitor arrival updates. Finally, a reliable contact number ensures our booking team can reach you easily on the day.",
  ],
  ["Choose the “Meet and Greet” Advantage:", "Ask About Pickup Assistance:"],
  [
    " Especially after a long international flight, our “Meet and Greet” service removes all stress. Your professional driver will be waiting in the arrivals hall with a name sign, ready to assist with your bags and guide you directly to your vehicle.",
    ` Standard pickups are arranged at designated pickup locations. ${SYD_2}`,
  ],
  [
    "For pre-booked services like a Sydney airport maxi taxi, the designated pickup point is the Priority Pickup zone. At the T1 International terminal, this is located a short walk from the arrivals hall-just follow the green signs. Our professional driver will send you a text message upon your arrival with the exact bay number and vehicle details, ensuring a smooth and easy connection after your long flight. This organised system removes any stress from finding your ride.",
    `For pre-booked services like a Sydney airport maxi taxi, pickups are at the terminal's designated pickup area - just follow the green signs from the arrivals hall. ${DRIVER}`,
  ],
  [
    " Impress arriving clients or executives with a seamless meet-and-greet service right at the terminal.",
    " Arrange pickups for arriving clients or executives at the designated pickup area, with special assistance available by prior arrangement.",
  ],
  [
    "This allows you to easily identify your ride and contact your driver if needed. Furthermore, professional drivers understand the importance of punctuality and will typically arrive a few minutes early, giving you ample time to load your luggage without rushing.",
    `This allows you to easily identify your ride. For pickup assistance or updates, contact our booking team on ${PHONE} or WhatsApp ${WHATSAPP} - they coordinate directly with your driver. Furthermore, professional drivers understand the importance of punctuality and will typically arrive a few minutes early, giving you ample time to load your luggage without rushing.`,
  ],
  [
    "Finding your driver at Sydney Airport is simple. For domestic arrivals (T2 & T3), your driver will meet you at the designated pre-booked vehicle pickup area. For international arrivals (T1), they will be waiting for you in the public arrivals hall, just after you exit customs. Your driver will be holding a sign with your name clearly displayed. If for any reason you can’t spot them immediately, simply call the contact number provided in your confirmation message, and we’ll connect you right away.",
    `Finding your driver at Sydney Airport is simple. ${SYD_1} For domestic arrivals (T2 & T3) that's the Priority Pickup Area; for international arrivals (T1), the designated Rideshare Pickup Area. If you can’t spot your vehicle, contact our booking team on ${PHONE} or WhatsApp ${WHATSAPP} - they coordinate directly with your driver.`,
  ],
  [
    " Your professional Tiptop Maxi driver will be waiting for you, holding a sign with your name for easy identification.",
    " You’ll receive pickup instructions and vehicle details before collection, so you know exactly where to meet your Tiptop Maxi vehicle.",
  ],
  [
    "Finding your driver is simple and straightforward. For international arrivals (T1), your driver will meet you at the designated Express Pick-up area. For domestic arrivals (T2/T3), the meeting point is at the Priority Pick-up zone. Your driver will be holding a sign with your name for easy identification, ensuring a quick and efficient start to your transfer to the cruise terminal.",
    "Finding your driver is simple and straightforward. For international arrivals (T1), pickups are at the designated Rideshare Pickup Area. For domestic arrivals (T2/T3), the meeting point is the Priority Pickup zone. You’ll receive pickup instructions and vehicle details before collection, ensuring a quick and efficient start to your transfer to the cruise terminal.",
  ],
  [
    "The public taxi rank, especially during peak hours or after a large international flight lands, can mean a long, frustrating queue. Instead of waiting in line, imagine a professional driver waiting for you in the arrivals hall. A pre-booked service means your driver tracks your flight in real-time, so whether you land early or face a delay, they will be there. This eliminates uncertainty and provides genuine peace of mind from the moment you touch down.",
    "The public taxi rank, especially during peak hours or after a large international flight lands, can mean a long, frustrating queue. Instead of waiting in line, a pre-booked transfer has your vehicle arranged at the designated pickup area. Provide your flight number and our team can monitor arrival updates and coordinate your pickup whether you land early or face a delay. This eliminates uncertainty and provides genuine peace of mind from the moment you touch down.",
  ],
  [
    ". To make things easy, they will be holding a sign with your name clearly displayed. This personal touch ensures you can quickly spot your ride and get on your way without any hassle.",
    ". You’ll receive pickup instructions and vehicle details before collection, so you can quickly find your ride and get on your way without any hassle.",
  ],
  [
    " zone. This dedicated area is located just a short walk across the pedestrian crossing from the terminal building. Your driver will send you a text message with their exact bay number (e.g., “Waiting for you in Bay 4”) as they arrive, so you know precisely where to meet them.",
    ` zone. This dedicated area is located just a short walk across the pedestrian crossing from the terminal building. You’ll receive pickup instructions and vehicle details before collection - for pickup assistance, contact our booking team on ${PHONE} or WhatsApp ${WHATSAPP}.`,
  ],
  [
    "We offer several convenient payment options for a hassle-free experience. You can pay your driver directly in the vehicle using cash, EFTPOS, or any major credit card (Visa, Mastercard, Amex). We also accept Cabcharge for corporate travel. For many pre-booked journeys, you also have the option to pay securely online in advance, so you can simply relax and enjoy the ride without worrying about payment at your destination.",
    `We offer several convenient payment options for a hassle-free experience. Accepted payment methods are confirmed when you book, and for many pre-booked journeys you can pay securely online in advance. ${CABCHARGE}`,
  ],
];

// ---- WSI hub (/western-sydney-airport-transfers/) - brief Task 7
const WSI_HUB_SLUG = "western-sydney-airport-transfers";
const WSI_HUB = {
  h1: "Western Sydney Airport Transfers – Maxi Taxi & Group Transport",
  heroDescription:
    "Arrange transport to and from Western Sydney International Airport (WSI) with TipTop Maxi Sydney. Our service supports individuals, families, groups and passengers requiring wheelchair-accessible transport. Western Sydney International Airport is located at 40 Nancy Drive, Luddenham NSW. Please confirm your flight and pickup requirements when making your booking.",
  operationalNotice: `Western Sydney International Airport passenger services commence 25 October 2026. ${WSI_PICKUP}`,
  pickupSection: {
    heading: "Western Sydney Airport Pickup Information",
    paragraphs: [
      WSI_PICKUP,
      "Under the access arrangements published for WSI's opening, pre-booked taxis and booked hire vehicles collect passengers from the P1 Commercial Pick-Up zone - not the rideshare or Uber pick-up zones beside the terminal. Your booking confirmation sets out exactly where to meet your vehicle.",
      DRIVER,
    ].map((text) => ({ text })),
    bulletList: [],
  },
  sydVsWsiSection: {
    heading: "WSI or Sydney Airport (SYD)? Check Before You Book",
    paragraphs: [
      "Western Sydney International Airport (WSI) at Luddenham and Sydney (Kingsford Smith) Airport (SYD) at Mascot are two different airports, a long drive apart. Check the airport code on your ticket before booking - and if you're connecting between them on the same day, tick the Sydney Airport connection option in the booking form and allow plenty of time between flights.",
    ].map((text) => ({ text })),
    bulletList: [],
  },
  // The removed placeholder section (no heading) that this replaces.
  oldPickupPlaceholder:
    "Pickup procedures at the new terminal will be published once confirmed against Western Sydney Airport's official passenger transport arrangements.",
  comparisonRows: {
    "Direct WSI–Sydney Airport transfer": "Express bus to SYD (shared)",
    Pricing: "Published per-seat fares",
  } as Record<string, string>,
};

// Anything matching these in a changed doc's NEW content means a claim the brief removed survived.
// FAQ *questions* are exempt - "Do you offer meet and greet?" is a fair question; only answers matter.
// Critical topics (Tasks 1-3), checked everywhere:
const BANNED =
  /do not accept cabcharge|don't process ndis funding or cabcharge|driver'?s? (personal|mobile) (number|phone)|driver.{0,40}(phone number|contact number|contact details)|(call|message|text|phone|contact) (your|the) driver( directly)?\b(?! at the end)|meet-and-greet service|“meet and greet” service|meet & greet at arrivals|name.?board|name sign|holding a sign|inside the terminal|inside the arrivals|in the arrivals hall, holding|escort/i;
// Automatic flight monitoring / tracking-link claims - checked on pages only. Blog posts still carry
// generic flight-tracking marketing copy; that's a separate, non-critical clean-up.
const BANNED_PAGES = /automatically|in real time|real-time|monitored live|monitors it live|wheels-up|tracking link/i;

type Doc = { id: string; slug: string; updatedAt: string } & Record<string, unknown>;

function replaceStrings(value: unknown, table: Map<string, string>, hits: Map<string, number>): unknown {
  if (typeof value === "string") {
    const next = table.get(value);
    if (next === undefined) return value;
    hits.set(value, (hits.get(value) ?? 0) + 1);
    return next;
  }
  if (Array.isArray(value)) return value.map((v) => replaceStrings(v, table, hits));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k === "id" ? v : replaceStrings(v, table, hits)]));
  }
  return value;
}

function scan(value: unknown, path: string, out: string[], pattern: RegExp) {
  if (typeof value === "string") {
    if (!path.endsWith(".question") && pattern.test(value)) out.push(`${path}: ${value.slice(0, 160)}`);
  } else if (Array.isArray(value)) value.forEach((v, i) => scan(v, `${path}[${i}]`, out, pattern));
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) scan(v, path ? `${path}.${k}` : k, out, pattern);
}

// Only fields a person reads - ids, slugs, relations and timestamps are never rewritten.
const PAGE_FIELDS = ["metaTitle", "metaDescription", "h1", "heroDescription", "operationalNotice", "contentSections", "faq", "comparisonTable", "relatedLinks", "routeDetails"];

function applyWsiHub(changes: Record<string, unknown>, doc: Doc) {
  const sections = (changes.contentSections ?? doc.contentSections) as { heading?: string; paragraphs: { text: string }[] }[];
  const idx = sections.findIndex((s) => s.paragraphs?.some((p) => p.text === WSI_HUB.oldPickupPlaceholder));
  if (idx === -1) throw new Error("WSI hub: pickup placeholder section not found - page changed since 2026-10-24.");
  const nextSections = [...sections];
  nextSections.splice(idx, 1, WSI_HUB.pickupSection as never, WSI_HUB.sydVsWsiSection as never);

  const table = (changes.comparisonTable ?? doc.comparisonTable) as { rows: { feature: string; valueB: string }[] };
  const rows = table.rows.map((r) => (WSI_HUB.comparisonRows[r.feature] ? { ...r, valueB: WSI_HUB.comparisonRows[r.feature] } : r));
  const changedRows = rows.filter((r, i) => r.valueB !== table.rows[i].valueB).length;
  if (changedRows !== Object.keys(WSI_HUB.comparisonRows).length) throw new Error("WSI hub: comparison rows not found as expected.");

  Object.assign(changes, {
    h1: WSI_HUB.h1,
    heroDescription: WSI_HUB.heroDescription,
    operationalNotice: WSI_HUB.operationalNotice,
    contentSections: nextSections,
    comparisonTable: { ...table, rows },
  });
}

async function run() {
  const live = process.env.LIVE === "true";
  const restoreIdx = process.argv.indexOf("--restore");
  const payload = await getPayload({ config });

  if (restoreIdx !== -1) {
    const backup = JSON.parse(readFileSync(process.argv[restoreIdx + 1], "utf8")) as {
      docs: { collection: "pages" | "blog-posts"; id: string; slug: string; original: Record<string, unknown> }[];
    };
    for (const d of backup.docs) {
      await payload.update({ collection: d.collection, id: d.id, data: d.original });
      console.log(`restored ${d.collection}/${d.slug}`);
    }
    process.exit(0);
  }

  const siteWhere = { "site.key": { equals: SITE_KEY } };
  const pages = (await payload.find({ collection: "pages", where: siteWhere, limit: 1000, depth: 0 })).docs as unknown as Doc[];
  const posts = (await payload.find({ collection: "blog-posts", where: siteWhere, limit: 1000, depth: 0 })).docs as unknown as Doc[];

  const pageTable = new Map(PAGE_REPLACEMENTS);
  const blogTable = new Map(BLOG_REPLACEMENTS);
  if (pageTable.size !== PAGE_REPLACEMENTS.length || blogTable.size !== BLOG_REPLACEMENTS.length) throw new Error("Duplicate key in a replacement table.");
  const pageHits = new Map<string, number>();
  const blogHits = new Map<string, number>();

  type Change = { collection: "pages" | "blog-posts"; doc: Doc; data: Record<string, unknown> };
  const changes: Change[] = [];

  for (const doc of pages) {
    const data: Record<string, unknown> = {};
    for (const field of PAGE_FIELDS) {
      if (doc[field] === undefined) continue;
      const next = replaceStrings(doc[field], pageTable, pageHits);
      if (JSON.stringify(next) !== JSON.stringify(doc[field])) data[field] = next;
    }
    if (doc.slug === WSI_HUB_SLUG) applyWsiHub(data, doc);
    if (Object.keys(data).length) changes.push({ collection: "pages", doc, data });
  }
  const describedPosts = new Set<string>();
  for (const doc of posts) {
    const data: Record<string, unknown> = {};
    const next = replaceStrings(doc.content, blogTable, blogHits);
    if (JSON.stringify(next) !== JSON.stringify(doc.content)) data.content = next;
    const description = BLOG_DESCRIPTIONS[doc.slug];
    if (description && doc.metaDescription === SHARED_BLOG_DESCRIPTION) {
      data.metaDescription = description;
      if (doc.excerpt === SHARED_BLOG_DESCRIPTION) data.excerpt = description;
      describedPosts.add(doc.slug);
    }
    if (Object.keys(data).length) changes.push({ collection: "blog-posts", doc, data });
  }
  const undescribed = Object.keys(BLOG_DESCRIPTIONS).filter((slug) => !describedPosts.has(slug));
  if (undescribed.length) throw new Error(`Blog description(s) no longer shared, re-check: ${undescribed.join(", ")}`);

  // Every replacement must have matched - a miss means the CMS drifted from the snapshot.
  const misses = [
    ...PAGE_REPLACEMENTS.filter(([old]) => !pageHits.has(old)).map(([old]) => `page: ${old.slice(0, 90)}`),
    ...BLOG_REPLACEMENTS.filter(([old]) => !blogHits.has(old)).map(([old]) => `blog: ${old.slice(0, 90)}`),
  ];
  if (misses.length) {
    misses.forEach((m) => console.error(`  NOT FOUND: ${m}`));
    throw new Error(`${misses.length} replacement(s) matched nothing - the CMS changed since 2026-10-24; re-check before running.`);
  }

  const stale = changes.filter((c) => c.doc.updatedAt > SNAPSHOT_AT);
  if (stale.length && process.env.FORCE !== "true") {
    stale.forEach((c) => console.error(`  EDITED SINCE SNAPSHOT: ${c.collection}/${c.doc.slug} (${c.doc.updatedAt})`));
    throw new Error("Some docs were edited after 2026-10-24 - review those edits first (FORCE=true to override).");
  }

  const problems: string[] = [];
  for (const c of changes) {
    const next = { ...c.doc, ...c.data, updatedAt: undefined, createdAt: undefined };
    scan(next, `${c.collection}/${c.doc.slug}`, problems, BANNED);
    if (c.collection === "pages") scan(next, `${c.collection}/${c.doc.slug}`, problems, BANNED_PAGES);
  }
  if (problems.length) {
    problems.forEach((p) => console.error(`  REMAINING CLAIM: ${p}`));
    throw new Error("A changed doc still contains a removed claim - add it to the replacement table first.");
  }

  for (const c of changes) console.log(`${c.collection}/${c.doc.slug}: ${Object.keys(c.data).join(", ")}`);
  console.log(`\n${changes.filter((c) => c.collection === "pages").length} pages, ${changes.filter((c) => c.collection === "blog-posts").length} blog posts to update.`);

  if (!live) {
    console.log("DRY RUN - pass LIVE=true to actually write.");
    process.exit(0);
  }

  mkdirSync("scripts/backups", { recursive: true });
  const backupPath = `scripts/backups/fix-customer-info-${Date.now()}.json`;
  writeFileSync(
    backupPath,
    JSON.stringify(
      {
        docs: changes.map((c) => ({
          collection: c.collection,
          id: c.doc.id,
          slug: c.doc.slug,
          original: Object.fromEntries(Object.keys(c.data).map((k) => [k, c.doc[k]])),
        })),
      },
      null,
      1,
    ),
  );
  console.log(`Backup of original field values: ${backupPath}`);

  for (const c of changes) {
    await payload.update({ collection: c.collection, id: c.doc.id, data: c.data });
    console.log(`saved ${c.collection}/${c.doc.slug}`);
  }
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
