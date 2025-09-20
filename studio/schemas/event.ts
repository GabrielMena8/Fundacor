export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', description: 'Event title' },
    { name: 'date', title: 'Date', type: 'datetime', description: 'Start date and time of the event' },
    { name: 'description', title: 'Description', type: 'text', description: 'Full description or summary' },
    { name: 'image', title: 'Image', type: 'image', description: 'Hero image for the event' },
    { name: 'location', title: 'Location', type: 'string', description: 'Venue or location name' },
    { name: 'department', title: 'Department', type: 'reference', to: [{ type: 'department' }], description: 'Associated department' },
    { name: 'participants', title: 'Participants', type: 'array', of: [{ type: 'reference', to: [{ type: 'member' }] }], description: 'People involved or attending' }
  ]
};
