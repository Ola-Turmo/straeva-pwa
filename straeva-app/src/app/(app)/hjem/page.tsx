"use client";
import { useStore } from "@/lib/state";
import TopBar from "@/components/app/TopBar";
import EnergyGrid from "@/components/app/EnergyGrid";
import CelebrationModal from "@/components/app/CelebrationModal";
import { todayKey } from "@/lib/utils";
import { AFFIRMATIONS, MICRO_WINS } from "@/lib/content";
import Link from "next/link";
import { tl } from "@/lib/i18n";

export default function HomePage() {
  const dayLog = useStore((s) => s.dayLog);
  const streak = useStore((s) => s.streakData);
  const wins = useStore((s) => s.wins);
  const care = useStore((s) => s.care);
  const grantGrace = useStore((s) => s.grantGrace);
  const addWin = useStore((s) => s.addWin);
  const lang = useStore((s) => s.profile.preferences.language);
  const graceDaysPerMonth = useStore((s) => s.profile.preferences.graceDaysPerMonth ?? 3);
  const copy = tl(lang);
  const today = dayLog[todayKey()] || {};
  const graceRemaining = Math.max(0, graceDaysPerMonth - (streak.graceDaysUsedThisMonth || 0));
  const winsToday = wins.filter((w) => `${w.createdAt}`.startsWith(todayKey())).length;
  const careThisWeek = care.filter((c) => c.createdAt >= Date.now() - 7 * 86400000).length;
  const affirmationSource = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
  const affirmation = lang === "en" ? affirmationSource.en : affirmationSource.no;

  return (
    <>
      <TopBar />
      <div style={{ padding: "8px 18px 32px" }}>
        <div style={{ padding: "14px 16px", background: "var(--primary-pale)", borderRadius: "var(--radius-md)", marginBottom: 18, border: "1px solid var(--outline)" }}>
          <p style={{ margin: 0, fontStyle: "italic", color: "var(--text-soft)", fontSize: "0.9rem", lineHeight: 1.5 }}>"{affirmation}"</p>
        </div>
        <div className="card card--airy" style={{ marginBottom: 14 }}>
          <h2 style={{ fontSize: "1rem", fontFamily: "var(--font-headline)", marginBottom: 14 }}>{copy.home.energyQuestion}</h2>
          <EnergyGrid />
        </div>
        <Link href="/app/bevegelse" className="btn btn-primary btn-large" style={{ width: "100%", marginBottom: 14, display: "flex", justifyContent: "center" }}>
          {copy.home.quickStart}
        </Link>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-headline)", color: "var(--primary)" }}>{streak.currentContinuity}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-soft)" }}>{copy.home.streak}</div>
          </div>
          <div className="card" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-headline)", color: "var(--secondary)" }}>{graceRemaining}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-soft)" }}>{copy.home.graceRemaining}</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
          <div className="card"><div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary)" }}>{winsToday}</div><div style={{ fontSize: "0.75rem", color: "var(--text-soft)" }}>{copy.home.winsToday}</div></div>
          <div className="card"><div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary)" }}>{careThisWeek}</div><div style={{ fontSize: "0.75rem", color: "var(--text-soft)" }}>{copy.home.careThisWeek}</div></div>
        </div>
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{lang === "en" ? "Grace day" : "Nådedag"}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-soft)" }}>{lang === "en" ? "Take a day of rest without losing your rhythm." : "Ta en dag med hvile uten å miste rytmen."}</div>
            </div>
            <button type="button" className="btn btn-ghost btn-small" onClick={() => grantGrace()}>
              {today.grace ? copy.home.removeGrace : copy.home.grantGrace}
            </button>
          </div>
        </div>
        <div className="card">
          <h3 style={{ fontSize: "0.95rem", fontFamily: "var(--font-headline)", marginBottom: 12 }}>{lang === "en" ? "What have you done today?" : "Hva har du gjort i dag?"}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {MICRO_WINS.map((w) => (
              <button key={w.label} type="button" className="chip" onClick={() => addWin(lang === "en" ? w.en : w.label, w.category as Parameters<typeof addWin>[1])}>
                {lang === "en" ? w.en : w.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <CelebrationModal />
    </>
  );
}
