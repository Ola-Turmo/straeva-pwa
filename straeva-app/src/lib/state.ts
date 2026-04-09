import { create } from "zustand";
import type { AppState, MovementSession, Win, CareAction, Celebration, DayLog, ProgramEnrollment, UserPreferences } from "@/types";
import { persist, loadState, importData as importPersistedData, resetState as resetPersistedState } from "./local-db";
import { uid, todayKey } from "./utils";
import { computeInsights } from "./insights";
import { updateStreak } from "./streaks";

interface Store extends AppState {
  isLoading: boolean;
  initialized: boolean;
  initialize: () => Promise<void>;
  setRoute: (route: string) => void;
  updateProfile: (partial: Partial<AppState["profile"]>) => void;
  updatePreferences: (partial: Partial<UserPreferences>) => void;
  updateTodayLog: (partial: Partial<DayLog>) => void;
  importState: (json: string) => Promise<boolean>;
  resetAllData: () => Promise<void>;
  startSession: (session: Omit<MovementSession, "id">) => void;
  finishSession: (session: MovementSession, extra?: Partial<MovementSession>) => void;
  cancelSession: () => void;
  addWin: (label: string, category: Win["category"], celebrate?: boolean) => void;
  addCare: (title: string, category: CareAction["category"], note?: string) => void;
  dismissCelebration: () => void;
  shareCelebration: (names: string[]) => void;
  grantGrace: () => void;
  enrollProgram: (programId: string) => void;
  completeProgramDay: (programId: string, day: number) => void;
  recalc: () => void;
  setToast: (msg: string) => void;
}

