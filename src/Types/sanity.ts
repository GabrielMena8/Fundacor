export type SanityImage = {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
};

export type Department = 
  | 'Presidente'
  | 'Director Ejecutivo'
  | 'Asesor Externo'
  | 'Secretario'
  | 'Operaciones'
  | 'Tesorería'
  | 'Seguridad'
  | 'Contraloría'
  | 'Finanzas'
  | 'Compras'
  | 'R.R.H.H'
  | 'Planificación'
  | 'Logística'
  | 'Tecnología y Comunicación'
  | 'Seguridad Operativa'
  | 'Mantenimiento';

export type Member = {
  _id: string;
  _type: 'member';
  name: string;
  role: string;
  department: string;
  image: SanityImage;
  description: string;
};

export type Event = {
  _id: string;
  _type: 'event';
  title: string;
  date: string;
  description: string;
  image: SanityImage;
  location: string;
  department?: Department;
  participants: Member[];
}; 