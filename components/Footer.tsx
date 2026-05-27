import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

import { SITE } from "@/lib/constants";
import { services } from "@/lib/services";

export default function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      href: SITE.linkedin,
      label: "LinkedIn",
      icon: FaLinkedinIn,
      hoverBorder: "hover:border-[#1e90b8]/50",
      hoverBg: "hover:bg-[#1e90b8]/10",
      hoverShadow: "hover:shadow-[0_8px_30px_rgba(30,144,184,0.25)]",
      iconColor: "text-white/50 group-hover:text-[#1e90b8]",
    },
    {
      href: SITE.facebook,
      label: "Facebook",
      icon: FaFacebookF,
      hoverBorder: "hover:border-[#1877F2]/50",
      hoverBg: "hover:bg-[#1877F2]/10",
      hoverShadow: "hover:shadow-[0_8px_30px_rgba(24,119,242,0.25)]",
      iconColor: "text-white/50 group-hover:text-[#1877F2]",
    },
    {
      href: SITE.whatsapp,
      label: "WhatsApp",
      icon: FaWhatsapp,
      hoverBorder: "hover:border-[#25D366]/50",
      hoverBg: "hover:bg-[#25D366]/10",
      hoverShadow: "hover:shadow-[0_8px_30px_rgba(37,211,102,0.25)]",
      iconColor: "text-white/50 group-hover:text-[#25D366]",
    },
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ];

  return (
    <footer
      style={{ background: "#060f1e" }}
      className="relative overflow-hidden pt-20 pb-8"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#1e90b8]/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-[#1e90b8]/3 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14 pb-14 border-b border-white/5">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/logo.png"
                alt="Transocean logo"
                width={38}
                height={38}
                className="rounded-md flex-shrink-0"
              />
              <div>
                <h3
                  className="text-white text-[15px] font-bold leading-tight"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Transocean Marine
                </h3>
                <p className="text-white/40 text-[12px]">Surveyors E.A. Ltd</p>
              </div>
            </div>

            <p className="text-white/45 text-sm leading-relaxed max-w-[320px]">
              Kenya&apos;s trusted marine electronics and GMDSS specialists,
              delivering certified marine communication, navigation, and vessel
              compliance solutions.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-7">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      group w-11 h-11 rounded-full
                      border border-white/10
                      bg-white/[0.03]
                      flex items-center justify-center
                      transition-all duration-300 ease-out
                      hover:-translate-y-1.5 hover:scale-110
                      active:scale-95 active:translate-y-0
                      ${social.hoverBorder}
                      ${social.hoverBg}
                      ${social.hoverShadow}
                    `}
                  >
                    <Icon
                      size={17}
                      className={`transition-colors duration-300 ${social.iconColor}`}
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-white/30 text-[11px] font-bold tracking-[0.18em] uppercase mb-5"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Services
            </h4>
            <ul className="space-y-3">
              {services.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-white/50 hover:text-white text-[14px] transition-colors duration-200 hover:translate-x-0.5 inline-block"
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
              className="text-white/30 text-[11px] font-bold tracking-[0.18em] uppercase mb-5"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/50 hover:text-white text-[14px] transition-colors duration-200 hover:translate-x-0.5 inline-block"
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
              className="text-white/30 text-[11px] font-bold tracking-[0.18em] uppercase mb-5"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Contact
            </h4>

            <div className="space-y-4">
              {/* Email */}
              <a
                href={SITE.emailHref}
                className="group flex items-center gap-3 text-white/50 hover:text-white transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-[#1e90b8]/40 group-hover:bg-[#1e90b8]/10 group-hover:shadow-[0_4px_15px_rgba(30,144,184,0.2)]">
                  <Mail size={15} className="text-[#1e90b8] flex-shrink-0" />
                </div>
                <span className="text-sm leading-relaxed">{SITE.email}</span>
              </a>

              {/* Phone */}
              <a
                href={SITE.phoneHref}
                className="group flex items-center gap-3 text-white/50 hover:text-white transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:border-[#1e90b8]/40 group-hover:bg-[#1e90b8]/10 group-hover:shadow-[0_4px_15px_rgba(30,144,184,0.2)]">
                  <Phone size={15} className="text-[#1e90b8] flex-shrink-0" />
                </div>
                <span className="text-sm leading-relaxed">{SITE.phone}</span>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 text-white/50">
                <div className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center flex-shrink-0">
                  <MapPin size={15} className="text-[#1e90b8] flex-shrink-0" />
                </div>
                <span className="text-sm leading-relaxed">{SITE.locationFull}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-white/25 text-[13px] text-center md:text-left">
            © {year} Transocean Marine Surveyors E.A. Ltd. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/privacy"
              className="text-white/25 hover:text-white/60 text-[13px] transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-white/25 hover:text-white/60 text-[13px] transition-colors duration-200"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}