import type { Metadata } from "next";
import Link from "next/link";
import LandingHero from "@/components/pages/LandingHero";
import FeatureGrid from "@/components/pages/FeatureGrid";
import ComparisonTable from "@/components/pages/ComparisonTable";
import StepsList from "@/components/pages/StepsList";
import ServiceAreaGrid from "@/components/pages/ServiceAreaGrid";
import ReviewsGrid from "@/components/pages/ReviewsGrid";
import RelatedLinks from "@/components/pages/RelatedLinks";
import ServiceFaq from "@/components/pages/ServiceFaq";
import FinalCta from "@/components/home/FinalCta";
import { siteConfig } from "@/lib/siteConfig";
import type { Faq } from "@/lib/homeData";

const PAGE_URL = `${siteConfig.url}/western-sydney-airport-transfers/western-sydney-airport-maxi-taxi/`;

export const metadata: Metadata = {
  title: "Western Sydney Airport Maxi Taxi",
  description:
    "Up to 11 passengers, mountains of luggage, 24/7 availability. The smartest way to move a group to or from Western Sydney Airport at a fixed price, every time.",
  alternates: { canonical: PAGE_URL },
};

const quickStrip = [
  { icon: "⚡", title: "No Surge Pricing, Ever" },
  { icon: "🛡", title: "Fully Insured & Licensed" },
  { icon: "⏱", title: "On-Time Guarantee" },
  { icon: "👥", title: "Group Travel Specialists" },
];

const statTiles = [
  { value: "11", label: "Maximum Passengers" },
  { value: "11+", label: "Checked Bags Capacity" },
  { value: "24/7", label: "Available Every Day" },
  { value: "$0", label: "Surge Fees Ever" },
];

const whoUses = [
  { icon: "👨‍👩‍👧‍👦", title: "Families", description: "One vehicle for the whole family, including the pram, car seats, and four overpacked suitcases." },
  { icon: "💼", title: "Corporate Groups", description: "One vehicle, one invoice, everyone arrives together. Simpler for the team, simpler for accounts." },
  { icon: "🏉", title: "Sports Teams", description: "Travelling with gear, bags, and a squad? We've moved sporting groups across Sydney for years." },
  { icon: "🌏", title: "Tourists & Tour Groups", description: "Arriving in Sydney for the first time? We'll have someone waiting at arrivals with your name." },
  { icon: "♿", title: "NDIS & Accessibility Needs", description: "We operate Wheelchair Accessible Vehicles and support passengers with all mobility requirements." },
  { icon: "🚢", title: "Cruise Passengers", description: "Connecting from a cruise terminal to Western Sydney Airport? We link both." },
];

const pickupFeatures = [
  { icon: "🛰️", title: "Live Flight Tracking", description: "We watch your flight number in real time. Land early or touch down late, your driver adjusts without you needing to call us." },
  { icon: "🪧", title: "Meet & Greet at Arrivals", description: "Your driver waits inside the terminal with a name board. No searching the pickup zone, no phone tag, walk out and go." },
  { icon: "🧳", title: "Full Luggage Assistance", description: "Bags loaded, doors opened, no extra charge. Especially helpful after long international flights when energy is low." },
  { icon: "📍", title: "Real-Time Driver Tracking", description: "See where your driver is before you clear customs. Share the tracking link so nobody in the group is left guessing." },
];

const dropoffFeatures = [
  { icon: "⏰", title: "Early Morning Pickups", description: "4am departure? No problem. We run 24 hours, so your driver will be there, on time, and ready to load bags." },
  { icon: "🗺️", title: "Door-to-Terminal Service", description: "We pick you up from your home, hotel, or office and drop you at the correct terminal entrance. No transfers, no drama." },
  { icon: "💰", title: "Fixed Price, No Surprises", description: "Quote locked in at booking. No metered fare, no surge pricing on busy travel days, no awkward conversation at drop-off." },
  { icon: "🔄", title: "Return Transfer Option", description: "Book your outbound drop-off and your arrival pickup in one go. We co-ordinate both around your flight schedule." },
];

const whyUs = [
  { icon: "💰", title: "One Fixed Fare. Always.", description: "No metered surprises, no surge pricing at 6am, no hidden airport levies. The quote you get is the price you pay, full stop." },
  { icon: "🛰️", title: "Live Flight Monitoring", description: "Your driver's schedule moves with your flight. Land two hours late and your driver will still be there, no rebooking, no stress." },
  { icon: "🪧", title: "Meet & Greet Included", description: "Every airport pickup includes a name board inside arrivals. Not an optional extra, it's part of the standard service." },
  { icon: "🕐", title: "24/7 Including Public Holidays", description: "Christmas Day, Easter, New Year's Eve, we operate around the clock, 365 days a year, at the same fixed price." },
  { icon: "♿", title: "Accessible & Inclusive", description: "NDIS participants, wheelchair users, and passengers with mobility needs are always welcome. Advance booking ensures the right vehicle." },
  { icon: "📞", title: "A Real Person Answers", description: "When you call, a real person picks up. No chatbots, no overseas call centres, no holding for 40 minutes." },
];

