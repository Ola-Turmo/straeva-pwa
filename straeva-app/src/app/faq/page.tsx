"use client";
import MarketingLayout from "@/components/MarketingLayout";

export default function FAQPage() {
  const faqs = [
    { q: "Er Straeva virkelig gratis?", a: "Ja. Helt gratis, for alltid. Ingen skjulte kostnader, ingen abonnement, ingen in-app-kjop." },
    { q: "Hvor lagres dataene mine?", a: "Alle data lagres lokalt i din nettleser eller pa din enhet. Ingenting sendes til noen server med mindre du aktivt kobler til Convex." },
    { q: "Kan jeg bruke Straeva uten internett?", a: "Ja. Appen er en PWA som fungerer fullt ut offline etter forste gangs lasting." },
    { q: "Hva er en 'nådedag'?", a: "En nådedag lar deg ta en hviledag uten at rytmen brytes. Du far 3 nådedager per måned." },
    { q: "Kan jeg koble til Apple Health eller Google Fit?", a: "Ikke ennå, men helseintegrasjon er planlagt for en fremtidig versjon." },
    { q: "Hvordan er dette annerledes enn andre treningsapper?", a: "Straeva handler ikke om prestasjon, men om kontinuitet og omsorg." },
    { q: "Er Straeva trygt for personer i bedring?", a: "Ja. Straeva er spesielt designet for folk i bedring, med lav terskel og ingen press." },
    { q: "Kan jeg dele dataene mine med en terapeut?", a: "Du kan eksportere dataene dine som JSON og dele dem manuelt." },
    { q: "Hva er 'støttegruppen'?", a: "En liste med navn på folk som feirer deg. Navnene lagres bare lokalt." },
    { q: "Hvordan rapporterer jeg en feil?", a: "Bruk GitHub-repoet: github.com/Ola-Turmo/straeva-pwa" },
  ];
  return (
    <MarketingLayout>
      <div className="page" style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.2rem", fontFamily: "var(--font-headline)", marginBottom: 8 }}>Ofte stilte sporsmal</h1>
        <p style={{ color: "var(--text-soft)", marginBottom: 32 }}>Finner du ikke svar? <a href="https://github.com/Ola-Turmo/straeva-pwa" style={{ color: "var(--primary)" }}>Aapne en issue pa GitHub</a>.</p>
        <div style={{ display: "grid", gap: 16 }}>
          {faqs.map((f) => (
            <details key={f.q} className="card" style={{ cursor: "pointer" }}>
              <summary style={{ fontWeight: 600, fontSize: "1rem", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {f.q} <span style={{ color: "var(--text-soft)", fontSize: "1.2rem" }}>▾</span>
              </summary>
              <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", lineHeight: 1.6, marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--outline)" }}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </MarketingLayout>
  );
}