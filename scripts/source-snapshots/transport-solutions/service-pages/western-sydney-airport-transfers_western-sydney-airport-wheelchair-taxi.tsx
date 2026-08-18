import type { Metadata } from "next";
import Link from "next/link";
import LandingHero from "@/components/pages/LandingHero";
import FeatureGrid from "@/components/pages/FeatureGrid";
import CheckListSection from "@/components/pages/CheckListSection";
import ServiceFaq from "@/components/pages/ServiceFaq";
import FinalCta from "@/components/home/FinalCta";
import Fleet from "@/components/home/Fleet";
import { siteConfig } from "@/lib/siteConfig";
import type { Faq } from "@/lib/homeData";

const PAGE_URL = `${siteConfig.url}/western-sydney-airport-transfers/western-sydney-airport-wheelchair-taxi/`;

export const metadata: Metadata = {
  title: "Western Sydney Airport Wheelchair Taxi",
  description:
    "Ramp-fitted vehicles, approved restraint systems, and trained drivers for Western Sydney Airport. Fixed price, companion seating included.",
  alternates: { canonical: PAGE_URL },
};

const quickStrip = [
  { icon: "⚡", title: "Ramp-fitted vehicles" },
  { icon: "🛡", title: "Approved restraint systems" },
  { icon: "⏱", title: "Fixed price, no surge" },
  { icon: "👥", title: "Companion seating included" },
];

const landing = [
  { icon: "📲", title: "We watch the flight, not the clock", description: "Your driver's timing is set against your actual flight number, so a delayed bag carousel doesn't mean a driver who's given up and left." },
  { icon: "📍", title: "Accessible pickup point", description: "Driver waits at the designated accessible pickup zone with the ramp already down." },
  { icon: "⏳", title: "No equipment fetched on the spot", description: "The ramp's down and the restraints are laid out before you're within sight of the vehicle, not assembled while you wait." },
];

const headingToBradfield = [
  "We collect from home, a hospital ward, a care facility, wherever you're starting from",
  "Boarding time isn't squeezed to make up a schedule",
  "3am pickups are on the roster, not an exception someone has to approve",
  "The price you're quoted doesn't move once you're in the car",
  "Whoever's travelling with you sits beside you, not in a separate car",
  "Mention your return flight and we'll pencil that leg in at the same time",
];

const honestVersion = [
  "We ask about your chair before we ask about your name",
  "Restraint points are checked at the depot, not improvised roadside",
  "A companion rides with you, it's not billed as an add-on",
  "3am and 4am bookings are handled the same as midday ones",
  "The vehicle that turns up is the one you were told about",
  "Your price doesn't change because your flight did",
  "A person answers the phone when you call to change something",
  "Card, bank transfer or corporate account, sorted before you travel",
];

const realTrips = [
  { icon: "🧑‍🦽", title: "NDIS support coordinators booking on someone's behalf", description: "You're arranging the trip, not taking it. We'll confirm details directly with the participant or carer, and payment is settled through one of our standard accepted methods before travel." },
  { icon: "🏥", title: "Someone being discharged and flying home", description: "Coming straight from a ward, sometimes with a support worker, sometimes solo. We build in the extra minutes that takes." },
  { icon: "👵", title: "A parent visiting from interstate", description: "Adult children booking transport for a parent who's flying in alone and needs someone competent waiting, not just present." },
  { icon: "🧳", title: "A traveller who's used wheelchair transport in other cities", description: "And knows exactly what \"we can accommodate you\" tends to actually mean in practice. We'd rather just do it properly." },
];

