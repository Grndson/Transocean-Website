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
      description: "Shorter version shown on cards (e.g. 'GMDSS Maintenance')",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Auto-generated URL (e.g. /services/gmdss-maintenance)",
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
      description: "One-line summary shown on service cards (under 150 characters)",
      validation: (Rule) => Rule.required().max(150),
    },
    {
      name: "description",
      title: "Service Overview",
      type: "text",
      rows: 5,
      description: "Full paragraph shown on the service detail page under 'Service Overview'",
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
      description: "Image shown on the service card and detail page hero",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Icon shown alongside the service",
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
      title: "Featured Service",
      type: "boolean",
      description: "Show this service prominently on the homepage",
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