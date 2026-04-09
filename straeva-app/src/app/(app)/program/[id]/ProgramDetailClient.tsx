"use client";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/state";
import TopBar from "@/components/app/TopBar";
import { getProgram } from "@/lib/programs-data";

export default function ProgramDetailClient({ id }: { id: string }) {
  const enrollments = useStore((s) => s.programEnrollments);
  const enroll = useStore((s) => s.enrollProgram);
  const completeDay = useStore((s) => s.completeProgramDay);
  const setToast = useStore((s) => s.setToast);

  const program = getProgram(id);
  const enrollment = enrollments.find((e) => e.programId === id);

  if (!program) {
    return (
      <>
        <TopBar />
        <div style={{ padding: "18px" }}>
          <p style={{ color: "var(--text-soft)" }}>Program ikke funnet.</p>
        </div>
      </>
    );
  }

  const prog = program as NonNullable<typeof program>;
  const totalDays = prog.days.length;
  const daysCompleted = enrollment?.completedDays?.length ?? 0;
  const progress = totalDays > 0 ? Math.round((daysCompleted / totalDays) * 100) : 0;

  function handleEnroll() {
    enroll(prog.id);
    setToast("Program startet! Første dag er din.");
  }

  function handleCompleteDay(day: number) {
    if (enrollment?.completedDays?.includes(day)) return;
    completeDay(prog.id, day);
    if (daysCompleted + 1 === totalDays) {
      setToast("Du fullførte programmet! Ekte innsats.");
    } else {
      setToast("Dag " + day + " fullført.");
    }
  }

  return (
    <>
      <TopBar />
      <div style={{ padding: "8px 18px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <span style={{ fontSize: "2.5rem" }}>{String.fromCodePoint(parseInt(prog.icon, 16))}</span>
          <div>
            <h1 style={{ fontSize: "1.6rem", fontFamily: "var(--font-headline)", margin: 0 }}>{prog.title_no}</h1>
            <p style={{ color: "var(--text-soft)", fontSize: "0.85rem", margin: "4px 0 0" }}>{prog.duration}</p>
          </div>
        </div>

        <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 20 }}>
          {prog.desc_no}
        </p>

        {enrollment ? (
          <>
            <div className="card card--airy" style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontWeight: 600 }}>Fremgang</span>
                <span style={{ color: "var(--primary)", fontWeight: 700 }}>{daysCompleted} / {totalDays} dager</span>
              </div>
              <div style={{ height: 8, background: "var(--surface-strong)", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: progress + "%", height: "100%", background: "var(--primary)", borderRadius: 999, transition: "width 0.4s ease" }} />
              </div>
              {progress === 100 && (
                <p style={{ color: "var(--primary)", fontWeight: 700, fontSize: "0.9rem", marginTop: 10 }}>Programmet er fullfort!</p>
              )}
            </div>

            <h2 style={{ fontSize: "1.1rem", fontFamily: "var(--font-headline)", marginBottom: 12 }}>Dagene</h2>
            <div style={{ display: "grid", gap: 10 }}>
              {prog.days.map((day) => {
                const isCompleted = enrollment?.completedDays?.includes(day.day) ?? false;
                const isCurrent = !isCompleted && (enrollment?.currentDay === day.day || (!enrollment?.currentDay && day.day === 1));
                return (
                  <div key={day.day} style={{
                    padding: "14px 16px",
                    borderRadius: "var(--radius-md)",
                    border: isCurrent ? "2px solid var(--primary)" : "1px solid var(--outline)",
                    background: isCompleted ? "var(--primary-pale)" : "var(--surface)",
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <span style={{
                        width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                        background: isCompleted ? "var(--primary)" : "transparent",
                        border: isCompleted ? "none" : "2px solid var(--outline)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.75rem", fontWeight: 700,
                        color: isCompleted ? "#fff" : "var(--text-soft)",
                        marginTop: 1,
                      }}>
                        {isCompleted ? "✓" : day.day}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: isCurrent ? 600 : 400, fontSize: "0.9rem", color: isCompleted ? "var(--primary)" : "var(--text)", marginBottom: 2 }}>
                          {day.title_no}
                        </div>
                        {day.suggestedType && (
                          <div style={{ fontSize: "0.78rem", color: "var(--text-soft)", marginBottom: 2 }}>
                            {day.suggestedType} · {day.suggestedMinutes} min
                          </div>
                        )}
                        {isCurrent && (
                          <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                            <button
                              type="button"
                              className="btn btn-primary btn-small"
                              onClick={() => handleCompleteDay(day.day)}
                            >
                              Fullfor dag {day.day}
                            </button>
                            {day.carePrompt_no && (
                              <div style={{ fontSize: "0.78rem", color: "var(--text-soft)", padding: "6px 0", lineHeight: 1.4 }}>
                                {day.carePrompt_no}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <button type="button" className="btn btn-primary btn-large" style={{ width: "100%", marginTop: 8 }} onClick={handleEnroll}>
            Start program
          </button>
        )}
      </div>
    </>
  );
}
