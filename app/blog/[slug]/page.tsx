import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User, Tag } from "lucide-react";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponentProps, PortableTextMarkComponentProps } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { getPostBySlug, getAllPostSlugs } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import CtaBanner from "@/components/CtaBanner";

interface Props {
  params: Promise<{ slug: string }>;
}

interface SanityImageValue {
  asset: object;
  alt?: string;
  caption?: string;
}

interface LinkValue {
  _type: string;
  href: string;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.seoTitle || `${post.title} | Transocean Marine Surveyors`,
    description: post.seoDescription || post.excerpt,
  };
}

const categoryLabels: Record<string, string> = {
  "marine-electronics": "Marine Electronics",
  "navigation-systems": "Navigation Systems",
  "gmdss": "GMDSS",
  "maintenance-tips": "Maintenance Tips",
  "industry-news": "Industry News",
  "regulations-compliance": "Regulations & Compliance",
};

const categoryColors: Record<string, string> = {
  "marine-electronics": "#1e90b8",
  "navigation-systems": "#1a6b8a",
  "gmdss": "#1e90b8",
  "maintenance-tips": "#c8a84b",
  "industry-news": "#1d3461",
  "regulations-compliance": "#c8a84b",
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const portableTextComponents = {
  block: {
    normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="text-[16px] text-[#2c3e5a] leading-relaxed mb-5">{children}</p>
    ),
    h2: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h2
        className="text-[24px] font-bold text-[#0a1628] mt-10 mb-4"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h3
        className="text-[20px] font-bold text-[#0a1628] mt-8 mb-3"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <blockquote className="border-l-4 border-[#1e90b8] pl-5 py-1 my-6 text-[#6b7e9a] italic text-[16px]">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: PortableTextMarkComponentProps) => (
      <strong className="font-bold text-[#0a1628]">{children}</strong>
    ),
    em: ({ children }: PortableTextMarkComponentProps) => (
      <em className="italic">{children}</em>
    ),
    underline: ({ children }: PortableTextMarkComponentProps) => (
      <span className="underline">{children}</span>
    ),
    link: ({ value, children }: PortableTextMarkComponentProps<LinkValue>) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#1e90b8] underline underline-offset-2 hover:text-[#1a6b8a] transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: PortableTextComponentProps<SanityImageValue>) => (
      <div className="my-8 rounded-lg overflow-hidden">
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt || ""}
          width={800}
          height={500}
          className="w-full object-cover"
        />
        {value.caption && (
          <p className="text-center text-[13px] text-[#8a9ab5] mt-2 italic">
            {value.caption}
          </p>
        )}
      </div>
    ),
  },
  list: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ul className="space-y-2 mb-5 ml-4">{children}</ul>
    ),
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ol className="space-y-2 mb-5 ml-4 list-decimal">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <li className="flex items-start gap-2 text-[15px] text-[#2c3e5a]">
        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1e90b8] flex-shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <li className="text-[15px] text-[#2c3e5a] leading-relaxed">{children}</li>
    ),
  },
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post) notFound();

  const color = categoryColors[post.category] ?? "#1e90b8";
  const label = categoryLabels[post.category] ?? post.category;

  return (
    <>
      {/* Hero */}
      <section
        className="pt-[120px] pb-0 relative overflow-hidden"
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
        <div className="relative z-10 max-w-3xl mx-auto px-6 pb-16">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-[13px] transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to Blog
          </Link>

          {/* Category */}
          <span
            className="inline-block text-[11px] font-bold tracking-[0.1em] uppercase px-3 py-1 rounded-full mb-5"
            style={{
              fontFamily: "var(--font-syne)",
              background: `${color}25`,
              color,
            }}
          >
            {label}
          </span>

          {/* Title */}
          <h1
            className="text-[clamp(28px,4vw,44px)] font-extrabold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 text-[13px] text-white/40">
            <span className="flex items-center gap-1.5">
              <User size={13} />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag size={13} />
              {label}
            </span>
          </div>
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div className="relative max-w-4xl mx-auto px-6">
            <div className="relative h-[300px] sm:h-[420px] rounded-t-xl overflow-hidden">
              <Image
                src={urlFor(post.coverImage).width(1200).height(600).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          </div>
        )}
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          {/* Excerpt */}
          <p className="text-[18px] text-[#1a6b8a] leading-relaxed mb-10 font-medium border-l-4 border-[#1e90b8] pl-5">
            {post.excerpt}
          </p>

          {/* Body */}
          {post.body && (
            <div>
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            </div>
          )}

          {/* Bottom nav */}
          <div className="mt-16 pt-8 border-t border-[#e8edf4] flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#6b7e9a] hover:text-[#0a1628] transition-colors"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              <ArrowLeft size={14} />
              All Articles
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded font-bold text-[13px] text-white transition-all hover:-translate-y-0.5"
              style={{ fontFamily: "var(--font-syne)", background: "#1e90b8" }}
            >
              Ask Us a Question
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}