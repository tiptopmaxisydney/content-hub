import type { Metadata } from "next";
import Link from "next/link";
import LandingHero from "@/components/pages/LandingHero";
import FeatureGrid from "@/components/pages/FeatureGrid";
import StepsList from "@/components/pages/StepsList";
import SpecFleetGrid from "@/components/pages/SpecFleetGrid";
import ServiceAreaGrid from "@/components/pages/ServiceAreaGrid";
import ReviewsGrid from "@/components/pages/ReviewsGrid";
import ServiceFaq from "@/components/pages/ServiceFaq";
import FinalCta from "@/components/home/FinalCta";
import { siteConfig } from "@/lib/siteConfig";
import type { Faq } from "@/lib/homeData";

const PAGE_URL = `${siteConfig.url}/western-sydney-airport-transfers/`;

export const metadata: Metadata = {
  title: "Western Sydney Airport Transfers",
  description:
    "Fixed-price transfers to and from Western Sydney International Airport (Badgerys Creek). Flight monitoring, meet & greet, wheelchair and baby seat options, available 24/7.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Western Sydney Airport Transfers | TipTop Maxi Sydney",
    description:
      "Fixed-price transfers to and from Western Sydney International Airport (Badgerys Creek). Flight monitoring, meet & greet, wheelchair and baby seat options, available 24/7.",
    url: PAGE_URL,
    type: "article",
  },
};

const quickStrip = [
  { icon: "⚡", title: "No Surge Pricing, Ever" },
  { icon: "🛡", title: "Fully Insured & Licensed" },
  { icon: "⏱", title: "On-Time Guarantee" },
  { icon: "👥", title: "Group Travel Specialists" },
];

const whyDifferent = [
  {
    icon: "📡",
    title: "Real-Time Flight Monitoring",
    description:
      "Your driver watches your flight status live. If it's delayed, we adjust automatically, so you're never left waiting, and neither are we.",
  },
  {
    icon: "💰",
    title: "Fixed, Transparent Pricing",
    description:
      "The price you're quoted is the price you pay. No surge rates during peak travel, no hidden fees, no meter running while you're stuck in traffic.",
  },
  {
    icon: "⏱",
    title: "24/7 Availability",
    description:
      "Early departures, late arrivals, overnight trips — we operate around the clock, seven days a week, including public holidays and Christmas.",
  },
  {
    icon: "💌",
    title: "Meet & Greet at Arrivals",
    description:
      "Your driver meets you inside the terminal with a name board and helps with bags. Ideal after a long-haul flight when you just want to get moving.",
  },
  {
    icon: "🚌",
    title: "Spacious Fleet for Every Group",
    description:
      "From a solo business traveller to a family of ten with mountains of luggage, we have a vehicle that fits your party comfortably, every time.",
  },
  {
    icon: "♿",
    title: "NDIS & Disability Support",
    description:
      "Our wheelchair-accessible vehicles and trained drivers ensure every passenger, regardless of mobility needs, can travel with full dignity.",
  },
];

const airportFacts = [
  { icon: "📍", text: "Located in Badgerys Creek, suburb of Luddenham, Western Sydney" },
  { icon: "⏱", text: "Approx. 35–55 min drive from Parramatta, Liverpool, Penrith & Campbelltown" },
  { icon: "✈", text: "24-hour airport with no noise curfew, unlike Kingsford Smith" },
  { icon: "📈", text: "Purpose-built for growth, projected 10M+ passengers per year at capacity" },
  { icon: "📝", text: "Pre-booking strongly recommended, pick-up zones are strictly enforced" },
];

const preBookStats = [
  { value: "$0", label: "Surge pricing ever. You get a fixed quote upfront." },
  { value: "100%", label: "On-time arrival commitment or we'll refund your booking fee." },
  { value: "5 min", label: "Average time to confirm your booking online or by phone." },
  { value: "24/7", label: "Live phone support for last-minute changes and flight queries." },
];

