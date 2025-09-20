// Seed script for Fundacor Sanity project
// Usage: set environment variable SANITY_WRITE_TOKEN then run `node studio/scripts/seed.js`

const projectId = process.env.SANITY_PROJECT_ID || 'ut4uykcs';
const dataset = process.env.SANITY_DATASET || 'production';
const apiVersion = process.env.SANITY_API_VERSION || '2024-03-19';
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error('Missing SANITY_WRITE_TOKEN environment variable.');
  process.exit(1);
}

const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}?returnIds=true`;

function slugify(str) {
  return str
    .toString()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Define departments needed by members/events and map to deterministic IDs
const departmentNames = [
  'Dirección',
  'Operaciones',
  'Comunicación',
  'Tesorería',
  'Capacitación',
  'Salud'
];

const departments = departmentNames.map((name) => ({
  _id: `department-${slugify(name)}`,
  _type: 'department',
  name
}));

// Build a quick lookup for references
const deptRef = Object.fromEntries(
  departments.map((d) => [d.name, { _type: 'reference', _ref: d._id }])
);

const members = [
  {
    _id: 'member-maria-perez',
    _type: 'member',
    name: 'María Pérez',
    slug: { _type: 'slug', current: 'maria-perez' },
    role: 'Directora Ejecutiva',
    department: deptRef['Dirección'],
    description: 'Lidera la fundación con enfoque en alianzas y programas sociales.'
  },
  {
    _id: 'member-carlos-gomez',
    _type: 'member',
    name: 'Carlos Gómez',
    slug: { _type: 'slug', current: 'carlos-gomez' },
    role: 'Coordinador de Proyectos',
    department: deptRef['Operaciones'],
    description: 'Coordina proyectos comunitarios y talleres educativos.'
  },
  {
    _id: 'member-ana-rodriguez',
    _type: 'member',
    name: 'Ana Rodríguez',
    slug: { _type: 'slug', current: 'ana-rodriguez' },
    role: 'Responsable de Comunicaciones',
    department: deptRef['Comunicación'],
    description: 'Encargada de comunicación institucional y relaciones públicas.'
  },
  {
    _id: 'member-jorge-martinez',
    _type: 'member',
    name: 'Jorge Martínez',
    slug: { _type: 'slug', current: 'jorge-martinez' },
    role: 'Tesorería',
    department: deptRef['Tesorería'],
    description: 'Gestión financiera y contabilidad de proyectos.'
  }
];

const memberRefByName = {
  'María Pérez': { _type: 'reference', _ref: 'member-maria-perez' },
  'Carlos Gómez': { _type: 'reference', _ref: 'member-carlos-gomez' },
  'Ana Rodríguez': { _type: 'reference', _ref: 'member-ana-rodriguez' },
  'Jorge Martínez': { _type: 'reference', _ref: 'member-jorge-martinez' }
};

const events = [
  {
    _id: 'event-jornada-educacion-ambiental',
    _type: 'event',
    title: 'Jornada de Educación Ambiental',
    slug: { _type: 'slug', current: 'jornada-educacion-ambiental' },
    date: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    description: 'Actividades para toda la familia con talleres interactivos, charlas y limpieza de espacios públicos.',
    location: 'Parque Central',
    department: deptRef['Operaciones'],
    participants: [memberRefByName['María Pérez'], memberRefByName['Carlos Gómez']]
  },
  {
    _id: 'event-taller-emprendimiento-local',
    _type: 'event',
    title: 'Taller de Emprendimiento Local',
    slug: { _type: 'slug', current: 'taller-emprendimiento-local' },
    date: new Date(Date.now() + 21 * 24 * 3600 * 1000).toISOString(),
    description: 'Curso intensivo de 2 días para desarrollar ideas de negocio y acceso a financiamiento.',
    location: 'Centro Cultural',
    department: deptRef['Capacitación'],
    participants: [memberRefByName['Ana Rodríguez']]
  },
  {
    _id: 'event-campana-salud-comunitaria',
    _type: 'event',
    title: 'Campaña de Salud Comunitaria',
    slug: { _type: 'slug', current: 'campana-salud-comunitaria' },
    date: new Date(Date.now() + 35 * 24 * 3600 * 1000).toISOString(),
    description: 'Servicios de salud gratuitos y actividades de prevención para la comunidad.',
    location: 'Sede Fundacor',
    department: deptRef['Salud'],
    participants: [memberRefByName['Jorge Martínez']]
  }
];

async function run() {
  try {
    // Idempotent upserts using deterministic IDs and proper references
    const mutations = [
      // Departments first
      ...departments.map((doc) => ({ createIfNotExists: doc })),
      // Members next (referencing departments)
      ...members.map((doc) => ({ createIfNotExists: doc })),
      // Events last (referencing departments and members)
      ...events.map((doc) => ({ createIfNotExists: doc }))
    ];
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ mutations })
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('Sanity API error:', data);
      process.exit(1);
    }

    console.log('Seed complete. Response:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error seeding documents:', err);
    process.exit(1);
  }
}

run();
