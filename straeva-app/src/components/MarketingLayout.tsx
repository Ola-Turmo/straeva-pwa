import Link from "next/link";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  const navLinks = [
    { href: "/programmer", label: "Programmer" },
    { href: "/faq", label: "FAQ" },
    { href: "/om", label: "Om" },
  ];
  return (
    <>
      <header style={{ position: "sticky", top: 0, zIndex: 40, backdropFilter: "blur(18px)", background: "color-mix(in srgb, var(--background) 85%, transparent)", borderBottom: "1px solid var(--outline)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, var(--primary-soft), var(--primary))" }} />
            <span style={{ fontFamily: "var(--font-headline)", fontWeight: 800, fontSize: "1.2rem", color: "var(--text)" }}>Straeva</span>
          </Link>
          <nav style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
            {navLinks.map((l) => (<Link key={l.href} href={l.href} style={{ padding: "8px 14px", borderRadius: "var(--radius-pill)", color: "var(--text-soft)", fontSize: "0.9rem", fontWeight: 500 }}>{l.label}</Link>))}
            <Link href="/app/hjem" className="btn btn-primary btn-small" style={{ textDecoration: "none" }}>Aapne appen</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer style={{ borderTop: "1px solid var(--outline)", padding: "40px 18px", marginTop: 60 }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, var(--primary-soft), var(--primary))" }} />
              <span style={{ fontFamily: "var(--font-headline)", fontWeight: 800 }}>Straeva</span>
            </div>
            <p style={{ color: "var(--text-soft)", fontSize: "0.85rem", lineHeight: 1.6, maxWidth: 28, margin: 0 }}>Gratis. Lokalt. Din.</p>
          </div>
          <div>
            <h4 style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-soft)", marginBottom: 12 }}>Juridisk</h4>
            <div style={{ display: "grid", gap: 8 }}>
              <Link href="/personvern" style={{ color: "var(--text-soft)", fontSize: "0.9rem" }}>Personvern</Link>
              <Link href="/vilkar" style={{ color: "var(--text-soft)", fontSize: "0.9rem" }}>Vilkar</Link>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1180, margin: "32px auto 0", paddingTop: 20, borderTop: "1px solid var(--outline)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: "var(--text-soft)", fontSize: "0.8rem", margin: 0 }}>© {new Date().getFullYear()} Straeva. All data lagres lokalt.</p>
          <p style={{ color: "var(--text-soft)", fontSize: "0.8rem", margin: 0 }}>
            <a href="https://github.com/Ola-Turmo/straeva-pwa" style={{ color: "var(--primary)" }}>Aapen kildekode</a> · Helt gratis
          </p>
        </div>
      </footer>
    </>
  );
}
