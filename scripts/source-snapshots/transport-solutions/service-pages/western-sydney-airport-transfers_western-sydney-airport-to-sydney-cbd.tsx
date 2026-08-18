import type { Metadata } from "next";
import Link from "next/link";
import LandingHero from "@/components/pages/LandingHero";
import FeatureGrid from "@/components/pages/FeatureGrid";
import ComparisonTable from "@/components/pages/ComparisonTable";
import StepsList from "@/components/pages/StepsList";
import SpecFleetGrid from "@/components/pages/SpecFleetGrid";
import RelatedLinks from "@/components/pages/RelatedLinks";
import ReviewsGrid from "@/components/pages/ReviewsGrid";
import ServiceFaq from "@/components/pages/ServiceFaq";
import FinalCta from "@/components/home/FinalCta";
import { siteConfig } from "@/lib/siteConfig";
import type { Faq } from "@/lib/homeData";

const PAGE_URL = `${siteConfig.url}/western-sydney-airport-transfers/western-sydney-airport-to-sydney-cbd/`;

export const metadata: Metadata = {
  title: "Western Sydney Airport to Sydney CBD",
  description:
    "Fixed-price transfer from Western Sydney Airport to Sydney CBD via the toll-free M12 and M7. Approximately 45–55 minutes, door to door, driver included.",
  alternates: { canonical: PAGE_URL },
};

const quickStrip = [
  { icon: "⚡", title: "No Surge Pricing, Ever" },
  { icon: "🛡", title: "Fully Insured & Licensed" },
  { icon: "⏱", title: "On-Time Guarantee" },
  { icon: "👥", title: "Group Travel Specialists" },
];

const routeFeatures = [
  { icon: "🛣️", title: "Toll-Free Via M12 + M7", description: "The M12 Motorway opened March 2026, a direct, toll-free connection from WSI Airport to the M7 at Cecil Hills, then straight into Sydney's motorway network." },
  { icon: "⏱️", title: "45–55 Minutes to Sydney CBD", description: "Standard traffic conditions. Early morning and late-night transfers often run closer to 40 minutes. Peak-hour timing is accounted for at booking." },
  { icon: "📍", title: "Drop to Any CBD Location", description: "Hotel lobby, Circular Quay, George Street, Darling Harbour, Barangaroo, the Rocks, we drop at the exact address, not the nearest corner." },
  { icon: "🔄", title: "Return Transfers Available", description: "Book your CBD pickup for the return leg at the same time. Flight delays on the return are monitored and adjusted automatically." },
];

const routeStats = [
  { value: "~61 km", label: "Airport to CBD" },
  { value: "~50 min", label: "Average drive" },
  { value: "$0", label: "M12 tolls" },
  { value: "24/7", label: "Available" },
];

const fleet = [
  { icon: "🚗", badge: "1–4 Passengers", title: "Sedan", specs: ["👤 Up to 4", "🧳 2–3 bags"], features: ["Air conditioned & comfortable", "Ideal for solo & business travel", "Fixed price, direct to CBD"], ctaLabel: "Book Sedan" },
  { icon: "🚙", badge: "5–7 Passengers", title: "SUV / Maxi SUV", specs: ["👤 Up to 7", "🧳 5–7 bags"], features: ["Generous luggage space", "Perfect for small families", "Comfortable high-ride seating"], ctaLabel: "Book SUV" },
  { icon: "🚐", badge: "⭐ Most Popular", title: "Maxi Taxi", specs: ["👤 Up to 11", "🧳 11+ bags"], features: ["Best value for groups", "Everyone travels together", "Airport-grade luggage space"], ctaLabel: "Book Maxi Taxi" },
  { icon: "♿", badge: "Accessible", title: "Wheelchair Accessible", specs: ["👤 4–6 pax", "🦽 1–2 chairs"], features: ["Hydraulic ramp fitted", "Trained professional drivers"], ctaLabel: "Book WAV" },
  { icon: "👶", badge: "Family Safe", title: "Baby Seat Taxi", specs: ["👤 Up to 4", "🍼 Infant / booster"], features: ["Certified child restraints", "Infant, toddler & booster options", "Family-trained drivers"], ctaLabel: "Book Baby Seat Taxi" },
];

