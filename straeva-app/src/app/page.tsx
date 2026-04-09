import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Straeva | Roelig bevegelse og omsorg",
  description: "Gratis norsk app for skansom bevegelse, omsorg og sma seire. Ingen konto. Alle data lokalt pa enheten din.",
  openGraph: {
    title: "Straeva | Roelig bevegelse og omsorg",
    description: "Et gratis, lokalt alternativ til tradisjonelle treningsapper. Ingen konto.",
    type: "website",
    locale: "nb_NO",
  },
  twitter: { card: "summary", title: "Straeva | Roelig bevegelse og omsorg" },
};

const STEPS = [
  { n: "01", title: "Sjekk inn energien", desc: "Hver dag starter med et 5-sekunds energisjekk. Ingen poeng, ingen dom — bare aerlighet." },
  { n: "02", title: "Beveg deg pa din mate", desc: "Velg en aktivitet som matcher dagsformen. Timeren starter. Ingen press, bare rom." },
  { n: "03", title: "Feir den minste seier", desc: "Hver loggforing kan feires. Straeva minner deg pa at du mottes opp." },
];

const FEATURES = [
  { icon: "2691", title: "Energisjekk-in", desc: "Fem nivaer. Start hver dag med a lytte til kroppen din." },
  { icon: "1f3c3", title: "Rolige okter", desc: "Korte, tilpassede okter uten press eller prestasjonsjag." },
  { icon: "1f4dd", title: "Omsorgslogg", desc: "Logg det du gjor for deg selv og andre — det som teller." },
  { icon: "1f3c6", title: "Seire", desc: "Mikro-seire som alle blir sett. Ingenting er for lite." },
  { icon: "1f4c1", title: "Programmer", desc: "14-35 dagers veiledede forlop bygget med omsorg." },
  { icon: "1f525", title: "Streaks + nadedager", desc: "Bygg rutine med fleksible nadedager som lar deg hvile uten a miste rytmen." },
  { icon: "1f4ac", title: "Ukentlig refleksjon", desc: "Seks sporsmal som hjalper deg a se mønsteret ditt." },
  { icon: "1f50d", title: "Innsikt", desc: "Lar hva som fungerer for akkurat deg." },
];

const PROGRAMS = [
  { id: "14-dager-momentum", title: "14 dager med rolig momentum", desc: "Bygg en bevegelsesrutine med utgangspunkt i skansomhet. Kort, overkommelig, dag for dag.", days: "14 dager", icon: "1f33f" },
  { id: "bedring-etter-utbrenthet", title: "Bedring etter utbrenthet", desc: "Et lengre forlop for deg som er i bedring og trenger struktur uten press.", days: "21 dager", icon: "1f4da" },
];

const FAQS = [
  { q: "Maste jeg ha en konto?", a: "Nei. Straeva har ingen konto, ingen e-post og ingen ekstern server. Alle data lagres lokalt pa din enhet." },
  { q: "Er appen gratis?", a: "Ja. Helt gratis, for alltid. Ingen premium-versjon, ingen reklame, ingen in-app kjop." },
  { q: "Hvordan fungerer nadedager?", a: "Du kan sette hvor mange nadedager du vil ha per maned. En nadedag teller som aktiv dag selv om du hviler helt. Du mister ikke streaken." },
  { q: "Kan jeg bruke appen hvis jeg er utbrent?", a: "Absolutt. Straeva er spesielt designet for folk i bedring. Aktivitetene er korte, energinivaene er lave, og det er helt opp til deg." },
  { q: "Hvordan er dette annerledes fra andre treningsapper?", a: "De fleste apper prover a fa deg til a prestere. Straeva prover a fa deg til a mottes — selv pa de dagene du ikke har lyst til a gjoere noe som helst." },
  { q: "Fungerer appen offline?", a: "Ja. Etter forste gangs lasting kan du bruke appen uten internett. Service workeren laster innholdet for offline bruk." },
];

