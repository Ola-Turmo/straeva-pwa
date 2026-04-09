import type { AppState, RecommendedAction } from "@/types";
import { todayKey } from "./utils";

const SESSION_TYPES_BY_ENERGY: Record<number, string> = {
  1: "Hvile med pust",
  2: "Rolig gåtur",
  3: "Hjemmebevegelse",
  4: "Sakte jogg",
  5: "Dans i stua",
};

const MICRO_OPTIONS_ENERGY_1 = ["Drikk et glass vann", "Ta tre dype pust", "Strekk armene over hodet", "Lukk øynene i ett minutt"];
const MICRO_OPTIONS_ENERGY_2 = ["Rist ut kroppen i 2 min", "Gå til vinduet og luft", "Smil til deg selv", "Sett deg ned og strekk bena"];

function getMicroOption(energy: number): string {
  const opts = energy <= 1 ? MICRO_OPTIONS_ENERGY_1 : MICRO_OPTIONS_ENERGY_2;
  return opts[Math.floor(Math.random() * opts.length)];
}

function hasLoggedMovementToday(state: AppState): boolean {
  const key = todayKey();
  return state.movement.sessions.some((s) => {
    const d = new Date(s.startedAt);
    const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    return k === key;
  });
}

function getLastGraceDay(dayLog: Record<string, { grace?: boolean }>): string | null {
  const entries = Object.entries(dayLog)
    .filter(([, v]) => v.grace)
    .sort((a, b) => b[0].localeCompare(a[0]));
  return entries[0]?.[0] ?? null;
}

function daysSinceGrace(dayLog: Record<string, { grace?: boolean }>): number {
  const last = getLastGraceDay(dayLog);
  if (!last) return 999;
  const ms = new Date(todayKey()).getTime() - new Date(last).getTime();
  return Math.round(ms / 86400000);
}

function careThisWeekCount(state: AppState): number {
  const cutoff = Date.now() - 7 * 86400000;
  return state.care.filter((c) => c.createdAt >= cutoff).length;
}

export function getRecommendation(state: AppState): RecommendedAction {
  const today = state.dayLog[todayKey()] || {};
  const energy = today.energy ?? 3;
  const streak = state.streakData.currentContinuity;
  const recentSessions = state.movement.sessions.slice(0, 7);
  const careThisWeek = careThisWeekCount(state);
  const daysSinceG = daysSinceGrace(state.dayLog);

  if (energy <= 2) {
    return {
      type: "micro",
      label: getMicroOption(energy),
      reason: "Din energi er lav. Et minutt med omsorg teller.",
      icon: "heart",
      cta: "Logg en liten seier",
    };
  }

  if (streak < 3) {
    return {
      type: "momentum",
      label: "Kom i gang igjen med én liten handling",
      reason: "Hvert skritt gjenoppretter rytmen din.",
      icon: "play",
      cta: "Start en rolig økt",
    };
  }

  if (!hasLoggedMovementToday(state)) {
    const sessionType = SESSION_TYPES_BY_ENERGY[energy] ?? "Rolig gåtur";
    const reasons: Record<number, string> = {
      3: "En rolig bevegelse passer godt i dag.",
      4: "Du har god energi — en kort økt kan gi mye.",
      5: "Flott energi! Noe litt mer aktivt kan være godt for kroppen.",
    };
    return {
      type: "movement",
      label: sessionType,
      reason: reasons[energy] ?? "En bevegelse passer i dag.",
      icon: "person-simple-walk",
      cta: `Start ${sessionType.toLowerCase()}`,
    };
  }

  if (careThisWeek < 3) {
    return {
      type: "care",
      label: "En omsorgshandling i dag?",
      reason: "Omsorg for deg selv er også fremgang.",
      icon: "heart",
      cta: "Logg omsorg",
    };
  }

  if (streak >= 7 && daysSinceG > 14) {
    return {
      type: "grace",
      label: "Du har fortjent en hviledag når som helst",
      reason: "Ingen grunn til å vente på perfekte forhold.",
      icon: "moon",
      cta: "Ta en nådedag",
    };
  }

  return {
    type: "celebrate",
    label: "Du er på vei",
    reason: `Du har ${streak} dager med kontinuitet. Det er ekte fremgang.`,
    icon: "star",
    cta: "Seire i dag",
  };
}
