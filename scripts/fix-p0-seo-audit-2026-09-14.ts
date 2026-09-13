/**
 * P0 fixes from the 2026-09-14 external SEO/AEO audit of tiptopmaxisydney.com.au, agreed with
 * the client:
 *
 * 1. sydney-airport-transfers was thinner than the homepage's own airport pickup copy
 *    (components/home/InfoSection.tsx + SupportSection.tsx in the frontend repo). Adds the
 *    same T1/T2/T3 pickup-point, flight-delay, vehicle-choice, fares/tolls and availability
 *    detail as new content sections up front, plus matching FAQs, without deleting the
 *    page's existing sections. Fixes one now-inaccurate bullet ("dedicated rideshare area"
 *    for all terminals) and a "Benefits includes" grammar slip while here.
 * 2. baby-seat-taxi-sydney's intro copy was old keyword-stuffed SEO writing ("Sydney Car Seat
 *    Transfer, Maxi Cabs from Sydney, Taxi Maxi Cabs with Car Seat..."). Rewritten as
 *    human-first copy; h1/metaTitle were already fine and are untouched.
 * 3. 11-seater-taxi-sydney's h1/metaTitle were keyword-heavy ("Maxi Cab Sydney 11 Seater
 *    (Minibus Taxi for Groups & Luggage)"). Simplified per audit recommendation; body content
 *    sections/FAQ untouched (already in decent shape from the 2026-08-22 capacity-wording fix).
 *
 * Note: the audit's item #1 (baby-seat-taxi-sydney vs /premium-services/taxi-with-baby-seat/
 * duplicate URL) and item #2 (group-transport-sydney indexing inconsistency) were investigated
 * and found already resolved / not an active bug - see conversation notes. No code or content
 * change needed for those two.
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-p0-seo-audit-2026-09-14.ts
 * DRY_RUN=true to preview without writing.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";

async function run() {
  const payload = await getPayload({ config });
  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found.`);
  const siteId = site.id as string;

  const dryRun = process.env.DRY_RUN === "true";

  async function getDoc(slug: string) {
    const res = await payload.find({ collection: "pages", where: { and: [{ site: { equals: siteId } }, { slug: { equals: slug } }] }, limit: 1 });
    const doc = res.docs[0];
    if (!doc) console.warn(`SKIP (page not found): ${slug}`);
    return doc as any;
  }

  async function save(slug: string, id: string, data: Record<string, unknown>) {
    if (dryRun) {
      console.log(`  [${slug}] DRY RUN - would update fields: ${Object.keys(data).join(", ")}`);
      return;
    }
    await payload.update({ collection: "pages", id, data });
    console.log(`  [${slug}] saved.`);
  }

  // ---------------------------------------------------------------------------------------
  // 1. sydney-airport-transfers - make it the definitive Sydney Airport resource
  // ---------------------------------------------------------------------------------------
  {
    const slug = "sydney-airport-transfers";
    const doc = await getDoc(slug);
    if (doc) {
      const newSections = [
        {
          heading: "Sydney Airport Terminal Pickup Points",
          paragraphs: [
            {
              text: "Pickup location depends on which terminal you're arriving into. There is no meet-and-greet or name-board service inside the terminal - your driver's contact details are sent before you land so you can connect quickly once you reach the pickup zone.",
            },
          ],
          bulletList: [
            { text: "T1 (International Terminal): meet your driver at the designated Rideshare Pickup Area" },
            { text: "T2 & T3 (Domestic Terminals): meet your driver at the designated Priority Pickup Area" },
            { text: "Driver contact details (name, vehicle, phone number) are sent before your flight lands" },
            { text: "Departures: share your flight number when booking so we can plan your pickup time around check-in and security" },
          ],
        },
        {
          heading: "Flight Delays & Waiting Time",
          paragraphs: [
            {
              text: "We monitor your inbound flight automatically, so a delayed flight adjusts your pickup time without you needing to call. Waiting time at the pickup zone is free within a reasonable window after landing - if your bags are taking longer than expected, message or call your driver directly.",
            },
          ],
          bulletList: [],
        },
        {
          heading: "Choosing the Right Vehicle for Your Transfer",
          paragraphs: [
            {
              text: "Vehicle choice depends on your passenger count and luggage, not just seat numbers - a vehicle near its maximum passenger capacity has less room for bags. Tell us your numbers when booking and we'll confirm the right fit.",
            },
          ],
          bulletList: [
            { text: "1-4 passengers with standard luggage: sedan" },
            { text: "Small group with extra luggage: SUV" },
            { text: "Up to 7 passengers: 7 Seater" },
            { text: "7 passengers with substantial luggage, or 8-11 passengers: 11 Seater" },
            { text: "Wheelchair user: wheelchair-accessible vehicle (request when booking)" },
            { text: "Travelling with an infant or young child: any vehicle plus a requested child restraint" },
          ],
        },
        {
          heading: "Fares, Tolls & Airport Fees",
          paragraphs: [
            {
              text: "Your fare is quoted upfront before you travel, based on vehicle type, pickup point, destination, and any applicable tolls or Sydney Airport access fees - so there are no surprises on arrival.",
            },
          ],
          bulletList: [],
        },
        {
          heading: "Early-Morning, Last-Minute & Regional Transfers",
          paragraphs: [
            {
              text: "TipTop Maxi Sydney operates 24/7, including early-morning departures and last-minute bookings where a vehicle is available. We also cover transfers beyond the immediate airport precinct, connecting Sydney Airport with suburbs across greater Sydney and regional NSW.",
            },
          ],
          bulletList: [],
        },
        // Existing sections, kept - with one bullet corrected below for accuracy.
        ...doc.contentSections.map((s: any) => ({
          heading: s.heading,
          paragraphs: (s.paragraphs ?? []).map((p: any) => ({ text: p.text })),
          bulletList: (s.bulletList ?? []).map((b: any) => ({
            text:
              b.text === "Priority Pickup Zones: Skip the queues! Meet us at the dedicated rideshare area for quick and easy access."
                ? "Priority Pickup Zones: T1 uses the Rideshare Pickup Area; T2 and T3 use the Priority Pickup Area - full details above."
                : b.text,
          })),
        })),
      ];
      // Fix the "Benefits includes:" grammar slip on the (now second) existing heading.
      const fixedSections = newSections.map((s: any) =>
        s.heading === "Sydney Airport Pickup Benefits includes:" ? { ...s, heading: "Sydney Airport Pickup Benefits" } : s
      );

      const existingFaq = (doc.faq ?? []).map((f: any) => ({
        question: f.question,
        answer:
          f.question === "1. How much does a taxi from Sydney Airport cost?"
            ? "The fare depends on your destination, travel time, tolls, and vehicle type. We quote a fixed, upfront fare before you travel, so there are no surprises on arrival."
            : f.answer,
      }));

      const newFaq = [
        {
          question: "Where do I meet my driver at Sydney Airport?",
          answer:
            "T1 (International) pickups meet at the designated Rideshare Pickup Area. T2 and T3 (Domestic) pickups meet at the designated Priority Pickup Area. Your driver's contact details are sent before you land.",
        },
        {
          question: "Do you provide meet and greet inside the terminal?",
          answer:
            "No. Sydney Airport pickups take place at the designated pickup areas outside the terminal, not inside arrivals. Driver details are shared beforehand so you can connect quickly.",
        },
        {
          question: "Can I get an 11 seater or wheelchair-accessible vehicle for an airport transfer?",
          answer:
            "Yes. Vehicles from a sedan up to an 11-seater maxi cab are available, along with wheelchair-accessible vehicles - just specify your requirements when booking.",
        },
        {
          question: "Do you provide transfers from Sydney Airport to regional NSW or Western Sydney Airport?",
          answer:
            "Yes. We provide transfers beyond metropolitan Sydney to regional NSW, and Western Sydney Airport transfers from 25 October 2026 onward.",
        },
      ];

      await save(slug, doc.id, {
        heroDescription:
          "TipTop Maxi Sydney provides pre-booked, fixed-fare transfers to and from Sydney Airport, 24/7. T1 (International) pickups meet at the designated Rideshare Pickup Area; T2 and T3 (Domestic) pickups meet at the Priority Pickup Area. Your flight is tracked automatically, so pickup times adjust for delays. Vehicles range from a sedan to an 11-seater maxi cab, with baby seats and wheelchair-accessible vehicles available on request.",
        contentSections: fixedSections,
        faq: [...existingFaq, ...newFaq],
      });
    }
  }

  // ---------------------------------------------------------------------------------------
  // 2. baby-seat-taxi-sydney - human-first intro copy, remove keyword stuffing
  // ---------------------------------------------------------------------------------------
  {
    const slug = "baby-seat-taxi-sydney";
    const doc = await getDoc(slug);
    if (doc) {
      const [firstSection, secondSection, ...rest] = doc.contentSections;

      await save(slug, doc.id, {
        heroDescription:
          "Pre-book a sedan, SUV or larger taxi with an age-appropriate child restraint. Baby capsules, forward-facing seats and boosters are available on request for airport, hotel and suburb transfers across Sydney.",
        contentSections: [
          {
            heading: "Book a Taxi With a Baby Seat in Sydney",
            paragraphs: [
              {
                text: "TipTop Maxi Sydney provides taxis and maxi cabs fitted with child restraints for families travelling across Sydney and NSW. Tell us your child's age when booking and we'll match an appropriate capsule, convertible or booster seat to your vehicle.",
              },
              {
                text: "Vehicles range from a standard sedan up to an 11-seater maxi cab, so larger families travelling with multiple children and luggage aren't limited to a single seat type.",
              },
            ],
            bulletList: (firstSection.bulletList ?? []).map((b: any) => ({ text: b.text })),
          },
          {
            heading: secondSection.heading,
            paragraphs: [
              { text: "Baby seats are fitted before pickup and confirmed as part of your booking - no need to bring your own unless you prefer to." },
            ],
            bulletList: (secondSection.bulletList ?? [])
              .map((b: any) => ({
                text: b.text === "Call to book a taxi with a baby seat" ? "Available for airport transfers, hospital trips and everyday suburb travel" : b.text,
              })),
          },
          ...rest.map((s: any) => ({
            heading: s.heading,
            paragraphs: (s.paragraphs ?? []).map((p: any) => ({ text: p.text })),
            bulletList: (s.bulletList ?? []).map((b: any) => ({ text: b.text })),
          })),
        ],
      });
    }
  }

  // ---------------------------------------------------------------------------------------
  // 3. 11-seater-taxi-sydney - simplify h1/metaTitle, direct-answer hero
  // ---------------------------------------------------------------------------------------
  {
    const slug = "11-seater-taxi-sydney";
    const doc = await getDoc(slug);
    if (doc) {
      await save(slug, doc.id, {
        h1: "11 Seater Taxi Sydney",
        metaTitle: "11 Seater Taxi Sydney | Large Taxi for Groups & Airport Transfers",
        metaDescription:
          "Book an 11 seater taxi in Sydney for airport transfers, corporate groups, cruise transfers and larger families. Passenger and luggage capacity depends on vehicle configuration and is confirmed at booking.",
        heroDescription:
          "TipTop Maxi Sydney provides pre-booked 11-seater taxis across Sydney for airport transfers, corporate groups, cruise transfers and larger families. Passenger and luggage capacity depends on vehicle configuration - tell us your numbers when booking and we'll confirm the right vehicle.",
      });
    }
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
