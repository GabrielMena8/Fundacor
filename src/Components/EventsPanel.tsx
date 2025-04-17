// src/Components/EventsPanel.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { sharedStyles } from '../styles/sharedStyles';

type EventsPanelProps = {
  show: boolean;
  mobile: boolean;
};

interface Event {
  id: string;
  title: string;
  date: string;
  image: string;
  location: string;
}

const sampleEvents: Event[] = [
  {
    id: 'evento1',
    title: 'Jornada de Atención Médica',
    date: '15 de Mayo, 2023',
    location: 'Plaza Bolívar, Carora',
    image: '/Eventos/Evento1.webp',
  },
  {
    id: 'evento2',
    title: 'Taller de Emprendimiento Comunitario',
    date: '22 de Junio, 2023',
    location: 'Centro Cultural Carora',
    image: '/Eventos/Evento2.webp',
  },
  {
    id: 'evento3',
    title: 'Celebración del Día del Niño',
    date: '16 de Julio, 2023',
    location: 'Parque Recreacional',
    image: '/Eventos/Evento3.webp',
  }
];

export const EventsPanel: React.FC<EventsPanelProps> = ({ show, mobile }) => {
  const eventCards = (
    <div className="grid grid-cols-1 gap-6 mt-4">
      {sampleEvents.map((event, index) => (
        <Link
          key={event.id}
          to={`/evento/${event.id}`}
          className="group bg-gradient-to-r from-[#1F322E] to-[#3B544A] backdrop-blur-md hover:from-[#1F322E] hover:to-[#3B544A] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          style={{
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(2rem)',
            transition: 'all 0.6s ease-out',
            transitionDelay: `${300 + (index * 100)}ms`
          }}
        >
          <div className="relative h-44 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A19]/80 to-transparent z-10"></div>
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
              <h3 className="text-lg font-semibold mb-1 group-hover:text-[#FFDD08] transition-colors">
                {event.title}
              </h3>
              <div className="flex items-center text-xs text-white/90">
                <svg className="w-3.5 h-3.5 mr-1.5 text-[#FFDD08]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {event.date}
              </div>
            </div>
          </div>
          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center text-sm text-white/80">
              <svg className="w-3.5 h-3.5 mr-1.5 text-[#FFDD08]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              {event.location}
            </div>
            <span className="text-sm text-[#FFDD08] flex items-center group-hover:translate-x-1 transition-transform duration-300 font-medium">
              Ver más
              <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
              </svg>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );

  const desktopContent = (
    <>
      <div className="flex items-center justify-center mb-8 transition-all duration-700 ease-out" 
           style={{ 
             opacity: show ? 1 : 0, 
             transform: show ? 'translateY(0)' : 'translateY(1rem)',
             transitionDelay: '150ms'
           }}>
        <div className={`w-16 h-1 ${sharedStyles.accentDivider}`}></div>
        <h2 className={`${sharedStyles.importantHeader} text-3xl text-center mx-4 ${sharedStyles.titleGlow}`}>
          Eventos
        </h2>
        <div className={`w-16 h-1 ${sharedStyles.accentDivider}`}></div>
      </div>
      
      <p className="text-center text-white/90 mb-8 font-medium transition-all duration-700 ease-out"
         style={{ 
           opacity: show ? 1 : 0, 
           transform: show ? 'translateY(0)' : 'translateY(1rem)',
           transitionDelay: '250ms'
         }}>
        Conoce nuestras actividades y eventos en beneficio de la comunidad
      </p>
      
      {eventCards}
      
      <div className="flex justify-center mt-8 transition-all duration-700 ease-out"
           style={{ 
             opacity: show ? 1 : 0, 
             transform: show ? 'translateY(0)' : 'translateY(1rem)',
             transitionDelay: '800ms'
           }}>
        <Link to="/eventos" className="flex items-center justify-center px-6 py-3 bg-[#1F322E] hover:bg-[#2A433E] border-2 border-[#FFDD08]/60 hover:border-[#FFDD08] rounded-lg text-white text-sm transition-all duration-300 hover:shadow-lg group">
          <span className="font-medium">Ver todos los eventos</span>
          <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>
      </div>
    </>
  );

  return (
    <>
      {mobile ? (
        // Mobile view
        <div 
          className={`fixed bottom-0 left-0 right-0 z-40 
            transform transition-all duration-700 ease-in-out 
            ${show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}
            max-h-[75vh] overflow-y-auto
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
                Eventos
              </h2>
              <div className="h-1.5 w-16 bg-gradient-to-r from-[#FFDD08] to-[#FAAE2B] rounded-full"></div>
            </div>
            
            <p className="text-[#1F322E] text-base font-medium mb-6 transition-all duration-500 ease-out"
               style={{ 
                 opacity: show ? 1 : 0, 
                 transform: show ? 'translateY(0)' : 'translateY(0.5rem)',
                 transitionDelay: '200ms'
               }}>
              Conoce nuestras actividades y eventos en beneficio de la comunidad
            </p>
            
            <div className="flex flex-col gap-4 pb-8">
              {sampleEvents.map((event, index) => (
                <Link
                  key={event.id}
                  to={`/evento/${event.id}`}
                  className="flex bg-white/95 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98] border border-gray-100"
                  style={{
                    opacity: show ? 1 : 0,
                    transform: show ? 'translateX(0)' : 'translateX(1rem)',
                    transition: 'all 0.5s ease-out',
                    transitionDelay: `${250 + (index * 75)}ms`
                  }}
                >
                  <div className="w-28 h-28 relative flex-shrink-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#1F322E]/40 to-transparent"></div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <h3 className="text-[#1F322E] font-semibold text-sm line-clamp-2 leading-tight">
                      {event.title}
                    </h3>
                    <div className="flex flex-col mt-2 space-y-1">
                      <div className="flex items-center text-xs text-gray-700">
                        <svg className="w-3.5 h-3.5 mr-1.5 text-[#FFDD08]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        {event.date}
                      </div>
                      <div className="flex items-center text-xs text-gray-700">
                        <svg className="w-3.5 h-3.5 mr-1.5 text-[#FFDD08]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center pr-3">
                    <div className="bg-[#1F322E]/10 p-2 rounded-full text-[#1F322E]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="flex justify-center transition-all duration-500 ease-out"
                 style={{ 
                   opacity: show ? 1 : 0, 
                   transform: show ? 'translateY(0)' : 'translateY(1rem)',
                   transitionDelay: '700ms'
                 }}>
              <Link to="/eventos" className="flex items-center justify-center px-6 py-3 bg-[#1F322E] text-white text-sm rounded-lg transition-all duration-300 active:scale-[0.98] border-2 border-[#FFDD08]/40 shadow-md font-medium">
                Ver todos los eventos
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Gradient bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        </div>
      ) : (
        // Desktop view
      <div
        className={`
          fixed top-0 right-0 h-full w-full sm:w-1/2 md:w-1/3 lg:w-1/4
            bg-gradient-to-b from-[#1F322E]/95 via-[#263C37]/95 to-[#2A433E]/95 backdrop-blur-md
            text-white p-8 overflow-y-auto
            transform transition-all duration-700 ease-in-out
            ${show ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}
            shadow-lg shadow-[#0F1A19]/30
            z-50
          `}
          style={{
            willChange: 'transform, opacity'
          }}
        >
          <div className="flex flex-col h-auto rounded-l-xl p-4 max-w-md mx-auto">
            {desktopContent}
          </div>
        </div>
      )}
    </>
    );
};

export default EventsPanel;
