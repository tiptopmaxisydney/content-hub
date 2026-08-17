import type { Access } from "payload";

/**
 * Editors are restricted to the sites listed on their user record (Users.sites).
 * Admins, and editors with no sites assigned, get access to everything.
 */
export const siteScopedAccess: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === "admin") return true;
  const siteIds = (user.sites ?? []).map((s: { id: string } | string) => (typeof s === "string" ? s : s.id));
  if (siteIds.length === 0) return true;
  return { site: { in: siteIds } };
};
