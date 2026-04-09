"use client";
import { useStore } from "@/lib/state";
import TopBar from "@/components/app/TopBar";
import { tl } from "@/lib/i18n";

export default function InsightsPage() {
  const streak = useStore((s) => s.streakData);
  const insights = useStore((s) => s.insightsCache);
  const sessions = useStore((s) => s.movement.sessions);
  const care = useStore((s) => s.care);
  const lang = useStore((s) => s.profile.preferences.language);
  const copy = tl(lang);

  const week = sessions.filter((s) => s.startedAt >= Date.now() - 7 * 86400000);
  const weekMins = week.reduce((a, s) => a + s.minutes, 0);
  const careThisWeek = care.filter((c) => c.createdAt >= Date.now() - 7 * 86400000).length;

  const conditionText = insights?.bestConditions?.sessionType
    ? lang === "en"
      ? `You tend to show up most for "${insights.bestConditions.sessionType}".`
      : `Du viser deg mest under "${insights.bestConditions.sessionType}"`
    : lang === "en"
      ? "Log a few more sessions to discover your pattern."
      : "Logg flere økter for å se mønsteret ditt.";

  return (
    <>
      <TopBar />
      <div style={{ padding: "8px 18px 32px" }}>
        <h1 style={{ fontSize: "1.8rem", fontFamily: "var(--font-headline)", marginBottom: 20 }}>{copy.insights.title}</h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 900, fontFamily: "var(--font-headline)", color: "var(--primary)" }}>{streak.currentContinuity}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-soft)", marginTop: 4 }}>{copy.insights.currentStreak}</div>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 900, fontFamily: "var(--font-headline)", color: "var(--primary)" }}>{streak.longestContinuity}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-soft)", marginTop: 4 }}>{copy.insights.longestStreak}</div>
          </div>
        </div>

        <div className="card card--airy" style={{ marginBottom: 14 }}>
          <h2 style={{ fontSize: "1rem", marginBottom: 14 }}>{lang === "en" ? "This week" : "Denne uken"}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <div style={{ textAlign: "center", padding: 12, background: "var(--surface-plain)", borderRadius: "var(--radius-sm)" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary)" }}>{weekMins}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-soft)" }}>{copy.insights.minutesThisWeek}</div>
            </div>
            <div style={{ textAlign: "center", padding: 12, background: "var(--surface-plain)", borderRadius: "var(--radius-sm)" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary)" }}>{week.length}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-soft)" }}>{lang === "en" ? "sessions" : "økter"}</div>
            </div>
            <div style={{ textAlign: "center", padding: 12, background: "var(--surface-plain)", borderRadius: "var(--radius-sm)" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--secondary)" }}>{careThisWeek}</div>
              <div style={{ fontSize: "0.7rem", color: "var(--text-soft)" }}>{copy.insights.careScore}</div>
            </div>
          </div>
        </div>

        <div className="card card--airy" style={{ marginBottom: 14 }}>
          <h2 style={{ fontSize: "1rem", marginBottom: 10 }}>{copy.insights.bestConditions}</h2>
          <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", lineHeight: 1.5, margin: 0 }}>{conditionText}</p>
        </div>

        {insights && (
          <div className="card card--airy">
            <h2 style={{ fontSize: "1rem", marginBottom: 10 }}>{lang === "en" ? "Momentum trend" : "Trend"}</h2>
            <div style={{ display: "flex", gap: 10 }}>
              {(["up","stable","down"] as const).map((t) => (
                <div key={t} style={{ flex: 1, padding: "12px 8px", borderRadius: "var(--radius-sm)", background: insights.momentumTrend===t?"var(--primary-pale)":"var(--surface-plain)", border: `2px solid ${insights.momentumTrend===t?"var(--primary)":"transparent"}`, textAlign: "center" }}>
                  <div style={{ fontSize: "1.2rem" }}>{t === "up" ? "↑" : t === "down" ? "↓" : "→"}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-soft)" }}>{copy.insights.momentumTrend[t]}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
