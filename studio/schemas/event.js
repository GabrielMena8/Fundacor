export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', description: 'Event title' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, description: 'URL-friendly id', validation: (Rule) => Rule.required() },
    { name: 'date', title: 'Date', type: 'datetime', description: 'Start date and time of the event' },
    { name: 'description', title: 'Description', type: 'text', description: 'Full description or summary' },
  { name: 'excerpt', title: 'Excerpt', type: 'string', description: 'Short summary displayed in cards' },
    { name: 'image', title: 'Image', type: 'image', description: 'Hero image for the event', fields: [
      { name: 'alt', title: 'Alt Text', type: 'string', description: 'Alternative text for accessibility' },
      { name: 'caption', title: 'Caption', type: 'string' }
    ] },
    { name: 'location', title: 'Location', type: 'string', description: 'Venue or location name' },
    { name: 'department', title: 'Department', type: 'string', description: 'Associated department or area (free text)' },
    { name: 'participants', title: 'Participants', type: 'array', of: [
      { type: 'string', title: 'Participant Name' }
    ], description: 'List of participant names. Use member references only if needed.' },
    { name: 'featured', title: 'Featured', type: 'boolean', description: 'Mark event as featured for highlights' },
    { name: 'externalLink', title: 'External Link', type: 'url', description: 'Optional external URL for event registration or info' },
    { name: 'seo', title: 'SEO', type: 'object', fields: [
      { name: 'metaTitle', title: 'Meta Title', type: 'string' },
      { name: 'metaDescription', title: 'Meta Description', type: 'text' }
    ], options: { collapsible: true, collapsed: true } }
  ]
};
