// app/services/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Radio, Wrench, Navigation, Cpu, Package,
  Anchor, Signal, Compass, ArrowRight,
} from "lucide-react";
import { client, urlFor } from "@/lib/sanity";
import { services as hardcodedServices } from "@/lib/services";
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

interface SanityService {
  _id: string;
  title: string;
  shortTitle: string;
  slug: string;
  tagline: string;
  image?: object;
  icon?: string;
}

async function getAllServices(): Promise<SanityService[]> {
  try {
    const results = await client.fetch(
      `*[_type == "service"] | order(order asc){
        _id,
        title,
        shortTitle,
        "slug": slug.current,
        tagline,
        image,
        icon
      }`,
      {},
      { next: { revalidate: 0 } }
    );
    return results?.length > 0 ? results : [];
  } catch {
    return [];
  }
}

export default async function ServicesPage() {
  const sanityServices = await getAllServices();
  const hasSanityServices = sanityServices.length > 0;

  return (
    <>
      <PageHero
        page="services"
        defaultLabel="What We Offer"
        defaultHeadline="Marine Electronics & Survey Services"
        defaultSubtitle="Certified solutions for vessel compliance, communication, and navigation — covering every system onboard, from GMDSS to AIS."
      />

      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {hasSanityServices ? (
            // ── Sanity services with images ──────────────────────
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sanityServices.map((service) => {
                const Icon = iconMap[service.icon ?? "Anchor"] ?? Anchor;
                return (
                  <Link
                    key={service._id}
                    href={`/services/${service.slug}`}
                    className="group flex flex-col border rounded-xl overflow-hidden transition-all duration-300 hover:border-[#1e90b8] hover:shadow-lg"
                    style={{ border: "1px solid #e8edf4" }}
                  >
                    {/* Image */}
                    {service.image ? (
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={urlFor(service.image).width(600).height(400).url()}
                          alt={service.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div
                          className="absolute top-3 left-3 w-9 h-9 rounded flex items-center justify-center"
                          style={{ background: "rgba(10,22,40,0.7)" }}
                        >
                          <Icon size={18} className="text-[#1e90b8]" strokeWidth={1.6} />
                        </div>
                      </div>
                    ) : (
                      <div
                        className="h-40 flex items-center justify-center"
                        style={{ background: "#f4f6f9" }}
                      >
                        <Icon size={40} className="text-[#1a6b8a]" strokeWidth={1.4} />
                      </div>
                    )}

                    <div className="p-7 flex flex-col flex-1">
                      <h2
                        className="text-[17px] font-bold text-[#0a1628] mb-3 group-hover:text-[#1e90b8] transition-colors"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {service.shortTitle || service.title}
                      </h2>
                      <p className="text-[14px] text-[#6b7e9a] leading-relaxed flex-1 mb-5">
                        {service.tagline}
                      </p>
                      {/* ✦ Always visible — arrow slides on hover */}
                      <div
                        className="inline-flex items-center gap-2 text-[13px] font-bold tracking-wide text-[#1e90b8] group-hover:gap-3 transition-all duration-300"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        View Service <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            // ── Fallback hardcoded services ───────────────────────
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hardcodedServices.map((service) => {
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
                    {/* ✦ Always visible */}
                    <div
                      className="inline-flex items-center gap-2 text-[13px] font-bold tracking-wide text-[#1e90b8] group-hover:gap-3 transition-all duration-300"
                      style={{ fontFamily: "var(--font-syne)" }}
                    >
                      View Service <ArrowRight size={14} />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}