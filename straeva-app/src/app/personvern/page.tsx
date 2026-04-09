"use client";
import MarketingLayout from "@/components/MarketingLayout";

export default function PersonvernPage() {
  return (
    <MarketingLayout>
      <div className="page" style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.4rem", fontFamily: "var(--font-headline)", marginBottom: 8 }}>Personvern</h1>
        <div className="card card--airy" style={{ marginTop: 24 }}>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.7 }}>Straeva lagrer alle dine data lokalt pa din enhet. Ingen av dine personopplysninger sendes til noen ekstern server med mindre du aktivt velger a koble til Convex-skyen.</p>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.7, marginTop: 16 }}>Appen bruker ingen analyseverktøy, ingen markedsforings-piksler, og ingen tredjeparts sporing.</p>
        </div>
      </div>
    </MarketingLayout>
  );
}