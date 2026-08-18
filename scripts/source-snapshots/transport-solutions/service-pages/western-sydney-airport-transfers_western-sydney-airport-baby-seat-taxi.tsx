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

const PAGE_URL = `${siteConfig.url}/western-sydney-airport-transfers/western-sydney-airport-baby-seat-taxi/`;

export const metadata: Metadata = {
  title: "Western Sydney Airport Baby Seat Taxi",
  description:
    "Baby capsules, toddler seats and boosters fitted before you arrive. Tell us your child's age when you book the right seat will already be fitted when we pull up.",
  alternates: { canonical: PAGE_URL },
};

const quickStrip = [
  { icon: "⚡", title: "Matched to your child's age" },
  { icon: "🛡", title: "Fitted before you arrive" },
  { icon: "⏱", title: "Multiple kids, one booking" },
  { icon: "👥", title: "Price agreed upfront" },
];

const landing = [
  { icon: "📲", title: "We watch the flight, not the clock", description: "Your driver's timing is set against your actual flight number, so a slow bag carousel doesn't leave you standing outside with a fussy toddler." },
  { icon: "📍", title: "Terminal pickup point", description: "Driver waits at the designated pickup zone, seat already fitted." },
  { icon: "🧳", title: "Hands free for the rest of it", description: "Bags loaded while you settle the kids in, not the other way around." },
];

const headingToBradfield = [
  "Pickup from home, whatever time the flight actually leaves",
  "The price you're quoted doesn't move once everyone's buckled in",
  "Extra minutes built in for loading kids, not just bags",
  "The seat's fitted and checked before we knock on your door",
  "More than one child, one booking, seats matched to each",
  "Mention your return flight and we'll pencil that leg in too",
];

const honestVersion = [
  "We ask your child's age before we ask your name",
  "Multiple kids, multiple seat types, handled in one booking",
  "Extra minutes are built in for loading kids, not rushed",
  "3am and 4am family flights are handled the same as midday ones",
  "The seat that turns up is the one that's actually right for them",
  "Your price doesn't change because your flight did",
  "A person answers the phone when you call to change something",
  "You can bring your own seat instead, no issue either way",
];

const realTrips = [
  { icon: "👶", title: "A newborn's first flight", description: "Nervous parents, a capsule that needs to be exactly right, and a driver who isn't in a rush while everyone gets settled." },
  { icon: "✈️", title: "Grandparents flying in to meet the baby", description: "Booked by the new parents, picked up solo, with a capsule ready even though they didn't have to think about it." },
  { icon: "👨‍👩‍👧‍👦", title: "A family of five coming home from holiday", description: "Three kids, three different seat types, one pram, and a flight that landed later than planned." },
  { icon: "🌏", title: "Interstate or overseas visitors with young kids", description: "No car seat of their own to bring, and no interest in buying one for a week-long trip." },
  { icon: "🏥", title: "A family flying home after a hospital stay", description: "A newborn, sometimes still quite small, and parents who'd rather not be figuring out a capsule for the first time that day." },
  { icon: "🎉", title: "A family reunion or wedding weekend", description: "Multiple children across different ages arriving together, each needing a different seat, sorted in one booking." },
];

