// sanity/schemas/hero.js
// One document per page — identified by the "page" field

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: "hero",
  title: "Page Heroes",
  type: "document",
  fields: [
    {
      name: "page",
      title: "Page",
      type: "string",
      description: "Which page this hero belongs to",
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "Services", value: "services" },
          { title: "About", value: "about" },
          { title: "Blog", value: "blog" },
          { title: "Contact", value: "contact" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "label",
      title: "Label (small text above heading)",
      type: "string",
      description: "e.g. 'What We Offer' or 'Our Story'",
    },
    {
      name: "headline",
      title: "Headline",
      type: "string",
      description: "Main heading on the hero",
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "text",
      rows: 3,
      description: "Supporting text below the headline",
      validation: (Rule) => Rule.max(300),
    },
    {
      name: "ctaPrimaryText",
      title: "Primary Button Text",
      type: "string",
      description: "Only used on homepage hero",
    },
    {
      name: "ctaPrimaryLink",
      title: "Primary Button Link",
      type: "string",
      description: "e.g. /contact",
    },
    {
      name: "ctaSecondaryText",
      title: "Secondary Button Text",
      type: "string",
      description: "Only used on homepage hero",
    },
    {
      name: "ctaSecondaryLink",
      title: "Secondary Button Link",
      type: "string",
    },
    {
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      description: "Full-width background image for this hero",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "overlayOpacity",
      title: "Dark Overlay Strength",
      type: "number",
      description: "0 = no overlay, 100 = fully black. Recommended: 50-70",
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 60,
    },
  ],
  preview: {
    select: {
      title: "page",
      subtitle: "headline",
      media: "backgroundImage",
    },
    prepare({ title, subtitle, media }) {
      const pageLabels = {
        home: "🏠 Home",
        services: "🔧 Services",
        about: "👥 About",
        blog: "📝 Blog",
        contact: "📞 Contact",
      };
      return {
        title: pageLabels[title] || title,
        subtitle,
        media,
      };
    },
  },
};