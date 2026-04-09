"use client";
import { useState } from "react";
import { useStore } from "@/lib/state";
import { persist } from "@/lib/local-db";
import { uid } from "@/lib/utils";

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState<"gentle" | "recovery" | "routine" | "less_pressure" | "">("");
  const [energy, setEnergy] = useState(3);

  async function handleFinish() {
    const store = useStore.getState();
    const tk = new Date().toISOString().slice(0, 10);
    const updated = {
      ...store,
      profile: {
        ...store.profile,
        id: uid("user"),
        name: name || "Venn",
        preferences: { ...store.profile.preferences, goal: goal || undefined },
      },
      dayLog: { ...store.dayLog, [tk]: { date: tk, energy } },
      version: 2,
      route: "/app/hjem",
    };
    await persist(updated as any);
    window.location.href = "/app/hjem";
  }

  const energyLabels: Record<number, string> = { 1: "Tung", 2: "Sar", 3: "Rolig", 4: "Klar", 5: "Varm" };

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 18px", background: "var(--background)" }}>
      <div style={{ width: "min(100%, 420px)" }}>
        {step === 0 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: 24, background: "linear-gradient(135deg, var(--primary-soft), var(--primary))", margin: "0 auto 24px", boxShadow: "0 20px 40px rgba(82,100,66,0.2)" }} />
            <h1 style={{ fontSize: "2.2rem", fontFamily: "var(--font-headline)", marginBottom: 16 }}>Velkommen til Straeva</h1>
            <p style={{ color: "var(--text-soft)", fontSize: "1rem", lineHeight: 1.6, marginBottom: 32 }}>Et sted for rolig bevegelse og omsorg - uten press.</p>
            <button type="button" className="btn btn-primary btn-large" style={{ width: "100%" }} onClick={() => setStep(1)}>Kom i gang</button>
          </div>
        )}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: "1.8rem", fontFamily: "var(--font-headline)", marginBottom: 8 }}>Hva skal vi kalle deg?</h2>
            <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", marginBottom: 24 }}>Dette er bare for din personlige opplevelse.</p>
            <div className="form-group" style={{ marginBottom: 20 }}>
              <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="F.eks. Emma" autoFocus />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button type="button" className="btn btn-ghost" onClick={() => setStep(0)}>Tilbake</button>
              <button type="button" className="btn btn-primary" style={{ flex: 1 }} onClick={() => setStep(2)}>Neste</button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: "1.8rem", fontFamily: "var(--font-headline)", marginBottom: 8 }}>Hvem er du?</h2>
            <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", marginBottom: 24 }}>Velg det som passer best.</p>
            <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
              {([
                { id: "gentle", label: "Jeg vil bevege meg mer, men trenger noe skansomt" },
                { id: "recovery", label: "Jeg er i bedring og trenger en trygg start" },
                { id: "routine", label: "Jeg vil bygge en jevn rutine" },
                { id: "less_pressure", label: "Jeg trenger mindre press og mer glede" },
              ] as const).map((g) => (
                <button key={g.id} type="button" className="card"
                  style={{ textAlign: "left", cursor: "pointer", border: goal === g.id ? "2px solid var(--primary)" : "2px solid transparent", padding: "14px 16px" }}
                  onClick={() => setGoal(g.id)}
                >{g.label}</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>Tilbake</button>
              <button type="button" className="btn btn-primary" style={{ flex: 1 }} onClick={() => setStep(3)}>Neste</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: "1.8rem", fontFamily: "var(--font-headline)", marginBottom: 8 }}>Hvordan er energien din akkurat na?</h2>
            <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", marginBottom: 24 }}>Ingen rett svar. Bare aerlighet.</p>
            <div className="energy-grid" style={{ marginBottom: 24 }}>
              {[1, 2, 3, 4, 5].map((v) => (
                <button key={v} type="button" className={`choice-card ${energy === v ? "active" : ""}`} onClick={() => setEnergy(v)}>
                  <span>{v}</span><strong style={{ fontSize: "0.7rem" }}>{energyLabels[v]}</strong>
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button type="button" className="btn btn-ghost" onClick={() => setStep(2)}>Tilbake</button>
              <button type="button" className="btn btn-primary" style={{ flex: 1 }} onClick={handleFinish}>Ferdig - kom i gang</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
