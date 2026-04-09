"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/state";
import NavBar from "@/components/app/NavBar";
import Toast from "@/components/app/Toast";
import { initSync } from "@/lib/sync";

export default function AppGroupLayout({ children }: { children: React.ReactNode }) {
  const initialize = useStore((s) => s.initialize);
  const isLoading = useStore((s) => s.isLoading);
  const initialized = useStore((s) => s.initialized);
  const profileId = useStore((s) => s.profile.id);
  const theme = useStore((s) => s.profile.preferences.theme);
  const weeklySummaryEnabled = useStore((s) => s.profile.preferences.weeklySummaryEnabled);
  const setToast = useStore((s) => s.setToast);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});
    const handler = (e: Event) => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      root.setAttribute("data-theme", mq.matches ? "dark" : "light");
      const h = () => root.setAttribute("data-theme", mq.matches ? "dark" : "light");
      mq.addEventListener("change", h); return () => mq.removeEventListener("change", h);
    } else {
      root.setAttribute("data-theme", theme);
    }
  }, [theme]);

  useEffect(() => { setMounted(true); initialize(); initSync(); }, [initialize]);
  useEffect(() => { if (initialized && !profileId) router.replace("/app/onboarding"); }, [initialized, profileId, router]);

  useEffect(() => {
    if (!weeklySummaryEnabled || !initialized) return;
    const check = () => {
      const now = new Date();
      if (now.getDay() === 0 && now.getHours() >= 18 && now.getHours() < 20) {
        setToast("Ukentlig oppsummering er klar. Ta deg et oyeblikk til refleksjon.");
      }
    };
    check();
    const id = setInterval(check, 60 * 60 * 1000);
    return () => clearInterval(id);
  }, [weeklySummaryEnabled, initialized]);

  async function handleInstall() {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    setInstallPrompt(null);
    if (outcome === "accepted") setToast("Straeva er installert!");
  }

  if (!mounted || isLoading) {
    return (
      <div className="loading-screen">
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 60, height: 60, borderRadius: 20, background: "linear-gradient(135deg, var(--primary-soft), var(--primary))", margin: "0 auto 16px" }} />
          <div style={{ fontFamily: "var(--font-headline)", fontSize: "1.5rem", color: "var(--primary)" }}>Straeva</div>
          <div style={{ fontSize: "0.85rem", color: "var(--text-soft)", marginTop: 8 }}>Laster...</div>
        </div>
      </div>
    );
  }

  if (initialized && !profileId) return null;

  return (
    <div className="app-shell">
      {children}
      {installPrompt && (
        <div style={{ position: "fixed", bottom: 100, left: 18, right: 18, zIndex: 50, background: "var(--surface)", border: "1px solid var(--outline)", borderRadius: "var(--radius-md)", padding: "14px 16px", boxShadow: "var(--shadow)", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>Installer Straeva</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-soft)" }}>Fa appen pa hjemskjermen.</div>
          </div>
          <button type="button" className="btn btn-primary btn-small" onClick={handleInstall}>Installer</button>
          <button type="button" className="btn btn-ghost btn-small" onClick={() => setInstallPrompt(null)}>x</button>
        </div>
      )}
      <NavBar />
      <Toast />
    </div>
  );
}
