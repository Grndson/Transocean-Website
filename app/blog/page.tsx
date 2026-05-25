import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Marine Electronics Blog | Transocean Marine Surveyors Kenya",
  description:
    "Guides, news, and expert insights on GMDSS, AIS, EPIRB, and marine electronics compliance from Transocean Marine Surveyors.",
};

// TODO: Replace with real posts — or fetch from Sanity CMS once connected
const posts = [
  {
    slug: "what-is-gmdss",
    category: "GMDSS",
    title: "What is GMDSS and Why Does Your Vessel Need It?",
    excerpt:
      "The Global Maritime Distress and Safety System (GMDSS) is mandatory for most commercial vessels under SOLAS. Here is what it covers, and what your vessel needs to comply.",
    readTime: "5 min read",
    date: "Coming soon",
  },
  {
    slug: "epirb-programming-guide",
    category: "Safety Equipment",
    title: "EPIRB Programming: Why Correct Registration Matters",
    excerpt:
      "An incorrectly programmed EPIRB can delay search and rescue by hours. This guide explains what information must be correctly set and how to verify your registration.",
    readTime: "4 min read",
    date: "Coming soon",
  },
  {
    slug: "ais-class-a-vs-class-b",
    category: "AIS",
    title: "AIS Class A vs Class B: Which Does Your Vessel Need?",
    excerpt:
      "Understanding the difference between Class A and Class B AIS transponders, and the SOLAS regulations that determine which applies to your vessel type.",
    readTime: "6 min read",
    date: "Coming soon",
  },
  {
    slug: "nemo-vms-kenya-fishing",
    category: "NEMO VMS",
    title: "NEMO-VMS Requirements for Kenyan Fishing Vessels",
    excerpt:
      "Kenya Fisheries Service mandates VMS installation for licensed fishing vessels. Here is everything owners need to know about the NEMO-VMS system and compliance.",
    readTime: "5 min read",
    date: "Coming soon",
  },
  {
    slug: "lrit-explained",
    category: "LRIT",
    title: "LRIT Explained: Long-Range Vessel Tracking Under SOLAS",
    excerpt:
      "Long-Range Identification and Tracking (LRIT) is required for vessels on international voyages. This article explains the system, testing requirements, and common issues.",
    readTime: "7 min read",
    date: "Coming soon",
  },
  {
    slug: "gmdss-survey-checklist",
    category: "GMDSS",
    title: "GMDSS Survey Checklist: What Surveyors Inspect",
    excerpt:
      "Preparing for a GMDSS radio survey? This checklist covers every system that certified surveyors inspect, so your vessel passes first time.",
    readTime: "8 min read",
    date: "Coming soon",
  },
];

const categoryColors: Record<string, string> = {
  GMDSS: "#1e90b8",
  "Safety Equipment": "#c8a84b",
  AIS: "#1a6b8a",
  "NEMO VMS": "#1d3461",
  LRIT: "#1e90b8",
};

export default function BlogPage() {
  return (
    <>
      {/* Header */}
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
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <span
            className="block text-[11px] font-bold tracking-[0.2em] uppercase text-[#1e90b8] mb-4"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Resources &amp; Guides
          </span>
          <h1
            className="text-[clamp(36px,5vw,56px)] font-extrabold text-white leading-tight mb-6 max-w-[620px]"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Marine Electronics &amp; Compliance Insights
          </h1>
          <p className="text-white/55 text-[18px] leading-relaxed max-w-[540px]">
            Practical guides on GMDSS, AIS, EPIRB, and maritime compliance —
            written by East Africa&apos;s marine electronics specialists.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col border rounded-lg overflow-hidden transition-all hover:shadow-lg hover:border-[#1e90b8]"
                style={{ border: "1px solid #e8edf4" }}
              >
                {/* Category colour bar */}
                <div
                  className="h-1 w-full"
                  style={{ background: categoryColors[post.category] ?? "#1e90b8" }}
                />

                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="text-[11px] font-bold tracking-[0.1em] uppercase px-3 py-1 rounded-full"
                      style={{
                        fontFamily: "var(--font-syne)",
                        background: `${categoryColors[post.category] ?? "#1e90b8"}15`,
                        color: categoryColors[post.category] ?? "#1e90b8",
                      }}
                    >
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-[12px] text-[#8a9ab5]">
                      <Clock size={12} />
                      {post.readTime}
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
              </article>
            ))}
          </div>

          <div
            className="mt-16 p-10 rounded-lg text-center"
            style={{ background: "#f4f6f9", border: "1px solid #e8edf4" }}
          >
            <h3
              className="text-[20px] font-bold text-[#0a1628] mb-3"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              More articles coming soon
            </h3>
            <p className="text-[15px] text-[#6b7e9a] mb-6">
              We&apos;re publishing guides on marine electronics and compliance.
              In the meantime, get in touch with any questions.
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
