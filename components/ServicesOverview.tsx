import Link from "next/link";
import { ArrowRight, Radio, Wrench, Navigation, Cpu, Package, Anchor, Signal, Compass } from "lucide-react";
import { services } from "@/lib/services";

const iconMap: Record<string, React.ElementType> = {
  Radio, Wrench, Navigation, Cpu, Package, Anchor, Signal, Compass,
  Broadcast: Radio, // fallback
};

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-white" id="services">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <span
              className="block text-[11px] font-bold tracking-[0.2em] uppercase text-[#1e90b8] mb-3"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              What We Do
            </span>
            <h2
              className="text-[clamp(28px,4vw,42px)] font-extrabold text-[#0a1628] leading-tight"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Comprehensive Marine
              <br />
              Electronics Services
            </h2>
          </div>
          <p className="text-[17px] text-[#6b7e9a] leading-relaxed max-w-[480px]">
            End-to-end marine communication, navigation, and survey services
            for vessels operating in East African and international waters.
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
          style={{ background: "#e8edf4", borderRadius: 8, overflow: "hidden" }}
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Anchor;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white p-9 flex flex-col transition-all duration-300 hover:bg-[#0a1628]"
              >
                <div
                  className="w-12 h-12 rounded flex items-center justify-center mb-5 transition-all duration-300"
                  style={{ background: "#f4f6f9" }}
                >
                  <Icon
                    size={22}
                    className="text-[#1a6b8a] group-hover:text-[#1e90b8] transition-colors duration-300"
                    strokeWidth={1.6}
                  />
                </div>
                <h3
                  className="text-[16px] font-bold mb-2.5 text-[#0a1628] group-hover:text-white transition-colors duration-300"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {service.shortTitle}
                </h3>
                <p className="text-[14px] text-[#6b7e9a] group-hover:text-white/55 leading-relaxed transition-colors duration-300 flex-1">
                  {service.tagline}
                </p>
                <div
                  className="inline-flex items-center gap-1.5 mt-4 text-[12px] font-bold tracking-wide text-[#1e90b8] group-hover:text-[#c8a84b] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  Learn more <ArrowRight size={12} />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded font-bold text-[14px] tracking-wide text-[#0a1628] border-[1.5px] border-[#1d3461] transition-all duration-200 hover:bg-[#0a1628] hover:text-white"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            View All Services <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
