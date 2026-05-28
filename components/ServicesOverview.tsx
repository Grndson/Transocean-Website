// components/ServicesOverview.tsx
// Fetches services from Sanity — falls back to hardcoded if none published yet

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Radio, Wrench, Navigation, Cpu, Package, Anchor, Signal, Compass } from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import { services as hardcodedServices } from "@/lib/services";

const iconMap: Record<string, React.ElementType> = {
  Radio, Wrench, Navigation, Cpu, Package, Anchor, Signal, Compass,
  Broadcast: Radio,
};

interface SanityService {
  _id: string;
  title: string;
  shortTitle: string;
  slug: { current: string };
  tagline: string;
  image?: object;
  icon?: string;
  featured?: boolean;
  order?: number;
}

async function getServices(): Promise<SanityService[]> {
  try {
    const results = await client.fetch(
      `*[_type == "service"] | order(order asc){
        _id,
        title,
        shortTitle,
        "slug": slug.current,
        tagline,
        image,
        icon,
        featured,
        order
      }`,
      {},
      { next: { revalidate: 0 } }
    );
    return results?.length > 0 ? results : [];
  } catch {
    return [];
  }
}

export default async function ServicesOverview() {
  const sanityServices = await getServices();
  const hasSanityServices = sanityServices.length > 0;

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

        {/* Grid — Sanity services with images */}
        {hasSanityServices ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sanityServices.map((service) => {
              const Icon = iconMap[service.icon ?? "Anchor"] ?? Anchor;
              const slug = typeof service.slug === "string"
                ? service.slug
                : service.slug?.current;
              return (
                <Link
                  key={service._id}
                  href={`/services/${slug}`}
                  className="group flex flex-col border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#1e90b8]"
                  style={{ border: "1px solid #e8edf4" }}
                >
                  {/* Image */}
                  {service.image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={urlFor(service.image).width(600).height(400).url()}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Icon overlay */}
                      <div
                        className="absolute top-3 left-3 w-9 h-9 rounded flex items-center justify-center"
                        style={{ background: "rgba(10,22,40,0.7)" }}
                      >
                        <Icon size={18} className="text-[#1e90b8]" strokeWidth={1.6} />
                      </div>
                    </div>
                  )}

                  {/* No image fallback */}
                  {!service.image && (
                    <div
                      className="h-32 flex items-center justify-center"
                      style={{ background: "#f4f6f9" }}
                    >
                      <Icon size={36} className="text-[#1a6b8a]" strokeWidth={1.4} />
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    <h3
                      className="text-[16px] font-bold mb-2 text-[#0a1628] group-hover:text-[#1e90b8] transition-colors duration-300"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      {service.shortTitle || service.title}
                    </h3>
                    <p className="text-[14px] text-[#6b7e9a] leading-relaxed flex-1">
                      {service.tagline}
                    </p>
                    <div
                      className="inline-flex items-center gap-1.5 mt-4 text-[12px] font-bold tracking-wide text-[#1e90b8] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      Learn more <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          // ── Fallback — hardcoded services (no Sanity content yet) ──
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: "#e8edf4", borderRadius: 8, overflow: "hidden" }}
          >
            {hardcodedServices.map((service) => {
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
        )}

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