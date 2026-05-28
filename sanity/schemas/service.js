// sanity/schemas/service.js
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: "service",
  title: "Services",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Service Title",
      type: "string",
      description: "e.g. 'GMDSS Radio Survey'",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "shortTitle",
      title: "Short Title",
      type: "string",
      description: "Shorter version shown on cards and nav (e.g. 'GMDSS Radio Survey')",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Auto-generated URL (e.g. /services/gmdss-radio-survey)",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "One-line summary shown on service cards (e.g. 'Certified surveys accepted by Lloyd's Register, BV, IRS & ZMA')",
      validation: (Rule) => Rule.required().max(150),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 5,
      description: "Full paragraph description shown on the service detail page",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "details",
      title: "What's Included",
      type: "array",
      description: "Checklist items shown on the service detail page",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "image",
      title: "Service Image",
      type: "image",
      description: "Image shown on the service card and detail page",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: "Lucide icon name (Radio, Wrench, Navigation, Cpu, Package, Anchor, Signal, Compass)",
      options: {
        list: [
          { title: "Radio", value: "Radio" },
          { title: "Wrench", value: "Wrench" },
          { title: "Navigation", value: "Navigation" },
          { title: "Cpu", value: "Cpu" },
          { title: "Package", value: "Package" },
          { title: "Anchor", value: "Anchor" },
          { title: "Signal", value: "Signal" },
          { title: "Compass", value: "Compass" },
        ],
        layout: "radio",
      },
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls the order services appear (1 = first)",
      initialValue: 1,
    },
    {
      name: "featured",
      title: "Show on Homepage",
      type: "boolean",
      description: "Show this service on the homepage services section",
      initialValue: true,
    },
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "tagline",
      media: "image",
    },
  },
};