const steps = [
  { title: "Book Online or Call", description: `Visit ${siteConfig.bookingUrl.replace("https://", "")} or call ${siteConfig.phoneLocalDisplay}. Takes less than five minutes.` },
  { title: "Instant Confirmation", description: "SMS and email with your fare, driver details, and vehicle info, sent immediately after booking." },
  { title: "We Track Your Flight", description: "Our team monitors your flight live. Any delay is handled automatically, no need to call." },
  { title: "Driver Meets You", description: "Name board at arrivals, bags loaded, group seated, your driver does the heavy lifting." },
  { title: "Arrive Together", description: "Fixed price, direct route, no detours. Your whole group arrives in comfort." },
];

const serviceAreas = [
  { name: "Parramatta", note: "~30 min to WSI Airport" },
  { name: "Blacktown", note: "~35 min to WSI Airport" },
  { name: "Liverpool", note: "~25 min to WSI Airport" },
  { name: "Penrith", note: "~35 min to WSI Airport" },
  { name: "Campbelltown", note: "~30 min to WSI Airport" },
  { name: "Bankstown", note: "~30 min to WSI Airport" },
  { name: "Sydney CBD", note: "~45–55 min to WSI Airport" },
];

const reviews = [
  { quote: "Booked a maxi taxi for our family of nine flying from Western Sydney Airport — two grandparents, four kids, and enough bags to fill a shipping container. The driver arrived early, helped load everything, and got us there with 90 minutes to spare. Absolute legend.", name: "Michael K.", location: "Parramatta · Verified Google Review" },
  { quote: "Our corporate team of eight needed early morning transport to Western Sydney Airport. TipTop had a maxi taxi at our office at 4:30am — on time, professional, clean vehicle. We've made them our go-to for all team travel.", name: "Jessica T.", location: "Sydney CBD · Verified Google Review" },
  { quote: "Flight came in two hours late and the driver was still there, no fuss, no extra charge. We were a group of seven with a mountain of luggage and he had it all sorted in minutes. This is exactly what airport transfers should be like.", name: "Liam R.", location: "Liverpool · Verified Google Review" },
];

const related = [
  { icon: "✈️", title: "All WSI Airport Transfers", description: "All vehicle types for Western Sydney Airport — sedan, SUV, maxi, and wheelchair accessible.", href: "/western-sydney-airport-transfers/" },
  { icon: "🛫", title: "Sydney Airport Transfers", description: "Kingsford Smith Airport pickups and drop-offs, all hours, all vehicle types.", href: "/taxi-services/sydney-airport-transfer/" },
  { icon: "♿", title: "Wheelchair Accessible Taxi", description: "Hydraulic ramp vehicles for passengers with mobility needs.", href: "/western-sydney-airport-transfers/western-sydney-airport-wheelchair-taxi/" },
  { icon: "👶", title: "Baby Seat Taxi", description: "Certified child restraints for infants, toddlers, and older children. Family-safe.", href: "/western-sydney-airport-transfers/western-sydney-airport-baby-seat-taxi/" },
];