export default function MarketingHome() {
  return (
    <div>
      <header style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(16px)", background: "rgba(251,251,226,0.88)", borderBottom: "1px solid rgba(117,120,110,0.18)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 14, background: "linear-gradient(135deg, #9caf88, #526442)", boxShadow: "0 6px 16px rgba(82,100,66,0.2)" }} />
            <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.04em" }}>Straeva</span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link href="/om" style={{ fontSize: "0.9rem", color: "#44483f", fontWeight: 500 }}>Om</Link>
            <Link href="/faq" style={{ fontSize: "0.9rem", color: "#44483f", fontWeight: 500 }}>FAQ</Link>
            <Link href="/app/hjem" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 36, padding: "0 14px", borderRadius: 999, fontWeight: 600, fontSize: "0.85rem", background: "linear-gradient(135deg, #9caf88, #526442)", color: "#fff", boxShadow: "0 12px 24px rgba(82,100,66,0.18)" }}>Last ned</Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section style={{ padding: "clamp(48px, 8vw, 80px) 24px clamp(40px, 6vw, 64px)", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 5vw, 64px)", alignItems: "center" }} className="hero-grid">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 999, background: "#d5e9bf", color: "#526442", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 20 }}>
                Norsk · 100% gratis · Lokalt
              </div>
              <h1 style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95, marginBottom: 20 }}>
                Bevegelse<br />
                <span style={{ color: "#526442" }}>uten press.</span><br />
                <span style={{ color: "#9f402d" }}>Omsorg som teller.</span>
              </h1>
              <p style={{ color: "#44483f", fontSize: "clamp(1rem, 2vw, 1.1rem)", lineHeight: 1.65, maxWidth: "42ch", marginBottom: 28 }}>
                Straeva feirer hvert skritt, hver omsorgshandling og hver liten seier. Ingen konto. Alle data pa din enhet.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 36 }}>
                <Link href="/app/hjem" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 56, padding: "0 28px", borderRadius: 999, fontWeight: 600, fontSize: "1.05rem", background: "linear-gradient(135deg, #9caf88, #526442)", color: "#fff", boxShadow: "0 12px 24px rgba(82,100,66,0.18)" }}>Last ned gratis</Link>
                <Link href="/om" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 56, padding: "0 28px", borderRadius: 999, fontWeight: 600, fontSize: "1.05rem", background: "#efefd7", border: "1px solid rgba(117,120,110,0.18)", color: "#1b1d0e" }}>Les om metoden</Link>
              </div>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {["Ingen konto", "Alle data lokalt", "Helt gratis"].map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem", color: "#44483f" }}>
                    <span style={{ width: 20, height: 20, borderRadius: "50%", background: "#d5e9bf", display: "grid", placeItems: "center", flexShrink: 0, fontSize: "0.7rem", color: "#526442" }}>+</span>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Phone mockup */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ position: "relative", width: "min(100%, 280px)" }}>
                <div style={{ background: "#efefd7", borderRadius: 40, padding: 12, boxShadow: "0 32px 64px rgba(82,100,66,0.16), 0 8px 24px rgba(0,0,0,0.08)", border: "2px solid rgba(117,120,110,0.18)", position: "relative" }}>
                  <div style={{ position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)", width: 80, height: 24, background: "#efefd7", borderRadius: "0 0 16px 16px", zIndex: 2, borderTop: "1px solid rgba(117,120,110,0.18)", borderLeft: "1px solid rgba(117,120,110,0.18)", borderRight: "1px solid rgba(117,120,110,0.18)" }} />
                  <div style={{ background: "#fbfbe2", borderRadius: 28, overflow: "hidden", minHeight: 480 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px 4px", fontSize: "0.7rem", fontWeight: 600, color: "#44483f" }}>
                      <span>9:41</span>
                      <span>||||| 5G</span>
                    </div>
                    <div style={{ padding: "4px 16px 16px" }}>
                      <div style={{ padding: "10px 12px", background: "#d5e9bf", borderRadius: 18, marginBottom: 12 }}>
                        <p style={{ margin: 0, fontStyle: "italic", color: "#44483f", fontSize: "0.78rem", lineHeight: 1.5 }}>"Du trenger ikke vinne dagen for at dagen skal telle."</p>
                      </div>
                      <p style={{ fontWeight: 700, fontSize: "0.85rem", marginBottom: 10 }}>Hvordan er energien din?</p>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, marginBottom: 12 }}>
                        {[1, 2, 3, 4, 5].map((v) => (
                          <div key={v} style={{ padding: "10px 4px", borderRadius: 12, border: v === 3 ? "2px solid #526442" : "2px solid rgba(117,120,110,0.18)", background: v === 3 ? "#d5e9bf" : "#efefd7", textAlign: "center", cursor: "pointer" }}>
                            <div style={{ fontSize: "1.1rem", fontWeight: 800, color: v === 3 ? "#526442" : "#44483f" }}>{v}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                        <div style={{ background: "#efefd7", borderRadius: 14, padding: "12px 10px", textAlign: "center" }}>
                          <div style={{ fontSize: "1.5rem", fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", color: "#526442" }}>14</div>
                          <div style={{ fontSize: "0.65rem", color: "#44483f" }}>dager strekk</div>
                        </div>
                        <div style={{ background: "#efefd7", borderRadius: 14, padding: "12px 10px", textAlign: "center" }}>
                          <div style={{ fontSize: "1.5rem", fontWeight: 800, fontFamily: "Plus Jakarta Sans, sans-serif", color: "#9f402d" }}>3</div>
                          <div style={{ fontSize: "0.65rem", color: "#44483f" }}>nadedager</div>
                        </div>
                      </div>
                      <div style={{ background: "#efefd7", borderRadius: 14, padding: "10px 12px", marginBottom: 12 }}>
                        <div style={{ fontSize: "0.72rem", color: "#44483f", marginBottom: 6, fontWeight: 600 }}>DAG 14 - KONTINUITET</div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>Rolig gatur - 8 min</div>
                      </div>
                      <div style={{ fontSize: "0.72rem", color: "#44483f", marginBottom: 6, fontWeight: 600 }}>Hva har du gjort i dag?</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {["Tok pa meg skoene", "Gikk til postkassen", "Toyde ut", "Luftet rommet"].map((l) => (
                          <span key={l} style={{ padding: "5px 10px", borderRadius: 999, background: "#efefd7", border: "1px solid rgba(117,120,110,0.18)", fontSize: "0.68rem" }}>{l}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section style={{ borderTop: "1px solid rgba(117,120,110,0.18)", borderBottom: "1px solid rgba(117,120,110,0.18)", background: "#efefd7", padding: "28px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 24, textAlign: "center" }}>
            {[
              { icon: "+", label: "Ingen konto kreves" },
              { icon: "+", label: "100% lokalt" },
              { icon: "+", label: "Helt gratis" },
              { icon: "+", label: "Aapent kildekode" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: "1.4rem", marginBottom: 4, color: "#526442" }}>{s.icon}</div>
                <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1b1d0e", margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section style={{ padding: "clamp(48px, 7vw, 72px) 24px", maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#526442", marginBottom: 10 }}>Slik fungerer det</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 40, maxWidth: "20ch", lineHeight: 1.05 }}>
            Tre steg til en bedre dag
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {STEPS.map((s) => (
              <div key={s.n} style={{ background: "#efefd7", borderRadius: 28, padding: 22, boxShadow: "0 18px 32px rgba(82,100,66,0.07)", border: "1px solid rgba(117,120,110,0.18)", position: "relative" }}>
                <div style={{ fontSize: "2.8rem", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, color: "#d5e9bf", lineHeight: 1, marginBottom: 12 }}>{s.n}</div>
                <h3 style={{ fontSize: "1.15rem", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, marginBottom: 10, color: "#1b1d0e" }}>{s.title}</h3>
                <p style={{ color: "#44483f", fontSize: "0.9rem", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: "clamp(48px, 7vw, 72px) 24px", background: "#efefd7", borderTop: "1px solid rgba(117,120,110,0.18)", borderBottom: "1px solid rgba(117,120,110,0.18)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <p style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#526442", marginBottom: 10 }}>Funksjoner</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 12, lineHeight: 1.05 }}>
              Alt du trenger, ingenting du ikke trenger
            </h2>
            <p style={{ color: "#44483f", fontSize: "1rem", maxWidth: "48ch", lineHeight: 1.6, marginBottom: 36 }}>
              Ingen komplekse grafer, ingen achievements som krever mye. Bare deg, bevegelsen din og omsorgen.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
              {FEATURES.map((f) => (
                <div key={f.title} style={{ background: "#fbfbe2", borderRadius: 28, padding: 18, boxShadow: "0 18px 32px rgba(82,100,66,0.07)", border: "1px solid rgba(117,120,110,0.18)", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ width: 42, height: 42, borderRadius: 14, background: "#d5e9bf", display: "grid", placeItems: "center", fontSize: "1.3rem", flexShrink: 0 }}>
                    {String.fromCodePoint(parseInt(f.icon, 16))}
                  </span>
                  <div>
                    <h3 style={{ fontSize: "0.95rem", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, marginBottom: 4, color: "#1b1d0e" }}>{f.title}</h3>
                    <p style={{ color: "#44483f", fontSize: "0.82rem", lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Programs */}
        <section style={{ padding: "clamp(48px, 7vw, 72px) 24px", maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#526442", marginBottom: 10 }}>Programmer</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 12, lineHeight: 1.05 }}>
            Veiledede forlop
          </h2>
          <p style={{ color: "#44483f", fontSize: "1rem", maxWidth: "48ch", lineHeight: 1.6, marginBottom: 32 }}>
            Strukturerte, dag-for-dag programmer som tar deg gjennom bevegelse og refleksjon uten a presse deg.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {PROGRAMS.map((p) => (
              <div key={p.id} style={{ background: "#efefd7", borderRadius: 28, padding: 22, boxShadow: "0 18px 32px rgba(82,100,66,0.07)", border: "1px solid rgba(117,120,110,0.18)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "#d5e9bf", opacity: 0.6 }} />
                <div style={{ fontSize: "2.5rem", marginBottom: 12, position: "relative" }}>{String.fromCodePoint(parseInt(p.icon, 16))}</div>
                <h3 style={{ fontSize: "1.1rem", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, marginBottom: 8, color: "#1b1d0e" }}>{p.title}</h3>
                <p style={{ color: "#44483f", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: 14 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ padding: "6px 12px", borderRadius: 999, background: "#d5e9bf", color: "#526442", fontSize: "0.8rem", fontWeight: 600 }}>{p.days}</span>
                  <Link href={"/app/program/" + p.id} style={{ fontSize: "0.85rem", color: "#526442", fontWeight: 600 }}>
                    Les mer &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <Link href="/app/programmer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 46, padding: "0 20px", borderRadius: 999, fontWeight: 600, background: "#efefd7", border: "1px solid rgba(117,120,110,0.18)", color: "#1b1d0e" }}>Se alle programmer</Link>
          </div>
        </section>

        {/* Philosophy */}
        <section style={{ padding: "clamp(48px, 7vw, 72px) 24px", background: "linear-gradient(160deg, #f5f5dc, #efefd7)", borderTop: "1px solid rgba(117,120,110,0.18)", borderBottom: "1px solid rgba(117,120,110,0.18)" }}>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <blockquote style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.04em", margin: "0 0 24px", color: "#1b1d0e" }}>
              &ldquo;De fleste apper prover a fa deg til a prestere.<br />Straeva prover a fa deg til a mottes.&rdquo;
            </blockquote>
            <p style={{ color: "#44483f", fontSize: "1rem", lineHeight: 1.7, maxWidth: "50ch", margin: "0 auto" }}>
              Vi tror at den viktigste bevegelsen er den som skjer nar du motes med deg selv — og at den enkleste maten a holde pa med er den du faktisk har lyst til a gjore.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: "clamp(48px, 7vw, 72px) 24px", maxWidth: 860, margin: "0 auto" }}>
          <p style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#526442", marginBottom: 10 }}>Sporsmal og svar</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 32 }}>
            Ofte stilte sporsmal
          </h2>
          <div style={{ display: "grid", gap: 12 }}>
            {FAQS.map((f, i) => (
              <details key={i} style={{ background: "#efefd7", borderRadius: 28, border: "1px solid rgba(117,120,110,0.18)", overflow: "hidden" }}>
                <summary style={{ padding: "16px 20px", fontWeight: 600, fontSize: "0.95rem", cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#1b1d0e" }}>
                  {f.q}
                  <span style={{ color: "#44483f", fontSize: "1.2rem", flexShrink: 0 }}>+</span>
                </summary>
                <div style={{ padding: "0 20px 18px", color: "#44483f", fontSize: "0.9rem", lineHeight: 1.65, borderTop: "1px solid rgba(117,120,110,0.18)" }}>
                  <div style={{ paddingTop: 16 }}>{f.a}</div>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "clamp(48px, 7vw, 80px) 24px", textAlign: "center" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", background: "linear-gradient(160deg, #d5e9bf 0%, transparent 60%), #efefd7", borderRadius: 42, padding: "clamp(36px, 6vw, 56px) clamp(24px, 5vw, 48px)", border: "1px solid rgba(117,120,110,0.18)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -30, right: -30, width: 160, height: 160, borderRadius: "50%", background: "#526442", opacity: 0.06 }} />
            <div style={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, borderRadius: "50%", background: "#9f402d", opacity: 0.06 }} />
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 14, position: "relative", color: "#1b1d0e" }}>
              Klar for en snillere reise?
            </h2>
            <p style={{ color: "#44483f", fontSize: "1.05rem", lineHeight: 1.65, margin: "0 auto 28px", maxWidth: "38ch", position: "relative" }}>
              100% gratis. Ingen konto. Alle data pa din enhet.<br />Du kan prove det i dag.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
              <Link href="/app/hjem" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 56, padding: "0 28px", borderRadius: 999, fontWeight: 600, fontSize: "1.05rem", background: "linear-gradient(135deg, #9caf88, #526442)", color: "#fff", boxShadow: "0 12px 24px rgba(82,100,66,0.18)" }}>Last ned appen</Link>
              <Link href="/faq" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minHeight: 56, padding: "0 28px", borderRadius: 999, fontWeight: 600, background: "#efefd7", border: "1px solid rgba(117,120,110,0.18)", color: "#1b1d0e" }}>Les mer</Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(117,120,110,0.18)", padding: "28px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 10, background: "linear-gradient(135deg, #9caf88, #526442)" }} />
            <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 800, fontSize: "1rem", color: "#1b1d0e" }}>Straeva</span>
          </div>
          <div style={{ display: "flex", gap: 20, fontSize: "0.85rem", color: "#44483f" }}>
            <Link href="/om">Om</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/personvern">Personvern</Link>
            <Link href="/vilkar">Vilkar</Link>
          </div>
          <p style={{ width: "100%", fontSize: "0.78rem", color: "#44483f", marginTop: 8 }}>Aapent kildekode. Laget med omsorg.</p>
        </div>
      </footer>

      <style>{`
        @media (max-width: 700px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
        details summary::-webkit-details-marker { display: none; }
      `}</style>
    </div>
  );
}
