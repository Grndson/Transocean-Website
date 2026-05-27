import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Shield, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import CtaBanner from "@/components/CtaBanner";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About Us | Transocean Marine Surveyors Kenya",
  description:
    "Transocean Marine Surveyors is Kenya's leading marine electronics firm. Learn about our history, values, and classification society approvals.",
};

const values = [
  { title: "Integrity", desc: "We operate with full transparency and honesty in every service we deliver." },
  { title: "Professionalism", desc: "Certified engineers, documented processes, and communication you can rely on." },
  { title: "Safety First", desc: "Every installation and survey prioritises the safety of crew and vessel above all." },
  { title: "Compliance", desc: "We align every service with IMO SOLAS, classification society, and port state requirements." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        page="about"
        defaultLabel="Our Story"
        defaultHeadline="Kenya's Maritime Electronics Specialists"
        defaultSubtitle="Based in Mombasa, serving vessels across East African and international waters with certified marine electronics expertise."
      />

      {/* Who we are */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span
              className="block text-[11px] font-bold tracking-[0.2em] uppercase text-[#1e90b8] mb-4"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              About Us
            </span>
            <h2
              className="text-[clamp(26px,3vw,38px)] font-extrabold text-[#0a1628] leading-tight mb-6"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              More Than a Service Provider —<br />Your Maritime Partner
            </h2>
            <p className="text-[16px] text-[#2c3e5a] leading-relaxed mb-5">
              Transocean Marine Surveyors is a Kenyan-based marine electronics
              firm offering comprehensive radio communication, installation, and
              maintenance of satellite and navigation equipment — serving vessels
              across East African and international waters.
            </p>
            <p className="text-[16px] text-[#2c3e5a] leading-relaxed mb-5">
              With unwavering precision and deep industry expertise, we guide
              vessels through the complexities of modern seafaring — from
              cutting-edge GMDSS systems to advanced navigation and satellite
              technologies.
            </p>
            <p className="text-[16px] text-[#2c3e5a] leading-relaxed mb-10">
              Our operations are built on integrity, professionalism, and safety.
              Every service is aligned with IMO SOLAS regulations and
              classification society requirements, ensuring vessels remain fully
              operational and survey-ready.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-bold text-[14px] tracking-wide text-[#0a1628] border-[1.5px] border-[#1d3461] transition-all hover:bg-[#0a1628] hover:text-white"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Work With Us <ArrowRight size={15} />
            </Link>
          </div>

          {/* Image card */}
          <div className="relative">
            <div className="rounded-lg overflow-hidden relative" style={{ height: 420 }}>
              <Image
                src="/about/alex.png"
                alt="Transocean Marine Surveyors — Established in Kenya"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(10,22,40,0.7) 0%, rgba(10,22,40,0.2) 60%, transparent 100%)",
                }}
              />
            </div>
            <div
              className="absolute -bottom-5 -right-5 bg-white rounded-lg p-5 flex items-center gap-4 shadow-xl"
              style={{ border: "1px solid #e8edf4" }}
            >
              <div
                className="w-11 h-11 rounded flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(26,107,138,0.1)" }}
              >
                <Shield size={20} className="text-[#1a6b8a]" strokeWidth={1.6} />
              </div>
              <div>
                <strong
                  className="block text-[#0a1628] text-[14px] font-bold"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  IMO &amp; SOLAS Certified
                </strong>
                <span className="text-[12px] text-[#8a9ab5]">
                  All services meet international standards
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ background: "#f4f6f9" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <span
              className="block text-[11px] font-bold tracking-[0.2em] uppercase text-[#1e90b8] mb-3"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Our Values
            </span>
            <h2
              className="text-[clamp(26px,3vw,38px)] font-extrabold text-[#0a1628]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-lg p-7 border border-[#e8edf4] transition-all hover:border-[#1e90b8]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#c8a84b" }} />
                  <h3
                    className="text-[15px] font-bold text-[#0a1628]"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {v.title}
                  </h3>
                </div>
                <p className="text-[14px] text-[#6b7e9a] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classification societies */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span
              className="block text-[11px] font-bold tracking-[0.2em] uppercase text-[#1e90b8] mb-3"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Approved By
            </span>
            <h2
              className="text-[clamp(26px,3vw,38px)] font-extrabold text-[#0a1628] mb-4"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Classification Societies
            </h2>
            <p className="text-[16px] text-[#6b7e9a] max-w-[500px] mx-auto">
              Our surveys and maintenance services are accepted by the world&apos;s
              leading classification societies.
            </p>
          </div>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-lg overflow-hidden"
            style={{ background: "#e8edf4" }}
          >
            {SITE.classificationSocieties.map((s) => (
              <div
                key={s.abbr}
                className="bg-white px-6 py-10 text-center group transition-all hover:bg-[#0a1628]"
              >
                <div
                  className="text-[30px] font-extrabold text-[#1a6b8a] group-hover:text-[#1e90b8] mb-2 transition-colors"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {s.abbr}
                </div>
                <div className="text-[13px] text-[#8a9ab5] group-hover:text-white/50 transition-colors">
                  {s.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20" style={{ background: "#0a1628" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-lg overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
            {SITE.stats.map((s) => (
              <div
                key={s.label}
                className="py-12 text-center transition-all hover:bg-[rgba(30,144,184,0.1)]"
                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}
              >
                <span
                  className="block text-[clamp(32px,4vw,52px)] font-extrabold leading-none mb-2"
                  style={{ fontFamily: "var(--font-syne)", color: "#c8a84b" }}
                >
                  {s.value}
                </span>
                <span className="text-[13px] text-white/45">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}