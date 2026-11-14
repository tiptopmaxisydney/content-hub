"use client";

import { NavGroup, useAuth } from "@payloadcms/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";

// "IT Monitoring & Operations" sidebar group. Only shown to admins - the view itself also
// enforces this server-side.
export function MonitoringNav() {
  const { user } = useAuth();
  const pathname = usePathname();
  if ((user as { role?: string } | null)?.role !== "admin") return null;

  const href = "/admin/system-status";
  const active = pathname === href;

  return (
    <NavGroup label="IT Monitoring & Operations">
      <Link href={href} className="nav__link" id="nav-system-status" prefetch={false}>
        {active && <div className="nav__link-indicator" />}
        <span className="nav__link-label">System Status</span>
      </Link>
    </NavGroup>
  );
}