const faqs: Faq[] = [
  { question: "Can I stay in my wheelchair during the trip?", answer: "Yes. Our vehicles are fitted with approved wheelchair restraint systems, so most passengers can remain seated in their own wheelchair for the entire journey." },
  { question: "Do you take powered wheelchairs and mobility scooters?", answer: "In most cases, yes, subject to the size and weight of the chair fitting within our ramp and restraint limits. Let us know the make, model, weight and dimensions when you book." },
  { question: "How much notice do you need?", answer: "We recommend at least 24 hours' notice, since accessible vehicles are a smaller part of our fleet than standard taxis. Same-day requests are welcome and we'll always try." },
  { question: "Is the fare fixed?", answer: "Yes. You're given a fixed price before you book, covering the vehicle, driver assistance and the airport access fee, with no meter and no surge pricing." },
  { question: "Can NDIS participants book with you?", answer: "Yes, our wheelchair-accessible vehicles are available to NDIS participants. We're not an NDIS registered provider, and we don't process NDIS-funded invoicing or NDIS cards, so please book using one of our standard accepted payment methods (card, bank transfer, corporate account or secure online payment)." },
  { question: "Can a companion travel with me?", answer: "Yes, our wheelchair accessible vehicles seat additional companions alongside the wheelchair position, so carers and family members can travel together." },
  { question: "Do you monitor flights for wheelchair taxi bookings?", answer: "Yes. We track your flight number and adjust your driver's arrival automatically if you land early or are delayed." },
  { question: "Do you run wheelchair taxis early morning or late at night?", answer: "Yes, 24 hours a day, seven days a week. Western Sydney Airport is a curfew-free facility, so early departures and late arrivals are routine for us." },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Western Sydney Airport Transfers", item: `${siteConfig.url}/western-sydney-airport-transfers/` },
    { "@type": "ListItem", position: 3, name: "Wheelchair Taxi" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
};

export default function WesternSydneyAirportWheelchairTaxiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <LandingHero
        eyebrow="WESTERN SYDNEY AIRPORT WHEELCHAIR TAXI"
        title="Wheelchair accessible transport to Western Sydney Airport, done properly."
        description="A ramp-fitted vehicle, an approved restraint system, and a driver who knows how to use both without making a production of it. Fixed price agreed before you book, and enough notice given at pickup that nobody's rushed."
        badges={quickStrip.map((q) => q.title)}
      />

      <FeatureGrid items={quickStrip} compact />

      <section className="svc-section">
        <div className="svc-section-inner">
          <div className="svc-prose">
            <span className="tt-feature-eyebrow" style={{ textAlign: "left" }}>What&apos;s Actually in the Vehicle</span>
            <h2>The bits that matter are the ramp angle, the tie-down points, and the driver&apos;s hands.</h2>
            <p>
              A wheelchair vehicle is only as good as its worst detail. A ramp that&apos;s too steep, a
              restraint point that doesn&apos;t quite line up, a driver who&apos;s never actually clipped one in
              before, any of those turns a five-minute boarding into a stressful one. Ours run a low-angle ramp
              so you&apos;re not fighting gravity to get in, and the securement points are checked before the
              car leaves the depot, not worked out for the first time at the kerb.
            </p>
            <p>
              If you use a manual chair, a power chair, or a scooter, tell us which when you book. The vehicle
              we send, and the way your driver sets it up, changes depending on the answer, and we&apos;d rather
              ask the question now than guess at the kerb.
            </p>
          </div>
        </div>
      </section>

      <Fleet />

      <CheckListSection
        eyebrow="Heading to Bradfield"
        title="A 4am flight shouldn't mean a rushed transfer to get there."
        items={headingToBradfield}
      />

      <FeatureGrid
        eyebrow="Landing at Bradfield"
        title="The gap between clearing the gate and getting into a vehicle is where most trips go wrong. We close that gap."
        items={landing}
      />

      <CheckListSection
        eyebrow="The Honest Version"
        title="We're not the only wheelchair taxi in Sydney. Here's what we think actually sets this one apart."
        items={honestVersion}
        theme="dark"
      />

      <FeatureGrid
        eyebrow="Real Trips We Run"
        title="Not a hypothetical persona list, these are the bookings that actually come through."
        items={realTrips}
      />

      <ServiceFaq title="Western Sydney Airport wheelchair taxi, answered plainly." faqs={faqs} bgImage="/images/deals-bg.jpg" />

      <FinalCta
        title="Book your Western Sydney Airport wheelchair taxi today."
        description="Fixed price. Ramp-fitted vehicle. Trained drivers. Companion seating included, and enough notice given that nobody's rushed."
      />

      <section className="svc-section">
        <div className="svc-section-inner" style={{ textAlign: "center" }}>
          <Link href="/western-sydney-airport-transfers/">&larr; Back to all Western Sydney Airport transfers</Link>
        </div>
      </section>
    </>
  );
}
