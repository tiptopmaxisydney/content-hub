import path from "path";
import { getPayload } from "payload";

type Payload = Awaited<ReturnType<typeof getPayload>>;

export async function upsertSite(payload: Payload, data: { name: string; key: string; domain: string }) {
  const existing = await payload.find({ collection: "sites", where: { key: { equals: data.key } }, limit: 1 });
  if (existing.docs[0]) return existing.docs[0];
  return payload.create({ collection: "sites", data });
}

export async function upsertBySlug(
  payload: Payload,
  collection: "pages" | "blog-posts",
  siteId: string,
  slug: string,
  data: Record<string, unknown>,
) {
  const existing = await payload.find({ collection, where: { and: [{ site: { equals: siteId } }, { slug: { equals: slug } }] }, limit: 1 });
  if (existing.docs[0]) {
    return payload.update({ collection, id: existing.docs[0].id, data });
  }
  return payload.create({ collection, data });
}

/** Uploads (or reuses, if already present by filename) an image referenced by a site's frozen content snapshot. */
export function createMediaUploader(payload: Payload, publicDir: string) {
  const cache = new Map<string, string>();

  return async function getOrUploadMedia(src: string, alt: string): Promise<string> {
    const cached = cache.get(src);
    if (cached) return cached;

    const existing = await payload.find({ collection: "media", where: { filename: { equals: path.basename(src) } }, limit: 1 });
    if (existing.docs[0]) {
      cache.set(src, existing.docs[0].id as string);
      return existing.docs[0].id as string;
    }

    const filePath = path.join(publicDir, src.replace(/^\//, ""));
    const doc = await payload.create({ collection: "media", data: { alt }, filePath });
    cache.set(src, doc.id as string);
    console.log(`  uploaded media: ${src}`);
    return doc.id as string;
  };
}
