import type { Metadata } from "next";
import Link from "next/link";
import LandingHero from "@/components/pages/LandingHero";
import FeatureGrid from "@/components/pages/FeatureGrid";
import CheckListSection from "@/components/pages/CheckListSection";
import ReviewsGrid from "@/components/pages/ReviewsGrid";
import RelatedLinks from "@/components/pages/RelatedLinks";
import ServiceFaq from "@/components/pages/ServiceFaq";
import FinalCta from "@/components/home/FinalCta";
import Fleet from "@/components/home/Fleet";
import { siteConfig } from "@/lib/siteConfig";
import type { Faq } from "@/lib/homeData";

const PAGE_URL = `${siteConfig.url}/western-sydney-airport-transfers/western-sydney-airport-taxi/`;

export const metadata: Metadata = {
  title: "Western Sydney Airport Taxi Transfers",
  description:
    "Fixed fares, real drivers who know the M12 and Elizabeth Drive back roads, and vehicles big enough for the whole crew, from a single sedan to an 11-seat maxi taxi.",
  alternates: { canonical: PAGE_URL },
};

const quickStrip = [
  { icon: "⚡", title: "No Surge Pricing, Ever" },
  { icon: "🛡", title: "Fully Insured & Licensed" },
  { icon: "⏱", title: "On-Time Guarantee" },
  { icon: "👥", title: "Group Travel Specialists" },
];

const knowStats = [
  { value: "~45 min", label: "From Sydney CBD via the M12 (traffic dependent)" },
  { value: "~20 min", label: "From Penrith and the Nepean area" },
  { value: "1–11", label: "Passengers per booking, one fixed price" },
];

const whyChoose = [
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
];

const included = [
  "Flight monitoring included, adjusted for delays or early arrivals",
  "Driver details sent before you land",
  "Pickup at the terminal's designated rideshare/taxi zone once confirmed",
  "Direct contact with your driver after landing",
];

const goodToKnow = [
  "No meet-and-greet service inside the terminal",
  "No waiting inside airport buildings",
  "Exact terminal pickup zones will be confirmed as Bradfield finalises operations",
  "We recommend booking 24 hours ahead for early flights or large groups",
];

const whoUses = [
  { icon: "💼", title: "Business & Corporate Travellers", description: "Delegates, executives, and conference attendees who need to be somewhere on time. Fixed pricing makes expense reporting simple." },
  { icon: "👨‍👩‍👧‍👦", title: "Families Returning from Overseas", description: "A family with checked luggage and a toddler after a long-haul international flight. One vehicle, door-to-door, everyone sits down." },
  { icon: "🌏", title: "International Tourists", description: "Visitors flying into WSI heading to CBD hotels. A pre-booked transfer removes every point of uncertainty about reaching the city." },
  { icon: "👥", title: "Groups & Teams", description: "Sports teams, conference delegations, wedding guests arriving together, one maxi taxi, one driver, one fixed price." },
  { icon: "♿", title: "NDIS & Accessibility Passengers", description: "Passengers requiring wheelchair-accessible vehicles. Pre-booking guarantees the right vehicle is waiting." },
  { icon: "🚢", title: "Cruise Passengers", description: "Passengers flying in and heading to Sydney's cruise terminals at White Bay or Barangaroo via the CBD." },
];

const whyUs = [
  { icon: "💰", title: "One Fixed Price — No Exceptions", description: "The fare is agreed at booking. Early morning, public holiday, wet weather, peak hour, the price doesn't change." },
  { icon: "🛰️", title: "Flight Monitoring, Always On", description: "Your driver tracks your flight from wheels-up. A two-hour delay means your driver arrives two hours later." },
  { icon: "🪧", title: "Meet & Greet Every Time", description: "Name board at arrivals. Luggage assistance. Escort to the vehicle. It's how every airport pickup works with us." },
  { icon: "🕐", title: "24/7 - Including Curfew-Free Flights", description: "Western Sydney Airport runs 24 hours with no curfew. That means 3am arrivals and 5am departures are real." },
  { icon: "🚐", title: "Right Vehicle for Every Group", description: "Sedan, SUV, Maxi Taxi, Wheelchair Accessible, Baby Seat, one vehicle for every party size and requirement." },
  { icon: "📞", title: "Real People Answer", description: "Call and a person picks up. Not a chatbot, not a hold queue. Especially useful for last-minute changes." },
];

