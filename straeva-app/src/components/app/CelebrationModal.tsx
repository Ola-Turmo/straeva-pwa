"use client";
import { useStore } from "@/lib/state";

export default function CelebrationModal() {
  const celebration = useStore((s) => s.celebrations[0]);
  const dismiss = useStore((s) => s.dismissCelebration);
  const share = useStore((s) => s.shareCelebration);
  const profile = useStore((s) => s.profile);

  if (!celebration) return null;

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}>
      <div className="modal">
        <div style={{ fontSize: "3rem", marginBottom: 16, textAlign: "center" }}>🎉</div>
        <div className="modal-title">{celebration.title}</div>
        <p className="modal-body">{celebration.body}</p>
        {profile.supportSquad.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: "0.85rem", color: "var(--text-soft)", marginBottom: 8 }}>Dele med:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {profile.supportSquad.map((name) => (
                <button
                  key={name}
                  type="button"
                  className="chip"
                  onClick={() => {
                    const current = celebration.sharedWith || [];
                    share(current.includes(name) ? current.filter((n) => n !== name) : [...current, name]);
                  }}
                >
                  {name} {celebration.sharedWith?.includes(name) ? "✓" : ""}
                </button>
              ))}
            </div>
          </div>
        )}
        <button type="button" className="btn btn-primary" style={{ width: "100%" }} onClick={dismiss}>
          Lukk
        </button>
      </div>
    </div>
  );
}
