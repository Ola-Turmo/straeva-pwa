"use client";
import { useStore } from "@/lib/state";

export default function Toast() {
  const toast = useStore((s) => s.toast);
  if (!toast) return null;
  return <div className="toast">{toast}</div>;
}
