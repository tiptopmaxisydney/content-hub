/**
 * Additive-only update: adds a relatedLinks section to the site's existing, already-live
 * "money" pages, pointing to the new organisations/recurring/locations/safety pages built
 * in the prior seed scripts. Does NOT touch title, metaTitle, h1, intro, features or faq on
 * any of these pages - only the relatedLinks field, which was empty on all of them.
 *
 * Every one of the new pages this points to already carries a targetPage relationship BACK
 * to one of these money pages (see seed-wheelchair-organisations-and-recurring-2026-09.ts and
 * seed-wheelchair-locations-2026-09.ts). Adding a targetPage relationship in this direction
 * too would create dozens of mutual A<->B pairs across the whole site - exactly the pattern
 * that made Payload's relationship-depth population hang indefinitely earlier in this project.
 * Every link below is therefore a plain href, never targetPage.
 *
 * Run with: npm run update:wheelchair-money-page-links   (from content-hub/)
 * Safe to re-run - overwrites relatedLinks on these specific slugs each time with the same data.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

type LinkInput = { icon: string; title: string; description: string; href: string };

const updates: Record<string, LinkInput[]> = {
  "ndis-transport-sydney": [
    { icon: "🔁", title: "Recurring Wheelchair Transport", description: "Set up an ongoing weekly or regular schedule.", href: "/recurring-wheelchair-transport-sydney/" },
    { icon: "🤝", title: "For Support Coordinators", description: "Arrange transport for your NDIS clients.", href: "/support-coordinator-transport-sydney/" },
    { icon: "💳", title: "For Plan Managers", description: "Invoicing and transport for plan-managed clients.", href: "/plan-manager-transport-sydney/" },
    { icon: "🏢", title: "Organisations", description: "Accessible transport for organisations and referrers.", href: "/organisations/" },
  ],
  "hospital-transport-sydney": [
    { icon: "🔁", title: "Recurring Wheelchair Transport", description: "Set up an ongoing schedule for regular outpatient treatment.", href: "/recurring-wheelchair-transport-sydney/" },
    { icon: "🏥", title: "For Hospitals & Clinics", description: "Direct booking option for hospital and clinic staff.", href: "/hospital-referral-transport-sydney/" },
    { icon: "📍", title: "Wheelchair Taxi Westmead", description: "Accessible transport for the Westmead medical precinct.", href: "/wheelchair-taxi-westmead/" },
    { icon: "📍", title: "Wheelchair Taxi Randwick", description: "Accessible transport for the Randwick health precinct.", href: "/wheelchair-taxi-randwick/" },
  ],
  "aged-care-transport-sydney": [
    { icon: "🧓", title: "For Aged Care Providers", description: "Set up facility-wide transport for residents.", href: "/aged-care-provider-transport-sydney/" },
    { icon: "🔁", title: "Recurring Wheelchair Transport", description: "Set up an ongoing schedule for residents.", href: "/recurring-wheelchair-transport-sydney/" },
    { icon: "🏢", title: "Organisations", description: "Accessible transport for organisations and referrers.", href: "/organisations/" },
  ],
  "wheelchair-accessible-taxi": [
    { icon: "🛡️", title: "Safety & Accessibility", description: "How our vehicles, equipment and drivers work.", href: "/safety-accessibility/" },
    { icon: "♿", title: "NDIS Transport Sydney", description: "Accessible transport for eligible NDIS participants.", href: "/ndis-transport-sydney/" },
    { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", href: "/hospital-transport-sydney/" },
  ],
  "wheelchair-taxi-airport-sydney": [
    { icon: "📍", title: "Wheelchair Taxi Sydney CBD", description: "Accessible transport for the Sydney CBD.", href: "/wheelchair-taxi-sydney-cbd/" },
    { icon: "📍", title: "Wheelchair Taxi Randwick", description: "Accessible transport for the Randwick health precinct.", href: "/wheelchair-taxi-randwick/" },
    { icon: "📍", title: "Wheelchair Taxi Chatswood", description: "Accessible transport for Chatswood and the North Shore.", href: "/wheelchair-taxi-chatswood/" },
  ],
  // Deliberately NOT updating "western-sydney-airport-wheelchair-taxi" - next.config.ts
  // permanently redirects that URL to the transport-solutions sister brand (a pre-existing,
  // already-committed cross-brand SEO decision), so this site's own CMS doc at that slug is
  // unreachable. Nothing on this site should link to it; see the Tier 1 locations script,
  // which was fixed to point to wheelchair-taxi-airport-sydney instead.
  "rehabilitation-transport-sydney": [
    { icon: "🏥", title: "For Hospitals & Clinics", description: "Direct booking option for hospital and clinic staff.", href: "/hospital-referral-transport-sydney/" },
    { icon: "🔁", title: "Recurring Wheelchair Transport", description: "Set up an ongoing schedule for regular rehabilitation.", href: "/recurring-wheelchair-transport-sydney/" },
    { icon: "🏥", title: "Hospital Transport Sydney", description: "Wheelchair transport for hospital appointments.", href: "/hospital-transport-sydney/" },
  ],
  "wheelchair-taxi-booking": [
    { icon: "🔁", title: "Recurring Wheelchair Transport", description: "Set up an ongoing schedule instead of booking each trip.", href: "/recurring-wheelchair-transport-sydney/" },
    { icon: "🏢", title: "Organisations", description: "Booking on behalf of a client, resident or patient.", href: "/organisations/" },
  ],
};

async function run() {
  const payload = await getPayload({ config });
  const site = await payload.find({ collection: "sites", where: { key: { equals: "wheelchair" } }, limit: 1 });
  const siteId = site.docs[0]?.id;
  if (!siteId) throw new Error('Site "wheelchair" not found.');

  for (const [slug, links] of Object.entries(updates)) {
    const existing = await payload.find({
      collection: "pages",
      where: { and: [{ site: { equals: siteId } }, { slug: { equals: slug } }] },
      limit: 1,
    });
    const pageId = existing.docs[0]?.id;
    if (!pageId) {
      console.warn(`SKIP ${slug}: page not found.`);
      continue;
    }
    await payload.update({ collection: "pages", id: pageId, data: { relatedLinks: links } });
    console.log(`updated relatedLinks: ${slug} (${links.length} links)`);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
