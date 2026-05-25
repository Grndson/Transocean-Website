import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { SITE } from "@/lib/constants";
import { services } from "@/lib/services";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#060f1e" }} className="pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-white/5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image
                            src="/logo.png"
                            alt="Transocean logo"
                            width={35}
                            height={35}
                            className="rounded flex-shrink-0"
                            style={{ width: "auto", height: 35 }}
                          />
              <span
                className="text-white text-[14px] font-bold"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Transocean Marine Surveyors
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-[280px]">
              Kenya&apos;s trusted marine electronics and GMDSS specialists.
              Keeping vessels safe, compliant, and connected across East African
              waters.
            </p>
            <div className="flex gap-2">
              <a
                href={SITE.linkedin}
                aria-label="LinkedIn"
                className="w-9 h-9 rounded border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[#1e90b8] hover:border-[#1e90b8] transition-all duration-200"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a
                href={SITE.facebook}
                aria-label="Facebook"
                className="w-9 h-9 rounded border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[#1e90b8] hover:border-[#1e90b8] transition-all duration-200"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a
                href={SITE.whatsapp}
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded border border-white/10 bg-white/5 flex items-center justify-center hover:bg-[#1e90b8] hover:border-[#1e90b8] transition-all duration-200"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white/60"
                >
                  <path
                    d="M17.472 14.382c-.27.139-1.615.795-1.873.887-.26.094-.448.139-.647-.16-.2-.297-.772-.85-.948-1.02-.176-.17-.35-.19-.65-.066-.3.13-1.253.443-1.902.688-.65.246-1.2.45-1.39.496-.19.047-.35.07-.545-.098-.195-.169-.75-.62-1.155-1.213-.405-.592-.72-1.367-.8-1.56-.08-.195-.008-.3.094-.397.096-.093.215-.242.323-.363.107-.12.14-.2.21-.33.07-.13.036-.24-.018-.338-.054-.1-.647-1.56-.89-2.153-.234-.594-.47-.513-.646-.524-.17-.01-.37-.01-.568-.01-.195 0-.51.074-.777.347-.27.277-1.03 1.018-1.03 2.48 0 1.46.94 2.86 1.07 3.06.13.2 1.87 2.83 4.55 3.96.64.28 1.14.44 1.53.56.64.2 1.23.17 1.69.1.47-.08 1.43-.58 1.66-1.14.23-.57.23-1.06.16-1.16-.06-.1-.23-.16-.48-.27Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12.03 2.01C6.004 2.01 1.12 6.9 1.12 12.93c0 2.02.53 3.99 1.52 5.71L1.5 24l5.3-1.4a10.94 10.94 0 0 0 5.23 1.16c6.03 0 10.92-4.89 10.92-10.92 0-6.03-4.89-10.92-10.92-10.92Z"
                    stroke="#ffffff"
                    strokeWidth="1.8"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-white/30 text-[11px] font-bold tracking-[0.15em] uppercase mb-5"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-white/50 hover:text-white text-[14px] transition-colors duration-200"
                  >
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="text-white/30 text-[11px] font-bold tracking-[0.15em] uppercase mb-5"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Company
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Use", href: "/terms" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/50 hover:text-white text-[14px] transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-white/30 text-[11px] font-bold tracking-[0.15em] uppercase mb-5"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href={SITE.emailHref}
                className="flex items-start gap-3 text-white/50 hover:text-white text-sm transition-colors"
              >
                <Mail size={16} className="text-[#1e90b8] mt-0.5 flex-shrink-0" />
                {SITE.email}
              </a>
              <a
                href={SITE.phoneHref}
                className="flex items-start gap-3 text-white/50 hover:text-white text-sm transition-colors"
              >
                <Phone size={16} className="text-[#1e90b8] mt-0.5 flex-shrink-0" />
                {SITE.phone}
              </a>
              <div className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin size={16} className="text-[#1e90b8] mt-0.5 flex-shrink-0" />
                {SITE.locationFull}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-[13px]">
            © {year} Transocean Marine Surveyors. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-white/25 hover:text-white/60 text-[13px] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/25 hover:text-white/60 text-[13px] transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
