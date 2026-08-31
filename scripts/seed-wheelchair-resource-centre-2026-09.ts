/**
 * "Accessible Transport Resource Centre" blog posts for the wheelchair site - the doc's
 * informational-authority ask, kept deliberately concise per its own content-quality rule
 * ("do not write generic 2000 word AI articles just to increase word count"). Reuses images
 * already live in wheelchair-taxi-sydney/public/images.
 *
 * Seeded as seoStatus: "review", indexOverride: "none" - not indexed until approved.
 *
 * Run with: npm run seed:wheelchair-resource-centre   (from content-hub/)
 * Requires npm run seed:wheelchair to have been run first (creates the site doc).
 * Safe to re-run - existing docs (matched by site+slug) are updated, not duplicated.
 */
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { upsertBySlug, createMediaUploader } from "./seedUtils";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../wheelchair-taxi-sydney/public");

type Section = { heading?: string; paragraphs: string[] };

type PostInput = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  date: string;
  image: string;
  imageAlt: string;
  sections: Section[];
};

const posts: PostInput[] = [
  {
    slug: "how-to-book-a-wheelchair-taxi-in-sydney",
    title: "How to Book a Wheelchair Taxi in Sydney",
    metaTitle: "How to Book a Wheelchair Taxi in Sydney | Wheelchair Taxi Sydney",
    metaDescription: "A step-by-step guide to booking a wheelchair accessible taxi in Sydney, including what details to have ready and how far ahead to book.",
    excerpt: "What to have ready and how the process works when booking a wheelchair accessible taxi in Sydney.",
    date: "2026-08-15",
    image: "wheelchair-taxi-booking.png",
    imageAlt: "Passenger booking a wheelchair accessible taxi in Sydney",
    sections: [
      {
        heading: "Before You Book",
        paragraphs: [
          "Have your pickup and destination addresses ready, along with your preferred date and time. If you need a return trip, decide on that upfront - it's easier to book both legs together than to add a return later.",
          "Know your wheelchair or mobility equipment type (manual wheelchair, powered wheelchair, or mobility scooter) and, if it's a larger powered wheelchair, an approximate sense of its size. This is the single biggest factor in matching you to a suitable vehicle.",
        ],
      },
      {
        heading: "What You'll Be Asked",
        paragraphs: [
          "Expect to be asked how many passengers are travelling, whether a carer or support worker is coming too, and whether you'll remain seated in your wheelchair for the trip.",
          "If you're an NDIS participant, let the booking team know whether you're self-managed, plan-managed or NDIA-managed, and pass on any plan manager or support coordinator details if relevant.",
        ],
      },
      {
        heading: "How Far Ahead to Book",
        paragraphs: [
          "For a routine appointment, booking a day or two ahead gives the most flexibility on vehicle availability. Same-day bookings are handled where possible, but earlier is always safer for time-sensitive trips like flights or scheduled procedures.",
          "If you need the same trip regularly, ask about setting up a recurring booking instead of booking each one individually.",
        ],
      },
    ],
  },
  {
    slug: "manual-vs-powered-wheelchair-transport",
    title: "Manual vs Powered Wheelchair Transport",
    metaTitle: "Manual vs Powered Wheelchair Transport | Wheelchair Taxi Sydney",
    metaDescription: "The practical differences between transporting a manual wheelchair and a powered wheelchair, and why it affects which vehicle you need.",
    excerpt: "Why the type of wheelchair you use changes what vehicle and booking details are needed.",
    date: "2026-08-18",
    image: "powered-wheelchair.webp",
    imageAlt: "Powered wheelchair being loaded into an accessible vehicle",
    sections: [
      {
        heading: "Why the Difference Matters",
        paragraphs: [
          "Manual and powered wheelchairs differ in weight, size and how they're secured, which is why we always ask which type you use before confirming a booking.",
          "A manual wheelchair is generally lighter and easier to manoeuvre into most accessible vehicles. A powered wheelchair is heavier, often larger, and needs a vehicle with a ramp or lift rated for that weight.",
        ],
      },
      {
        heading: "Large Powered Wheelchairs",
        paragraphs: [
          "Some powered wheelchairs are significantly larger and heavier than standard models. If this applies to you, telling us the approximate dimensions and weight when booking lets us confirm vehicle suitability in advance rather than on the day.",
          "This isn't about turning any booking away - it's about making sure the vehicle that arrives can actually accommodate your chair safely.",
        ],
      },
      {
        heading: "What Stays the Same",
        paragraphs: [
          "Whichever type you use, our process is the same: wheelchair restraint points secure the chair before the vehicle moves, and drivers assist with boarding via the vehicle's ramp or lift.",
        ],
      },
    ],
  },
  {
    slug: "what-information-should-i-provide-when-booking-a-wheelchair-taxi",
    title: "What Information Should I Provide When Booking a Wheelchair Taxi?",
    metaTitle: "What to Provide When Booking a Wheelchair Taxi | Wheelchair Taxi Sydney",
    metaDescription: "A checklist of the details that help us match you with the right wheelchair accessible vehicle, from equipment type to carer travel.",
    excerpt: "A quick checklist of details that help us allocate the right vehicle for your trip.",
    date: "2026-08-20",
    image: "accessible-van-assistance.webp",
    imageAlt: "Driver assisting a passenger into a wheelchair accessible vehicle",
    sections: [
      {
        heading: "The Essentials",
        paragraphs: [
          "Pickup and destination addresses, date and time, and your wheelchair or mobility device type are the minimum we need for any booking.",
          "Beyond that, a few extra details make a real difference: number of passengers, whether a carer or support worker is travelling, and whether you need to remain seated in your wheelchair during the trip.",
        ],
      },
      {
        heading: "If You're Booking for Someone Else",
        paragraphs: [
          "Support coordinators, plan managers, family members and facility staff can all book on someone else's behalf - just let us know who you're booking for and pass on their equipment and support needs as accurately as you can.",
        ],
      },
      {
        heading: "For NDIS, Aged Care or Recurring Bookings",
        paragraphs: [
          "If it's an NDIS booking, tell us whether the participant is self-managed, plan-managed or NDIA-managed. For aged care residents, facility staff can provide care instructions directly.",
          "If this is a trip you'll need again on a regular basis, mention that upfront - it's simpler to set up as a recurring arrangement than to repeat the same details each time.",
        ],
      },
    ],
  },
  {
    slug: "how-wheelchairs-are-secured-in-accessible-vehicles",
    title: "How Wheelchairs Are Secured in Accessible Vehicles",
    metaTitle: "How Wheelchairs Are Secured in Accessible Vehicles | Wheelchair Taxi Sydney",
    metaDescription: "An explanation of how wheelchairs are secured during transport, from boarding via ramp or lift to restraint points inside the vehicle.",
    excerpt: "What actually happens to secure your wheelchair once you're on board.",
    date: "2026-08-22",
    image: "wheelchair-accessible-ford-transit-custom.jpg",
    imageAlt: "Wheelchair restraint points inside an accessible vehicle",
    sections: [
      {
        heading: "Boarding",
        paragraphs: [
          "Accessible vehicles use a ramp or hydraulic lift to bring a wheelchair on board. Drivers assist with this step, positioning the chair for a stable boarding rather than leaving passengers to manage it alone.",
        ],
      },
      {
        heading: "Restraint Points",
        paragraphs: [
          "Once inside, the wheelchair is secured using the vehicle's built-in restraint points before the vehicle moves. This is a standard step on every wheelchair accessible booking, not an optional extra.",
          "If you have any preference about how or where you're positioned in the vehicle, let the driver know before departure.",
        ],
      },
      {
        heading: "Ongoing Checks",
        paragraphs: [
          "Accessible vehicles, along with their ramps, lifts and restraints, are checked as part of regular vehicle maintenance. See our Safety & Accessibility page for more detail on what to expect from our vehicles and drivers.",
        ],
      },
    ],
  },
  {
    slug: "can-a-mobility-scooter-travel-in-a-wheelchair-taxi",
    title: "Can a Mobility Scooter Travel in a Wheelchair Taxi?",
    metaTitle: "Can a Mobility Scooter Travel in a Wheelchair Taxi? | Wheelchair Taxi Sydney",
    metaDescription: "What to know about travelling with a mobility scooter in a wheelchair accessible taxi, including 3-wheel vs 4-wheel scooters and vehicle suitability.",
    excerpt: "What determines whether your mobility scooter can travel in our vehicles.",
    date: "2026-08-25",
    image: "mobility-scooter.webp",
    imageAlt: "Mobility scooter being transported in an accessible vehicle",
    sections: [
      {
        heading: "It Depends on the Scooter",
        paragraphs: [
          "Mobility scooter transport is generally possible, but it depends on the scooter's dimensions, weight and securement compatibility, along with which vehicle is available on the day.",
          "Both 3-wheel and 4-wheel scooters can usually be accommodated, but we ask for the type and approximate size when booking so we can confirm vehicle suitability rather than guessing.",
        ],
      },
      {
        heading: "Staying On the Scooter vs Transferring",
        paragraphs: [
          "Whether you remain on your mobility scooter during the trip or transfer to a seat depends on the vehicle's configuration and the scooter's securement compatibility. Let us know your preference when booking and we'll confirm what's possible.",
        ],
      },
      {
        heading: "Booking Tips",
        paragraphs: [
          "The more detail you can give us about your scooter upfront - make, model, and approximate dimensions if you have them - the more accurately we can match you to a suitable vehicle before the day of travel.",
        ],
      },
    ],
  },
  {
    slug: "wheelchair-taxi-vs-community-transport",
    title: "Wheelchair Taxi vs Community Transport",
    metaTitle: "Wheelchair Taxi vs Community Transport | Wheelchair Taxi Sydney",
    metaDescription: "The practical differences between a private wheelchair taxi and community transport services, and when each makes sense.",
    excerpt: "How a private wheelchair taxi service differs from community transport, and when to use each.",
    date: "2026-08-27",
    image: "best-wheelchair-taxi-service-sydney.webp",
    imageAlt: "Private wheelchair accessible taxi service in Sydney",
    sections: [
      {
        heading: "Different Models, Different Strengths",
        paragraphs: [
          "Community transport services are typically shared, scheduled, and run by community organisations, often at a subsidised cost for eligible members. A private wheelchair taxi service is on-demand or pre-booked, individually arranged, and available whenever you need it.",
          "Neither is universally 'better' - the right choice depends on how flexible your schedule needs to be and whether you're eligible for a community transport program in your area.",
        ],
      },
      {
        heading: "When a Private Service Makes Sense",
        paragraphs: [
          "A private wheelchair taxi is generally the better fit for time-sensitive trips (flights, appointments with a fixed time), last-minute bookings, or when you want a consistent, direct door-to-door service without sharing the trip with other passengers.",
        ],
      },
      {
        heading: "They Can Work Together",
        paragraphs: [
          "Many of our passengers use community transport for some trips and a private service for others - for example, a subsidised community bus for a regular social outing, and a private booking for an airport transfer or urgent appointment.",
        ],
      },
    ],
  },
  {
    slug: "how-to-arrange-recurring-accessible-transport",
    title: "How to Arrange Recurring Accessible Transport",
    metaTitle: "How to Arrange Recurring Accessible Transport | Wheelchair Taxi Sydney",
    metaDescription: "How to set up a recurring wheelchair accessible transport arrangement for weekly therapy, day programs or regular medical appointments.",
    excerpt: "Setting up a standing schedule instead of booking the same trip over and over.",
    date: "2026-08-29",
    image: "wheelchair-taxi-sydney-banner.webp",
    imageAlt: "Wheelchair taxi set up for a recurring transport schedule",
    sections: [
      {
        heading: "When Recurring Transport Makes Sense",
        paragraphs: [
          "If you (or someone you're arranging transport for) attend the same appointment, program or activity on a regular basis - weekly therapy, a day program, dialysis, or a school or work run - it's worth setting this up as a standing arrangement rather than booking each trip separately.",
        ],
      },
      {
        heading: "What to Provide",
        paragraphs: [
          "Give our team the pickup and destination, the days and times you need the trip, and the passenger's wheelchair or mobility equipment details. If a carer or support worker travels along, or if the booking is being arranged by a support coordinator or plan manager, mention that upfront too.",
        ],
      },
      {
        heading: "Flexibility",
        paragraphs: [
          "A recurring arrangement isn't rigid - appointments move and programs change, so let us know as early as possible if a particular trip needs to be adjusted or paused. See our Recurring Wheelchair Transport page for more detail.",
        ],
      },
    ],
  },
  {
    slug: "wheelchair-airport-travel-guide-sydney",
    title: "Wheelchair Airport Travel Guide Sydney",
    metaTitle: "Wheelchair Airport Travel Guide Sydney | Wheelchair Taxi Sydney",
    metaDescription: "A practical guide to wheelchair accessible airport transfers in Sydney, covering terminals, luggage, carers and delayed flights.",
    excerpt: "What to plan for when arranging a wheelchair accessible airport transfer in Sydney.",
    date: "2026-08-30",
    image: "silver-service-wheelchair-taxi.jpg",
    imageAlt: "Wheelchair accessible airport transfer vehicle in Sydney",
    sections: [
      {
        heading: "Booking Ahead",
        paragraphs: [
          "Airport trips are more time-sensitive than most, so we recommend booking ahead rather than on the day, with extra buffer time built in for traffic. Provide your flight number and terminal so we can plan the pickup or drop-off accordingly.",
        ],
      },
      {
        heading: "Terminals, Luggage and Carers",
        paragraphs: [
          "Let us know which terminal you're travelling through, whether you're bringing luggage in addition to your wheelchair, and whether a carer or support worker is travelling with you, so we can confirm the vehicle has enough space.",
        ],
      },
      {
        heading: "Delayed Flights",
        paragraphs: [
          "If your flight is delayed, contact our team as early as you can so we can adjust the pickup time. This applies to both arrivals and return airport transfers booked in advance.",
        ],
      },
    ],
  },
  {
    slug: "wheelchair-transport-for-hospital-appointments",
    title: "Wheelchair Transport for Hospital Appointments",
    metaTitle: "Wheelchair Transport for Hospital Appointments | Wheelchair Taxi Sydney",
    metaDescription: "What to know when arranging wheelchair accessible transport for a hospital appointment, discharge or recurring treatment in Sydney.",
    excerpt: "Arranging accessible transport for hospital appointments, discharge, and recurring treatment.",
    date: "2026-08-31",
    image: "organisations-and-customers-we-assist.webp",
    imageAlt: "Wheelchair accessible vehicle used for a hospital appointment",
    sections: [
      {
        heading: "Outpatient Appointments",
        paragraphs: [
          "For a standard outpatient appointment, book ahead with your pickup address, the hospital and department you're attending, and your wheelchair or mobility equipment details, so we can plan for hospital pickup zones.",
        ],
      },
      {
        heading: "Hospital Discharge",
        paragraphs: [
          "Discharge timing can shift, so contact us as early as possible once a likely discharge time is known. Hospital or clinic staff can also book directly on a patient's behalf - see our page for hospitals and clinics.",
        ],
      },
      {
        heading: "Recurring Treatment",
        paragraphs: [
          "For regular treatment such as dialysis or rehabilitation, setting up recurring transport avoids having to book each session individually. Let our team know your treatment schedule when you first get in touch.",
        ],
      },
    ],
  },
  {
    slug: "how-to-arrange-accessible-transport-for-an-ndis-participant",
    title: "How to Arrange Accessible Transport for an NDIS Participant",
    metaTitle: "Accessible Transport for an NDIS Participant | Wheelchair Taxi Sydney",
    metaDescription: "How support coordinators, plan managers and families can arrange wheelchair accessible transport for an NDIS participant in Sydney.",
    excerpt: "A guide for support coordinators, plan managers and families arranging transport for an NDIS participant.",
    date: "2026-09-01",
    image: "what-is-ndis.webp",
    imageAlt: "Wheelchair accessible vehicle used for NDIS participant transport",
    sections: [
      {
        heading: "Who Can Book",
        paragraphs: [
          "The participant themselves, a family member or carer, a support coordinator, or a plan manager can all arrange the booking - whoever is coordinating transport for the participant can contact our team directly.",
        ],
      },
      {
        heading: "What to Have Ready",
        paragraphs: [
          "As an NDIS registered provider, we can support self-managed, plan-managed and NDIA-managed participants. Let us know which applies, along with the participant's wheelchair or mobility equipment details and any carer or support worker who will be travelling.",
          "If a plan manager is handling invoicing, provide their details so billing can be set up correctly from the start.",
        ],
      },
      {
        heading: "One-Off or Recurring",
        paragraphs: [
          "For a single appointment, a standard booking is enough. For therapy, day programs or other regular commitments, setting up recurring transport is usually simpler for everyone involved - see our Recurring Wheelchair Transport and Organisations pages for more detail.",
        ],
      },
    ],
  },
];

