/**
 * transport-solutions (tiptopmaxisydney.com.au) - CMS half of the "Pending SEO Tasks" brief,
 * 2026-10-31 (the code half is in transport-solutions-sydney, same date).
 *
 * Task 1  - Driver contact: blog posts that still told passengers to SMS/WhatsApp/call the driver,
 *           or promised the driver's mobile number, now use the approved booking-team wording.
 * Task 5  - Metadata: over-long meta titles/descriptions shortened (blog H1s are untouched - only
 *           metaTitle is set, so URLs and on-page headings stay as they are).
 * Task 11 - Duplicates: the 81 "<suburb>-to-sydney-airport-taxi" pages (seeded 2026-08-29, ~70%
 *           shared text, no internal links, no Search Console impressions) set to forceNoindex.
 *           Their URLs keep working; the sitemap drops them automatically via isIndexable().
 * Task 14 - WSI: Western Sydney International opened on 25 October 2026, so "opening / once
 *           bookings open / taking pre-bookings" wording is moved to the present tense, and the
 *           remaining "pickup arrangements to be confirmed" placeholders now name the P1 Commercial
 *           Pick-Up zone (NSW Point to Point Transport Commission notice, 23 Oct 2026 - see
 *           fix-customer-info-2026-10-24.ts). Public-transport line per Transport for NSW's WSI page.
 * Also    - remaining automatic / "every single booking" flight-tracking claims on pages and in a
 *           few blog posts normalised to the approved flight-number wording (lib/customerInfo.ts).
 *
 * Pages/locations use substring rules (applied in order, each must match at least once); blog
 * posts use substring replacements inside single Lexical text nodes. A miss means the CMS changed - the run stops.
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-seo-brief-2026-10-31.ts
 * (dry-run by default - pass LIVE=true to write; original values are backed up to
 * scripts/backups/ first, restorable with --restore scripts/backups/<file>.json)
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";
const SNAPSHOT_AT = "2026-10-31T00:00:00.000Z";

const PHONE = "02 9669 9390";
const WHATSAPP = "+61 410 025 786";
const BOOKING_TEAM = `please contact our booking team on ${PHONE} or WhatsApp ${WHATSAPP}. Our team will coordinate directly with your driver.`;
const DRIVER = `Once a driver has been assigned, you will receive the relevant driver and vehicle details. For pickup assistance or updates, ${BOOKING_TEAM}`;
const FLIGHT = "Provide your flight number when booking so our team can monitor arrival updates and coordinate your pickup.";
const FLIGHT_SHORT = "Give us your flight number so our team can monitor arrival updates and coordinate your pickup";
const P1 = "Pre-booked vehicles collect passengers from WSI's P1 Commercial Pick-Up zone";

// ---- Pages + locations: [substring, replacement], applied in this order to every string field.
const TEXT_RULES: [string, string][] = [
  // WSI suburb route pages - titles, metas, intros
  [" | Opening 25 Oct 2026", " | Fixed Fares"],
  ["Taking bookings now ahead of the 25 October 2026 opening.", "Sedan to 11-seater vehicles, 24/7."],
  ["TipTop Maxi Sydney is taking bookings ahead of the airport's 25 October 2026 opening.", "Sedan to 11-seater vehicles, 24/7."],
  ["Pre-book a fixed-price transfer ahead of the airport's 25 October 2026 opening.", "Pre-book a fixed-price transfer, 24/7."],
  ["Pre-book a fixed-price transfer ahead of the 25 October 2026 opening.", "Pre-book a fixed-price transfer, 24/7."],
  ["Once Western Sydney International Airport opens on 25 October 2026, the Hills District gets", "Since Western Sydney International Airport opened on 25 October 2026, the Hills District has"],
  ["Once Western Sydney International Airport opens on 25 October 2026, Blacktown residents get", "Since Western Sydney International Airport opened on 25 October 2026, Blacktown residents have"],
  ["Once Western Sydney International Airport opens on 25 October 2026, this becomes", "Since Western Sydney International Airport opened on 25 October 2026, this has become"],
  ["Once the airport opens on 25 October 2026, this could be", "Since the airport opened on 25 October 2026, this has become"],
  ["Once the airport opens, the route from Parramatta runs", "The route from Parramatta runs"],
  [", and once bookings open we expect", ", and we expect"],
  ["Once bookings open, we expect", "We expect"],
  ["Flight monitoring will be available once bookings open", FLIGHT_SHORT],
  ["Flight monitoring at both ends once bookings open", "Give us both flight numbers so our team can monitor arrival updates at each end"],
  ["our maxi taxis will be available for up to 11 passengers", "our maxi taxis are available for up to 11 passengers"],
  ["Airport opens to passengers on Sunday, 25 October 2026.", "Airport opened to passengers on Sunday, 25 October 2026."],
  ["Airport opens 25 October 2026, roughly 34km", "Airport opened on 25 October 2026, roughly 34km"],
  [" We're taking pre-bookings now for travel from that date onward.", " We provide pre-booked transfers to and from WSI 24/7."],
  [" We're taking pre-bookings now.", " We provide pre-booked transfers to and from WSI 24/7."],
  ["Parramatta to Western Sydney Airport, Ready Before Opening Day.", "Parramatta to Western Sydney Airport, Fixed-Price and Pre-Booked."],
  [" Will Look Like", " Looks Like"],
  [
    "For a lot of Hills District travellers, Western Sydney Airport will come down to which route offers the better flight options once schedules are published.",
    "For a lot of Hills District travellers, choosing between the two airports comes down to which one offers the better flight options.",
  ],
  ["Western Sydney Airport will likely become the obvious first choice once flights begin.", "Western Sydney Airport is often the obvious first choice."],
  ["Western Sydney Airport will likely become the default choice over the longer trip", "Western Sydney Airport is often the better choice over the longer trip"],
  ["which will make it a genuine second option once flights begin.", "which makes it a genuine second option."],
  ["Exact pickup arrangements will be confirmed once WSI publishes its commercial-vehicle procedures", P1],
  ["WSI pickup and commercial-vehicle procedures may change before passenger operations begin.", "WSI pickup and commercial-vehicle procedures may change."],
  // Sydney Airport <-> WSI
  ["TipTop Maxi Sydney is preparing pre-booked direct transport between", "TipTop Maxi Sydney provides pre-booked direct transport between"],
  [", roughly 50km apart, for journeys from 25 October 2026 onward.", ", roughly 50km apart."],
  [
    "Once Western Sydney Airport opens on 25 October 2026, more travellers will be able to connect between the two — for onward flights, work, or simply because it's the closer option to home. We're preparing to make that transfer straightforward.",
    "Since Western Sydney Airport opened on 25 October 2026, more travellers are connecting between the two — for onward flights, work, or simply because it's the closer option to home. We make that transfer straightforward.",
  ],
  ["Once bookings open, if you're connecting", "If you're connecting"],
  ["Yes — once bookings open, you'll be quoted", "Yes — you'll be quoted"],
  ["Once bookings open, vehicles up to 11 seats will be available", "Vehicles up to 11 seats are available"],
  // WSI service pages
  [
    "We're taking pre-bookings now ahead of Western Sydney Airport's 25 October 2026 opening, fixed price agreed before you book,",
    "Pre-book any time for Western Sydney Airport, with the fixed price agreed before you book,",
  ],
  [
    "Yes, we'll operate 24 hours a day, seven days a week for Western Sydney Airport once it opens. It's designed as a curfew-free facility, so early departures and late arrivals will be part of our normal service from opening day.",
    "Yes, we operate 24 hours a day, seven days a week for Western Sydney Airport. It's a curfew-free airport, so early departures and late arrivals are part of our normal service.",
  ],
  ["we estimate around 45–55 minutes once the airport opens on 25 October 2026, based on", "we estimate around 45–55 minutes in normal traffic, based on"],
  [
    "Once Western Sydney Airport opens, the last thing you'll want after a long flight is to navigate unfamiliar transport options. We're preparing to make the arrival side of this route simple.",
    "After a long flight into Western Sydney Airport, the last thing you want is to navigate unfamiliar transport options. We make the arrival side of this route simple.",
  ],
  [
    "Pickup at the Designated Area: Once bookings open, pickup will take place at the designated vehicle pickup area, included in every booking at no extra charge.",
    `Pickup at the Designated Area: ${P1}, included in every booking at no extra charge.`,
  ],
  [
    "Western Sydney Airport is designed to operate 24 hours with no curfew, so early morning and late-night departures are expected to be standard from opening day.",
    "Western Sydney Airport operates 24 hours with no curfew, so early morning and late-night departures are standard.",
  ],
  [
    "Pickup at Arrivals: Once bookings open, your driver will be ready at the designated pickup area with bags loaded. You'll be in the vehicle within minutes of clearing customs.",
    `Pickup at Arrivals: ${P1}. Once you have your bags, ${BOOKING_TEAM}`,
  ],
  [
    "Western Sydney Airport is designed to run 24 hours with no curfew, so 3am arrivals and 5am departures are expected to be part of normal operations from opening day.",
    "Western Sydney Airport runs 24 hours with no curfew, so 3am arrivals and 5am departures are part of normal operations.",
  ],
  ["based on current road conditions ahead of the airport's opening. We'll refine this once flights begin.", "based on current road conditions. Allow extra time in peak traffic."],
  [
    "Public transport arrangements for Western Sydney Airport are still being finalised by Transport for NSW. Based on currently published plans, a bus connection to St Marys Station with an onward rail journey is expected, with a total trip likely exceeding 90 minutes - confirm current timetables with Transport for NSW closer to your travel date, as details may change before opening.",
    "Until Sydney Metro services begin, public transport to Western Sydney Airport relies on the WSI Link bus to St Marys Station with an onward train, or a paid express shuttle - check current timetables with Transport for NSW before you travel.",
  ],
  [
    "A proper SUV for Western Sydney Airport, fixed price, door to door. Room for up to seven with real luggage space, with fixed-price, pre-bookable transport once Western Sydney Airport opens.",
    "A proper SUV for Western Sydney Airport, fixed price, door to door. Room for up to seven with real luggage space. Pre-book 24/7.",
  ],
  ["Pickup at the designated area, once bookings open", `${P1}`],
  [
    "Designated pickup zone: Once bookings open, your SUV picks up from the designated vehicle pickup area at the terminal.",
    "Designated pickup zone: Your SUV collects you from WSI's P1 Commercial Pick-Up zone for pre-booked vehicles.",
  ],
  [
    "Pickup at the Designated Area: Once bookings open, pickup will take place at the designated vehicle pickup area — no searching required, walk out and go.",
    `Pickup at the Designated Area: ${P1}, and confirmed customers receive meeting instructions before travelling.`,
  ],
  [
    "Driver Ready at Pickup: Once bookings open, your driver will be ready at the designated pickup area with bags loaded and your group seated.",
    `Coordinated Pickup: Once your group has its bags, ${BOOKING_TEAM}`,
  ],
  [
    "Pickup at the Designated Area Included: Once WSI opens, every airport pickup will include collection from the designated vehicle pickup area — not an optional extra, part of the standard service.",
    "Pickup at the Designated Area Included: Every WSI airport pickup includes collection from the P1 Commercial Pick-Up zone for pre-booked vehicles — not an optional extra, part of the standard service.",
  ],
  [
    "Yes - once Western Sydney Airport opens, we'll operate 24 hours a day, 7 days a week,",
    "Yes - we operate Western Sydney Airport transfers 24 hours a day, 7 days a week,",
  ],
  [
    "Pre-book a Western Sydney Airport family transfer for travel from 25 October 2026, with a baby capsule or child seat arranged for each child. Tell us each child's age and approximate size when you book.",
    "Pre-book a Western Sydney Airport family transfer with a baby capsule or child seat arranged for each child. Tell us each child's age and size when you book.",
  ],
  ["Western Sydney Airport Baby Seat Transfers – Pre-Book for Travel From 25 October 2026", "Western Sydney Airport Baby Seat Transfers – Capsules & Child Seats Arranged"],
  [
    "Yes. Western Sydney Airport is designed to operate without a curfew, so once it opens, 4am and midnight family flights are expected to be part of the normal schedule there - and we'll be ready to cover them from opening day.",
    "Yes. Western Sydney Airport operates without a curfew, so 4am and midnight family flights are part of the normal schedule there - and we cover them 24/7.",
  ],
  // WSI hub (its "| Opening 25 Oct 2026" title is covered by the first rule)
  [
    "Pre-book transport to Western Sydney International Airport, opening 25 October 2026. Maxi taxis,",
    "Pre-book transport to and from Western Sydney International Airport (WSI). Maxi taxis,",
  ],
  ["(WSI) will begin passenger operations on Sunday, 25 October 2026.", "(WSI) began passenger operations on Sunday, 25 October 2026."],
  [
    "TipTop Maxi Sydney is accepting advance enquiries and pre-booked transfers for travel from opening day onwards, including",
    "TipTop Maxi Sydney provides pre-booked transfers to and from WSI, including",
  ],
  ["Our fleet will be available for Western Sydney Airport transfers", "Our fleet is available for Western Sydney Airport transfers"],
  ["— full pricing details will be confirmed once Western Sydney Airport booking arrangements are finalised.", "— your fare is confirmed when you book."],
  ["Customers with flights scheduled from 25 October 2026 onward can plan transport in advance.", "Customers flying into or out of WSI can plan transport in advance."],
  [
    "Once Western Sydney Airport opens, we'll offer transfers directly between the two airports as well as connections across Greater Sydney.",
    "We also offer transfers directly between the two airports, as well as connections across Greater Sydney.",
  ],
  ["Jetstar launches Gold Coast, Melbourne and Brisbane services from opening day,", "Jetstar operates Gold Coast, Melbourne and Brisbane services from WSI,"],
  [
    "Yes. You can pre-book a transfer now for travel from 25 October 2026 onwards. Availability will depend on",
    "Yes. You can pre-book a WSI transfer online or with our booking team. Availability depends on",
  ],
  ["passenger services commence 25 October 2026.", "passenger services began on 25 October 2026."],
  ["and Western Sydney Airport transfers from 25 October 2026 onward.", "and Western Sydney Airport transfers."],
  // Locations
  [
    "The Hills District is positioned to benefit from shorter road access to the new Western Sydney Airport (Badgerys Creek) via the M12 Motorway once it opens on 25 October 2026.",
    "The Hills District has shorter road access to the new Western Sydney Airport (Badgerys Creek), open since 25 October 2026, via the M12 Motorway.",
  ],
  ["Will the Hills District be closer to the new airport once it opens?", "Is the Hills District closer to Western Sydney Airport?"],
  [
    "Yes, the M12 Motorway will give the Hills District more direct road access to Western Sydney Airport at Badgerys Creek than the region currently has to Sydney Airport.",
    "Yes, the M12 Motorway gives the Hills District more direct road access to Western Sydney Airport at Badgerys Creek than the region has to Sydney Airport.",
  ],
  [
    "This region sits closest to the new Western Sydney Airport (Badgerys Creek), opening 25 October 2026. Liverpool in particular will see much shorter transfer times",
    "This region sits closest to the new Western Sydney Airport (Badgerys Creek), open since 25 October 2026. Liverpool in particular has much shorter transfer times",
  ],
  [
    "Western Sydney International Airport (Badgerys Creek) opens to passengers on 25 October 2026 and will sit considerably closer for this region than Sydney Airport. Pre-book early during the airport's opening period while local traffic patterns settle.",
    "Western Sydney International Airport (Badgerys Creek) opened to passengers on 25 October 2026 and sits considerably closer to this region than Sydney Airport. Pre-book early while local traffic patterns settle in the airport's first months.",
  ],
  ["Will TipTop service the new Western Sydney Airport?", "Does TipTop service the new Western Sydney Airport?"],
  [
    "Yes, we are set up to service Western Sydney Airport at Badgerys Creek from its opening on 25 October 2026,",
    "Yes, we service Western Sydney Airport at Badgerys Creek, which opened on 25 October 2026,",
  ],
  ["New airport at Badgerys Creek, opening Oct 2026", "New airport at Badgerys Creek, open since Oct 2026"],
  ["Contact us with your travel date, flight number when available, and passenger numbers, and we'll confirm your booking ahead of the 25 October 2026 opening.", "Contact us with your travel date, flight number and passenger numbers, and we'll confirm your booking."],
  ["Everything you need to know ahead of the 25 October 2026 opening.", "Pickup zones, airlines and transfer options at WSI."],
  // Catch-all for the remaining journey-time lines ("Approx 15-20 minutes once bookings open, ...") - last, so the specific rules above win.
  [" once bookings open", ""],

  // Flight-tracking promises (pages)
  ["Flight monitoring on every single booking", "Flight number taken on every airport booking so our team can monitor arrival updates"],
  ["Flight monitoring on every booking", "Flight number taken on every airport booking so our team can monitor arrival updates"],
  [
    "Yes, 7 seater airport transfers are one of our most requested bookings, with flight tracking included as standard.",
    `Yes, 7 seater airport transfers are one of our most requested bookings. ${FLIGHT}`,
  ],
  ["Flight monitoring covers early-morning departures without you needing to call", "Early-morning departures covered 24/7 - book ahead and our team coordinates your pickup"],
  ["Flight monitoring covers early-morning and late-night flights without a call", `Early-morning and late-night flights covered - ${FLIGHT_SHORT.charAt(0).toLowerCase()}${FLIGHT_SHORT.slice(1)}`],
  ["Flight monitoring so late-night and early-morning flights are covered without a phone call", `Late-night and early-morning flights covered - ${FLIGHT_SHORT.charAt(0).toLowerCase()}${FLIGHT_SHORT.slice(1)}`],
  ["Flight monitoring adjusts your pickup for delays or early landings", FLIGHT_SHORT],
  ["Flight monitoring so a delayed flight doesn't mean a driver who's given up", "Flight number taken so our team can coordinate your pickup if your flight is delayed"],
  ["Flight monitoring so a delayed flight doesn't mean a wasted trip", "Flight number taken so our team can coordinate your pickup if your flight is delayed"],
  ["Flight monitoring so a long drive doesn't mean a missed pickup", "Flight number taken so our team can coordinate your pickup if your flight is delayed"],
  ["Flight monitoring so the whole group's pickup adjusts together", "One flight number for the group, so our team can coordinate everyone's pickup together"],
  ["Flight monitoring ensures on-time airport pickups", "Flight number taken so our team can monitor arrival updates for airport pickups"],
  [
    "We watch the flight, not the clock: Your driver's timing is set against your actual flight number, so a delayed bag carousel doesn't mean a driver who's given up and left.",
    `Flight updates: ${FLIGHT} If your flight is delayed, please also let our booking team know.`,
  ],
  [
    "Once your booking is confirmed, you'll receive your driver and vehicle details in advance, and we monitor your flight from the day of travel so your pickup time stays accurate.",
    `Once a driver has been assigned, you'll receive the driver and vehicle details. ${FLIGHT}`,
  ],
  [
    "Direct transfers between Sydney Airport (Kingsford Smith) and Western Sydney Airport. Fixed fares, flight tracking and 24/7 availability with TipTop Maxi Sydney.",
    "Direct transfers between Sydney Airport (Kingsford Smith) and Western Sydney Airport. Fixed fares and 24/7 availability with TipTop Maxi Sydney.",
  ],

  // Meta descriptions over 160 characters
  [
    "Wheelchair-accessible taxi transfers to and from Sydney Airport. Trained drivers, accessible vehicles and flight monitoring, available 24/7 with TipTop Maxi Sydney.",
    "Wheelchair-accessible taxi transfers to and from Sydney Airport. Trained drivers, accessible vehicles and flight monitoring, available 24/7.",
  ],
  [
    "Book a long distance taxi transfer from Sydney to regional NSW destinations - Wollongong, Newcastle, Blue Mountains, Southern Highlands and more. Fixed fares, 7-11 seater vehicles, 24/7.",
    "Long distance taxi transfers from Sydney to Wollongong, Newcastle, the Blue Mountains, Southern Highlands and more. Fixed fares, 7-11 seaters, 24/7.",
  ],
  [
    "Browse TipTop Maxi Sydney's full range of taxi services — airport transfers, corporate transport, cruise terminal transfers, general transfers, parcel delivery and race day transfers.",
    "Browse TipTop Maxi Sydney's taxi services: airport transfers, corporate transport, cruise terminal transfers, parcel delivery and race day transfers.",
  ],
  [
    "Book an 11 seater taxi in Sydney for airport transfers, corporate groups, cruise transfers and larger families. Passenger and luggage capacity depends on vehicle configuration and is confirmed at booking.",
    "Book an 11 seater taxi in Sydney for airport transfers, corporate groups, cruise transfers and larger families. Capacity is confirmed at booking.",
  ],
  ["Maxi Taxi Hills District Sydney | Castle Hill, Kellyville, Rouse Hill", "Maxi Taxi Hills District | Castle Hill, Kellyville, Rouse Hill"],
  [
    "Maxi taxi and airport transfers for South-West Sydney including Liverpool, Campbelltown, Fairfield and Bankstown. Closest region to Western Sydney Airport. 24/7 booking.",
    "Maxi taxi and airport transfers for South-West Sydney: Liverpool, Campbelltown, Fairfield and Bankstown. Closest region to Western Sydney Airport.",
  ],
  [
    "Pre-booked maxi taxi and airport transfers for Sydney's Eastern Suburbs including Bondi, Bondi Junction, Randwick and Coogee. 7 & 11 seater vehicles, 24/7 booking.",
    "Pre-booked maxi taxi and airport transfers for Sydney's Eastern Suburbs: Bondi, Bondi Junction, Randwick and Coogee. 7 & 11 seaters, 24/7.",
  ],
  [
    "Pre-booked maxi taxi service for Sydney CBD, Haymarket, Pyrmont, Barangaroo and Darling Harbour. 7 & 11 seater vehicles, fixed-price Sydney Airport transfers, 24/7 booking.",
    "Pre-booked maxi taxi for Sydney CBD, Haymarket, Pyrmont, Barangaroo and Darling Harbour. 7 & 11 seaters, fixed-price airport transfers, 24/7.",
  ],
];

// Templated meta descriptions - regex rules on metaDescription only, applied when over 160 chars.
const META_PATTERNS: [RegExp, (...m: string[]) => string][] = [
  [
    /^Book a pre-arranged Sydney Airport to (.+) taxi or maxi taxi\. Sedan, SUV, 7 and 11 seater options with fixed-price quotes, flight monitoring and T1\/T2\/T3 pickup\.$/,
    (_, suburb) => `Pre-book a Sydney Airport to ${suburb} taxi or maxi taxi. Sedan, SUV, 7 and 11 seaters, fixed-price quotes and T1/T2/T3 pickup, 24/7.`,
  ],
  [
    /^Pre-booked maxi taxi service for (.+) and surrounding (.+) suburbs\. 7 & 11 seater vehicles, fixed-price Sydney Airport transfers, 24\/7 booking\.$/,
    (_, suburb, region) => `Maxi taxi service for ${suburb} and nearby ${region}${/suburbs$/i.test(region) ? " areas" : " suburbs"}. 7 & 11 seaters, fixed-price Sydney Airport transfers, 24/7.`,
  ],
];

// ---- Blog posts: [substring, replacement] within Lexical text nodes
const BLOG_REPLACEMENTS: [string, string][] = [
  [
    "Once your ship has docked, your journey to shore is straightforward. Simply proceed through Australian customs and collect your luggage from the baggage claim area as you normally would. Once you are ready, make your way to the designated passenger pickup zone located just outside the terminal. Your professional Tiptop Maxi driver will be waiting for you. For total convenience, you will receive a text message from your driver confirming their exact location and vehicle details, ensuring a quick and easy meeting.",
    `Once your ship has docked, your journey to shore is straightforward. Simply proceed through Australian customs and collect your luggage from the baggage claim area as you normally would. Once you are ready, make your way to the designated passenger pickup zone located just outside the terminal. ${DRIVER}`,
  ],
  [
    "We understand that travel plans can change unexpectedly. When you book an airport or cruise transfer, simply provide us with your flight or ship details. Our professional team actively monitors arrival times and will adjust your pickup schedule accordingly at no extra charge. We track your journey to ensure your driver is there when you arrive, whether you’re early or delayed, guaranteeing a reliable and stress-free connection to your destination.",
    "We understand that travel plans can change unexpectedly. When you book an airport or cruise transfer, simply provide us with your flight or ship details so our team can monitor arrival updates and coordinate your pickup. If your plans change, please also let our booking team know.",
  ],
  ["Step 3: Communicate with Your Driver.", "Step 3: Contact Our Booking Team."],
  [
    " Once you’ve collected your luggage and cleared customs, send your driver a quick SMS or WhatsApp message. They will reply with their exact location, vehicle type, and registration number (e.g., “White Toyota HiAce, T1P TOP”), so you can spot them easily in the crowd.",
    ` Once you’ve collected your luggage and cleared customs, ${BOOKING_TEAM} You will have received the vehicle details once a driver was assigned, so you can spot your vehicle easily.`,
  ],
  [
    " Confirm your departure terminal with your driver. They are local experts who know the fastest routes",
    " Confirm your departure terminal when you book. Our drivers are local experts who know the fastest routes",
  ],
  [
    "You can avoid waiting time fees, which can accumulate if your flight is delayed, by providing your flight number when you book. Our professional drivers track your flight and adjust the pickup time accordingly, ensuring a smooth connection at no extra cost.",
    `You can avoid waiting time fees, which can accumulate if your flight is delayed, by providing your flight number when you book so our team can monitor arrival updates and coordinate your pickup.`,
  ],
  [
    "Don’t worry, we monitor all cruise ship arrival schedules for our pre-booked pickups. If your ship is delayed, we will automatically adjust your pickup time to match the new arrival. Simply provide us with your cruise line and ship name when you book your taxi from Circular Quay to the airport, and our professional driver will be there waiting for you, ensuring a seamless and stress-free connection.",
    "Provide your cruise line and ship name when you book your taxi from Circular Quay to the airport so our team can follow arrival updates and coordinate your pickup. If your ship is delayed, please also let our booking team know.",
  ],
  ["The driver’s name and mobile number", "The driver and vehicle details, once a driver has been assigned"],
  [
    " for an airport pickup and provide your flight number, our team actively monitors your flight’s status. We automatically adjust the dispatch and pickup time to align with your new arrival, at no extra cost. Your driver will be there when you land, ensuring a reliable and hassle-free connection from the airport to your destination, no matter the delay.",
    " for an airport pickup and provide your flight number, our team can monitor arrival updates and coordinate your pickup. If your flight is delayed, please also let our booking team know.",
  ],
  [
    "If significant delays occur, just keep in contact with your driver or our office.",
    `If significant delays occur, contact our booking team on ${PHONE} or WhatsApp ${WHATSAPP} and they will coordinate directly with your driver.`,
  ],
  [
    " Nominate one person as the main point of contact for your driver and to relay information to the group.",
    " Nominate one person as the main point of contact with our booking team and to relay information to the group.",
  ],
  [
    "Flexibility is another key advantage. What if your flight is delayed by two hours? A shared shuttle will leave without you, forcing you to find last-minute, expensive transport. A professional maxi taxi service tracks your flight and adjusts your pickup time automatically, ensuring your driver is waiting when you arrive, at no extra cost. This peace of mind is the cornerstone of a stress-free ",
    "Flexibility is another key advantage. What if your flight is delayed by two hours? A shared shuttle will leave without you, forcing you to find last-minute, expensive transport. With a pre-booked maxi taxi, your flight number lets our team monitor arrival updates and coordinate your pickup. This peace of mind is the cornerstone of a stress-free ",
  ],
  [" booking, your inbound flight number allows us to track your arrival in real-time.", " booking, your inbound flight number lets our team monitor arrival updates and coordinate your pickup."],
  [
    "Don’t worry if your flight is delayed. When you book with us and provide your flight number, we monitor its status in real-time. Our driver will automatically adjust the pickup time based on your actual arrival, at no extra cost to you. This service is designed to remove travel stress, ensuring your driver is ready and waiting for you when you land.",
    `Don’t worry if your flight is delayed. ${FLIGHT} If your flight is delayed, arrives early or changes, please also let our booking team know.`,
  ],
  [
    " Always provide your flight number when booking. This allows us to track your flight in real-time and adjust for any delays, guaranteeing we are there when you land-not too early or too late.",
    " Always provide your flight number when booking so our team can monitor arrival updates and coordinate your pickup.",
  ],
  [
    "We understand that flight delays are a common part of travel. When you pre-book your Sydney airport maxi taxi with us and provide your flight number, we actively monitor your flight’s status. We will automatically adjust your pickup time to align with your new arrival, ensuring your driver is there when you land, at no extra charge. This reliable service provides complete peace of mind, knowing your transport is secured, no matter what happens with your flight schedule.",
    `We understand that flight delays are a common part of travel. When you pre-book your Sydney airport maxi taxi with us, provide your flight number so our team can monitor arrival updates and coordinate your pickup. If your flight is delayed, arrives early or changes, please also let our booking team know.`,
  ],
  [
    " We monitor your flight in real-time and automatically adjust your pickup time for any delays, ensuring your driver is there when you land.",
    ` ${FLIGHT}`,
  ],
  [
    " Your flight number is essential. It allows us to track your flight in real-time and adjust for any delays, ensuring we’re there when you land.",
    " Your flight number is essential. It lets our team monitor arrival updates and coordinate your pickup.",
  ],
  [
    "Your peace of mind is our priority. When you book with us, we monitor your flight status in real-time. If your flight is delayed, we will automatically adjust your pickup time to match the new arrival, ensuring your driver is there when you land at no extra charge.",
    `Your peace of mind is our priority. ${FLIGHT} If your flight is delayed, please also let our booking team know.`,
  ],
];

// Blog metaTitle / metaDescription overrides (titles over ~60 chars get cut off in results; the
// post's own title / H1 stays as it is).
const BLOG_META: Record<string, { metaTitle?: string; metaDescription?: string }> = {
  "why-tiptop-transport-solutions-is-becoming-sydneys-most-trusted-travel-partner": { metaTitle: "Why Sydney Travellers Choose TipTop Transport Solutions" },
  "why-choosing-tiptop-transport-solutions-taxi-in-sydney-is-the-best-decision-for-your-travel": {
    metaTitle: "Why Choose TipTop Transport Solutions Taxi in Sydney",
    metaDescription: "Holiday, work or a special occasion: why a pre-booked TipTop taxi beats rideshare surges, crowded public transport and parking in Sydney.",
  },
  "white-bay-cruise-terminal-taxi-maxi-your-stress-free-group-transfer": { metaTitle: "White Bay Cruise Terminal Maxi Taxi: Group Transfers" },
  "whats-the-best-way-to-get-to-sydney-airport-in-2026-a-complete-guide": { metaTitle: "Best Way to Get to Sydney Airport in 2026: Full Guide" },
  "the-best-way-to-travel-from-sydney-airport-why-tiptop-transport-solutions-is-the-1-choice-for-maxi-taxi-transfers": {
    metaTitle: "Best Way to Travel from Sydney Airport: Maxi Taxi Guide",
  },
  "taxi-with-infant-car-seat-in-sydney-your-complete-2026-safety-guide": { metaTitle: "Taxi with Infant Car Seat Sydney: 2026 Safety Guide" },
  "taxi-with-baby-seat-sydney-your-ultimate-guide-to-safe-family-travel": { metaTitle: "Taxi with Baby Seat Sydney: Safe Family Travel Guide" },
  "taxi-from-circular-quay-to-sydney-airport-the-2026-group-travel-guide": { metaTitle: "Circular Quay to Sydney Airport Taxi: 2026 Group Guide" },
  "sydneys-most-reliable-taxi-experience-how-tiptop-transport-keeps-your-journey-stress-free-every-time": {
    metaTitle: "Reliable Sydney Taxi Service: Stress-Free Journeys",
  },
  "sydney-cruise-terminal-transport-the-ultimate-2026-group-travel-guide": { metaTitle: "Sydney Cruise Terminal Transport: 2026 Group Guide" },
  "sydney-airport-transfers-the-ultimate-guide-for-a-stress-free-journey": { metaTitle: "Sydney Airport Transfers: Guide to a Stress-Free Trip" },
  "maxi-van-taxi-sydney-the-ultimate-guide-for-group-luggage-travel": { metaTitle: "Maxi Van Taxi Sydney: Group & Luggage Travel Guide" },
  "maxi-taxi-sydney-the-complete-guide-to-1-11-seater-group-transfers-airport-pickups-events": {
    metaTitle: "Maxi Taxi Sydney: 1–11 Seater Group Transfer Guide",
  },
  "maxi-taxi-sydney-airport-the-ultimate-guide-for-group-family-transfers": { metaTitle: "Maxi Taxi Sydney Airport: Group & Family Transfers" },
  "maxi-taxi-for-your-sydney-wedding-the-ultimate-guide-to-stress-free-transport": { metaTitle: "Maxi Taxi for Your Sydney Wedding: Transport Guide" },
  "long-distance-taxi-service-sydney-your-ultimate-guide-for-interstate-regional-travel": {
    metaTitle: "Long Distance Taxi Sydney: Interstate & Regional Guide",
  },
  "large-taxi-for-luggage-in-sydney-the-ultimate-guide-to-stress-free-group-travel": { metaTitle: "Large Taxi for Luggage in Sydney: Group Travel Guide" },
  "interstate-taxi-service-your-ultimate-guide-to-long-distance-travel-from-sydney": {
    metaTitle: "Interstate Taxi Service from Sydney: Long-Distance Guide",
  },
  "group-airport-transfers-vs-rideshare-sydney": { metaTitle: "Group Airport Transfers vs Rideshare in Sydney" },
  "complete-sydney-airport-transfer-guide-2026-everything-you-need-to-know": {
    metaTitle: "Sydney Airport Transfer Guide 2026: What to Know",
    metaDescription: "How to arrange a Sydney airport transfer in 2026: booking tips, cost breakdowns, luggage solutions and advice for a smooth airport journey.",
  },
  "circular-quay-cruise-terminal-transfer-your-stress-free-ride-to-the-ship": { metaTitle: "Circular Quay Cruise Terminal Transfers: Ride to the Ship" },
  "airport-to-cruise-terminal-group-transfer-the-stress-free-sydney-guide": { metaTitle: "Airport to Cruise Terminal Group Transfers in Sydney" },
  "airport-to-airport-transfers-the-ultimate-guide-to-a-seamless-journey": { metaTitle: "Airport to Airport Transfers: A Seamless Journey Guide" },
  "1300-cabs-sydney-the-smarter-way-to-book-your-group-airport-taxi": { metaTitle: "Looking for 1300 Cabs? The Right Taxi for Sydney Groups" },
  "your-trusted-transport-partner-in-sydney": {
    metaDescription: "Why Sydney travellers book TipTop Transport Solutions for airport transfers, medical trips, family and group travel, wheelchair access and child seats.",
  },
};

// Near-duplicate suburb pages (Task 11) - noindexed, not deleted.
const NOINDEX_SLUG = /^[a-z0-9-]+-to-sydney-airport-taxi$/;
const NOINDEX_EXPECTED = 81;

// Anything matching these in a changed doc's NEW content means a claim survived - the run stops.
// Driver contact (Task 1) and WSI pre-opening wording (Task 14) are checked everywhere; automatic
// flight-tracking wording only on pages/locations, since ~30 blog posts still carry generic
// flight-tracking marketing copy that is a separate, larger rewrite (reported, not blocking).
const BANNED = /driver'?s?’? (name and )?(personal |direct )?(mobile|phone) (number)?|(sms|text|message|whatsapp|call) (your|the) driver|text message from your driver|once bookings open|taking (pre-)?bookings (now|ahead)|ahead of the (airport's )?25 october 2026 opening/i;
const BANNED_PAGES = /automatically adjust|in real-time|real-time flight/i;
const BLOG_FLIGHT = /real-time|automatically adjust/i;

type Doc = { id: string; slug: string; updatedAt: string } & Record<string, unknown>;
type Collection = "pages" | "blog-posts" | "locations";

const PAGE_FIELDS = ["metaTitle", "metaDescription", "h1", "heroDescription", "operationalNotice", "contentSections", "faq", "comparisonTable", "relatedLinks", "routeDetails"];
const LOCATION_FIELDS = ["metaTitle", "metaDescription", "heroDescription", "intro", "airportInfo", "westernAirportInfo", "services", "faq", "suburbs"];

function mapStrings(value: unknown, fn: (s: string) => string): unknown {
  if (typeof value === "string") return fn(value);
  if (Array.isArray(value)) return value.map((v) => mapStrings(v, fn));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k === "id" ? v : mapStrings(v, fn)]));
  }
  return value;
}

function scan(value: unknown, path: string, out: string[], pattern: RegExp) {
  if (typeof value === "string") {
    if (!path.endsWith(".question") && pattern.test(value)) out.push(`${path}: ${value.slice(0, 160)}`);
  } else if (Array.isArray(value)) value.forEach((v, i) => scan(v, `${path}[${i}]`, out, pattern));
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) scan(v, path ? `${path}.${k}` : k, out, pattern);
}

async function run() {
  const live = process.env.LIVE === "true";
  const restoreIdx = process.argv.indexOf("--restore");
  const payload = await getPayload({ config });

  if (restoreIdx !== -1) {
    const backup = JSON.parse(readFileSync(process.argv[restoreIdx + 1], "utf8")) as {
      docs: { collection: Collection; id: string; slug: string; original: Record<string, unknown> }[];
    };
    for (const d of backup.docs) {
      await payload.update({ collection: d.collection, id: d.id, data: d.original });
      console.log(`restored ${d.collection}/${d.slug}`);
    }
    process.exit(0);
  }

  const siteWhere = { "site.key": { equals: SITE_KEY } };
  const find = async (collection: Collection) => (await payload.find({ collection, where: siteWhere, limit: 1000, depth: 0 })).docs as unknown as Doc[];
  const [pages, posts, locations] = [await find("pages"), await find("blog-posts"), await find("locations")];

  const rules = TEXT_RULES;
  if (new Set(rules.map(([old]) => old)).size !== rules.length) throw new Error("Duplicate key in TEXT_RULES.");
  const ruleHits = new Map<string, number>();
  const applyRules = (s: string) => {
    let out = s;
    for (const [old, next] of rules) {
      if (out.includes(old)) {
        out = out.split(old).join(next);
        ruleHits.set(old, (ruleHits.get(old) ?? 0) + 1);
      }
    }
    return out;
  };

  type Change = { collection: Collection; doc: Doc; data: Record<string, unknown> };
  const changes: Change[] = [];
  const diffs: string[] = [];

  const collectStringDiffs = (label: string, before: unknown, after: unknown) => {
    const a: string[] = [];
    const b: string[] = [];
    mapStrings(before, (s) => (a.push(s), s));
    mapStrings(after, (s) => (b.push(s), s));
    a.forEach((s, i) => s !== b[i] && diffs.push(`${label}\n  - ${s}\n  + ${b[i]}`));
  };

  for (const [collection, docs, fields] of [
    ["pages", pages, PAGE_FIELDS],
    ["locations", locations, LOCATION_FIELDS],
  ] as const) {
    for (const doc of docs) {
      const data: Record<string, unknown> = {};
      for (const field of fields) {
        if (doc[field] === undefined || doc[field] === null) continue;
        let next = mapStrings(doc[field], applyRules);
        if (field === "metaDescription" && typeof next === "string" && next.length > 160) {
          for (const [re, fn] of META_PATTERNS) {
            const m = next.match(re);
            if (m) next = fn(...m);
          }
        }
        if (JSON.stringify(next) !== JSON.stringify(doc[field])) {
          data[field] = next;
          collectStringDiffs(`${collection}/${doc.slug}.${field}`, doc[field], next);
        }
      }
      if (collection === "pages" && NOINDEX_SLUG.test(doc.slug) && doc.indexOverride !== "forceNoindex") {
        data.indexOverride = "forceNoindex";
      }
      if (Object.keys(data).length) changes.push({ collection, doc, data });
    }
  }

  const blogTable = new Map(BLOG_REPLACEMENTS);
  if (blogTable.size !== BLOG_REPLACEMENTS.length) throw new Error("Duplicate key in BLOG_REPLACEMENTS.");
  const blogHits = new Map<string, number>();
  const metaHits = new Set<string>();
  for (const doc of posts) {
    const data: Record<string, unknown> = {};
    // Substring match within a single Lexical text node - never across nodes, so formatting
    // (bold/links) around the sentence is untouched.
    const next = mapStrings(doc.content, (s) => {
      let out = s;
      for (const [old, r] of blogTable) {
        if (!out.includes(old)) continue;
        out = out.split(old).join(r);
        blogHits.set(old, (blogHits.get(old) ?? 0) + 1);
      }
      return out;
    });
    if (JSON.stringify(next) !== JSON.stringify(doc.content)) {
      data.content = next;
      collectStringDiffs(`blog-posts/${doc.slug}.content`, doc.content, next);
    }
    const meta = BLOG_META[doc.slug];
    if (meta) {
      metaHits.add(doc.slug);
      for (const [k, v] of Object.entries(meta)) {
        if (doc[k] !== v) {
          data[k] = v;
          diffs.push(`blog-posts/${doc.slug}.${k}\n  - ${doc[k]}\n  + ${v}`);
        }
      }
    }
    if (Object.keys(data).length) changes.push({ collection: "blog-posts", doc, data });
  }

  const misses = [
    ...rules.filter(([old]) => !ruleHits.has(old)).map(([old]) => `text rule: ${old.slice(0, 100)}`),
    ...BLOG_REPLACEMENTS.filter(([old]) => !blogHits.has(old)).map(([old]) => `blog: ${old.slice(0, 100)}`),
    ...Object.keys(BLOG_META).filter((s) => !metaHits.has(s)).map((s) => `blog meta: ${s}`),
  ];
  if (misses.length) {
    misses.forEach((m) => console.error(`  NOT FOUND: ${m}`));
    throw new Error(`${misses.length} rule(s) matched nothing - the CMS changed; re-check before running.`);
  }
  const noindexCount = changes.filter((c) => c.data.indexOverride === "forceNoindex").length;
  const alreadyNoindexed = pages.filter((p) => NOINDEX_SLUG.test(p.slug) && p.indexOverride === "forceNoindex").length;
  if (noindexCount + alreadyNoindexed !== NOINDEX_EXPECTED) throw new Error(`Expected ${NOINDEX_EXPECTED} duplicate pages, found ${noindexCount + alreadyNoindexed}.`);

  const stale = changes.filter((c) => c.doc.updatedAt > SNAPSHOT_AT);
  if (stale.length && process.env.FORCE !== "true") {
    stale.forEach((c) => console.error(`  EDITED SINCE SNAPSHOT: ${c.collection}/${c.doc.slug} (${c.doc.updatedAt})`));
    throw new Error("Some docs were edited after the snapshot - review those edits first (FORCE=true to override).");
  }

  const problems: string[] = [];
  const blogFlight: string[] = [];
  for (const c of changes) {
    if (c.collection === "pages" && NOINDEX_SLUG.test(c.doc.slug)) continue; // noindexed - not reviewed line by line
    const next = { ...c.doc, ...c.data, updatedAt: undefined, createdAt: undefined };
    const target = c.collection === "blog-posts" ? { content: next.content } : next;
    const path = `${c.collection}/${c.doc.slug}`;
    scan(target, path, problems, BANNED);
    scan(target, path, c.collection === "blog-posts" ? blogFlight : problems, c.collection === "blog-posts" ? BLOG_FLIGHT : BANNED_PAGES);
  }
  if (blogFlight.length) console.log(`(${blogFlight.length} blog flight-tracking lines left for the separate blog rewrite)`);
  if (problems.length) {
    problems.forEach((p) => console.error(`  REMAINING CLAIM: ${p}`));
    throw new Error("A changed doc still contains a removed claim - add it to the rules first.");
  }

  writeFileSync("scripts/backups/fix-seo-brief-2026-10-31.diff.txt", diffs.join("\n\n"));
  const tooLong = changes.flatMap((c) =>
    ["metaTitle", "metaDescription"].filter((k) => typeof c.data[k] === "string" && (c.data[k] as string).length > (k === "metaTitle" ? 65 : 160)).map((k) => `${c.collection}/${c.doc.slug}.${k} (${(c.data[k] as string).length})`),
  );
  if (tooLong.length) tooLong.forEach((t) => console.error(`  STILL TOO LONG: ${t}`));

  const count = (col: Collection) => changes.filter((c) => c.collection === col).length;
  console.log(`${count("pages")} pages (${noindexCount} newly noindexed), ${count("locations")} locations, ${count("blog-posts")} blog posts to update.`);
  console.log(`${diffs.length} string changes - see scripts/backups/fix-seo-brief-2026-10-31.diff.txt`);

  if (!live) {
    console.log("DRY RUN - pass LIVE=true to actually write.");
    process.exit(0);
  }

  mkdirSync("scripts/backups", { recursive: true });
  const backupPath = `scripts/backups/fix-seo-brief-${Date.now()}.json`;
  writeFileSync(
    backupPath,
    JSON.stringify(
      {
        docs: changes.map((c) => ({
          collection: c.collection,
          id: c.doc.id,
          slug: c.doc.slug,
          original: Object.fromEntries(Object.keys(c.data).map((k) => [k, c.doc[k] ?? null])),
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
