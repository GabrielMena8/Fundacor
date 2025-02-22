// src/Components/MissionVisionPanel.tsx
import React from 'react';

type MissionVisionPanelProps = {
  show: boolean;
  mobile: boolean;
};

const MissionVisionPanel: React.FC<MissionVisionPanelProps> = ({ show, mobile }) => {
  if (mobile) {
    return (
      <div className="bg-gradient-to-b from-[#1F322E] via-[#2A433E] to-[#3B544A] text-white p-6 font-caviardreams">
        <h2 className="text-2xl font-renogare mb-4 text-center">Misión y Visión</h2>
        <p className="text-base leading-relaxed mb-4">
          Nuestra misión es servir a la comunidad con integridad y compromiso, mejorando la calidad de vida mediante iniciativas innovadoras.
        </p>
        <p className="text-base leading-relaxed">
          Nuestra visión es ser un referente en el desarrollo comunitario, impulsando el progreso y bienestar para todos.
        </p>
      </div>
    );
  } else {
    return (
      <div
        className={`
          fixed top-0 left-0 w-full h-auto
          transform transition-transform duration-500 ease-in-out
          ${show ? 'translate-y-0' : '-translate-y-full'}
          bg-gradient-to-b from-[#1F322E]/80 via-[#2A433E]/70 to-[#3B544A]/70
          text-white p-6 font-caviardreams
        `}
        style={{ overflowY: 'auto' }}
      >
        <h2 className="text-2xl font-renogare mb-4 text-center">Misión y Visión</h2>
        <p className="text-base leading-relaxed mb-4">
          Nuestra misión es servir a la comunidad con integridad y compromiso, mejorando la calidad de vida mediante iniciativas innovadoras.
        </p>
        <p className="text-base leading-relaxed">
          Nuestra visión es ser un referente en el desarrollo comunitario, impulsando el progreso y bienestar para todos.
        </p>
      </div>
    );
  }
};

export default MissionVisionPanel;
