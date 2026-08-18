import type { Metadata } from "next";
import Image from "next/image";
import ServiceHero from "@/components/pages/ServiceHero";
import TrustRow from "@/components/pages/TrustRow";
import { siteConfig } from "@/lib/siteConfig";

const PAGE_URL = `${siteConfig.url}/sedan/`;

export const metadata: Metadata = {
  title: "Sedan Cab Sydney | 4 Seater Transport",
  description:
    "Premium 4 seater sedan cabs for airport transfers, city trips, business travel, and special occasions across Sydney. Book online, available 24/7.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Sedan Cab Sydney | Reliable 4 Seater Transport",
    description:
      "Premium 4 seater sedan cabs for airport transfers, city trips, business travel, and special occasions across Sydney. Book online, available 24/7.",
    url: PAGE_URL,
    type: "article",
    images: ["/images/Sedan.png"],
  },
};

const features = [
  "Comfortable seating for up to 4 passengers",
  "Sufficient luggage space for small to medium bags",
  "Air conditioning for year-round comfort",
  "Child safety seats available on request",
  "Modern, clean, and well-maintained vehicles",
  "Professional and courteous drivers",
  "Easy online booking with instant confirmation",
];

const flexibleOptions = [
  "Airport transfers with efficient sedan service",
  "Hotel pickups and drop-offs",
  "Corporate and business travel",
  "Personal and event transport",
  "Family-friendly rides with child seat options",
];

const bookingSteps = [
  "Visit the TipTop Maxi Sydney website or contact our support team",
  "Select your pickup and drop-off locations",
  "Choose the sedan cab option",
  "Receive an instant fare estimate",
  "Confirm your booking with immediate online confirmation",
];

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": PAGE_URL,
  url: PAGE_URL,
  name: "Sedan Cab Sydney | Reliable 4 Seater Transport",
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  inLanguage: "en-AU",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Sedan" },
  ],
};

export default function SedanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <ServiceHero
        title="Sedan Cab Sydney – Reliable 4 Seater Transport"
        description="For smaller groups or individual travellers seeking comfortable and dependable transport in Sydney, TipTop Maxi Sydney offers premium 4 seater sedan cabs. Ideal for airport transfers, city trips, business travel, and special occasions, our sedan service ensures a professional and personalised experience every time."
        bgImage="/images/Sedan.png"
      />

      <section className="svc-section">
        <div className="svc-section-inner">
          <div className="svc-grid-2" style={{ marginBottom: 56 }}>
            <div className="svc-prose">
              <h2>Why Choose Our Sedan Cab Service</h2>
              <p>
                Our sedan cabs combine comfort, punctuality, and convenience to provide a smooth and hassle-free
                travel experience. Whether you need a quick Sydney Airport pickup or a ride to your hotel or
                corporate event, TipTop Maxi Sydney&apos;s sedan service caters to your transport needs:
              </p>
              <ul>
                <li>Efficient Sydney Airport transfers with sedan cabs</li>
                <li>City and CBD hotel pickups and drop-offs</li>
                <li>Business travel and corporate transport</li>
                <li>Personal and special occasion transport</li>
                <li>Child seat availability for safe family travel</li>
              </ul>
              <p>Our experienced drivers and well-maintained vehicles guarantee a premium ride every time.</p>
            </div>
            <div>
              <div className="svc-image">
                <Image src="/images/double-car.png" alt="TipTop Maxi Sydney sedan cab" width={612} height={344} />
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
            <h2>Features of TipTop Maxi Sydney&apos;s Sedan Cabs</h2>
            <div className="svc-prose">
              <ul>
                {features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ marginBottom: 56 }}>
            <h2>Flexible Transport Services Across Sydney</h2>
            <div className="svc-prose">
              <p>
                TipTop Maxi Sydney&apos;s sedan cabs offer flexible transport options, including:
              </p>
              <ul>
                {flexibleOptions.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
              <p>
                Our sedans are a reliable alternative to rideshare or public transport for smaller groups or
                individual travellers.
              </p>
            </div>
          </div>

          <div>
            <h2>How to Book Your Sedan Cab</h2>
            <div className="svc-prose">
              <p>Booking your 4 seater sedan cab is quick and hassle-free:</p>
              <ul>
                {bookingSteps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p>Our 24/7 service ensures transport is available whenever you need it.</p>
            </div>
          </div>
        </div>
      </section>

      <TrustRow />

      <div className="svc-highlight-band">
        <div className="svc-section-inner">
          <p>Maxi/Taxi Transfer Services Sydney</p>
          <h2>Book Your Sedan Cab Today</h2>
        </div>
      </div>
    </>
  );
}
