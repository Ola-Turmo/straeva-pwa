import type { AppState, StreakData } from "@/types";
import { todayKey } from "./utils";

export function updateStreak(state: AppState): StreakData {
  const today = todayKey();
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const nextMonth = `${now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear()}-${String((now.getMonth() + 2) % 12 + 1).padStart(2, "0")}-01`;

  let { currentContinuity, longestContinuity, lastActiveDate, graceDaysUsedThisMonth, graceResetsAt } = state.streakData;

  // Reset grace days monthly
  const graceResetKey = currentMonth + "-01";
  if (graceResetsAt !== graceResetKey) {
    graceDaysUsedThisMonth = 0;
    graceResetsAt = graceResetKey;
  }

  // Check if today has activity
  const hasActivity = (state.dayLog[today]?.grace) ||
    state.movement.sessions.some((s) => {
      const d = `${s.startedAt}`.slice(0, 10);
      return d === today;
    }) ||
    state.wins.some((w) => `${w.createdAt}`.slice(0, 10) === today) ||
    state.care.some((c) => `${c.createdAt}`.slice(0, 10) === today);

  if (!hasActivity) return state.streakData;

  // Update continuity
  if (lastActiveDate === null) {
    currentContinuity = 1;
    longestContinuity = Math.max(longestContinuity, 1);
  } else if (lastActiveDate === today) {
    // already counted today, no change
  } else {
    const ms = new Date(today).getTime() - new Date(lastActiveDate).getTime();
    const days = Math.round(ms / 86400000);
    if (days === 1) {
      currentContinuity += 1;
    } else if (days > 1) {
      currentContinuity = 1;
    }
  }

  longestContinuity = Math.max(longestContinuity, currentContinuity);

  return {
    currentContinuity,
    longestContinuity,
    lastActiveDate: today,
    graceDaysUsedThisMonth,
    graceResetsAt,
  };
}

export function monthGraceCount(state: AppState): number {
  const now = new Date();
  const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
  return Object.entries(state.dayLog)
    .filter(([k, v]) => k >= monthStart && v.grace)
    .length;
}
