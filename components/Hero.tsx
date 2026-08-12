import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";
import { getHero } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";

export default async function Hero() {
  const hero = await getHero().catch(() => null);

  const headline = hero?.headline ?? "Certified Marine Electronics & GMDSS Experts";
  const subtitle = hero?.subtitle ?? "Keeping East Africa's vessels safe, compliant, and connected. From GMDSS surveys to AIS installation — certified solutions that meet IMO, SOLAS, and classification society standards.";
  const ctaPrimaryText = hero?.ctaPrimaryText ?? "Request a Quote";
  const ctaPrimaryLink = hero?.ctaPrimaryLink ?? "/contact";
  const ctaSecondaryText = hero?.ctaSecondaryText ?? "View Our Services";
  const ctaSecondaryLink = hero?.ctaSecondaryLink ?? "/services";
  const overlayOpacity = (hero?.overlayOpacity ?? 55) / 100;
  const bgImage = hero?.backgroundImage ? urlFor(hero.backgroundImage).width(1920).url() : null;

  return (
    <section
      className="relative flex min-h-[600px] items-center overflow-hidden sm:min-h-[650px] lg:min-h-[700px]"
      style={{ background: "#0a1628" }}
    >
      {bgImage && (
        <>
          <Image src={bgImage} alt="Hero background" fill className="object-cover" priority />
          <div className="absolute inset-0 z-[1]" style={{ background: `rgba(10,22,40,${overlayOpacity})` }} />
        </>
      )}

      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{ background: "radial-gradient(ellipse 60% 50% at 70% 50%, rgba(26,107,138,0.22) 0%, transparent 70%), radial-gradient(ellipse 40% 60% at 15% 80%, rgba(200,168,75,0.07) 0%, transparent 60%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
        <div>
          <h1 className="font-extrabold text-white leading-[1.07] mb-6" style={{ fontFamily: "var(--font-syne)", fontSize: "clamp(36px, 5vw, 58px)" }}>
            {headline}
          </h1>

          <p className="text-white/60 text-[17px] leading-relaxed max-w-[480px] mb-10">{subtitle}</p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Link
              href={ctaPrimaryLink}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-bold text-[14px] tracking-wide text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
              style={{ fontFamily: "var(--font-syne)", background: "#1e90b8" }}
            >
              {ctaPrimaryText} <ArrowRight size={16} />
            </Link>
            <Link
              href={ctaSecondaryLink}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-bold text-[14px] tracking-wide text-white border border-white/30 transition-all duration-200 hover:border-white hover:bg-white/8"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {ctaSecondaryText}
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#8a9ab5]" style={{ fontFamily: "var(--font-syne)" }}>
              Approved by
            </span>
            <div className="w-px h-8 bg-white/10" />
            {SITE.classificationSocieties.map((society, index) => (
              <span key={society.abbr}>
                <span className="text-[12px] font-bold text-white/45 tracking-wide" style={{ fontFamily: "var(--font-syne)" }}>
                  {society.abbr}
                </span>
                {index < SITE.classificationSocieties.length - 1 && <span className="mx-3 text-white/15">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
