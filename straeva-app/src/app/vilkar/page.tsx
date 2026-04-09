"use client";
import MarketingLayout from "@/components/MarketingLayout";

export default function VilkarPage() {
  return (
    <MarketingLayout>
      <div className="page" style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.4rem", fontFamily: "var(--font-headline)", marginBottom: 8 }}>Vilkar</h1>
        <div className="card card--airy" style={{ marginTop: 24 }}>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.7 }}>Straeva er et gratis verktøy. Du bruker det pa eget ansvar. Appen er ikke en medisinsk tjeneste og kan ikke erstatte profesjonell helsehjelp.</p>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.7, marginTop: 16 }}>Kontakt alltid helsepersonell hvis du er usikker pa hva som er riktig for deg.</p>
        </div>
      </div>
    </MarketingLayout>
  );
}