const reviews = [
  { quote: "Flew into Western Sydney Airport from Singapore. TipTop had a driver waiting with a name board before I even got to the exit doors. Bags in the car, straight on the motorway, at our CBD hotel in under an hour.", name: "James C.", location: "Sydney CBD Hotel · Verified Google Review" },
  { quote: "Booked a maxi taxi from Western Sydney Airport to our Barangaroo office for a client delegation of eight. Flight came in 40 minutes early and the driver was already there waiting.", name: "Sarah K.", location: "Barangaroo, Sydney CBD · Verified Google Review" },
  { quote: "The 4am CBD pickup for our early morning departure was seamless. Driver was there on time, helped with all five bags, and got us to Western Sydney Airport comfortably.", name: "Rachel L.", location: "Darling Harbour · Verified Google Review" },
];

const related = [
  { icon: "✈️", title: "All WSI Airport Transfers", description: "Complete transfer guide for Western Sydney Airport, all vehicle types, all destinations across Sydney.", href: "/western-sydney-airport-transfers/" },
  { icon: "🚐", title: "WSI Airport Maxi Taxi", description: "Group transfers to and from WSI Airport, up to 11 passengers, one fixed fare.", href: "/western-sydney-airport-transfers/western-sydney-airport-maxi-taxi/" },
  { icon: "🛫", title: "Sydney Airport Transfers", description: "Kingsford Smith Airport (SYD) pickups and drop-offs, all vehicle types, all hours.", href: "/taxi-services/sydney-airport-transfer/" },
  { icon: "♿", title: "Wheelchair Accessible Taxi", description: "WAV transfers to and from WSI Airport and Sydney CBD. Advance booking recommended.", href: "/western-sydney-airport-transfers/western-sydney-airport-wheelchair-taxi/" },
];

