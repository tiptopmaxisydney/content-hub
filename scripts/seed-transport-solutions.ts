/**
 * One-time migration: reads transport-solutions-sydney's original hardcoded content and
 * creates matching docs in Payload, uploading each referenced image into Media along the
 * way. Source is a frozen snapshot (./source-snapshots/transport-solutions/) - see
 * seed-baby-seat.ts for why this doesn't read the live frontend repo's lib/ files.
 *
 * Unlike baby-seat/wheelchair, this site's blog posts store raw HTML instead of a
 * heading+paragraphs array, so they're converted to Payload richText (BlogPosts.content)
 * at seed time instead of being mapped onto BlogPosts.sections.
 *
 * Its service pages are covered by seed-transport-solutions-pages.ts, not this file -
 * their content lives inline in JSX rather than a clean data array, so they're
 * transcribed by hand into ./source-snapshots/transport-solutions/servicePages.ts first.
 *
 * Run with: npm run seed:transport-solutions   (from content-hub/)
 * Safe to re-run - existing docs (matched by site+slug) are updated, not duplicated.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "../src/payload.config";
import { upsertSite, upsertBySlug, createMediaUploader, createHtmlToLexicalConverter } from "./seedUtils";
import type { BlogPostData } from "./source-snapshots/transport-solutions/blogPostType";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(dirname, "../../transport-solutions-sydney/public");
const blogPostsDir = path.resolve(dirname, "./source-snapshots/transport-solutions/blog-posts");

async function loadBlogPosts(): Promise<BlogPostData[]> {
  const files = fs.readdirSync(blogPostsDir).filter((f) => f.endsWith(".ts"));
  const posts: BlogPostData[] = [];
  for (const file of files) {
    const mod = await import(`./source-snapshots/transport-solutions/blog-posts/${file}`);
    posts.push(mod.default as BlogPostData);
  }
  return posts;
}

// Every <a> tag across all 59 source posts is a bare `<a>` with no href (a leftover
// artifact from whatever tool originally authored this content, not a real link - grep
// confirms zero `href="..."` attributes anywhere in lib/blog-posts/). The lexical
// converter still tries to validate them as links, which fails since they have no URL,
// so strip them here rather than encode broken links no post actually uses.
function stripEmptyAnchors(html: string): string {
  return html.replace(/<a[^>]*>/g, "").replace(/<\/a>/g, "");
}

async function run() {
  const payload = await getPayload({ config });
  const getOrUploadMedia = createMediaUploader(payload, publicDir);
  const htmlToLexical = createHtmlToLexicalConverter(payload);
  const site = await upsertSite(payload, { name: "Transport Solutions Sydney", key: "transport-solutions", domain: "tiptopmaxisydney.com.au" });

  const blogPosts = await loadBlogPosts();
  console.log(`Seeding ${blogPosts.length} blog posts...`);
  for (const b of blogPosts) {
    const imageId = await getOrUploadMedia(b.heroImage, b.title);
    const content = await htmlToLexical(stripEmptyAnchors(b.contentHtml));
    const data = {
      site: site.id,
      slug: b.slug,
      title: b.title,
      metaTitle: b.title,
      metaDescription: b.excerpt,
      excerpt: b.excerpt,
      date: new Date(b.date).toISOString(),
      image: imageId,
      content,
    };
    await upsertBySlug(payload, "blog-posts", site.id as string, b.slug, data);
    console.log(`  blog post: ${b.slug}`);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
