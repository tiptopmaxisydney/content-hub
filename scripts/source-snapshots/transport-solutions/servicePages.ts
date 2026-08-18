// Transcribed by hand from transport-solutions-sydney's original hardcoded route files
// (app/<slug>/page.tsx) - unlike baby-seat/wheelchair, this content was never in a clean
// data array, it was embedded directly in JSX, so there's no automated snapshot to freeze.
// `slug` is the full path relative to app/ (joined with "/" for nested routes), matching
// the site's actual URLs, e.g. "taxi-services/sydney-airport-transfer" for
// /taxi-services/sydney-airport-transfer/. Bespoke visual widgets used by a handful of hub
// pages (fleet specs, reviews grid, service-area grid, service card grids) are NOT
// represented here - per an explicit decision, those stay hardcoded in the frontend
// template; only prose (hero, contentSections, faq) is CMS-editable.
export type ServicePageSeed = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow?: string;
  h1: string;
  heroDescription: string;
  image: { src: string; alt: string };
  contentSections: Array<{
    heading?: string;
    paragraphs: string[];
    bulletList?: string[];
  }>;
  faq?: Array<{ question: string; answer: string }>;
};

export const servicePages: ServicePageSeed[] = [
  {
    slug: "maxi-11-seater-van",
    metaTitle: "Maxi Cab Sydney 11 Seater | Minibus Taxi",
    metaDescription:
      "Book an 11 seater maxi van in Sydney for families, corporate teams, and group travel. Door-to-door minibus taxi for airport transfers, cruise terminals, hotels and events.",
    h1: "Maxi Cab Sydney 11 Seater (Minibus Taxi for Groups & Luggage)",
    heroDescription:
      "Need a big taxi for a group, huge luggage, or an airport transfer? Our 11 seater maxi van is ideal for families, corporate teams, and group travel across Sydney. Book a minibus taxi in Sydney for door-to-door pickups, including Sydney Airport transfers, cruise terminals, hotels, and events.",
    image: { src: "/images/Maxi-Cab-service-1.png", alt: "TipTop Maxi Sydney 11 seater van" },
    contentSections: [
      {
        heading: "Why Choose Our 11 Seater Maxi Van?",
        paragraphs: [
          "Our 11 seater vans are ideal for groups who want more space than a regular taxi but prefer a private, door-to-door service over public transport. With ample room for passengers and luggage, TipTop Maxi Sydney's maxi cabs are perfect for:",
          "Enjoy the comfort of air-conditioned vehicles, professional local drivers, and personalised service that adapts to your schedule with TipTop Maxi Sydney.",
        ],
        bulletList: [
          "Seats: Up to 11 passengers (best for groups, families, and team travel)",
          "Luggage: Designed for large luggage and multiple suitcases",
          "Popular trips: Minibus to Sydney Airport, hotels, events, cruise terminals, and long-distance trips",
          "Comfort: More space than a standard sedan or SUV for passengers plus bags",
          "Booking: Pre-book in advance for early morning flights and peak periods",
        ],
      },
      {
        heading: "Features of TipTop Maxi Sydney's 11 Seater Minibus",
        paragraphs: [],
        bulletList: [
          "Spacious seating for up to 11 passengers with ample legroom",
          "Generous luggage capacity to accommodate large bags and equipment",
          "Air conditioning for a comfortable ride all year round",
          "Child safety seats available on request for family-friendly travel",
          "Wheelchair accessible options ensuring inclusive transport for all passengers",
          "Modern and well-maintained vehicles to guarantee reliability and safety",
          "Professional drivers with extensive local knowledge of Sydney and NSW",
          "Easy access sliding doors for quick and convenient boarding",
          "Onboard charging ports for mobile devices (available in select vehicles)",
          "GPS tracking and real-time route updates to ensure timely arrivals and departures",
        ],
      },
      {
        heading: "Comprehensive Group Transport Service Across Sydney",
        paragraphs: [
          "We specialise in group cab services across Sydney, providing a variety of transport options including:",
          "No matter your group size or specific requirements, TipTop Maxi Sydney's fleet of 11 seater maxi cabs and minibuses ensures you travel comfortably and on time.",
        ],
        bulletList: [
          "Sydney airport shuttle for groups",
          "Minibus hire Sydney Airport",
          "Van taxi service Sydney for families and large parties",
          "Wheelchair-friendly cabs for accessible travel",
          "Taxis with baby seats Sydney Airport for safe family journeys",
          "Affordable airport group transport Sydney with upfront pricing",
        ],
      },
      {
        heading: "Easy Online Booking for 11-Seater Maxi Cabs and Vans",
        paragraphs: [
          "Booking your 11 seater maxi cab in Sydney with TipTop Maxi Sydney is quick and convenient. Simply use our online booking system to:",
          "Our 24/7 availability guarantees that your Sydney airport group transfer or city transport is ready whenever you need it.",
        ],
        bulletList: [
          "Select your pickup and drop-off locations",
          "Choose your vehicle type based on group size",
          "Get an instant fare estimate",
          "Confirm your booking with immediate confirmation",
        ],
      },
    ],
    faq: [
      { question: "1. What is an 11 seater minibus offered by TipTop Maxi Sydney?", answer: "TipTop Maxi Sydney provides spacious 11 seater minibuses designed to comfortably carry up to 11 passengers along with their luggage. These vehicles are ideal for group travel, airport transfers, corporate events, and special occasions in Sydney." },
      { question: "2. How do I book an 11 seater minibus with TipTop Maxi Sydney?", answer: "You can easily book your 11 seater minibus online via the TipTop Maxi Sydney website. Just select your pickup and drop-off locations, choose the 11 seater vehicle option, and confirm your booking instantly." },
      { question: "3. Are 11 seater minibuses suitable for airport transfers?", answer: "Yes, TipTop Maxi Sydney's 11 seater minibuses are perfect for Sydney Airport transfers, offering ample space for passengers and luggage to make your group travel comfortable and hassle-free." },
      { question: "4. Does TipTop Maxi Sydney provide wheelchair-accessible minibuses?", answer: "Yes, TipTop Maxi Sydney offers wheelchair-accessible minibuses to ensure inclusive and convenient transport for passengers with mobility needs. Be sure to request this option when booking." },
      { question: "5. Can I request a child seat in an 11 seater minibus from TipTop Maxi Sydney?", answer: "Absolutely. Child safety seats are available on request in TipTop Maxi Sydney's vehicles. Please mention your requirement during the booking process." },
      { question: "6. What are the costs for hiring an 11 seater minibus from TipTop Maxi Sydney?", answer: "Costs vary based on trip distance, duration, and vehicle type. TipTop Maxi Sydney provides upfront fare estimates during online booking so you know the cost before you travel." },
      { question: "7. Is TipTop Maxi Sydney's 11 seater minibus service available 24/7?", answer: "Yes, our 11 seater minibus service operates 24 hours a day, 7 days a week, including public holidays." },
      { question: "8. What occasions are suitable for booking an 11 seater minibus with TipTop Maxi Sydney?", answer: "Airport transfers, corporate events, weddings, family outings, cruise terminal transfers, and any group travel across Sydney and NSW." },
      { question: "9. How much luggage space do TipTop Maxi Sydney's 11 seater minibuses offer?", answer: "Our minibuses are designed with generous luggage capacity to accommodate large bags and equipment for the whole group." },
      { question: "10. Is online booking with TipTop Maxi Sydney secure and reliable?", answer: "Yes, our online booking system provides instant fare estimates and immediate confirmation, giving you a secure and reliable booking experience." },
    ],
  },
  {
    slug: "sedan",
    metaTitle: "Sedan Cab Sydney | 4 Seater Transport",
    metaDescription:
      "Premium 4 seater sedan cabs for airport transfers, city trips, business travel, and special occasions across Sydney. Book online, available 24/7.",
    h1: "Sedan Cab Sydney – Reliable 4 Seater Transport",
    heroDescription:
      "For smaller groups or individual travellers seeking comfortable and dependable transport in Sydney, TipTop Maxi Sydney offers premium 4 seater sedan cabs. Ideal for airport transfers, city trips, business travel, and special occasions, our sedan service ensures a professional and personalised experience every time.",
    image: { src: "/images/Sedan.png", alt: "TipTop Maxi Sydney sedan cab" },
    contentSections: [
      {
        heading: "Why Choose Our Sedan Cab Service",
        paragraphs: [
          "Our sedan cabs combine comfort, punctuality, and convenience to provide a smooth and hassle-free travel experience. Whether you need a quick Sydney Airport pickup or a ride to your hotel or corporate event, TipTop Maxi Sydney's sedan service caters to your transport needs:",
          "Our experienced drivers and well-maintained vehicles guarantee a premium ride every time.",
        ],
        bulletList: [
          "Efficient Sydney Airport transfers with sedan cabs",
          "City and CBD hotel pickups and drop-offs",
          "Business travel and corporate transport",
          "Personal and special occasion transport",
          "Child seat availability for safe family travel",
        ],
      },
      {
        heading: "Features of TipTop Maxi Sydney's Sedan Cabs",
        paragraphs: [],
        bulletList: [
          "Comfortable seating for up to 4 passengers",
          "Sufficient luggage space for small to medium bags",
          "Air conditioning for year-round comfort",
          "Child safety seats available on request",
          "Modern, clean, and well-maintained vehicles",
          "Professional and courteous drivers",
          "Easy online booking with instant confirmation",
        ],
      },
      {
        heading: "Flexible Transport Services Across Sydney",
        paragraphs: [
          "TipTop Maxi Sydney's sedan cabs offer flexible transport options, including:",
          "Our sedans are a reliable alternative to rideshare or public transport for smaller groups or individual travellers.",
        ],
        bulletList: [
          "Airport transfers with efficient sedan service",
          "Hotel pickups and drop-offs",
          "Corporate and business travel",
          "Personal and event transport",
          "Family-friendly rides with child seat options",
        ],
      },
      {
        heading: "How to Book Your Sedan Cab",
        paragraphs: [
          "Booking your 4 seater sedan cab is quick and hassle-free:",
          "Our 24/7 service ensures transport is available whenever you need it.",
        ],
        bulletList: [
          "Visit the TipTop Maxi Sydney website or contact our support team",
          "Select your pickup and drop-off locations",
          "Choose the sedan cab option",
          "Receive an instant fare estimate",
          "Confirm your booking with immediate online confirmation",
        ],
      },
    ],
  },
  {
    slug: "maxi-suv",
    metaTitle: "Maxi Cab SUV Sydney | 5, 6 & 7 Seater",
    metaDescription:
      "TipTop Maxi Sydney's SUV fleet offers 5, 6, or 7 seater SUVs for Sydney Airport transfers, city trips, and events, with professional drivers available 24/7.",
    h1: "Maxi Cab SUV Sydney – Spacious 5, 6 & 7 Seater Group Transport",
    heroDescription:
      "Travelling with family, friends, or colleagues? TipTop Maxi Sydney's SUV fleet offers the perfect balance of comfort, space, and reliability. Choose from 5, 6, or 7 seater SUVs for Sydney Airport transfers, city trips, and events, all with professional drivers available 24/7.",
    image: { src: "/images/TipTop-Platinum.png", alt: "TipTop Maxi Sydney SUV" },
    contentSections: [
      {
        heading: "Why Choose Our Maxi Cab SUVs",
        paragraphs: [
          "Our Maxi Cab SUVs provide a smooth, comfortable ride with plenty of room for passengers and luggage. Whether it's a Sydney Airport transfer, hotel pickup, or event shuttle, we tailor every trip to your needs. We specialise in:",
          "Our professional drivers offer expert local knowledge and punctual service, making every journey hassle-free.",
        ],
        bulletList: [
          "Sydney Airport transfers with SUV maxi cabs",
          "City hotel pickups and drop-offs",
          "Group transport for corporate events and weddings",
          "Shuttle services across Sydney and NSW suburbs",
          "Family-friendly travel with child seats available",
        ],
      },
      {
        heading: "Features of Our 5, 6 & 7 Seater SUVs",
        paragraphs: [],
        bulletList: [
          "Comfortable seating for 5, 6, or 7 passengers depending on your group size",
          "Ample luggage space to accommodate suitcases and carry-on bags",
          "Air conditioning for year-round comfort",
          "Child safety seats available on request for family-friendly rides",
          "Spacious legroom and headroom for a relaxing journey",
          "Advanced safety features including airbags and ABS brakes",
          "Clean, well-maintained vehicles to ensure reliability",
          "Easy online booking and instant confirmation for your convenience",
        ],
      },
      {
        heading: "Flexible Group Transport Options Across Sydney",
        paragraphs: [
          "Our SUVs are ideal for small and medium-sized groups looking for more comfort than a standard taxi. TipTop Maxi Sydney offers:",
          "Need more space? Explore our 11-Seater Vans for larger groups or Sedan Cabs for smaller, individual travel.",
        ],
        bulletList: [
          "Sydney airport group transfers with SUVs",
          "Sydney city and CBD hotel pickups",
          "Shuttle services for events and conferences",
          "Family travel with child seats and extra luggage space",
          "Accessible transport options for special requirements",
        ],
      },
      {
        heading: "How to Book Your Maxi Cab SUV",
        paragraphs: [
          "Booking your preferred 7, 6, or 5 seater maxi cab SUV is simple and fast:",
          "Our 24/7 service ensures your Sydney transport needs are covered anytime, day or night.",
        ],
        bulletList: [
          "Visit the TipTop Maxi Sydney website or call our booking team",
          "Choose your pick-up and drop-off locations",
          "Select the SUV size that fits your group",
          "Receive an instant fare estimate",
          "Confirm your booking with immediate online confirmation",
        ],
      },
    ],
    faq: [
      { question: "1. What seating options does TipTop Maxi Sydney offer for SUV maxi cabs?", answer: "TipTop Maxi Sydney provides 7, 6, and 5 seater maxi cab SUVs, suitable for groups of various sizes, all offering spacious and comfortable rides." },
      { question: "2. Can I book an SUV maxi cab for Sydney Airport transfers?", answer: "Yes, TipTop Maxi Sydney specialises in airport transfers with SUVs that accommodate passengers and luggage comfortably for hassle-free travel." },
      { question: "3. Are child seats available in the maxi cab SUVs?", answer: "Yes, child safety seats can be requested during booking to ensure a safe and family-friendly trip." },
      { question: "4. How do I book a 7, 6, or 5 seater maxi cab SUV with TipTop Maxi Sydney?", answer: "You can book easily online via the TipTop Maxi Sydney website or call our customer support. Instant fare estimates and confirmations are provided." },
      { question: "5. Does TipTop Maxi Sydney offer 24/7 service?", answer: "Yes, we operate round the clock to meet your travel needs anytime in Sydney." },
      { question: "6. Are the maxi cab SUVs wheelchair accessible?", answer: "While our SUV fleet focuses on luxury and space, TipTop Maxi Sydney offers wheelchair-accessible vehicles in our broader fleet. Please specify your needs when booking." },
    ],
  },
  {
    slug: "taxi-services",
    metaTitle: "Taxi Services Sydney | Book Online",
    metaDescription:
      "Browse TipTop Maxi Sydney's full range of taxi services — airport transfers, corporate transport, cruise terminal transfers, general transfers, parcel delivery and race day transfers.",
    h1: "Popular Sydney Transfer Services",
    heroDescription:
      "Browse TipTop Maxi Sydney's full range of taxi services — airport transfers, corporate transport, cruise terminal transfers, general transfers, parcel delivery and race day transfers.",
    image: { src: "/images/hub-Sydney-Airport-Transfer.png", alt: "Taxi Services Sydney" },
    contentSections: [
      {
        heading: "Our Services",
        paragraphs: [],
        bulletList: [
          "Sydney Airport Transfer: Enjoy a smooth trip with our Sydney Airport transfers, offering 7-seater and 11-seater maxi cabs, sedans, and wheelchair-accessible vehicles. We provide on-time pickups, comfortable seating, and child seats on request for a stress-free start or end to your journey.",
          "Corporate (CBD) Transfer: Make every business trip seamless with our premium corporate transfers. We offer professional airport pickups, direct transfers to the Sydney CBD, and transport to meetings, conferences, and events. Our fleet includes maxi cabs, sedans, and wheelchair-accessible vehicles, ensuring comfort and convenience for travelling professionals and their families.",
          "Cruise Transfer Sydney: Start or end your cruise in comfort with our Sydney cruise transfers. We provide transport between Sydney suburbs and the cruise terminal, with 7-seater and 11-seater maxi cabs, sedans, and accessible vehicles available. Enjoy a stress-free journey with plenty of room for passengers and luggage, plus child seats on request.",
          "General Transfer: From city tours to suburb trips, our general transfer service covers all your Sydney travel needs. Choose the right vehicle for your group — from a comfy sedan to our spacious maxi cabs — and enjoy a clean, reliable ride with a professional driver. Options include wheelchair access and family-friendly features like car seats.",
          "Parcel Transfer: Send parcels securely with TipTop's parcel delivery service. Whether it's a small package or bulky office equipment, our maxi cabs and parcel delivery service ensure safe, on-time transport to any Sydney location. We handle both business and personal deliveries with care and efficiency.",
          "Raceday Transfer: Travel to the races in style with our dedicated Race Day transfers. We offer 1–11 seater vehicles, including wheelchair-accessible options, so your group arrives together, comfortably, and on time. Perfect for a day at the track without the hassle of parking or public transport.",
        ],
      },
    ],
  },
  {
    slug: "premium-services",
    metaTitle: "Premium Taxi Services Sydney",
    metaDescription:
      "TipTop Maxi Sydney's premium services — wheelchair accessible taxis, taxis with car seats, and pet-friendly transport across Sydney.",
    h1: "Premium Sydney Transfer Services",
    heroDescription:
      "TipTop Maxi Sydney's premium services — wheelchair accessible taxis, taxis with car seats, and pet-friendly transport across Sydney.",
    image: { src: "/images/hub-wheel-chair-6.jpg", alt: "Premium Taxi Services Sydney" },
    contentSections: [
      {
        heading: "Our Services",
        paragraphs: [],
        bulletList: [
          "Wheelchair Taxi Sydney: Wheelchair-accessible maxi cabs designed for safe and comfortable transportation across Sydney. Approved wheelchairs can be safely secured within the vehicle, with drivers experienced in assisting passengers with mobility requirements.",
          "Sydney Car Seat Transfer: Age-appropriate baby seats, toddler seats, and booster seats fitted on request. Ideal for family travel across Sydney, from airport transfers to everyday trips, with child restraints selected to meet Australian safety requirements.",
          "Pet Taxi & Pet Transport: Pet taxi and pet transport services across Sydney and NSW. Book by appointment with at least 1 day's notice for safe, comfortable transport of your dog, cat, or other domestic pet, with owners welcome to travel along.",
        ],
      },
    ],
  },
  {
    slug: "taxi-services/corporate-transfers",
    metaTitle: "Corporate Transfers Sydney | Maxi Taxi",
    metaDescription:
      "Professional corporate transfer services in Sydney with punctual maxi taxis for business meetings, airport pickups, and executive travel.",
    h1: "Corporate Transfers Sydney",
    heroDescription:
      "Travel to and from Sydney CBD with ease using our reliable corporate transfer service. We provide spacious 7–11 seater maxi cabs, sedans, and vans, perfect for business travellers and teams. Our fleet includes vehicles with wheelchair access and baby seats, ensuring comfort for every passenger. Count on punctual pickups, professional drivers, and stress-free transport for meetings, events, or airport connections.",
    image: { src: "/images/Sydney_CBD.jpg", alt: "Corporate Transfers Sydney" },
    contentSections: [
      {
        heading: "Book 1-11 Seater Taxi or Maxi Cab for a Corporate Transfer in Sydney",
        paragraphs: [
          "Book Taxi/Maxi for Sydney Corporate Cab Transfer. Tip Top Maxi Sydney provides premium maxi cabs for Corporate Employees Services. Tip Top Maxi Sydney, a Maxi/Taxi cab Service in Sydney, brings Pickup and Drop-off services from/to Sydney City. We help passengers who travel within Sydney or anywhere in NSW, Australia. Our fleet of drivers provides Maxi/Taxi cab Services in Sydney, Sydney Corporate Transfer, Taxi Cabs with Car Seat, and Maxi Cabs with Wheelchair Seat.",
          "Book Maxi/Taxi to Sydney Corporate, Maxi Cabs from Sydney Airport to Hotel, Taxi Cabs from Corporate Employee transfer in the City Tour, Corporate Cabs with Wheelchair Seat, Sydney Corporate Taxi with Car Seat, Pickup from Sydney Airport, Drop-off to Sydney Airport. Our 1–11-seater maxi cabs are available for Hotel transfers, including Sydney Corporate Taxi and Taxi cabs Sydney. We prioritize providing our customers with a hassle-free experience, ensuring a smooth ride to your destination. We offer world-class Maxi Cab for Corporate group airport transfer services throughout Sydney and the Suburbs.",
        ],
      },
      {
        heading: "Taxi Services for Corporate Transfers",
        paragraphs: [
          "Book Taxi/Maxi Cabs for Corporate Transfers in Sydney with Tiptop Maxi Sydney – the best service to get you to your destination. Easily book our Maxi Cabs, Taxis or combined Maxi/Taxis by calling +61 2 9669 9390. We offer up to 11-seater Maxi Cabs in Sydney. For groups larger than 11, book additional Maxi Cabs, Taxis, Minibuses, or Wheelchair Accessible Taxis for disabled and elderly passengers – we have plenty of vehicles available.",
        ],
      },
    ],
    faq: [
      { question: "1. Do you offer corporate taxi accounts?", answer: "Yes. Businesses can establish corporate accounts for regular travel requirements." },
      { question: "2. Can executives pre-book transport?", answer: "Yes. Executive and business travel bookings can be scheduled in advance." },
      { question: "3. Are invoices provided?", answer: "Yes. Tax invoices can be supplied for all corporate travel bookings." },
      { question: "4. Do you provide airport transfers for business travelers?", answer: "Yes. Corporate airport transfers are one of our most requested services." },
      { question: "5. Is your service available after business hours?", answer: "Yes. We operate 24/7 to support business travel needs." },
    ],
  },
  {
    slug: "taxi-services/cruise-terminal-transfer-sydney",
    metaTitle: "Cruise Terminal Transfer Sydney",
    metaDescription:
      "Reliable cruise terminal transfer services in Sydney with spacious maxi taxis for overseas passenger terminal and White Bay pickups.",
    h1: "Cruise Terminal Transfer Sydney",
    heroDescription:
      "Start or finish your cruise journey in comfort with our Sydney cruise terminal transfers. We provide transport to White Bay and Overseas Passenger Terminals with 7–11 seater maxi cabs, sedans, and wheelchair-accessible vehicles. With space for luggage and child seats available on request, our professional drivers ensure a smooth and reliable trip from Sydney Airport, the CBD, or suburbs straight to the cruise dock.",
    image: { src: "/images/Cruise-Transfer-Sydney-scaled.jpg", alt: "Cruise Terminal Transfer Sydney" },
    contentSections: [
      {
        heading: "Sydney Cruise Terminal Transfer, White Bay Cruise Terminal, Overseas Passenger Terminal, Maxi Cab Sydney.",
        paragraphs: [
          "TipTop Maxi Sydney offers Sydney airport and cruise terminal transfers in Sydney for individuals, families, or groups to and from White Bay Cruise Terminal and Overseas Passenger Terminal.",
          "Enchanting voyager, your odyssey across the sea may ebb, but the narrative of your journey continues with eloquent mobility. Tip Top Maxi Sydney is not merely a service; it's the grand prelude or the poetic epilogue to your Sydney escapades.",
          "Consider us your personal carriage, expertly weaving through the tapestry that is New South Wales, designed to cater to your every transportation sonnet – with reliable and sophisticated Maxi/Taxicab services that gracefully ensure your passage to and from the esteemed White Bay Cruise Terminal and the illustrious Overseas Passenger Terminal.",
          "As a couturier crafts a gown to the unique silhouette of their muse, we offer bespoke journeys tailored to your desires. Whether you covet the exclusivity of Taxi Cabs equipped with the safety of a Car Seat or the thoughtful touch of Maxi Cabs with Wheelchair access, your individual narrative is the very essence of our being.",
          "But why stop at mere transportation? With up to 11 seats available in our chic fleet, gather your party and extend your adventure. Uncover the hidden jewels of Sydney with our curated city tours – because the true explorer in you knows the voyage is about more than the destination.",
          "In a world that often feels tailored to a universal fit, we pride ourselves on our commitment to providing an experience as unique as the fabric of your being. From the seamless ease of our wheelchair accommodations to the tender care of our car seat options, we fold details into your journey like a master weaver, crafting a tapestry of memories.",
          "When the lure of the Sydney Cruise Terminal calls, respond with the confidence of one who knows their ride will match the couture of their life. Whether it's a shuttle bus for your Sydney cruise or a reliable taxi for explorations unknown, look no further than Tip Top Maxi Sydney. Secure your passage – not just a transfer, but a transition to the next chapter in your style story.",
          "Embrace the seamless sophistication of your travel. Contact us and book your elevated transfer today, ensuring that every detail of your occasion is draped in the opulence you so richly deserve. Welcome to the journey of your dreams, with Tip Top Maxi Sydney as your charioteer.",
        ],
      },
      {
        heading: "Seamless Transfers Between Sydney Airport and Cruise Terminals",
        paragraphs: [
          "We offer Sydney airport transfer services for individuals, families, and groups to and from White Bay Cruise Terminal and Overseas Passenger Terminal. Our services are designed to provide a seamless and hassle-free experience, ensuring that our valued clients enjoy a comfortable and stress-free journey. Our team of experienced professionals is committed to delivering exceptional service, and we pride ourselves on our attention to detail and our ability to meet the unique needs of each of our clients. Whether you are traveling for business or pleasure, you can trust us to provide reliable and efficient airport transfer services that will exceed your expectations.",
        ],
      },
    ],
  },
  {
    slug: "taxi-services/general-transfers",
    metaTitle: "General Transfers Sydney | Maxi Taxi",
    metaDescription:
      "Affordable general transfer services across Sydney with clean maxi taxis for local travel, family trips, and daily transport needs.",
    h1: "General Transfers Sydney",
    heroDescription:
      "Book a reliable general transfer anywhere across Sydney and NSW. Our 7–11 seater maxi cabs, sedans, and wheelchair-accessible vehicles are ideal for city trips, hotel runs, day tours, or transport to suburbs. Whether travelling solo, with family, or in a group, we provide comfortable and on-time door-to-door taxi services tailored to your needs.",
    image: { src: "/images/Sydney-General-Transfer.webp", alt: "General Transfers Sydney" },
    contentSections: [
      {
        heading: "Book 1-11 Seater Taxi/Maxi Sydney General Transfer",
        paragraphs: [
          "Need reliable transport for everyday travel around Sydney? TipTop Maxi Sydney offers comfortable and affordable general transfer services across the city and surrounding suburbs. Whether you're heading to the airport, work, an event, or just need a safe ride home, our professional drivers are available 24/7 to get you there on time.",
          "Choose from our fleet of 1–11 seater maxi cabs, sedans, and wheelchair-accessible vehicles – perfect for individuals, families, and groups.",
          "Booking your Sydney General Transfer is simple, call our team or book online for instant confirmation. Travel comfortably with TipTop Maxi Sydney, your trusted choice for all general transport needs.",
        ],
      },
      {
        heading: "Taxi and Maxi Cab Services for General Transfers",
        paragraphs: [
          "TipTop Maxi Sydney provides convenient transport for all types of trips, from short rides across town to longer regional journeys. Our general transfer service is designed for comfort, flexibility, and reliability, ensuring every passenger enjoys a smooth experience. We offer:",
        ],
        bulletList: [
          "Pickups and drop-offs across Sydney and NSW",
          "Transfers between the airport, CBD, and suburbs",
          "Private, air-conditioned vehicles for any occasion",
          "Wheelchair-accessible and family-friendly options",
          "Affordable rates with no hidden charges",
          "24-hour availability for bookings and enquiries",
        ],
      },
    ],
  },
  {
    slug: "taxi-services/group-transfers-sydney",
    metaTitle: "Group Transfers Sydney | Maxi Taxi",
    metaDescription:
      "Convenient group transfer services in Sydney with spacious maxi taxis for family outings, airport travel, and event transportation.",
    h1: "Group Transfers Sydney",
    heroDescription:
      "Travel with ease using TipTop Maxi Sydney's group transfer service. Whether you're heading to the airport, attending an event, or planning a family outing, our fleet provides safe, reliable, and affordable transport for groups of any size. Choose from 7-seater or 11-seater maxi cabs, sedans, or wheelchair-accessible vehicles – all driven by professional Sydney drivers.",
    image: { src: "/images/group-transfers-Sydney-1.jpg", alt: "Group Transfers Sydney" },
    contentSections: [
      {
        heading: "Book 1-11 Seater Taxi/Maxi Sydney Group Transfer",
        paragraphs: [
          "TipTop Maxi Sydney makes group travel simple and affordable. Whether it's an airport run, cruise transfer, wedding, school trip, or a day out in Sydney, our professional drivers ensure your group arrives together, safely and on time. Choose from 7–11 seater maxi cabs, sedans, or wheelchair-accessible vehicles with car seats available on request.",
          "Booking your Sydney group transfer is quick and hassle-free – get a fare estimate online or call us directly.",
          "Relax and enjoy the ride – whether you're travelling with family, friends, or colleagues, our group transfer service provides a comfortable, reliable, and stress-free journey.",
        ],
        bulletList: [
          "Reliable interstate taxi services across NSW and beyond",
          "Transfers available from Sydney Airport, suburbs, or CBD",
          "Taxis with car seats for children",
          "Wheelchair-accessible maxi cabs",
          "Professional, licensed drivers who know the regional routes",
          "24/7 availability for long-distance travel",
        ],
      },
      {
        heading: "Taxi Cabs Services for Group Transfer",
        paragraphs: [
          "TipTop provides flexible options for groups large or small. Whether you need a maxi cab for 7, an 11-seater for bigger gatherings, or a wheelchair-friendly taxi, we have vehicles to match. Our team is experienced in managing group travel with efficient pick-up and drop-off services across Sydney, ensuring everyone arrives together and on time.",
        ],
      },
      {
        heading: "Book 1–11-Seater Maxi Cabs Sydney",
        paragraphs: [
          "With 24/7 availability and simple online booking, arranging group transfers has never been easier. Request child seats, extra luggage support, or wheelchair access when booking to make your trip even smoother.",
        ],
      },
    ],
    faq: [
      { question: "1. How many people can travel in a maxi taxi?", answer: "Up to 11 passengers can travel comfortably in one vehicle." },
      { question: "2. Are group airport transfers available?", answer: "Yes. We specialize in airport transportation for groups and families." },
      { question: "3. Can multiple pickup locations be arranged?", answer: "Yes. Multiple pickup points can be arranged upon request." },
      { question: "4. Do you provide transport for events?", answer: "Yes. We provide transport for weddings, concerts, sporting events, and corporate functions." },
      { question: "5. Is advance booking recommended?", answer: "Yes. Advance booking is strongly recommended for group transport." },
    ],
  },
  {
    slug: "taxi-services/interstate-taxi-transfer-sydney",
    metaTitle: "Interstate Taxi Transfer Sydney",
    metaDescription:
      "Comfortable interstate taxi transfer services from Sydney with spacious maxi taxis for long-distance travel, groups, and airport connections.",
    h1: "Interstate Taxi Transfer Sydney",
    heroDescription:
      "Travel beyond Sydney with TipTop Maxi Sydney's interstate taxi service. We provide safe, comfortable transfers to regional areas and long-distance destinations across NSW. Choose from 7–11 seater maxi cabs, sedans, or wheelchair-accessible vehicles for a reliable and stress-free journey.",
    image: { src: "/images/Sydney-General-Transfer.webp", alt: "Interstate Taxi Transfer Sydney" },
    contentSections: [
      {
        heading: "Book Sydney Airport to Regional Areas Maxi Cab & Interstate Taxi Transfer",
        paragraphs: [
          "TipTop Maxi Sydney makes interstate travel simple and affordable. From Sydney Airport, our professional drivers provide transfers to regional towns, suburbs, and major hubs across NSW. We prioritise your comfort with spacious vehicles, family-friendly options with baby seats, and 24/7 availability.",
          "Tiptop Transport Solutions – Sydney Airport Maxi Taxi Transfers (International & Domestic)",
        ],
      },
      {
        heading: "Premium Maxi Cabs • Baby Seats • Wheelchair Taxis • 24/7 Airport Transfers",
        paragraphs: [
          "Welcome to Tiptop Transport Solutions, your trusted partner for reliable, comfortable, and spacious Maxi Taxi transfers from Sydney Airport. We service both Sydney International Airport (T1) and Sydney Domestic Airport (T2/T3), offering door-to-door transport across all Sydney suburbs and long-distance destinations up to 300 km.",
          "Whether you're a family, group traveller, corporate client, or visitor, our large Maxi Cabs ensure a smooth, stress-free journey every time.",
          "Sydney Airport Transfers – International & Domestic Terminals",
          "Tiptop Transport Solutions specialises in:",
          "Our Maxi Taxis are ideal for families, groups, extra luggage, and special requirements such as baby seats or wheelchair accessibility.",
        ],
        bulletList: [
          "Sydney International Airport pickups (T1)",
          "Sydney Domestic Airport pickups (T2 & T3)",
          "Direct terminal-to-door transfers",
          "Flight monitoring for delays",
          "Priority pickup zones",
          "24/7 operations",
        ],
      },
      {
        heading: "Sydney Suburb Coverage",
        paragraphs: [
          "We provide door-to-door transfers from Sydney International and Domestic Airport to all major suburbs, including:",
          "Parramatta • Blacktown • Campbelltown • Castle Hill • Ryde • Bondi Beach • Sydney Olympic Park • Manly • Cronulla • Penrith • Liverpool • Chatswood • North Sydney …and all surrounding areas across Greater Sydney.",
          "If your destination isn't listed we still go there!",
          "Long-Distance & Regional Transfers from Sydney Airport (International & Domestic)",
          "Tiptop Transport Solutions provides premium long-distance travel from Sydney Airport (International and Domestic) to major regional cities and NSW destinations, including:",
          "Sydney Airport (International & Domestic) to Canberra (~247 km) — Direct transfer to any Canberra suburb — perfect for families, government travellers, students & corporate clients",
          "Sydney Airport (International & Domestic) to Wollongong (85–90 minutes)",
          "Sydney Airport (International & Domestic) to Kiama (130–145 km)",
          "Sydney Airport (International & Domestic) to Jervis Bay (200–210 km)",
          "Sydney Airport (International & Domestic) to Southern Highlands — Bowral, Mittagong",
          "Sydney Airport (International & Domestic) to Blue Mountains — Lithgow, Blackheath",
          "Sydney Airport (International & Domestic) to Newcastle (~160 km)",
          "Sydney Airport (International & Domestic) to Port Stephens (200–220 km)",
          "Booking your interstate taxi transfer is quick and hassle-free – get a fare estimate online or call us directly.",
        ],
        bulletList: [
          "Reliable interstate taxi services across NSW and beyond",
          "Transfers available from Sydney Airport, suburbs, or CBD",
          "Taxis with car seats for children",
          "Wheelchair-accessible maxi cabs",
          "Professional, licensed drivers who know the regional routes",
          "24/7 availability for long-distance travel",
        ],
      },
      {
        heading: "Interstate Taxi Service & Long-Distance Travel from Sydney Airport to Regional Areas",
        paragraphs: [
          "TipTop Maxi Sydney provides safe and reliable interstate taxi services from Sydney Airport, CBD, and suburbs to regional NSW. Our 7–11 seater maxi cabs, sedans, and wheelchair-accessible vehicles offer plenty of room for passengers and luggage. Custom transfers are available for families, business groups, and individuals needing stress-free long-distance travel. Book a wheelchair taxi in advance for Airport Transfers.",
        ],
      },
      {
        heading: "Our Maxi Taxi Fleet",
        paragraphs: ["Tiptop Maxi Cabs are designed for comfort and flexibility:"],
        bulletList: [
          "7, 9, and 11-seater Maxi Taxis",
          "Extra luggage space",
          "Air-conditioned, spacious interiors",
          "Baby seat & baby capsule options",
          "Wheelchair-accessible taxis available",
          "Large group travel support",
        ],
      },
      {
        paragraphs: ["Perfect for:"],
        bulletList: [
          "Families with young children",
          "Groups with luggage",
          "Airport to hotel transfers",
          "Interstate & regional journeys",
          "Corporate travel",
          "Cruise terminal drop-offs",
        ],
      },
      {
        heading: "Why Choose Tiptop Transport Solutions?",
        paragraphs: [
          "Tiptop provides fast, reliable, and comfortable transfers from Sydney International Airport and Sydney Domestic Airport to anywhere you need to go.",
        ],
        bulletList: [
          "🚕 24/7 service – always available",
          "🎯 Direct, door-to-door travel",
          "💺 Family-friendly vehicles",
          "🧒 Baby seats & capsules on request",
          "♿ Wheelchair-accessible taxi service",
          "💼 Fixed pricing — no hidden fees",
          "🧴 Clean & sanitized vehicles",
          "📱 Easy online, phone, or app-based booking",
          "✈️ Flight monitoring ensures on-time pickups",
          "🧳 Maxi Cabs built for luggage-heavy trips",
          "🔧 Vehicles regularly serviced for safety",
        ],
      },
      {
        heading: "Book 1–11-Seater Interstate Taxi Maxi Cabs Sydney",
        paragraphs: [
          "Interstate Taxi Service by TipTop Maxi Sydney offers long distance taxi services from Sydney Airport to regional areas.",
          "Whether you're travelling solo or with a large group, TipTop Maxi Sydney has the right vehicle for your interstate trip. From short regional transfers to longer journeys, our professional drivers and modern fleet ensure every ride is safe, comfortable, and reliable.",
        ],
      },
    ],
    faq: [
      { question: "1. Do you provide interstate taxi transfers?", answer: "Yes. We offer long-distance taxi services between Sydney and interstate destinations." },
      { question: "2. Can I travel directly without changing vehicles?", answer: "Yes. Direct door-to-door transport is available." },
      { question: "3. How is interstate taxi pricing calculated?", answer: "Pricing is based on distance, travel time, tolls, and vehicle requirements." },
      { question: "4. Can I book return interstate transfers?", answer: "Yes. Return journeys can be arranged." },
      { question: "5. Is luggage included?", answer: "Yes. Standard luggage is included, subject to vehicle capacity." },
    ],
  },
  {
    slug: "taxi-services/parcel-delivery-taxi-transfer",
    metaTitle: "Parcel Delivery Taxi Sydney",
    metaDescription:
      "Fast parcel delivery taxi service in Sydney for urgent documents, packages, and same-day deliveries with secure transportation.",
    h1: "Parcel Delivery Taxi Sydney",
    heroDescription:
      "Send or receive parcels across Sydney with our dedicated parcel delivery taxi service. From small packages to office furniture, our maxi cabs and vans provide safe, efficient, and timely delivery to the CBD and surrounding suburbs. Choose a flexible, same-day service with drivers experienced in handling both personal and business deliveries.",
    image: { src: "/images/parcel.jpg", alt: "Parcel Delivery Taxi Sydney" },
    contentSections: [
      {
        heading: "Book Taxi/Maxi Sydney Parcel Transfer",
        paragraphs: [
          "Need to send a package quickly and securely? TipTop Maxi Sydney offers reliable parcel delivery transfers across Sydney and surrounding suburbs. Whether you're delivering important documents, business parcels, or personal items, we ensure a fast, safe, and convenient service with professional drivers available 24/7.",
          "Our parcel transfer service is perfect for both one-off and regular deliveries. From homes to offices, or Sydney CBD to regional NSW, you can count on our experienced team to handle your parcels with care and punctuality.",
          "Booking your parcel transfer is quick and easy. Simply call our team or make an online reservation to arrange your pickup. Experience the reliability and professionalism that make TipTop Maxi Sydney a trusted name in Sydney transport.",
        ],
      },
      {
        heading: "Taxi and Maxi Cab Parcel Delivery Services",
        paragraphs: [
          "TipTop Maxi Sydney provides flexible and affordable parcel delivery options using our 1–11 seater maxi cabs and taxis. We accommodate everything from small packages to larger items, ensuring timely pickup and drop-off every time. Why choose our parcel delivery service:",
        ],
        bulletList: [
          "Door-to-door pickup and delivery across Sydney and NSW",
          "Safe transport for fragile or time-sensitive parcels",
          "Real-time coordination and reliable communication",
          "Transparent pricing with no hidden fees",
          "Online booking and 24/7 support",
        ],
      },
    ],
  },
  {
    slug: "taxi-services/race-day-transfers-sydney",
    metaTitle: "Race Day Transfers Sydney | Group Taxi",
    metaDescription:
      "Book race day transfer services in Sydney with maxi taxis for groups attending horse racing events, stadiums, and special occasions.",
    h1: "Race Day Transfers Sydney",
    heroDescription:
      "Head to and from Sydney's race day events in comfort with our maxi cab transfers. Our fleet includes 7–11 seater maxi cabs, sedans, and wheelchair-accessible taxis, perfect for groups and families. Enjoy reliable pickups, spacious vehicles, and options for child seats, ensuring you arrive at the track relaxed and ready for the day.",
    image: { src: "/images/Race-Day-Transfer-Sydney.jpg", alt: "Race Day Transfers Sydney" },
    contentSections: [
      {
        heading: "Book 1-11 Seater Taxi/Maxi Sydney Race Day Transfer",
        paragraphs: [
          "Heading to the races? TipTop Maxi Sydney offers reliable and comfortable race day transfers across Sydney. Whether you're travelling to Royal Randwick, Rosehill Gardens, Warwick Farm, or any other racecourse, our professional drivers ensure you arrive on time and in comfort.",
          "Choose from our fleet of 1–11 seater maxi cabs, all equipped for group or individual travel. With door-to-door pickups and 24/7 availability, we make your race day transport smooth, safe, and stress-free.",
          "Booking your Sydney Race Day Transfer is easy, call our team or make an online booking for instant confirmation.",
          "Arrive in style and comfort with Sydney's trusted transport provider, TipTop Maxi Sydney.",
        ],
      },
      {
        paragraphs: [
          "Enjoy a hassle-free race day experience with TipTop Maxi Sydney. Our maxi cabs and taxis are ideal for friends, families, or corporate groups travelling together. From early pickups to late returns, our drivers handle every detail so you can focus on the day ahead. We offer:",
        ],
        bulletList: [
          "Transfers to and from Sydney racecourses",
          "Group transport for up to 11 passengers",
          "Wheelchair-accessible vehicles on request",
          "Baby and booster seats for family-friendly trips",
          "Clean, air-conditioned, and modern vehicles",
          "Affordable rates with transparent pricing",
        ],
      },
    ],
    faq: [
      { question: "1. How many people can travel in a maxi taxi?", answer: "Up to 11 passengers can travel comfortably in one vehicle." },
      { question: "2. Are group airport transfers available?", answer: "Yes. We specialize in airport transportation for groups and families." },
      { question: "3. Can multiple pickup locations be arranged?", answer: "Yes. Multiple pickup points can be arranged upon request." },
      { question: "4. Do you provide transport for events?", answer: "Yes. We provide transport for weddings, concerts, sporting events, and corporate functions." },
      { question: "5. Is advance booking recommended?", answer: "Yes. Advance booking is strongly recommended for group transport." },
    ],
  },
  {
    slug: "taxi-services/sydney-airport-transfer",
    metaTitle: "Sydney Airport Transfer | Maxi Taxi",
    metaDescription:
      "Professional Sydney Airport transfer service with maxi taxis, fixed pricing, flight tracking, and 24/7 airport pickups across Sydney.",
    h1: "Sydney Airport Transfer Service",
    heroDescription:
      "Arriving in Sydney? TipTop Maxi Sydney provides reliable, comfortable, and affordable airport transfer services. Our fleet includes 7–11 seater maxi cabs, wheelchair-accessible vehicles, and family-friendly options with car seats for children. Travel stress-free to and from Sydney Airport with experienced drivers available 24/7.",
    image: { src: "/images/Sydney-Airport-Transfer.jpg", alt: "Sydney Airport Transfer Service" },
    contentSections: [
      {
        heading: "Sydney Airport Pickup Benefits includes:",
        paragraphs: [],
        bulletList: [
          "No Waiting Charges: Take your time without worrying about extra costs! Our drivers wait for free. Simply notify us 10–15 minutes before you're ready, and we'll send the driver to the pickup point promptly.",
          "Real-Time Flight Tracking: We monitor your flight so we're always on time, even if your schedule isn't.",
          "Free Rescheduling: Unexpected changes? Reschedule at no additional charge.",
          "Priority Pickup Zones: Skip the queues! Meet us at the dedicated rideshare area for quick and easy access.",
        ],
      },
      {
        heading: "Book a Maxi Cab for Your Transfer to and from Sydney Airport",
        paragraphs: [
          "Booking your transfer is quick and easy. Secure your ride online in just a few clicks or call us directly for a fare estimate. Our fleet can handle any travel group, from solo travellers to families or corporate teams. Whether you need an early-morning drop-off or a late-night pickup, TipTop Maxi Sydney is your trusted airport transfer partner.",
        ],
      },
      {
        heading: "Book 1-11 Seater Maxi Cabs for Sydney Airport Transfer",
        paragraphs: [
          "Whether you're heading to the International or Domestic terminals, our maxi cabs are perfect for individuals, families, and groups. Enjoy:",
        ],
        bulletList: [
          "Sydney Airport transfers (both International and Domestic)",
          "Airport Pickup Sydney and drop-off directly at the airport",
          "Taxis with car seats for children",
          "Private airport transfers Sydney",
          "Wheelchair-accessible maxi cabs",
          "24/7 customer service",
        ],
      },
      {
        paragraphs: [
          "Enjoy stress-free travel across Sydney, NSW, and beyond with our range of maxi cabs, sedans, and wheelchair-accessible taxis. Whether you're heading to Sydney Airport, the cruise terminal, a corporate event, or a special occasion, our professional local drivers ensure a safe, reliable, and on-time journey every time. Choose the Maxi Cab 7-Seater, Maxi Cab 11-Seater, or Sedan to suit your group size and travel needs.",
        ],
      },
      {
        heading: "Sydney Airport Transfer",
        paragraphs: [
          "Skip the stress of public transport or long rideshare queues. With TipTop Maxi Sydney, you get a guaranteed ride tailored to your group size and travel needs. Our team ensures on-time service, safe driving, and competitive fares across Sydney and NSW.",
        ],
      },
    ],
    faq: [
      { question: "1. How much does a taxi from Sydney Airport cost?", answer: "The fare depends on your destination, travel time, tolls, and vehicle type. Contact us for an upfront quote." },
      { question: "2. Do you monitor flight delays?", answer: "Yes. We monitor incoming flight schedules and adjust pickup times when flights are delayed." },
      { question: "3. Can I book an airport transfer in advance?", answer: "Yes. Advance bookings are recommended to ensure vehicle availability." },
      { question: "4. Do you provide airport pickups and drop-offs?", answer: "Yes. We provide both arrival pickups and departure transfers across Sydney." },
      { question: "5. Can a maxi taxi accommodate extra luggage?", answer: "Yes. Maxi taxis provide additional luggage space for families and groups." },
    ],
  },
  {
    slug: "taxi-services/wedding-transfers",
    metaTitle: "Wedding Transfers Sydney | Luxury Maxi Taxi",
    metaDescription:
      "Elegant wedding transfer services in Sydney with comfortable maxi taxis for bridal parties, guests, and special event transportation.",
    h1: "Wedding Transfers Sydney",
    heroDescription:
      "Elegant wedding transfer services in Sydney with comfortable maxi taxis for bridal parties, guests, and special event transportation.",
    image: { src: "/images/bet-Baby-Seat-taxi-Sydney-airport.png", alt: "Wedding Transfers Sydney" },
    contentSections: [
      {
        heading: "WEDDING TRANSFERS SYDNEY",
        paragraphs: [
          "Your wedding day is one of the most memorable moments of your life — and at TipTop Maxi, we ensure every ride is as special as the occasion itself. Our wedding transfer services in Sydney are designed to deliver comfort, reliability, and style for you and your guests. Whether it's transporting the bridal party, groomsmen, or family members, our spacious maxi vans provide elegant and seamless travel between venues, hotels, and reception locations.",
          "Our vehicles are cleaned and maintained to the highest standards, offering air-conditioned comfort and smooth rides for up to 11 passengers. Each trip is handled by our courteous and professional drivers who understand the importance of punctuality and discretion on your big day. We coordinate closely with your event schedule to ensure everyone arrives relaxed and on time.",
          "From early-morning pickups to late-night drop-offs, TipTop Maxi Vans takes care of every detail so you can focus on celebrating love without any transport worries. Whether it's a grand wedding, an intimate ceremony, or a pre-wedding function, we provide reliable, pre-booked wedding transfers across Sydney. Choose TipTop Maxi Vans — where your journey to \"happily ever after\" begins in comfort and class.",
        ],
      },
    ],
    faq: [
      { question: "How to book a Taxi for group in Sydney?", answer: "You can book our maxi cab, maxi van, or taxi easily online via our Booking Form or by calling us." },
      { question: "How many people can your Cabs accommodate?", answer: "We have upto 11 seater maxi cab in Sydney. If you are a group of more than 11 people, then you can book another Maxi Van, as we have plenty." },
      { question: "How to book a Maxi Van online?", answer: "There are multiple ways you can book a maxi van online in Sydney from Tip Top Maxi Sydney. You can either fill out the booking form on the top or email us your requirement, and soon our customer support team will reach out to you for verification." },
      { question: "How to book a Maxi Cab instantly?", answer: "Booking a maxi cab in Sydney is just a click away. Click on the Call Button to call and book a taxi Instantly." },
      { question: "Can I book a Taxi in advance?", answer: "Yes, You can book a Taxi in Sydney for Group, Airport or General Transfers either via Call, Email, WhatsApp or Booking Form." },
    ],
  },
  {
    slug: "taxi-services/western-sydney-airport-maxi-taxi",
    metaTitle: "Maxi Taxi Western Sydney Airport",
    metaDescription:
      "One fare, one driver, your whole crew to Western Sydney Airport. Fixed fares confirmed before you book, up to 11 passengers and all their luggage in one vehicle.",
    h1: "One Fare. One Driver. Your Whole Crew to Western Sydney Airport.",
    heroDescription:
      "You shouldn't need a calculator to work out what an airport transfer is going to cost. Tell us where you're headed, how many are travelling, and we'll give you one number before you book, for up to 11 people and all their luggage, in one vehicle.",
    image: { src: "/images/Sydney-Airport-Transfer.jpg", alt: "Maxi Taxi Western Sydney Airport" },
    contentSections: [
      {
        heading: "How Much Does a Maxi Taxi to Western Sydney Airport Actually Cost?",
        paragraphs: [
          "This is usually the first question people ask, and fair enough. Here's the honest answer: it depends on your pickup suburb, the time of day, and how many bags you're bringing, but it never depends on how busy the roads are or how badly you need to get there.",
          "Every fare is calculated and confirmed before your booking is locked in. There's no meter running in the back seat, no surprise \"peak period\" loading, and no separate luggage charge because your group packed for two weeks instead of two days.",
          "If you want an exact number, the fastest way is to call us or request a quote online with your pickup address and passenger count. You'll have a figure in minutes, not a guess.",
        ],
      },
    ],
    faq: [
      { question: "Can I get a fare quote before I commit to booking?", answer: "Yes. Call us or request a quote online with your pickup suburb and passenger count. You'll have a locked-in figure before you confirm anything." },
      { question: "Is Western Sydney Airport open for commercial flights yet?", answer: "Western Sydney Airport (Nancy-Bird Walton) is scheduled to begin operations, with airlines progressively announcing routes. We already run transfers throughout the surrounding growth corridors and to Sydney's existing terminals, and we'll be ready for WSI flights from day one." },
      { question: "How is a maxi taxi different from a shuttle bus?", answer: "A shuttle typically runs a shared route with multiple stops and other passengers. A maxi taxi is exclusive to your group, one vehicle, direct route, no detours to drop off strangers first." },
      { question: "Do you charge extra for pickups from Leppington, Oran Park, or other new growth suburbs?", answer: "No. Fares are based on distance and time like any transfer, there's no separate \"new suburb\" loading. Ask for a quote and we'll confirm the fare for your specific address." },
      { question: "Can I set up a recurring booking if I travel for work regularly?", answer: "Yes. Corporate and frequent-traveller accounts can be set up with fixed rates for regular routes and monthly invoicing." },
      { question: "What if my group is bigger than 11 people?", answer: "We'll book a second vehicle timed to arrive with the first, so your group still moves together and lands at the terminal at the same time, even split across two cars." },
      { question: "Do you charge more for early morning or late night pickups?", answer: "No. Our rate structure doesn't change based on the hour. A 4am pickup costs the same as a midday one for the same route and group size." },
      { question: "Can I pay a deposit or is full payment required upfront?", answer: "This depends on your booking type, call our team and they'll talk you through the payment options available for your specific trip." },
    ],
  },
  {
    slug: "premium-services/pet-taxi",
    metaTitle: "Pet Taxi Sydney | Safe Pet Transport Service",
    metaDescription:
      "Pet taxi and pet transport services across Sydney and NSW. Book by appointment with at least 1 day's notice for safe, comfortable animal transport.",
    h1: "Pet Taxi Sydney",
    heroDescription:
      "Pet taxi and pet transfer services available from Sydney. The pet taxi cabs operate by appointment only and require advance bookings, preferably with at least 1 day notice. More notice is required for peak holiday periods.",
    image: { src: "/images/dog_car-1.jpg", alt: "Pet taxi Sydney" },
    contentSections: [
      {
        heading: "Pet Taxi, Pet Transport and Animal Transport",
        paragraphs: [
          "Pet Taxi & Pet Transport, Book Maxi Cabs for Sydney Pet Transfer. TipTop Maxi Sydney provides taxi cabs for pet taxi services. As a Maxi/Taxi cab Services provider in Sydney, we bring pickup and drop-off services from and to Sydney, helping passengers travelling within Sydney or anywhere in NSW, Australia, with their pets.",
          "Our fleet of drivers provides Maxi/Taxi cab services in Sydney for pet taxi transfers, alongside taxi cabs with car seat and maxi cabs with wheelchair seat options. Whether it's a trip to the vet, a move across town, or a day out together, we ensure a safe and comfortable ride for you and your pet.",
          "Booking is quick and easy, simply call our team or make an online reservation to arrange your pickup with at least 1 day's notice where possible.",
        ],
      },
      {
        heading: "Pet Taxi & Pet Transport Sydney",
        paragraphs: [
          "TipTop Maxi Sydney provides flexible pet transport options using our maxi cabs and taxis, suitable for dogs, cats, and other domestic pets travelling with or without their owner.",
        ],
        bulletList: [
          "Dogs, cats, and other domestic pets welcome",
          "Owners can travel alongside their pet",
          "Pets secured in an approved carrier or restraint where possible",
          "Transfers to veterinary appointments available",
          "Book at least 1 day ahead by phone",
        ],
      },
    ],
    faq: [
      { question: "1. Can pets travel in your taxis?", answer: "Yes. We provide pet-friendly taxi services across Sydney." },
      { question: "2. What types of pets do you transport?", answer: "We transport dogs, cats, and other domestic pets." },
      { question: "3. Can I accompany my pet during travel?", answer: "Yes. Owners are welcome to travel with their pets." },
      { question: "4. Do pets need to be restrained?", answer: "For safety reasons, pets should be secured in an approved carrier or restraint when possible." },
      { question: "5. Can you transport pets to veterinary appointments?", answer: "Yes. We can transport pets to and from veterinary appointments." },
    ],
  },
  {
    slug: "premium-services/taxi-with-baby-seat",
    metaTitle: "Taxi With Baby Seat Sydney",
    metaDescription:
      "Sydney car seat transfer service with capsule, convertible, and booster seat options. Book 1–11 seater maxi cabs with child restraints across Sydney and NSW.",
    h1: "Taxi With Baby Seat Sydney",
    heroDescription:
      "Sydney Car Seat Transfer, Maxi Cabs from Sydney, Taxi Maxi Cabs with Car Seat, Car Seat Cabs to Suburbs, and Car Seat Taxi with Wheelchair Seat. Book our 1–11-seater maxi cabs with child restraints, available 24/7.",
    image: { src: "/images/car-seat-cabs-sydney.jpg", alt: "Taxi with baby seat Sydney" },
    contentSections: [
      {
        heading: "Book Taxi/Maxi Sydney Car Seat Transfer",
        paragraphs: [
          "Book Taxi/Maxi for Sydney Car Seat Transfers. TipTop Maxi Sydney provides taxi cabs for Sydney car seat services. As a Maxi/Taxicab Services provider in Sydney, we bring pickup and drop-off services from and to Sydney with car seat, helping passengers who travel within Sydney or anywhere in NSW, Australia.",
          "Our fleet of drivers provides Maxi/Taxicab services in Sydney with car seat and wheelchair seat options. We prioritize providing our customers with a hassle-free experience, ensuring a smooth ride to your destination, with world-class maxi cab group transfer services throughout Sydney and suburbs.",
          "Book Maxi Cab Sydney, Maxi/Taxi, or Taxi Sydney easily online via our booking form or by calling us directly. Choose from capsule seats, convertible seats, or booster seats depending on your child's age and requirements.",
        ],
      },
      {
        heading: "Taxi With Car Seat or Baby Seat Taxi Service",
        paragraphs: [
          "Book Maxi Cab Sydney, Maxi/Taxi, or Taxi Sydney easily online via our Booking Form or by calling us. TipTop Maxi Sydney offers 1-to-11-seater maxi cabs and taxis with car seat options across Sydney and NSW.",
        ],
        bulletList: [
          "Capsule, convertible, and booster seat options available",
          "Seats fitted to Australian child restraint standards",
          "1–11 seater maxi cabs for families and groups",
          "Online booking and 24/7 phone support",
          "Call to book a taxi with a baby seat",
        ],
      },
    ],
    faq: [
      { question: "1. Can I request a baby seat in a taxi?", answer: "Yes. Baby seats can be requested when booking your taxi." },
      { question: "2. What types of baby seats are available?", answer: "We offer age-appropriate baby seats, toddler seats, and booster seats depending on availability." },
      { question: "3. Is there an additional charge for baby seats?", answer: "Additional charges may apply depending on the booking requirements." },
      { question: "4. Do I need to bring my own child seat?", answer: "No. We can provide child restraints upon request." },
      { question: "5. Are your baby seats compliant with Australian standards?", answer: "Yes. Child restraints are selected to meet Australian safety requirements." },
    ],
  },
  {
    slug: "premium-services/wheelchair-accessible-taxi-sydney",
    metaTitle: "Wheelchair Taxi Sydney | Accessible Maxi",
    metaDescription:
      "Wheelchair Taxi Sydney by TipTop Maxi Sydney provides accessible airport transfers and wheelchair maxi vans across Sydney, 24/7.",
    h1: "Wheelchair Taxi Sydney",
    heroDescription:
      "Wheelchair Taxi Sydney by TipTop Maxi Sydney provides Sydney Airport Transfer, Maxi Cabs to Sydney CBD, Wheelchair Cabs to Suburbs, Wheelchair Taxi with Car Seat, and Wheelchair Maxi Vans Sydney wide, available 24/7.",
    image: { src: "/images/Wheelchair-Taxi-Sydney.webp", alt: "Wheelchair accessible maxi taxi Sydney" },
    contentSections: [
      {
        heading: "Book Wheelchair Taxi Sydney by TipTop Maxi Sydney Now!",
        paragraphs: [
          "TipTop Maxi Sydney is a reliable transportation service provider that offers an extensive range of services to customers in Sydney. We specialize in making transportation easy and convenient for everyone, regardless of their unique needs. Whether you're travelling to the airport, a business meeting, or simply exploring the city, we have got you covered.",
          "We offer airport transfers to and from Sydney Airport, ensuring that you get to your destination on time and without any hassle. Our maxi cabs to Sydney CBD and suburbs are an ideal option for those who want to enjoy the city's scenic beauty while travelling comfortably.",
          "For those who require specialized assistance, we provide wheelchair accessible taxis and cabs with car seats. Our fleet of wheelchair maxi vans is equipped with state-of-the-art technologies that ensure safe and comfortable travel for all passengers. Our drivers are highly trained and experienced in handling passengers with disabilities, providing them with the utmost care and attention.",
        ],
      },
      {
        heading: "Wheelchair Taxi Sydney — Accessible Transport, Sydney Wide 24/7",
        paragraphs: [
          "Getting from one place to another requires reliable transportation. Whether it's work, school, medical appointments, or errands, having a reliable transport system is essential. However, for people with disabilities, finding transportation that meets their needs can be challenging.",
          "TipTop Maxi Sydney offers a 24×7 door-to-door wheelchair-accessible transport service that can be booked immediately or in advance. Transport is available to eligible NDIS participants; however, TipTop Transport Solutions is not an NDIS registered provider and does not process NDIS-funded invoicing or NDIS cards. Please pay using one of our accepted payment methods (cash, credit or debit card, bank transfer, corporate account, or secure online payment) and confirm your arrangement when booking.",
        ],
      },
    ],
    faq: [
      { question: "1. Do you provide wheelchair-accessible taxis in Sydney?", answer: "Yes. We operate wheelchair-accessible vehicles designed for safe and comfortable transportation." },
      { question: "2. Can passengers remain seated in their wheelchair?", answer: "Yes. Approved wheelchairs can be safely secured within the vehicle." },
      { question: "3. Are your drivers trained to assist wheelchair passengers?", answer: "Yes. Drivers are experienced in assisting passengers with mobility requirements." },
      { question: "4. Can wheelchair taxis be booked in advance?", answer: "Yes. Advance bookings help ensure vehicle availability." },
      { question: "5. Do you provide wheelchair airport transfers?", answer: "Yes. We offer wheelchair-accessible airport transportation throughout Sydney." },
    ],
  },
  {
    slug: "western-sydney-airport-transfers",
    metaTitle: "Western Sydney Airport Transfers",
    metaDescription:
      "Fixed-price transfers to and from Western Sydney International Airport (Badgerys Creek). Flight monitoring, meet & greet, wheelchair and baby seat options, available 24/7.",
    eyebrow: "WESTERN SYDNEY AIRPORT TRANSFERS",
    h1: "Your Transfer to Western Sydney Airport, Sorted.",
    heroDescription:
      "Fixed-price airport transfers, seven days a week. We track your flight, meet you at arrivals, and get you where you need to go, no fuss, no surprises on price.",
    // JUDGMENT CALL: no bgImage/hero image anywhere in this page's source - falling back
    // to a generic maxi cab image already used elsewhere on the site. Replace if a
    // dedicated Western Sydney Airport hero image exists.
    image: { src: "/images/Maxi-Cab-service-1.png", alt: "Western Sydney Airport transfers" },
    contentSections: [
      {
        heading: "What Makes Us Different",
        paragraphs: ["We've been moving Sydney families, business travellers, and groups for years, and we think that experience shows."],
        bulletList: [
          "Real-Time Flight Monitoring: Your driver watches your flight status live. If it's delayed, we adjust automatically, so you're never left waiting, and neither are we.",
          "Fixed, Transparent Pricing: The price you're quoted is the price you pay. No surge rates during peak travel, no hidden fees, no meter running while you're stuck in traffic.",
          "24/7 Availability: Early departures, late arrivals, overnight trips — we operate around the clock, seven days a week, including public holidays and Christmas.",
          "Meet & Greet at Arrivals: Your driver meets you inside the terminal with a name board and helps with bags. Ideal after a long-haul flight when you just want to get moving.",
          "Spacious Fleet for Every Group: From a solo business traveller to a family of ten with mountains of luggage, we have a vehicle that fits your party comfortably, every time.",
          "NDIS & Disability Support: Our wheelchair-accessible vehicles and trained drivers ensure every passenger, regardless of mobility needs, can travel with full dignity.",
        ],
      },
      {
        heading: "Western Sydney International Airport — What You Need to Know",
        paragraphs: [
          "Western Sydney International Airport, officially named Nancy-Bird Walton Airport, is located in Badgerys Creek, about 55 kilometres west of Sydney CBD. It's Australia's first greenfield international airport in more than 50 years, purpose-built for 24-hour operations from day one.",
          "For residents and businesses across Western Sydney, it changes the game entirely. No more fighting the congestion around Mascot. Once fully operational, it serves domestic routes as well as international connections across Asia, the Pacific, and beyond.",
        ],
        bulletList: [
          "Located in Badgerys Creek, suburb of Luddenham, Western Sydney",
          "Approx. 35–55 min drive from Parramatta, Liverpool, Penrith & Campbelltown",
          "24-hour airport with no noise curfew, unlike Kingsford Smith",
          "Purpose-built for growth, projected 10M+ passengers per year at capacity",
          "Pre-booking strongly recommended, pick-up zones are strictly enforced",
        ],
      },
      {
        heading: "Arriving at Western Sydney Airport?",
        paragraphs: ["Long-haul travel is tiring enough before you have to worry about transport. Our pickup service takes that stress completely off your plate, from the moment your wheels hit the tarmac."],
        bulletList: [
          "Live Flight Monitoring: We track your flight number in real time. Whether you land early or touch down late, your driver adjusts automatically. You don't need to call us, we're already across it.",
          "Meet & Greet at Arrivals: Your driver waits inside the arrivals terminal with a name board. No circling the pick-up zone, no awkward phone calls, just walk out and you're done.",
          "Luggage Assistance: Our drivers help load every bag at no extra charge. Especially helpful for families travelling with prams, elderly passengers, or anyone with heavy luggage.",
          "Real-Time Driver Tracking: Know exactly where your driver is before you land. Share the tracking link with family or colleagues so everyone stays in the loop without a single phone call.",
        ],
      },
      {
        heading: "Heading to Western Sydney Airport?",
        paragraphs: ["Forget expensive long-term parking and the stress of navigating unfamiliar airport roads. We pick you up from your door and have you at the terminal with time to spare."],
        bulletList: [
          "Early Morning Departures: We run 24 hours a day, so 4am pickups are no problem at all. Your driver will be there awake, on time, and ready to load the bags without complaint.",
          "Family Travel: Car seats, booster seats, prams, and three weeks' worth of luggage, we've got you covered. Our maxi taxis seat families of all sizes in genuine comfort.",
          "Business Travel: A quiet, professional ride so you can prepare for your flight in peace. Drivers know when to keep conversation light or skip it entirely.",
          "Group Travel: Sports teams, conference groups, holiday parties, we co-ordinate multi-vehicle bookings to get everyone to the terminal together and on time.",
        ],
      },
      {
        heading: "Built for Every Kind of Traveller",
        paragraphs: ["Choose the service that best matches your travel needs across Western Sydney Airport."],
        bulletList: [
          "Families: Safe airport transfers with baby seats, extra luggage space, and family-friendly vehicles.",
          "Corporate Travellers: Reliable, fixed-price transport for business travellers and executive airport transfers.",
          "Tourists & Visitors: Convenient transfers between Western Sydney Airport, hotels, attractions, and Sydney destinations.",
          "NDIS Participants: Wheelchair-accessible vehicles and supportive transport services for passengers with mobility needs.",
          "Group Travellers: Maxi taxis and minibuses for families, events, conferences, and larger groups travelling together.",
          "Cruise Passengers: Seamless transfers between Sydney cruise terminals, Western Sydney Airport, and surrounding regions.",
        ],
      },
      {
        heading: "Five Steps to a Stress-Free Transfer",
        paragraphs: ["From booking to destination, here's exactly what to expect when you travel with TipTop Maxi Sydney."],
        bulletList: [
          "Book Online or Call: Use our booking portal or call us. Provide your flight number and we handle everything from there.",
          "Get Instant Confirmation: You'll receive a booking confirmation via SMS and email with your driver's name, vehicle, and contact details.",
          "We Track Your Flight: Our dispatch team monitors your flight live. Delays or early arrivals are handled automatically, no need to call us.",
          "Meet Your Driver: Your driver greets you in arrivals with a name board, assists with luggage, and has the vehicle ready to go.",
          "Arrive in Comfort: Sit back and enjoy a smooth, direct ride to your destination, fixed price, no detours, no drama whatsoever.",
        ],
      },
    ],
    faq: [
      { question: "How do I book a Western Sydney Airport transfer?", answer: "Book online or call us. You'll need your pickup address, destination, travel date, time, and flight number. The whole process takes under five minutes and you'll receive instant confirmation via SMS and email." },
      { question: "Do you offer fixed pricing for Western Sydney Airport transfers?", answer: "Yes. Every Western Sydney Airport transfer is fixed price. The quote you receive at booking is exactly what you pay. No surge pricing during peak travel times, no hidden fees, and no unpleasant surprises when you arrive." },
      { question: "Do you monitor flights for delays and early arrivals?", answer: "Absolutely. Our dispatch team tracks your flight in real time using the flight number you provide at booking. If your flight is delayed, your driver's arrival is automatically adjusted." },
      { question: "Where exactly is Western Sydney International Airport located?", answer: "Western Sydney International Airport (Nancy-Bird Walton Airport) is in Badgerys Creek, in the suburb of Luddenham. It's approximately 55km west of Sydney CBD, about 30 min from Parramatta, 25 min from Liverpool, 35 min from Penrith, and 35 min from Campbelltown." },
      { question: "Do you provide wheelchair accessible taxis to Western Sydney Airport?", answer: "Yes. We operate Wheelchair Accessible Vehicles (WAVs) fitted with hydraulic ramps and trained drivers experienced with passengers who have mobility needs. We're not an NDIS registered provider and don't process NDIS-funded invoicing, NDIS cards or Cabcharge, but NDIS participants are welcome to book and pay using any of our standard accepted payment methods." },
      { question: "Do you have baby seats and child restraints available?", answer: "Yes. Our Baby Seat Taxis carry certified infant seats, toddler seats, and booster seats. Please specify your child's age and approximate weight when booking so we can fit the correct restraint." },
      { question: "What size vehicles are available?", answer: "Our maxi taxis carry up to 11 passengers plus luggage, ideal for large families, groups, and teams. Maxi SUVs seat up to 7 passengers. If your group is larger than 11, we can co-ordinate multiple vehicles." },
      { question: "How far in advance should I book my airport transfer?", answer: "We recommend booking at least 24 hours in advance to guarantee your preferred vehicle. For very early flights, wheelchair accessible vehicles, or multi-vehicle group bookings, 48–72 hours ahead is advisable." },
      { question: "What payment methods do you accept?", answer: "We accept cash, credit and debit cards, bank transfer, and secure online payments. Corporate account billing can be arranged for regular business travellers. We do not accept Cabcharge or NDIS cards." },
      { question: "Do you operate 24 hours a day, including public holidays?", answer: "Yes. 24 hours a day, 7 days a week, 365 days a year, including Christmas Day, New Year's Day, Easter Sunday, and all NSW public holidays. We do not apply public holiday surcharges beyond our standard fixed pricing." },
    ],
  },
  {
    slug: "western-sydney-airport-transfers/western-sydney-airport-baby-seat-taxi",
    metaTitle: "Western Sydney Airport Baby Seat Taxi",
    metaDescription:
      "Baby capsules, toddler seats and boosters fitted before you arrive. Tell us your child's age when you book the right seat will already be fitted when we pull up.",
    eyebrow: "WESTERN SYDNEY AIRPORT BABY SEAT TAXI",
    h1: "One less thing to pack, carry or wrestle with after a flight.",
    heroDescription:
      "You've already got a nappy bag, a pram and a toddler who's decided the terminal floor looks interesting. The last thing you need is to be clipping in a capsule you lugged through customs. Tell us your child's age when you book and the right seat will already be fitted when we pull up.",
    // JUDGMENT CALL: no bgImage in this LandingHero call - reused a topically matching
    // baby-seat image already referenced elsewhere on the site.
    image: { src: "/images/baby-seat-taxi-sydney-1.jpg", alt: "Western Sydney Airport baby seat taxi" },
    contentSections: [
      {
        heading: "The seat that's right for your six-month-old is the wrong one entirely for your five-year-old.",
        paragraphs: [
          "NSW road rules are specific about this for good reason: a rear-facing capsule for infants, a forward-facing harnessed seat once they're steadier, then a booster as they grow into adult belts properly. Getting it wrong isn't just a paperwork issue, it's the difference between a restraint that actually does its job and one that doesn't.",
          "We'd rather ask two quick questions when you book, your child's age and roughly their size, than turn up with whatever seat happened to be in the boot. If you're travelling with your own seat and just need the car, that's fine too, just mention it.",
        ],
      },
      {
        heading: "An early flight with young kids is stressful enough without also being the one installing a car seat at 4am.",
        paragraphs: [],
        bulletList: [
          "Pickup from home, whatever time the flight actually leaves",
          "The price you're quoted doesn't move once everyone's buckled in",
          "Extra minutes built in for loading kids, not just bags",
          "The seat's fitted and checked before we knock on your door",
          "More than one child, one booking, seats matched to each",
          "Mention your return flight and we'll pencil that leg in too",
        ],
      },
      {
        heading: "Arriving with a tired baby and a pile of luggage? The seat's the one thing already sorted.",
        paragraphs: [],
        bulletList: [
          "We watch the flight, not the clock: Your driver's timing is set against your actual flight number, so a slow bag carousel doesn't leave you standing outside with a fussy toddler.",
          "Terminal pickup point: Driver waits at the designated pickup zone, seat already fitted.",
          "Hands free for the rest of it: Bags loaded while you settle the kids in, not the other way around.",
        ],
      },
      {
        heading: "We're not the only baby seat taxi in Sydney. Here's what we think actually sets this one apart.",
        paragraphs: [],
        bulletList: [
          "We ask your child's age before we ask your name",
          "Multiple kids, multiple seat types, handled in one booking",
          "Extra minutes are built in for loading kids, not rushed",
          "3am and 4am family flights are handled the same as midday ones",
          "The seat that turns up is the one that's actually right for them",
          "Your price doesn't change because your flight did",
          "A person answers the phone when you call to change something",
          "You can bring your own seat instead, no issue either way",
        ],
      },
      {
        heading: "Not a hypothetical persona list, these are the bookings that actually come through.",
        paragraphs: [],
        bulletList: [
          "A newborn's first flight: Nervous parents, a capsule that needs to be exactly right, and a driver who isn't in a rush while everyone gets settled.",
          "Grandparents flying in to meet the baby: Booked by the new parents, picked up solo, with a capsule ready even though they didn't have to think about it.",
          "A family of five coming home from holiday: Three kids, three different seat types, one pram, and a flight that landed later than planned.",
          "Interstate or overseas visitors with young kids: No car seat of their own to bring, and no interest in buying one for a week-long trip.",
          "A family flying home after a hospital stay: A newborn, sometimes still quite small, and parents who'd rather not be figuring out a capsule for the first time that day.",
          "A family reunion or wedding weekend: Multiple children across different ages arriving together, each needing a different seat, sorted in one booking.",
        ],
      },
    ],
    faq: [
      { question: "Do I need to bring my own baby seat?", answer: "No. Tell us your child's age and roughly their size when you book, and we'll have the right capsule, seat or booster fitted before we arrive. If you'd rather use your own seat, that's fine too, just let us know." },
      { question: "How do you know which seat my child actually needs?", answer: "Age is the starting point, roughly a rear-facing capsule under six months, a forward-facing harnessed seat from six months to around four years, then a booster from about four to seven. Size matters too." },
      { question: "Is the seat actually fitted properly, or just placed in the car?", answer: "Fitted properly. Our drivers install capsules, seats and boosters correctly before your child gets in, it's not adjusted on the go once you're already moving." },
      { question: "I've got three kids of different ages, can you handle that in one booking?", answer: "Yes. Tell us each child's age when you book and we'll bring a vehicle fitted with the right seat for every one of them." },
      { question: "Will the price change once I'm in the car?", answer: "No. The fare you're quoted, including the airport access fee, is the fare you pay. No meter, no surge pricing, no surprises at drop-off." },
      { question: "How much notice do you actually need?", answer: "A few hours' notice lets us confirm we've got the right seat size on hand. Shorter notice is worth a call anyway, we'll do what we can." },
      { question: "What if our flight lands early or gets delayed?", answer: "Your flight number is linked to the booking, so your driver's arrival shifts with it automatically. No need to call us." },
      { question: "Do you run family flights that leave really early or really late?", answer: "Yes. Western Sydney Airport doesn't operate under a curfew, so 4am and midnight family flights are part of the normal schedule out there, and part of ours too." },
    ],
  },
  {
    slug: "western-sydney-airport-transfers/western-sydney-airport-maxi-taxi",
    metaTitle: "Western Sydney Airport Maxi Taxi",
    metaDescription:
      "Up to 11 passengers, mountains of luggage, 24/7 availability. The smartest way to move a group to or from Western Sydney Airport at a fixed price, every time.",
    eyebrow: "WESTERN SYDNEY AIRPORT MAXI TAXI",
    h1: "The Maxi Taxi That Fits Your Whole Group & All Their Bags.",
    heroDescription:
      "Up to 11 passengers, mountains of luggage, 24/7 availability. TipTop Maxi Sydney's airport maxi taxi service is the smartest way to move a group to or from Western Sydney Airport, at a fixed price, every time.",
    // JUDGMENT CALL: no bgImage in this LandingHero call - reused the generic maxi cab image.
    image: { src: "/images/Maxi-Cab-service-1.png", alt: "Western Sydney Airport maxi taxi" },
    contentSections: [
      {
        heading: "What Exactly Is a Maxi Taxi and Why Choose One for the Airport?",
        paragraphs: [
          "A maxi taxi is a large, people-mover style vehicle, typically a Toyota HiAce or similar, that seats between 7 and 11 passengers comfortably with full luggage. It's the vehicle you book when a standard taxi or rideshare just doesn't cut it.",
          "For Western Sydney Airport runs, a maxi taxi makes more sense than booking multiple cars. Everyone travels together, one driver handles the co-ordination, and you pay a single fixed fare, simpler, cheaper per head, and far less stressful, especially with kids, elderly passengers, or piles of suitcases.",
        ],
      },
      {
        heading: "A Maxi Taxi Built for Every Kind of Group",
        paragraphs: ["Our Western Sydney Airport maxi taxi service is designed around the groups that actually travel, not just the easy ones."],
        bulletList: [
          "Families: One vehicle for the whole family, including the pram, car seats, and four overpacked suitcases.",
          "Corporate Groups: One vehicle, one invoice, everyone arrives together. Simpler for the team, simpler for accounts.",
          "Sports Teams: Travelling with gear, bags, and a squad? We've moved sporting groups across Sydney for years.",
          "Tourists & Tour Groups: Arriving in Sydney for the first time? We'll have someone waiting at arrivals with your name.",
          "NDIS & Accessibility Needs: We operate Wheelchair Accessible Vehicles and support passengers with all mobility requirements.",
          "Cruise Passengers: Connecting from a cruise terminal to Western Sydney Airport? We link both.",
        ],
      },
      {
        heading: "Arriving at Western Sydney Airport?",
        paragraphs: ["Long-haul travel is exhausting enough. Our maxi taxi pickup service takes that off your plate entirely."],
        bulletList: [
          "Live Flight Tracking: We watch your flight number in real time. Land early or touch down late, your driver adjusts without you needing to call us.",
          "Meet & Greet at Arrivals: Your driver waits inside the terminal with a name board. No searching the pickup zone, no phone tag, walk out and go.",
          "Full Luggage Assistance: Bags loaded, doors opened, no extra charge. Especially helpful after long international flights when energy is low.",
          "Real-Time Driver Tracking: See where your driver is before you clear customs. Share the tracking link so nobody in the group is left guessing.",
        ],
      },
      {
        heading: "Heading to Western Sydney Airport?",
        paragraphs: ["Skip the expensive long-term car park and the stress of navigating an unfamiliar terminal."],
        bulletList: [
          "Early Morning Pickups: 4am departure? No problem. We run 24 hours, so your driver will be there, on time, and ready to load bags.",
          "Door-to-Terminal Service: We pick you up from your home, hotel, or office and drop you at the correct terminal entrance. No transfers, no drama.",
          "Fixed Price, No Surprises: Quote locked in at booking. No metered fare, no surge pricing on busy travel days, no awkward conversation at drop-off.",
          "Return Transfer Option: Book your outbound drop-off and your arrival pickup in one go. We co-ordinate both around your flight schedule.",
        ],
      },
      {
        heading: "Five Steps to a Stress-Free Maxi Taxi Transfer",
        paragraphs: ["Simple process, zero surprises, from the moment you book to the moment you arrive."],
        bulletList: [
          "Book Online or Call: Takes less than five minutes.",
          "Instant Confirmation: SMS and email with your fare, driver details, and vehicle info, sent immediately after booking.",
          "We Track Your Flight: Our team monitors your flight live. Any delay is handled automatically, no need to call.",
          "Driver Meets You: Name board at arrivals, bags loaded, group seated, your driver does the heavy lifting.",
          "Arrive Together: Fixed price, direct route, no detours. Your whole group arrives in comfort.",
        ],
      },
      {
        heading: "Six Reasons Sydney Groups Keep Choosing Us",
        paragraphs: [],
        bulletList: [
          "One Fixed Fare. Always.: No metered surprises, no surge pricing at 6am, no hidden airport levies. The quote you get is the price you pay, full stop.",
          "Live Flight Monitoring: Your driver's schedule moves with your flight. Land two hours late and your driver will still be there, no rebooking, no stress.",
          "Meet & Greet Included: Every airport pickup includes a name board inside arrivals. Not an optional extra, it's part of the standard service.",
          "24/7 Including Public Holidays: Christmas Day, Easter, New Year's Eve, we operate around the clock, 365 days a year, at the same fixed price.",
          "Accessible & Inclusive: NDIS participants, wheelchair users, and passengers with mobility needs are always welcome. Advance booking ensures the right vehicle.",
          "A Real Person Answers: When you call, a real person picks up. No chatbots, no overseas call centres, no holding for 40 minutes.",
        ],
      },
    ],
    faq: [
      { question: "How many passengers does a maxi taxi hold for Western Sydney Airport transfers?", answer: "Our maxi taxis comfortably seat up to 11 passengers with full luggage. Ideal for large families, corporate teams, sports groups, and tour parties. If your group exceeds 11, we co-ordinate multiple vehicles, just mention it when you book." },
      { question: "How much does a maxi taxi to Western Sydney Airport cost?", answer: "All fares are fixed and quoted upfront before you confirm your booking. No metered rates, no surge pricing, no hidden airport levies." },
      { question: "Do you offer maxi taxi service to Western Sydney Airport 24 hours a day?", answer: "Yes. 24 hours a day, 7 days a week, 365 days a year, including early morning pickups from 3–4am and all NSW public holidays." },
      { question: "Do you track my flight if it's delayed?", answer: "Yes. Once you provide your flight number at booking, our dispatch team monitors it live and adjusts your driver's schedule automatically." },
      { question: "Is meet and greet included in the maxi taxi pickup price?", answer: "Yes. Included in every pickup booking at no extra charge. Your driver meets you inside the arrivals terminal with a name board." },
      { question: "Can I book a maxi taxi with a baby seat or booster seat?", answer: "Yes. We can arrange infant seats, toddler seats, and booster seats. Include your children's ages and weight at booking." },
      { question: "Do you accept NDIS funding for maxi taxi airport transfers?", answer: "We're not an NDIS registered provider and don't process NDIS-funded invoicing or NDIS cards. NDIS participants are welcome to book and can travel in our Wheelchair Accessible Vehicles (WAVs), paying via any of our standard accepted payment methods." },
      { question: "How far ahead should I book a maxi taxi to Western Sydney Airport?", answer: "For most bookings, 24 hours ahead is fine. For early morning departures, WAV bookings, or multi-vehicle groups, 48–72 hours notice is recommended." },
      { question: "Which suburbs do you cover for Western Sydney Airport transfers?", answer: "We service all major Western Sydney suburbs including Parramatta, Blacktown, Liverpool, Penrith, Campbelltown, Bankstown, Castle Hill, Sydney CBD, Inner West, and North Shore." },
      { question: "Can I book both the drop-off and the return pickup together?", answer: "Absolutely. You can book your outbound drop-off and return pickup in a single booking, co-ordinated around your full flight schedule." },
    ],
  },
  {
    slug: "western-sydney-airport-transfers/western-sydney-airport-suv-transfers",
    metaTitle: "Western Sydney Airport SUV Transfers",
    metaDescription:
      "A proper SUV for Western Sydney Airport, fixed price, door to door. Room for up to seven with real luggage space, meet & greet and flight monitoring included.",
    eyebrow: "WESTERN SYDNEY AIRPORT SUV TRANSFERS",
    h1: "A proper SUV for Western Sydney Airport, fixed price, door to door.",
    heroDescription:
      "Room for up to seven with real luggage space, not a sedan with the seats folded down. Whether it's a family with a pram and three suitcases or a couple with golf clubs and a week's worth of bags, our SUVs are sized for it, and the fare is agreed before you land.",
    // JUDGMENT CALL: no bgImage in this LandingHero call - reused the site's SUV image.
    image: { src: "/images/TipTop-Platinum.png", alt: "Western Sydney Airport SUV transfer" },
    contentSections: [
      {
        heading: "Not quite a family, not quite a group, the SUV is built for that gap in between.",
        paragraphs: [
          "A sedan runs out of boot space the moment you add a third suitcase. A full maxi taxi is more vehicle than two or three people travelling together actually need. The SUV sits in between: high ride height, a proper boot, and second-row space that fits a pram, a set of golf clubs or extra hand luggage without anyone sitting with a bag on their lap.",
          "It's the vehicle we get asked for most by small families flying into Western Sydney Airport with young kids, couples travelling with more gear than a weekend bag, and business travellers who'd rather not fold themselves into the back of a sedan after a long-haul flight.",
        ],
      },
      {
        heading: "What separates our SUV transfer from the alternatives.",
        paragraphs: [],
        bulletList: [
          "One fixed price, agreed before you travel",
          "Meet & greet included, no extra charge",
          "Genuine boot and second-row luggage space",
          "15+ years of experience across Sydney",
          "Flight monitoring on every single booking",
          "24/7, including 3am and 4am airport runs",
          "Real people answer the phone, not a chatbot",
          "NSW licensed and fully insured drivers",
        ],
      },
      {
        heading: "Arriving at Western Sydney Airport with more than a carry-on?",
        paragraphs: [],
        bulletList: [
          "Live flight monitoring: We track your flight number in real time, so early landings and delays are handled without you calling us.",
          "Priority terminal pickup: Your SUV pulls up at the designated pickup zone, no queuing behind rideshare or rank taxis.",
          "Full luggage assistance: Bags loaded, doors opened. With an SUV, oversized items aren't an afterthought.",
        ],
      },
      {
        heading: "Departing from Sydney to Western Sydney Airport?",
        paragraphs: [],
        bulletList: [
          "Pickup from any home, hotel or office address",
          "Available for 3am and 4am early departures",
          "Book your return airport pickup in the same call",
          "Fixed fare agreed before you travel",
          "Room for extra luggage without a second trip",
          "Driver tracks your outbound flight for the return leg",
        ],
      },
    ],
    faq: [
      { question: "How many people and bags fit in your SUV?", answer: "Our SUVs seat up to 5 passengers comfortably, or up to 7 in the larger option, with genuine boot and second-row luggage space, typically 4–7 large bags depending on the vehicle. Tell us your passenger and bag count when booking and we'll confirm the right fit." },
      { question: "Is an SUV better than a sedan for Western Sydney Airport?", answer: "For one or two passengers with a couple of carry-ons, a sedan is fine. Once you add a third passenger, golf clubs, a pram, or extra suitcases, an SUV gives you the boot space and ride height a sedan doesn't have." },
      { question: "Do you offer a fixed price for the SUV transfer?", answer: "Yes. Every SUV transfer is quoted as a fixed fare before you book, including the airport access fee. No meter, no surge multiplier, no add-ons at drop-off." },
      { question: "Can the SUV fit a pram or golf clubs?", answer: "Generally yes. SUVs handle prams, golf bags and oversized luggage far better than a sedan. Mention any oversized items when you book so we send the right vehicle." },
      { question: "Do you monitor flights for SUV airport pickups?", answer: "Yes. We track your flight number and adjust your driver's arrival automatically if you land early or are delayed." },
      { question: "Is meet and greet included?", answer: "Yes, at no extra charge. Your driver waits at arrivals with a name board and helps load your luggage." },
      { question: "Can I book a return SUV transfer to Western Sydney Airport?", answer: "Yes, book both legs in one call or booking and we'll coordinate your return pickup around your outbound flight details." },
      { question: "Do you run SUV transfers early morning or late at night?", answer: "Yes, 24 hours a day, seven days a week. Western Sydney Airport is a curfew-free facility, so early departures and late arrivals are routine for us." },
    ],
  },
  {
    slug: "western-sydney-airport-transfers/western-sydney-airport-taxi",
    metaTitle: "Western Sydney Airport Taxi Transfers",
    metaDescription:
      "Fixed fares, real drivers who know the M12 and Elizabeth Drive back roads, and vehicles big enough for the whole crew, from a single sedan to an 11-seat maxi taxi.",
    eyebrow: "WESTERN SYDNEY AIRPORT TRANSFERS",
    h1: "A taxi to Western Sydney Airport that turns up when it says it will.",
    heroDescription:
      "Fixed fares, real drivers who know the M12 and Elizabeth Drive back roads, and vehicles big enough for the whole crew, from a single sedan to an 11-seat maxi taxi with room for the luggage everyone forgot they packed.",
    // JUDGMENT CALL: no bgImage in this LandingHero call - reused the taxi-services hub image.
    image: { src: "/images/hub-Sydney-Airport-Transfer.png", alt: "Western Sydney Airport taxi transfers" },
    contentSections: [
      {
        heading: "Western Sydney Airport is new. Getting there shouldn't feel like guesswork.",
        paragraphs: [
          "Western Sydney International (Nancy-Bird Walton) Airport is being built at Bradfield, in the Badgerys Creek precinct, and is set to take its first commercial flights in late 2026. We've already been driving the M12, the upgraded Elizabeth Drive and the local back roads around Luddenham and Bringelly for our regular Western Sydney customers, so when the terminal opens, we're not learning the route, we're just adding a destination.",
        ],
      },
      {
        heading: "The unglamorous details that actually make a transfer good.",
        paragraphs: [],
        bulletList: [
          "Fixed pricing — no surge charges",
          "24/7 availability, every day of the year",
          "Western Sydney Airport specialists from day one",
          "Professional, licensed drivers",
          "Family-friendly service with baby seats available",
          "Wheelchair accessible vehicles",
          "Modern fleet, 1–11 passengers",
          "Local knowledge of Western Sydney back roads",
          "Transparent pricing, confirmed before you travel",
          "15+ years of experience across Sydney",
        ],
      },
      {
        heading: "What's included",
        paragraphs: [],
        bulletList: [
          "Flight monitoring included, adjusted for delays or early arrivals",
          "Driver details sent before you land",
          "Pickup at the terminal's designated rideshare/taxi zone once confirmed",
          "Direct contact with your driver after landing",
        ],
      },
      {
        heading: "Good to know",
        paragraphs: [],
        bulletList: [
          "No meet-and-greet service inside the terminal",
          "No waiting inside airport buildings",
          "Exact terminal pickup zones will be confirmed as Bradfield finalises operations",
          "We recommend booking 24 hours ahead for early flights or large groups",
        ],
      },
      {
        heading: "Who Books the WSI Airport Transfer",
        paragraphs: ["This route has a specific mix of travellers. Here's who we see most often, and why the transfer works so well for each group."],
        bulletList: [
          "Business & Corporate Travellers: Delegates, executives, and conference attendees who need to be somewhere on time. Fixed pricing makes expense reporting simple.",
          "Families Returning from Overseas: A family with checked luggage and a toddler after a long-haul international flight. One vehicle, door-to-door, everyone sits down.",
          "International Tourists: Visitors flying into WSI heading to CBD hotels. A pre-booked transfer removes every point of uncertainty about reaching the city.",
          "Groups & Teams: Sports teams, conference delegations, wedding guests arriving together, one maxi taxi, one driver, one fixed price.",
          "NDIS & Accessibility Passengers: Passengers requiring wheelchair-accessible vehicles. Pre-booking guarantees the right vehicle is waiting.",
          "Cruise Passengers: Passengers flying in and heading to Sydney's cruise terminals at White Bay or Barangaroo via the CBD.",
        ],
      },
      {
        heading: "Why Travellers Choose Us",
        paragraphs: ["There will be plenty of options on this route. Here's what separates us from every alternative."],
        bulletList: [
          "One Fixed Price — No Exceptions: The fare is agreed at booking. Early morning, public holiday, wet weather, peak hour, the price doesn't change.",
          "Flight Monitoring, Always On: Your driver tracks your flight from wheels-up. A two-hour delay means your driver arrives two hours later.",
          "Meet & Greet Every Time: Name board at arrivals. Luggage assistance. Escort to the vehicle. It's how every airport pickup works with us.",
          "24/7 - Including Curfew-Free Flights: Western Sydney Airport runs 24 hours with no curfew. That means 3am arrivals and 5am departures are real.",
          "Right Vehicle for Every Group: Sedan, SUV, Maxi Taxi, Wheelchair Accessible, Baby Seat, one vehicle for every party size and requirement.",
          "Real People Answer: Call and a person picks up. Not a chatbot, not a hold queue. Especially useful for last-minute changes.",
        ],
      },
    ],
    faq: [
      { question: "Is Western Sydney Airport open yet?", answer: "Western Sydney International (Nancy-Bird Walton) Airport at Bradfield is scheduled to start commercial flights in late 2026. We're taking pre-bookings now." },
      { question: "How much does a taxi to Western Sydney Airport cost?", answer: "It depends on distance, vehicle size and time of travel. We give you a fixed price before you book, so you know the exact cost in advance, tolls and the airport access fee included." },
      { question: "Can I book a maxi taxi for a group?", answer: "Yes. Our maxi taxis take up to 11 passengers with luggage, useful for families, teams and site crews travelling together instead of booking multiple cars." },
      { question: "Do you have wheelchair accessible vehicles?", answer: "Yes, fitted with ramps and secure restraints, with drivers trained to assist safely on and off the vehicle." },
      { question: "Can you supply a baby seat?", answer: "Yes, let us know your child's age when you book and we'll fit the appropriate capsule, seat or booster in advance." },
      { question: "How early should I book my transfer?", answer: "For early morning flights, large groups or accessible vehicles, book at least 24 hours ahead. Otherwise, we take same-day bookings whenever a vehicle is free." },
      { question: "Do you monitor flight arrivals?", answer: "Yes, we monitor flight schedules to adjust pickup times if your flight arrives early or is delayed." },
      { question: "What payment methods do you accept?", answer: "Cash, credit and debit cards, bank transfer, corporate accounts and secure online payments. We're not an NDIS registered provider, so NDIS-funded invoicing and NDIS cards aren't accepted, but NDIS participants are welcome to book." },
    ],
  },
  {
    slug: "western-sydney-airport-transfers/western-sydney-airport-to-sydney-cbd",
    metaTitle: "Western Sydney Airport to Sydney CBD",
    metaDescription:
      "Fixed-price transfer from Western Sydney Airport to Sydney CBD via the toll-free M12 and M7. Approximately 45–55 minutes, door to door, driver included.",
    eyebrow: "WESTERN SYDNEY AIRPORT → SYDNEY CBD",
    h1: "WSI Airport to Sydney CBD, Fixed Price, Door to Door.",
    heroDescription:
      "The drive from Nancy-Bird Walton Airport to Sydney CBD is roughly 61 km via the toll-free M12 and M7 motorways, approximately 45–55 minutes in normal conditions. We'll have a clean, comfortable vehicle at your terminal, driver included, fare already agreed before you land.",
    // JUDGMENT CALL: no bgImage/image anywhere in this page's source - falling back to
    // the generic maxi cab image.
    image: { src: "/images/Maxi-Cab-service-1.png", alt: "Western Sydney Airport to Sydney CBD transfer" },
    contentSections: [
      {
        heading: "What the Drive from Western Sydney Airport to Sydney CBD Actually Looks Like",
        paragraphs: ["The M12 Motorway, which opened toll-free on 14 March 2026, gives us a direct, uninterrupted motorway connection from WSI Airport to Sydney CBD via the M7."],
        bulletList: [
          "Toll-Free Via M12 + M7: The M12 Motorway opened March 2026, a direct, toll-free connection from WSI Airport to the M7 at Cecil Hills, then straight into Sydney's motorway network.",
          "45–55 Minutes to Sydney CBD: Standard traffic conditions. Early morning and late-night transfers often run closer to 40 minutes. Peak-hour timing is accounted for at booking.",
          "Drop to Any CBD Location: Hotel lobby, Circular Quay, George Street, Darling Harbour, Barangaroo, the Rocks, we drop at the exact address, not the nearest corner.",
          "Return Transfers Available: Book your CBD pickup for the return leg at the same time. Flight delays on the return are monitored and adjusted automatically.",
        ],
      },
      {
        heading: "Arriving at Western Sydney Airport?",
        paragraphs: ["After 15 hours in the air, the last thing you want is to navigate unfamiliar transport options. We make the arrival side of this route simple."],
        bulletList: [
          "Live Flight Monitoring: We watch your flight number in real time. Land early or touch down late, your driver's schedule adjusts automatically.",
          "Meet & Greet at Arrivals: Your driver waits inside the terminal with a name board, included in every booking at no extra charge.",
          "Full Luggage Assistance: Bags loaded, doors opened. Whether it's two suitcases or ten, your driver handles the loading.",
          "Door-to-Door Drop in the CBD: Hotel lobby, serviced apartment, office building, we drop at the exact address across the CBD.",
        ],
      },
      {
        heading: "Departing From Sydney CBD to WSI Airport?",
        paragraphs: ["Western Sydney Airport operates 24 hours with no curfew, so early morning and late-night departures are standard from day one."],
        bulletList: [
          "Early Morning & Late Night Ready: WSI has no flight curfew. Whether your departure is 5am or midnight, we'll be at your CBD address on time.",
          "CBD Pickup From Any Address: Hotel, apartment, office, Airbnb, your driver comes to the door. No walking to a rank, no uncertainty.",
          "Fixed Fare, Agreed at Booking: The price you're quoted is the price you pay. No surge pricing, no metered surprises at the terminal drop-off.",
          "Book Both Legs in One Go: Lock in your outbound drop-off and your return airport pickup in a single booking.",
        ],
      },
      {
        heading: "Who Books the WSI Airport to Sydney CBD Transfer",
        paragraphs: ["This route has a specific mix of travellers. Here's who we see most often."],
        bulletList: [
          "Business & Corporate Travellers: Delegates, executives, and conference attendees who need to be somewhere in the CBD on time.",
          "Families Returning from Overseas: A family with checked luggage and a toddler after a long-haul international flight. One vehicle, door-to-door.",
          "International Tourists: Visitors flying into WSI heading to CBD hotels, Circular Quay, or the Rocks.",
          "Groups & Teams: Sports teams, conference delegations, wedding guests arriving together, one maxi taxi, one fixed price.",
          "NDIS & Accessibility Passengers: Passengers requiring wheelchair-accessible vehicles. Pre-booking guarantees the right vehicle is waiting.",
          "Cruise Passengers: Passengers flying in and heading to Sydney's cruise terminals at White Bay or Barangaroo via the CBD.",
        ],
      },
      {
        heading: "Five Steps from WSI Airport to Your CBD Door",
        paragraphs: ["Simple, predictable, and designed to require nothing from you after the initial booking."],
        bulletList: [
          "Book Online or Call: Select WSI Airport as pickup, enter your CBD address, choose your vehicle. Locked in within minutes.",
          "Receive Confirmation: Instant SMS and email with your fixed fare, driver details, vehicle, and arrival instructions.",
          "We Track Your Flight: Your flight is monitored live. Delays or early arrivals are handled automatically, no calls needed.",
          "Meet at Arrivals: Driver inside the terminal with name board, bags loaded. You're in the vehicle within minutes of clearing customs.",
          "Arrive at Your CBD Address: ~50 minutes on the motorway. Fixed price, no detours, door-to-door delivery anywhere in Sydney CBD.",
        ],
      },
      {
        heading: "Why Travellers Choose Us for the WSI Airport to CBD Run",
        paragraphs: ["There will be plenty of options on this route. Here's what separates us from every alternative."],
        bulletList: [
          "One Fixed Price — No Exceptions: The fare is agreed at booking. Early morning, public holiday, wet weather, peak hour, the price doesn't change.",
          "Flight Monitoring, Always On: Your driver tracks your flight from wheels-up. A two-hour delay means your driver arrives two hours later.",
          "Meet & Greet Every Time: Name board at arrivals. Luggage assistance. Escort to the vehicle. It's how every airport pickup works with us.",
          "24/7 - Including Curfew-Free Flights: Western Sydney Airport runs 24 hours with no curfew. That means 3am arrivals and 5am departures are real.",
          "Right Vehicle for Every Group: Sedan, SUV, Maxi Taxi, Wheelchair Accessible, Baby Seat, one vehicle for every party size and requirement.",
          "Real People Answer: Call and a person picks up. Not a chatbot, not a hold queue. Especially useful for last-minute changes.",
        ],
      },
    ],
    faq: [
      { question: "How long does it take to get from Western Sydney Airport to Sydney CBD?", answer: "Approximately 45–55 minutes in normal traffic conditions, via the toll-free M12 Motorway and M7. Early morning and late-night transfers often take closer to 40 minutes." },
      { question: "How far is Western Sydney Airport from Sydney CBD?", answer: "Western Sydney International Airport (Badgerys Creek) is approximately 61 kilometres from Sydney CBD by road, significantly further than Kingsford Smith Airport's ~11 km." },
      { question: "Is the M12 Motorway toll-free for WSI Airport transfers to the CBD?", answer: "Yes. The M12 Motorway, which opened on 14 March 2026, is toll-free and connects WSI Airport directly to the M7 Motorway interchange at Cecil Hills." },
      { question: "Can I take public transport from Western Sydney Airport to Sydney CBD?", answer: "Yes, but it requires a transfer. The free WSI Link bus runs every 30 minutes to St Marys Station, then the T1 Western Line takes ~60 minutes. Total journey typically exceeds 90 minutes." },
      { question: "Do you offer fixed pricing for the WSI Airport to Sydney CBD transfer?", answer: "Yes, every transfer is fixed price, agreed at booking. No meter, no surge pricing, no unexpected charges." },
      { question: "Do you monitor my flight if it is delayed?", answer: "Yes. We track your flight number in real time and your driver's schedule adjusts automatically." },
      { question: "Is meet and greet included at Western Sydney Airport arrivals?", answer: "Yes, included in every pickup booking at no extra charge. Your driver waits inside the arrivals terminal with a name board." },
      { question: "Can you transfer groups from WSI Airport to Sydney CBD?", answer: "Yes. Our Maxi Taxi seats up to 11 passengers with full luggage. For larger groups we co-ordinate multiple vehicles." },
      { question: "Do you offer WSI Airport transfers at 3am or 4am for early departures?", answer: "Yes, 24 hours a day, 7 days a week. Western Sydney Airport is a 24-hour, curfew-free facility." },
      { question: "Do you have wheelchair accessible vehicles for the WSI to CBD route?", answer: "Yes. We operate Wheelchair Accessible Vehicles (WAVs) with hydraulic ramps and trained drivers. We're not an NDIS registered provider and don't process NDIS funding or Cabcharge; standard payment methods apply." },
    ],
  },
  {
    slug: "western-sydney-airport-transfers/western-sydney-airport-wheelchair-taxi",
    metaTitle: "Western Sydney Airport Wheelchair Taxi",
    metaDescription:
      "Ramp-fitted vehicles, approved restraint systems, and trained drivers for Western Sydney Airport. Fixed price, companion seating included.",
    eyebrow: "WESTERN SYDNEY AIRPORT WHEELCHAIR TAXI",
    h1: "Wheelchair accessible transport to Western Sydney Airport, done properly.",
    heroDescription:
      "A ramp-fitted vehicle, an approved restraint system, and a driver who knows how to use both without making a production of it. Fixed price agreed before you book, and enough notice given at pickup that nobody's rushed.",
    // JUDGMENT CALL: no bgImage in this LandingHero call - reused the site's wheelchair
    // taxi image.
    image: { src: "/images/Wheelchair-Taxi-Sydney.webp", alt: "Western Sydney Airport wheelchair taxi" },
    contentSections: [
      {
        heading: "The bits that matter are the ramp angle, the tie-down points, and the driver's hands.",
        paragraphs: [
          "A wheelchair vehicle is only as good as its worst detail. A ramp that's too steep, a restraint point that doesn't quite line up, a driver who's never actually clipped one in before, any of those turns a five-minute boarding into a stressful one. Ours run a low-angle ramp so you're not fighting gravity to get in, and the securement points are checked before the car leaves the depot, not worked out for the first time at the kerb.",
          "If you use a manual chair, a power chair, or a scooter, tell us which when you book. The vehicle we send, and the way your driver sets it up, changes depending on the answer, and we'd rather ask the question now than guess at the kerb.",
        ],
      },
      {
        heading: "A 4am flight shouldn't mean a rushed transfer to get there.",
        paragraphs: [],
        bulletList: [
          "We collect from home, a hospital ward, a care facility, wherever you're starting from",
          "Boarding time isn't squeezed to make up a schedule",
          "3am pickups are on the roster, not an exception someone has to approve",
          "The price you're quoted doesn't move once you're in the car",
          "Whoever's travelling with you sits beside you, not in a separate car",
          "Mention your return flight and we'll pencil that leg in at the same time",
        ],
      },
      {
        heading: "The gap between clearing the gate and getting into a vehicle is where most trips go wrong. We close that gap.",
        paragraphs: [],
        bulletList: [
          "We watch the flight, not the clock: Your driver's timing is set against your actual flight number, so a delayed bag carousel doesn't mean a driver who's given up and left.",
          "Accessible pickup point: Driver waits at the designated accessible pickup zone with the ramp already down.",
          "No equipment fetched on the spot: The ramp's down and the restraints are laid out before you're within sight of the vehicle, not assembled while you wait.",
        ],
      },
      {
        heading: "We're not the only wheelchair taxi in Sydney. Here's what we think actually sets this one apart.",
        paragraphs: [],
        bulletList: [
          "We ask about your chair before we ask about your name",
          "Restraint points are checked at the depot, not improvised roadside",
          "A companion rides with you, it's not billed as an add-on",
          "3am and 4am bookings are handled the same as midday ones",
          "The vehicle that turns up is the one you were told about",
          "Your price doesn't change because your flight did",
          "A person answers the phone when you call to change something",
          "Card, bank transfer or corporate account, sorted before you travel",
        ],
      },
      {
        heading: "Not a hypothetical persona list, these are the bookings that actually come through.",
        paragraphs: [],
        bulletList: [
          "NDIS support coordinators booking on someone's behalf: You're arranging the trip, not taking it. We'll confirm details directly with the participant or carer, and payment is settled through one of our standard accepted methods before travel.",
          "Someone being discharged and flying home: Coming straight from a ward, sometimes with a support worker, sometimes solo. We build in the extra minutes that takes.",
          "A parent visiting from interstate: Adult children booking transport for a parent who's flying in alone and needs someone competent waiting, not just present.",
          "A traveller who's used wheelchair transport in other cities: And knows exactly what \"we can accommodate you\" tends to actually mean in practice. We'd rather just do it properly.",
        ],
      },
    ],
    faq: [
      { question: "Can I stay in my wheelchair during the trip?", answer: "Yes. Our vehicles are fitted with approved wheelchair restraint systems, so most passengers can remain seated in their own wheelchair for the entire journey." },
      { question: "Do you take powered wheelchairs and mobility scooters?", answer: "In most cases, yes, subject to the size and weight of the chair fitting within our ramp and restraint limits. Let us know the make, model, weight and dimensions when you book." },
      { question: "How much notice do you need?", answer: "We recommend at least 24 hours' notice, since accessible vehicles are a smaller part of our fleet than standard taxis. Same-day requests are welcome and we'll always try." },
      { question: "Is the fare fixed?", answer: "Yes. You're given a fixed price before you book, covering the vehicle, driver assistance and the airport access fee, with no meter and no surge pricing." },
      { question: "Can NDIS participants book with you?", answer: "Yes, our wheelchair-accessible vehicles are available to NDIS participants. We're not an NDIS registered provider, and we don't process NDIS-funded invoicing or NDIS cards, so please book using one of our standard accepted payment methods (card, bank transfer, corporate account or secure online payment)." },
      { question: "Can a companion travel with me?", answer: "Yes, our wheelchair accessible vehicles seat additional companions alongside the wheelchair position, so carers and family members can travel together." },
      { question: "Do you monitor flights for wheelchair taxi bookings?", answer: "Yes. We track your flight number and adjust your driver's arrival automatically if you land early or are delayed." },
      { question: "Do you run wheelchair taxis early morning or late at night?", answer: "Yes, 24 hours a day, seven days a week. Western Sydney Airport is a curfew-free facility, so early departures and late arrivals are routine for us." },
    ],
  },
];
