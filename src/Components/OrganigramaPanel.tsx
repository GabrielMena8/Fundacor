// src/Components/OrganigramaPanel.tsx
import React from 'react';
import DepartmentCard, { DepartmentItem } from './DepartmentCard';

type OrganigramaPanelProps = {
  show: boolean;
  mobile: boolean;
};

const departments: DepartmentItem[] = [
  { id: 'contraloria', name: 'Contraloría' },
  { id: 'finanzas', name: 'Finanzas' },
  { id: 'recursos-humanos', name: 'Recursos Humanos' },
  { id: 'desarrollo-comunitario', name: 'Desarrollo Comunitario' },
];

const OrganigramaPanel: React.FC<OrganigramaPanelProps> = ({ show, mobile }) => {
  if (mobile) {
    return (
      <div className="bg-[#1f322e] text-white p-6 font-caviardreams overflow-y-auto h-[calc(100vh-4rem)]">
        <h2 className="text-2xl font-renogare mb-4 text-[#FFDD08]">Organización</h2>
        <p className="text-sm mb-4 leading-relaxed">
          FUNDACOR está organizada en diferentes áreas especializadas para asegurar un funcionamiento eficiente y coordinado de todas nuestras actividades.
        </p>
        <h3 className="text-xl font-semibold mb-3 text-[#FFDD08]">Principales Departamentos:</h3>
        <div className="space-y-4">
          {departments.map((dept) => (
            <DepartmentCard key={dept.id} department={dept} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`
          fixed top-0 left-0 h-full w-full sm:w-1/2 md:w-1/3 lg:w-1/4
          transform transition-transform duration-500 ease-in-out
          ${show ? 'translate-x-0' : '-translate-x-full'}
          bg-gradient-to-r from-[#1f322e]/90 via-[#2A433E]/85 to-[#3B544A]/80
          text-white p-6 font-caviardreams overflow-y-auto
        `}
      >
        <div className="flex flex-col h-auto rounded-bl-xl rounded-r-4xl p-4">
          <h2 className="text-2xl text-center font-renogare font-bold mb-4 text-[#FFDD08]">
            ¿Quiénes somos?
          </h2>
          <p className="text-base leading-relaxed mb-6">
            La estructura organizacional de FUNDACOR está diseñada para maximizar la eficiencia y el impacto de nuestras iniciativas comunitarias.
          </p>
          <h3 className="text-xl font-semibold mb-3 text-[#FFDD08]">Áreas Principales:</h3>
          <div className="grid grid-cols-1 gap-4">
            {departments.map((dept) => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
          <p className="text-sm italic text-center text-[#FFDD08]/80 mt-4">
            Trabajamos unidos para crear un impacto positivo en nuestra comunidad.
          </p>
        </div>
      </div>
    );
  }
};

export default OrganigramaPanel;
