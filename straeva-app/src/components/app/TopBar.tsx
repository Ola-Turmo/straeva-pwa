"use client";
import { useStore } from "@/lib/state";
import { greeting } from "@/lib/i18n";

export default function TopBar() {
  const profile = useStore((s) => s.profile);
  const lang = profile.preferences.language;
  return (
    <div className="topbar">
      <div className="brand-lockup">
        <div className="brand-mark" />
        <div className="title-block">
          <span className="eyebrow">{greeting(lang)}, {profile.name}</span>
          <span className="app-title">Stræva</span>
        </div>
      </div>
    </div>
  );
}