const faqs: Faq[] = [
  { question: "Do I need to bring my own baby seat?", answer: "No. Tell us your child's age and roughly their size when you book, and we'll have the right capsule, seat or booster fitted before we arrive. If you'd rather use your own seat, that's fine too, just let us know." },
  { question: "How do you know which seat my child actually needs?", answer: "Age is the starting point, roughly a rear-facing capsule under six months, a forward-facing harnessed seat from six months to around four years, then a booster from about four to seven. Size matters too." },
  { question: "Is the seat actually fitted properly, or just placed in the car?", answer: "Fitted properly. Our drivers install capsules, seats and boosters correctly before your child gets in, it's not adjusted on the go once you're already moving." },
  { question: "I've got three kids of different ages, can you handle that in one booking?", answer: "Yes. Tell us each child's age when you book and we'll bring a vehicle fitted with the right seat for every one of them." },
  { question: "Will the price change once I'm in the car?", answer: "No. The fare you're quoted, including the airport access fee, is the fare you pay. No meter, no surge pricing, no surprises at drop-off." },
  { question: "How much notice do you actually need?", answer: "A few hours' notice lets us confirm we've got the right seat size on hand. Shorter notice is worth a call anyway, we'll do what we can." },
  { question: "What if our flight lands early or gets delayed?", answer: "Your flight number is linked to the booking, so your driver's arrival shifts with it automatically. No need to call us." },
  { question: "Do you run family flights that leave really early or really late?", answer: "Yes. Western Sydney Airport doesn't operate under a curfew, so 4am and midnight family flights are part of the normal schedule out there, and part of ours too." },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Western Sydney Airport Transfers", item: `${siteConfig.url}/western-sydney-airport-transfers/` },
    { "@type": "ListItem", position: 3, name: "Baby Seat Taxi" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
};

export default function WesternSydneyAirportBabySeatTaxiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <LandingHero
        eyebrow="WESTERN SYDNEY AIRPORT BABY SEAT TAXI"
        title="One less thing to pack, carry or wrestle with after a flight."
        description="You've already got a nappy bag, a pram and a toddler who's decided the terminal floor looks interesting. The last thing you need is to be clipping in a capsule you lugged through customs. Tell us your child's age when you book and the right seat will already be fitted when we pull up."
        badges={quickStrip.map((q) => q.title)}
      />

      <FeatureGrid items={quickStrip} compact />

      <section className="svc-section">
        <div className="svc-section-inner">
          <div className="svc-prose">
            <span className="tt-feature-eyebrow" style={{ textAlign: "left" }}>Getting the Right Seat</span>
            <h2>The seat that&apos;s right for your six-month-old is the wrong one entirely for your five-year-old.</h2>
            <p>
              NSW road rules are specific about this for good reason: a rear-facing capsule for infants, a
              forward-facing harnessed seat once they&apos;re steadier, then a booster as they grow into adult
              belts properly. Getting it wrong isn&apos;t just a paperwork issue, it&apos;s the difference
              between a restraint that actually does its job and one that doesn&apos;t.
            </p>
            <p>
              We&apos;d rather ask two quick questions when you book, your child&apos;s age and roughly their
              size, than turn up with whatever seat happened to be in the boot. If you&apos;re travelling with
              your own seat and just need the car, that&apos;s fine too, just mention it.
            </p>
          </div>
        </div>
      </section>

      <Fleet />

      <CheckListSection
        eyebrow="Heading to Bradfield"
        title="An early flight with young kids is stressful enough without also being the one installing a car seat at 4am."
        items={headingToBradfield}
      />

      <FeatureGrid
        eyebrow="Landing at Bradfield"
        title="Arriving with a tired baby and a pile of luggage? The seat's the one thing already sorted."
        items={landing}
      />

      <CheckListSection
        eyebrow="The Honest Version"
        title="We're not the only baby seat taxi in Sydney. Here's what we think actually sets this one apart."
        items={honestVersion}
        theme="dark"
      />

      <FeatureGrid
        eyebrow="Real Trips We Run"
        title="Not a hypothetical persona list, these are the bookings that actually come through."
        items={realTrips}
      />

      <ServiceFaq title="Before you book a baby seat taxi to Western Sydney Airport." faqs={faqs} bgImage="/images/deals-bg.jpg" />

      <FinalCta
        title="Let's sort the car seat before the day of travel arrives."
        description="Call and tell us the ages, or fill in the quote card above. Either way, the right seats will be fitted and waiting when you land."
      />

      <section className="svc-section">
        <div className="svc-section-inner" style={{ textAlign: "center" }}>
          <Link href="/western-sydney-airport-transfers/">&larr; Back to all Western Sydney Airport transfers</Link>
        </div>
      </section>
    </>
  );
}
