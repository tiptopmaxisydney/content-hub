/**
 * transport-solutions (tiptopmaxisydney.com.au) - blog rewrite left over from the "Pending SEO
 * Tasks" brief (fix-seo-brief-2026-10-31.ts reported these as "left for the separate blog rewrite").
 *
 * - Flight tracking: "real-time / live / automatic" flight-monitoring promises, "no need to call or
 *   update us", "we guarantee your driver will be there" and unverified "no extra charge for delays"
 *   lines now use the approved flight-number wording (lib/customerInfo.ts in transport-solutions-sydney).
 *   The same treatment for cruise-ship arrival monitoring.
 * - Driver contact: "your driver will send you a text message" lines now use the approved driver
 *   coordination wording; one outdated P7 / P2-P3 pickup paragraph uses the approved airport
 *   pickup wording.
 * - Superlatives: "#1 Choice", "Most Trusted", "Most Reliable" and "top-rated" claims removed from
 *   titles, H2s and body copy. Slugs are NOT changed, so every URL keeps working.
 *
 * Generic statements about third-party apps ("real-time GPS tracking" in rideshare apps), metered
 * tolls "automatically added", and the newer posts that already use the approved wording are left as is.
 *
 * Blog bodies use substring replacements inside single Lexical text nodes; titles/metaTitles are
 * set per slug. Every rule must match - a miss means the CMS changed and the run stops.
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-blog-claims-2026-10-31.ts
 * (dry-run by default - pass LIVE=true to write; original values are backed up to
 * scripts/backups/ first, restorable with --restore scripts/backups/<file>.json)
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";
const SNAPSHOT_AT = "2026-10-31T00:00:00.000Z";

const PHONE = "02 9669 9390";
const WHATSAPP = "+61 410 025 786";
const DRIVER = `Once a driver has been assigned, you will receive the relevant driver and vehicle details. For pickup assistance or updates, please contact our booking team on ${PHONE} or WhatsApp ${WHATSAPP}. Our team will coordinate directly with your driver.`;
const FLIGHT = "Provide your flight number when booking so our team can monitor arrival updates and coordinate your pickup.";
const PLANS_CHANGE = "If your flight number or travel plans change, please let our booking team know.";
const PICKUP = "Standard airport pickups are arranged at designated pickup locations. Passengers will receive pickup instructions and vehicle details before collection.";

const BLOG_REPLACEMENTS: [string, string][] = [
  // ---- Flight tracking
  [
    "Don’t worry, we’ve got you covered. We monitor all inbound flights, so our professional drivers are always aware of your updated arrival time. We will adjust your pickup schedule accordingly at no extra cost to you. Our goal is to provide a completely stress free airport transfer sydney experience, which means we adapt to your schedule, not the other way around. Your driver will be there waiting for you when you land, whether you’re early or delayed.",
    `Don’t worry. ${FLIGHT} ${PLANS_CHANGE} Our goal is to provide a completely stress free airport transfer sydney experience.`,
  ],
  [
    "Busy parents, business clients, and NDIS coordinators appreciate the hassle-free scheduling and real-time confirmation system.",
    "Busy parents, business clients, and NDIS coordinators appreciate the hassle-free scheduling and clear booking confirmations.",
  ],
  [
    " For airport pickups, your flight number lets us track your arrival in real-time and adjust for any delays.",
    " For airport pickups, your flight number lets our team monitor arrival updates and coordinate your pickup.",
  ],
  ["Real-time flight monitoring", "Flight monitoring for arrival updates"],
  [
    " We pride ourselves on on-time pickups and drop-offs, tracking your flight to adjust for any delays.",
    " We pride ourselves on on-time pickups and drop-offs. Give us your flight number and our team will monitor arrival updates and coordinate your pickup.",
  ],
  [
    " Travel confidently knowing your professional driver is tracking your flight and will be there on time, ready to assist you.",
    " Travel confidently with a pre-booked transfer. Our team monitors arrival updates for the flight number you provide and coordinates your pickup.",
  ],
  [
    " Providing your flight number is crucial. It allows our team to monitor your flight in real-time, so we can adjust your pickup time automatically if there’s a delay. You’ll never be left waiting.",
    " Providing your flight number is crucial. It allows our team to monitor arrival updates and coordinate your pickup.",
  ],
  [
    " Your professional driver will track your flight and be waiting for you upon arrival. You can walk straight past the long public queues and into your comfortable, private vehicle.",
    " Our team monitors arrival updates for the flight number you provide and coordinates your pickup. You can walk straight past the long public queues and into your comfortable, private vehicle.",
  ],
  [
    " We track your flight in real-time and automatically adjust your pickup time for any delays, at no extra cost.",
    ` ${FLIGHT}`,
  ],
  [
    "Your peace of mind is our priority. We monitor all flight arrivals in real-time, so if your flight is delayed, we will automatically adjust your pickup time. You will not be charged any extra fees for flight delays. Our professional driver will be ready and waiting for you when your flight actually lands, ensuring your Sydney airport transfer remains a completely stress-free experience from start to finish.",
    `Your peace of mind is our priority. ${FLIGHT} ${PLANS_CHANGE}`,
  ],
  ["Live Flight Tracking:", "Flight Monitoring:"],
  [
    " We monitor your flight in real-time, automatically adjusting your pickup time for any delays or early arrivals.",
    ` ${FLIGHT}`,
  ],
  [
    "Your peace of mind is our priority. We track your flight’s status in real-time, so there is no need to worry if your plane is early or delayed. Our drivers automatically adjust your pickup time based on your flight’s actual arrival, ensuring they are there to meet you when you land. This service is included at no extra cost, providing a truly seamless and reliable airport transfer experience, no matter what happens with your flight schedule.",
    `Your peace of mind is our priority. ${FLIGHT} ${PLANS_CHANGE}`,
  ],
  [
    " service ensures your entire group and all their bags travel together. With flight tracking for on-time pickups and drop-offs, we provide a seamless ",
    " service ensures your entire group and all their bags travel together. With your flight number, our team can monitor arrival updates and coordinate your pickup, for a seamless ",
  ],
  [
    "We pride ourselves on punctuality, tracking your flight to ensure we are there when you arrive.",
    "We pride ourselves on punctuality. Give us your flight number and our team will monitor arrival updates and coordinate your pickup.",
  ],
  [
    "Provide your flight number when you book your airport transfer. This allows our team to monitor your flight status in real-time. If your plane is delayed, we automatically adjust your pickup time. This complimentary service means your driver will be there when you land, without any extra waiting fees or stress.",
    `${FLIGHT} ${PLANS_CHANGE}`,
  ],
  [
    "Arriving is even simpler. We take the guesswork out of finding your ride. Your driver will track your flight in real-time and send you a text message as soon as you land with clear instructions on where to meet. This means you never have to worry if your flight is delayed; we’ll be there when you are.",
    `Arriving is even simpler. ${PICKUP} ${FLIGHT}`,
  ],
  [
    "We understand that flight delays are a common part of travel, which is why we monitor your flight’s status in real-time. If your flight is delayed, we automatically adjust your pickup time to match the new arrival. You don’t need to worry about contacting us. Your driver will be ready and waiting for you when you land, ensuring a seamless and reliable transfer from the airport at no extra charge for the wait.",
    `We understand that flight delays are a common part of travel. ${FLIGHT} ${PLANS_CHANGE}`,
  ],
  [
    "Our professional drivers track your flight in real-time, automatically adjusting for any delays to ensure they are there when you land.",
    "Give us your flight number and our team will monitor arrival updates and coordinate your pickup.",
  ],
  [
    "We actively monitor your ship’s arrival time, adjusting your pickup for any delays or early dockings.",
    "Give us your ship and arrival details so our team can monitor arrival updates and coordinate your pickup.",
  ],
  [
    "For all return pickups, we actively monitor your cruise ship’s arrival time. If your ship is delayed, we automatically adjust your pickup schedule accordingly at no extra charge.",
    "For return pickups, give us your ship and arrival details so our team can monitor arrival updates and coordinate your pickup. If your plans change, please let our booking team know.",
  ],
  [
    "We include flight tracking with our service, allowing us to adjust pickup times for any delays and guarantee we’re there when you need us.",
    "Give us your flight number and our team will monitor arrival updates and coordinate your pickup.",
  ],
  [
    "Punctuality isn’t just a goal; it’s our guarantee. We actively monitor your flight’s status in real-time, so whether you land early or face an unexpected delay, we adjust our schedule accordingly. Your driver will be ready and waiting for you at the designated pickup point the moment you arrive. This proactive approach eliminates waiting and provides the ultimate peace of mind, knowing you’ll make it to your cruise with plenty of time to spare.",
    `Punctuality is a priority. ${FLIGHT} ${PICKUP} ${PLANS_CHANGE}`,
  ],
  [
    "We understand that flight delays are a common part of travel. That’s why we monitor your flight’s arrival time to ensure our professional driver is there when you land. You will not be charged any extra fees for waiting time caused by a flight delay.",
    `We understand that flight delays are a common part of travel. ${FLIGHT} ${PLANS_CHANGE}`,
  ],
  [
    " This allows the driver to track your flight in real-time and adjust for any delays, ensuring they are there when you arrive.",
    " This allows our team to monitor arrival updates and coordinate your pickup.",
  ],
  [
    "Your peace of mind is our priority. When you book with us, simply provide your incoming flight number. Our team actively monitors all flight arrivals in real-time, so if your flight is delayed, we automatically adjust your pickup time. Your professional driver will be there to greet you when you land, no matter the delay.",
    `Your peace of mind is our priority. When you book with us, simply provide your incoming flight number so our team can monitor arrival updates and coordinate your pickup. ${PLANS_CHANGE}`,
  ],
  [
    "Flight delays are a common part of travel, but with us, they are nothing to worry about. We take the stress out of the equation by actively monitoring all incoming flight schedules. If your flight is late, your pickup time is automatically adjusted to your actual arrival time. There’s no need for you to call or update us. We guarantee your driver will be there when you land, ready to provide a reliable and comfortable Sydney Airport transfer for your group.",
    `Flight delays are a common part of travel. ${FLIGHT} ${PLANS_CHANGE}`,
  ],
  [
    "At Tip Top Maxi Sydney, we make your journey stress-free. When you book with us, we monitor your flight status in real-time. If your flight is delayed, we automatically adjust your pickup time to match your new arrival. You don’t need to worry about contacting us or incurring extra waiting fees due to the airline’s schedule. Your professional driver will be there when you land, ensuring a seamless and reliable transfer from the airport.",
    `At Tip Top Maxi Sydney, we make your journey stress-free. ${FLIGHT} ${PLANS_CHANGE}`,
  ],
  [
    "For Sydney Airport pickups, we actively track your flight status to adjust for any delays, ensuring we are there when you land.",
    "For Sydney Airport pickups, give us your flight number so our team can monitor arrival updates and coordinate your pickup.",
  ],

  // ---- Driver contact / pickup location
  [
    "Your driver will send you a text message upon your flight’s landing to confirm their exact location in the pickup zone, ensuring a quick and easy connection.",
    DRIVER,
  ],
  [
    "On the day of travel, communication is key. Your professional driver will send you a text message to confirm they are on their way or have arrived at the airport. For a hassle-free connection, we recommend keeping your mobile phone charged and easily accessible.",
    `On the day of travel, communication is key. ${DRIVER} We recommend keeping your mobile phone charged and easily accessible.`,
  ],
  [
    "For your convenience, Sydney Airport has designated Priority Pickup areas for pre-booked services. At the International Terminal (T1), your driver will meet you in the express pickup area in the P7 car park. At the Domestic Terminals (T2 & T3), the meeting point is located between the terminals in the P2/P3 car parks. Your driver will also send you a text message upon your arrival with their exact location details for a smooth connection.",
    `${PICKUP} ${DRIVER}`,
  ],

  // ---- Superlatives
  ["Reliable Maxi Taxi Parramatta: Your #1 Choice for Group Travel", "Reliable Maxi Taxi Parramatta for Group Travel"],
  ["Why Tiptop is Sydney’s Most Trusted Airport Maxi Taxi Service", "Why Groups Choose Tiptop for Sydney Airport Maxi Taxis"],
  ["Tiptop Maxi: Your Most Reliable Taxi Service in Sydney", "Tiptop Maxi: A Reliable Taxi Service in Sydney"],
  ["Our commitment is to provide the most reliable ", "Our commitment is to provide a reliable "],
  ["Tiptop Maxi Sydney is the city’s top-rated choice for a reason: we deliver", "With Tiptop Maxi Sydney, we aim to deliver"],
];

// Post titles are the on-page H1. Slugs are not touched.
const BLOG_FIELDS: Record<string, { title?: string; metaTitle?: string }> = {
  "the-best-way-to-travel-from-sydney-airport-why-tiptop-transport-solutions-is-the-1-choice-for-maxi-taxi-transfers": {
    title: "The Best Way to Travel from Sydney Airport: Why Groups Choose a Pre-Booked Maxi Taxi",
  },
  "reliable-maxi-taxi-parramatta-your-1-choice-for-group-travel": {
    title: "Reliable Maxi Taxi Parramatta for Group Travel",
    metaTitle: "Reliable Maxi Taxi Parramatta for Group Travel",
  },
  "why-tiptop-transport-solutions-is-becoming-sydneys-most-trusted-travel-partner": {
    title: "Why Sydney Travellers Choose TipTop Transport Solutions",
  },
  "sydneys-most-reliable-taxi-experience-how-tiptop-transport-keeps-your-journey-stress-free-every-time": {
    title: "Reliable Sydney Taxi Service: How TipTop Transport Keeps Your Journey Stress-Free",
  },
};

// Anything matching these in a changed post's NEW content/title means a claim survived - the run stops.
const BANNED = /real-time flight|monitor(s|ed)? your flight(’s)? status in real|track(s|ing)? your flight in real|automatically adjust|live flight tracking|no need for you to call|don’t need to worry about contacting|driver will (also )?send you a text|#1 choice|most trusted|top-rated|your most reliable taxi/i;

type Doc = { id: string; slug: string; updatedAt: string } & Record<string, unknown>;

function mapStrings(value: unknown, fn: (s: string) => string): unknown {
  if (typeof value === "string") return fn(value);
  if (Array.isArray(value)) return value.map((v) => mapStrings(v, fn));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k === "id" ? v : mapStrings(v, fn)]));
  }
  return value;
}

function scan(value: unknown, path: string, out: string[]) {
  if (typeof value === "string") {
    if (BANNED.test(value)) out.push(`${path}: ${value.slice(0, 160)}`);
  } else if (Array.isArray(value)) value.forEach((v, i) => scan(v, `${path}[${i}]`, out));
  else if (value && typeof value === "object") for (const [k, v] of Object.entries(value)) scan(v, path ? `${path}.${k}` : k, out);
}

async function run() {
  const live = process.env.LIVE === "true";
  const restoreIdx = process.argv.indexOf("--restore");
  const payload = await getPayload({ config });

  if (restoreIdx !== -1) {
    const backup = JSON.parse(readFileSync(process.argv[restoreIdx + 1], "utf8")) as {
      docs: { id: string; slug: string; original: Record<string, unknown> }[];
    };
    for (const d of backup.docs) {
      await payload.update({ collection: "blog-posts", id: d.id, data: d.original });
      console.log(`restored blog-posts/${d.slug}`);
    }
    process.exit(0);
  }

  const posts = (await payload.find({ collection: "blog-posts", where: { "site.key": { equals: SITE_KEY } }, limit: 1000, depth: 0 })).docs as unknown as Doc[];

  const table = new Map(BLOG_REPLACEMENTS);
  if (table.size !== BLOG_REPLACEMENTS.length) throw new Error("Duplicate key in BLOG_REPLACEMENTS.");
  const hits = new Map<string, number>();
  const fieldHits = new Set<string>();
  const changes: { doc: Doc; data: Record<string, unknown> }[] = [];
  const diffs: string[] = [];

  for (const doc of posts) {
    const data: Record<string, unknown> = {};
    // Substring match within a single Lexical text node - never across nodes, so formatting
    // (bold/links) around the sentence is untouched.
    const before: string[] = [];
    const after: string[] = [];
    const next = mapStrings(doc.content, (s) => {
      let out = s;
      for (const [old, r] of table) {
        if (!out.includes(old)) continue;
        out = out.split(old).join(r);
        hits.set(old, (hits.get(old) ?? 0) + 1);
      }
      before.push(s);
      after.push(out);
      return out;
    });
    if (JSON.stringify(next) !== JSON.stringify(doc.content)) {
      data.content = next;
      before.forEach((s, i) => s !== after[i] && diffs.push(`blog-posts/${doc.slug}.content\n  - ${s}\n  + ${after[i]}`));
    }
    const fields = BLOG_FIELDS[doc.slug];
    if (fields) {
      fieldHits.add(doc.slug);
      for (const [k, v] of Object.entries(fields)) {
        if (doc[k] !== v) {
          data[k] = v;
          diffs.push(`blog-posts/${doc.slug}.${k}\n  - ${doc[k]}\n  + ${v}`);
        }
      }
    }
    if (Object.keys(data).length) changes.push({ doc, data });
  }

  const misses = [
    ...BLOG_REPLACEMENTS.filter(([old]) => !hits.has(old)).map(([old]) => `blog: ${old.slice(0, 100)}`),
    ...Object.keys(BLOG_FIELDS).filter((s) => !fieldHits.has(s)).map((s) => `blog fields: ${s}`),
  ];
  if (misses.length) {
    misses.forEach((m) => console.error(`  NOT FOUND: ${m}`));
    throw new Error(`${misses.length} rule(s) matched nothing - the CMS changed; re-check before running.`);
  }

  const stale = changes.filter((c) => c.doc.updatedAt > SNAPSHOT_AT);
  if (stale.length && process.env.FORCE !== "true") {
    stale.forEach((c) => console.error(`  EDITED SINCE SNAPSHOT: ${c.doc.slug} (${c.doc.updatedAt})`));
    throw new Error("Some posts were edited after the snapshot - review those edits first (FORCE=true to override).");
  }

  const problems: string[] = [];
  for (const c of changes) {
    const merged = { ...c.doc, ...c.data };
    scan({ title: merged.title, metaTitle: merged.metaTitle, content: merged.content }, `blog-posts/${c.doc.slug}`, problems);
  }
  if (problems.length) {
    problems.forEach((p) => console.error(`  REMAINING CLAIM: ${p}`));
    throw new Error("A changed post still contains a removed claim - add it to the rules first.");
  }

  mkdirSync("scripts/backups", { recursive: true });
  writeFileSync("scripts/backups/fix-blog-claims-2026-10-31.diff.txt", diffs.join("\n\n"));
  console.log(`${changes.length} blog posts to update, ${diffs.length} string changes - see scripts/backups/fix-blog-claims-2026-10-31.diff.txt`);

  if (!live) {
    console.log("DRY RUN - pass LIVE=true to actually write.");
    process.exit(0);
  }

  const backupPath = `scripts/backups/fix-blog-claims-${Date.now()}.json`;
  writeFileSync(
    backupPath,
    JSON.stringify(
      { docs: changes.map((c) => ({ id: c.doc.id, slug: c.doc.slug, original: Object.fromEntries(Object.keys(c.data).map((k) => [k, c.doc[k] ?? null])) })) },
      null,
      1,
    ),
  );
  console.log(`Backup of original field values: ${backupPath}`);

  for (const c of changes) {
    await payload.update({ collection: "blog-posts", id: c.doc.id, data: c.data });
    console.log(`saved blog-posts/${c.doc.slug}`);
  }
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
