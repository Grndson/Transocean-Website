// components/FloatingButtons.tsx
// WhatsApp button (bottom left) + Scroll to top button (bottom right, above chat widget)
"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function FloatingButtons() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ── WhatsApp — bottom left ─────────────────────────────── */}
      <a
        href={SITE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 group"
        style={{ filter: "drop-shadow(0 4px 16px rgba(37,211,102,0.35))" }}
      >
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{ background: "#25D366" }}
        />

        {/* Button */}
        <div
          className="relative w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
          style={{ background: "#25D366" }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>

        {/* Tooltip */}
        <div
          className="absolute left-16 whitespace-nowrap px-3 py-1.5 rounded text-white text-[12px] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0 pointer-events-none"
          style={{
            background: "#25D366",
            fontFamily: "var(--font-syne)",
            boxShadow: "0 4px 12px rgba(37,211,102,0.3)",
          }}
        >
          Chat with us
          <span
            className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-0 h-0"
            style={{
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderRight: "6px solid #25D366",
            }}
          />
        </div>
      </a>

      {/* ── Scroll to top — bottom right, sits ABOVE the chat bubble ── */}
      {/* Chat bubble is 60px tall at bottom:24px = occupies 24px to 84px  */}
      {/* Scroll button sits at bottom:100px so there's a 16px gap above chat */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group"
        style={{
          bottom: "100px", // sits above the 60px chat bubble at bottom:24px
          right: "24px",
          background: showScroll ? "#0a1628" : "transparent",
          border: "1.5px solid",
          borderColor: showScroll ? "rgba(30,144,184,0.6)" : "transparent",
          opacity: showScroll ? 1 : 0,
          pointerEvents: showScroll ? "auto" : "none",
          transform: showScroll ? "translateY(0)" : "translateY(12px)",
          boxShadow: showScroll ? "0 4px 20px rgba(10,22,40,0.4)" : "none",
        }}
      >
        <ArrowUp
          size={18}
          className="text-[#1e90b8] transition-transform duration-200 group-hover:-translate-y-0.5"
          strokeWidth={2.5}
        />
      </button>
    </>
  );
}