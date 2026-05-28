import Image from "next/image";
import { client, urlFor } from "@/lib/sanity";

interface PageHeroProps {
  page: "services" | "about" | "blog" | "contact";
  defaultLabel: string;
  defaultHeadline: string;
  defaultSubtitle: string;
}

async function getPageHero(page: string) {
  try {
    return await client.fetch(
      `*[_type == "hero" && page == $page][0]{
        label,
        headline,
        subtitle,
        backgroundImage,
        overlayOpacity
      }`,
      { page },
      { next: { revalidate: 0 } }
    );
  } catch {
    return null;
  }
}

export default async function PageHero({
  page,
  defaultLabel,
  defaultHeadline,
  defaultSubtitle,
}: PageHeroProps) {
  const hero = await getPageHero(page);

  const label = hero?.label ?? defaultLabel;
  const headline = hero?.headline ?? defaultHeadline;
  const subtitle = hero?.subtitle ?? defaultSubtitle;
  const overlayOpacity = (hero?.overlayOpacity ?? 60) / 100;
  const bgImage = hero?.backgroundImage
    ? urlFor(hero.backgroundImage).width(1920).url()
    : null;

  return (
    <section
      className="pt-[120px] pb-20 relative overflow-hidden"
      style={{ background: "#0a1628" }}
    >
      {/* Background image from Sanity */}
      {bgImage && (
        <>
          <Image
            src={bgImage}
            alt={headline}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0 z-[1]"
            style={{ background: `rgba(10,22,40,${overlayOpacity})` }}
          />
        </>
      )}

      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <span
          className="block text-[11px] font-bold tracking-[0.2em] uppercase text-[#1e90b8] mb-4"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {label}
        </span>
        <h1
          className="text-[clamp(36px,5vw,56px)] font-extrabold text-white leading-tight mb-6 max-w-[640px]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          {headline}
        </h1>
        <p className="text-white/55 text-[18px] leading-relaxed max-w-[560px]">
          {subtitle}
        </p>
      </div>
    </section>
  );
}