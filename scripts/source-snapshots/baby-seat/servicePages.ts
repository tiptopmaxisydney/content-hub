import type { Faq } from "./homeData";

export type ServiceImage = { src: string; alt: string; width: number; height: number };

export type ServicePage = {
  slug: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  heroDescription: string;
  image: ServiceImage;
  imageFirst?: boolean;
  intro: string[];
  introItemsIntro?: string;
  introItems?: string[];
  features: { title: string; description: string }[];
  faq: Faq[];
};

const IMG = {
  capsule: { src: "/images/baby-capsule-taxi-sydney-real.png", width: 700, height: 467 },
  childSeat: { src: "/images/child-seat-taxi-sydney-real.png", width: 700, height: 467 },
  airport: { src: "/images/sydney-airport-transfers-with-baby-seats-real.png", width: 795, height: 529 },
  hospital: { src: "/images/hospital-transfers-with-baby-seats-real.png", width: 795, height: 529 },
  family: { src: "/images/family-transport-across-sydney-real.png", width: 795, height: 529 },
  safety: { src: "/images/child-safety-information-real.png", width: 738, height: 599 },
} as const;

export const servicePages: ServicePage[] = [
  // Services
  {
    slug: "baby-capsule-taxi-sydney",
    navLabel: "Baby Capsule Taxi",
    metaTitle: "Baby Capsule Taxi Sydney | Safe Newborn & Infant Taxi Service",
    metaDescription:
      "Baby Capsule Taxi Sydney provides safe newborn and infant transport across Sydney with approved baby capsules fitted before every journey. Airport, hospital and everyday transfers.",
    eyebrow: "Baby Capsule Taxi",
    h1: "Baby Capsule Taxi Sydney - Safe Newborn & Infant Transport Across Sydney",
    heroDescription:
      "Travelling with a newborn requires more than just a ride — it requires safety, comfort and peace of mind, with an approved baby capsule fitted correctly before every journey.",
    image: { ...IMG.capsule, alt: "Baby capsule taxi Sydney for newborns and infants" },
    intro: [
      "Travelling with a newborn requires more than just a ride. It requires safety, comfort, and peace of mind. Our Baby Capsule Taxi Sydney service is designed specifically for families travelling with newborns and infants who require an approved baby capsule fitted correctly before every journey.",
      "Whether you need transport from hospital to home, Sydney Airport transfers, medical appointments, family visits, hotels, cruise terminals, or everyday travel, our professional drivers provide safe and reliable family transport with baby capsules available on request.",
      "Every journey is planned with your child's safety as the highest priority, giving parents confidence that their baby is travelling in an appropriate restraint that meets Australian safety requirements. NSW regulations require children under 12 months to travel in suitable approved restraints, making pre-booked baby capsule taxis an ideal solution for families travelling with newborns and infants.",
    ],
    introItemsIntro: "Our Baby Capsule Taxi Sydney service is commonly booked for:",
    introItems: [
      "Hospital discharge transfers",
      "Airport transfers",
      "Family visits",
      "Medical appointments",
      "Hotel transfers",
      "Cruise terminal transfers",
      "Everyday family transport",
    ],
    features: [
      {
        title: "Professionally Fitted Baby Capsules",
        description:
          "Our vehicles are equipped with approved baby capsules suitable for newborns and young infants. Every restraint is checked before the journey to ensure correct installation and maximum safety.",
      },
      {
        title: "Experienced Family-Friendly Drivers",
        description:
          "Our drivers understand the needs of parents travelling with babies. They allow extra time for boarding, luggage, prams, feeding equipment, and ensuring your child is safely secured.",
      },
      {
        title: "Clean and Sanitised Vehicles",
        description:
          "All baby capsules and vehicles are regularly cleaned and maintained to provide a hygienic environment for your family.",
      },
    ],
    faq: [
      {
        question: "Do I need to request a baby capsule when booking?",
        answer: "Yes. Please advise us when making your booking so we can ensure the correct baby capsule is available for your journey.",
      },
      {
        question: "Can newborn babies travel in your taxis?",
        answer: "Yes. Our baby capsule taxis are specifically designed for newborn and infant transport when booked in advance.",
      },
      {
        question: "Do you provide airport transfers with baby capsules?",
        answer: "Yes. We provide Sydney Airport transfers with baby capsules available upon request.",
      },
      {
        question: "Can I use my own baby capsule?",
        answer: "Yes. If you prefer to use your own approved baby capsule, please let us know when booking.",
      },
      {
        question: "Do you offer hospital pickup services?",
        answer: "Yes. We regularly provide hospital-to-home transfers for new parents and newborn babies across Sydney, including from Royal Prince Alfred Hospital, Westmead Hospital, Liverpool Hospital, St George Hospital, The Royal Hospital for Women and Northern Beaches Hospital.",
      },
    ],
  },
  {
    slug: "child-seat-taxi-sydney",
    navLabel: "Child Seat Taxi",
    metaTitle: "Child Seat Taxi Sydney | Safe Family Taxi with Child Seats",
    metaDescription:
      "Child Seat Taxi Sydney provides approved child seats for toddlers and young children, helping families travel safely throughout Sydney without installing their own car seat.",
    eyebrow: "Child Seat Taxi",
    h1: "Child Seat Taxi Sydney - Safe Family Transport for Toddlers and Young Children",
    heroDescription:
      "Approved child seats for toddlers and young children, helping families travel safely throughout Sydney without the hassle of installing their own car seat.",
    image: { ...IMG.childSeat, alt: "Child seat taxi Sydney for toddlers and young children" },
    intro: [
      "Travelling with young children requires safe and reliable transport. Our Child Seat Taxi Sydney service provides approved child seats for toddlers and young children, helping families travel safely throughout Sydney without the hassle of installing their own car seat.",
      "Whether you're travelling to Sydney Airport, a medical appointment, school event, family gathering, cruise terminal, hotel, or any destination across Sydney, our family-friendly taxis are equipped with child seats upon request to ensure a safe and comfortable journey.",
      "Parents understand that travelling with children involves more than simply getting from one place to another. Safety, comfort, and convenience are essential — we make family transport simple by providing vehicles prepared with suitable child restraints when booked in advance.",
    ],
    introItemsIntro: "Our Child Seat Taxi Sydney service has been designed specifically for families who need:",
    introItems: [
      "Approved child seats",
      "Professional service",
      "Reliable pre-booked transport",
      "Airport transfers",
      "Hospital appointments",
      "Family outings",
      "School holiday travel",
      "Cruise terminal transfers",
    ],
    features: [
      {
        title: "Child Seats Available on Request",
        description: "Our taxis can be equipped with child seats suitable for toddlers and young children, ensuring safer travel for families throughout Sydney.",
      },
      {
        title: "Family-Friendly Drivers",
        description: "Our experienced drivers understand the needs of families travelling with children and provide patient, professional service from pickup to drop-off.",
      },
      {
        title: "Comfortable Vehicles",
        description: "Travel with plenty of room for prams, luggage, school bags, shopping and family travel essentials.",
      },
    ],
    faq: [
      {
        question: "Do I need to request a child seat when booking?",
        answer: "Yes. Please request a child seat when making your booking so we can prepare the appropriate restraint before your journey.",
      },
      {
        question: "What age is a child seat suitable for?",
        answer: "Child seats are generally suitable for toddlers and young children who have outgrown a baby capsule. Please provide your child's age when booking.",
      },
      {
        question: "Can I book a child seat taxi to Sydney Airport?",
        answer: "Yes. We provide airport transfers with child seats available throughout Sydney.",
      },
      {
        question: "Do you provide return airport transfers?",
        answer: "Yes. We can arrange both airport drop-offs and return pickups.",
      },
      {
        question: "Can I use my own child seat?",
        answer: "Yes. If preferred, you may bring your own approved child seat.",
      },
      {
        question: "Do you operate throughout Sydney?",
        answer: "Yes. We provide child seat taxi services across metropolitan Sydney and surrounding suburbs.",
      },
    ],
  },
  {
    slug: "sydney-airport-transfers-with-baby-seats",
    navLabel: "Airport Transfers",
    metaTitle: "Sydney Airport Transfers with Baby Seats",
    metaDescription:
      "Sydney Airport Transfers with Baby Seats provides safe, comfortable and convenient family transport to and from Sydney Airport, with baby capsules and child seats available upon request.",
    eyebrow: "Airport Transfers",
    h1: "Sydney Airport Transfers with Baby Seats - Safe Family Airport Transport Across Sydney",
    heroDescription:
      "Travelling with children can be challenging, especially when arriving at or departing from Sydney Airport. Our service provides a safe, comfortable and convenient transport solution.",
    image: { ...IMG.airport, alt: "Sydney Airport transfers with baby seats" },
    intro: [
      "Travelling with children can be challenging, especially when arriving at or departing from Sydney Airport. Our Sydney Airport Transfers with Baby Seats service provides families with a safe, comfortable, and convenient transport solution, complete with baby capsules and child seats available upon request.",
      "Whether you're travelling with a newborn, toddler, or young child, our family-friendly airport taxis are designed to make airport transfers stress-free. We provide reliable transportation to and from Sydney Airport with professionally prepared child restraints, spacious vehicles, and experienced drivers who understand the needs of families.",
    ],
    introItemsIntro: "Our airport transfer service is specifically designed for families who require:",
    introItems: [
      "Baby capsules",
      "Child seats",
      "Airport meet & greet",
      "Flight monitoring",
      "Spacious family vehicles",
      "Door-to-door service",
      "Sydney-wide coverage",
    ],
    features: [
      {
        title: "Baby Seats Available for Every Age",
        description: "Baby capsules for newborns and young infants, and child seats for toddlers and younger children. Simply advise your child's age when booking, and we'll prepare the appropriate seat before your journey.",
      },
      {
        title: "Airport Pickup Service",
        description: "Pre-booked family transport with child seats ready on arrival, professional drivers, spacious vehicles and assistance with luggage, prams and family travel essentials.",
      },
      {
        title: "Airport Drop-Off Service",
        description: "Early morning and late-night airport transfers with direct terminal drop-off, child restraints provided, and reliable scheduling to help your trip start smoothly.",
      },
    ],
    faq: [
      {
        question: "Do I need to request a baby seat when booking?",
        answer: "Yes. Please advise us when booking so we can prepare the appropriate child restraint.",
      },
      {
        question: "Can you monitor my flight?",
        answer: "Yes. Flight monitoring is included for airport pickup bookings.",
      },
      {
        question: "Do you provide baby capsules?",
        answer: "Yes. Baby capsules are available for newborns and infants upon request.",
      },
      {
        question: "Do you provide child seats?",
        answer: "Yes. We offer child seats suitable for different age groups.",
      },
      {
        question: "Can you pick up from both domestic and international terminals?",
        answer: "Yes. We provide transfers from all Sydney Airport terminals.",
      },
      {
        question: "Do you provide return airport transfers?",
        answer: "Yes. We can arrange both arrival and departure transfers.",
      },
    ],
  },
  {
    slug: "taxi-with-baby-seat-sydney",
    navLabel: "Taxi With Baby Seat Sydney",
    metaTitle: "Taxi With Baby Seat Sydney | Reliable & Affordable Cab Service",
    metaDescription:
      "Taxi With Baby Seat Sydney provides professionally fitted baby capsules and child seats for safe, family-friendly transport throughout Sydney, available 24/7.",
    eyebrow: "Family Transport",
    h1: "Taxi With Baby Seat Sydney",
    heroDescription:
      "Safe, reliable and family-friendly transport across Sydney — professionally fitted baby capsules and child seats so your child travels safely and comfortably.",
    image: { ...IMG.family, alt: "Taxi with baby seat Sydney for family travel" },
    intro: [
      "Travelling with a baby or young child requires extra planning, especially when it comes to safe transportation. At Baby Seat Taxi Sydney, we provide professionally fitted baby capsules and child seats to ensure your child travels safely and comfortably throughout Sydney. Whether you're heading to Sydney Airport, returning home from hospital with a newborn, attending a family event, or simply travelling across the city, our family-friendly taxi service is designed to make every journey stress-free.",
      "Our vehicles are available 24 hours a day, 7 days a week and can be pre-booked with the appropriate child restraint based on your child's age and size. We understand that safety is the highest priority for parents, which is why we focus on reliable service, clean vehicles, and properly fitted child restraints.",
    ],
    introItemsIntro: "Why choose our Taxi With Baby Seat Sydney service:",
    introItems: [
      "Family-Focused Transport — designed for newborns, infants, toddlers and young children",
      "Professionally Fitted Baby Seats — installed and checked before every trip",
      "Sydney-Wide Coverage — CBD, Western Sydney, Inner West, Eastern Suburbs, Northern Beaches, North Shore and surrounding areas",
      "Hospital Transfers — safe transport for newborn hospital discharge and family hospital appointments",
      "Sydney Airport Specialists — reliable transfers with flight monitoring and luggage/pram assistance",
      "Available 24/7 — pre-booked and last-minute bookings throughout Sydney",
    ],
    features: [
      {
        title: "Baby Capsule Taxi Sydney (Newborn to 12 Months)",
        description: "Rear-facing baby capsules suitable for newborn babies and young infants, providing the highest level of protection and comfort during travel.",
      },
      {
        title: "Child Seat Taxi Sydney (6 Months to 4 Years)",
        description: "Approved forward-facing child restraints for toddlers and young children that meet Australian safety requirements.",
      },
      {
        title: "Child Safety Comes First",
        description: "Child restraints are checked before every trip, vehicles are clean and sanitised, and drivers are family-friendly. Advance booking is recommended.",
      },
    ],
    faq: [
      {
        question: "Do taxis in Sydney provide baby seats?",
        answer: "Most standard taxis do not carry baby seats. We specialise in providing taxis equipped with baby capsules and child seats.",
      },
      {
        question: "Can I book a baby capsule for a newborn?",
        answer: "Yes. Rear-facing baby capsules are available for newborn babies and young infants.",
      },
      {
        question: "Do you service Sydney Airport?",
        answer: "Yes. We provide airport transfers to and from both Sydney Domestic and International Airports.",
      },
      {
        question: "How far in advance should I book?",
        answer: "We recommend booking as early as possible, especially during peak travel periods, although same-day bookings may be available.",
      },
      {
        question: "Are your child seats professionally fitted?",
        answer: "Yes. All child restraints are installed and checked before your journey.",
      },
    ],
  },
  {
    slug: "baby-seat-taxi-western-sydney-airport",
    navLabel: "Baby Seat Taxi Western Sydney Airport",
    metaTitle: "Baby Seat Taxi Western Sydney Airport | Safe Family Transport",
    metaDescription:
      "Safe baby seat taxi service to and from Western Sydney Airport (Badgerys Creek) with certified infant capsules and approved child seats, AS/NZS 1754 compliant.",
    eyebrow: "Airport Transfers",
    h1: "Safe Baby Seat Taxi Service to Western Sydney Airport",
    heroDescription:
      "Fully equipped taxis with certified infant capsules and approved child seats for safe, comfortable journeys to and from Western Sydney Airport (Badgerys Creek).",
    image: { ...IMG.airport, alt: "Baby seat taxi transfers to Western Sydney Airport" },
    intro: [
      "Welcome to Baby Seat Taxi Sydney's Western Sydney Airport service. We provide fully equipped taxis with certified infant capsules and approved child seats for safe, comfortable journeys to and from Western Sydney Airport (Badgerys Creek). Whether you're travelling with a newborn, toddler, or young child, we ensure your family arrives relaxed and secure.",
      "Every infant capsule and child seat meets or exceeds Australian and New Zealand safety regulations (AS/NZS 1754). Incorrect installation is the leading cause of child restraint failure, so our drivers are certified in proper installation and verify positioning before every airport journey.",
    ],
    introItemsIntro: "Safety-first child restraints for air travel:",
    introItems: [
      "Certified infant capsules for newborns and babies up to 12 months",
      "Approved child seats for toddlers and young children aged 1–5 years",
      "All seats comply with Australian safety standards (AS/NZS 1754)",
      "Professional installation verified before every journey",
      "Regular safety inspections and meticulous maintenance",
      "Hygienically sanitised between each passenger",
    ],
    features: [
      {
        title: "Stress-Free Airport Experience",
        description: "Professional drivers trained to handle busy airport environments, with a patient approach and real-time traffic monitoring to ensure punctual arrivals.",
      },
      {
        title: "Reliable Airport Ground Transportation",
        description: "Flexible booking for early morning and late evening departures, fixed pricing on airport routes, and bookings accepted up to 30 days ahead or last-minute.",
      },
      {
        title: "Wide Western Sydney Coverage",
        description: "Connecting Western Sydney Airport to Penrith, Parramatta, Campbelltown, Liverpool, Blacktown, Fairfield, Bankstown and homes and hotels across greater Sydney.",
      },
    ],
    faq: [
      {
        question: "Can I book a taxi from Western Sydney Airport directly?",
        answer: "Yes! Call us upon arrival at airport arrivals, or better yet, pre-book your return journey when you book your outbound flight. Real-time monitoring ensures we're ready when you land.",
      },
      {
        question: "Do I need to provide my own baby seat or capsule?",
        answer: "No! Our taxis come fully equipped with certified infant capsules and child seats. You don't need to bring anything except your family.",
      },
      {
        question: "What if my flight is delayed? Will the driver still wait?",
        answer: "Yes. We monitor flight information and adjust timing accordingly. Pre-book return journeys and let us know if delays occur.",
      },
      {
        question: "How much advance notice do I need for Western Sydney Airport bookings?",
        answer: "We accept bookings from 15 minutes to 30 days ahead. For airport travel, we recommend booking 2-3 days in advance for planning certainty.",
      },
      {
        question: "Do you offer round-trip airport packages?",
        answer: "Yes! Book outbound and return journeys together for convenience. We provide discounted round-trip pricing.",
      },
    ],
  },
  {
    slug: "booster-seat-taxi-sydney",
    navLabel: "Booster Seat Taxi",
    metaTitle: "Booster Seat Taxi Sydney | Safe Family Taxi with Booster Seats",
    metaDescription:
      "Booster Seat Taxi Sydney provides approved booster seats for children who have outgrown child seats, for safe family travel throughout Sydney.",
    eyebrow: "Booster Seat Taxi",
    h1: "Booster Seat Taxi Sydney – Safe Transport for Growing Children Across Sydney",
    heroDescription:
      "Approved booster seats for children who have outgrown child seats but are not yet ready to use a standard vehicle seatbelt alone.",
    image: { ...IMG.childSeat, alt: "Booster seat taxi Sydney for older children" },
    intro: [
      "Travelling with older children requires the right safety equipment to ensure a secure and comfortable journey. Our Booster Seat Taxi Sydney service provides approved booster seats for children who have outgrown child seats but are not yet ready to use a standard vehicle seatbelt alone.",
      "Whether you're travelling to Sydney Airport, school events, family gatherings, medical appointments, cruise terminals, hotels, or anywhere across Sydney, our family-friendly taxis can be equipped with booster seats upon request, making family travel safer and more convenient.",
    ],
    introItemsIntro: "Our Booster Seat Taxi Sydney service provides:",
    introItems: [
      "Approved booster seats",
      "Professional drivers",
      "Reliable pre-booked transport",
      "Airport transfers",
      "Cruise terminal transfers",
      "Family outings",
      "School holiday transport",
      "Sydney-wide service",
    ],
    features: [
      {
        title: "Approved Booster Seats Available",
        description: "We provide booster seats suitable for children who require additional height and support for proper seatbelt positioning during travel.",
      },
      {
        title: "Family-Friendly Drivers",
        description: "Our professional drivers understand the needs of families and provide a courteous and patient service for every journey.",
      },
      {
        title: "Comfortable Family Vehicles",
        description: "Travel comfortably with space for luggage, school bags, prams, sporting equipment and family travel essentials.",
      },
    ],
    faq: [
      {
        question: "Do I need to request a booster seat when booking?",
        answer: "Yes. Please advise us during booking so we can prepare the appropriate booster seat before your journey.",
      },
      {
        question: "What age is a booster seat suitable for?",
        answer: "Booster seats are generally suitable for older children who have outgrown child seats but still require correct seatbelt positioning.",
      },
      {
        question: "Can I book a booster seat taxi to Sydney Airport?",
        answer: "Yes. We provide airport transfers with booster seats available throughout Sydney.",
      },
      {
        question: "Do you offer return airport transfers?",
        answer: "Yes. We can arrange both airport drop-offs and return pickups.",
      },
      {
        question: "Can I use my own booster seat?",
        answer: "Yes. You're welcome to use your own approved booster seat if preferred.",
      },
      {
        question: "Do you operate across Sydney?",
        answer: "Yes. We provide booster seat taxi services throughout metropolitan Sydney and surrounding suburbs.",
      },
    ],
  },
  {
    slug: "baby-car-seat-taxi-sydney",
    navLabel: "Baby Car Seat Taxi",
    metaTitle: "Baby Car Seat Taxi Sydney | Certified AS1754 Child Restraints",
    metaDescription:
      "Baby Car Seat Taxi Sydney — reliable, affordable taxi and maxi taxi services with baby capsules, child car seats and boosters certified to Australian Standard AS 1754.",
    eyebrow: "Baby Car Seat Taxi",
    h1: "Baby Car Seat Taxi Sydney",
    heroDescription:
      "Finding the right baby car seat taxi in Sydney at a reliable and affordable price — all our cars and minivans are equipped with the latest Australian-compliant safety baby capsules, child car seats and boosters.",
    image: { ...IMG.capsule, alt: "Baby car seat taxi Sydney covering capsules, child seats and booster seats" },
    intro: [
      "What is the biggest challenge when you travel with a baby or children in Sydney? Finding the right baby car seat taxi at a reliable and affordable price. Whether you don't want to travel in your own vehicle because of traffic, or you're coming from a tiring trip, you can book our services and get an instant quote by phone or by filling in the booking form.",
      "According to the Sydney transport department, there are strict rules regarding the facing of infants and babies while secured in taxi seats: children aged 0 to 6 months must be restrained with a secure, rear-facing baby car seat, and children aged 6 months to 4 years must be rear-facing or forward-facing in their seat with proper restraint. All our cars and minivans are equipped with the latest Australian-compliant safety baby capsules, child car seats and boosters, for children and babies of all ages and sizes.",
      "Our passengers' safety is our number one priority — all our car seats are fully certified to Australian Standard AS 1754, fully labelled, and checked regularly by authorised checking stations. Our driving staff are all experienced with driving children and families, and our range of vehicles includes luxury limousines and Maxi Taxis to fit the whole family and their luggage.",
    ],
    introItemsIntro: "Related searches families use to find us:",
    introItems: [
      "Taxi With Baby Seat Sydney",
      "Baby Seat Taxi Sydney Airport",
      "Book Taxi With Baby Seat Sydney",
      "Maxi Taxi Sydney Baby Seat",
      "Taxi Service With Baby Seat Sydney",
    ],
    features: [
      {
        title: "AS 1754 Certified Restraints",
        description: "All car seats are fully certified to Australian Standard AS 1754, fully labelled, and checked regularly by authorised checking stations.",
      },
      {
        title: "Experienced, Family-Minded Drivers",
        description: "All drivers are fully trained and experienced to ensure your baby or child is comfortable and safely seated in their car seat, capsule or booster.",
      },
      {
        title: "Always On Time",
        description: "Drivers arrive well ahead of schedule, leaving enough time to safely and securely place your child or baby in their seat.",
      },
    ],
    faq: [
      {
        question: "What restraint does my child need in a taxi in Sydney?",
        answer: "Children aged 0 to 6 months need to be restrained with a secure, rear-facing baby car seat. Children aged 6 months to 4 years must travel rear-facing or forward-facing in their seat with proper restraint.",
      },
      {
        question: "Are your car seats certified?",
        answer: "Yes. All our car seats are fully certified to Australian Standard AS 1754, fully labelled, and checked regularly by authorised checking stations.",
      },
      {
        question: "What kind of vehicles do you use?",
        answer: "Our range includes the latest sedans and luxury vehicles as well as Maxi Taxis and limousines, so we can fit the whole family and their luggage.",
      },
    ],
  },
  {
    slug: "baby-seat-taxi-sydney-airport",
    navLabel: "Sydney Airport Baby Seat Taxi",
    metaTitle: "Baby Seat Taxi to Sydney Airport | Family Airport Transfers Sydney",
    metaDescription:
      "Stress-free Sydney Airport transfers for families travelling with children, with professionally fitted baby capsules and child seats from doorstep to terminal.",
    eyebrow: "Sydney Airport",
    h1: "Stress Free Airport Transfers for Families Travelling with Children",
    heroDescription:
      "Getting to the airport with young children can be one of the most challenging parts of any trip — we provide professionally fitted baby capsules and child seats so your family can travel safely from your doorstep to the terminal.",
    image: { ...IMG.airport, alt: "Baby seat taxi transfers to Sydney Kingsford Smith Airport" },
    intro: [
      "Getting to the airport with young children can be one of the most challenging parts of any trip. Between luggage, prams, travel documents and keeping children comfortable, parents need reliable transport they can trust.",
      "Our Sydney Airport baby seat taxi service is specifically designed for families travelling with infants, toddlers and young children. We provide professionally fitted baby capsules and child seats ensuring your family can travel safely from your doorstep to the airport terminal.",
    ],
    introItemsIntro: "We help with:",
    introItems: [
      "Airport luggage",
      "Prams and strollers",
      "Multiple child seats",
      "Early morning departures",
      "Late-night arrivals",
      "International travel",
      "Domestic travel",
      "Group family transfers",
    ],
    features: [
      {
        title: "Door-to-Terminal Airport Service",
        description: "Our drivers pick you up directly from your home, hotel or accommodation and transport your family safely to Sydney Airport — no parking fees, no shuttle waiting, child seats ready before pickup.",
      },
      {
        title: "Why Families Pre-Book",
        description: "Guaranteed child seat availability, better planning, reduced stress, and a faster airport exit — walk out of the terminal and head directly to your waiting vehicle.",
      },
      {
        title: "Sydney-Wide Coverage",
        description: "Popular routes include Sydney CBD, Circular Quay, Darling Harbour, Parramatta, Blacktown, Penrith, Liverpool, Campbelltown, Chatswood and the Eastern Suburbs.",
      },
    ],
    faq: [
      {
        question: "Can I book a baby capsule for airport transfers?",
        answer: "Yes, baby capsules can be requested when booking.",
      },
      {
        question: "Do you provide airport pickups?",
        answer: "Yes, we provide both airport pickups and airport drop-offs.",
      },
      {
        question: "Can I book multiple child seats?",
        answer: "Yes, multiple baby seats and booster seats can be arranged.",
      },
      {
        question: "Do you operate early morning airport transfers?",
        answer: "Yes, our service is available 24 hours a day.",
      },
      {
        question: "Do you provide large vehicles for families?",
        answer: "Yes, larger vehicles can be arranged for families travelling with extra luggage.",
      },
    ],
  },
  // Locations
  {
    slug: "baby-seat-taxi-parramatta",
    navLabel: "Baby Seat Taxi Parramatta",
    metaTitle: "Baby Seat Taxi Parramatta | Airport, Hospital & Family Transfers",
    metaDescription:
      "Baby Seat Taxi Parramatta - certified child restraints fitted correctly to AS/NZS 1754, fixed prices and 24/7 availability for Westmead Hospital, Sydney Airport and family trips.",
    eyebrow: "Parramatta",
    h1: "Baby Seat Taxi Parramatta - Safe, Reliable Rides for Your Little Ones",
    heroDescription:
      "Travelling around Parramatta with a baby or young child shouldn't feel like a logistical puzzle. Whether you're heading to Westmead Hospital, catching a flight from Sydney Airport, or just need a dependable school run, Baby Seat Taxi Sydney has Parramatta covered.",
    image: { ...IMG.capsule, alt: "Baby seat taxi service in Parramatta" },
    intro: [
      "Every vehicle in our fleet comes fitted with certified child restraints, installed correctly, cleaned before every ride, and ready to go when you are. You don't need to bring your own seat, wrestle with unfamiliar clips, or hope for the best. We handle the safety side, you just handle the kids.",
      "There's no shortage of taxi and rideshare options in Parramatta, but most of them aren't set up for families travelling with babies and young children. A standard rideshare doesn't come with a fitted car seat, and a regular cab can't guarantee the right restraint for your newborn. That's exactly the gap we fill.",
      "We carry infant capsules (0-6 months) for newborns and rear-facing infant car seats (6 months-2 years) for babies who've outgrown the capsule, both properly harnessed and installed to Australian Standard AS/NZS 1754.",
    ],
    introItemsIntro: "Where we take Parramatta families:",
    introItems: [
      "Airport transfers - Parramatta to Sydney Airport, with return pickups available",
      "Westmead Hospital and Westmead Children's Hospital transfers and medical appointments",
      "School runs and childcare drop-offs",
      "Westfield Parramatta and everyday errands",
      "Events and family outings",
      "Cruise terminal transfers from Parramatta",
    ],
    features: [
      {
        title: "Certified Seats, Always Fitted Correctly",
        description:
          "Every child restraint meets Australian Standard AS/NZS 1754. Our drivers are trained in correct installation - before your trip, the seat is checked, secured and adjusted for your child's age and weight.",
      },
      {
        title: "Fixed Prices - No Surprises",
        description: "The fare you're quoted is the fare you pay. No surge pricing, no metered guesswork, no awkward moment at the end of the trip.",
      },
      {
        title: "24/7 Availability",
        description: "Whether it's a 3am hospital run or a 6am airport pickup, we're on the road - early morning, late night and public holidays.",
      },
    ],
    faq: [
      {
        question: "Do I need to bring my own baby seat?",
        answer:
          "No. Every booking includes the child restraint - you don't need to bring, carry or install anything yourself. Just tell us your child's age when you book and the correct seat will be ready in the vehicle.",
      },
      {
        question: "Do you service suburbs near Parramatta?",
        answer:
          "Yes. We regularly cover Rydalmere, Merrylands, Granville and the surrounding suburbs alongside Parramatta itself.",
      },
      {
        question: "Do you do airport runs from Parramatta?",
        answer: "Yes, we do Parramatta to Sydney Airport runs regularly, with return pickups available so you can book both legs in one go.",
      },
    ],
  },
  {
    slug: "baby-seat-taxi-blacktown",
    navLabel: "Baby Seat Taxi Blacktown",
    metaTitle: "Baby Seat Taxi Blacktown | Safe Family Rides 24/7",
    metaDescription:
      "Baby Seat Taxi Blacktown - certified child restraints to AS/NZS 1754, fixed fares and 24/7 availability for Blacktown Hospital, Sydney Airport and family trips across the Blacktown LGA.",
    eyebrow: "Blacktown",
    h1: "Baby Seat Taxi Blacktown - Certified Child Seats, Every Ride",
    heroDescription:
      "Blacktown is one of Western Sydney's biggest and most family-focused suburbs. Baby Seat Taxi Sydney covers Blacktown and the surrounding suburbs with every vehicle fitted with certified child restraints, correctly installed and matched to your child's age.",
    image: { ...IMG.capsule, alt: "Baby seat taxi service in Blacktown" },
    intro: [
      "Blacktown is home to more than 50,000 residents, and over half of all households here are families with children. Standard cabs and rideshare apps don't guarantee a fitted child seat, don't adjust the harness for your baby's weight, and don't arrive with a cleaned, correctly installed infant capsule already in the vehicle - that's where we're different.",
      "Every seat meets Australian Standard AS/NZS 1754, the standard set by Transport for NSW for child restraints in commercial vehicles. Our drivers know how child restraints work - they can explain the harness position, check the tether, and make sure your child is correctly seated before the vehicle moves.",
    ],
    introItemsIntro: "Where we take Blacktown families:",
    introItems: [
      "Blacktown to Sydney Airport and Western Sydney Airport, with return pickups available",
      "Blacktown Hospital and Westmead Hospital transfers and medical appointments",
      "School runs and childcare pickups across the Blacktown LGA",
      "Westpoint Shopping Centre and everyday suburb runs",
      "Nurragingy Reserve and family days out",
      "Cruise terminal transfers from Blacktown",
    ],
    features: [
      {
        title: "The Correct Seat Is Always in the Vehicle",
        description: "Tell us your child's age and weight at booking and we match the right restraint - infant capsule, rear-facing seat or forward-facing harness.",
      },
      {
        title: "Every Seat Meets AS/NZS 1754",
        description: "Our seats are certified, labelled and checked regularly against the Transport for NSW standard for child restraints in commercial vehicles.",
      },
      {
        title: "Fixed Fares, Available Around the Clock",
        description: "A quoted fare upfront with no surge pricing, plus 24/7 availability including weekends and public holidays.",
      },
    ],
    faq: [
      {
        question: "Do I need to bring my own car seat?",
        answer:
          "No. The child restraint is included with every booking - fitted, ready and matched to your child's age. Just tell us your child's age when you book and we'll handle the rest.",
      },
      {
        question: "Do you service suburbs around Blacktown?",
        answer:
          "Yes. We regularly cover Seven Hills, Toongabbie, Quakers Hill, Doonside, Rooty Hill, Kings Langley, Marayong and the wider Blacktown LGA.",
      },
      {
        question: "Do you travel from Blacktown to Sydney Airport?",
        answer: "Yes, we do this run regularly, with the correct seats fitted and return pickups available if you book both legs at once.",
      },
    ],
  },
  {
    slug: "baby-seat-taxi-liverpool",
    navLabel: "Baby Seat Taxi Liverpool",
    metaTitle: "Baby Seat Taxi Liverpool | Safe Family Rides 24/7",
    metaDescription:
      "Baby Seat Taxi Liverpool - certified AS/NZS 1754 child restraints, fixed fares and 24/7 availability for Liverpool Hospital, Western Sydney Airport and family trips.",
    eyebrow: "Liverpool",
    h1: "Baby Seat Taxi Liverpool - The Safe Way to Travel With Your Little Ones",
    heroDescription:
      "Liverpool is one of south-western Sydney's fastest growing areas, with a population of over 250,000 and a median age of just 33. Baby Seat Taxi Sydney covers Liverpool with certified child restraints matched to your child's age, installed correctly and cleaned before every ride.",
    image: { ...IMG.hospital, alt: "Baby seat taxi service in Liverpool" },
    intro: [
      "Liverpool Hospital is undergoing an $830 million redevelopment, the suburb sits just 25 minutes from Western Sydney Airport, and its proximity to the M5 and M7 makes it one of the most connected parts of south-western Sydney - all of which means families here need transport that actually works for them.",
      "Every seat we use meets Australian Standard AS/NZS 1754, the mandatory child restraint standard for commercial vehicles in NSW. Our drivers are trained in correct installation - the tether, the harness tension, the chest clip position - and they check every one before the vehicle moves.",
    ],
    introItemsIntro: "Where we take Liverpool families:",
    introItems: [
      "Liverpool to Western Sydney Airport (25 minutes) and Sydney Kingsford Smith Airport (45 minutes via the M5)",
      "Liverpool Hospital, Westmead Children's Hospital and Campbelltown Hospital transfers",
      "School runs across Liverpool's schools and childcare centres",
      "Westfield Liverpool and everyday errands",
      "Bigge Park and family days out",
      "Cruise terminal transfers via the M5",
    ],
    features: [
      {
        title: "Certified Child Restraints - Every Time",
        description: "Every vehicle assigned to Liverpool bookings is fitted with the correct restraint for your child's age before we leave for your pickup.",
      },
      {
        title: "Australian Standard AS/NZS 1754 Compliant",
        description: "Every seat we use meets the mandatory child restraint standard for commercial vehicles in NSW.",
      },
      {
        title: "Fixed Fares, 24 Hours a Day",
        description: "The fare you're quoted when you book is the fare you pay, with availability around the clock including NSW public holidays.",
      },
    ],
    faq: [
      {
        question: "Do I need to bring my own baby seat?",
        answer:
          "No. Every booking includes the child restraint, fitted, cleaned and matched to your child's age before we arrive at your Liverpool address. Just tell us your child's age when you book.",
      },
      {
        question: "Do you travel from Liverpool to the airport?",
        answer:
          "Yes. Liverpool sits less than 25 minutes from Western Sydney Airport and around 45 minutes from Sydney Kingsford Smith Airport via the M5 - both routes we do regularly with child seats included.",
      },
      {
        question: "Do you service suburbs around Liverpool?",
        answer: "Yes, including Casula, Moorebank, Prestons, Edmondson Park, Warwick Farm, Cabramatta and the wider City of Liverpool.",
      },
    ],
  },
  {
    slug: "baby-seat-taxi-penrith",
    navLabel: "Baby Seat Taxi Penrith",
    metaTitle: "Baby Seat Taxi Penrith | Baby Capsule & Child Seat Taxi Service",
    metaDescription:
      "Baby Seat Taxi Penrith - pre-booked baby capsules and child seats for Nepean Hospital, Sydney Airport, Penrith Panthers, Westfield Penrith and family trips.",
    eyebrow: "Penrith",
    h1: "Baby Seat Taxi Penrith",
    heroDescription:
      "Travelling with young children requires extra care, especially when it comes to safe and legal transportation. Our Baby Seat Taxi Penrith service provides families with reliable transport equipped with pre-booked baby capsules and child seats.",
    image: { ...IMG.family, alt: "Baby seat taxi service in Penrith" },
    intro: [
      "Whether you're travelling to Sydney Airport, Nepean Hospital, a family gathering or a local destination, our family-friendly taxi service helps parents travel without the hassle of carrying their own child restraint.",
      "We proudly serve families throughout Penrith and surrounding suburbs - Penrith CBD, South Penrith, Glenmore Park, Cranebrook, Kingswood, Emu Plains, Cambridge Park, Jordan Springs, Werrington and Orchard Hills - with professionally arranged child restraints suitable for newborns, infants and young children.",
    ],
    introItemsIntro: "Popular family destinations around Penrith we service:",
    introItems: ["Penrith Panthers", "Westfield Penrith", "Nepean River", "Sydney Zoo", "Western Sydney Parklands", "Penrith Lakes"],
    features: [
      {
        title: "Baby Capsules & Child Seats Available",
        description: "Baby capsules suitable for newborns and young infants requiring rear-facing travel, plus forward-facing child seats for toddlers and young children.",
      },
      {
        title: "Pre-Booked Child Restraints",
        description: "Your required child seat is arranged before pickup, so there's no uncertainty on the day.",
      },
      {
        title: "Airport Transfer Specialists",
        description: "Safe transport to and from Sydney Domestic and International Airports with flight monitoring and door-to-door transport.",
      },
    ],
    faq: [
      {
        question: "Can I pre-book a Baby Seat Taxi in Penrith?",
        answer: "Yes, advance bookings are recommended to ensure the correct child restraint is available.",
      },
      {
        question: "Do you offer Sydney Airport transfers from Penrith?",
        answer: "Yes, we provide Sydney Domestic and International Airport transfers from Penrith with baby capsules and child seats available.",
      },
      {
        question: "What information should I provide when booking?",
        answer: "Please let us know your child's age, the seat type needed and your pickup and destination details so we can prepare the correct vehicle.",
      },
    ],
  },
  {
    slug: "baby-seat-taxi-campbelltown",
    navLabel: "Baby Seat Taxi Campbelltown",
    metaTitle: "Baby Seat Taxi Campbelltown | Safe Child Car Seats",
    metaDescription:
      "Baby Seat Taxi Campbelltown - certified AS/NZS 1754 infant capsules and child seats, background-checked drivers and metro-wide coverage from Campbelltown.",
    eyebrow: "Campbelltown",
    h1: "Professional Baby Seat Taxi Services in Campbelltown",
    heroDescription:
      "We provide fully equipped taxis with certified baby capsules and approved child seats for safe, comfortable journeys with your little ones. When safety matters most, trust our experienced drivers and premium child restraint systems.",
    image: { ...IMG.hospital, alt: "Baby seat taxi service in Campbelltown" },
    intro: [
      "Every baby capsule and child seat in our Campbelltown fleet meets strict Australian and New Zealand safety regulations (AS/NZS 1754), with monthly safety inspections and regular cleaning to maintain hygiene and functionality.",
      "Our service extends throughout inner Campbelltown - CBD, Bradbury, Airds, Leumeah, Englefield - and the greater Campbelltown region including Minto, Narellan, Camden and Picton. Need a ride from Campbelltown to other Sydney areas? We operate metro-wide with fully equipped vehicles.",
    ],
    introItemsIntro: "Perfect for Campbelltown families:",
    introItems: [
      "Hospital trips - safe transportation for newborns from hospital to home",
      "Doctor appointments",
      "Childcare & school runs",
      "Family days out - shopping, parks and activities across Sydney",
      "Airport transfers",
      "Emergency situations - when your car isn't available",
    ],
    features: [
      {
        title: "Certified Infant Capsules (0-12 Months)",
        description: "Rear-facing design protects head and neck, with a harness system that keeps baby safely secured and compatibility with most pram systems.",
      },
      {
        title: "Approved Child Seats (1-5 Years)",
        description: "Forward-facing installation with multi-point harness systems and padded seating for comfort on longer trips.",
      },
      {
        title: "Background-Checked, Trained Drivers",
        description: "Professional drivers with child safety training and years of experience transporting families safely across Campbelltown.",
      },
    ],
    faq: [
      {
        question: "Do I need to provide my own child seat?",
        answer: "No! Our Campbelltown taxis come equipped with certified capsules and child seats. You don't need to bring anything.",
      },
      {
        question: "Can I use Baby Seat Taxi for long-distance trips from Campbelltown?",
        answer: "Yes, we operate metro-wide with fully equipped vehicles for trips beyond Campbelltown.",
      },
      {
        question: "Is your service available 24/7?",
        answer: "Yes, our Campbelltown service is available 24 hours a day for both scheduled and on-demand journeys.",
      },
    ],
  },
  {
    slug: "baby-seat-taxi-chatswood",
    navLabel: "Baby Seat Taxi Chatswood",
    metaTitle: "Baby Seat Taxi Chatswood | Safe Capsule & Child Seats",
    metaDescription:
      "Baby Seat Taxi Chatswood - certified AS/NZS 1754 infant capsules and child seats, WWCC-checked drivers and North Shore coverage from Chatswood.",
    eyebrow: "Chatswood",
    h1: "Professional Baby Seat Taxi Services in Chatswood",
    heroDescription:
      "We provide fully equipped taxis with certified infant capsules and approved child seats for safe, comfortable journeys with your little ones, serving the North Shore community with trusted child restraint systems.",
    image: { ...IMG.family, alt: "Baby seat taxi service in Chatswood" },
    intro: [
      "Every infant capsule and child seat in our Chatswood fleet exceeds Australian and New Zealand safety regulations (AS/NZS 1754), with monthly safety inspections, weekly cleaning and sanitisation between each use.",
      "We service central Chatswood - CBD, Shopping Centre District, Willoughby - and the greater Chatswood region including Lane Cove, Artarmon, St Leonards, Crows Nest, Neutral Bay and Mosman. Need transport beyond the North Shore? We operate metro-wide.",
    ],
    introItemsIntro: "Perfect for Chatswood families:",
    introItems: [
      "Newborn hospital discharge - safe first journey home with a certified capsule",
      "Medical appointments - paediatrician visits and specialist consultations",
      "Childcare & school runs",
      "Chatswood Chase and Macquarie Centre shopping visits with kids",
      "Airport transfers",
      "CBD commutes with children safely cared for",
    ],
    features: [
      {
        title: "Certified Infant Capsules (0-12 Months)",
        description: "Rear-facing installation with a five-point harness, Isofix-compatible capsules and climate-controlled taxi interiors.",
      },
      {
        title: "Approved Child Seats (1-5 Years)",
        description: "Forward-facing installation with side-impact protection and a height-adjustable headrest that follows your child's growth.",
      },
      {
        title: "Trained, Vetted Drivers",
        description: "All drivers complete a Working with Children Check, First Aid & CPR certification and child passenger safety training.",
      },
    ],
    faq: [
      {
        question: "Do I need to provide my own baby seat?",
        answer: "No! Our Chatswood taxis come fully equipped with certified infant capsules and child seats. You don't need to bring anything except your little one.",
      },
      {
        question: "Can I use Baby Seat Taxi for longer trips outside Chatswood?",
        answer: "Yes, we operate metro-wide with fully equipped vehicles serving all Sydney areas.",
      },
      {
        question: "Are your drivers trained in child safety?",
        answer: "Yes, all drivers complete a Working with Children Check, First Aid & CPR certification and child passenger safety training.",
      },
    ],
  },
  {
    slug: "baby-seat-taxi-bondi",
    navLabel: "Baby Seat Taxi Bondi",
    metaTitle: "Baby Seat Taxi Bondi | Safe Capsule & Child Seats",
    metaDescription:
      "Baby Seat Taxi Bondi - certified AS/NZS 1754 infant capsules and child seats for Bondi Beach, Bondi Junction and the Eastern Suburbs, with WWCC-checked drivers.",
    eyebrow: "Bondi",
    h1: "Professional Baby Seat Taxi Services in Bondi",
    heroDescription:
      "We provide fully equipped taxis with certified infant capsules and approved child seats for safe, comfortable journeys, serving Bondi's vibrant young families with trusted child restraint systems and drivers who understand the Eastern Suburbs lifestyle.",
    image: { ...IMG.family, alt: "Baby seat taxi service in Bondi" },
    intro: [
      "Every infant capsule and child seat in our Bondi fleet exceeds Australian and New Zealand safety regulations (AS/NZS 1754), with monthly safety inspections, weekly professional cleaning and sanitisation between each use.",
      "We service central Bondi - Bondi Beach, Bondi Junction, Oxford Street, Waverley, Tamarama - and the greater Eastern Suburbs including Coogee, Bronte, Double Bay, Woollahra and Rose Bay. Need transport beyond Bondi? We operate metro-wide.",
    ],
    introItemsIntro: "Perfect for Bondi families:",
    introItems: [
      "Newborn hospital discharge - safe first journey home from RPA or St Vincent's",
      "Beach days - Bondi Beach to Tamarama and Coogee with properly secured kids",
      "Medical appointments and childcare & preschool runs",
      "Oxford Street and Westfield Bondi shopping",
      "Sydney Airport transfers",
      "CBD commutes with children safely cared for",
    ],
    features: [
      {
        title: "Certified Infant Capsules (0-12 Months)",
        description: "Rear-facing installation for optimal neck and spinal support, with Isofix-compatible models for enhanced stability.",
      },
      {
        title: "Approved Child Seats (1-5 Years)",
        description: "Forward-facing installation with side-impact protection, built for beach trips, shopping and Eastern Suburbs adventures.",
      },
      {
        title: "Trained, Vetted Drivers",
        description: "All drivers complete a Working with Children Check, First Aid & CPR certification and child passenger safety training.",
      },
    ],
    faq: [
      {
        question: "Do I need to provide my own baby seat or capsule?",
        answer: "No! Our Bondi taxis come fully equipped with certified infant capsules and child seats. You don't need to bring anything except your little one.",
      },
      {
        question: "Are the seats clean and hygienic, especially after beach trips?",
        answer: "Yes, all seats undergo monthly safety inspections, weekly professional cleaning and sanitisation between each use.",
      },
      {
        question: "Do you operate 24/7 in Bondi?",
        answer: "Yes, we're available for scheduled and on-demand journeys around the clock, including early morning and evening availability.",
      },
    ],
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return servicePages.find((page) => page.slug === slug);
}
