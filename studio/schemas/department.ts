export default {
  name: 'department',
  title: 'Department',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', description: 'Department or area name' },
    { name: 'description', title: 'Description', type: 'text', description: 'Optional description for the department' },
    { name: 'image', title: 'Image', type: 'image', description: 'Representative image or icon for the department' }
  ]
};
