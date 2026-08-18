import type { Metadata } from "next";
import Link from "next/link";
import LandingHero from "@/components/pages/LandingHero";
import FeatureGrid from "@/components/pages/FeatureGrid";
import CheckListSection from "@/components/pages/CheckListSection";
import RelatedLinks from "@/components/pages/RelatedLinks";
import ServiceFaq from "@/components/pages/ServiceFaq";
import FinalCta from "@/components/home/FinalCta";
import Fleet from "@/components/home/Fleet";
import { siteConfig } from "@/lib/siteConfig";
import type { Faq } from "@/lib/homeData";

const PAGE_URL = `${siteConfig.url}/western-sydney-airport-transfers/western-sydney-airport-suv-transfers/`;

export const metadata: Metadata = {
  title: "Western Sydney Airport SUV Transfers",
  description:
    "A proper SUV for Western Sydney Airport, fixed price, door to door. Room for up to seven with real luggage space, meet & greet and flight monitoring included.",
  alternates: { canonical: PAGE_URL },
};

const quickStrip = [
  { icon: "⚡", title: "No Surge Pricing, Ever" },
  { icon: "🛡", title: "Fully Insured & Licensed" },
  { icon: "⏱", title: "On-Time Guarantee" },
  { icon: "👥", title: "Group Travel Specialists" },
];

const whyChoose = [
  "One fixed price, agreed before you travel",
  "Meet & greet included, no extra charge",
  "Genuine boot and second-row luggage space",
  "15+ years of experience across Sydney",
  "Flight monitoring on every single booking",
  "24/7, including 3am and 4am airport runs",
  "Real people answer the phone, not a chatbot",
  "NSW licensed and fully insured drivers",
];

const pickupFeatures = [
  {
    icon: "🛰️",
    title: "Live flight monitoring",
    description: "We track your flight number in real time, so early landings and delays are handled without you calling us.",
  },
  {
    icon: "🚙",
    title: "Priority terminal pickup",
    description: "Your SUV pulls up at the designated pickup zone, no queuing behind rideshare or rank taxis.",
  },
  {
    icon: "🧳",
    title: "Full luggage assistance",
    description: "Bags loaded, doors opened. With an SUV, oversized items aren't an afterthought.",
  },
];

const dropoffChecklist = [
  "Pickup from any home, hotel or office address",
  "Available for 3am and 4am early departures",
  "Book your return airport pickup in the same call",
  "Fixed fare agreed before you travel",
  "Room for extra luggage without a second trip",
  "Driver tracks your outbound flight for the return leg",
];

const related = [
  { icon: "✈️", title: "All WSA Transfers", description: "Complete transfer guide, all vehicle types, all destinations.", href: "/western-sydney-airport-transfers/" },
  { icon: "🚐", title: "WSA Maxi Taxi", description: "Group transfers up to 11 passengers, one fixed fare.", href: "/western-sydney-airport-transfers/western-sydney-airport-maxi-taxi/" },
  { icon: "🛫", title: "WSA to Sydney CBD", description: "Fixed-price transfers via the toll-free M12 and M7.", href: "/western-sydney-airport-transfers/western-sydney-airport-to-sydney-cbd/" },
  { icon: "♿", title: "Wheelchair Accessible Taxi", description: "WAV transfers to and from WSA. Advance booking recommended.", href: "/western-sydney-airport-transfers/western-sydney-airport-wheelchair-taxi/" },
];