const pickupFeatures = [
  {
    icon: "📡",
    title: "Live Flight Monitoring",
    description:
      "We track your flight number in real time. Whether you land early or touch down late, your driver adjusts automatically. You don't need to call us, we're already across it.",
  },
  {
    icon: "✈",
    title: "Meet & Greet at Arrivals",
    description:
      "Your driver waits inside the arrivals terminal with a name board. No circling the pick-up zone, no awkward phone calls, just walk out and you're done.",
  },
  {
    icon: "📦",
    title: "Luggage Assistance",
    description:
      "Our drivers help load every bag at no extra charge. Especially helpful for families travelling with prams, elderly passengers, or anyone with heavy luggage.",
  },
  {
    icon: "📍",
    title: "Real-Time Driver Tracking",
    description:
      "Know exactly where your driver is before you land. Share the tracking link with family or colleagues so everyone stays in the loop without a single phone call.",
  },
];

const dropoffFeatures = [
  {
    icon: "⏱",
    title: "Early Morning Departures",
    description:
      "We run 24 hours a day, so 4am pickups are no problem at all. Your driver will be there awake, on time, and ready to load the bags without complaint.",
  },
  {
    icon: "👪",
    title: "Family Travel",
    description:
      "Car seats, booster seats, prams, and three weeks' worth of luggage, we've got you covered. Our maxi taxis seat families of all sizes in genuine comfort.",
  },
  {
    icon: "💼",
    title: "Business Travel",
    description:
      "A quiet, professional ride so you can prepare for your flight in peace. Drivers know when to keep conversation light or skip it entirely.",
  },
  {
    icon: "👥",
    title: "Group Travel",
    description:
      "Sports teams, conference groups, holiday parties, we co-ordinate multi-vehicle bookings to get everyone to the terminal together and on time.",
  },
];

const fleet = [
  {
    icon: "🚘",
    badge: "1–4 Passengers",
    title: "Sedan",
    specs: ["👥 Up to 4 pax", "🧰 2–3 bags"],
    features: ["Air conditioning", "Comfortable seating", "Best for solo & couple travel"],
    ctaLabel: "Book Sedan",
  },
  {
    icon: "🚗",
    badge: "5–7 Passengers",
    title: "SUV / Maxi SUV",
    specs: ["👥 Up to 7 pax", "🧰 5–7 bags"],
    features: ["Generous luggage space", "Great for families", "Spacious, comfortable interior"],
    ctaLabel: "Book SUV",
  },
  {
    icon: "🚌",
    badge: "⭐ Most Popular",
    title: "Maxi Taxi",
    specs: ["👥 Up to 11 pax", "🧰 Up to 11 bags"],
    features: ["Sydney's largest passenger maxi", "Groups, families & tours", "Airport-grade luggage space"],
    ctaLabel: "Book Maxi Taxi",
  },
  {
    icon: "♿",
    badge: "Accessible",
    title: "Wheelchair Accessible Taxi",
    specs: ["👥 4–6 pax", "♿ 1–2 chairs"],
    features: ["Hydraulic ramp fitted", "Specially trained drivers", "Book WAV"],
    ctaLabel: "Book WAV",
  },
  {
    icon: "👶",
    badge: "Family Safe",
    title: "Baby Seat Taxi",
    specs: ["👥 Up to 4 pax", "👶 Infant–booster"],
    features: ["Certified child restraints", "Infant, toddler & booster options", "Family-trained drivers"],
    ctaLabel: "Book Baby Seat Taxi",
  },
];

