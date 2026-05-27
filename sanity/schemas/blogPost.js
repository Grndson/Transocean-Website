// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: "blogPost",
  title: "Blog Posts",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Post Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Auto-generated URL (e.g. /blog/gmdss-maintenance-tips)",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Marine Electronics", value: "marine-electronics" },
          { title: "Navigation Systems", value: "navigation-systems" },
          { title: "GMDSS", value: "gmdss" },
          { title: "Maintenance Tips", value: "maintenance-tips" },
          { title: "Industry News", value: "industry-news" },
          { title: "Regulations & Compliance", value: "regulations-compliance" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "author",
      title: "Author",
      type: "string",
      description: "Name of the person who wrote this post",
      initialValue: "Transocean Marine Surveyors",
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown on blog listing cards (under 200 characters)",
      validation: (Rule) => Rule.required().max(250),
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "Main image shown on the blog card and at the top of the post",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "body",
      title: "Post Content",
      type: "array",
      description: "Full blog post content — supports headings, bold, lists, and images",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
          // Inline images within the blog post body
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Optional caption shown below the image",
            },
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
              description: "Describe the image for accessibility and SEO",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Optional: custom title for search engines (defaults to post title if left blank)",
      group: "seo",
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      description: "Short description for Google search results (150-160 characters ideal)",
      validation: (Rule) => Rule.max(160),
      group: "seo",
    },
  ],
  groups: [
    { name: "seo", title: "SEO" },
  ],
  orderings: [
    {
      title: "Newest First",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "coverImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toDateString() : "No date",
        media,
      };
    },
  },
};