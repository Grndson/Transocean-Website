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

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/98 shadow-lg border-b border-slate-200"
            : "bg-white/95 border-b border-slate-100"
        }`}
        style={{ backdropFilter: "blur(16px)" }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Transocean logo"
              width={40}
              height={40}
              className="rounded flex-shrink-0"
              style={{ width: "auto", height: 40 }}
            />

            <div className="flex flex-col leading-tight">
              <span
                className="text-[#000080] text-[15px] font-bold tracking-wide"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Transocean Marine
              </span>

              <span className="text-[#8a9ab5] text-[11px] tracking-widest">
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
                    className={`group relative pb-1 text-[13px] font-semibold tracking-wide transition-all duration-300 ${
                      isActive
                        ? "text-[#000080]"
                        : "text-slate-700 hover:text-[#000080]"
                    }`}
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {l.label}

                    {/* Animated underline */}
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
              className="px-5 py-2.5 rounded text-[13px] font-bold tracking-wide transition-all duration-200 hover:brightness-110 hover:-translate-y-0.5"
              style={{
                fontFamily: "var(--font-syne)",
                background: "#000080",
                color: "#ffffff",
              }}
            >
              Request a Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#000080] p-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 top-[72px] bg-white z-40 flex flex-col p-6 gap-2 md:hidden">
          {navLinks.map((l) => {
            const isActive = pathname === l.href;

            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`text-xl font-semibold py-3 border-b transition-colors duration-300 ${
                  isActive
                    ? "text-[#000080] border-[#000080]"
                    : "text-slate-700 border-slate-200 hover:text-[#000080]"
                }`}
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {l.label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-6 px-6 py-3 rounded text-center font-bold text-[15px] transition-all duration-200 hover:brightness-110"
            style={{
              fontFamily: "var(--font-syne)",
              background: "#000080",
              color: "#ffffff",
            }}
          >
            Request a Quote
          </Link>

          <a
            href={SITE.phoneHref}
            className="text-center text-slate-500 text-sm mt-3"
          >
            {SITE.phone}
          </a>
        </div>
      )}
    </>
  );
}