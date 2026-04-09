import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Straeva | Roelig bevegelse og omsorg",
  description: "Et gratis, lokalt-foerste app for skansom bevegelse, omsorg og sma seire.",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#fbfbe2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="no" suppressHydrationWarning data-theme="light"><head><link rel="icon" href="/assets/icon.svg" type="image/svg+xml" /><link rel="apple-touch-icon" href="/assets/icon.svg" /></head><body>{children}</body></html>;
}