const whoWeServe = [
  { icon: "👨‍👩‍👧‍👦", title: "Families", description: "Safe airport transfers with baby seats, extra luggage space, and family-friendly vehicles." },
  { icon: "💼", title: "Corporate Travellers", description: "Reliable, fixed-price transport for business travellers and executive airport transfers." },
  { icon: "🌏", title: "Tourists & Visitors", description: "Convenient transfers between Western Sydney Airport, hotels, attractions, and Sydney destinations." },
  { icon: "♿", title: "NDIS Participants", description: "Wheelchair-accessible vehicles and supportive transport services for passengers with mobility needs." },
  { icon: "👥", title: "Group Travellers", description: "Maxi taxis and minibuses for families, events, conferences, and larger groups travelling together." },
  { icon: "🚢", title: "Cruise Passengers", description: "Seamless transfers between Sydney cruise terminals, Western Sydney Airport, and surrounding regions." },
];

const steps = [
  { title: "Book Online or Call", description: `Use our booking portal or call ${siteConfig.phoneLocalDisplay}. Provide your flight number and we handle everything from there.` },
  { title: "Get Instant Confirmation", description: "You'll receive a booking confirmation via SMS and email with your driver's name, vehicle, and contact details." },
  { title: "We Track Your Flight", description: "Our dispatch team monitors your flight live. Delays or early arrivals are handled automatically, no need to call us." },
  { title: "Meet Your Driver", description: "Your driver greets you in arrivals with a name board, assists with luggage, and has the vehicle ready to go." },
  { title: "Arrive in Comfort", description: "Sit back and enjoy a smooth, direct ride to your destination, fixed price, no detours, no drama whatsoever." },
];

const serviceAreas = [
  { name: "Parramatta", note: "~30 min to Western Sydney Airport" },
  { name: "Blacktown", note: "~35 min to Western Sydney Airport" },
  { name: "Liverpool", note: "~25 min to Western Sydney Airport" },
  { name: "Penrith", note: "~35 min to Western Sydney Airport" },
  { name: "Campbelltown", note: "~30 min to Western Sydney Airport" },
  { name: "Bankstown", note: "~30 min to Western Sydney Airport" },
  { name: "Sydney CBD", note: "~45–55 min to Western Sydney Airport" },
];

const reviews = [
  {
    quote:
      "Booked a maxi taxi for our family of seven flying out of Western Sydney. The driver was on time, helped with every bag, and had the kids laughing the whole way. Honestly the easiest airport run we've ever done.",
    name: "Sarah R.",
    location: "Parramatta · Verified Google Review",
  },
  {
    quote:
      "Flight was delayed by two hours and the driver was still waiting when I came through arrivals. No extra charge, no attitude — just professional service. Won't use anyone else for Western Sydney Airport.",
    name: "Daniel M.",
    location: "Liverpool · Verified Google Review",
  },
  {
    quote:
      "We needed a wheelchair accessible taxi with short notice for my mother's international flight. TipTop had a vehicle available, the driver was absolutely fantastic. Genuinely stress-free.",
    name: "Anita P.",
    location: "Campbelltown · Verified Google Review",
  },
];