const faqs: Faq[] = [
  { question: "How many people and bags fit in your SUV?", answer: "Our SUVs seat up to 5 passengers comfortably, or up to 7 in the larger option, with genuine boot and second-row luggage space, typically 4–7 large bags depending on the vehicle. Tell us your passenger and bag count when booking and we'll confirm the right fit." },
  { question: "Is an SUV better than a sedan for Western Sydney Airport?", answer: "For one or two passengers with a couple of carry-ons, a sedan is fine. Once you add a third passenger, golf clubs, a pram, or extra suitcases, an SUV gives you the boot space and ride height a sedan doesn't have." },
  { question: "Do you offer a fixed price for the SUV transfer?", answer: "Yes. Every SUV transfer is quoted as a fixed fare before you book, including the airport access fee. No meter, no surge multiplier, no add-ons at drop-off." },
  { question: "Can the SUV fit a pram or golf clubs?", answer: "Generally yes. SUVs handle prams, golf bags and oversized luggage far better than a sedan. Mention any oversized items when you book so we send the right vehicle." },
  { question: "Do you monitor flights for SUV airport pickups?", answer: "Yes. We track your flight number and adjust your driver's arrival automatically if you land early or are delayed." },
  { question: "Is meet and greet included?", answer: "Yes, at no extra charge. Your driver waits at arrivals with a name board and helps load your luggage." },
  { question: "Can I book a return SUV transfer to Western Sydney Airport?", answer: "Yes, book both legs in one call or booking and we'll coordinate your return pickup around your outbound flight details." },
  { question: "Do you run SUV transfers early morning or late at night?", answer: "Yes, 24 hours a day, seven days a week. Western Sydney Airport is a curfew-free facility, so early departures and late arrivals are routine for us." },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Western Sydney Airport Transfers", item: `${siteConfig.url}/western-sydney-airport-transfers/` },
    { "@type": "ListItem", position: 3, name: "SUV Transfers" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
};

export default function WesternSydneyAirportSuvTransfersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <LandingHero
        eyebrow="WESTERN SYDNEY AIRPORT SUV TRANSFERS"
        title="A proper SUV for Western Sydney Airport, fixed price, door to door."
        description="Room for up to seven with real luggage space, not a sedan with the seats folded down. Whether it's a family with a pram and three suitcases or a couple with golf clubs and a week's worth of bags, our SUVs are sized for it, and the fare is agreed before you land."
        badges={quickStrip.map((q) => q.title)}
      />

      <FeatureGrid items={quickStrip} compact />

      <section className="svc-section">
        <div className="svc-section-inner">
          <div className="svc-prose">
            <span className="tt-feature-eyebrow" style={{ textAlign: "left" }}>The Vehicle</span>
            <h2>Not quite a family, not quite a group, the SUV is built for that gap in between.</h2>
            <p>
              A sedan runs out of boot space the moment you add a third suitcase. A full maxi taxi is more
              vehicle than two or three people travelling together actually need. The SUV sits in between: high
              ride height, a proper boot, and second-row space that fits a pram, a set of golf clubs or extra
              hand luggage without anyone sitting with a bag on their lap.
            </p>
            <p>
              It&apos;s the vehicle we get asked for most by small families flying into Western Sydney Airport
              with young kids, couples travelling with more gear than a weekend bag, and business travellers
              who&apos;d rather not fold themselves into the back of a sedan after a long-haul flight.
            </p>
          </div>
        </div>
      </section>

      <Fleet />

      <CheckListSection title="What separates our SUV transfer from the alternatives." items={whyChoose} />

      <FeatureGrid
        eyebrow="Airport Pickup"
        title="Arriving at Western Sydney Airport with more than a carry-on?"
        items={pickupFeatures}
      />

      <CheckListSection
        eyebrow="Airport Drop-Off"
        title="Departing from Sydney to Western Sydney Airport?"
        items={dropoffChecklist}
        theme="dark"
      />

      <RelatedLinks eyebrow="Related Services" title="More TipTop Maxi Sydney transfer options." items={related} />

      <ServiceFaq title="Western Sydney Airport SUV transfers, answered plainly." faqs={faqs} bgImage="/images/deals-bg.jpg" />

      <FinalCta
        title="Book your Western Sydney Airport SUV transfer today."
        description="Fixed price. Door to door. Driver waiting at arrivals. Room for the whole family and the bags."
      />

      <section className="svc-section">
        <div className="svc-section-inner" style={{ textAlign: "center" }}>
          <Link href="/western-sydney-airport-transfers/">&larr; Back to all Western Sydney Airport transfers</Link>
        </div>
      </section>
    </>
  );
}