const pickupFeatures = [
  { icon: "🛰️", title: "Live Flight Monitoring", description: "We watch your flight number in real time. Land early or touch down late, your driver's schedule adjusts automatically." },
  { icon: "🪧", title: "Meet & Greet at Arrivals", description: "Your driver waits inside the terminal with a name board, included in every booking at no extra charge." },
  { icon: "🧳", title: "Full Luggage Assistance", description: "Bags loaded, doors opened. Whether it's two suitcases or ten, your driver handles the loading." },
  { icon: "📍", title: "Door-to-Door Drop in the CBD", description: "Hotel lobby, serviced apartment, office building, we drop at the exact address across the CBD." },
];

const dropoffFeatures = [
  { icon: "⏰", title: "Early Morning & Late Night Ready", description: "WSI has no flight curfew. Whether your departure is 5am or midnight, we'll be at your CBD address on time." },
  { icon: "🏙️", title: "CBD Pickup From Any Address", description: "Hotel, apartment, office, Airbnb, your driver comes to the door. No walking to a rank, no uncertainty." },
  { icon: "💰", title: "Fixed Fare, Agreed at Booking", description: "The price you're quoted is the price you pay. No surge pricing, no metered surprises at the terminal drop-off." },
  { icon: "🔄", title: "Book Both Legs in One Go", description: "Lock in your outbound drop-off and your return airport pickup in a single booking." },
];

const whoUses = [
  { icon: "💼", title: "Business & Corporate Travellers", description: "Delegates, executives, and conference attendees who need to be somewhere in the CBD on time." },
  { icon: "👨‍👩‍👧‍👦", title: "Families Returning from Overseas", description: "A family with checked luggage and a toddler after a long-haul international flight. One vehicle, door-to-door." },
  { icon: "🌏", title: "International Tourists", description: "Visitors flying into WSI heading to CBD hotels, Circular Quay, or the Rocks." },
  { icon: "👥", title: "Groups & Teams", description: "Sports teams, conference delegations, wedding guests arriving together, one maxi taxi, one fixed price." },
  { icon: "♿", title: "NDIS & Accessibility Passengers", description: "Passengers requiring wheelchair-accessible vehicles. Pre-booking guarantees the right vehicle is waiting." },
  { icon: "🚢", title: "Cruise Passengers", description: "Passengers flying in and heading to Sydney's cruise terminals at White Bay or Barangaroo via the CBD." },
];

const steps = [
  { title: "Book Online or Call", description: "Select WSI Airport as pickup, enter your CBD address, choose your vehicle. Locked in within minutes." },
  { title: "Receive Confirmation", description: "Instant SMS and email with your fixed fare, driver details, vehicle, and arrival instructions." },
  { title: "We Track Your Flight", description: "Your flight is monitored live. Delays or early arrivals are handled automatically, no calls needed." },
  { title: "Meet at Arrivals", description: "Driver inside the terminal with name board, bags loaded. You're in the vehicle within minutes of clearing customs." },
  { title: "Arrive at Your CBD Address", description: "~50 minutes on the motorway. Fixed price, no detours, door-to-door delivery anywhere in Sydney CBD." },
];

