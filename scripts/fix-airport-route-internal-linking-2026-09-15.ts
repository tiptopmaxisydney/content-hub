/**
 * Follow-up to seed-airport-suburb-routes-2026-09-15.ts: wires the new route pages into the
 * site's internal linking, per the audit's explicit requirement ("your main Sydney Airport
 * Transfers page should contain... Popular Sydney Airport Transfer Destinations... the
 * relevant location pages should link back").
 *
 * 1. Appends all 8 new route pages to /sydney-airport-transfers/'s relatedLinks (additive).
 * 2. Appends a reciprocal link from /locations/north-shore/chatswood/ and
 *    /locations/northern-beaches/manly/ back to their new route page - the only two of the 8
 *    target suburbs that already have their own /locations/ page. The other 6 don't have a
 *    /locations/ suburb page to link from (out of scope here - creating those is a separate,
 *    larger suburb-expansion decision, not part of this route-architecture task).
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-airport-route-internal-linking-2026-09-15.ts
 * DRY_RUN=true to preview without writing.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";

const ROUTE_LINKS = [
  { icon: "🚕", title: "Sydney Airport to Epping", description: "Maxi taxi transfers to Epping.", href: "/sydney-airport-transfers/epping/" },
  { icon: "🚕", title: "Sydney Airport to Parramatta", description: "Maxi taxi transfers to Parramatta.", href: "/sydney-airport-transfers/parramatta/" },
  { icon: "🚕", title: "Sydney Airport to Blacktown", description: "Maxi taxi transfers to Blacktown.", href: "/sydney-airport-transfers/blacktown/" },
  { icon: "🚕", title: "Sydney Airport to Penrith", description: "Maxi taxi transfers to Penrith.", href: "/sydney-airport-transfers/penrith/" },
  { icon: "🚕", title: "Sydney Airport to Liverpool", description: "Maxi taxi transfers to Liverpool.", href: "/sydney-airport-transfers/liverpool/" },
  { icon: "🚕", title: "Sydney Airport to Castle Hill", description: "Maxi taxi transfers to Castle Hill.", href: "/sydney-airport-transfers/castle-hill/" },
  { icon: "🚕", title: "Sydney Airport to Chatswood", description: "Maxi taxi transfers to Chatswood.", href: "/sydney-airport-transfers/chatswood/" },
  { icon: "🚕", title: "Sydney Airport to Manly", description: "Maxi taxi transfers to Manly.", href: "/sydney-airport-transfers/manly/" },
];

const LOCATION_BACKLINKS = [
  { slug: "chatswood", href: "/sydney-airport-transfers/chatswood/", title: "Sydney Airport to Chatswood Maxi Taxi" },
  { slug: "manly", href: "/sydney-airport-transfers/manly/", title: "Sydney Airport to Manly Maxi Taxi" },
];

async function run() {
  const payload = await getPayload({ config });
  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found.`);
  const siteId = site.id as string;

  const dryRun = process.env.DRY_RUN === "true";

  // 1. Hub page relatedLinks
  {
    const res = await payload.find({ collection: "pages", where: { and: [{ site: { equals: siteId } }, { slug: { equals: "sydney-airport-transfers" } }] }, limit: 1, depth: 0 });
    const doc = res.docs[0] as any;
    if (!doc) {
      console.warn("SKIP (hub page not found): sydney-airport-transfers");
    } else {
      const existingHrefs = new Set((doc.relatedLinks ?? []).map((r: any) => (r.href ?? "").toLowerCase()));
      const toAdd = ROUTE_LINKS.filter((l) => !existingHrefs.has(l.href.toLowerCase()));
      if (toAdd.length === 0) {
        console.log("  [sydney-airport-transfers] already linked to all routes, skipping.");
      } else if (dryRun) {
        console.log(`  [sydney-airport-transfers] DRY RUN - would add ${toAdd.length} route links.`);
      } else {
        const updatedLinks = [
          ...(doc.relatedLinks ?? []).map((r: any) => ({ icon: r.icon, title: r.title, description: r.description, href: r.href, targetPage: r.targetPage, targetLocation: r.targetLocation })),
          ...toAdd,
        ];
        await payload.update({ collection: "pages", id: doc.id, data: { relatedLinks: updatedLinks } });
        console.log(`  [sydney-airport-transfers] added ${toAdd.length} route links.`);
      }
    }
  }

  // 2. Reciprocal backlinks from the two existing /locations/ pages
  for (const { slug, href, title } of LOCATION_BACKLINKS) {
    const res = await payload.find({ collection: "locations", where: { and: [{ site: { equals: siteId } }, { slug: { equals: slug } }] }, limit: 1, depth: 0 });
    const doc = res.docs[0] as any;
    if (!doc) {
      console.warn(`SKIP (location not found): ${slug}`);
      continue;
    }
    const existingHrefs = new Set((doc.services ?? []).map((s: any) => (s.href ?? "").toLowerCase()));
    if (existingHrefs.has(href.toLowerCase())) {
      console.log(`  [locations/${slug}] already linked, skipping.`);
      continue;
    }
    if (dryRun) {
      console.log(`  [locations/${slug}] DRY RUN - would add service link to ${href}.`);
      continue;
    }
    const updatedServices = [
      ...(doc.services ?? []).map((s: any) => ({ icon: s.icon, title: s.title, description: s.description, href: s.href })),
      { icon: "✈️", title, description: "Pre-booked Sydney Airport transfers with fixed pricing.", href },
    ];
    await payload.update({ collection: "locations", id: doc.id, data: { services: updatedServices } });
    console.log(`  [locations/${slug}] added service link to ${href}.`);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
