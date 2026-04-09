"use client";
import { useState } from "react";
import { useStore } from "@/lib/state";
import TopBar from "@/components/app/TopBar";
import CelebrationModal from "@/components/app/CelebrationModal";
import { CARE_CATEGORIES } from "@/lib/content";

export default function CarePage() {
  const careList = useStore((s) => s.care);
  const addCare = useStore((s) => s.addCare);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<"self"|"others"|"home">("self");
  const [note, setNote] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    addCare(title.trim(), category, note.trim() || undefined);
    setTitle(""); setNote("");
  }

  return (
    <>
      <TopBar />
      <div style={{ padding: "8px 18px 32px" }}>
        <h1 style={{ fontSize: "1.8rem", fontFamily: "var(--font-headline)", marginBottom: 6 }}>Omsorg</h1>
        <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", marginBottom: 18 }}>Det du gjør for deg selv og andre.</p>
        {CARE_CATEGORIES.map((cat) => (
          <div key={cat.id} className="card" style={{ marginBottom: 14 }}>
            <h3 style={{ fontSize: "1rem", marginBottom: 4 }}>{cat.title.no}</h3>
            <p style={{ fontSize: "0.8rem", color: "var(--text-soft)", marginBottom: 12 }}>{cat.hint.no}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {cat.presets.map((p) => (
                <button key={p.no} type="button" className="chip" onClick={() => addCare(p.no, cat.id)}>{p.no}</button>
              ))}
            </div>
          </div>
        ))}
        <form className="card card--airy" onSubmit={handleSubmit}>
          <h3 style={{ fontSize: "1rem", marginBottom: 14 }}>Egendefinert omsorgshandling</h3>
          <div className="form-group" style={{ marginBottom: 12 }}>
            <label className="form-label">Hva gjorde du?</label>
            <input className="form-input" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Beskriv omsorgshandlingen" />
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {(["self","others","home"] as const).map((c) => (<button key={c} type="button" className={`chip ${category===c?"active":""}`} onClick={()=>setCategory(c)}>{CARE_CATEGORIES.find((x)=>x.id===c)?.title.no}</button>))}
          </div>
          <div className="form-group" style={{ marginBottom: 12 }}><label className="form-label">Notat (valgfritt)</label><textarea className="form-textarea" value={note} onChange={(e)=>setNote(e.target.value)} /></div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Loggfør omsorg</button>
        </form>
        <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
          {careList.slice(0,10).map((c) => (
            <div key={c.id} className="card" style={{ padding: "12px 14px" }}>
              <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{c.title}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-soft)", marginTop: 2 }}>{new Date(c.createdAt).toLocaleDateString("no-NO")} · {CARE_CATEGORIES.find((x)=>x.id===c.category)?.title.no}{c.note ? ` · ${c.note}` : ""}</div>
            </div>
          ))}
        </div>
      </div>
      <CelebrationModal />
    </>
  );
}