const faqs: Faq[] = [
  {
    question: "How do I book a Western Sydney Airport transfer?",
    answer: `Book online at ${siteConfig.bookingUrl.replace("https://", "")} or call ${siteConfig.phoneLocalDisplay}. You'll need your pickup address, destination, travel date, time, and flight number. The whole process takes under five minutes and you'll receive instant confirmation via SMS and email.`,
  },
  {
    question: "Do you offer fixed pricing for Western Sydney Airport transfers?",
    answer: "Yes. Every Western Sydney Airport transfer is fixed price. The quote you receive at booking is exactly what you pay. No surge pricing during peak travel times, no hidden fees, and no unpleasant surprises when you arrive.",
  },
  {
    question: "Do you monitor flights for delays and early arrivals?",
    answer: "Absolutely. Our dispatch team tracks your flight in real time using the flight number you provide at booking. If your flight is delayed, your driver's arrival is automatically adjusted.",
  },
  {
    question: "Where exactly is Western Sydney International Airport located?",
    answer: "Western Sydney International Airport (Nancy-Bird Walton Airport) is in Badgerys Creek, in the suburb of Luddenham. It's approximately 55km west of Sydney CBD, about 30 min from Parramatta, 25 min from Liverpool, 35 min from Penrith, and 35 min from Campbelltown.",
  },
  {
    question: "Do you provide wheelchair accessible taxis to Western Sydney Airport?",
    answer: "Yes. We operate Wheelchair Accessible Vehicles (WAVs) fitted with hydraulic ramps and trained drivers experienced with passengers who have mobility needs. We're not an NDIS registered provider and don't process NDIS-funded invoicing, NDIS cards or Cabcharge, but NDIS participants are welcome to book and pay using any of our standard accepted payment methods.",
  },
  {
    question: "Do you have baby seats and child restraints available?",
    answer: "Yes. Our Baby Seat Taxis carry certified infant seats, toddler seats, and booster seats. Please specify your child's age and approximate weight when booking so we can fit the correct restraint.",
  },
  {
    question: "What size vehicles are available?",
    answer: "Our maxi taxis carry up to 11 passengers plus luggage, ideal for large families, groups, and teams. Maxi SUVs seat up to 7 passengers. If your group is larger than 11, we can co-ordinate multiple vehicles.",
  },
  {
    question: "How far in advance should I book my airport transfer?",
    answer: "We recommend booking at least 24 hours in advance to guarantee your preferred vehicle. For very early flights, wheelchair accessible vehicles, or multi-vehicle group bookings, 48–72 hours ahead is advisable.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept cash, credit and debit cards, bank transfer, and secure online payments. Corporate account billing can be arranged for regular business travellers. We do not accept Cabcharge or NDIS cards.",
  },
  {
    question: "Do you operate 24 hours a day, including public holidays?",
    answer: "Yes. 24 hours a day, 7 days a week, 365 days a year, including Christmas Day, New Year's Day, Easter Sunday, and all NSW public holidays. We do not apply public holiday surcharges beyond our standard fixed pricing.",
  },
];

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": PAGE_URL,
  url: PAGE_URL,
  name: "Western Sydney Airport Transfers | TipTop Maxi Sydney",
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  inLanguage: "en-AU",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Western Sydney Airport Transfers" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function WesternSydneyAirportTransfersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <LandingHero
        eyebrow="WESTERN SYDNEY AIRPORT TRANSFERS"
        title="Your Transfer to Western Sydney Airport, Sorted."
        description="Fixed-price airport transfers, seven days a week. We track your flight, meet you at arrivals, and get you where you need to go, no fuss, no surprises on price."
        badges={["Fixed Prices, No Surprises", "Via Toll-Free M12 & M7", "Live Flight Monitoring", "24/7 Available"]}
      />

      <FeatureGrid items={quickStrip} compact />

      <FeatureGrid
        eyebrow="Why TipTop Maxi Sydney"
        title="What Makes Us Different"
        subtitle="We've been moving Sydney families, business travellers, and groups for years, and we think that experience shows."
        items={whyDifferent}
      />

      <section className="svc-section">
        <div className="svc-section-inner">
          <div className="svc-grid-2">
            <div className="svc-prose">
              <span className="tt-feature-eyebrow" style={{ textAlign: "left" }}>
                Airport Information
              </span>
              <h2>Western Sydney International Airport &mdash; What You Need to Know</h2>
              <p>
                Western Sydney International Airport, officially named Nancy-Bird Walton Airport, is located in
                Badgerys Creek, about 55 kilometres west of Sydney CBD. It&apos;s Australia&apos;s first
                greenfield international airport in more than 50 years, purpose-built for 24-hour operations from
                day one.
              </p>
              <p>
                For residents and businesses across Western Sydney, it changes the game entirely. No more
                fighting the congestion around Mascot. Once fully operational, it serves domestic routes as well
                as international connections across Asia, the Pacific, and beyond.
              </p>
              <ul>
                {airportFacts.map((fact) => (
                  <li key={fact.text}>
                    {fact.icon} {fact.text}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ marginBottom: 20 }}>Why Pre-Book Your Transfer?</h3>
              <div className="tt-final-stats" style={{ marginBottom: 24 }}>
                {preBookStats.map((stat) => (
                  <div className="tt-final-stat" key={stat.value + stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
              <a href={siteConfig.bookingUrl} className="tt-btn tt-btn-call" target="_blank" rel="noreferrer">
                Pre-Book Your Ride <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <FeatureGrid
        eyebrow="Airport Pickup"
        title="Arriving at Western Sydney Airport?"
        subtitle="Long-haul travel is tiring enough before you have to worry about transport. Our pickup service takes that stress completely off your plate, from the moment your wheels hit the tarmac."
        items={pickupFeatures}
      />

      <FeatureGrid
        eyebrow="Airport Drop-Off"
        title="Heading to Western Sydney Airport?"
        subtitle="Forget expensive long-term parking and the stress of navigating unfamiliar airport roads. We pick you up from your door and have you at the terminal with time to spare."
        items={dropoffFeatures}
        theme="dark"
      />

      <SpecFleetGrid
        eyebrow="Our Fleet"
        title="A Vehicle for Every Journey"
        subtitle="Solo traveller or a group of eleven — choose the vehicle that fits your trip."
        items={fleet}
      />

      <FeatureGrid
        eyebrow="Who We Serve"
        title="Built for Every Kind of Traveller"
        subtitle="Choose the service that best matches your travel needs across Western Sydney Airport."
        items={whoWeServe}
      />

      <StepsList
        eyebrow="How It Works"
        title="Five Steps to a Stress-Free Transfer"
        subtitle="From booking to destination, here's exactly what to expect when you travel with TipTop Maxi Sydney."
        steps={steps}
        ctaLabel="Start Booking Now"
        ctaHref={siteConfig.bookingUrl}
      />

      <ServiceAreaGrid
        eyebrow="Service Areas"
        title="Western Sydney Airport Transfers, Everywhere You Need"
        subtitle="We cover all major suburbs across Greater Sydney. Don't see yours? Just call, chances are we already service it."
        areas={serviceAreas}
      />

      <ReviewsGrid
        eyebrow="Customer Reviews"
        title="What Our Passengers Are Saying"
        rating="4.9"
        ratingLabel="Outstanding — based on 200+ verified reviews"
        reviews={reviews}
      />

      <section className="svc-section">
        <div className="svc-section-inner">
          <div className="svc-prose" style={{ textAlign: "center" }}>
            <p>
              Looking for a specific vehicle or route? See our dedicated guides:{" "}
              <Link href="/western-sydney-airport-transfers/western-sydney-airport-suv-transfers/">SUV Transfers</Link>,{" "}
              <Link href="/western-sydney-airport-transfers/western-sydney-airport-maxi-taxi/">Maxi Taxi</Link>,{" "}
              <Link href="/western-sydney-airport-transfers/western-sydney-airport-taxi/">Standard Taxi</Link>,{" "}
              <Link href="/western-sydney-airport-transfers/western-sydney-airport-to-sydney-cbd/">to Sydney CBD</Link>,{" "}
              <Link href="/western-sydney-airport-transfers/western-sydney-airport-baby-seat-taxi/">Baby Seat Taxi</Link>{" "}
              and{" "}
              <Link href="/western-sydney-airport-transfers/western-sydney-airport-wheelchair-taxi/">Wheelchair Taxi</Link>.
            </p>
          </div>
        </div>
      </section>

      <ServiceFaq
        title="Frequently Asked Questions"
        faqs={faqs}
        bgImage="/images/deals-bg.jpg"
      />

      <FinalCta
        title="Get to Western Sydney Airport Without the Stress"
        description="Fixed price. Professional driver. Flight monitoring included. Book your transfer in minutes, online or over the phone."
      />
    </>
  );
}
