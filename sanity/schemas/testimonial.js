// sanity/schemas/testimonial.js

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Client Name",
      type: "string",
      description: "e.g. Capt. K. Mwangi",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "role",
      title: "Role & Company",
      type: "string",
      description: "e.g. Fleet Manager, East Africa Shipping",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "text",
      title: "Testimonial",
      type: "text",
      rows: 4,
      description: "What the client said",
      validation: (Rule) => Rule.required().max(400),
    },
    {
      name: "rating",
      title: "Star Rating",
      type: "number",
      description: "Rating out of 5",
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
    },
    {
      name: "featured",
      title: "Show on Homepage",
      type: "boolean",
      description: "Only featured testimonials appear on the homepage",
      initialValue: true,
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls order on the page (1 = first)",
      initialValue: 1,
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
      title: "name",
      subtitle: "role",
    },
  },
};