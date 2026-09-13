/**
 * Part 4 of the 2026-09-14 SEO/AEO audit fixes (item #6 - suburb page content strategy).
 *
 * The audit's concern was never "create more suburb pages" (it explicitly warns against
 * that) - it's that the 86 existing suburb pages under /locations/ are thin, near-identical
 * templates: each has exactly 2 "services" whose descriptions are both the literal boilerplate
 * "Serving <suburb> and the wider <region>" (duplicated verbatim between the two entries), one
 * generic FAQ ("Can I pre-book a maxi taxi from <suburb>?"), and nearbyLocations pointing only
 * at the parent region (never at sibling suburbs) - confirmed by inspecting kirrawee as a
 * representative sample (see conversation notes).
 *
 * The parent region page (e.g. Sutherland Shire) already has genuinely specific, human-written
 * content for the same themes - real route names, real FAQs with real drive times, landmark
 * references. Rather than fabricate new per-suburb facts (specific drive times, hospital names,
 * etc.) that can't be verified, this script pulls the parent region's already-published content
 * down onto each thin suburb page it belongs to:
 *
 * 1. Service descriptions - for each suburb service whose title matches one of the parent
 *    region's services, replace the boilerplate description with the parent's specific one.
 * 2. FAQ - appends the parent region's FAQ entries (skipping any already present by question
 *    text) onto the suburb's own FAQ array, so each suburb page carries region-specific
 *    context (drive times, longer-distance options) instead of just one generic booking FAQ.
 * 3. nearbyLocations - adds up to 2 sibling suburbs (same parentRegion, same site, excluding
 *    self) alongside the existing region link, so suburb pages cross-link to each other and
 *    not only up to their region.
 *
 * Only touches suburbs matching the exact known thin-template shape (both service descriptions
 * identical, single generic FAQ) - skips anything already hand-customised (e.g. bondi, manly,
 * cronulla, chatswood, hurstville already have richer content per the earlier audit dump).
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-thin-suburb-pages-2026-09-14.ts
 * DRY_RUN=true to preview without writing.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";

function isThinTemplate(doc: any): boolean {
  const services = doc.services ?? [];
  const faq = doc.faq ?? [];
  if (faq.length !== 1) return false;
  if (services.length < 1) return false;
  const descriptions = new Set(services.map((s: any) => s.description));
  // The known artifact: every service on the page shares the exact same boilerplate description.
  return descriptions.size === 1 && /^Serving .+ and the wider .+$/.test(services[0].description ?? "");
}

async function run() {
  const payload = await getPayload({ config });
  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found.`);
  const siteId = site.id as string;

  const dryRun = process.env.DRY_RUN === "true";

  const allSuburbs = await payload.find({
    collection: "locations",
    where: { site: { equals: siteId }, locationType: { equals: "suburb" } },
    limit: 500,
    depth: 1,
  });

  // Group suburb docs by parentRegion id for sibling lookup.
  const byRegion = new Map<string, any[]>();
  for (const doc of allSuburbs.docs as any[]) {
    const regionId = typeof doc.parentRegion === "object" ? doc.parentRegion.id : doc.parentRegion;
    if (!regionId) continue;
    if (!byRegion.has(regionId)) byRegion.set(regionId, []);
    byRegion.get(regionId)!.push(doc);
  }

  let updatedCount = 0;
  let skippedCount = 0;

  for (const doc of allSuburbs.docs as any[]) {
    if (!isThinTemplate(doc)) {
      skippedCount++;
      continue;
    }
    const region = doc.parentRegion;
    if (!region || typeof region !== "object") {
      console.warn(`  [${doc.slug}] SKIP - parentRegion not populated.`);
      continue;
    }

    // 1. Service descriptions - match by title, pull the region's specific description.
    const regionServicesByTitle = new Map((region.services ?? []).map((s: any) => [s.title, s.description]));
    const updatedServices = (doc.services ?? []).map((s: any) => ({
      icon: s.icon,
      title: s.title,
      description: regionServicesByTitle.get(s.title) ?? s.description,
      href: s.href,
    }));

    // 2. FAQ - append region FAQs not already present (by question text, case-insensitive).
    const existingQuestions = new Set((doc.faq ?? []).map((f: any) => f.question.toLowerCase()));
    const regionFaqsToAdd = (region.faq ?? [])
      .filter((f: any) => !existingQuestions.has(f.question.toLowerCase()))
      .map((f: any) => ({ question: f.question, answer: f.answer }));
    const updatedFaq = [...(doc.faq ?? []).map((f: any) => ({ question: f.question, answer: f.answer })), ...regionFaqsToAdd];

    // 3. nearbyLocations - keep existing (region) + add up to 2 sibling suburbs in the same region.
    const regionId = region.id as string;
    const siblings = (byRegion.get(regionId) ?? []).filter((s) => s.id !== doc.id).slice(0, 2);
    const existingNearbyIds = new Set((doc.nearbyLocations ?? []).map((n: any) => (typeof n === "object" ? n.id : n)));
    const newNearbyIds = siblings.map((s) => s.id).filter((id) => !existingNearbyIds.has(id));
    const updatedNearby = [...(doc.nearbyLocations ?? []).map((n: any) => (typeof n === "object" ? n.id : n)), ...newNearbyIds];

    if (dryRun) {
      console.log(
        `  [${doc.slug}] DRY RUN - services: ${updatedServices.length}, +${regionFaqsToAdd.length} FAQ(s), +${newNearbyIds.length} nearby suburb(s).`
      );
      updatedCount++;
      continue;
    }

    await payload.update({
      collection: "locations",
      id: doc.id,
      data: { services: updatedServices, faq: updatedFaq, nearbyLocations: updatedNearby },
    });
    console.log(`  [${doc.slug}] updated - +${regionFaqsToAdd.length} FAQ(s), +${newNearbyIds.length} nearby suburb(s).`);
    updatedCount++;
  }

  console.log(`\nDone. Updated: ${updatedCount}, skipped (already customised or no match): ${skippedCount}.`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
