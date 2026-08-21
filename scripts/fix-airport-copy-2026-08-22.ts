/**
 * Targeted content corrections for transport-solutions-sydney, agreed 2026-08-22:
 * removes "meet & greet / name board / waits inside terminal" claims that contradict
 * the site's actual Sydney Airport pickup procedure (Rideshare/Priority Pickup Area),
 * corrects Western Sydney Airport pages to future tense (WSI opens 25 Oct 2026, not
 * operating yet), removes a leftover legacy body paragraph on pet-taxi-sydney, and
 * softens an absolute luggage-capacity claim on 7-seater-taxi-sydney and large-taxi-sydney.
 *
 * Fetches each doc live and does exact substring replacement against whatever's actually
 * there right now (not a hand-reconstructed copy) - logs a warning if an expected string
 * isn't found, rather than silently no-op'ing.
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-airport-copy-2026-08-22.ts
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";

type Replacement = { old: string; new: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepReplace(value: any, pairs: Replacement[], counts: number[]): any {
  if (typeof value === "string") {
    let out = value;
    pairs.forEach((p, i) => {
      if (out.includes(p.old)) {
        counts[i] += out.split(p.old).length - 1;
        out = out.split(p.old).join(p.new);
      }
    });
    return out;
  }
  if (Array.isArray(value)) return value.map((v) => deepReplace(v, pairs, counts));
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = deepReplace(v, pairs, counts);
    return out;
  }
  return value;
}

const pageFixes: { slug: string; replacements: Replacement[] }[] = [
  {
    slug: "sydney-airport-large-taxi",
    replacements: [
      {
        old: "Flight tracking, meet & greet, fixed fares.",
        new: "Flight tracking, fixed fares.",
      },
      {
        old: "with flight monitoring and meet & greet included, so nobody's left waiting on the kerb.",
        new: "with flight monitoring and pickup at the designated Sydney Airport vehicle pickup area, so nobody's left waiting on the kerb.",
      },
      {
        old: "Meet & greet at arrivals with a name board",
        new: "Pickup at the designated Sydney Airport vehicle pickup area (T1 Rideshare Pickup Area, T2/T3 Priority Pickup Area)",
      },
      {
        old: "Arrivals: your driver waits inside the terminal and helps load bags",
        new: "Arrivals: pickup at the designated vehicle pickup area — T1 Rideshare Pickup Area, T2/T3 Priority Pickup Area — with luggage assistance",
      },
      {
        old: "Is there a meet and greet option?",
        new: "Do you provide meet and greet inside Sydney Airport?",
      },
      {
        old: "Yes, your driver waits inside arrivals with a name board and helps with luggage.",
        new: "No. Sydney Airport pickups take place at the designated vehicle pickup area. T1 uses the Rideshare Pickup Area and T2/T3 use Priority Pickup Areas. Driver details are provided before collection where applicable.",
      },
    ],
  },
  {
    slug: "large-taxi-sydney",
    replacements: [
      {
        old: "Yes. Our large vehicles are chosen specifically for their luggage capacity, so suitcases, prams and sports equipment travel with you, not in a second car.",
        new: "Large vehicles provide additional luggage capacity compared with standard vehicles. Actual capacity depends on passenger numbers, suitcase sizes, prams and other equipment. Tell us your passenger and luggage quantities when booking so we can recommend an appropriate vehicle.",
      },
      {
        old: "Absolutely. Large taxi airport transfers are one of our most popular bookings, with flight monitoring and meet & greet included.",
        new: "Absolutely. Large taxi airport transfers are one of our most popular bookings, with flight monitoring included and pickup at the designated Sydney Airport vehicle pickup area — T1 Rideshare Pickup Area, T2/T3 Priority Pickup Area.",
      },
    ],
  },
  {
    slug: "sydney-airport-wheelchair-taxi",
    replacements: [
      {
        old: "Meet & greet at arrivals for extra peace of mind",
        new: "Pickup at the designated Sydney Airport vehicle pickup area",
      },
      {
        old: "Arrivals: your driver waits inside the terminal and assists from the gate area where permitted",
        new: "Arrivals: pickup at the designated vehicle pickup area — T1 Rideshare Pickup Area, T2/T3 Priority Pickup Area. Advise the booking team of your wheelchair type, mobility equipment and accompanying passengers when booking so an appropriate vehicle can be arranged.",
      },
    ],
  },
  {
    slug: "sydney-airport-baby-seat-taxi",
    replacements: [
      {
        old: "Meet & greet at arrivals with luggage assistance",
        new: "Designated Sydney Airport pickup with driver details provided before collection",
      },
    ],
  },
  {
    slug: "sydney-airport-to-western-sydney-airport",
    replacements: [
      {
        old: "We run direct, fixed-fare transfers between Sydney Airport (Kingsford Smith) and Western Sydney International Airport, roughly 50km apart, so you're not left working out public transport with luggage in tow.",
        new: "TipTop Maxi Sydney is preparing pre-booked direct transport between Sydney Airport (Kingsford Smith) and Western Sydney International Airport, roughly 50km apart, for journeys from 25 October 2026 onward.",
      },
      {
        old: "With Western Sydney Airport now operating alongside Sydney Airport, more travellers are connecting between the two - for onward flights, work, or simply because it's the closer option to home. We make that transfer straightforward.",
        new: "Once Western Sydney Airport opens on 25 October 2026, more travellers will be able to connect between the two — for onward flights, work, or simply because it's the closer option to home. We're preparing to make that transfer straightforward.",
      },
      {
        old: "Real-time flight monitoring at both ends",
        new: "Flight monitoring at both ends once bookings open",
      },
      {
        old: "If you're connecting between the two airports on the same day, tell us your flight times when booking and we'll plan your pickup to give you the best chance of making it comfortably.",
        new: "Once bookings open, if you're connecting between the two airports on the same day, tell us your flight times when booking and we'll plan your pickup to give you the best chance of making it comfortably.",
      },
      {
        old: "Yes, tell us both flight times when booking and we'll plan your transfer to suit your connection.",
        new: "Once this route is available, tell us both flight times when booking and we'll plan your transfer to suit your connection.",
      },
      {
        old: "Yes, you're quoted one fixed fare for the direct trip between the two airports.",
        new: "Yes — once bookings open, you'll be quoted one fixed fare for the direct trip between the two airports.",
      },
      {
        old: "Yes, we track your flight at the originating airport so your pickup adjusts automatically for delays.",
        new: "Once this route is available, we'll track your flight at the originating airport so your pickup adjusts automatically for delays.",
      },
      {
        old: "Yes, vehicles up to 11 seats are available for groups travelling between the two airports together.",
        new: "Once bookings open, vehicles up to 11 seats will be available for groups travelling between the two airports together.",
      },
    ],
  },
  {
    slug: "7-seater-taxi-sydney",
    replacements: [
      {
        old: "Our 7 seater SUVs comfortably fit a full set of luggage for 7 passengers, though very large loads may suit our 11 seater van better.",
        new: "Luggage capacity depends on the number of passengers and the size of the bags — a vehicle carrying close to its maximum passenger capacity will have less luggage space. Tell us your passenger and luggage quantities when booking so we can recommend the most suitable vehicle, or suggest our 11 Seater Van for larger loads.",
      },
    ],
  },
  {
    slug: "pet-taxi-sydney",
    replacements: [
      {
        old: "Our fleet of drivers provides Maxi/Taxi cab services in Sydney for pet taxi transfers, alongside taxi cabs with car seat and maxi cabs with wheelchair seat options.",
        new: "",
      },
    ],
  },
];

async function run() {
  const payload = await getPayload({ config });

  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found.`);
  const siteId = site.id as string;

  for (const page of pageFixes) {
    const existing = await payload.find({
      collection: "pages",
      where: { and: [{ site: { equals: siteId } }, { slug: { equals: page.slug } }] },
      limit: 1,
    });
    const doc = existing.docs[0];
    if (!doc) {
      console.warn(`SKIP (page not found): ${page.slug}`);
      continue;
    }

    const counts = page.replacements.map(() => 0);
    const patched = deepReplace(doc, page.replacements, counts);

    page.replacements.forEach((r, i) => {
      if (counts[i] === 0) {
        console.warn(`  [${page.slug}] NOT FOUND (0 matches): "${r.old.slice(0, 60)}..."`);
      } else {
        console.log(`  [${page.slug}] replaced ${counts[i]}x: "${r.old.slice(0, 50)}..."`);
      }
    });

    const totalMatches = counts.reduce((a, b) => a + b, 0);
    if (totalMatches === 0) {
      console.warn(`  [${page.slug}] no changes made, skipping write.`);
      continue;
    }

    if (process.env.DRY_RUN === "true") {
      console.log(`  [${page.slug}] DRY RUN - would write ${totalMatches} change(s), not saving.\n`);
      continue;
    }

    await payload.update({
      collection: "pages",
      id: doc.id,
      data: {
        metaTitle: patched.metaTitle,
        metaDescription: patched.metaDescription,
        heroDescription: patched.heroDescription,
        contentSections: patched.contentSections,
        faq: patched.faq,
      },
    });
    console.log(`  [${page.slug}] saved.\n`);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
