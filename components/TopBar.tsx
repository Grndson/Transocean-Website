import { Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function TopBar() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 w-full"
      style={{
        background: "#0a1628",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-center gap-2 sm:gap-3 text-center flex-wrap">

        {/* Pulse indicator */}
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
          className="hidden sm:block text-[12px] text-white/70 tracking-normal sm:tracking-wide"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Need Immediate Marine Support?
        </p>

        {/* Divider */}
        <span className="hidden sm:block text-white/20">•</span>

        {/* Contact actions */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">

          {/* Call */}
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-1.5 group transition-all duration-200"
            aria-label="Call us"
          >
            <Phone
              size={12}
              className="text-[#1e90b8] flex-shrink-0"
              strokeWidth={2.5}
            />

            <span
              className="text-[11px] sm:text-[12px] font-semibold text-white group-hover:text-[#1e90b8] transition-colors duration-200"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {/* Mobile short */}
              <span className="sm:hidden">Call Now</span>

              {/* Desktop full */}
              <span className="hidden sm:inline">
                {SITE.phone}
              </span>
            </span>
          </a>

          {/* Divider */}
          <span className="text-white/20">/</span>

          {/* WhatsApp */}
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 group transition-all duration-200"
            aria-label="WhatsApp us"
          >
            <MessageCircle
              size={12}
              className="text-[#25D366] flex-shrink-0"
              strokeWidth={2.5}
            />

            <span
              className="text-[11px] sm:text-[12px] font-semibold text-white group-hover:text-[#25D366] transition-colors duration-200"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {/* Mobile short */}
              <span className="sm:hidden">WhatsApp</span>

              {/* Desktop full */}
              <span className="hidden sm:inline">
                +254 738 036 617
              </span>
            </span>
          </a>

        </div>
      </div>
    </div>
  );
}