export const useStore = create<Store>((set, get) => ({
  ...({
    version: 2,
    route: "/app/hjem",
    toast: undefined as string | undefined,
    isLoading: true,
    initialized: false,
    profile: { id: "", name: "venn", supportSquad: [], createdAt: Date.now(), preferences: { theme: "light", hideMetricsByDefault: true, language: "no", remindersEnabled: false, reminderTime: "08:00", weeklySummaryEnabled: true, quietHoursStart: "22:00", quietHoursEnd: "07:00", preferredSessionTypes: [], physicalConstraints: [], graceDaysPerMonth: 3 } },
    dayLog: {},
    movement: { activeSession: null, sessions: [] },
    wins: [],
    care: [],
    celebrations: [],
    programEnrollments: [],
    reflections: [],
    streakData: { currentContinuity: 0, longestContinuity: 0, lastActiveDate: null, graceDaysUsedThisMonth: 0, graceResetsAt: "" },
    insightsCache: null,
  } as AppState & { isLoading: boolean; initialized: boolean }),

  initialize: async () => {
    const state = await loadState();
    const today = todayKey();
    const streak = updateStreak(state);
    const insights = computeInsights({ ...state, streakData: streak });
    set({ ...state, streakData: streak, insightsCache: insights, isLoading: false, initialized: true });
  },

  setRoute: (route) => {
    set((s) => ({ route }));
    persist(get());
  },

  updateProfile: (partial) => {
    set((s) => {
      const next = { ...s, profile: { ...s.profile, ...partial } };
      persist(next);
      return next;
    });
  },

  updatePreferences: (partial) => {
    set((s) => {
      const next = { ...s, profile: { ...s.profile, preferences: { ...s.profile.preferences, ...partial } } };
      persist(next);
      return next;
    });
  },

  updateTodayLog: (partial) => {
    const key = todayKey();
    set((s) => {
      const dayLog = { ...s.dayLog, [key]: { ...(s.dayLog[key] || {}), ...partial } };
      const streak = updateStreak({ ...s, dayLog });
      const insights = computeInsights({ ...s, dayLog, streakData: streak });
      const next = { ...s, dayLog, streakData: streak, insightsCache: insights };
      persist(next);
      return next;
    });
  },

  importState: async (json) => {
    try {
      const imported = await importPersistedData(json);
      const streak = updateStreak(imported);
      const insights = computeInsights({ ...imported, streakData: streak });
      set({ ...imported, streakData: streak, insightsCache: insights, isLoading: false, initialized: true });
      return true;
    } catch {
      return false;
    }
  },

  resetAllData: async () => {
    await resetPersistedState();
    const fresh = await loadState();
    const streak = updateStreak(fresh);
    const insights = computeInsights({ ...fresh, streakData: streak });
    set({ ...fresh, streakData: streak, insightsCache: insights, isLoading: false, initialized: true, toast: "Alle lokale data ble slettet." });
  },

  startSession: (session) => {
    set((s) => {
      const activeSession = { ...session, id: uid("session") };
      const next = { ...s, movement: { ...s.movement, activeSession } };
      persist(next);
      return next;
    });
  },

  finishSession: (session, extra) => {
    const now = Date.now();
    const finished = { ...session, ...extra, endedAt: now, minutes: extra?.minutes ?? Math.max(1, Math.round((now - session.startedAt) / 60000)) };
    set((s) => {
      const sessions = [finished, ...s.movement.sessions].slice(0, 500);
      const key = todayKey();
      const dayLog = { ...s.dayLog, [key]: { ...(s.dayLog[key] || {}), grace: false } };
      const streak = updateStreak({ ...s, dayLog, movement: { ...s.movement, activeSession: null, sessions } });
      const insights = computeInsights({ ...s, dayLog, streakData: streak, movement: { ...s.movement, sessions } });
      const win: Win = { id: uid("win"), label: "Jeg møtte opp for meg selv", category: "bevegelse", createdAt: now };
      const celebration: Celebration = { id: uid("celebration"), title: "Du ga kroppen din et rom i dag", body: session.hideMetrics ? "Du valgte ro fremfor press. Det er en seier." : `Du var i bevegelse i ${finished.minutes} rolige minutter.`, createdAt: now, sharedWith: [] };
      const next = { ...s, movement: { activeSession: null, sessions }, wins: [win, ...s.wins], celebrations: [celebration, ...s.celebrations], dayLog, streakData: streak, insightsCache: insights };
      persist(next);
      return next;
    });
  },

  cancelSession: () => {
    set((s) => {
      const next = { ...s, movement: { ...s.movement, activeSession: null } };
      persist(next);
      return next;
    });
  },

  addWin: (label, category, celebrate = true) => {
    const now = Date.now();
    const win: Win = { id: uid("win"), label, category, createdAt: now };
    set((s) => {
      const wins = [win, ...s.wins];
      const key = todayKey();
      const dayLog = { ...s.dayLog, [key]: { ...(s.dayLog[key] || {}), grace: false } };
      const streak = updateStreak({ ...s, wins, dayLog });
      const insights = computeInsights({ ...s, wins, dayLog, streakData: streak });
      let celebrations = s.celebrations;
      if (celebrate) {
        const celebration: Celebration = { id: uid("celebration"), title: "En liten seier ble registrert", body: `"${label}" ble lagt til blant de varme øyeblikkene dine.`, createdAt: now, sharedWith: [] };
        celebrations = [celebration, ...celebrations];
      }
      const next = { ...s, wins, celebrations, dayLog, streakData: streak, insightsCache: insights };
      persist(next);
      return next;
    });
  },

  addCare: (title, category, note) => {
    const now = Date.now();
    const care: CareAction = { id: uid("care"), title, category, note, createdAt: now };
    set((s) => {
      const careList = [care, ...s.care];
      const key = todayKey();
      const dayLog = { ...s.dayLog, [key]: { ...(s.dayLog[key] || {}), grace: false } };
      const streak = updateStreak({ ...s, care: careList, dayLog });
      const insights = computeInsights({ ...s, care: careList, dayLog, streakData: streak });
      const celebration: Celebration = { id: uid("celebration"), title: "Omsorg teller også som fremdrift", body: `${title} ble lagret som en varm handling i hverdagen din.`, createdAt: now, sharedWith: [] };
      const next = { ...s, care: careList, celebrations: [celebration, ...s.celebrations], dayLog, streakData: streak, insightsCache: insights };
      persist(next);
      return next;
    });
  },

  dismissCelebration: () => {
    set((s) => {
      const [, ...rest] = s.celebrations;
      const next = { ...s, celebrations: rest };
      persist(next);
      return next;
    });
  },

  shareCelebration: (names) => {
    set((s) => {
      if (!s.celebrations[0]) return s;
      const updated = { ...s.celebrations[0], sharedWith: names, sharedAt: Date.now() };
      const celebrations = [updated, ...s.celebrations.slice(1)];
      const next = { ...s, celebrations };
      persist(next);
      return next;
    });
  },

  grantGrace: () => {
    set((s) => {
      const key = todayKey();
      const entry = { ...(s.dayLog[key] || {}), grace: true };
      const graceDaysUsedThisMonth = s.streakData.graceDaysUsedThisMonth + 1;
      const dayLog = { ...s.dayLog, [key]: entry };
      const streak = updateStreak({ ...s, dayLog, streakData: { ...s.streakData, graceDaysUsedThisMonth } });
      const toast = "Naadedag registrert. Hvile teller.";
      const next = { ...s, dayLog, streakData: streak, toast };
      persist(next);
      return next;
    });
    setTimeout(() => {
      set((s) => s.toast ? { toast: undefined } : {});
    }, 3000);
  },

  enrollProgram: (programId) => {
    set((s) => {
      const existing = s.programEnrollments.find((e) => e.programId === programId);
      if (existing) return s;
      const enrollment: ProgramEnrollment = { id: uid("enrollment"), programId, startedAt: Date.now(), currentDay: 1, completedDays: [] };
      const next = { ...s, programEnrollments: [...s.programEnrollments, enrollment] };
      persist(next);
      return next;
    });
  },

  completeProgramDay: (programId, day) => {
    set((s) => {
      const enrollments = s.programEnrollments.map((e) =>
        e.programId === programId && !e.completedDays.includes(day)
          ? { ...e, currentDay: Math.min(e.currentDay + 1, day + 1), completedDays: [...e.completedDays, day] }
          : e
      );
      const next = { ...s, programEnrollments: enrollments };
      persist(next);
      return next;
    });
  },

  recalc: () => {
    const s = get();
    const streak = updateStreak(s);
    const insights = computeInsights({ ...s, streakData: streak });
    set({ streakData: streak, insightsCache: insights });
  },

  setToast: (msg: string) => {
    set({ toast: msg });
    setTimeout(() => {
      const current = get().toast;
      if (current === msg) set({ toast: undefined });
    }, 3000);
  },
}));