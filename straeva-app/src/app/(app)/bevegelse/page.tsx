"use client";
import { useState } from "react";
import { useStore } from "@/lib/state";
import TopBar from "@/components/app/TopBar";
import SessionTimer from "@/components/app/SessionTimer";
import CelebrationModal from "@/components/app/CelebrationModal";
import { ACTIVITY_TYPES } from "@/lib/content";

export default function MovementPage() {
  const activeSession = useStore((s) => s.movement.activeSession);
  const startSession = useStore((s) => s.startSession);
  const finishSession = useStore((s) => s.finishSession);
  const cancelSession = useStore((s) => s.cancelSession);
  const sessions = useStore((s) => s.movement.sessions.slice(0, 10));
  const [type, setType] = useState(ACTIVITY_TYPES[0]);
  const [moodBefore, setMoodBefore] = useState(3);
  const [moodAfter, setMoodAfter] = useState(3);
  const [effort, setEffort] = useState(3);
  const [hideMetrics, setHideMetrics] = useState(false);
  const [minutes, setMinutes] = useState(5);
  const [notes, setNotes] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  function handleStart() { startSession({ type, moodBefore, hideMetrics, startedAt: Date.now(), minutes: 0 }); }
  function handleFinish() {
    if (!activeSession) return;
    finishSession(activeSession, { moodAfter, effort, minutes, notes });
    setMoodAfter(3); setEffort(3); setMinutes(5); setNotes("");
  }

  if (activeSession) {
    return (<><TopBar /><div style={{ padding: "8px 18px 32px" }}>
      <div className="hero" style={{ marginBottom: 18 }}>
        <SessionTimer />
        <div style={{ display: "grid", gap: 12 }}>
          <div className="form-group">
            <label className="form-label">Humør etterpå</label>
            <div className="energy-grid">{[1,2,3,4,5].map((v) => (<button key={v} type="button" className={`choice-card ${moodAfter===v?"active":""}`} onClick={()=>setMoodAfter(v)}><span>{v}</span></button>))}</div>
          </div>
          <div className="form-group">
            <label className="form-label">Innsats (1-5)</label>
            <div className="energy-grid">{[1,2,3,4,5].map((v) => (<button key={v} type="button" className={`choice-card ${effort===v?"active":""}`} onClick={()=>setEffort(v)}><span>{v}</span></button>))}</div>
          </div>
          <div className="form-group"><label className="form-label">Varighet (minutter)</label><input type="number" className="form-input" value={minutes} min={1} max={180} onChange={(e)=>setMinutes(Number(e.target.value))} /></div>
          <div className="form-group"><label className="form-label">Notater</label><textarea className="form-textarea" value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Hvordan var det?" /></div>
          <div style={{ display: "flex", gap: 10 }}>
            <button type="button" className="btn btn-primary" style={{ flex: 1 }} onClick={handleFinish}>Fullfør</button>
            <button type="button" className="btn btn-secondary" onClick={cancelSession}>Avbryt</button>
          </div>
        </div>
      </div>
    </div><CelebrationModal /></>);
  }

  return (<><TopBar /><div style={{ padding: "8px 18px 32px" }}>
    <h1 style={{ fontSize: "1.8rem", fontFamily: "var(--font-headline)", marginBottom: 6 }}>Bevegelse</h1>
    <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", marginBottom: 18 }}>Velg en form og start i ditt eget tempo.</p>
    <div className="card card--airy" style={{ marginBottom: 14 }}>
      <h2 style={{ fontSize: "1rem", marginBottom: 14 }}>Hva slags bevegelse?</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>{ACTIVITY_TYPES.map((t_) => (<button key={t_} type="button" className={`chip ${type===t_?"active":""}`} onClick={()=>setType(t_)}>{t_}</button>))}</div>
      <div className="form-group" style={{ marginBottom: 14 }}>
        <label className="form-label">Humør før du starter</label>
        <div className="energy-grid">{[1,2,3,4,5].map((v) => (<button key={v} type="button" className={`choice-card ${moodBefore===v?"active":""}`} onClick={()=>setMoodBefore(v)}><span>{v}</span></button>))}</div>
      </div>
      <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginBottom: 16 }}><input type="checkbox" checked={hideMetrics} onChange={(e)=>setHideMetrics(e.target.checked)} /><span style={{ fontSize: "0.9rem", color: "var(--text-soft)" }}>Rolig modus (skjul timer-tall)</span></label>
      <button type="button" className="btn btn-primary btn-large" style={{ width: "100%" }} onClick={handleStart}>Start {type.toLowerCase()}</button>
    </div>
    <div className="card">
      <button type="button" onClick={()=>setShowHistory(!showHistory)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
        <h3 style={{ fontSize: "1rem" }}>Siste økter</h3><span style={{ color: "var(--text-soft)" }}>{showHistory?"▲":"▼"}</span>
      </button>
      {showHistory && (<div style={{ marginTop: 12, display: "grid", gap: 10 }}>
        {sessions.length===0 && <p style={{ color: "var(--text-soft)", fontSize: "0.9rem" }}>Ingen økter ennå.</p>}
        {sessions.map((s) => (<div key={s.id} style={{ padding: "12px 14px", background: "var(--surface-plain)", borderRadius: "var(--radius-sm)", border: "1px solid var(--outline)" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{s.type}</span><span style={{ fontSize: "0.85rem", color: "var(--text-soft)" }}>{s.minutes} min</span></div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-soft)", marginTop: 4 }}>{new Date(s.startedAt).toLocaleDateString("no-NO")} · {s.moodBefore}→{s.moodAfter??"-"} {s.hideMetrics?"· ro":""}</div>
        </div>))}
      </div>)}
    </div>
  </div><CelebrationModal /></>);
}
