// src/Components/OrganigramaPanel.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { sharedStyles } from '../styles/sharedStyles';

type OrganigramaPanelProps = {
  show: boolean;
  mobile: boolean;
};

export const OrganigramaPanel: React.FC<OrganigramaPanelProps> = ({ show, mobile }) => {
  const departments = [
    { id: 'gerencia', name: 'Gerencia' },
    { id: 'administracion', name: 'Administración' },
    { id: 'contabilidad', name: 'Contabilidad' },
    { id: 'legal', name: 'Legal' },
    { id: 'recursos-humanos', name: 'Recursos Humanos' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'tecnologia', name: 'Tecnología' },
    { id: 'operaciones', name: 'Operaciones' },
  ];

  const content = (
    <div className="flex flex-col h-full">
      {/* Header with long decorative lines on both sides - matching the image */}
      <div className="flex items-center justify-center mb-8 transition-all duration-700 ease-out" 
           style={{ 
             opacity: show ? 1 : 0, 
             transform: show ? 'translateY(0)' : 'translateY(1rem)',
             transitionDelay: '150ms'
           }}>
        <div className="w-24 h-1.5 bg-[#FFDD08] rounded-full"></div>
        <h2 className={`${sharedStyles.importantHeader} text-2xl font-bold text-center mx-4 text-[#FFDD08]`}>
          ORGANIGRAMA
        </h2>
        <div className="w-24 h-1.5 bg-[#FFDD08] rounded-full"></div>
      </div>
      
      <p className="text-center text-white/90 mb-8 font-medium transition-all duration-700 ease-out"
         style={{ 
           opacity: show ? 1 : 0, 
           transform: show ? 'translateY(0)' : 'translateY(1rem)',
           transitionDelay: '250ms'
         }}>
        Conoce a nuestros departamentos y el equipo que compone la Fundación Coromotana
      </p>
      
      {/* Department grid - with improved styling */}
      <div className="grid grid-cols-1 gap-4 pb-6">
        {departments.map((dept, index) => (
          <Link 
            key={dept.id}
            to={`/departamento/${dept.id}`}
            className="bg-[#1F322E] border-l-4 border-[#FFDD08] p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-x-1 flex items-center justify-between group"
            style={{ 
              opacity: show ? 1 : 0,
              transform: show ? 'translateX(0)' : 'translateX(-1rem)',
              transition: 'all 0.5s ease-out',
              transitionDelay: `${300 + (index * 75)}ms`
            }}
          >
            <span className="text-[#FFDD08] font-medium text-lg max-w-[75%] break-words">
              {dept.name}
            </span>
            <div className="ml-2 flex-shrink-0">
              <svg 
                className="w-5 h-5 text-[#FFDD08]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Footer section with lines */}
      <div className="mt-auto pt-4 flex items-center justify-center transition-all duration-700 ease-out"
           style={{ 
             opacity: show ? 1 : 0, 
             transform: show ? 'translateY(0)' : 'translateY(1rem)',
             transitionDelay: '800ms'
           }}>
        <div className={`w-12 h-0.5 ${sharedStyles.accentDivider}`}></div>
        <div className={`w-24 h-0.5 ${sharedStyles.divider} mx-2`}></div>
        <div className={`w-12 h-0.5 ${sharedStyles.accentDivider}`}></div>
      </div>
    </div>
  );

  return (
    <>
      {mobile ? (
        // Mobile view
        <div 
          className={`fixed bottom-0 left-0 right-0 z-40 
            transform transition-all duration-700 ease-in-out 
            ${show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}
            max-h-[70vh] overflow-y-auto
            bg-gradient-to-b from-white via-white to-white
            shadow-lg shadow-black/20 rounded-t-2xl`}
          style={{
            willChange: 'transform, opacity'
          }}
        >
          {/* Pull indicator */}
          <div className="flex justify-center py-2">
            <div className="w-12 h-1.5 bg-gray-300/70 rounded-full"></div>
          </div>
          
          <div className="px-6 pt-2 pb-8">
            <div className="flex justify-between items-center mb-5 transition-all duration-500 ease-out"
                 style={{ 
                   opacity: show ? 1 : 0, 
                   transform: show ? 'translateY(0)' : 'translateY(1rem)',
                   transitionDelay: '150ms'
                 }}>
              <h2 className={`${sharedStyles.sectionTitle} text-2xl`}>
                Organigrama
              </h2>
              <div className="h-1.5 w-16 bg-gradient-to-r from-[#FFDD08] to-[#FAAE2B] rounded-full"></div>
            </div>
            
            <p className="text-[#1F322E] text-base font-medium mb-6 transition-all duration-500 ease-out"
               style={{ 
                 opacity: show ? 1 : 0, 
                 transform: show ? 'translateY(0)' : 'translateY(0.5rem)',
                 transitionDelay: '200ms'
               }}>
              Conoce a nuestros departamentos y el equipo que compone la Fundación
            </p>
            
            <div className="grid grid-cols-2 gap-4 pb-6">
              {departments.map((dept, index) => (
                <Link 
                  key={dept.id}
                  to={`/departamento/${dept.id}`}
                  className="bg-gradient-to-br from-[#1F322E] to-[#3B544A] backdrop-blur-sm border-l-4 border-[#FFDD08] p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98] flex flex-col"
                  style={{ 
                    opacity: show ? 1 : 0,
                    transform: show ? 'translateY(0)' : 'translateY(1rem)',
                    transition: 'all 0.5s ease-out',
                    transitionDelay: `${250 + (index * 50)}ms`
                  }}
                >
                  <span className="text-white text-sm font-bold mb-2 leading-tight">{dept.name}</span>
                  <div className="flex justify-end">
                    <span className="text-xs text-[#FFDD08] flex items-center font-medium">
                      Ver equipo
                      <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Mobile footer lines */}
            <div className="flex items-center justify-center mt-2 pb-4">
              <div className="h-0.5 w-12 bg-gradient-to-r from-[#FFDD08]/60 to-[#FFDD08]/60 rounded-full"></div>
              <div className="h-0.5 w-24 bg-gray-300/50 rounded-full mx-2"></div>
              <div className="h-0.5 w-12 bg-gradient-to-r from-[#FFDD08]/60 to-[#FFDD08]/60 rounded-full"></div>
            </div>
          </div>
          
          {/* Gradient bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        </div>
      ) : (
        // Desktop view
        <div
          className={`
            fixed top-0 left-0 h-full w-full sm:w-1/2 md:w-1/3 lg:w-1/4
            bg-gradient-to-b from-[#1F322E]/95 via-[#263C37]/95 to-[#2A433E]/95 backdrop-blur-md
            text-white p-8 overflow-y-auto
            transform transition-all duration-700 ease-in-out
            ${show ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'}
            shadow-lg shadow-[#0F1A19]/30
            z-50
          `}
          style={{
            willChange: 'transform, opacity'
          }}
        >
          <div className="flex flex-col h-full rounded-r-xl p-4 max-w-md mx-auto">
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default OrganigramaPanel;
