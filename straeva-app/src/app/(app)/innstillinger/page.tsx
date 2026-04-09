"use client";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/state";
import TopBar from "@/components/app/TopBar";
import { exportData } from "@/lib/local-db";
import { tl } from "@/lib/i18n";

export default function SettingsPage() {
  const profile = useStore((s) => s.profile);
  const updateProfile = useStore((s) => s.updateProfile);
  const updatePreferences = useStore((s) => s.updatePreferences);
  const importState = useStore((s) => s.importState);
  const resetAllData = useStore((s) => s.resetAllData);
  const state = useStore((s) => s);
  const setToast = useStore((s) => s.setToast);
  const copy = tl(profile.preferences.language);
  const [name, setName] = useState(profile.name);
  const [squadMember, setSquadMember] = useState("");
  const [theme, setTheme] = useState(profile.preferences.theme);
  const [lang, setLang] = useState(profile.preferences.language);
  const [graceDays, setGraceDays] = useState(profile.preferences.graceDaysPerMonth ?? 3);

  useEffect(() => { setName(profile.name); }, [profile.name]);
  useEffect(() => { setTheme(profile.preferences.theme); }, [profile.preferences.theme]);
  useEffect(() => { setLang(profile.preferences.language); }, [profile.preferences.language]);
  useEffect(() => { setGraceDays(profile.preferences.graceDaysPerMonth ?? 3); }, [profile.preferences.graceDaysPerMonth]);

  function handleSaveName() { updateProfile({ name }); setToast(lang === "en" ? "Name saved." : "Navn lagret."); }
  function handleAddSquad() {
    if (!squadMember.trim()) return;
    updateProfile({ supportSquad: [...profile.supportSquad, squadMember.trim()].slice(0, 8) });
    setSquadMember("");
  }
  function handleRemoveSquad(n: string) { updateProfile({ supportSquad: profile.supportSquad.filter((x) => x !== n) }); }
  function handleThemeChange(t: any) { setTheme(t); updatePreferences({ theme: t }); }
  function handleLangChange(l: any) { setLang(l); updatePreferences({ language: l }); }
  function handleGraceDays(n: number) {
    setGraceDays(n);
    updatePreferences({ graceDaysPerMonth: n });
    setToast(lang === "en" ? "Grace days updated." : "Nådedager oppdatert.");
  }
  async function handleExport() {
    const json = await exportData(state);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = "straeva-backup-" + new Date().toISOString().slice(0, 10) + ".json"; a.click();
    URL.revokeObjectURL(url);
    setToast(copy.toast.exported);
  }
  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const success = await importState(String(reader.result ?? ""));
        setToast(success ? copy.toast.imported : (lang === "en" ? "Could not read the file." : "Kunne ikke lese filen."));
      } catch {
        setToast(lang === "en" ? "Could not read the file." : "Kunne ikke lese filen.");
      }
    };
    reader.readAsText(file); e.target.value = "";
  }
  async function handleReset() {
    if (!window.confirm("Slette alle data? Dette kan ikke angres.")) return;
    await resetAllData();
  }

  return (
    <>
      <TopBar />
      <div style={{ padding: "8px 18px 32px" }}>
        <h1 style={{ fontSize: "1.8rem", fontFamily: "var(--font-headline)", marginBottom: 20 }}>{copy.settings.title}</h1>

        <div className="card card--airy" style={{ marginBottom: 14 }}>
          <h2 style={{ fontSize: "1rem", marginBottom: 14 }}>{copy.settings.profile}</h2>
          <div className="form-group" style={{ marginBottom: 12 }}>
            <label className="form-label">{copy.settings.name}</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
              <button type="button" className="btn btn-primary btn-small" onClick={handleSaveName}>{copy.common.save}</button>
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">{copy.settings.squad}</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
              {profile.supportSquad.map((n) => <span key={n} className="chip" onClick={() => handleRemoveSquad(n)}>{n} x</span>)}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <input className="form-input" value={squadMember} onChange={(e) => setSquadMember(e.target.value)}
                placeholder="Navn" onKeyDown={(e) => { if (e.key === "Enter") handleAddSquad(); }} />
              <button type="button" className="btn btn-secondary btn-small" onClick={handleAddSquad}>{copy.settings.addSquadMember}</button>
            </div>
          </div>
        </div>

        <div className="card card--airy" style={{ marginBottom: 14 }}>
          <h2 style={{ fontSize: "1rem", marginBottom: 14 }}>{copy.settings.theme}</h2>
          <div style={{ display: "flex", gap: 8 }}>
            {(["light", "dark", "system"] as const).map((t) => (
              <button key={t} type="button" className={`chip ${theme === t ? "active" : ""}`} onClick={() => handleThemeChange(t)}>
                {t === "light" ? copy.settings.themeLight : t === "dark" ? copy.settings.themeDark : copy.settings.themeSystem}
              </button>
            ))}
          </div>
        </div>

        <div className="card card--airy" style={{ marginBottom: 14 }}>
          <h2 style={{ fontSize: "1rem", marginBottom: 14 }}>{copy.settings.language}</h2>
          <div style={{ display: "flex", gap: 8 }}>
            {(["no", "en"] as const).map((l) => (
              <button key={l} type="button" className={`chip ${lang === l ? "active" : ""}`} onClick={() => handleLangChange(l)}>{l === "no" ? "Norsk" : "English"}</button>
            ))}
          </div>
        </div>

        <div className="card card--airy" style={{ marginBottom: 14 }}>
          <h2 style={{ fontSize: "1rem", marginBottom: 14 }}>Nådedager per måned</h2>
          <p style={{ color: "var(--text-soft)", fontSize: "0.85rem", marginBottom: 12 }}>Hvor mange dager med hvile du kan ta uten a bryte rytmen.</p>
          <div style={{ display: "flex", gap: 8 }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" className={`chip ${graceDays === n ? "active" : ""}`} onClick={() => handleGraceDays(n)}>{n}</button>
            ))}
          </div>
        </div>

        <div className="card card--airy" style={{ marginBottom: 14 }}>
          <h2 style={{ fontSize: "1rem", marginBottom: 14 }}>Data</h2>
          <div style={{ display: "grid", gap: 10 }}>
            <button type="button" className="btn btn-secondary" onClick={handleExport}>{copy.settings.export}</button>
            <label className="btn btn-secondary" style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {copy.settings.import}<input type="file" accept=".json" style={{ display: "none" }} onChange={handleImport} />
            </label>
            <button type="button" className="btn btn-secondary" style={{ color: "var(--secondary)" }} onClick={() => void handleReset()}>{copy.settings.reset}</button>
          </div>
        </div>

        <div className="card card--airy">
          <h2 style={{ fontSize: "1rem", marginBottom: 14 }}>Om</h2>
          <p style={{ color: "var(--text-soft)", fontSize: "0.9rem", lineHeight: 1.6, margin: "0 0 12px" }}>Straeva v1.0. All data lagres lokalt.</p>
          <a href="https://github.com/Ola-Turmo/straeva-pwa" target="_blank" rel="noreferrer" className="btn btn-ghost btn-small">GitHub</a>
        </div>
      </div>
    </>
  );
}
