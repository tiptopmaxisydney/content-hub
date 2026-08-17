import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

import { Users } from "./collections/Users";
import { Sites } from "./collections/Sites";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { BlogPosts } from "./collections/BlogPosts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
  },
  collections: [Users, Sites, Media, Pages, BlogPosts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI ?? "",
    // The shared Atlas cluster this reuses has been unreliable running Payload's default
    // multi-document transactions (rapid sequential writes surfaced NoSuchTransaction errors
    // during seeding). Content edits here are single-document writes, so the atomicity
    // transactions provide isn't load-bearing - if that Atlas tier changes, revisit this.
    transactionOptions: false,
  }),
  sharp,
  cors: (process.env.CORS_ORIGINS ?? "").split(",").filter(Boolean),
  csrf: (process.env.CORS_ORIGINS ?? "").split(",").filter(Boolean),
});