async function run() {
  const payload = await getPayload({ config });
  const getOrUploadMedia = createMediaUploader(payload, publicDir);
  const site = await payload.find({ collection: "sites", where: { key: { equals: "wheelchair" } }, limit: 1 });
  const siteId = site.docs[0]?.id;
  if (!siteId) throw new Error('Site "wheelchair" not found - run npm run seed:wheelchair first.');

  console.log(`Seeding ${posts.length} Resource Centre blog posts (seoStatus: review)...`);
  for (const p of posts) {
    const imageId = await getOrUploadMedia(`/images/${p.image}`, p.imageAlt);
    const data = {
      site: siteId,
      seoStatus: "review" as const,
      indexOverride: "none" as const,
      slug: p.slug,
      title: p.title,
      metaTitle: p.metaTitle,
      metaDescription: p.metaDescription,
      excerpt: p.excerpt,
      date: new Date(p.date).toISOString(),
      image: imageId,
      sections: p.sections.map((s) => ({ heading: s.heading, paragraphs: s.paragraphs.map((text) => ({ text })) })),
    };
    await upsertBySlug(payload, "blog-posts", siteId as string, p.slug, data);
    console.log(`  post: ${p.slug}`);
  }

  console.log("Done. All posts are seoStatus: review - not indexed until approved in the CMS.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
