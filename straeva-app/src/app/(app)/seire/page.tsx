"use client";
import { useState } from "react";
import { useStore } from "@/lib/state";
import TopBar from "@/components/app/TopBar";
import CelebrationModal from "@/components/app/CelebrationModal";
import { WIN_CATEGORIES } from "@/lib/content";

export default function WinsPage() {
  const wins = useStore((s) => s.wins);
  const addWin = useStore((s) => s.addWin);
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState<string>("omsorg");
  const [filter, setFilter] = useState<string | null>(null);
  const filtered = filter ? wins.filter((w) => w.category === filter) : wins;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!label.trim()) return;
    addWin(label.trim(), category as Parameters<typeof addWin>[1]);
    setLabel("");
  }

  return (
    <>
      <TopBar />
      <div style={{ padding: "8px 18px 32px" }}>
        <h1 style={{ fontSize: "1.8rem", fontFamily: "var(--font-headline)", marginBottom: 6 }}>Dine seire</h1>
        <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", marginBottom: 18 }}>Alt som teller, loggført her.</p>
        <form className="card card--airy" style={{ marginBottom: 14 }} onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Hva var seieren?</label>
            <input className="form-input" value={label} onChange={(e)=>setLabel(e.target.value)} placeholder="F.eks. Tok på meg skoene" />
          </div>
          <div className="form-group">
            <label className="form-label">Kategori</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{WIN_CATEGORIES.map((c) => (<button key={c.value} type="button" className={`chip ${category===c.value?"active":""}`} onClick={()=>setCategory(c.value)}>{c.label.no}</button>))}</div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 4 }}>Loggfør seier</button>
        </form>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
          <button type="button" className={`chip ${filter===null?"active":""}`} onClick={()=>setFilter(null)}>Alle</button>
          {WIN_CATEGORIES.map((c) => (<button key={c.value} type="button" className={`chip ${filter===c.value?"active":""}`} onClick={()=>setFilter(c.value)}>{c.label.no}</button>))}
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          {filtered.length===0 && <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", textAlign: "center", padding: 20 }}>Ingen seire ennå. Prøv en av chipsene på hjem-skjermen!</p>}
          {filtered.map((w) => (
            <div key={w.id} className="card" style={{ padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{w.label}</span>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-soft)", marginTop: 2 }}>{new Date(w.createdAt).toLocaleDateString("no-NO")} · {WIN_CATEGORIES.find((c)=>c.value===w.category)?.label.no}</div>
                </div>
                <span style={{ fontSize: "1.2rem" }}>🏆</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CelebrationModal />
    </>
  );
}
