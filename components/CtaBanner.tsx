import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function CtaBanner() {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: "#1e90b8" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 80% 50%, rgba(10,22,40,0.38) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        <h2
          className="text-[clamp(22px,3vw,36px)] font-extrabold text-white max-w-[520px] leading-tight"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Ready to get your vessel survey-ready?
        </h2>
        <div className="flex flex-wrap gap-4 flex-shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-bold text-[14px] tracking-wide text-[#0a1628] bg-white transition-all duration-200 hover:brightness-105 hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Request a Quote <ArrowRight size={15} />
          </Link>
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-bold text-[14px] tracking-wide text-white border-[1.5px] border-white/45 transition-all duration-200 hover:border-white hover:bg-white/10"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            <Phone size={15} /> Call Us Now
          </a>
        </div>
      </div>
    </section>
  );
}
