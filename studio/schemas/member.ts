/* eslint-disable @typescript-eslint/no-explicit-any */
export default {
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
  { name: 'name', title: 'Name', type: 'string', description: 'Full name of the member', validation: (Rule) => Rule.required() },
  { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, description: 'URL-friendly id generated from name', validation: (Rule) => Rule.required() },
    { name: 'role', title: 'Role', type: 'string', description: 'Position or title' },
    { name: 'department', title: 'Department', type: 'reference', to: [{ type: 'department' }], description: 'Reference to the department document' },
    { name: 'image', title: 'Image', type: 'image', description: 'Portrait or avatar image', options: { hotspot: true }, fields: [
  { name: 'alt', title: 'Alt Text', type: 'string', description: 'Alternative text for accessibility', validation: (Rule) => Rule.required() },
      { name: 'caption', title: 'Caption', type: 'string', description: 'Optional caption for the image' }
    ] },
    { name: 'description', title: 'Description', type: 'text', description: 'Short bio or responsibilities' },
    { name: 'seo', title: 'SEO', type: 'object', fields: [
      { name: 'metaTitle', title: 'Meta Title', type: 'string' },
      { name: 'metaDescription', title: 'Meta Description', type: 'text' }
    ], options: { collapsible: true, collapsed: true } }
  ]
};