const faqs: Faq[] = [
  { question: "Is Western Sydney Airport open yet?", answer: "Western Sydney International (Nancy-Bird Walton) Airport at Bradfield is scheduled to start commercial flights in late 2026. We're taking pre-bookings now." },
  { question: "How much does a taxi to Western Sydney Airport cost?", answer: "It depends on distance, vehicle size and time of travel. We give you a fixed price before you book, so you know the exact cost in advance, tolls and the airport access fee included." },
  { question: "Can I book a maxi taxi for a group?", answer: "Yes. Our maxi taxis take up to 11 passengers with luggage, useful for families, teams and site crews travelling together instead of booking multiple cars." },
  { question: "Do you have wheelchair accessible vehicles?", answer: "Yes, fitted with ramps and secure restraints, with drivers trained to assist safely on and off the vehicle." },
  { question: "Can you supply a baby seat?", answer: "Yes, let us know your child's age when you book and we'll fit the appropriate capsule, seat or booster in advance." },
  { question: "How early should I book my transfer?", answer: "For early morning flights, large groups or accessible vehicles, book at least 24 hours ahead. Otherwise, we take same-day bookings whenever a vehicle is free." },
  { question: "Do you monitor flight arrivals?", answer: "Yes, we monitor flight schedules to adjust pickup times if your flight arrives early or is delayed." },
  { question: "What payment methods do you accept?", answer: "Cash, credit and debit cards, bank transfer, corporate accounts and secure online payments. We're not an NDIS registered provider, so NDIS-funded invoicing and NDIS cards aren't accepted, but NDIS participants are welcome to book." },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Western Sydney Airport Transfers", item: `${siteConfig.url}/western-sydney-airport-transfers/` },
    { "@type": "ListItem", position: 3, name: "Taxi" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
};

export default function WesternSydneyAirportTaxiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <LandingHero
        eyebrow="WESTERN SYDNEY AIRPORT TRANSFERS"
        title="A taxi to Western Sydney Airport that turns up when it says it will."
        description="Fixed fares, real drivers who know the M12 and Elizabeth Drive back roads, and vehicles big enough for the whole crew, from a single sedan to an 11-seat maxi taxi with room for the luggage everyone forgot they packed."
        badges={quickStrip.map((q) => q.title)}
      />

      <FeatureGrid items={quickStrip} compact />

      <section className="svc-section">
        <div className="svc-section-inner">
          <div className="svc-grid-2">
            <div className="svc-prose">
              <span className="tt-feature-eyebrow" style={{ textAlign: "left" }}>Know Before You Go</span>
              <h2>Western Sydney Airport is new. Getting there shouldn&apos;t feel like guesswork.</h2>
              <p>
                Western Sydney International (Nancy-Bird Walton) Airport is being built at Bradfield, in the
                Badgerys Creek precinct, and is set to take its first commercial flights in late 2026. We&apos;ve
                already been driving the M12, the upgraded Elizabeth Drive and the local back roads around
                Luddenham and Bringelly for our regular Western Sydney customers, so when the terminal opens,
                we&apos;re not learning the route, we&apos;re just adding a destination.
              </p>
            </div>
            <div className="tt-final-stats">
              {knowStats.map((stat) => (
                <div className="tt-final-stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Fleet />

      <CheckListSection title="The unglamorous details that actually make a transfer good." items={whyChoose} />

      <section className="svc-section">
        <div className="svc-section-inner">
          <span className="tt-feature-eyebrow" style={{ textAlign: "left" }}>Important Travel Information</span>
          <h2 style={{ marginBottom: 32 }}>How airport pickups will work at Bradfield.</h2>
          <div className="svc-grid-2">
            <div>
              <h3 style={{ marginBottom: 14 }}>What&apos;s included</h3>
              <ul className="tt-why-list">
                {included.map((item) => (
                  <li key={item}><i className="fa-solid fa-circle-check" aria-hidden="true" /> {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ marginBottom: 14 }}>Good to know</h3>
              <ul className="tt-why-list">
                {goodToKnow.map((item) => (
                  <li key={item}><i className="fa-solid fa-circle-info" aria-hidden="true" /> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FeatureGrid
        eyebrow="Who Uses This Route"
        title="Who Books the WSI Airport Transfer"
        subtitle="This route has a specific mix of travellers. Here's who we see most often, and why the transfer works so well for each group."
        items={whoUses}
      />

      <FeatureGrid
        eyebrow="Why TipTop Maxi Sydney"
        title="Why Travellers Choose Us"
        subtitle="There will be plenty of options on this route. Here's what separates us from every alternative."
        items={whyUs}
        theme="dark"
      />

      <ReviewsGrid
        eyebrow="What People Say"
        title="Real trips, real reviews."
        rating="4.9"
        ratingLabel="Outstanding, 200+ verified Google reviews"
        reviews={reviews}
      />

      <RelatedLinks eyebrow="Related Services" title="More TipTop Maxi Sydney Transfer Routes" items={related} />

      <ServiceFaq title="Western Sydney Airport transfers, answered plainly." faqs={faqs} bgImage="/images/deals-bg.jpg" />

      <FinalCta
        title="Sort your Western Sydney Airport transfer before the terminal even opens."
        description="Call now for a fixed quote, or fill in the booking card above and we'll text you back."
      />

      <section className="svc-section">
        <div className="svc-section-inner" style={{ textAlign: "center" }}>
          <Link href="/western-sydney-airport-transfers/">&larr; Back to all Western Sydney Airport transfers</Link>
        </div>
      </section>
    </>
  );
}
