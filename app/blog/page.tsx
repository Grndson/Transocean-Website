import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import CtaBanner from "@/components/CtaBanner";
import PageHero from "@/components/PageHero";
import { getAllPosts } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";

interface Post {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  coverImage?: object;
}

export const metadata: Metadata = {
  title: "Marine Electronics Blog | Transocean Marine Surveyors Kenya",
  description:
    "Guides, news, and expert insights on GMDSS, AIS, EPIRB, and marine electronics compliance from Transocean Marine Surveyors.",
};

const categoryColors: Record<string, string> = {
  "marine-electronics": "#1e90b8",
  "navigation-systems": "#1a6b8a",
  "gmdss": "#1e90b8",
  "maintenance-tips": "#c8a84b",
  "industry-news": "#1d3461",
  "regulations-compliance": "#c8a84b",
};

const categoryLabels: Record<string, string> = {
  "marine-electronics": "Marine Electronics",
  "navigation-systems": "Navigation Systems",
  "gmdss": "GMDSS",
  "maintenance-tips": "Maintenance Tips",
  "industry-news": "Industry News",
  "regulations-compliance": "Regulations & Compliance",
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getAllPosts().catch(() => []);
  const hasSanityPosts = posts && posts.length > 0;

  return (
    <>
      <PageHero
        page="blog"
        defaultLabel="Resources & Guides"
        defaultHeadline="Marine Electronics & Compliance Insights"
        defaultSubtitle="Practical guides on GMDSS, AIS, EPIRB, and maritime compliance — written by East Africa's marine electronics specialists."
      />

      {/* Posts grid */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          {hasSanityPosts ? (
            // ── Sanity posts ─────────────────────────────────────
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {posts.map((post: Post) => {
                const color = categoryColors[post.category] ?? "#1e90b8";
                const label = categoryLabels[post.category] ?? post.category;
                return (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col border rounded-lg overflow-hidden transition-all hover:shadow-lg hover:border-[#1e90b8]"
                    style={{ border: "1px solid #e8edf4" }}
                  >
                    {/* Cover image */}
                    {post.coverImage && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={urlFor(post.coverImage).width(600).height(400).url()}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    )}

                    {/* Color bar */}
                    <div className="h-1 w-full" style={{ background: color }} />

                    <div className="p-7 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-5">
                        <span
                          className="text-[11px] font-bold tracking-[0.1em] uppercase px-3 py-1 rounded-full"
                          style={{
                            fontFamily: "var(--font-syne)",
                            background: `${color}15`,
                            color,
                          }}
                        >
                          {label}
                        </span>
                        <div className="flex items-center gap-1.5 text-[12px] text-[#8a9ab5]">
                          <Clock size={12} />
                          {formatDate(post.publishedAt)}
                        </div>
                      </div>

                      <h2
                        className="text-[17px] font-bold text-[#0a1628] mb-3 leading-snug group-hover:text-[#1e90b8] transition-colors"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {post.title}
                      </h2>

                      <p className="text-[14px] text-[#6b7e9a] leading-relaxed flex-1 mb-6">
                        {post.excerpt}
                      </p>

                      <div
                        className="inline-flex items-center gap-2 text-[13px] font-bold text-[#1e90b8]"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        Read Article <ArrowRight size={13} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            // ── Placeholder posts (no Sanity content yet) ────────
            <div className="text-center py-16">
              <p className="text-[16px] text-[#6b7e9a] mb-6">
                No articles published yet. Check back soon.
              </p>
            </div>
          )}

          {/* CTA banner at bottom */}
          <div
            className="mt-16 p-10 rounded-lg text-center"
            style={{ background: "#f4f6f9", border: "1px solid #e8edf4" }}
          >
            <h3
              className="text-[20px] font-bold text-[#0a1628] mb-3"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              {hasSanityPosts ? "Have a question about your vessel?" : "More articles coming soon"}
            </h3>
            <p className="text-[15px] text-[#6b7e9a] mb-6">
              {hasSanityPosts
                ? "Our team of certified marine electronics specialists is ready to help."
                : "We're publishing guides on marine electronics and compliance. In the meantime, get in touch with any questions."}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded font-bold text-[14px] text-white transition-all hover:-translate-y-0.5"
              style={{ fontFamily: "var(--font-syne)", background: "#1e90b8" }}
            >
              Ask Us a Question <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}