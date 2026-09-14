/**
 * Correction to seed-airport-suburb-routes-2026-09-15.ts, same day: that script created 8 new
 * pages at /sydney-airport-transfers/<suburb>/, but 5 of the 8 suburbs (Parramatta, Liverpool,
 * Blacktown, Penrith, Castle Hill) already had established, approved, richer pages at
 * /<suburb>-to-sydney-airport-taxi/ - real landmarks (Westmead Hospital, Liverpool Hospital,
 * Norwest Business Park, Nepean Hospital), real route knowledge, 7 FAQs each. Discovered by
 * checking the hub page's relatedLinks after the fact, which already pointed at these flat
 * URLs. This is exactly the duplicate-URL problem flagged as the #1 issue in the original SEO
 * audit this session started from - caught before anything was pushed or crawled.
 *
 * Fix, for each of the 5 overlapping suburbs:
 * 1. Delete the newly-created duplicate doc at the nested slug - it's minutes old with zero
 *    index/ranking history, so hard-delete is safe (unlike merge-wheelchair-aged-care-cluster's
 *    soft-retire of an already-indexed duplicate).
 * 2. Move the EXISTING (richer) doc's slug to the new nested path, becoming the canonical page.
 * 3. Add only what it's missing relative to the new architecture - a Terminal Pickup Points
 *    section, two AEO-style FAQs (vehicle selection, wheelchair option) - without touching its
 *    established h1/metaTitle/heroDescription or existing body content, to avoid compounding
 *    ranking risk on top of the URL change already happening via the redirect.
 * 4. Update the 5 WSI suburb-route pages' relatedLinks (they cross-link to their Sydney Airport
 *    counterpart) and the main hub page's relatedLinks to point at the new nested URL directly,
 *    instead of through a redirect.
 *
 * The actual 301 redirects (old flat URL -> new nested URL) are added separately to
 * transport-solutions-sydney/next.config.ts, not here.
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-airport-route-duplicate-consolidation-2026-09-15.ts
 * DRY_RUN=true to preview without writing.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";

const CONSOLIDATIONS = [
  { oldSlug: "parramatta-to-sydney-airport-taxi", newSlug: "sydney-airport-transfers/parramatta", suburb: "Parramatta" },
  { oldSlug: "liverpool-to-sydney-airport-taxi", newSlug: "sydney-airport-transfers/liverpool", suburb: "Liverpool" },
  { oldSlug: "blacktown-to-sydney-airport-taxi", newSlug: "sydney-airport-transfers/blacktown", suburb: "Blacktown" },
  { oldSlug: "penrith-to-sydney-airport-taxi", newSlug: "sydney-airport-transfers/penrith", suburb: "Penrith" },
  { oldSlug: "castle-hill-to-sydney-airport-taxi", newSlug: "sydney-airport-transfers/castle-hill", suburb: "Castle Hill" },
];

const WSI_CROSS_LINK_SLUGS = [
  "castle-hill-to-western-sydney-airport-taxi",
  "penrith-to-western-sydney-airport-taxi",
  "blacktown-to-western-sydney-airport-taxi",
  "liverpool-to-western-sydney-airport-taxi",
  "parramatta-to-western-sydney-airport-taxi",
];

const NEW_RELATED_LINKS = [
  { icon: "🧭", title: "Which Vehicle Should I Book?", description: "Match your passengers and luggage to the right vehicle.", href: "/which-taxi-should-i-book-sydney/" },
  { icon: "💷", title: "How Fares Are Calculated", description: "See what determines your upfront fixed fare.", href: "/how-taxi-fares-are-calculated-sydney/" },
];

function terminalSection() {
  return {
    heading: "Terminal Pickup Points",
    paragraphs: [
      {
        text: "There is no meet-and-greet or name-board service inside the terminal - your driver's contact details are sent before you land so you can connect quickly once you reach the pickup zone.",
      },
    ],
    bulletList: [
      { text: "T1 (International Terminal): meet your driver at the designated Rideshare Pickup Area" },
      { text: "T2 & T3 (Domestic Terminals): meet your driver at the designated Priority Pickup Area" },
    ],
  };
}

function extraFaqs(suburb: string) {
  return [
    {
      question: `Which vehicle should I book from Sydney Airport to ${suburb} for 7 passengers?`,
      answer:
        "For seven passengers travelling with substantial airport luggage, an 11-seater is generally more suitable than operating a 7-seater at full passenger capacity. Tell us your exact numbers when booking so we can confirm.",
    },
    {
      question: `Can I get a wheelchair-accessible vehicle for the ${suburb} to Sydney Airport route?`,
      answer: "Yes. Wheelchair-accessible vehicles are available on this route - just specify your requirements when booking.",
    },
  ];
}

async function run() {
  const payload = await getPayload({ config });
  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found.`);
  const siteId = site.id as string;

  const dryRun = process.env.DRY_RUN === "true";

  for (const { oldSlug, newSlug, suburb } of CONSOLIDATIONS) {
    const [oldRes, newRes] = await Promise.all([
      payload.find({ collection: "pages", where: { and: [{ site: { equals: siteId } }, { slug: { equals: oldSlug } }] }, limit: 1 }),
      payload.find({ collection: "pages", where: { and: [{ site: { equals: siteId } }, { slug: { equals: newSlug } }] }, limit: 1 }),
    ]);
    const oldDoc = oldRes.docs[0] as any;
    const newDupDoc = newRes.docs[0] as any;

    if (!oldDoc) {
      console.warn(`SKIP (established page not found): ${oldSlug}`);
      continue;
    }

    if (dryRun) {
      console.log(`  [${oldSlug} -> ${newSlug}] DRY RUN - would delete duplicate (${newDupDoc ? "found" : "not found"}), move slug, add terminal section + 2 FAQs + 2 links.`);
      continue;
    }

    if (newDupDoc) {
      await payload.delete({ collection: "pages", id: newDupDoc.id });
      console.log(`  [${newSlug}] deleted duplicate doc ${newDupDoc.id}.`);
    }

    const existingHrefs = new Set((oldDoc.relatedLinks ?? []).map((r: any) => (r.href ?? "").toLowerCase()));
    const linksToAdd = NEW_RELATED_LINKS.filter((l) => !existingHrefs.has(l.href.toLowerCase()));

    await payload.update({
      collection: "pages",
      id: oldDoc.id,
      data: {
        slug: newSlug,
        contentSections: [
          ...(oldDoc.contentSections ?? []).map((s: any) => ({
            heading: s.heading,
            paragraphs: (s.paragraphs ?? []).map((p: any) => ({ text: p.text })),
            bulletList: (s.bulletList ?? []).map((b: any) => ({ text: b.text })),
          })),
          terminalSection(),
        ],
        faq: [...(oldDoc.faq ?? []).map((f: any) => ({ question: f.question, answer: f.answer })), ...extraFaqs(suburb)],
        relatedLinks: [
          ...(oldDoc.relatedLinks ?? []).map((r: any) => ({ icon: r.icon, title: r.title, description: r.description, href: r.href, targetPage: r.targetPage, targetLocation: r.targetLocation })),
          ...linksToAdd,
        ],
      },
    });
    console.log(`  [${oldSlug} -> ${newSlug}] consolidated (id ${oldDoc.id}).`);
  }

  // Update the 5 WSI suburb pages' cross-links to point directly at the new nested URLs.
  for (const slug of WSI_CROSS_LINK_SLUGS) {
    const res = await payload.find({ collection: "pages", where: { and: [{ site: { equals: siteId } }, { slug: { equals: slug } }] }, limit: 1 });
    const doc = res.docs[0] as any;
    if (!doc) {
      console.warn(`SKIP (WSI page not found): ${slug}`);
      continue;
    }
    let changed = false;
    const updatedLinks = (doc.relatedLinks ?? []).map((r: any) => {
      const match = CONSOLIDATIONS.find((c) => r.href === `/${c.oldSlug}/`);
      if (match) {
        changed = true;
        return { icon: r.icon, title: r.title, description: r.description, href: `/${match.newSlug}/`, targetPage: r.targetPage, targetLocation: r.targetLocation };
      }
      return { icon: r.icon, title: r.title, description: r.description, href: r.href, targetPage: r.targetPage, targetLocation: r.targetLocation };
    });
    if (!changed) {
      console.log(`  [${slug}] no matching old link found, skipping.`);
      continue;
    }
    if (dryRun) {
      console.log(`  [${slug}] DRY RUN - would update cross-link to new nested URL.`);
      continue;
    }
    await payload.update({ collection: "pages", id: doc.id, data: { relatedLinks: updatedLinks } });
    console.log(`  [${slug}] updated cross-link.`);
  }

  // Update the hub page: remove the 5 now-redundant old flat links (the new nested links were
  // already added by fix-airport-route-internal-linking-2026-09-15.ts).
  {
    const res = await payload.find({ collection: "pages", where: { and: [{ site: { equals: siteId } }, { slug: { equals: "sydney-airport-transfers" } }] }, limit: 1 });
    const doc = res.docs[0] as any;
    if (!doc) {
      console.warn("SKIP (hub page not found)");
    } else {
      const oldHrefs = new Set(CONSOLIDATIONS.map((c) => `/${c.oldSlug}/`));
      const filteredLinks = (doc.relatedLinks ?? []).filter((r: any) => !oldHrefs.has(r.href));
      const removedCount = (doc.relatedLinks ?? []).length - filteredLinks.length;
      if (removedCount === 0) {
        console.log("  [sydney-airport-transfers] no stale links to remove.");
      } else if (dryRun) {
        console.log(`  [sydney-airport-transfers] DRY RUN - would remove ${removedCount} stale link(s).`);
      } else {
        await payload.update({
          collection: "pages",
          id: doc.id,
          data: { relatedLinks: filteredLinks.map((r: any) => ({ icon: r.icon, title: r.title, description: r.description, href: r.href, targetPage: r.targetPage, targetLocation: r.targetLocation })) },
        });
        console.log(`  [sydney-airport-transfers] removed ${removedCount} stale link(s).`);
      }
    }
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
