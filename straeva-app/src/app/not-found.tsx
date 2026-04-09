"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "100dvh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 18px",
      background: "var(--background)",
      textAlign: "center",
    }}>
      <div style={{ fontSize: "4rem", marginBottom: 16 }}>
        <span style={{ opacity: 0.6 }}>404</span>
      </div>
      <h1 style={{ fontSize: "1.6rem", fontFamily: "var(--font-headline)", marginBottom: 12 }}>
        Siden finnes ikke
      </h1>
      <p style={{ color: "var(--text-soft)", fontSize: "0.95rem", maxWidth: "32ch", lineHeight: 1.6, marginBottom: 28 }}>
        Denne siden eksisterer ikke eller er flyttet. Alt er likevel OK — ta deg en rolig pause.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "min(100%, 280px)" }}>
        <Link href="/app/hjem" className="btn btn-primary btn-large">
          Til startsiden
        </Link>
        <Link href="/" className="btn btn-ghost btn-large">
          Hjem / Markedsside
        </Link>
      </div>
    </div>
  );
}
