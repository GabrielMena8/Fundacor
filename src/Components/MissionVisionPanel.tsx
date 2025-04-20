// src/Components/MissionVisionPanel.tsx
import React from 'react';
import { sharedStyles } from '../styles/sharedStyles';

type MissionVisionPanelProps = {
  show: boolean;
  isMobile?: boolean;
};

const MissionVisionPanel: React.FC<MissionVisionPanelProps> = ({ show, isMobile }) => {
  // Contenido de la sección
  const content = (
    <>
      <div className="flex items-center justify-center mb-8 transition-all duration-700 ease-out"
           style={{ 
             opacity: show ? 1 : 0, 
             transform: show ? 'translateY(0)' : 'translateY(1rem)',
             transitionDelay: '150ms'
           }}>
        <div className={`w-16 h-1 ${sharedStyles.accentDivider}`}></div>
        <h2 className={`${sharedStyles.importantHeader} text-3xl text-center mx-4 ${sharedStyles.titleGlow}`}>
          Misión y Visión
        </h2>
        <div className={`w-16 h-1 ${sharedStyles.accentDivider}`}></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 ease-out"
           style={{ 
             opacity: show ? 1 : 0, 
             transform: show ? 'translateY(0)' : 'translateY(2rem)',
             transitionDelay: '300ms'
           }}>
        <div className="bg-gradient-to-br from-[#1F322E] to-[#3B544A] backdrop-blur-sm border-l-4 border-[#FFDD08] p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center mb-4">
            <div className="bg-[#FFDD08]/20 p-2 rounded-full mr-3 group-hover:bg-[#FFDD08]/30 transition-all duration-300">
              <svg className="w-6 h-6 text-[#FFDD08]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-[#FFDD08] text-xl md:text-2xl font-bold group-hover:text-[#FFDD08] transition-colors duration-300">
              Nuestra Misión
            </h3>
          </div>
          <p className="text-white/90 text-base md:text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
            Nuestra misión es servir a la comunidad con integridad y compromiso, 
            mejorando la calidad de vida mediante iniciativas innovadoras.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-[#1F322E] to-[#3B544A] backdrop-blur-sm border-l-4 border-[#FFDD08] p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group">
          <div className="flex items-center mb-4">
            <div className="bg-[#FFDD08]/20 p-2 rounded-full mr-3 group-hover:bg-[#FFDD08]/30 transition-all duration-300">
              <svg className="w-6 h-6 text-[#FFDD08]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-[#FFDD08] text-xl md:text-2xl font-bold group-hover:text-[#FFDD08] transition-colors duration-300">
              Nuestra Visión
            </h3>
          </div>
          <p className="text-white/90 text-base md:text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
            Nuestra visión es ser un referente en el desarrollo comunitario, 
            impulsando el progreso y bienestar para todos.
          </p>
        </div>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <div
        className={`
          fixed inset-x-0 top-0 h-[calc(100vh-4rem)] z-50
          bg-[#1F322E]/90 backdrop-blur-lg
          overflow-y-auto
          transform transition-all duration-700 ease-in-out
          ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
          shadow-lg shadow-black/20
        `}
        style={{
          willChange: 'transform, opacity'
        }}
      >
        <div className="p-4 md:p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#FFDD08]"></div>
              <h2 className="text-[#FFDD08] text-xl md:text-2xl font-bold tracking-wider">
                MISIÓN Y VISIÓN
              </h2>
              <div className="w-8 h-[2px] bg-[#FFDD08]"></div>
            </div>
            <p className="text-white/90 text-sm mb-6">
              Conoce nuestra filosofía y lo que nos impulsa
            </p>
          </div>
          
          <div className="space-y-4">
            <div 
              className="bg-gradient-to-br from-[#1F322E] to-[#3B544A] backdrop-blur-sm border-l-4 border-[#FFDD08] p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              style={{ 
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(1rem)',
                transition: 'all 0.5s ease-out',
                transitionDelay: '250ms'
              }}
            >
              <div className="flex items-center mb-3">
                <div className="bg-[#FFDD08]/20 p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-[#FFDD08]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-[#FFDD08] text-lg font-bold">
                  Nuestra Misión
                </h3>
              </div>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Nuestra misión es servir a la comunidad con integridad y compromiso, 
                mejorando la calidad de vida mediante iniciativas innovadoras.
              </p>
            </div>
            
            <div 
              className="bg-gradient-to-br from-[#1F322E] to-[#3B544A] backdrop-blur-sm border-l-4 border-[#FFDD08] p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              style={{ 
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(1rem)',
                transition: 'all 0.5s ease-out',
                transitionDelay: '350ms'
              }}
            >
              <div className="flex items-center mb-3">
                <div className="bg-[#FFDD08]/20 p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-[#FFDD08]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-[#FFDD08] text-lg font-bold">
                  Nuestra Visión
                </h3>
              </div>
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Nuestra visión es ser un referente en el desarrollo comunitario, 
                impulsando el progreso y bienestar para todos.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    // En desktop, lo centramos horizontalmente y deslizamos desde arriba.
    return (
      <div
        className={`
          fixed top-0 left-0 right-0 z-50
          bg-[#1F322E]/90 backdrop-blur-lg
          text-white p-8 overflow-y-auto
          transform transition-all duration-700 ease-in-out
          ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
          shadow-lg shadow-black/20
        `}
        style={{
          willChange: 'transform, opacity'
        }}
      >
        <div className="max-w-7xl mx-auto">
          {content}
        </div>
      </div>
    );
  }
};

export default MissionVisionPanel;
