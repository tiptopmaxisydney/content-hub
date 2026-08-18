import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ServiceHero from "@/components/pages/ServiceHero";
import TrustRow from "@/components/pages/TrustRow";
import ServiceFaq from "@/components/pages/ServiceFaq";
import { siteConfig } from "@/lib/siteConfig";
import type { Faq } from "@/lib/homeData";

const PAGE_URL = `${siteConfig.url}/maxi-suv/`;

export const metadata: Metadata = {
  title: "Maxi Cab SUV Sydney | 5, 6 & 7 Seater",
  description:
    "TipTop Maxi Sydney's SUV fleet offers 5, 6, or 7 seater SUVs for Sydney Airport transfers, city trips, and events, with professional drivers available 24/7.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Maxi Cab SUV Sydney | Spacious 5, 6 & 7 Seater Group Transport",
    description:
      "TipTop Maxi Sydney's SUV fleet offers 5, 6, or 7 seater SUVs for Sydney Airport transfers, city trips, and events, with professional drivers available 24/7.",
    url: PAGE_URL,
    type: "article",
    images: ["/images/TipTop-Platinum.png"],
  },
};

const specialise = [
  "Sydney Airport transfers with SUV maxi cabs",
  "City hotel pickups and drop-offs",
  "Group transport for corporate events and weddings",
  "Shuttle services across Sydney and NSW suburbs",
  "Family-friendly travel with child seats available",
];

const features = [
  "Comfortable seating for 5, 6, or 7 passengers depending on your group size",
  "Ample luggage space to accommodate suitcases and carry-on bags",
  "Air conditioning for year-round comfort",
  "Child safety seats available on request for family-friendly rides",
  "Spacious legroom and headroom for a relaxing journey",
  "Advanced safety features including airbags and ABS brakes",
  "Clean, well-maintained vehicles to ensure reliability",
  "Easy online booking and instant confirmation for your convenience",
];

const flexibleOptions = [
  "Sydney airport group transfers with SUVs",
  "Sydney city and CBD hotel pickups",
  "Shuttle services for events and conferences",
  "Family travel with child seats and extra luggage space",
  "Accessible transport options for special requirements",
];

const bookingSteps = [
  "Visit the TipTop Maxi Sydney website or call our booking team",
  "Choose your pick-up and drop-off locations",
  "Select the SUV size that fits your group",
  "Receive an instant fare estimate",
  "Confirm your booking with immediate online confirmation",
];

const faqs: Faq[] = [
  { question: "1. What seating options does TipTop Maxi Sydney offer for SUV maxi cabs?", answer: "TipTop Maxi Sydney provides 7, 6, and 5 seater maxi cab SUVs, suitable for groups of various sizes, all offering spacious and comfortable rides." },
  { question: "2. Can I book an SUV maxi cab for Sydney Airport transfers?", answer: "Yes, TipTop Maxi Sydney specialises in airport transfers with SUVs that accommodate passengers and luggage comfortably for hassle-free travel." },
  { question: "3. Are child seats available in the maxi cab SUVs?", answer: "Yes, child safety seats can be requested during booking to ensure a safe and family-friendly trip." },
  { question: "4. How do I book a 7, 6, or 5 seater maxi cab SUV with TipTop Maxi Sydney?", answer: "You can book easily online via the TipTop Maxi Sydney website or call our customer support. Instant fare estimates and confirmations are provided." },
  { question: "5. Does TipTop Maxi Sydney offer 24/7 service?", answer: "Yes, we operate round the clock to meet your travel needs anytime in Sydney." },
  { question: "6. Are the maxi cab SUVs wheelchair accessible?", answer: "While our SUV fleet focuses on luxury and space, TipTop Maxi Sydney offers wheelchair-accessible vehicles in our broader fleet. Please specify your needs when booking." },
];

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": PAGE_URL,
  url: PAGE_URL,
  name: "Maxi Cab SUV Sydney | Spacious 5, 6 & 7 Seater Group Transport",
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  inLanguage: "en-AU",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Maxi SUV" },
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

export default function MaxiSuvPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <ServiceHero
        title="Maxi Cab SUV Sydney – Spacious 5, 6 & 7 Seater Group Transport"
        description="Travelling with family, friends, or colleagues? TipTop Maxi Sydney's SUV fleet offers the perfect balance of comfort, space, and reliability. Choose from 5, 6, or 7 seater SUVs for Sydney Airport transfers, city trips, and events, all with professional drivers available 24/7."
        bgImage="/images/TipTop-Platinum.png"
      />

      <section className="svc-section">
        <div className="svc-section-inner">
          <div className="svc-grid-2" style={{ marginBottom: 56 }}>
            <div className="svc-prose">
              <h2>Why Choose Our Maxi Cab SUVs</h2>
              <p>
                Our Maxi Cab SUVs provide a smooth, comfortable ride with plenty of room for passengers and
                luggage. Whether it&apos;s a Sydney Airport transfer, hotel pickup, or event shuttle, we tailor
                every trip to your needs. We specialise in:
              </p>
              <ul>
                {specialise.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p>
                Our professional drivers offer expert local knowledge and punctual service, making every journey
                hassle-free.
              </p>
            </div>
            <div>
              <div className="svc-image">
                <Image src="/images/TipTop-Platinum.png" alt="TipTop Maxi Sydney SUV" width={612} height={344} />
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
            <h2>Features of Our 5, 6 &amp; 7 Seater SUVs</h2>
            <div className="svc-prose">
              <ul>
                {features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginBottom: 56 }}>
            <h2>Flexible Group Transport Options Across Sydney</h2>
            <div className="svc-prose">
              <p>
                Our SUVs are ideal for small and medium-sized groups looking for more comfort than a standard
                taxi. TipTop Maxi Sydney offers:
              </p>
              <ul>
                {flexibleOptions.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
              <p>
                Need more space? Explore our{" "}
                <Link href="/maxi-11-seater-van/">11-Seater Vans</Link> for larger groups or{" "}
                <Link href="/sedan/">Sedan Cabs</Link> for smaller, individual travel.
              </p>
            </div>
          </div>

          <div>
            <h2>How to Book Your Maxi Cab SUV</h2>
            <div className="svc-prose">
              <p>Booking your preferred 7, 6, or 5 seater maxi cab SUV is simple and fast:</p>
              <ul>
                {bookingSteps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p>Our 24/7 service ensures your Sydney transport needs are covered anytime, day or night.</p>
            </div>
          </div>
        </div>
      </section>

      <TrustRow />

      <div className="svc-highlight-band">
        <div className="svc-section-inner">
          <p>Maxi/Taxi Transfer Services Sydney</p>
          <h2>Book Your Maxi Cab SUV in Sydney Today</h2>
        </div>
      </div>

      <ServiceFaq title="Frequently Asked Questions" faqs={faqs} bgImage="/images/deals-bg.jpg" />
    </>
  );
}
