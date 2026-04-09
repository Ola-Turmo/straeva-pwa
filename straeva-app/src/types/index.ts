export interface UserProfile {
  id: string;
  name: string;
  supportSquad: string[];
  createdAt: number;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  hideMetricsByDefault: boolean;
  language: "no" | "en";
  remindersEnabled: boolean;
  reminderTime: string;
  weeklySummaryEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
  preferredSessionTypes: string[];
  physicalConstraints: string[];
  goal?: "gentle" | "recovery" | "routine" | "less_pressure";
  graceDaysPerMonth: number;
}

export interface DayLog {
  date: string;
  energy?: number;
  mood?: number;
  grace?: boolean;
  graceUsedThisMonth?: number;
  notes?: string;
  intention?: string;
  highlight?: string;
  challenge?: string;
  supportNeed?: string;
}

export interface MovementSession {
  id: string;
  type: string;
  intention?: string;
  moodBefore: number;
  moodAfter?: number;
  effort?: number;
  minutes: number;
  hideMetrics: boolean;
  startedAt: number;
  endedAt?: number;
  notes?: string;
  tags?: string[];
}

export interface Win {
  id: string;
  label: string;
  category: "oppmøte" | "bevegelse" | "myk-start" | "omsorg" | "hverdag" | "ro" | "annet";
  createdAt: number;
  sharedWith?: string[];
  sharedAt?: number;
}

export interface CareAction {
  id: string;
  title: string;
  category: "self" | "others" | "home";
  note?: string;
  createdAt: number;
}

export interface Celebration {
  id: string;
  title: string;
  body: string;
  createdAt: number;
  sharedWith: string[];
  sharedAt?: number;
}

export interface ProgramEnrollment {
  id: string;
  programId: string;
  startedAt: number;
  currentDay: number;
  completedDays: number[];
  droppedAt?: number;
}

export interface WeeklyReflection {
  id: string;
  weekStart: string;
  answeredAt: number;
  responses: Record<string, string | number>;
}

export interface ReflectionPrompt {
  id: string;
  prompt: { no: string; en: string };
  placeholder: { no: string; en: string };
}

export interface StreakData {
  currentContinuity: number;
  longestContinuity: number;
  lastActiveDate: string | null;
  graceDaysUsedThisMonth: number;
  graceResetsAt: string;
}

export interface InsightsCache {
  computedAt: number;
  weeklyMinutes: number;
  monthlyMinutes: number;
  consistencyScore: number;
  careScore: number;
  recoveryBalance: number;
  bestConditions: BestConditions;
  topActivities: Record<string, number>;
  momentumTrend: "up" | "stable" | "down";
}

export interface BestConditions {
  energyBand?: number;
  timeOfDay?: string;
  sessionType?: string;
  dayOfWeek?: number;
}

export interface AppState {
  version: number;
  route: string;  toast?: string;
  profile: UserProfile;
  dayLog: Record<string, DayLog>;
  movement: {
    activeSession: MovementSession | null;
    sessions: MovementSession[];
  };
  wins: Win[];
  care: CareAction[];
  celebrations: Celebration[];
  programEnrollments: ProgramEnrollment[];
  reflections: WeeklyReflection[];
  streakData: StreakData;
  insightsCache: InsightsCache | null;
}

export interface RecommendedAction {
  type: "micro" | "momentum" | "movement" | "care" | "grace" | "celebrate";
  label: string;
  reason: string;
  icon: string;
  cta: string;
}

export interface Program {
  id: string;
  slug: string;
  title: { no: string; en: string };
  description: { no: string; en: string };
  targetAudience: { no: string; en: string };
  duration: string;
  graceAllowed: boolean;
  days: ProgramDay[];
}

export interface ProgramDay {
  day: number;
  title: { no: string; en: string };
  description: { no: string; en: string };
  suggestedSessionType?: string;
  suggestedMinutes: number;
  carePrompt?: { no: string; en: string };
  reflectionQuestion?: { no: string; en: string };
  graceAllowed: boolean;
}
