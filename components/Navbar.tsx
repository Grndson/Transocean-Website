"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SITE } from "@/lib/constants";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 44, // exactly below the 44px TopBar
          left: 0,
          right: 0,
          zIndex: 55, // below TopBar (60) but above mobile menu (50)
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          transition: "background 0.3s, box-shadow 0.3s",
          background: scrolled ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.95)",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "none",
          borderBottom: scrolled ? "1px solid #e2e8f0" : "1px solid #f1f5f9",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between" style={{ height: 80 }}>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <Image
              src="/logo.png"
              alt="Transocean logo"
              width={45}
              height={45}
              className="rounded flex-shrink-0"
              style={{ width: "auto", height: 45 }}
            />
            <div className="flex flex-col leading-tight">
              <span
                className="text-[#000080] text-[18px] font-bold tracking-wide"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Transocean Marine
              </span>
              <span className="text-[#8a9ab5] text-[14px] tracking-widest">
                Surveyors E.A. Ltd
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8 list-none">
            {navLinks.map((l) => {
              const isActive = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`group relative pb-1 text-[16px] font-semibold tracking-wide transition-all duration-300 ${
                      isActive ? "text-[#000080]" : "text-slate-700 hover:text-[#000080]"
                    }`}
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {l.label}
                    <span
                      className={`absolute left-0 -bottom-1 h-[2px] bg-[#000080] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded text-[16px] font-bold tracking-wide transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
              style={{
                fontFamily: "var(--font-syne)",
                background: "#000080",
                color: "#ffffff",
              }}
            >
              Request a Quote
            </Link>
          </div>

          {/* Mobile hamburger — 44x44 touch target (Apple HIG minimum) */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            style={{
              width: 44,
              height: 44,
              background: "transparent",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              color: "#000080",
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
              position: "relative",
              zIndex: 56,
              flexShrink: 0,
            }}
            className="flex items-center justify-center md:hidden"
          >
            {open ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — always in DOM, toggled via visibility + pointerEvents */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          top: 124, // 44px TopBar + 80px Navbar
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          gap: "8px",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          visibility: open ? "visible" : "hidden",
          pointerEvents: open ? "auto" : "none",
          opacity: open ? 1 : 0,
          transition: "opacity 0.2s ease, visibility 0.2s ease",
        }}
      >
        {navLinks.map((l) => {
          const isActive = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-syne)",
                WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation",
              }}
              className={`text-xl font-semibold py-3 border-b transition-colors duration-200 ${
                isActive
                  ? "text-[#000080] border-[#000080]"
                  : "text-slate-700 border-slate-200 hover:text-[#000080]"
              }`}
            >
              {l.label}
            </Link>
          );
        })}

        <Link
          href="/contact"
          onClick={() => setOpen(false)}
          style={{
            fontFamily: "var(--font-syne)",
            background: "#000080",
            color: "#ffffff",
            WebkitTapHighlightColor: "transparent",
            touchAction: "manipulation",
          }}
          className="mt-6 px-6 py-4 rounded text-center font-bold text-[16px]"
        >
          Request a Quote
        </Link>
      </div>
    </>
  );
}