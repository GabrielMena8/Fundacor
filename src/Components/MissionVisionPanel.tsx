// src/Components/MissionVisionPanel.tsx
import React from 'react';
import { sharedStyles } from '../styles/sharedStyles';

type MissionVisionPanelProps = {
  show: boolean;
  mobile: boolean;
};

const MissionVisionPanel: React.FC<MissionVisionPanelProps> = ({ show, mobile }) => {
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
        <div className="group p-6 border-l-4 border-[#FFDD08] bg-gradient-to-br from-[#1F322E] to-[#2A433E] rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#FFDD08]/20 transition-all duration-500 transform hover:scale-[1.02]">
          <div className="flex items-center mb-4">
            <div className="bg-[#FFDD08]/20 p-2 rounded-full mr-3 group-hover:bg-[#FFDD08]/30 transition-all duration-300">
              <svg className="w-6 h-6 text-[#FFDD08]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className={`${sharedStyles.sectionTitle} text-2xl group-hover:text-[#FFDD08] transition-colors duration-300 ${sharedStyles.titleGlow}`}>
              Nuestra Misión
            </h3>
          </div>
          <p className={`${sharedStyles.bodyText} text-lg leading-relaxed group-hover:text-white transition-colors duration-300 font-medium`}>
            Nuestra misión es servir a la comunidad con integridad y compromiso, 
            mejorando la calidad de vida mediante iniciativas innovadoras.
          </p>
        </div>
        <div className="group p-6 border-l-4 border-[#FFDD08] bg-gradient-to-br from-[#1F322E] to-[#2A433E] rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#FFDD08]/20 transition-all duration-500 transform hover:scale-[1.02]"
             style={{ transitionDelay: '150ms' }}>
          <div className="flex items-center mb-4">
            <div className="bg-[#FFDD08]/20 p-2 rounded-full mr-3 group-hover:bg-[#FFDD08]/30 transition-all duration-300">
              <svg className="w-6 h-6 text-[#FFDD08]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className={`${sharedStyles.sectionTitle} text-2xl group-hover:text-[#FFDD08] transition-colors duration-300 ${sharedStyles.titleGlow}`}>
              Nuestra Visión
            </h3>
          </div>
          <p className={`${sharedStyles.bodyText} text-lg leading-relaxed group-hover:text-white transition-colors duration-300 font-medium`}>
            Nuestra visión es ser un referente en el desarrollo comunitario, 
            impulsando el progreso y bienestar para todos.
          </p>
        </div>
      </div>
    </>
  );

  if (mobile) {
    // En móvil, podemos hacerlo deslizar desde arriba usando translate-y.
    return (
      <div
        className={`
          fixed inset-x-0 top-0 h-[calc(100vh-4rem)] z-50
          bg-gradient-to-b from-white via-white to-white
          p-6 overflow-y-auto
          transform transition-all duration-700 ease-in-out
          ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
          shadow-lg shadow-black/20 rounded-b-2xl
        `}
        style={{
          willChange: 'transform, opacity'
        }}
      >
        <div className="pt-2 pb-8">
          <div className="flex justify-between items-center mb-5 transition-all duration-500 ease-out"
               style={{ 
                 opacity: show ? 1 : 0, 
                 transform: show ? 'translateY(0)' : 'translateY(1rem)',
                 transitionDelay: '150ms'
               }}>
            <h2 className={`${sharedStyles.sectionTitle} text-2xl`}>
              Misión y Visión
            </h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-[#FFDD08] to-[#FAAE2B] rounded-full"></div>
          </div>
          
          <p className="text-[#1F322E] text-base font-medium mb-6 transition-all duration-500 ease-out"
             style={{ 
               opacity: show ? 1 : 0, 
               transform: show ? 'translateY(0)' : 'translateY(0.5rem)',
               transitionDelay: '200ms'
             }}>
            Conoce nuestra filosofía y lo que nos impulsa
          </p>
          
          <div className="grid grid-cols-1 gap-5 pb-6">
            <div className="bg-gradient-to-r from-[#1F322E] to-[#2A433E] rounded-lg border-l-4 border-[#FFDD08] shadow-md hover:shadow-lg p-4 text-white transition-all duration-300 transform hover:translate-y-[-2px]"
                 style={{ 
                   opacity: show ? 1 : 0,
                   transform: show ? 'translateY(0)' : 'translateY(1rem)',
                   transition: 'all 0.5s ease-out',
                   transitionDelay: '250ms'
                 }}>
              <h3 className="text-[#FFDD08] font-bold text-lg mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Nuestra Misión
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Nuestra misión es servir a la comunidad con integridad y compromiso, 
                mejorando la calidad de vida mediante iniciativas innovadoras.
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-[#1F322E] to-[#2A433E] rounded-lg border-l-4 border-[#FFDD08] shadow-md hover:shadow-lg p-4 text-white transition-all duration-300 transform hover:translate-y-[-2px]"
                 style={{ 
                   opacity: show ? 1 : 0,
                   transform: show ? 'translateY(0)' : 'translateY(1rem)',
                   transition: 'all 0.5s ease-out',
                   transitionDelay: '350ms'
                 }}>
              <h3 className="text-[#FFDD08] font-bold text-lg mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Nuestra Visión
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Nuestra visión es ser un referente en el desarrollo comunitario, 
                impulsando el progreso y bienestar para todos.
              </p>
            </div>
          </div>
        </div>
        
        {/* Gradient bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </div>
    );
  } else {
    // En desktop, lo centramos horizontalmente y deslizamos desde arriba.
    return (
      <div
        className={`
          fixed top-0 left-0 right-0 z-50
          bg-gradient-to-b from-[#1F322E]/95 via-[#263C37]/95 to-[#2A433E]/95 backdrop-blur-md
          text-white p-8 overflow-y-auto
          transform transition-all duration-700 ease-in-out
          ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
          shadow-lg shadow-[#0F1A19]/30
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
