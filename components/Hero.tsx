import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SITE } from "@/lib/constants";
import { getHero } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";

export default async function Hero() {
  // Fetch from Sanity — falls back gracefully if no content yet
  const hero = await getHero().catch(() => null);

  const headline = hero?.headline ?? "Certified Marine Electronics & GMDSS Experts";
  const subtitle =
    hero?.subtitle ??
    "Keeping East Africa's vessels safe, compliant, and connected. From GMDSS surveys to AIS installation — certified solutions that meet IMO, SOLAS, and classification society standards.";
  const ctaPrimaryText = hero?.ctaPrimaryText ?? "Request a Quote";
  const ctaPrimaryLink = hero?.ctaPrimaryLink ?? "/contact";
  const ctaSecondaryText = hero?.ctaSecondaryText ?? "View Our Services";
  const ctaSecondaryLink = hero?.ctaSecondaryLink ?? "/services";
  const overlayOpacity = (hero?.overlayOpacity ?? 55) / 100;
  const bgImage = hero?.backgroundImage ? urlFor(hero.backgroundImage).width(1920).url() : null;

  return (
    <section
      className="relative overflow-hidden pt-0 pb-16 sm:pb-20"
      style={{ background: "#0a1628" }}
    >
      {/* Background image from Sanity (if uploaded) */}
      {bgImage && (
        <>
          <Image
            src={bgImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay so text stays readable */}
          <div
            className="absolute inset-0 z-[1]"
            style={{ background: `rgba(10,22,40,${overlayOpacity})` }}
          />
        </>
      )}

      {/* Background gradients */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(26,107,138,0.22) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 15% 80%, rgba(200,168,75,0.07) 0%, transparent 60%)",
        }}
      />
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center w-full">
        {/* Left — text */}
        <div>
          <h1
            className="font-extrabold text-white leading-[1.07] mb-6"
            style={{
              fontFamily: "var(--font-syne)",
              fontSize: "clamp(36px, 5vw, 58px)",
            }}
          >
            {headline}
          </h1>

          <p className="text-white/60 text-[17px] leading-relaxed max-w-[480px] mb-10">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href={ctaPrimaryLink}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-bold text-[14px] tracking-wide text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
              style={{
                fontFamily: "var(--font-syne)",
                background: "#1e90b8",
              }}
            >
              {ctaPrimaryText}
              <ArrowRight size={16} />
            </Link>
            <Link
              href={ctaSecondaryLink}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-bold text-[14px] tracking-wide text-white border border-white/30 transition-all duration-200 hover:border-white hover:bg-white/8"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {ctaSecondaryText}
            </Link>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center gap-5">
            <span
              className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#8a9ab5]"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Approved by
            </span>
            <div className="w-px h-8 bg-white/10" />
            {SITE.classificationSocieties.map((s, i) => (
              <span key={i}>
                <span
                  className="text-[12px] font-bold text-white/45 tracking-wide"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  {s.abbr}
                </span>
                {i < SITE.classificationSocieties.length - 1 && (
                  <span className="mx-3 text-white/15">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Right — stat cards (hardcoded — design element) */}
        <div className="hidden lg:block">
          <div className="relative max-w-[420px]">
            {/* Float badge */}
            <div
              className="absolute -top-4 -right-4 z-10 flex items-center gap-2 px-4 py-2.5 rounded font-bold text-[12px] tracking-wide text-white"
              style={{
                fontFamily: "var(--font-syne)",
                background: "#1e90b8",
                boxShadow: "0 8px 32px rgba(30,144,184,0.4)",
              }}
            >
              <CheckCircle2 size={14} />
              SOLAS Compliant
            </div>

            {/* Main stat */}
            <div
              className="rounded-lg p-6 mb-3"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <div
                className="text-[52px] font-extrabold text-white leading-none mb-1"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                15+
              </div>
              <div className="text-[#8a9ab5] text-[14px]">
                Years serving East African waters
              </div>
            </div>

            {/* Mini stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { val: "100+", label: "Vessels Surveyed" },
                { val: "3", label: "Class Societies" },
                { val: "9", label: "Core Services" },
                { val: "100%", label: "IMO Compliance" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded p-4"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="text-[28px] font-extrabold leading-none mb-1"
                    style={{ fontFamily: "var(--font-syne)", color: "#c8a84b" }}
                  >
                    {s.val}
                  </div>
                  <div className="text-[12px] text-[#8a9ab5] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}