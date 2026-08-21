/**
 * Second-pass WSI content fix, agreed 2026-08-22: the first pass (fix-airport-copy /
 * rewrite-wsi-page) covered the main WSI hub page and the Sydney-Airport-side pages, but
 * missed a cluster of much more heavily-written WSI subpages that still describe the
 * airport as already operating ("meet & greet", "name board", "your driver waits inside
 * the terminal", "we track your flight"). These 4 pages are far more detailed/marketing-
 * voiced than the ones fixed in the first pass, so this is a larger set of surgical
 * find/replace patches per page rather than a full rewrite.
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-wsi-subpages-2026-08-22.ts
 * (dry-run by default - pass LIVE=true to actually write)
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

const PICKUP_ONCE_OPEN =
  "No. Once Western Sydney Airport opens, pickups will take place at the designated vehicle pickup area, with driver details provided before collection. We do not offer name-board meet-and-greet services inside terminals.";

const pageFixes: { slug: string; replacements: Replacement[] }[] = [
  {
    slug: "western-sydney-airport-to-sydney-cbd",
    replacements: [
      {
        old: "Meet & Greet at Arrivals: Your driver waits inside the terminal with a name board, included in every booking at no extra charge.",
        new: "Pickup at the Designated Area: Once bookings open, pickup will take place at the designated vehicle pickup area, included in every booking at no extra charge.",
      },
      {
        old: "We Track Your Flight: Your flight is monitored live. Delays or early arrivals are handled automatically, no calls needed.",
        new: "Flight Monitoring, Once Available: Once bookings open, your flight will be monitored live, with delays or early arrivals handled automatically, no calls needed.",
      },
      {
        old: "Meet at Arrivals: Driver inside the terminal with name board, bags loaded. You're in the vehicle within minutes of clearing customs.",
        new: "Pickup at Arrivals: Once bookings open, your driver will be ready at the designated pickup area with bags loaded. You'll be in the vehicle within minutes of clearing customs.",
      },
      {
        old: "Flight Monitoring, Always On: Your driver tracks your flight from wheels-up. A two-hour delay means your driver arrives two hours later.",
        new: "Flight Monitoring, Once Available: Once bookings open, your driver will track your flight from wheels-up, so a two-hour delay means your driver arrives two hours later.",
      },
      {
        old: "Meet & Greet Every Time: Name board at arrivals. Luggage assistance. Escort to the vehicle. It's how every airport pickup works with us.",
        new: "Pickup at the Designated Area Every Time: Luggage assistance and an escort to the vehicle — that's how every airport pickup will work once WSI opens.",
      },
      {
        old: "Yes. We track your flight number in real time and your driver's schedule adjusts automatically.",
        new: "Once bookings open, we'll track your flight number in real time and adjust your driver's schedule automatically.",
      },
      {
        old: "Is meet and greet included at Western Sydney Airport arrivals?",
        new: "Do you provide meet and greet at Western Sydney Airport arrivals?",
      },
      {
        old: "Yes, included in every pickup booking at no extra charge. Your driver waits inside the arrivals terminal with a name board.",
        new: PICKUP_ONCE_OPEN,
      },
    ],
  },
  {
    slug: "western-sydney-airport-large-taxi",
    replacements: [
      {
        old: "Meet & Greet at Arrivals: Your driver waits inside the terminal with a name board. No searching the pickup zone, no phone tag, walk out and go.",
        new: "Pickup at the Designated Area: Once bookings open, pickup will take place at the designated vehicle pickup area — no searching required, walk out and go.",
      },
      {
        old: "We Track Your Flight: Our team monitors your flight live. Any delay is handled automatically, no need to call.",
        new: "Flight Monitoring, Once Available: Once bookings open, our team will monitor your flight live, with any delay handled automatically, no need to call.",
      },
      {
        old: "Driver Meets You: Name board at arrivals, bags loaded, group seated, your driver does the heavy lifting.",
        new: "Driver Ready at Pickup: Once bookings open, your driver will be ready at the designated pickup area with bags loaded and your group seated.",
      },
      {
        old: "Meet & Greet Included: Every airport pickup includes a name board inside arrivals. Not an optional extra, it's part of the standard service.",
        new: "Pickup at the Designated Area Included: Once WSI opens, every airport pickup will include collection from the designated vehicle pickup area — not an optional extra, part of the standard service.",
      },
      {
        old: "Is meet and greet included in the maxi taxi pickup price?",
        new: "Will meet and greet be included in the maxi taxi pickup price?",
      },
      {
        old: "Yes. Included in every pickup booking at no extra charge. Your driver meets you inside the arrivals terminal with a name board.",
        new: PICKUP_ONCE_OPEN,
      },
    ],
  },
  {
    slug: "western-sydney-airport-transfers/western-sydney-airport-suv-transfers",
    replacements: [
      {
        old: "Room for up to seven with real luggage space, meet & greet and flight monitoring included.",
        new: "Room for up to seven with real luggage space, with fixed-price, pre-bookable transport once Western Sydney Airport opens.",
      },
      {
        old: "Meet & greet included, no extra charge",
        new: "Pickup at the designated area, once bookings open",
      },
      {
        old: "Live flight monitoring: We track your flight number in real time, so early landings and delays are handled without you calling us.",
        new: "Live flight monitoring, once available: Once bookings open, we'll track your flight number in real time, so early landings and delays can be handled without you calling us.",
      },
      {
        old: "Yes. We track your flight number and adjust your driver's arrival automatically if you land early or are delayed.",
        new: "Once bookings open, we'll track your flight number and adjust your driver's arrival automatically if you land early or are delayed.",
      },
      {
        old: "Is meet and greet included?",
        new: "Will meet and greet be included?",
      },
      {
        old: "Yes, at no extra charge. Your driver waits at arrivals with a name board and helps load your luggage.",
        new: PICKUP_ONCE_OPEN,
      },
    ],
  },
  {
    slug: "western-sydney-airport-transfers/western-sydney-airport-taxi",
    replacements: [
      {
        old: "is set to take its first commercial flights in late 2026.",
        new: "is scheduled to commence passenger operations on 25 October 2026.",
      },
      {
        old: "Flight Monitoring, Always On: Your driver tracks your flight from wheels-up. A two-hour delay means your driver arrives two hours later.",
        new: "Flight Monitoring, Once Available: Once bookings open, your driver will track your flight from wheels-up, so a two-hour delay means your driver arrives two hours later.",
      },
      {
        old: "Meet & Greet Every Time: Name board at arrivals. Luggage assistance. Escort to the vehicle. It's how every airport pickup works with us.",
        new: "Pickup at the Designated Area Every Time: Luggage assistance and an escort to the vehicle — that's how every airport pickup will work once WSI opens.",
      },
      {
        old: "Western Sydney International (Nancy-Bird Walton) Airport at Bradfield is scheduled to start commercial flights in late 2026. We're taking pre-bookings now.",
        new: "Western Sydney International (Nancy-Bird Walton) Airport at Bradfield is scheduled to commence passenger operations on 25 October 2026. We're taking pre-bookings now.",
      },
      {
        old: "Yes, we monitor flight schedules to adjust pickup times if your flight arrives early or is delayed.",
        new: "Once bookings open, we'll monitor flight schedules to adjust pickup times if your flight arrives early or is delayed.",
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

    if (process.env.LIVE !== "true") {
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
