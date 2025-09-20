export default {
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', description: 'Full name of the member', validation: (Rule) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, description: 'URL-friendly id generated from name', validation: (Rule) => Rule.required() },
    { name: 'role', title: 'Role', type: 'string', description: 'Position or title' },
  { name: 'department', title: 'Department', type: 'string', description: 'Department or role as free text' },
    { name: 'image', title: 'Image', type: 'image', description: 'Portrait or avatar image', options: { hotspot: true }, fields: [
      { name: 'alt', title: 'Alt Text', type: 'string', description: 'Alternative text for accessibility', validation: (Rule) => Rule.required() },
      { name: 'caption', title: 'Caption', type: 'string', description: 'Optional caption for the image' }
    ] },
    { name: 'description', title: 'Description', type: 'text', description: 'Short bio or responsibilities' },
    { name: 'contact', title: 'Contact', type: 'object', fields: [
      { name: 'email', title: 'Email', type: 'string' },
      { name: 'phone', title: 'Phone', type: 'string' },
      { name: 'twitter', title: 'Twitter', type: 'url' },
      { name: 'facebook', title: 'Facebook', type: 'url' }
    ], options: { collapsible: true, collapsed: true } },
    { name: 'seo', title: 'SEO', type: 'object', fields: [
      { name: 'metaTitle', title: 'Meta Title', type: 'string' },
      { name: 'metaDescription', title: 'Meta Description', type: 'text' }
    ], options: { collapsible: true, collapsed: true } }
  ]
};
