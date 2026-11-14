"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

// Re-runs the server-side health checks every `seconds` and on demand.
export function AutoRefresh({ seconds = 60 }: { seconds?: number }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => startTransition(() => router.refresh()), seconds * 1000);
    return () => clearInterval(id);
  }, [enabled, seconds, router]);

  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
      <button
        type="button"
        className="btn btn--style-primary btn--size-small"
        style={{ margin: 0 }}
        disabled={isPending}
        onClick={() => startTransition(() => router.refresh())}
      >
        {isPending ? "Checking…" : "Check now"}
      </button>
      <label style={{ display: "flex", gap: 6, alignItems: "center", cursor: "pointer" }}>
        <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
        Auto-refresh every {seconds}s
      </label>
    </div>
  );
}
