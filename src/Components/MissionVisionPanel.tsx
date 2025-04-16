// src/Components/MissionVisionPanel.tsx
import React from 'react';

type MissionVisionPanelProps = {
  show: boolean;
  mobile: boolean;
};

const MissionVisionPanel: React.FC<MissionVisionPanelProps> = ({ show, mobile }) => {
  // Cuando show es false, en lugar de "cortar" la vista inmediatamente,
  // aplicamos una clase que hace la transición con transform y opacity.
  // No retornamos null directamente, pues así no habría animación de salida.

  // Contenido de la sección
  const content = (
    <>
      <h2 className="text-3xl text-center font-renogare mb-6 text-[#FFDD08]">
        Misión y Visión
      </h2>
      <div className="space-y-8">
        <div className="p-5 border-l-4 border-[#FFDD08] bg-[#1F322E]/95 rounded shadow-md">
          <h3 className="text-2xl font-renogare mb-2 text-[#FFDD08]">
            Nuestra Misión
          </h3>
          <p className="text-lg font-caviardreams leading-relaxed text-white">
            Nuestra misión es servir a la comunidad con integridad y compromiso, 
            mejorando la calidad de vida mediante iniciativas innovadoras.
          </p>
        </div>
        <div className="p-5 border-l-4 border-[#FFDD08] bg-[#1F322E]/95 rounded shadow-md">
          <h3 className="text-2xl font-renogare mb-2 text-[#FFDD08]">
            Nuestra Visión
          </h3>
          <p className="text-lg font-caviardreams leading-relaxed text-white">
            Nuestra visión es ser un referente en el desarrollo comunitario, 
            impulsando el progreso y bienestar para todos.
          </p>
        </div>
      </div>
    </>
  );

  // ---------------- LÓGICA DE ANIMACIÓN ----------------
  // Usamos distintas clases según estemos en modo "mostrar" (show === true) o no (show === false).
  // Esto permite que la transición dure un poco al ocultarse (animación de salida).

  if (mobile) {
    // En móvil, podemos hacerlo deslizar desde arriba (o desde abajo) usando translate-y.
    return (
      <div
        className={`
          fixed inset-x-0 top-0 h-[calc(100vh-4rem)]
          bg-gradient-to-b from-[#1F322E]/95 via-[#2A433E]/90 to-[#3B544A]/90
          text-white p-6 overflow-y-auto
          transition-all duration-500 ease-in-out
          ${show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        `}
      >
        {content}
      </div>
    );
  } else {
    // En desktop, lo centramos horizontalmente y deslizamos desde arriba.
    return (
      <div
        className={`
          fixed top-0 left-1/2 transform -translate-x-1/2
          bg-gradient-to-b from-[#1F322E]/95 via-[#2A433E]/90 to-[#3B544A]/90
          text-white p-5 rounded-b-xl shadow-2xl
          w-full sm:w-3/4 md:w-1/2 lg:w-1/2
          transition-all duration-500 ease-in-out
          ${show ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        `}
        style={{ maxHeight: '60vh', overflowY: 'auto' }}
      >
        {content}
      </div>
    );
  }
};

export default MissionVisionPanel;