const whyUs = [
  { icon: "💰", title: "One Fixed Price — No Exceptions", description: "The fare is agreed at booking. Early morning, public holiday, wet weather, peak hour, the price doesn't change." },
  { icon: "🛰️", title: "Flight Monitoring, Always On", description: "Your driver tracks your flight from wheels-up. A two-hour delay means your driver arrives two hours later." },
  { icon: "🪧", title: "Meet & Greet Every Time", description: "Name board at arrivals. Luggage assistance. Escort to the vehicle. It's how every airport pickup works with us." },
  { icon: "🕐", title: "24/7 - Including Curfew-Free Flights", description: "Western Sydney Airport runs 24 hours with no curfew. That means 3am arrivals and 5am departures are real." },
  { icon: "🚐", title: "Right Vehicle for Every Group", description: "Sedan, SUV, Maxi Taxi, Wheelchair Accessible, Baby Seat, one vehicle for every party size and requirement." },
  { icon: "📞", title: "Real People Answer", description: "Call and a person picks up. Not a chatbot, not a hold queue. Especially useful for last-minute changes." },
];

const dropoffPoints = [
  { icon: "🏨", title: "Sydney CBD Hotels", description: "George St, Pitt St, Market St & surrounds", href: "/western-sydney-airport-transfers/western-sydney-airport-to-sydney-cbd/" },
  { icon: "⚓", title: "Circular Quay", description: "Ferry terminal, Opera House precinct", href: "/western-sydney-airport-transfers/western-sydney-airport-to-sydney-cbd/" },
  { icon: "🏢", title: "Barangaroo", description: "International Tower business precinct", href: "/western-sydney-airport-transfers/western-sydney-airport-to-sydney-cbd/" },
  { icon: "🎡", title: "Darling Harbour", description: "ICC, hotels, Cockle Bay Wharf", href: "/western-sydney-airport-transfers/western-sydney-airport-to-sydney-cbd/" },
  { icon: "🪨", title: "The Rocks", description: "Heritage precinct, boutique hotels", href: "/western-sydney-airport-transfers/western-sydney-airport-to-sydney-cbd/" },
  { icon: "🚂", title: "Central Station", description: "Railway Square, Surry Hills, Ultimo", href: "/western-sydney-airport-transfers/western-sydney-airport-to-sydney-cbd/" },
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
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Western Sydney Airport Transfers", item: `${siteConfig.url}/western-sydney-airport-transfers/` },
    { "@type": "ListItem", position: 3, name: "To Sydney CBD" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
};

export default function WesternSydneyAirportToSydneyCbdPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <LandingHero
        eyebrow="WESTERN SYDNEY AIRPORT → SYDNEY CBD"
        title="WSI Airport to Sydney CBD, Fixed Price, Door to Door."
        description="The drive from Nancy-Bird Walton Airport to Sydney CBD is roughly 61 km via the toll-free M12 and M7 motorways, approximately 45–55 minutes in normal conditions. We'll have a clean, comfortable vehicle at your terminal, driver included, fare already agreed before you land."
        badges={quickStrip.map((q) => q.title)}
      />

      <FeatureGrid items={quickStrip} compact />

      <FeatureGrid
        eyebrow="The Route"
        title="What the Drive from Western Sydney Airport to Sydney CBD Actually Looks Like"
        subtitle="The M12 Motorway, which opened toll-free on 14 March 2026, gives us a direct, uninterrupted motorway connection from WSI Airport to Sydney CBD via the M7."
        items={routeFeatures}
      />

      <section className="svc-section">
        <div className="svc-section-inner">
          <div className="tt-final-stats">
            {routeStats.map((stat) => (
              <div className="tt-final-stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ComparisonTable
        eyebrow="Why Pre-Book?"
        title="Why a Pre-Booked Transfer Beats Every Other Option"
        subtitle="At 61 km from the city, Western Sydney Airport isn't a short hop. Getting this leg right makes a real difference to your arrival experience."
        columns={["Option", "Journey Time", "Fixed Price", "Door-to-Door", "Luggage", "24/7", "Groups"]}
        rows={[
          ["🚐 TipTop Maxi Sydney", "~45–55 min", "✔ Yes", "✔ Yes", "✔ Yes", "✔ Yes", "✔ Up to 11"],
          ["🚌 WSI Link Bus + T1 Train", "90+ min total", "≈ Low fare", "✘ Station only", "✘ Difficult", "✘ 4:30am–12am", "✘ No"],
          ["🚗 Rideshare (Uber / Ola)", "~45–55 min", "✘ Surge pricing", "≈ Mostly", "✘ Limited", "≈ Variable", "✘ 4 pax max"],
          ["🚕 Rank Taxi (if available)", "~45–55 min", "✘ Metered", "≈ Mostly", "≈ Sedan", "≈ Varies", "✘ 4 pax max"],
          ["🚘 Self-Drive / Hire Car", "~45–55 min", "✘ Variable", "✔ Yes", "≈ Yes", "✔ Yes", "≈ Maybe"],
        ]}
        footnote="* WSI Link bus operates 4:30am–midnight Sun–Thu, until 1am Fri–Sat. Transfer at St Marys required. Total CBD journey typically exceeds 90 minutes."
      />

      <FeatureGrid
        eyebrow="Airport Pickup"
        title="Arriving at Western Sydney Airport?"
        subtitle="After 15 hours in the air, the last thing you want is to navigate unfamiliar transport options. We make the arrival side of this route simple."
        items={pickupFeatures}
      />

      <FeatureGrid
        eyebrow="Airport Drop-Off"
        title="Departing From Sydney CBD to WSI Airport?"
        subtitle="Western Sydney Airport operates 24 hours with no curfew, so early morning and late-night departures are standard from day one."
        items={dropoffFeatures}
        theme="dark"
      />

      <SpecFleetGrid
        eyebrow="Vehicle Options"
        title="Choose the Right Vehicle for Your WSI Airport to CBD Transfer"
        subtitle="Solo business traveller or a family of eleven with luggage, we have a vehicle that fits every group."
        items={fleet}
      />

      <FeatureGrid
        eyebrow="Who Uses This Route"
        title="Who Books the WSI Airport to Sydney CBD Transfer"
        subtitle="This route has a specific mix of travellers. Here's who we see most often."
        items={whoUses}
      />

      <StepsList
        eyebrow="How It Works"
        title="Five Steps from WSI Airport to Your CBD Door"
        subtitle="Simple, predictable, and designed to require nothing from you after the initial booking."
        steps={steps}
        ctaLabel="Book Your WSI to CBD Transfer"
        ctaHref={siteConfig.bookingUrl}
      />

      <FeatureGrid
        eyebrow="Why TipTop Maxi Sydney"
        title="Why Travellers Choose Us for the WSI Airport to CBD Run"
        subtitle="There will be plenty of options on this route. Here's what separates us from every alternative."
        items={whyUs}
      />

      <RelatedLinks eyebrow="CBD Drop-Off Points" title="Anywhere in Sydney CBD, We Go There" items={dropoffPoints} />

      <ReviewsGrid
        eyebrow="Customer Reviews"
        title="What Passengers Say About the WSI Airport to CBD Transfer"
        rating="4.9"
        ratingLabel="Outstanding, 200+ verified Google reviews"
        reviews={reviews}
      />

      <RelatedLinks eyebrow="Related Services" title="More TipTop Maxi Sydney Transfer Routes" items={related} />

      <ServiceFaq title="Western Sydney Airport to Sydney CBD, Questions Answered" faqs={faqs} bgImage="/images/deals-bg.jpg" />

      <FinalCta
        title="Book Your Western Sydney Airport to Sydney CBD Transfer Today"
        description="Fixed price. Door to door. Driver waiting at arrivals. ~50 minutes on the motorway. Book online in minutes or call us directly, we're available 24/7."
      />

      <section className="svc-section">
        <div className="svc-section-inner" style={{ textAlign: "center" }}>
          <Link href="/western-sydney-airport-transfers/">&larr; Back to all Western Sydney Airport transfers</Link>
        </div>
      </section>
    </>
  );
}
