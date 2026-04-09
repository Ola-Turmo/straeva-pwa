import Dexie, { type Table } from "dexie";
import type {
  UserProfile, DayLog, MovementSession, Win, CareAction,
  Celebration, ProgramEnrollment, WeeklyReflection, StreakData,
  InsightsCache, AppState
} from "@/types";

const STORAGE_KEY = "straeva-v2";

const DEFAULT_STATE: AppState = {
  version: 2,
  route: "/app/hjem",
  toast: undefined as string | undefined,
  profile: {
    id: "",
    name: "venn",
    supportSquad: ["Ida", "Marius", "Siri"],
    createdAt: Date.now(),
    preferences: {
      theme: "light",
      hideMetricsByDefault: true,
      language: "no",
      remindersEnabled: false,
      reminderTime: "08:00",
      weeklySummaryEnabled: true,
      quietHoursStart: "22:00",
      quietHoursEnd: "07:00",
      preferredSessionTypes: [],
      physicalConstraints: [],
      graceDaysPerMonth: 3,
    },
  },
  dayLog: {},
  movement: { activeSession: null, sessions: [] },
  wins: [],
  care: [],
  celebrations: [],
  programEnrollments: [],
  reflections: [],
  streakData: {
    currentContinuity: 0,
    longestContinuity: 0,
    lastActiveDate: null,
    graceDaysUsedThisMonth: 0,
    graceResetsAt: "",
  },
  insightsCache: null,
};

export class StravaDB extends Dexie {
  state!: Table<{ key: string; value: unknown }>;
  constructor() {
    super("StravaDB");
    this.version(1).stores({ state: "key" });
  }
}

const db = new StravaDB();

export async function loadState(): Promise<AppState> {
  try {
    const raw = await db.state.get(STORAGE_KEY);
    if (!raw) {
      const s = { ...DEFAULT_STATE };
      s.profile.id = crypto.randomUUID();
      const now = new Date();
      const y = now.getFullYear();
      const m = now.getMonth() + 1;
      s.streakData.graceResetsAt = y + "-" + String(m === 12 ? 1 : m + 1).padStart(2, "0") + "-01";
      return s;
    }
    const parsed = raw.value as Partial<AppState>;
    return {
      ...DEFAULT_STATE,
      ...parsed,
      profile: { ...DEFAULT_STATE.profile, ...(parsed.profile || {}) },
      streakData: { ...DEFAULT_STATE.streakData, ...(parsed.streakData || {}) },
      movement: {
        activeSession: parsed.movement?.activeSession ?? null,
        sessions: Array.isArray(parsed.movement?.sessions) ? parsed.movement.sessions : [],
      },
      wins: Array.isArray(parsed.wins) ? parsed.wins : [],
      care: Array.isArray(parsed.care) ? parsed.care : [],
      celebrations: Array.isArray(parsed.celebrations) ? parsed.celebrations : [],
      dayLog: parsed.dayLog || {},
    };
  } catch {
    return { ...DEFAULT_STATE, profile: { ...DEFAULT_STATE.profile, id: crypto.randomUUID() } };
  }
}

export async function persist(state: AppState): Promise<void> {
  await db.state.put({ key: STORAGE_KEY, value: state });
}

export async function exportData(state: AppState): Promise<string> {
  return JSON.stringify(state, null, 2);
}

export async function importData(json: string): Promise<AppState> {
  const parsed = JSON.parse(json) as Partial<AppState>;
  const state = await loadState();
  const merged = {
    ...state,
    ...parsed,
    profile: { ...state.profile, ...(parsed.profile || {}) },
    movement: {
      activeSession: parsed.movement?.activeSession ?? state.movement.activeSession,
      sessions: Array.isArray(parsed.movement?.sessions) ? parsed.movement.sessions : state.movement.sessions,
    },
    wins: Array.isArray(parsed.wins) ? parsed.wins : state.wins,
    care: Array.isArray(parsed.care) ? parsed.care : state.care,
    celebrations: Array.isArray(parsed.celebrations) ? parsed.celebrations : state.celebrations,
    dayLog: parsed.dayLog || state.dayLog,
  };
  await persist(merged);
  return merged;
}

export async function resetState(): Promise<void> {
  await db.delete();
}
