"use client";
import Link from "next/link";

const PILLARS = [
  {
    icon: "1f33f",
    title: "Skaansomhet forst",
    body: "De fleste treningsapper starter med a sette et mal. Straeva starter med a lytte — til kroppen, energien og dagsformen din.",
  },
  {
    icon: "1f9e9",
    title: "Mikro-handlinger",
    body: "Forskning viser at det er lettere a bygge vaner gjennom sma, konsekvente handlinger enn store, sporadiske innsatser.",
  },
  {
    icon: "2764",
    title: "Omsorg som drivkraft",
    body: "Straeva handler like mye om a ta vare pa deg selv som om bevegelse. Begge deler er like viktige.",
  },
  {
    icon: "1f4da",
    title: "Personvern som utgangspunkt",
    body: "All data tilhorer deg. Ingenting gar til en server med mindre du aktivt velger det. Straeva er laget for folk som vil ha kontroll.",
  },
];

export default function OmPage() {
  return (
    <div style={{ minHeight: "100dvh", background: "var(--background)" }}>
      <header style={{ padding: "18px 18px 0" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.9rem", color: "var(--text-soft)" }}>
          &larr; Tilbake
        </Link>
      </header>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 18px 60px" }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ display: "inline-flex", alignItems: "center", padding: "6px 12px", borderRadius: 999, background: "var(--primary-pale)", color: "var(--primary)", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Om Straeva
          </span>
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 6vw, 3rem)", fontFamily: "var(--font-headline)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 16, lineHeight: 1 }}>
          Et sted for rolig<br />
          <span style={{ color: "var(--primary)" }}>bevegelse og omsorg</span>
        </h1>
        <p style={{ color: "var(--text-soft)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "46ch", marginBottom: 32 }}>
          Straeva er et apent kildekode-prosjekt laget for folk som onsker a bygge en bevegelsesrutine uten a presser seg selv. Det startet med en enkel idé: hva om den viktigste bevegelsen er den som skjer nar du motes med deg selv?
        </p>

        <div style={{ display: "grid", gap: 20, marginBottom: 36 }}>
          {PILLARS.map((p) => (
            <div key={p.title} style={{ background: "var(--surface)", borderRadius: "var(--radius-md)", padding: 22, border: "1px solid var(--outline)", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <span style={{ width: 48, height: 48, borderRadius: 16, background: "var(--primary-pale)", display: "grid", placeItems: "center", fontSize: "1.8rem", flexShrink: 0 }}>
                {String.fromCodePoint(parseInt(p.icon, 16))}
              </span>
              <div>
                <h2 style={{ fontSize: "1.1rem", fontFamily: "var(--font-headline)", fontWeight: 700, marginBottom: 6 }}>{p.title}</h2>
                <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", lineHeight: 1.65, margin: 0 }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "var(--surface)", borderRadius: "var(--radius-md)", padding: 22, border: "1px solid var(--outline)", marginBottom: 24 }}>
          <h2 style={{ fontSize: "1.2rem", fontFamily: "var(--font-headline)", fontWeight: 700, marginBottom: 12 }}>Aapent kildekode</h2>
          <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: 16 }}>
            Straeva er bygget som et apent prosjekt. All kode er tilgjengelig pa GitHub. Du kan bidra, forke prosjektet eller bygge din egen versjon.
          </p>
          <a href="https://github.com/Ola-Turmo/straeva-pwa" target="_blank" rel="noreferrer" className="btn btn-primary btn-small">
            Se pa GitHub
          </a>
        </div>

        <div style={{ background: "linear-gradient(160deg, var(--primary-pale) 0%, transparent 60%), var(--surface)", borderRadius: "var(--radius-md)", padding: 22, border: "1px solid var(--outline)", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.2rem", fontFamily: "var(--font-headline)", fontWeight: 700, marginBottom: 10 }}>Prv Straeva i dag</h2>
          <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 16 }}>
            Helt gratis. Ingen konto. Alle data pa din enhet.
          </p>
          <Link href="/app/hjem" className="btn btn-primary">
            Aapne appen
          </Link>
        </div>
      </div>
    </div>
  );
}
