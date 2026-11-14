// Live health checks for the frontend sites listed in the Sites collection.
//
// Each frontend exposes /api/health/ (see lib/monitoring.ts + app/api/health in each site repo),
// which reports whether the site itself, the CMS and the booking API are reachable. Sites that
// haven't been deployed with that endpoint yet fall back to a plain homepage check.
//
// This is a "check now" view only. Nexus2 runs on the same server as the sites, so outage
// alerts must come from an external monitor (Better Stack), not from here.

export type SiteState = "healthy" | "degraded" | "down" | "unknown";

export type SiteHealth = {
  key: string;
  name: string;
  domain: string | null;
  state: SiteState;
  summary: string;
  responseMs: number | null;
  checks: Record<string, string> | null;
  healthEndpoint: boolean;
  checkedAt: string;
};

const TIMEOUT_MS = 8000;

async function timedFetch(url: string) {
  const started = Date.now();
  const res = await fetch(url, {
    cache: "no-store",
    redirect: "follow",
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { "User-Agent": "Nexus2-SystemStatus/1.0" },
  });
  return { res, ms: Date.now() - started };
}

function describeError(err: unknown): string {
  if (err instanceof Error && (err.name === "TimeoutError" || err.name === "AbortError")) {
    return `No response within ${TIMEOUT_MS / 1000}s`;
  }
  const cause = (err as { cause?: { code?: string } })?.cause?.code;
  return cause ? `Unreachable (${cause})` : "Unreachable";
}

export async function checkSite(site: { key: string; name: string; domain?: string | null }): Promise<SiteHealth> {
  const base = {
    key: site.key,
    name: site.name,
    domain: site.domain ?? null,
    checkedAt: new Date().toISOString(),
  };

  if (!site.domain) {
    return { ...base, state: "unknown", summary: "No domain set on the Site record", responseMs: null, checks: null, healthEndpoint: false };
  }

  const origin = `https://${site.domain.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;

  try {
    const { res, ms } = await timedFetch(`${origin}/api/health/`);
    const body = res.ok ? await res.json().catch(() => null) : null;

    if (body && typeof body.status === "string") {
      const checks = (body.checks ?? null) as Record<string, string> | null;
      const failing = checks ? Object.entries(checks).filter(([, v]) => v === "down").map(([k]) => k) : [];
      return {
        ...base,
        state: body.status === "ok" ? "healthy" : "degraded",
        summary: body.status === "ok" ? "Site and dependencies responding" : `Site up, but not responding: ${failing.join(", ") || "a dependency"}`,
        responseMs: ms,
        checks,
        healthEndpoint: true,
      };
    }

    if (res.status >= 500) {
      return { ...base, state: "down", summary: `Server error (HTTP ${res.status})`, responseMs: ms, checks: null, healthEndpoint: false };
    }
  } catch (err) {
    return { ...base, state: "down", summary: describeError(err), responseMs: null, checks: null, healthEndpoint: false };
  }

  // Health endpoint not deployed on this site yet - fall back to the homepage.
  try {
    const { res, ms } = await timedFetch(`${origin}/`);
    return {
      ...base,
      state: res.ok ? "healthy" : "down",
      summary: res.ok ? "Homepage responding (health check not deployed yet)" : `Homepage returned HTTP ${res.status}`,
      responseMs: ms,
      checks: null,
      healthEndpoint: false,
    };
  } catch (err) {
    return { ...base, state: "down", summary: describeError(err), responseMs: null, checks: null, healthEndpoint: false };
  }
}
