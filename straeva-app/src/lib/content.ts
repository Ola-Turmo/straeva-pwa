import type { Program } from "@/types";

export const ACTIVITY_TYPES = [
  "Rolig gåtur", "Puste-strekk", "Hjemmebevegelse", "Dans i stua",
  "Sakte jogg", "Hvile med rytme", "Styrke med kropp",
  "Utetid", "Sykling", "Svømming", "Annet"
];

export const ENERGY_OPTIONS = [
  { value: 1, icon: "1", title: { no: "Tung", en: "Heavy" } },
  { value: 2, icon: "2", title: { no: "Sår", en: "Sore" } },
  { value: 3, icon: "3", title: { no: "Rolig", en: "Calm" } },
  { value: 4, icon: "4", title: { no: "Klar", en: "Ready" } },
  { value: 5, icon: "5", title: { no: "Varm", en: "Warm" } },
];

export const MOOD_OPTIONS = [
  { value: 1, label: { no: "Tung", en: "Heavy" } },
  { value: 2, label: { no: "Skjør", en: "Fragile" } },
  { value: 3, label: { no: "Stille", en: "Quiet" } },
  { value: 4, label: { no: "Lysere", en: "Lighter" } },
  { value: 5, label: { no: "Lett", en: "Light" } },
];

export const WIN_CATEGORIES: Array<{ value: string; label: { no: string; en: string } }> = [
  { value: "oppmøte", label: { no: "Oppmøte", en: "Showing up" } },
  { value: "bevegelse", label: { no: "Bevegelse", en: "Movement" } },
  { value: "myk-start", label: { no: "Myk start", en: "Soft start" } },
  { value: "omsorg", label: { no: "Omsorg", en: "Care" } },
  { value: "hverdag", label: { no: "Hverdag", en: "Everyday" } },
  { value: "ro", label: { no: "Ro", en: "Rest" } },
  { value: "annet", label: { no: "Annet", en: "Other" } },
];

export const CARE_CATEGORIES = [
  {
    id: "self" as const,
    title: { no: "For deg selv", en: "For yourself" },
    hint: { no: "Det som roer kroppen og myker opp dagen.", en: "What calms your body and softens the day." },
    presets: [
      { no: "Spiste noe som nærer", en: "Ate something nourishing" },
      { no: "La meg ned i fem minutter", en: "Put myself down for five minutes" },
      { no: "Ba om hjelp", en: "Asked for help" },
      { no: "Sa nei til noe jeg ikke orket", en: "Said no to something I couldn't handle" },
      { no: "Tok et dypt pust", en: "Took a deep breath" },
      { no: "Gikk ut i frisk luft", en: "Went outside for fresh air" },
      { no: "Drakk et glass vann", en: "Drank a glass of water" },
      { no: "Hvilte uten å føle skyld", en: "Rested without guilt" },
    ],
  },
  {
    id: "others" as const,
    title: { no: "For andre", en: "For others" },
    hint: { no: "Smått og varmt uten at det må bli stort.", en: "Small and warm, without it having to be big." },
    presets: [
      { no: "Sendte en melding", en: "Sent a message" },
      { no: "Tok en telefon", en: "Made a phone call" },
      { no: "Lyttet uten å fikse", en: "Listened without trying to fix" },
      { no: "Ba noen bli med ut", en: "Asked someone to come along" },
      { no: "Ga en kompliment", en: "Gave a compliment" },
      { no: "Hjalp til uten å bli spurt", en: "Helped without being asked" },
    ],
  },
  {
    id: "home" as const,
    title: { no: "For hverdagen", en: "For everyday life" },
    hint: { no: "Lite nok til at det faktisk kan skje i dag.", en: "Small enough that it can actually happen today." },
    presets: [
      { no: "Ryddet ett hjørne", en: "Tidied one corner" },
      { no: "Vannet noe levende", en: "Watered something alive" },
      { no: "Vasket en kopp", en: "Washed a cup" },
      { no: "Skiftet sengetøy", en: "Changed the bedsheets" },
      { no: "Lufter rommet", en: "Air out the room" },
      { no: "Fikk frisk luft", en: "Got some fresh air" },
    ],
  },
];

export const AFFIRMATIONS: Array<{ no: string; en: string }> = [
  { no: "Du trenger ikke vinne dagen for at dagen skal telle.", en: "You don't have to win the day for the day to count." },
  { no: "Å møte opp er også bevegelse.", en: "Showing up is also movement." },
  { no: "Hvile er ikke et avvik. Det er en del av rytmen.", en: "Rest is not an exception. It is part of the rhythm." },
  { no: "Kroppen din fortjener vennlighet, ikke press.", en: "Your body deserves kindness, not pressure." },
  { no: "Smått kan være dypt når det skjer ofte.", en: "Small things can be profound when they happen often." },
  { no: "Du er god nok akkurat som du er i dette øyeblikket.", en: "You are good enough exactly as you are in this moment." },
  { no: "Hvert skritt mot å møte deg selv er en ekte seier.", en: "Every step toward meeting yourself is a real win." },
  { no: "Ingen grunn til å vente på at alt skal være perfekt.", en: "No need to wait for everything to be perfect." },
  { no: "Du bygger noe varig, en dag om gangen.", en: "You are building something lasting, one day at a time." },
  { no: "Det er modig å ta det rolig.", en: "It is brave to take it slow." },
];

export const MICRO_WINS: Array<{ label: string; en: string; category: string }> = [
  { label: "Tok på meg skoene", en: "Put on my shoes", category: "oppmøte" },
  { label: "Gikk til postkassen", en: "Walked to the mailbox", category: "bevegelse" },
  { label: "Tøyde ut i sengen", en: "Stretched in bed", category: "myk-start" },
  { label: "Drakk et glass vann", en: "Drank a glass of water", category: "omsorg" },
  { label: "Luftet rommet", en: "Aired out the room", category: "hverdag" },
  { label: "Tok en pause uten skyld", en: "Took a guilt-free pause", category: "ro" },
  { label: "Gikk en kort tur", en: "Took a short walk", category: "bevegelse" },
  { label: "Strekte meg etter frokost", en: "Stretched after breakfast", category: "myk-start" },
];

// Programs are loaded from JSON files in /content/programs/
// Use this function to get a program by ID
export function getProgramById(id: string): Program | null {
  try {
    // Dynamically import all program JSON files
    // In real usage this would be imported via the content loader
    return null; // placeholder — real implementation loads from /content/programs/*.json
  } catch {
    return null;
  }
}
