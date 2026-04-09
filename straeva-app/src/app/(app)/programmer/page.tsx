"use client";
import { useStore } from "@/lib/state";
import TopBar from "@/components/app/TopBar";
import Link from "next/link";
import { PROGRAMS_INDEX } from "@/lib/programs-data";

export default function ProgramsPage() {
  const enrollments = useStore((s) => s.programEnrollments);
  const enroll = useStore((s) => s.enrollProgram);

  return (
    <>
      <TopBar />
      <div style={{ padding: "8px 18px 32px" }}>
        <h1 style={{ fontSize: "1.8rem", fontFamily: "var(--font-headline)", marginBottom: 6 }}>Programmer</h1>
        <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", marginBottom: 20 }}>Strukturerte, veiledede forlop for ulike mal.</p>
        <div style={{ display: "grid", gap: 14 }}>
          {PROGRAMS_INDEX.map((p) => {
            const enrollment = enrollments.find((e) => e.programId === p.id);
            const totalDays = p.days.length;
            return (
              <div key={p.id} className="card card--airy">
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontSize: "2rem" }}>{String.fromCodePoint(parseInt(p.icon, 16))}</span>
                  <div style={{ flex: 1 }}>
                    <Link href={"/app/program/" + p.id} style={{ textDecoration: "none", color: "inherit" }}>
                      <h3 style={{ fontSize: "1.05rem", marginBottom: 4, color: "var(--text)" }}>{p.title_no}</h3>
                    </Link>
                    <p style={{ color: "var(--text-soft)", fontSize: "0.85rem", lineHeight: 1.5, margin: "0 0 10px" }}>{p.desc_no}</p>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-soft)", marginBottom: enrollment ? 10 : 0 }}>{p.duration}</div>
                    {enrollment ? (
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 600 }}>Dag {enrollment.currentDay} / {totalDays}</span>
                        <div style={{ flex: 1, height: 6, background: "var(--surface-strong)", borderRadius: 999 }}>
                          <div style={{ width: Math.min(100, Math.round(enrollment.currentDay / totalDays * 100)) + "%", height: "100%", background: "var(--primary)", borderRadius: 999 }} />
                        </div>
                      </div>
                    ) : (
                      <button type="button" className="btn btn-primary btn-small" onClick={() => enroll(p.id)}>Start program</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
