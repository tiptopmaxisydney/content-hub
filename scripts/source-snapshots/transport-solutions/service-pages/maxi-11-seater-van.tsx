import type { Metadata } from "next";
import Image from "next/image";
import ServiceHero from "@/components/pages/ServiceHero";
import TrustRow from "@/components/pages/TrustRow";
import ServiceFaq from "@/components/pages/ServiceFaq";
import { siteConfig } from "@/lib/siteConfig";
import type { Faq } from "@/lib/homeData";

const PAGE_URL = `${siteConfig.url}/maxi-11-seater-van/`;

export const metadata: Metadata = {
  title: "Maxi Cab Sydney 11 Seater | Minibus Taxi",
  description:
    "Book an 11 seater maxi van in Sydney for families, corporate teams, and group travel. Door-to-door minibus taxi for airport transfers, cruise terminals, hotels and events.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Maxi Cab Sydney 11 Seater | Minibus Taxi for Groups & Luggage",
    description:
      "Book an 11 seater maxi van in Sydney for families, corporate teams, and group travel. Door-to-door minibus taxi for airport transfers, cruise terminals, hotels and events.",
    url: PAGE_URL,
    type: "article",
    images: ["/images/Maxi-Cab-service-1.png"],
  },
};

const highlights = [
  { label: "Seats", value: "Up to 11 passengers (best for groups, families, and team travel)" },
  { label: "Luggage", value: "Designed for large luggage and multiple suitcases" },
  { label: "Popular trips", value: "Minibus to Sydney Airport, hotels, events, cruise terminals, and long-distance trips" },
  { label: "Comfort", value: "More space than a standard sedan or SUV for passengers plus bags" },
  { label: "Booking", value: "Pre-book in advance for early morning flights and peak periods" },
];

const features = [
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
];

const serviceOptions = [
  "Sydney airport shuttle for groups",
  "Minibus hire Sydney Airport",
  "Van taxi service Sydney for families and large parties",
  "Wheelchair-friendly cabs for accessible travel",
  "Taxis with baby seats Sydney Airport for safe family journeys",
  "Affordable airport group transport Sydney with upfront pricing",
];

const bookingSteps = [
  "Select your pickup and drop-off locations",
  "Choose your vehicle type based on group size",
  "Get an instant fare estimate",
  "Confirm your booking with immediate confirmation",
];

const faqs: Faq[] = [
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
];

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": PAGE_URL,
  url: PAGE_URL,
  name: "Maxi Cab Sydney 11 Seater | Minibus Taxi for Groups & Luggage",
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  inLanguage: "en-AU",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Maxi 11 Seater Van" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question.replace(/^\d+\.\s*/, ""),
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function Maxi11SeaterVanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <ServiceHero
        title="Maxi Cab Sydney 11 Seater (Minibus Taxi for Groups & Luggage)"
        description="Need a big taxi for a group, huge luggage, or an airport transfer? Our 11 seater maxi van is ideal for families, corporate teams, and group travel across Sydney. Book a minibus taxi in Sydney for door-to-door pickups, including Sydney Airport transfers, cruise terminals, hotels, and events."
        bgImage="/images/Maxi-Cab-service-1.png"
      />

      <section className="svc-section">
        <div className="svc-section-inner">
          <div className="svc-grid-2" style={{ marginBottom: 56 }}>
            <div className="svc-prose">
              <h2>Why Choose Our 11 Seater Maxi Van?</h2>
              <p>
                Our 11 seater vans are ideal for groups who want more space than a regular taxi but prefer a
                private, door-to-door service over public transport. With ample room for passengers and luggage,
                TipTop Maxi Sydney&apos;s maxi cabs are perfect for:
              </p>
              <ul>
                {highlights.map((h) => (
                  <li key={h.label}>
                    <strong>{h.label}:</strong> {h.value}
                  </li>
                ))}
              </ul>
              <p>
                Enjoy the comfort of air-conditioned vehicles, professional local drivers, and personalised
                service that adapts to your schedule with TipTop Maxi Sydney.
              </p>
            </div>
            <div>
              <div className="svc-image">
                <Image src="/images/Maxi-Cab-service-1.png" alt="TipTop Maxi Sydney 11 seater van" width={612} height={344} />
              </div>
              <div className="svc-phone-callout">
                <div className="svc-phone-callout-icon">
                  <i className="fa-solid fa-phone" aria-hidden="true" />
                </div>
                <div>
                  <strong>We Are Available 24 Hours</strong>
                  <a href={`tel:${siteConfig.phoneIntl}`}>
                    For Booking: <span>{siteConfig.phoneIntlDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 56 }}>
            <h2>Features of TipTop Maxi Sydney&apos;s 11 Seater Minibus</h2>
            <div className="svc-prose">
              <ul>
                {features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginBottom: 56 }}>
            <h2>Comprehensive Group Transport Service Across Sydney</h2>
            <div className="svc-prose">
              <p>We specialise in group cab services across Sydney, providing a variety of transport options including:</p>
              <ul>
                {serviceOptions.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
              <p>
                No matter your group size or specific requirements, TipTop Maxi Sydney&apos;s fleet of 11 seater
                maxi cabs and minibuses ensures you travel comfortably and on time.
              </p>
            </div>
          </div>

          <div>
            <h2>Easy Online Booking for 11-Seater Maxi Cabs and Vans</h2>
            <div className="svc-prose">
              <p>Booking your 11 seater maxi cab in Sydney with TipTop Maxi Sydney is quick and convenient. Simply use our online booking system to:</p>
              <ul>
                {bookingSteps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p>
                Our 24/7 availability guarantees that your Sydney airport group transfer or city transport is
                ready whenever you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrustRow />

      <div className="svc-highlight-band">
        <div className="svc-section-inner">
          <p>Maxi/Taxi Transfer Services Sydney</p>
          <h2>Book Your 11-Seater Maxi Cab in Sydney Today</h2>
        </div>
      </div>

      <ServiceFaq title="11 Seater Minibus Transport FAQs" faqs={faqs} bgImage="/images/deals-bg.jpg" />
    </>
  );
}
