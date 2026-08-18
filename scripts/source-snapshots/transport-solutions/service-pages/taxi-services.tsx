import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

const PAGE_URL = `${siteConfig.url}/taxi-services/`;

export const metadata: Metadata = {
  title: "Taxi Services Sydney | Book Online",
  description:
    "Browse TipTop Maxi Sydney's full range of taxi services — airport transfers, corporate transport, cruise terminal transfers, general transfers, parcel delivery and race day transfers.",
  alternates: { canonical: PAGE_URL },
};

const services = [
  {
    title: "Sydney Airport Transfer",
    image: "/images/hub-Sydney-Airport-Transfer.png",
    href: "/taxi-services/sydney-airport-transfer/",
    description:
      "Enjoy a smooth trip with our Sydney Airport transfers, offering 7-seater and 11-seater maxi cabs, sedans, and wheelchair-accessible vehicles. We provide on-time pickups, comfortable seating, and child seats on request for a stress-free start or end to your journey.",
  },
  {
    title: "Corporate (CBD) Transfer",
    image: "/images/hub-Corporate-Taxi-Sydney.png",
    href: "/taxi-services/corporate-transfers/",
    description:
      "Make every business trip seamless with our premium corporate transfers. We offer professional airport pickups, direct transfers to the Sydney CBD, and transport to meetings, conferences, and events. Our fleet includes maxi cabs, sedans, and wheelchair-accessible vehicles, ensuring comfort and convenience for travelling professionals and their families.",
  },
  {
    title: "Cruise Transfer Sydney",
    image: "/images/hub-Cruise-Transfer-Sydney.png",
    href: "/taxi-services/cruise-terminal-transfer-sydney/",
    description:
      "Start or end your cruise in comfort with our Sydney cruise transfers. We provide transport between Sydney suburbs and the cruise terminal, with 7-seater and 11-seater maxi cabs, sedans, and accessible vehicles available. Enjoy a stress-free journey with plenty of room for passengers and luggage, plus child seats on request.",
  },
  {
    title: "General Transfer",
    image: "/images/hub-General-Transfer-Sydney.png",
    href: "/taxi-services/general-transfers/",
    description:
      "From city tours to suburb trips, our general transfer service covers all your Sydney travel needs. Choose the right vehicle for your group — from a comfy sedan to our spacious maxi cabs — and enjoy a clean, reliable ride with a professional driver. Options include wheelchair access and family-friendly features like car seats.",
  },
  {
    title: "Parcel Transfer",
    image: "/images/hub-Parcel-Delivery-Sydney.png",
    href: "/taxi-services/parcel-delivery-taxi-transfer/",
    description:
      "Send parcels securely with TipTop's parcel delivery service. Whether it's a small package or bulky office equipment, our maxi cabs and parcel delivery service ensure safe, on-time transport to any Sydney location. We handle both business and personal deliveries with care and efficiency.",
  },
  {
    title: "Raceday Transfer",
    image: "/images/hub-Raceday-Transfer-Sydney.png",
    href: "/taxi-services/race-day-transfers-sydney/",
    description:
      "Travel to the races in style with our dedicated Race Day transfers. We offer 1–11 seater vehicles, including wheelchair-accessible options, so your group arrives together, comfortably, and on time. Perfect for a day at the track without the hassle of parking or public transport.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Taxi Services" },
  ],
};

export default function TaxiServicesHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="svc-section" style={{ paddingTop: 56 }}>
        <div className="svc-section-inner">
          <h1 style={{ textAlign: "center", marginBottom: 40 }}>Popular Sydney Transfer Services</h1>
          <div className="tt-hub-grid">
            {services.map((s) => (
              <div className="tt-hub-card" key={s.href}>
                <div className="tt-hub-card-media">
                  <Image src={s.image} alt={s.title} width={480} height={274} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <Link href={s.href} className="tt-btn tt-btn-quote">
                  Book Now <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
