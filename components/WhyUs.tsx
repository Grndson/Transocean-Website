import { Shield, Clock, Users, Wrench } from "lucide-react";
import { SITE } from "@/lib/constants";

const features = [
  {
    icon: Shield,
    title: "Classification Society Approved",
    desc: "Surveys accepted by Lloyd's Register, Bureau Veritas, IRS, and ZMA — giving shipowners full certification confidence.",
  },
  {
    icon: Clock,
    title: "Rapid Response, Minimal Downtime",
    desc: "We respond promptly to vessel calls to minimise port time and keep your operations on schedule.",
  },
  {
    icon: Users,
    title: "Kenyan-Based, Globally Certified",
    desc: "Local presence in East African ports combined with internationally recognised certifications and compliance expertise.",
  },
  {
    icon: Wrench,
    title: "Workshop & Onboard Capabilities",
    desc: "Full repair workshop for electronics plus onboard field service — everything covered from our facility or at your vessel.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "#0a1628" }}>
      {/* BG glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 80% at 80% 50%, rgba(26,107,138,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Left */}
          <div>
            <span
              className="block text-[11px] font-bold tracking-[0.2em] uppercase mb-3"
              style={{ fontFamily: "var(--font-syne)", color: "#c8a84b" }}
            >
              Why Choose Us
            </span>
            <h2
              className="text-[clamp(28px,4vw,42px)] font-extrabold text-white leading-tight mb-5"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              The Trusted Name in
              <br />
              East African Maritime
            </h2>
            <p className="text-white/55 text-[17px] leading-relaxed mb-12 max-w-[460px]">
              Transocean Marine Surveyors brings certified expertise,
              classification society approvals, and a commitment to zero
              downtime for every vessel we serve.
            </p>

            <div className="flex flex-col gap-6">
              {features.map((f) => (
                <div key={f.title} className="flex gap-4 items-start">
                  <div
                    className="w-10 h-10 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: "rgba(30,144,184,0.13)",
                      border: "1px solid rgba(30,144,184,0.22)",
                    }}
                  >
                    <f.icon size={18} className="text-[#1e90b8]" strokeWidth={1.7} />
                  </div>
                  <div>
                    <h4
                      className="text-white text-[15px] font-semibold mb-1"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {f.title}
                    </h4>
                    <p className="text-white/48 text-[14px] leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — stats grid */}
          <div
            className="grid grid-cols-2 gap-px rounded-lg overflow-hidden"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            {SITE.stats.map((s) => (
              <div
                key={s.label}
                className="p-5 sm:p-7 lg:p-10 text-center transition-all duration-300 hover:bg-[rgba(30,144,184,0.1)]"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <span
                  className="block text-[32px] sm:text-[40px] lg:text-[52px] font-extrabold leading-none mb-2"
                  style={{ fontFamily: "var(--font-syne)", color: "#c8a84b" }}
                >
                  {s.value}
                </span>
                <span className="text-[11px] sm:text-[12px] lg:text-[13px] text-white/45 tracking-wide">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}