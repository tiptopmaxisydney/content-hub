import type { AdminViewServerProps } from "payload";
import { DefaultTemplate } from "@payloadcms/next/templates";
import { Gutter } from "@payloadcms/ui";
import { redirect } from "next/navigation";

import { checkSite, type SiteHealth, type SiteState } from "@/lib/monitoring/siteHealth";
import { AutoRefresh } from "./AutoRefresh";

const STATE_STYLE: Record<SiteState, { label: string; color: string }> = {
  healthy: { label: "Healthy", color: "var(--theme-success-500, #2e9e5b)" },
  degraded: { label: "Warning", color: "var(--theme-warning-500, #d99a00)" },
  down: { label: "Down", color: "var(--theme-error-500, #d93d3d)" },
  unknown: { label: "Unknown", color: "var(--theme-elevation-500, #888)" },
};

const CHECK_LABELS: Record<string, string> = { cms: "CMS (Nexus2)", bookingApi: "Booking API" };

function Badge({ state }: { state: SiteState }) {
  const { label, color } = STATE_STYLE[state];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "2px 10px",
        borderRadius: 999,
        border: `1px solid ${color}`,
        color,
        fontWeight: 600,
        fontSize: 13,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
      {label}
    </span>
  );
}

function Tile({ label, value, state }: { label: string; value: number; state?: SiteState }) {
  return (
    <div
      style={{
        flex: "1 1 160px",
        padding: "16px 20px",
        borderRadius: 8,
        border: "1px solid var(--theme-elevation-150)",
        background: "var(--theme-elevation-50)",
      }}
    >
      <div style={{ fontSize: 13, color: "var(--theme-elevation-600)" }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 700, color: state && value > 0 ? STATE_STYLE[state].color : undefined }}>
        {value}
      </div>
    </div>
  );
}

const cell: React.CSSProperties = { padding: "12px 10px", borderBottom: "1px solid var(--theme-elevation-100)", verticalAlign: "top" };

export async function SystemStatusView({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const { req, locale, permissions, visibleEntities } = initPageResult;
  const user = req.user as { role?: string } | null;

  if (!user) redirect("/admin/login?redirect=%2Fadmin%2Fsystem-status");

  const template = (children: React.ReactNode) => (
    <DefaultTemplate
      i18n={req.i18n}
      locale={locale}
      params={params}
      payload={req.payload}
      permissions={permissions}
      searchParams={searchParams}
      user={req.user || undefined}
      visibleEntities={visibleEntities}
    >
      <Gutter>{children}</Gutter>
    </DefaultTemplate>
  );

  if (user.role !== "admin") {
    return template(
      <>
        <h1>System Status</h1>
        <p>Only admins can view system monitoring.</p>
      </>,
    );
  }

  const { docs: sites } = await req.payload.find({
    collection: "sites",
    limit: 100,
    depth: 0,
    sort: "name",
    overrideAccess: false,
    user: req.user,
  });

  const results: SiteHealth[] = await Promise.all(
    sites.map((s) => checkSite({ key: String(s.key), name: String(s.name), domain: s.domain })),
  );

  const count = (state: SiteState) => results.filter((r) => r.state === state).length;
  const checkedAt = new Date().toLocaleString("en-AU", { timeZone: "Australia/Sydney", dateStyle: "medium", timeStyle: "medium" });

  return template(
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap", margin: "24px 0 8px" }}>
        <div>
          <h1 style={{ margin: 0 }}>System Status</h1>
          <p style={{ margin: "4px 0 0", color: "var(--theme-elevation-600)" }}>
            Live check of every site in the Sites collection · checked {checkedAt} (Sydney)
          </p>
        </div>
        <AutoRefresh seconds={60} />
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "20px 0 28px" }}>
        <Tile label="Total systems" value={results.length} />
        <Tile label="Healthy" value={count("healthy")} state="healthy" />
        <Tile label="Warnings" value={count("degraded")} state="degraded" />
        <Tile label="Down" value={count("down")} state="down" />
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ textAlign: "left", color: "var(--theme-elevation-600)" }}>
              <th style={cell}>Site</th>
              <th style={cell}>Status</th>
              <th style={cell}>Details</th>
              <th style={cell}>Dependencies</th>
              <th style={{ ...cell, textAlign: "right" }}>Response</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.key}>
                <td style={cell}>
                  <div style={{ fontWeight: 600 }}>{r.name}</div>
                  {r.domain && (
                    <a href={`https://${r.domain}`} target="_blank" rel="noreferrer" style={{ fontSize: 13 }}>
                      {r.domain}
                    </a>
                  )}
                </td>
                <td style={cell}>
                  <Badge state={r.state} />
                </td>
                <td style={cell}>{r.summary}</td>
                <td style={cell}>
                  {r.checks
                    ? Object.entries(r.checks).map(([k, v]) => (
                        <div key={k} style={{ whiteSpace: "nowrap" }}>
                          {CHECK_LABELS[k] ?? k}:{" "}
                          <strong style={{ color: v === "ok" ? STATE_STYLE.healthy.color : v === "down" ? STATE_STYLE.down.color : undefined }}>
                            {v}
                          </strong>
                        </div>
                      ))
                    : <span style={{ color: "var(--theme-elevation-500)" }}>—</span>}
                </td>
                <td style={{ ...cell, textAlign: "right", whiteSpace: "nowrap" }}>
                  {r.responseMs !== null ? `${r.responseMs} ms` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: 24, fontSize: 13, color: "var(--theme-elevation-600)" }}>
        This page checks the sites when you open it. Nexus2 runs on the same server as the sites, so
        24/7 outage alerts come from the external monitor (Better Stack) and error details from Sentry.
      </p>
    </>,
  );
}
