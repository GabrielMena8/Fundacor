// src/Components/OrganigramaPanel.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMembers } from '../lib/sanity';
import type { Member, Department } from '../Types/sanity';

type OrganigramaPanelProps = {
  show: boolean;
  isMobile?: boolean;
};

const DEPARTMENT_HIERARCHY: { [key: string]: Department[] } = {
  'Dirección': ['Presidente', 'Director Ejecutivo', 'Asesor Externo', 'Secretario'],
  'Áreas Principales': ['Operaciones', 'Tesorería', 'Seguridad'],
  'Departamentos de Tesorería': ['Contraloría', 'Finanzas', 'Compras', 'R.R.H.H'],
  'Departamentos de Operaciones': ['Planificación', 'Logística', 'Tecnología y Comunicación', 'Seguridad Operativa', 'Mantenimiento']
};

export const OrganigramaPanel: React.FC<OrganigramaPanelProps> = ({ show }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersData = await getMembers();
        setMembers(membersData);
        setError(null);
      } catch (err) {
        console.error('Error fetching members:', err);
        setError('Failed to load members');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const getMemberCount = (department: Department) => {
    return members.filter(member => member.department === department).length;
  };

  return (
    <div 
      className="fixed md:left-0 inset-x-0 md:inset-x-auto top-0 bottom-0 w-full md:w-[400px] bg-[#1F322E]/90 backdrop-blur-lg shadow-2xl z-50 overflow-hidden"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        visibility: show ? 'visible' : 'hidden'
      }}
    >
      <div className="h-full overflow-y-auto">
        <div className="p-4 md:p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#FFDD08]"></div>
              <h2 className="text-[#FFDD08] text-xl md:text-2xl font-bold tracking-wider">
                ORGANIGRAMA
              </h2>
              <div className="w-8 h-[2px] bg-[#FFDD08]"></div>
            </div>
            <p className="text-white/90 text-sm mb-6">
              Conoce nuestro equipo y la estructura organizacional
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="w-12 h-12 border-4 border-[#FFDD08] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center text-white/80 min-h-[200px] flex items-center justify-center">
              <p>{error}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(DEPARTMENT_HIERARCHY).map(([section, departments], sectionIndex) => (
                <div key={section} className="space-y-3">
                  <h3 className="text-[#FFDD08] text-sm font-medium uppercase tracking-wider mb-2">
                    {section}
                  </h3>
                  <div className="space-y-2">
                    {departments.map((department, index) => (
                      <Link 
                        key={department}
                        to={`/departamento/${encodeURIComponent(department.toLowerCase())}`}
                        className="bg-gradient-to-br from-[#1F322E] to-[#3B544A] backdrop-blur-sm border-l-4 border-[#FFDD08] p-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98] flex items-center justify-between"
                        style={{ 
                          opacity: show ? 1 : 0,
                          transform: show ? 'translateX(0)' : 'translateX(-1rem)',
                          transition: 'all 0.5s ease-out',
                          transitionDelay: `${200 + (sectionIndex * 100) + (index * 50)}ms`
                        }}
                      >
                        <span className="text-white text-sm md:text-base font-bold leading-tight">{department}</span>
                        <span className="text-xs md:text-sm text-[#FFDD08] font-medium ml-3">
                          {getMemberCount(department)} miembros
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganigramaPanel;
