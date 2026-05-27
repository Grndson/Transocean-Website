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
      description: "e.g. 'GMDSS Equipment Servicing'",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Auto-generated URL for this service page (e.g. /services/gmdss-equipment-servicing)",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Brief summary shown on service cards (keep under 150 characters)",
      validation: (Rule) => Rule.required().max(200),
    },
    {
      name: "fullDescription",
      title: "Full Description",
      type: "array",
      description: "Detailed content shown on the individual service page",
      of: [
        {
          type: "block", // rich text — supports bold, lists, headings etc.
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
          },
        },
      ],
    },
    {
      name: "image",
      title: "Service Image",
      type: "image",
      description: "Image shown on the service card and detail page",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: "Lucide icon name to show alongside the service (e.g. 'radio', 'anchor', 'radar', 'wrench', 'satellite')",
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls the order services appear on the page (1 = first)",
      initialValue: 1,
    },
    {
      name: "featured",
      title: "Featured Service",
      type: "boolean",
      description: "Show this service prominently on the homepage",
      initialValue: false,
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
      subtitle: "shortDescription",
      media: "image",
    },
  },
};