"use client";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/lib/state";
import TopBar from "@/components/app/TopBar";
import { weekStart } from "@/lib/utils";
import { REFLECTION_PROMPTS } from "@/lib/reflection-prompts";
import { tl } from "@/lib/i18n";
import { persist } from "@/lib/local-db";

export default function ReflectionsPage() {
  const reflections = useStore((s) => s.reflections);
  const addWin = useStore((s) => s.addWin);
  const setToast = useStore((s) => s.setToast);
  const lang = useStore((s) => s.profile.preferences.language);
  const copy = tl(lang);
  const week = weekStart();
  const existing = useMemo(() => reflections.find((entry) => entry.weekStart === week), [reflections, week]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!existing) return;
    setAnswers(
      Object.fromEntries(Object.entries(existing.responses).map(([key, value]) => [key, String(value)]))
    );
  }, [existing]);

  async function handleSave() {
    const hasContent = REFLECTION_PROMPTS.some((prompt) => answers[prompt.id]?.trim());
    if (!hasContent) {
      setToast(lang === "en" ? "Write at least one reflection before saving." : "Skriv minst én refleksjon før du lagrer.");
      return;
    }

    const state = useStore.getState();
    const reflection = {
      id: existing?.id ?? `reflection-${week}`,
      weekStart: week,
      answeredAt: Date.now(),
      responses: answers,
    };
    const nextReflections = [reflection, ...state.reflections.filter((entry) => entry.weekStart !== week)].slice(0, 24);
    const next = { ...state, reflections: nextReflections, toast: lang === "en" ? "Weekly reflection saved." : "Ukentlig refleksjon lagret." };

    useStore.setState(next);
    await persist(next);
    addWin(lang === "en" ? "Completed weekly reflection" : "Fullførte ukentlig refleksjon", "omsorg", false);
  }

  return (
    <>
      <TopBar />
      <div style={{ padding: "8px 18px 32px" }}>
        <h1 style={{ fontSize: "1.8rem", fontFamily: "var(--font-headline)", marginBottom: 6 }}>
          {lang === "en" ? "Weekly reflection" : "Ukentlig refleksjon"}
        </h1>
        <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", marginBottom: 20, lineHeight: 1.6 }}>
          {lang === "en"
            ? `Week starting ${new Date(week).toLocaleDateString("en-GB", { day: "numeric", month: "long" })}`
            : `Uke som startet ${new Date(week).toLocaleDateString("no-NO", { day: "numeric", month: "long" })}`}
        </p>

        <div className="card card--airy" style={{ marginBottom: 18 }}>
          <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>
            {lang === "en"
              ? "Use this space to notice what supported you, what felt heavy, and how you want to care for yourself next."
              : "Bruk dette rommet til å legge merke til hva som støttet deg, hva som var tungt, og hvordan du vil ta vare på deg selv videre."}
          </p>
        </div>

        <div style={{ display: "grid", gap: 16 }}>
          {REFLECTION_PROMPTS.map((prompt, index) => (
            <div key={prompt.id} className="card card--airy">
              <label style={{ fontWeight: 600, fontSize: "0.95rem", display: "block", marginBottom: 8 }}>
                {index + 1}. {lang === "en" ? prompt.prompt.en : prompt.prompt.no}
              </label>
              <textarea
                className="form-textarea"
                value={answers[prompt.id] ?? ""}
                onChange={(event) => setAnswers((prev) => ({ ...prev, [prompt.id]: event.target.value }))}
                placeholder={lang === "en" ? prompt.placeholder.en : prompt.placeholder.no}
                rows={4}
              />
            </div>
          ))}
        </div>

        <button type="button" className="btn btn-primary btn-large" style={{ width: "100%", marginTop: 20 }} onClick={() => void handleSave()}>
          {copy.common.save}
        </button>

        {reflections.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: "1.1rem", fontFamily: "var(--font-headline)", marginBottom: 12 }}>
              {lang === "en" ? "Previous weeks" : "Tidligere uker"}
            </h2>
            {reflections
              .filter((entry) => entry.weekStart !== week)
              .sort((a, b) => b.answeredAt - a.answeredAt)
              .slice(0, 4)
              .map((entry) => (
                <div key={entry.id} className="card" style={{ marginBottom: 10, padding: "12px 14px" }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-soft)", marginBottom: 6 }}>
                    {new Date(entry.weekStart).toLocaleDateString(lang === "en" ? "en-GB" : "no-NO", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  {REFLECTION_PROMPTS.slice(0, 2).map((prompt) =>
                    entry.responses?.[prompt.id] ? (
                      <div key={prompt.id} style={{ fontSize: "0.85rem", marginBottom: 4 }}>
                        <span style={{ color: "var(--text-soft)" }}>
                          {lang === "en" ? prompt.prompt.en : prompt.prompt.no}:{" "}
                        </span>
                        <span>{String(entry.responses[prompt.id])}</span>
                      </div>
                    ) : null
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
