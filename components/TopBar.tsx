import { Phone, MessageCircle, Mail } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function TopBar() {
  return (
    <div
      className="fixed top-0 left-0 right-0 w-full"
      style={{
        background: "#0a1628",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        zIndex: 60,
        height: 44,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 flex items-center justify-center gap-2 sm:gap-3 w-full">

        {/* Pulse indicator — desktop only */}
        <span className="relative hidden sm:flex h-2 w-2 flex-shrink-0">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{ background: "#1e90b8" }}
          />
          <span
            className="relative inline-flex rounded-full h-2 w-2"
            style={{ background: "#1e90b8" }}
          />
        </span>

        {/* Desktop message */}
        <p
          className="hidden sm:block text-[14px] text-white/75 tracking-wide"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Need Immediate Marine Support?
        </p>

        {/* Divider — desktop only */}
        <span className="hidden sm:block text-white/20">•</span>

        {/* Contact actions — all three visible on mobile and desktop */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Call */}
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-1 sm:gap-1.5 group transition-all duration-200"
            aria-label="Call us"
            style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
          >
            <Phone size={14} className="text-[#1e90b8] flex-shrink-0" strokeWidth={2.5} />
            <span
              className="text-[12px] sm:text-[14px] font-semibold text-white group-hover:text-[#1e90b8] transition-colors duration-200"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              <span className="sm:hidden">Call</span>
              <span className="hidden sm:inline">{SITE.phone}</span>
            </span>
          </a>

          <span className="text-white/20 text-[12px]">/</span>

          {/* WhatsApp */}
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 sm:gap-1.5 group transition-all duration-200"
            aria-label="WhatsApp us"
            style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
          >
            <MessageCircle size={14} className="text-[#25D366] flex-shrink-0" strokeWidth={2.5} />
            <span
              className="text-[12px] sm:text-[14px] font-semibold text-white group-hover:text-[#25D366] transition-colors duration-200"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              <span className="sm:hidden">WhatsApp</span>
              <span className="hidden sm:inline">+254 738 036 617</span>
            </span>
          </a>

          <span className="text-white/20 text-[12px]">/</span>

          {/* Email */}
          <a
            href={SITE.emailHref}
            className="flex items-center gap-1 sm:gap-1.5 group transition-all duration-200"
            aria-label="Email us"
            style={{ WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
          >
            <Mail size={14} className="text-[#c8a84b] flex-shrink-0" strokeWidth={2.5} />
            <span
              className="text-[12px] sm:text-[14px] font-semibold text-white group-hover:text-[#c8a84b] transition-colors duration-200"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              <span className="sm:hidden">Email</span>
              <span className="hidden sm:inline">{SITE.email}</span>
            </span>
          </a>

        </div>
      </div>
    </div>
  );
}