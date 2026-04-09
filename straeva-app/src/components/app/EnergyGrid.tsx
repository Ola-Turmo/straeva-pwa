"use client";
import { useStore } from "@/lib/state";
import { todayKey } from "@/lib/utils";
import { tl as t } from "@/lib/i18n";

const ENERGY_KEYS = [1, 2, 3, 4, 5] as const;

export default function EnergyGrid() {
  const updateTodayLog = useStore((s) => s.updateTodayLog);
  const lang = useStore((s) => s.profile.preferences.language);
  const today = useStore((s) => s.dayLog[todayKey()] || {});
  const current = today.energy ?? 3;
  const T = t(lang);

  return (
    <div className="energy-grid">
      {ENERGY_KEYS.map((v) => {
        const energyLabel = T.energy[v as keyof typeof T.energy] ?? String(v);
        return (
          <button
            key={v}
            className={`choice-card ${current === v ? "active" : ""}`}
            onClick={() => updateTodayLog({ energy: v })}
            type="button"
            aria-label={energyLabel}
          >
            <span>{v}</span>
            <strong style={{ fontSize: "0.7rem", fontWeight: 600 }}>{energyLabel}</strong>
          </button>
        );
      })}
    </div>
  );
}
