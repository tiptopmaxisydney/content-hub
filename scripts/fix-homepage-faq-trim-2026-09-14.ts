/**
 * Part 2 of the 2026-09-14 SEO/AEO audit fixes (item #8 - homepage FAQs too broad).
 *
 * The transport-solutions-sydney homepage FAQ (lib/homeData.ts `faqColumns`, in the frontend
 * repo) previously answered ~30 questions covering nearly every service intent on the site.
 * That file has been trimmed by hand (not by this script - it's a local TS constant, not CMS
 * content) down to 12 strongest company-level questions.
 *
 * This script adds the more specific removed questions onto their single most relevant
 * existing service page's FAQ here in the CMS, skipping any that already have a near-duplicate
 * question on that page (checked manually via a dump before writing this script - see
 * conversation notes). Questions with no clear single home, or that were already redundant
 * with another page's existing FAQ, were dropped rather than relocated.
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-homepage-faq-trim-2026-09-14.ts
 * DRY_RUN=true to preview without writing.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";

const SITE_KEY = "transport-solutions";

const additions: { slug: string; faq: { question: string; answer: string } }[] = [
  {
    slug: "cruise-terminal-transfers-sydney",
    faq: {
      question: "Do you provide cruise terminal transfers?",
      answer: "Yes, we offer transfers to and from White Bay Cruise Terminal and the Overseas Passenger Terminal in Sydney.",
    },
  },
  {
    slug: "wedding-transport-sydney",
    faq: {
      question: "Do you provide wedding transport services?",
      answer: "Yes, we offer wedding guest transport, bridal party transfers, and group travel services throughout Sydney.",
    },
  },
  {
    slug: "parcel-delivery-sydney",
    faq: {
      question: "Do you provide parcel delivery services?",
      answer: "Yes, we offer same-day parcel and document delivery services across Sydney.",
    },
  },
  {
    slug: "long-distance-taxi-sydney",
    faq: {
      question: "Can I book a taxi for regional NSW destinations?",
      answer: "Yes, we provide transfers from Sydney Airport and Sydney metropolitan areas to many regional locations across NSW and the ACT.",
    },
  },
  {
    slug: "long-distance-taxi-sydney",
    faq: {
      question: "Do you provide transfers to Canberra?",
      answer: "Yes, direct transfers from Sydney to Canberra and surrounding suburbs are available.",
    },
  },
  {
    slug: "long-distance-taxi-sydney",
    faq: {
      question: "Do you provide transfers to the Blue Mountains?",
      answer: "Yes, we offer comfortable transfers to destinations such as Lithgow, Blackheath, Katoomba, and other Blue Mountains areas.",
    },
  },
  {
    slug: "11-seater-taxi-sydney",
    faq: {
      question: "Can your 11 seater taxi accommodate large family groups?",
      answer:
        "Yes, our 11 seater vehicles are well suited to large families and groups travelling together. Let us know your passenger and luggage numbers when booking so we can confirm the right vehicle.",
    },
  },
];

async function run() {
  const payload = await getPayload({ config });
  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found.`);
  const siteId = site.id as string;

  const dryRun = process.env.DRY_RUN === "true";

  // Group additions by slug so pages needing multiple new FAQs (long-distance-taxi-sydney) get one update.
  const bySlug = new Map<string, { question: string; answer: string }[]>();
  for (const a of additions) {
    if (!bySlug.has(a.slug)) bySlug.set(a.slug, []);
    bySlug.get(a.slug)!.push(a.faq);
  }

  for (const [slug, newFaqs] of bySlug) {
    const res = await payload.find({ collection: "pages", where: { and: [{ site: { equals: siteId } }, { slug: { equals: slug } }] }, limit: 1 });
    const doc = res.docs[0] as any;
    if (!doc) {
      console.warn(`SKIP (page not found): ${slug}`);
      continue;
    }
    const existingQuestions = new Set((doc.faq ?? []).map((f: any) => f.question.toLowerCase()));
    const toAdd = newFaqs.filter((f) => !existingQuestions.has(f.question.toLowerCase()));
    if (toAdd.length === 0) {
      console.log(`  [${slug}] all questions already present, skipping.`);
      continue;
    }
    const updatedFaq = [...(doc.faq ?? []).map((f: any) => ({ question: f.question, answer: f.answer })), ...toAdd];

    if (dryRun) {
      console.log(`  [${slug}] DRY RUN - would add ${toAdd.length} FAQ(s): ${toAdd.map((f) => f.question).join(" | ")}`);
      continue;
    }
    await payload.update({ collection: "pages", id: doc.id, data: { faq: updatedFaq } });
    console.log(`  [${slug}] added ${toAdd.length} FAQ(s).`);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