const faqs: Faq[] = [
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
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Western Sydney Airport Transfers", item: `${siteConfig.url}/western-sydney-airport-transfers/` },
    { "@type": "ListItem", position: 3, name: "Maxi Taxi" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
};

export default function WesternSydneyAirportMaxiTaxiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <LandingHero
        eyebrow="WESTERN SYDNEY AIRPORT MAXI TAXI"
        title="The Maxi Taxi That Fits Your Whole Group & All Their Bags."
        description="Up to 11 passengers, mountains of luggage, 24/7 availability. TipTop Maxi Sydney's airport maxi taxi service is the smartest way to move a group to or from Western Sydney Airport, at a fixed price, every time."
        badges={quickStrip.map((q) => q.title)}
      />

      <FeatureGrid items={quickStrip} compact />

      <section className="svc-section">
        <div className="svc-section-inner">
          <div className="svc-grid-2">
            <div className="svc-prose">
              <span className="tt-feature-eyebrow" style={{ textAlign: "left" }}>About Our Maxi Taxi</span>
              <h2>What Exactly Is a Maxi Taxi and Why Choose One for the Airport?</h2>
              <p>
                A maxi taxi is a large, people-mover style vehicle, typically a Toyota HiAce or similar, that
                seats between 7 and 11 passengers comfortably with full luggage. It&apos;s the vehicle you book
                when a standard taxi or rideshare just doesn&apos;t cut it.
              </p>
              <p>
                For Western Sydney Airport runs, a maxi taxi makes more sense than booking multiple cars.
                Everyone travels together, one driver handles the co-ordination, and you pay a single fixed
                fare, simpler, cheaper per head, and far less stressful, especially with kids, elderly
                passengers, or piles of suitcases.
              </p>
              <a href={siteConfig.bookingUrl} className="tt-btn tt-btn-call" target="_blank" rel="noreferrer">
                Book a Maxi Taxi <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </a>
            </div>
            <div>
              <h3 style={{ marginBottom: 20 }}>Built for Groups. Designed for Comfort.</h3>
              <div className="tt-final-stats">
                {statTiles.map((stat) => (
                  <div className="tt-final-stat" key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeatureGrid
        eyebrow="Who Uses Our Maxi Taxi"
        title="A Maxi Taxi Built for Every Kind of Group"
        subtitle="Our Western Sydney Airport maxi taxi service is designed around the groups that actually travel, not just the easy ones."
        items={whoUses}
      />

      <FeatureGrid
        eyebrow="Airport Maxi Taxi Pickup"
        title="Arriving at Western Sydney Airport?"
        subtitle="Long-haul travel is exhausting enough. Our maxi taxi pickup service takes that off your plate entirely."
        items={pickupFeatures}
      />

      <FeatureGrid
        eyebrow="Airport Maxi Taxi Drop-Off"
        title="Heading to Western Sydney Airport?"
        subtitle="Skip the expensive long-term car park and the stress of navigating an unfamiliar terminal."
        items={dropoffFeatures}
        theme="dark"
      />

      <ComparisonTable
        eyebrow="Why Maxi Taxi?"
        title="Maxi Taxi vs Your Other Options"
        subtitle="Not sure if a maxi taxi is right for your group? Here's how it compares to the alternatives."
        columns={["Transport Option", "Group Size", "Fixed Price", "All Luggage", "Meet & Greet", "24/7"]}
        rows={[
          ["🚐 TipTop Maxi Taxi", "Up to 11", "✔ Yes", "✔ Yes", "✔ Included", "✔ Yes"],
          ["🚗 Rideshare (Uber etc.)", "1–4 per car", "✘ Surge pricing", "✘ Limited", "✘ No", "Sometimes"],
          ["🚌 Public Bus / Train", "Any", "✔ Fixed fare", "✘ Very limited", "✘ No", "✘ Limited hours"],
          ["🚗 Multiple Rideshares", "Splits group", "✘ Surge pricing", "Partial", "✘ No", "Sometimes"],
          ["🅿️ Long-Term Parking", "Self-drive", "✘ Variable", "✔ Yes", "✘ No", "✔ Yes"],
        ]}
      />

      <StepsList
        eyebrow="How It Works"
        title="Five Steps to a Stress-Free Maxi Taxi Transfer"
        subtitle="Simple process, zero surprises, from the moment you book to the moment you arrive."
        steps={steps}
        ctaLabel="Start Booking Now"
        ctaHref={siteConfig.bookingUrl}
      />

      <FeatureGrid
        eyebrow="Why TipTop Maxi Sydney"
        title="Six Reasons Sydney Groups Keep Choosing Us"
        subtitle="There are plenty of options out there. Here's what actually makes us different."
        items={whyUs}
      />

      <ServiceAreaGrid
        eyebrow="Service Areas"
        title="Maxi Taxi to Western Sydney Airport, From Anywhere"
        subtitle="We run maxi taxi transfers to and from Nancy-Bird Walton Airport across all of Greater Sydney."
        areas={serviceAreas}
      />

      <ReviewsGrid
        eyebrow="Customer Reviews"
        title="What Our Passengers Say About Our Maxi Taxi Service"
        rating="4.9"
        ratingLabel="Outstanding — 200+ verified Google reviews"
        reviews={reviews}
      />

      <RelatedLinks eyebrow="Other Services" title="More Than Just Maxi Taxis" items={related} />

      <ServiceFaq title="Maxi Taxi to Western Sydney Airport, Your Questions Answered" faqs={faqs} bgImage="/images/deals-bg.jpg" />

      <FinalCta
        title="Book Your Maxi Taxi to Western Sydney Airport Today"
        description="Fixed price, whole group, one vehicle. The smartest way to get your group to or from Nancy-Bird Walton Airport, book online in minutes or call us directly."
      />

      <section className="svc-section">
        <div className="svc-section-inner" style={{ textAlign: "center" }}>
          <Link href="/western-sydney-airport-transfers/">&larr; Back to all Western Sydney Airport transfers</Link>
        </div>
      </section>
    </>
  );
}
