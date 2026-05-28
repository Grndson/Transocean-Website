import type { Metadata } from "next";
import Link from "next/link";
import {
  Radio, Wrench, Navigation, Cpu, Package,
  Anchor, Signal, Compass, ArrowRight,
} from "lucide-react";
import { services } from "@/lib/services";
import CtaBanner from "@/components/CtaBanner";
import PageHero from "@/components/PageHero";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Marine Electronics Services | Transocean Marine Surveyors Kenya",
  description:
    "GMDSS surveys, EPIRB programming, AIS installation, LRIT systems, NEMO-VMS, and marine equipment supply. Certified services for vessels in East Africa.",
};

const iconMap: Record<string, React.ElementType> = {
  Radio, Wrench, Navigation, Cpu, Package, Anchor, Signal, Compass,
  Broadcast: Radio,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        page="services"
        defaultLabel="What We Offer"
        defaultHeadline="Marine Electronics & Survey Services"
        defaultSubtitle="Certified solutions for vessel compliance, communication, and navigation — covering every system onboard, from GMDSS to AIS."
      />

      {/* Services grid */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = iconMap[service.icon] ?? Anchor;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex flex-col border rounded-lg p-8 transition-all duration-300 hover:border-[#1e90b8] hover:shadow-lg"
                  style={{ border: "1px solid #e8edf4" }}
                >
                  <div
                    className="w-12 h-12 rounded flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-[rgba(30,144,184,0.12)]"
                    style={{ background: "#f4f6f9" }}
                  >
                    <Icon
                      size={22}
                      className="text-[#1a6b8a] group-hover:text-[#1e90b8] transition-colors"
                      strokeWidth={1.6}
                    />
                  </div>
                  <h2
                    className="text-[17px] font-bold text-[#0a1628] mb-3 group-hover:text-[#1e90b8] transition-colors"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {service.title}
                  </h2>
                  <p className="text-[14px] text-[#6b7e9a] leading-relaxed flex-1 mb-6">
                    {service.tagline}
                  </p>
                  <div
                    className="inline-flex items-center gap-2 text-[13px] font-bold tracking-wide text-[#1e90b8]"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    View Service <ArrowRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}