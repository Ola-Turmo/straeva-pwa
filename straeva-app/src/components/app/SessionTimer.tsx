"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/state";

export default function SessionTimer() {
  const active = useStore((s) => s.movement.activeSession);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!active) { setElapsed(0); return; }
    const tick = () => setElapsed(Math.round((Date.now() - active.startedAt) / 1000));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [active]);

  if (!active) return null;

  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  const hide = active.hideMetrics;

  return (
    <div style={{ textAlign: "center", padding: "32px 0" }}>
      <div className={hide ? "timer-breathe" : ""} style={{ fontFamily: "var(--font-mono)", fontSize: hide ? "1.2rem" : "3.5rem", fontWeight: 700, color: hide ? "var(--text-soft)" : "var(--text)", letterSpacing: "-0.02em" }}>
        {hide ? "Du er i bevegelse" : `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`}
      </div>
      <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", marginTop: 8 }}>{active.type}</p>
    </div>
  );
}
