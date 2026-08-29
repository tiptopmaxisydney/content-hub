import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { multiTenantPlugin } from "@payloadcms/plugin-multi-tenant";

import { Users } from "./collections/Users";
import { Sites } from "./collections/Sites";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { BlogPosts } from "./collections/BlogPosts";
import { Locations } from "./collections/Locations";
import { FaqLibrary } from "./collections/FaqLibrary";
import { SearchConsoleMetrics } from "./collections/SearchConsoleMetrics";
import { VehicleSpecs } from "./collections/VehicleSpecs";
import { gscOpportunitiesEndpoint } from "./endpoints/gscOpportunities";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
  },
  collections: [Users, Sites, Media, Pages, BlogPosts, Locations, FaqLibrary, SearchConsoleMetrics, VehicleSpecs],
  endpoints: [gscOpportunitiesEndpoint],
  editor: lexicalEditor(),
  plugins: [
    // Pins a "site" switcher at the top of the admin nav and scopes every Pages/Blog
    // Posts list view to whichever site is selected, so editing one site never shows
    // another site's docs mixed into the same list.
    multiTenantPlugin({
      tenantsSlug: Sites.slug,
      // Reuse the `site` relationship field already defined on Pages/BlogPosts (see
      // customTenantField below) instead of having the plugin add its own duplicate field.
      tenantField: { name: "site" },
      collections: {
        pages: { customTenantField: true, useTenantAccess: false },
        "blog-posts": { customTenantField: true, useTenantAccess: false },
        locations: { customTenantField: true, useTenantAccess: false },
        "faq-library": { customTenantField: true, useTenantAccess: false },
        "vehicle-specs": { customTenantField: true, useTenantAccess: false },
      },
      // Access control itself is still handled by siteScopedAccess (src/access/siteScoped.ts)
      // on each collection - this plugin only drives the admin UI selector + list filtering.
      userHasAccessToAllTenants: (user) => (user as { role?: string } | null)?.role === "admin",
    }),
  ],
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
