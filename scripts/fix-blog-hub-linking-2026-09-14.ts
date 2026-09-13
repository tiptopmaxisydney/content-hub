/**
 * Part 5 of the 2026-09-14 SEO/AEO audit fixes (item #13 - blog consolidation).
 *
 * The audit's guidance was explicit: don't write dozens more standalone blog posts, instead
 * consolidate the existing 59 around authoritative pillar posts with real internal linking
 * down to supporting posts and up to the commercial service pages. This script does exactly
 * that without rewriting any of the 59 posts' own prose:
 *
 * - Picks one already-existing post per topic cluster to act as the pillar (chosen because its
 *   own title already claims that role, e.g. "Complete Sydney Airport Transfer Guide 2026").
 * - Appends a "Related Guides" section to the pillar's lexical `content` field, linking to its
 *   cluster's supporting posts (by /blog/<slug>/) and the relevant commercial service page(s).
 * - Appends a single "See our full guide" paragraph to each supporting post, linking up to its
 *   pillar - so linking runs both ways without touching either post's existing content.
 *
 * Idempotent: skips a post if it already contains a link to the specific target href.
 *
 * Run with: node --env-file=.env --import tsx scripts/fix-blog-hub-linking-2026-09-14.ts
 * DRY_RUN=true to preview without writing.
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { createHtmlToLexicalConverter } from "./seedUtils";

const SITE_KEY = "transport-solutions";

type Cluster = {
  pillarSlug: string;
  pillarHeading: string;
  supportingSlugs: string[];
  commercialLinks: { href: string; label: string }[];
};

const clusters: Cluster[] = [
  {
    pillarSlug: "complete-sydney-airport-transfer-guide-2026-everything-you-need-to-know",
    pillarHeading: "More Sydney Airport Guides",
    supportingSlugs: [
      "best-time-to-arrive-at-sydney-airport",
      "sydney-airport-syd-the-complete-travelers-guide-for-2026",
      "sydney-airport-taxi-fares-your-complete-2026-price-guide",
      "airport-pickup-sydney-your-guide-to-a-stress-free-transfer",
      "airport-transfer-the-ultimate-guide-to-stress-free-travel",
      "airport-to-airport-transfers-the-ultimate-guide-to-a-seamless-journey",
      "maxi-taxi-sydney-airport-the-ultimate-guide-for-group-family-transfers",
      "family-taxi-sydney-airport-the-2026-stress-free-guide",
      "whats-the-best-way-to-get-to-sydney-airport-in-2026-a-complete-guide",
      "your-guide-to-a-stress-free-airport-transfer-in-sydney",
      "7-reasons-to-pre-book-group-airport-transfer-sydney",
      "group-airport-transfers-vs-rideshare-sydney",
      "taxi-fare-estimator-sydney-the-ultimate-guide-for-2026",
      "taxi-from-circular-quay-to-sydney-airport-the-2026-group-travel-guide",
    ],
    commercialLinks: [
      { href: "/sydney-airport-transfers/", label: "Sydney Airport Transfers" },
      { href: "/how-taxi-fares-are-calculated-sydney/", label: "How Fares Are Calculated" },
      { href: "/which-taxi-should-i-book-sydney/", label: "Which Vehicle Should I Book?" },
    ],
  },
  {
    pillarSlug: "maxi-taxi-sydney-the-complete-guide-to-1-11-seater-group-transfers-airport-pickups-events",
    pillarHeading: "More Group Transport Guides",
    supportingSlugs: [
      "11-seater-maxi-taxi-sydney-the-ultimate-guide-for-group-travel",
      "large-taxi-sydney-the-ultimate-guide-to-group-transport",
      "large-taxi-for-luggage-in-sydney-the-ultimate-guide-to-stress-free-group-travel",
      "maxi-taxi-cabs-sydney-the-ultimate-guide-for-group-transport",
      "maxi-taxi-for-8-people-your-sydney-group-travel-solution-2026",
      "maxi-van-taxi-sydney-the-ultimate-guide-for-group-luggage-travel",
      "corporate-group-transport-sydney-the-ultimate-guide-for-2026",
      "group-concert-transport-sydney-the-ultimate-stress-free-guide",
      "group-transport-for-sydney-events-the-ultimate-stress-free-guide",
      "hotel-transfers-sydney-for-large-groups-the-stress-free-guide",
      "reliable-maxi-taxi-parramatta-your-1-choice-for-group-travel",
      "your-reliable-11-seater-taxi-service-in-liverpool",
      "stress-free-cruise-transfers-in-sydney-for-large-groups",
      "sydney-cruise-terminal-transport-the-ultimate-2026-group-travel-guide",
      "circular-quay-cruise-terminal-transfer-your-stress-free-ride-to-the-ship",
      "airport-to-cruise-terminal-group-transfer-the-stress-free-sydney-guide",
      "white-bay-cruise-terminal-taxi-maxi-your-stress-free-group-transfer",
    ],
    commercialLinks: [
      { href: "/11-seater-taxi-sydney/", label: "11 Seater Taxi Sydney" },
      { href: "/which-taxi-should-i-book-sydney/", label: "Which Vehicle Should I Book?" },
      { href: "/corporate-transfers-sydney/", label: "Corporate Transfers" },
    ],
  },
];

function contentContainsHref(content: any, href: string): boolean {
  const json = JSON.stringify(content ?? {});
  return json.includes(href);
}

async function run() {
  const payload = await getPayload({ config });
  const siteResult = await payload.find({ collection: "sites", where: { key: { equals: SITE_KEY } }, limit: 1 });
  const site = siteResult.docs[0];
  if (!site) throw new Error(`Site with key "${SITE_KEY}" not found.`);
  const siteId = site.id as string;

  const dryRun = process.env.DRY_RUN === "true";
  const htmlToLexical = createHtmlToLexicalConverter(payload);

  async function getPost(slug: string) {
    const res = await payload.find({ collection: "blog-posts", where: { and: [{ site: { equals: siteId } }, { slug: { equals: slug } }] }, limit: 1, depth: 0 });
    return res.docs[0] as any;
  }

  for (const cluster of clusters) {
    // Fetch titles for the supporting posts so the pillar's link list uses real titles, not slugs.
    const titleBySlug = new Map<string, string>();
    for (const slug of cluster.supportingSlugs) {
      const post = await getPost(slug);
      if (!post) {
        console.warn(`  SKIP (supporting post not found): ${slug}`);
        continue;
      }
      titleBySlug.set(slug, post.title);
    }

    // 1. Pillar - append the Related Guides block, using real titles.
    const pillar = await getPost(cluster.pillarSlug);
    if (!pillar) {
      console.warn(`SKIP (pillar not found): ${cluster.pillarSlug}`);
      continue;
    }
    const pillarMarker = `/${cluster.supportingSlugs[0]}/`;
    if (contentContainsHref(pillar.content, pillarMarker)) {
      console.log(`  [${cluster.pillarSlug}] already has Related Guides block, skipping pillar update.`);
    } else {
      const postLinks = cluster.supportingSlugs
        .filter((slug) => titleBySlug.has(slug))
        .map((slug) => `<li><a href="/blog/${slug}/">${titleBySlug.get(slug)}</a></li>`)
        .join("");
      const commercialLinks = cluster.commercialLinks.map((l) => `<a href="${l.href}">${l.label}</a>`).join(", ");
      const html = `<h2>${cluster.pillarHeading}</h2><ul>${postLinks}</ul><p>See also: ${commercialLinks}.</p>`;

      if (dryRun) {
        console.log(`  [${cluster.pillarSlug}] DRY RUN - would append Related Guides block (${cluster.supportingSlugs.length} links).`);
      } else {
        const appended = await htmlToLexical(html);
        const updatedContent = {
          ...pillar.content,
          root: { ...pillar.content.root, children: [...pillar.content.root.children, ...appended.root.children] },
        };
        await payload.update({ collection: "blog-posts", id: pillar.id, data: { content: updatedContent } });
        console.log(`  [${cluster.pillarSlug}] appended Related Guides block.`);
      }
    }

    // 2. Supporting posts - append a single backlink to the pillar.
    for (const slug of cluster.supportingSlugs) {
      const post = await getPost(slug);
      if (!post) continue;
      const pillarHref = `/blog/${cluster.pillarSlug}/`;
      if (contentContainsHref(post.content, pillarHref)) {
        console.log(`  [${slug}] already links to pillar, skipping.`);
        continue;
      }
      if (dryRun) {
        console.log(`  [${slug}] DRY RUN - would append backlink to pillar.`);
        continue;
      }
      const html = `<p>For the complete picture, see our full <a href="${pillarHref}">${pillar.title}</a>.</p>`;
      const appended = await htmlToLexical(html);
      const updatedContent = {
        ...post.content,
        root: { ...post.content.root, children: [...post.content.root.children, ...appended.root.children] },
      };
      await payload.update({ collection: "blog-posts", id: post.id, data: { content: updatedContent } });
      console.log(`  [${slug}] appended backlink to pillar.`);
    }
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
