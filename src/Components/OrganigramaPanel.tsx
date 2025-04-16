// src/Components/OrganigramaPanel.tsx
import React from 'react';

type OrganigramaPanelProps = {
  show: boolean;
  mobile: boolean;
};

const OrganigramaPanel: React.FC<OrganigramaPanelProps> = ({ show, mobile }) => {
  if (mobile) {
    return (
      <div className="bg-[#1f322e] text-white p-6 font-caviardreams">
        <h2 className="text-2xl font-renogare mb-4 text-[#ffdd08]">Organización</h2>
        <div className="overflow-y-auto">
          <h3 className="text-xl font-semibold mb-3 text-[#ffdd08]">Estructura Organizacional</h3>
          <p className="text-sm mb-4 leading-relaxed">
            FUNDACOR está organizada en diferentes áreas especializadas para asegurar 
            un funcionamiento eficiente y coordinado de todas nuestras actividades.
          </p>
          <h4 className="text-lg font-semibold mb-2 text-[#ffdd08]">Principales Departamentos:</h4>
          <ul className="list-disc list-inside mb-4 space-y-2">
            <li>Contraloría</li>
            <li>Finanzas</li>
            <li>Recursos Humanos</li>
            <li>Desarrollo Comunitario</li>
          </ul>
          <p className="leading-relaxed text-sm">
            Cada departamento trabaja en estrecha colaboración para cumplir 
            nuestra misión de servicio a la comunidad.
          </p>
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
          text-white p-6 font-caviardreams
        `}
        style={{ overflowY: 'auto' }}
      >
        <div className="flex flex-col text-justify h-auto rounded-bl-xl rounded-r-4xl p-4">
          <div className="flex-1 p-2">
            <h2 className="text-2xl text-center font-renogare font-bold mb-4 text-[#ffdd08]">
              ¿Quiénes somos?
            </h2>
            <p className="text-base leading-relaxed mb-6">
              La estructura organizacional de FUNDACOR está diseñada para maximizar 
              la eficiencia y el impacto de nuestras iniciativas comunitarias.
            </p>

            <h3 className="text-xl font-semibold mb-3 text-[#ffdd08]">Áreas Principales:</h3>
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="p-4 bg-[#1f322e]/80 border border-[#ffdd08]/20 rounded-lg shadow-md hover:border-[#ffdd08]/50 hover:border-2 transition-colors">
                <h4 className="font-semibold mb-2 text-[#ffdd08]">Contraloría</h4>
                <p className="text-sm leading-relaxed">
                  Supervisa y controla las operaciones financieras.
                </p>
              </div>
              <div className="p-4 bg-[#1f322e]/80 border border-[#ffdd08]/20 rounded-lg shadow-md hover:border-[#ffdd08]/50 hover:border-2 transition-colors">
                <h4 className="font-semibold mb-2 text-[#ffdd08]">Finanzas</h4>
                <p className="text-sm leading-relaxed">
                  Gestiona recursos y asegura la sostenibilidad financiera.
                </p>
              </div>
              <div className="p-4 bg-[#1f322e]/80 border border-[#ffdd08]/20 rounded-lg shadow-md hover:border-[#ffdd08]/50 hover:border-2 transition-colors">
                <h4 className="font-semibold mb-2 text-[#ffdd08]">Recursos Humanos</h4>
                <p className="text-sm leading-relaxed">
                  Gestiona el talento y desarrollo del personal.
                </p>
              </div>
              <div className="p-4 bg-[#1f322e]/80 border border-[#ffdd08]/20 rounded-lg shadow-md hover:border-[#ffdd08]/50 hover:border-2 transition-colors">
                <h4 className="font-semibold mb-2 text-[#ffdd08]">Desarrollo Comunitario</h4>
                <p className="text-sm leading-relaxed">
                  Coordina y ejecuta las iniciativas de desarrollo.
                </p>
              </div>
            </div>

            <p className="text-sm italic text-center text-[#ffdd08]/80">
              Trabajamos unidos para crear un impacto positivo en nuestra comunidad.
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default OrganigramaPanel;
