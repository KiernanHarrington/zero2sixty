"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import LogoMark from "@/components/LogoMark";

const LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?c=big-brake-kits", label: "BBK" },
  { href: "/about", label: "Tech" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { count } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#050608]/85 hairline">
      <div className="mx-auto max-w-7xl px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <LogoMark className="w-8 h-8" />
          <span className="font-display text-xl tracking-tight">
            ZERO<span className="text-blue-bright">2</span>SIXTY
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => {
            const active = pathname === l.href.split("?")[0] && l.href !== "/shop?c=big-brake-kits";
            return (
              <Link
                key={l.label}
                href={l.href}
                className={`text-sm uppercase tracking-widest font-semibold transition-colors hover:text-blue-bright ${
                  active ? "text-blue-bright" : "text-muted"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative flex items-center gap-2 px-3 py-2 border border-line hover:border-blue-bright transition-colors text-sm uppercase tracking-wider font-semibold"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M3 4h2l2.4 12.3a2 2 0 0 0 2 1.7h8.7a2 2 0 0 0 2-1.6L22 8H6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="20" r="1.4" fill="currentColor" />
              <circle cx="18" cy="20" r="1.4" fill="currentColor" />
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 grid place-items-center text-[11px] font-bold bg-blue text-white rounded-full glow">
                {count}
              </span>
            )}
          </Link>

          <button
            className="md:hidden p-2 border border-line"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d={open ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-line bg-bg-soft px-5 py-4 flex flex-col gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm uppercase tracking-widest font-semibold text-muted hover:text-blue-bright"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
