"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/app/hjem", label: "Hjem", icon: "1f3e0" },
  { href: "/app/bevegelse", label: "Bevegelse", icon: "1f3c3" },
  { href: "/app/refleksjon", label: "Refleksjon", icon: "1f4dd" },
  { href: "/app/seire", label: "Seire", icon: "1f3c6" },
  { href: "/app/innstillinger", label: "Mer", icon: "2699" },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="bottom-nav">
      {NAV.map((item) => {
        const active = pathname === item.href || pathname === item.href + "/";
        return (
          <Link key={item.href} href={item.href} className={`nav-btn ${active ? "active" : ""}`}>
            <span className="nav-icon">{String.fromCodePoint(parseInt(item.icon, 16))}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
