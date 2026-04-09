import type { AppState, InsightsCache, BestConditions } from "@/types";

function sessionsThisWeek(state: AppState): typeof state.movement.sessions {
  const cutoff = Date.now() - 7 * 86400000;
  return state.movement.sessions.filter((s) => s.startedAt >= cutoff);
}

function sessionsThisMonth(state: AppState): typeof state.movement.sessions {
  const d = new Date();
  const start = new Date(d.getFullYear(), d.getMonth(), 1).getTime();
  return state.movement.sessions.filter((s) => s.startedAt >= start);
}

function careThisWeekCount(state: AppState): number {
  const cutoff = Date.now() - 7 * 86400000;
  return state.care.filter((c) => c.createdAt >= cutoff).length;
}

function moodDelta(sessions: AppState["movement"]["sessions"]): number {
  const withBoth = sessions.filter((s) => s.moodBefore && s.moodAfter);
  if (!withBoth.length) return 0;
  const sum = withBoth.reduce((acc, s) => acc + ((s.moodAfter ?? 0) - (s.moodBefore ?? 0)), 0);
  return Math.round(sum / withBoth.length * 10) / 10;
}

function bestConditions(sessions: AppState["movement"]["sessions"]): BestConditions {
  const byType: Record<string, number> = {};
  const byDay: Record<number, number> = {};
  sessions.slice(0, 50).forEach((s) => {
    byType[s.type] = (byType[s.type] || 0) + 1;
    byDay[new Date(s.startedAt).getDay()] = (byDay[new Date(s.startedAt).getDay()] || 0) + 1;
  });
  const topType = Object.entries(byType).sort((a, b) => b[1] - a[1])[0]?.[0];
  const topDay = Object.entries(byDay).sort((a, b) => b[1] - a[1])[0]?.[0];
  return {
    sessionType: topType,
    dayOfWeek: topDay ? Number(topDay) : undefined,
  };
}

function momentumTrend(state: AppState): "up" | "stable" | "down" {
  const all = state.movement.sessions;
  if (all.length < 4) return "stable";
  const recent = all.slice(0, 3).length;
  const older = all.slice(3, 6).length;
  if (recent > older * 1.3) return "up";
  if (recent < older * 0.7) return "down";
  return "stable";
}

export function computeInsights(state: AppState): InsightsCache {
  const week = sessionsThisWeek(state);
  const month = sessionsThisMonth(state);
  const weeklyMinutes = week.reduce((s, x) => s + x.minutes, 0);
  const monthlyMinutes = month.reduce((s, x) => s + x.minutes, 0);
  const careScore = Math.min(100, careThisWeekCount(state) * 15);
  const streak = state.streakData.currentContinuity;
  const consistencyScore = streak >= 30 ? 100 : Math.round(streak * 3.3);
  const recoveryBalance = moodDelta(month);
  return {
    computedAt: Date.now(),
    weeklyMinutes,
    monthlyMinutes,
    consistencyScore,
    careScore,
    recoveryBalance,
    bestConditions: bestConditions(state.movement.sessions),
    topActivities: week.reduce((acc, s) => { acc[s.type] = (acc[s.type] || 0) + s.minutes; return acc; }, {} as Record<string, number>),
    momentumTrend: momentumTrend(state),
  };
}
