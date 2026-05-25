import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Radio, Wrench, Navigation, Cpu, Package,
  Anchor, Signal, Compass, CheckCircle2, ArrowRight, Phone,
} from "lucide-react";
import { services, getServiceBySlug } from "@/lib/services";
import CtaBanner from "@/components/CtaBanner";
import { SITE } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Radio, Wrench, Navigation, Cpu, Package, Anchor, Signal, Compass,
  Broadcast: Radio,
};

// Generate static params for all services
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: `${service.title} | Transocean Marine Surveyors Kenya`,
    description: service.description,
    keywords: service.keywords.join(", "),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon] ?? Anchor;

  // Related services (exclude current)
  const related = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section
        className="pt-[120px] pb-20 relative overflow-hidden"
        style={{ background: "#0a1628" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors mb-8"
            >
              ← Back to Services
            </Link>

            <div
              className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
              style={{ background: "rgba(30,144,184,0.15)", border: "1px solid rgba(30,144,184,0.25)" }}
            >
              <Icon size={26} className="text-[#1e90b8]" strokeWidth={1.5} />
            </div>

            <span
              className="block text-[11px] font-bold tracking-[0.2em] uppercase text-[#1e90b8] mb-4"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Our Services
            </span>
            <h1
              className="text-[clamp(30px,4vw,50px)] font-extrabold text-white leading-tight mb-5"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {service.title}
            </h1>
            <p className="text-white/55 text-[17px] leading-relaxed mb-8">
              {service.tagline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-bold text-[14px] tracking-wide text-white transition-all hover:-translate-y-0.5"
                style={{ fontFamily: "var(--font-syne)", background: "#1e90b8" }}
              >
                Request a Quote <ArrowRight size={15} />
              </Link>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-bold text-[14px] tracking-wide text-white border border-white/30 transition-all hover:border-white hover:bg-white/8"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                <Phone size={15} /> Call Us
              </a>
            </div>
          </div>

          {/* Classification badges */}
          <div className="hidden lg:block">
            <div
              className="rounded-lg p-8"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <p
                className="text-[12px] font-bold tracking-[0.15em] uppercase text-white/30 mb-6"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Approved by Classification Societies
              </p>
              <div className="grid grid-cols-2 gap-3">
                {SITE.classificationSocieties.map((s) => (
                  <div
                    key={s.abbr}
                    className="rounded p-4 text-center"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div
                      className="text-[22px] font-extrabold text-[#1e90b8]"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {s.abbr}
                    </div>
                    <div className="text-[12px] text-white/35 mt-1">{s.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left — description + details */}
          <div className="lg:col-span-2">
            <h2
              className="text-[26px] font-bold text-[#0a1628] mb-6"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Service Overview
            </h2>
            <p className="text-[16px] text-[#2c3e5a] leading-relaxed mb-10">
              {service.description}
            </p>

            <h3
              className="text-[20px] font-bold text-[#0a1628] mb-5"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              What&apos;s Included
            </h3>
            <div className="flex flex-col gap-3">
              {service.details.map((detail) => (
                <div key={detail} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-[#1e90b8] flex-shrink-0 mt-0.5"
                    strokeWidth={2}
                  />
                  <span className="text-[15px] text-[#2c3e5a] leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — contact card */}
          <div>
            <div
              className="rounded-lg p-8 sticky top-24"
              style={{ background: "#0a1628" }}
            >
              <h3
                className="text-[20px] font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Need this service?
              </h3>
              <p className="text-white/55 text-[14px] leading-relaxed mb-7">
                Our team responds within 24 hours with a quote tailored to your
                vessel&apos;s requirements.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                <a
                  href={SITE.emailHref}
                  className="flex items-center gap-3 text-white/55 hover:text-white text-[14px] transition-colors"
                >
                  <span className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ background: "rgba(30,144,184,0.15)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1e90b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </span>
                  {SITE.email}
                </a>
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-3 text-white/55 hover:text-white text-[14px] transition-colors"
                >
                  <span className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ background: "rgba(30,144,184,0.15)" }}>
                    <Phone size={14} className="text-[#1e90b8]" />
                  </span>
                  {SITE.phone}
                </a>
              </div>

              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded font-bold text-[14px] tracking-wide text-[#0a1628] transition-all hover:brightness-110"
                style={{ fontFamily: "var(--font-syne)", background: "#c8a84b" }}
              >
                Request a Quote <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="py-20" style={{ background: "#f4f6f9" }}>
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-[26px] font-bold text-[#0a1628] mb-10"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Other Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((s) => {
              const RelIcon = iconMap[s.icon] ?? Anchor;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group bg-white rounded-lg p-7 border border-[#e8edf4] transition-all hover:border-[#1e90b8] hover:shadow-md flex flex-col"
                >
                  <div className="w-10 h-10 rounded flex items-center justify-center mb-4" style={{ background: "#f4f6f9" }}>
                    <RelIcon size={18} className="text-[#1a6b8a] group-hover:text-[#1e90b8] transition-colors" strokeWidth={1.6} />
                  </div>
                  <h3
                    className="text-[15px] font-bold text-[#0a1628] mb-2 group-hover:text-[#1e90b8] transition-colors"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {s.shortTitle}
                  </h3>
                  <p className="text-[13px] text-[#8a9ab5] leading-relaxed flex-1">{s.tagline}</p>
                  <div className="flex items-center gap-1.5 mt-4 text-[12px] font-bold text-[#1e90b8]" style={{ fontFamily: "var(--font-syne)" }}>
                    View <ArrowRight size={12} />
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
