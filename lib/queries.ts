import { client } from "./sanity";

const NO_CACHE = { next: { revalidate: 0 } };

// ─── HERO ─────────────────────────────────────────────────────────────────────

export async function getHero() {
  return client.fetch(
    `*[_type == "hero" && page == "home"][0]{
      headline,
      subtitle,
      ctaPrimaryText,
      ctaPrimaryLink,
      ctaSecondaryText,
      ctaSecondaryLink,
      backgroundImage,
      overlayOpacity
    }`,
    {},
    NO_CACHE
  );
}

// ─── SERVICE IMAGES ───────────────────────────────────────────────────────────

export async function getServiceImages(): Promise<Record<string, string>> {
  const results = await client.fetch(
    `*[_type == "service"]{
      "slug": slug.current,
      "imageUrl": image.asset->url
    }`,
    {},
    NO_CACHE
  );
  return Object.fromEntries(
    results
      .filter((r: { slug: string; imageUrl: string }) => r.slug && r.imageUrl)
      .map((r: { slug: string; imageUrl: string }) => [r.slug, r.imageUrl])
  );
}

export async function getServiceImageBySlug(slug: string): Promise<string | null> {
  const result = await client.fetch(
    `*[_type == "service" && slug.current == $slug][0]{
      "imageUrl": image.asset->url
    }`,
    { slug },
    NO_CACHE
  );
  return result?.imageUrl ?? null;
}

// ─── BLOG ─────────────────────────────────────────────────────────────────────

export async function getAllPosts() {
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc){
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      category,
      author,
      excerpt,
      coverImage
    }`,
    {},
    NO_CACHE
  );
}

export async function getLatestPosts(count: number = 3) {
  return client.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc)[0...${count}]{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      category,
      excerpt,
      coverImage
    }`,
    {},
    NO_CACHE
  );
}

export async function getPostsByCategory(category: string) {
  return client.fetch(
    `*[_type == "blogPost" && category == $category] | order(publishedAt desc){
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      category,
      author,
      excerpt,
      coverImage
    }`,
    { category },
    NO_CACHE
  );
}

export async function getPostBySlug(slug: string) {
  return client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      category,
      author,
      excerpt,
      coverImage,
      body,
      seoTitle,
      seoDescription
    }`,
    { slug },
    NO_CACHE
  );
}

export async function getAllPostSlugs() {
  return client.fetch(
    `*[_type == "blogPost"]{ "slug": slug.current }`,
    {},
    NO_CACHE
  );
}