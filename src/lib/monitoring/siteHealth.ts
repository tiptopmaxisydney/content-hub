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
  if (
    err instanceof Error &&
    (err.name === "TimeoutError" || err.name === "AbortError")
  ) {
    return `No response within ${TIMEOUT_MS / 1000}s`;
  }
  const cause = (err as { cause?: { code?: string } })?.cause?.code;
  return cause ? `Unreachable (${cause})` : "Unreachable";
}

export type SystemTarget = {
  key: string;
  name: string;
  domain?: string | null;
  /** Health path on the domain. Defaults to the brand sites' `/api/health/`. */
  healthPath?: string;
};

// Tiptop Ride platform systems. They aren't CMS tenants, so they're listed here rather than in
// the Sites collection. Each health endpoint comes from the tipopride / tipopride-backend repos.
export const PLATFORM_SYSTEMS: SystemTarget[] = [
  {
    key: "tiptopride-customer",
    name: "Tiptop Ride booking app",
    domain: "bookings.tiptopride.com.au",
    healthPath: "/api/health",
  },
  {
    key: "nexus-admin",
    name: "Nexus admin (Nexus1)",
    domain: "nexus1.tiptopride.com.au",
    healthPath: "/api/health",
  },
  {
    key: "backend",
    name: "Booking API (backend)",
    domain: "nexus1.tiptopride.com.au:3000",
    healthPath: "/health",
  },
];

const STATUS_TO_STATE: Record<string, SiteState> = {
  ok: "healthy",
  degraded: "degraded",
  down: "down",
};

export async function checkSite(site: SystemTarget): Promise<SiteHealth> {
  const base = {
    key: site.key,
    name: site.name,
    domain: site.domain ?? null,
    checkedAt: new Date().toISOString(),
  };

  if (!site.domain) {
    return {
      ...base,
      state: "unknown",
      summary: "No domain set on the Site record",
      responseMs: null,
      checks: null,
      healthEndpoint: false,
    };
  }

  const origin = `https://${site.domain.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;

  try {
    const { res, ms } = await timedFetch(
      `${origin}${site.healthPath ?? "/api/health/"}`,
    );
    // The backend answers 503 with a JSON body when its database is down, so read JSON on any status.
    const isJson = (res.headers.get("content-type") ?? "").includes(
      "application/json",
    );
    const body = isJson ? await res.json().catch(() => null) : null;

    if (body && typeof body.status === "string") {
      const checks = (body.checks ?? null) as Record<string, string> | null;
      const failing = checks
        ? Object.entries(checks)
            .filter(([, v]) => v === "down")
            .map(([k]) => k)
        : [];
      const state = STATUS_TO_STATE[body.status] ?? "degraded";
      return {
        ...base,
        state,
        summary:
          state === "healthy"
            ? "Responding, dependencies OK"
            : state === "down"
              ? `Down: ${failing.join(", ") || "not serving requests"}`
              : `Up, but not responding: ${failing.join(", ") || "a dependency"}`,
        responseMs: ms,
        checks,
        healthEndpoint: true,
      };
    }

    if (res.status >= 500) {
      return {
        ...base,
        state: "down",
        summary: `Server error (HTTP ${res.status})`,
        responseMs: ms,
        checks: null,
        healthEndpoint: false,
      };
    }
  } catch (err) {
    return {
      ...base,
      state: "down",
      summary: describeError(err),
      responseMs: null,
      checks: null,
      healthEndpoint: false,
    };
  }

  // Health endpoint not deployed on this system yet - fall back to the homepage. An API (custom
  // healthPath) has no homepage, so any non-5xx answer there just means it is reachable.
  try {
    const { res, ms } = await timedFetch(`${origin}/`);
    const up = site.healthPath ? res.status < 500 : res.ok;
    return {
      ...base,
      state: up ? "healthy" : "down",
      summary: up
        ? "Responding (health check not deployed yet)"
        : `Returned HTTP ${res.status}`,
      responseMs: ms,
      checks: null,
      healthEndpoint: false,
    };
  } catch (err) {
    return {
      ...base,
      state: "down",
      summary: describeError(err),
      responseMs: null,
      checks: null,
      healthEndpoint: false,
    };
  }
}
