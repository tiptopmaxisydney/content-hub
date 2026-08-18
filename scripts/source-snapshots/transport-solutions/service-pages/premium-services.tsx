import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";

const PAGE_URL = `${siteConfig.url}/premium-services/`;

export const metadata: Metadata = {
  title: "Premium Taxi Services Sydney",
  description:
    "TipTop Maxi Sydney's premium services — wheelchair accessible taxis, taxis with car seats, and pet-friendly transport across Sydney.",
  alternates: { canonical: PAGE_URL },
};

const services = [
  {
    title: "Wheelchair Taxi Sydney",
    image: "/images/hub-wheel-chair-6.jpg",
    href: "/premium-services/wheelchair-accessible-taxi-sydney/",
    description:
      "Wheelchair-accessible maxi cabs designed for safe and comfortable transportation across Sydney. Approved wheelchairs can be safely secured within the vehicle, with drivers experienced in assisting passengers with mobility requirements.",
  },
  {
    title: "Sydney Car Seat Transfer",
    image: "/images/hub-baby-seat-taxi-sydney-5.jpg",
    href: "/premium-services/taxi-with-baby-seat/",
    description:
      "Age-appropriate baby seats, toddler seats, and booster seats fitted on request. Ideal for family travel across Sydney, from airport transfers to everyday trips, with child restraints selected to meet Australian safety requirements.",
  },
  {
    title: "Pet Taxi & Pet Transport",
    image: "/images/hub-pet-taxi3.jpg",
    href: "/premium-services/pet-taxi/",
    description:
      "Pet taxi and pet transport services across Sydney and NSW. Book by appointment with at least 1 day's notice for safe, comfortable transport of your dog, cat, or other domestic pet, with owners welcome to travel along.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Premium Taxi Services" },
  ],
};

export default function PremiumServicesHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="svc-section" style={{ paddingTop: 56 }}>
        <div className="svc-section-inner">
          <h1 style={{ textAlign: "center", marginBottom: 40 }}>Premium Sydney Transfer Services</h1>
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
