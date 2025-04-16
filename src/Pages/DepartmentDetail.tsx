// src/Pages/DepartmentDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MemberCard, { Member } from '../Components/MemberCard';

type DepartmentData = {
  id: string;
  name: string;
  members: Member[];
};

const DepartmentDetail: React.FC = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const [department, setDepartment] = useState<DepartmentData | null>(null);

  useEffect(() => {
    const fetchDepartmentData = async () => {
      const simulatedData: { [key: string]: DepartmentData } = {
        contraloria: {
          id: 'contraloria',
          name: 'Contraloría',
          members: [
            {
              id: '1',
              name: 'Carlos López',
              position: 'Director de Contraloría',
              photo: '/Fotos/carlos-lopez.jpg',
            },
            {
              id: '2',
              name: 'Ana Martínez',
              position: 'Analista de Contraloría',
              photo: '/Fotos/ana-martinez.jpg',
            },
          ],
        },
        finanzas: {
          id: 'finanzas',
          name: 'Finanzas',
          members: [
            {
              id: '3',
              name: 'Roberto Gómez',
              position: 'Gerente Financiero',
              photo: '/Fotos/roberto-gomez.jpg',
            },
            {
              id: '4',
              name: 'Lucía Rodríguez',
              position: 'Contadora',
              photo: '/Fotos/lucia-rodriguez.jpg',
            },
          ],
        },
        'recursos-humanos': {
          id: 'recursos-humanos',
          name: 'Recursos Humanos',
          members: [
            {
              id: '5',
              name: 'Marina Pérez',
              position: 'Jefa de RRHH',
              photo: '/Fotos/marina-perez.jpg',
            },
          ],
        },
        'desarrollo-comunitario': {
          id: 'desarrollo-comunitario',
          name: 'Desarrollo Comunitario',
          members: [
            {
              id: '6',
              name: 'Miguel Díaz',
              position: 'Coordinador de Desarrollo Comunitario',
              photo: '/Fotos/miguel-diaz.jpg',
            },
          ],
        },
      };

      const data = simulatedData[departmentId || ''] || null;
      setDepartment(data);
    };

    fetchDepartmentData();
  }, [departmentId]);

  if (!department) {
    return (
      <div className="p-6 font-caviardreams text-[#FFDD08] bg-gradient-to-l from-[#1f322e]/90 via-[#2A433E]/85 to-[#3B544A]/80 min-h-screen">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-l from-[#1f322e]/90 via-[#2A433E]/85 to-[#3B544A]/80 p-6 font-caviardreams">
      <Link to="/" className="font-renogare text-[#FFDD08] hover:underline">
        ← Volver
      </Link>
      <h1 className="text-3xl font-renogare text-[#FFDD08] mt-4 mb-8 text-center">
        {department.name}
      </h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {department.members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default DepartmentDetail;
