import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Page Not Found | Transocean Marine Surveyors",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-[#0a1628] py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 70% at 80% 50%, rgba(30,144,184,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
        <p
          className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#c8a84b]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Error 404
        </p>
        <h1
          className="mb-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          We can&apos;t find that page
        </h1>
        <p className="mx-auto mb-9 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
          The page may have moved or the address may be incorrect. Choose a
          destination below, or call us and we&apos;ll be happy to help.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded bg-[#1e90b8] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#18799b]"
          >
            <ArrowLeft size={17} />
            Home
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Explore our services
            <ArrowRight size={17} />
          </Link>
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center gap-2 rounded border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
          >
            <Phone size={17} />
            Call {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
