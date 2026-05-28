// app/services/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Radio, Wrench, Navigation, Cpu, Package,
  Anchor, Signal, Compass, CheckCircle2, ArrowRight, Phone,
} from "lucide-react";
import { PortableText } from "@portabletext/react";
import { client, urlFor } from "@/lib/sanity";
import { services as hardcodedServices, getServiceBySlug as getHardcodedService } from "@/lib/services";
import CtaBanner from "@/components/CtaBanner";
import { SITE } from "@/lib/constants";

export const revalidate = 0;

const iconMap: Record<string, React.ElementType> = {
  Radio, Wrench, Navigation, Cpu, Package, Anchor, Signal, Compass,
  Broadcast: Radio,
};

interface Props {
  params: Promise<{ slug: string }>;
}

interface SanityService {
  _id: string;
  title: string;
  shortTitle?: string;
  slug: string;
  tagline: string;
  description: string;
  details?: string[];
  image?: object;
  icon?: string;
  featured?: boolean;
}

interface RelatedService {
  _id?: string;
  slug: string | { current: string };
  title?: string;
  shortTitle?: string;
  tagline?: string;
  icon?: string;
  image?: object;
}

interface NormalisedService {
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  details: string[];
  icon: string;
  image: object | null;
  isSanity: boolean;
}

async function getSanityService(slug: string): Promise<SanityService | null> {
  try {
    return await client.fetch(
      `*[_type == "service" && slug.current == $slug][0]{
        _id,
        title,
        shortTitle,
        "slug": slug.current,
        tagline,
        description,
        details,
        image,
        icon,
        featured
      }`,
      { slug },
      { next: { revalidate: 0 } }
    );
  } catch {
    return null;
  }
}

async function getAllSanitySlugs(): Promise<{ slug: string }[]> {
  try {
    return await client.fetch(
      `*[_type == "service"]{ "slug": slug.current }`,
      {},
      { next: { revalidate: 0 } }
    );
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  // Include both Sanity slugs and hardcoded slugs
  const sanitySlugs = await getAllSanitySlugs();
  const hardcodedSlugs = hardcodedServices.map((s) => ({ slug: s.slug }));
  const all = [...sanitySlugs, ...hardcodedSlugs];
  // Deduplicate
  const seen = new Set<string>();
  return all.filter((s) => {
    if (seen.has(s.slug)) return false;
    seen.add(s.slug);
    return true;
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sanity = await getSanityService(slug);
  if (sanity) {
    return {
      title: `${sanity.title} | Transocean Marine Surveyors Kenya`,
      description: sanity.description,
    };
  }
  const hardcoded = getHardcodedService(slug);
  if (hardcoded) {
    return {
      title: `${hardcoded.title} | Transocean Marine Surveyors Kenya`,
      description: hardcoded.description,
      keywords: hardcoded.keywords.join(", "),
    };
  }
  return { title: "Service Not Found" };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;

  // Try Sanity first, fall back to hardcoded
  const sanityService = await getSanityService(slug);
  const hardcodedService = !sanityService ? getHardcodedService(slug) : null;

  if (!sanityService && !hardcodedService) notFound();

  // Normalise into one shape
  const service: NormalisedService = sanityService
    ? {
        title: sanityService.title,
        shortTitle: sanityService.shortTitle || sanityService.title,
        tagline: sanityService.tagline,
        description: sanityService.description,
        details: sanityService.details || [],
        icon: sanityService.icon || "Anchor",
        image: sanityService.image || null,
        isSanity: true,
      }
    : {
        title: hardcodedService!.title,
        shortTitle: hardcodedService!.shortTitle,
        tagline: hardcodedService!.tagline,
        description: hardcodedService!.description,
        details: hardcodedService!.details,
        icon: hardcodedService!.icon,
        image: null,
        isSanity: false,
      };

  const Icon = iconMap[service.icon] ?? Anchor;

  // Related — prefer Sanity services, fallback to hardcoded
  const sanitySiblings: RelatedService[] = await client
    .fetch(
      `*[_type == "service" && slug.current != $slug] | order(order asc)[0...3]{
        _id, title, shortTitle, "slug": slug.current, tagline, icon, image
      }`,
      { slug },
      { next: { revalidate: 0 } }
    )
    .catch(() => []);

  const related: RelatedService[] = sanitySiblings.length > 0
    ? sanitySiblings
    : hardcodedServices.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section
        className="pt-[120px] pb-20 relative overflow-hidden"
        style={{ background: "#0a1628" }}
      >
        {/* Hero background image if from Sanity */}
        {service.image && service.isSanity && (
          <>
            <Image
              src={urlFor(service.image).width(1920).url()}
              alt={service.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0" style={{ background: "rgba(10,22,40,0.75)" }} />
          </>
        )}

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
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-bold text-[14px] tracking-wide text-white border border-white/30 transition-all hover:border-white"
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

            {service.details && service.details.length > 0 && (
              <>
                <h3
                  className="text-[20px] font-bold text-[#0a1628] mb-5"
                  style={{ fontFamily: "var(--font-syne)" }}
                >
                  What&apos;s Included
                </h3>
                <div className="flex flex-col gap-3">
                  {service.details.map((detail: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        size={18}
                        className="text-[#1e90b8] flex-shrink-0 mt-0.5"
                        strokeWidth={2}
                      />
                      <span className="text-[15px] text-[#2c3e5a] leading-relaxed">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
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
                Our team responds within 24 hours with a quote tailored to your vessel.
              </p>
              <div className="flex flex-col gap-4 mb-8">
                <a
                  href={SITE.emailHref}
                  className="flex items-center gap-3 text-white/55 hover:text-white text-[14px] transition-colors"
                >
                  <span className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0" style={{ background: "rgba(30,144,184,0.15)" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1e90b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
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
            {related.map((s: RelatedService) => {
              const RelIcon = iconMap[s.icon ?? ""] ?? Anchor;
              const relSlug = typeof s.slug === "string" ? s.slug : s.slug?.current;
              return (
                <Link
                  key={s._id || relSlug}
                  href={`/services/${relSlug}`}
                  className="group bg-white rounded-lg overflow-hidden border border-[#e8edf4] transition-all hover:border-[#1e90b8] hover:shadow-md flex flex-col"
                >
                  {s.image && (
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={urlFor(s.image).width(400).height(200).url()}
                        alt={s.title ?? s.shortTitle ?? "Service"}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="33vw"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    {!s.image && (
                      <div className="w-10 h-10 rounded flex items-center justify-center mb-4" style={{ background: "#f4f6f9" }}>
                        <RelIcon size={18} className="text-[#1a6b8a] group-hover:text-[#1e90b8] transition-colors" strokeWidth={1.6} />
                      </div>
                    )}
                    <h3
                      className="text-[15px] font-bold text-[#0a1628] mb-2 group-hover:text-[#1e90b8] transition-colors"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {s.shortTitle ?? s.title}
                    </h3>
                    <p className="text-[13px] text-[#8a9ab5] leading-relaxed flex-1">{s.tagline}</p>
                    <div className="flex items-center gap-1.5 mt-4 text-[12px] font-bold text-[#1e90b8]" style={{ fontFamily: "var(--font-syne)" }}>
                      View <ArrowRight size={12} />
                    </div>
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