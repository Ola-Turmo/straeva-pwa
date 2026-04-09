export interface ProgramDay {
  day: number;
  title_no: string;
  desc_no: string;
  suggestedType: string;
  suggestedMinutes: number;
  carePrompt_no: string;
  reflection_no: string;
  graceAllowed: boolean;
}

export interface ProgramMeta {
  id: string; slug: string; title_no: string; desc_no: string; duration: string; icon: string;
  days: ProgramDay[];
}

export const PROGRAMS_INDEX: ProgramMeta[] = [
  {
    "id": "14-dager-momentum",
    "slug": "14-dager-momentum",
    "title_no": "14 dager med rolig momentum",
    "desc_no": "Ett 14-dagers program for aa bygge en vedvarende bevegelsesrutine uten press. Hver dag er kort, overkommelig og skaansom.",
    "duration": "14 dager",
    "icon": "1f33f",
    "days": [
      {
        "day": 1,
        "title_no": "Dag 1: Kom i gang",
        "desc_no": "Dag 1. En rolig start er alt som trengs.",
        "suggestedType": "Hjemmebevegelse",
        "suggestedMinutes": 6,
        "carePrompt_no": "Noe du har gjort for deg selv i dag - selv om det er lite?",
        "reflection_no": "Hvordan kjentes det aa mte opp pa dag 1?",
        "graceAllowed": true
      },
      {
        "day": 2,
        "title_no": "Dag 2: Kom i gang",
        "desc_no": "Dag 2. En rolig start er alt som trengs.",
        "suggestedType": "Puste-strekk",
        "suggestedMinutes": 7,
        "carePrompt_no": "Noe du har gjort for deg selv i dag - selv om det er lite?",
        "reflection_no": "Hvordan kjentes det aa mte opp pa dag 2?",
        "graceAllowed": true
      },
      {
        "day": 3,
        "title_no": "Dag 3: Kom i gang",
        "desc_no": "Dag 3. En rolig start er alt som trengs.",
        "suggestedType": "Dans i stua",
        "suggestedMinutes": 8,
        "carePrompt_no": "Noe du har gjort for deg selv i dag - selv om det er lite?",
        "reflection_no": "Hvordan kjentes det aa mte opp pa dag 3?",
        "graceAllowed": true
      },
      {
        "day": 4,
        "title_no": "Dag 4: Hold momentum",
        "desc_no": "Dag 4. Du har kommet i gang - hold det gaaende.",
        "suggestedType": "Rolig gatur",
        "suggestedMinutes": 9,
        "carePrompt_no": "Noe du har gjort for deg selv i dag - selv om det er lite?",
        "reflection_no": "Hvordan kjentes det aa mte opp pa dag 4?",
        "graceAllowed": true
      },
      {
        "day": 5,
        "title_no": "Dag 5: Hold momentum",
        "desc_no": "Dag 5. Du har kommet i gang - hold det gaaende.",
        "suggestedType": "Hjemmebevegelse",
        "suggestedMinutes": 10,
        "carePrompt_no": "Noe du har gjort for deg selv i dag - selv om det er lite?",
        "reflection_no": "Hvordan kjentes det aa mte opp pa dag 5?",
        "graceAllowed": true
      },
      {
        "day": 6,
        "title_no": "Dag 6: Hold momentum",
        "desc_no": "Dag 6. Du har kommet i gang - hold det gaaende.",
        "suggestedType": "Puste-strekk",
        "suggestedMinutes": 11,
        "carePrompt_no": "Noe du har gjort for deg selv i dag - selv om det er lite?",
        "reflection_no": "Hvordan kjentes det aa mte opp pa dag 6?",
        "graceAllowed": true
      },
      {
        "day": 7,
        "title_no": "Dag 7: Hold momentum",
        "desc_no": "Dag 7. Du har kommet i gang - hold det gaaende.",
        "suggestedType": "Dans i stua",
        "suggestedMinutes": 12,
        "carePrompt_no": "Noe du har gjort for deg selv i dag - selv om det er lite?",
        "reflection_no": "Hvordan kjentes det aa mte opp pa dag 7?",
        "graceAllowed": true
      },
      {
        "day": 8,
        "title_no": "Dag 8: Bygg sterke",
        "desc_no": "Dag 8. Kroppen tilpasser seg. Fortsett.",
        "suggestedType": "Rolig gatur",
        "suggestedMinutes": 13,
        "carePrompt_no": "Noe du har gjort for deg selv i dag - selv om det er lite?",
        "reflection_no": "Hvordan kjentes det aa mte opp pa dag 8?",
        "graceAllowed": true
      },
      {
        "day": 9,
        "title_no": "Dag 9: Bygg sterke",
        "desc_no": "Dag 9. Kroppen tilpasser seg. Fortsett.",
        "suggestedType": "Hjemmebevegelse",
        "suggestedMinutes": 14,
        "carePrompt_no": "Noe du har gjort for deg selv i dag - selv om det er lite?",
        "reflection_no": "Hvordan kjentes det aa mte opp pa dag 9?",
        "graceAllowed": true
      },
      {
        "day": 10,
        "title_no": "Dag 10: Bygg sterke",
        "desc_no": "Dag 10. Kroppen tilpasser seg. Fortsett.",
        "suggestedType": "Puste-strekk",
        "suggestedMinutes": 15,
        "carePrompt_no": "Noe du har gjort for deg selv i dag - selv om det er lite?",
        "reflection_no": "Hvordan kjentes det aa mte opp pa dag 10?",
        "graceAllowed": true
      },
      {
        "day": 11,
        "title_no": "Dag 11: Bygg sterke",
        "desc_no": "Dag 11. Kroppen tilpasser seg. Fortsett.",
        "suggestedType": "Dans i stua",
        "suggestedMinutes": 15,
        "carePrompt_no": "Noe du har gjort for deg selv i dag - selv om det er lite?",
        "reflection_no": "Hvordan kjentes det aa mte opp pa dag 11?",
        "graceAllowed": true
      },
      {
        "day": 12,
        "title_no": "Dag 12: Feir fremgang",
        "desc_no": "Dag 12. Du har bygd en vane. Nyt det.",
        "suggestedType": "Rolig gatur",
        "suggestedMinutes": 15,
        "carePrompt_no": "Noe du har gjort for deg selv i dag - selv om det er lite?",
        "reflection_no": "Hvordan kjentes det aa mte opp pa dag 12?",
        "graceAllowed": true
      },
      {
        "day": 13,
        "title_no": "Dag 13: Feir fremgang",
        "desc_no": "Dag 13. Du har bygd en vane. Nyt det.",
        "suggestedType": "Hjemmebevegelse",
        "suggestedMinutes": 15,
        "carePrompt_no": "Noe du har gjort for deg selv i dag - selv om det er lite?",
        "reflection_no": "Hvordan kjentes det aa mte opp pa dag 13?",
        "graceAllowed": true
      },
      {
        "day": 14,
        "title_no": "Dag 14: Feir fremgang",
        "desc_no": "Dag 14. Du har bygd en vane. Nyt det.",
        "suggestedType": "Puste-strekk",
        "suggestedMinutes": 15,
        "carePrompt_no": "Noe du har gjort for deg selv i dag - selv om det er lite?",
        "reflection_no": "Hvordan kjentes det aa mte opp pa dag 14?",
        "graceAllowed": true
      }
    ]
  },
  {
    "id": "bedring-etter-utbrenthet",
    "slug": "bedring-etter-utbrenthet",
    "title_no": "Bedring etter utbrenthet",
    "desc_no": "Ett 21-dagers program for de i bedring etter utbrenthet. Meget lav terskel.",
    "duration": "21 dager",
    "icon": "1f4da",
    "days": [
      {
        "day": 1,
        "title_no": "Dag 1: En liten start",
        "desc_no": "Dag 1 av 21. Fase 1: Omstart. Kroppen trenger ro og omsorg.",
        "suggestedType": "Hjemmebevegelse",
        "suggestedMinutes": 2,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      },
      {
        "day": 2,
        "title_no": "Dag 2: En liten start",
        "desc_no": "Dag 2 av 21. Fase 1: Omstart. Kroppen trenger ro og omsorg.",
        "suggestedType": "Hvile med pust",
        "suggestedMinutes": 2,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      },
      {
        "day": 3,
        "title_no": "Dag 3: En liten start",
        "desc_no": "Dag 3 av 21. Fase 1: Omstart. Kroppen trenger ro og omsorg.",
        "suggestedType": "Rolig gatur",
        "suggestedMinutes": 3,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      },
      {
        "day": 4,
        "title_no": "Dag 4: En liten start",
        "desc_no": "Dag 4 av 21. Fase 1: Omstart. Kroppen trenger ro og omsorg.",
        "suggestedType": "Hjemmebevegelse",
        "suggestedMinutes": 3,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      },
      {
        "day": 5,
        "title_no": "Dag 5: En liten start",
        "desc_no": "Dag 5 av 21. Fase 1: Omstart. Kroppen trenger ro og omsorg.",
        "suggestedType": "Hvile med pust",
        "suggestedMinutes": 3,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      },
      {
        "day": 6,
        "title_no": "Dag 6: En liten start",
        "desc_no": "Dag 6 av 21. Fase 1: Omstart. Kroppen trenger ro og omsorg.",
        "suggestedType": "Rolig gatur",
        "suggestedMinutes": 4,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      },
      {
        "day": 7,
        "title_no": "Dag 7: En liten start",
        "desc_no": "Dag 7 av 21. Fase 1: Omstart. Kroppen trenger ro og omsorg.",
        "suggestedType": "Hjemmebevegelse",
        "suggestedMinutes": 4,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      },
      {
        "day": 8,
        "title_no": "Dag 8: Sakte fremover",
        "desc_no": "Dag 8 av 21. Fase 2: Bygg. Sakte, varig fremgang.",
        "suggestedType": "Hvile med pust",
        "suggestedMinutes": 4,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      },
      {
        "day": 9,
        "title_no": "Dag 9: Sakte fremover",
        "desc_no": "Dag 9 av 21. Fase 2: Bygg. Sakte, varig fremgang.",
        "suggestedType": "Rolig gatur",
        "suggestedMinutes": 5,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      },
      {
        "day": 10,
        "title_no": "Dag 10: Sakte fremover",
        "desc_no": "Dag 10 av 21. Fase 2: Bygg. Sakte, varig fremgang.",
        "suggestedType": "Hjemmebevegelse",
        "suggestedMinutes": 5,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      },
      {
        "day": 11,
        "title_no": "Dag 11: Sakte fremover",
        "desc_no": "Dag 11 av 21. Fase 2: Bygg. Sakte, varig fremgang.",
        "suggestedType": "Hvile med pust",
        "suggestedMinutes": 5,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      },
      {
        "day": 12,
        "title_no": "Dag 12: Sakte fremover",
        "desc_no": "Dag 12 av 21. Fase 2: Bygg. Sakte, varig fremgang.",
        "suggestedType": "Rolig gatur",
        "suggestedMinutes": 6,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      },
      {
        "day": 13,
        "title_no": "Dag 13: Sakte fremover",
        "desc_no": "Dag 13 av 21. Fase 2: Bygg. Sakte, varig fremgang.",
        "suggestedType": "Hjemmebevegelse",
        "suggestedMinutes": 6,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      },
      {
        "day": 14,
        "title_no": "Dag 14: Sakte fremover",
        "desc_no": "Dag 14 av 21. Fase 2: Bygg. Sakte, varig fremgang.",
        "suggestedType": "Hvile med pust",
        "suggestedMinutes": 6,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      },
      {
        "day": 15,
        "title_no": "Dag 15: Bygg tillit",
        "desc_no": "Dag 15 av 21. Fase 3: Tillit. Du bygger noe varig.",
        "suggestedType": "Rolig gatur",
        "suggestedMinutes": 7,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      },
      {
        "day": 16,
        "title_no": "Dag 16: Bygg tillit",
        "desc_no": "Dag 16 av 21. Fase 3: Tillit. Du bygger noe varig.",
        "suggestedType": "Hjemmebevegelse",
        "suggestedMinutes": 7,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      },
      {
        "day": 17,
        "title_no": "Dag 17: Bygg tillit",
        "desc_no": "Dag 17 av 21. Fase 3: Tillit. Du bygger noe varig.",
        "suggestedType": "Hvile med pust",
        "suggestedMinutes": 7,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      },
      {
        "day": 18,
        "title_no": "Dag 18: Bygg tillit",
        "desc_no": "Dag 18 av 21. Fase 3: Tillit. Du bygger noe varig.",
        "suggestedType": "Rolig gatur",
        "suggestedMinutes": 8,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      },
      {
        "day": 19,
        "title_no": "Dag 19: Bygg tillit",
        "desc_no": "Dag 19 av 21. Fase 3: Tillit. Du bygger noe varig.",
        "suggestedType": "Hjemmebevegelse",
        "suggestedMinutes": 8,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      },
      {
        "day": 20,
        "title_no": "Dag 20: Bygg tillit",
        "desc_no": "Dag 20 av 21. Fase 3: Tillit. Du bygger noe varig.",
        "suggestedType": "Hvile med pust",
        "suggestedMinutes": 8,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      },
      {
        "day": 21,
        "title_no": "Dag 21: Bygg tillit",
        "desc_no": "Dag 21 av 21. Fase 3: Tillit. Du bygger noe varig.",
        "suggestedType": "Rolig gatur",
        "suggestedMinutes": 9,
        "carePrompt_no": "Har du gitt deg selv tillatelse til a ta det rolig i dag?",
        "reflection_no": "Hva var den minste gode handlingen du klarte i dag?",
        "graceAllowed": true
      }
    ]
  }
] as const;

export function getProgram(id: string): ProgramMeta | undefined {
  return PROGRAMS_INDEX.find((p) => p.id === id);
}
