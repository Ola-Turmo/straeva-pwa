import type { ReflectionPrompt } from "@/types";

export const REFLECTION_PROMPTS: ReflectionPrompt[] = [
  {
    id: "intention",
    prompt: { no: "Hva ga deg mest ro eller retning denne uken?", en: "What gave you the most calm or direction this week?" },
    placeholder: { no: "For eksempel: en kort tur, en pause, noen som heiet på deg.", en: "For example: a short walk, a pause, someone cheering you on." },
  },
  {
    id: "highlight",
    prompt: { no: "Hvilket lite øyeblikk vil du ta med deg videre?", en: "Which small moment do you want to carry forward?" },
    placeholder: { no: "Beskriv en liten seier eller en varm hendelse.", en: "Describe a small win or a warm moment." },
  },
  {
    id: "challenge",
    prompt: { no: "Hva kjentes tungt, og hva lærte du om behovene dine?", en: "What felt heavy, and what did you learn about your needs?" },
    placeholder: { no: "Skriv noen ord om det som krevde ekstra omsorg.", en: "Write a few words about what required extra care." },
  },
  {
    id: "supportNeed",
    prompt: { no: "Hva vil hjelpe deg neste uke?", en: "What would help you next week?" },
    placeholder: { no: "Eksempel: mer hvile, kortere økter, spørre noen om hjelp.", en: "Example: more rest, shorter sessions, asking someone for help." },
  },
];
