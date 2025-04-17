// src/Pages/EventDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sharedStyles } from '../styles/sharedStyles';

type EventData = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
};

const EventDetail: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      setLoading(true);
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const simulatedData: { [key: string]: EventData } = {
        'evento1': {
          id: 'evento1',
          title: 'Jornada de Atención Médica',
          date: '15 de Mayo, 2023',
          location: 'Plaza Bolívar, Carora',
          description: 'Jornada gratuita de atención médica para la comunidad, ofreciendo servicios básicos de salud, consultas y medicamentos. Estaremos brindando atención en distintas especialidades como medicina general, pediatría, ginecología y odontología.',
          image: '/Eventos/Evento1.webp',
        },
        'evento2': {
          id: 'evento2',
          title: 'Taller de Emprendimiento Comunitario',
          date: '22 de Junio, 2023',
          location: 'Centro Cultural Carora',
          description: 'Taller dirigido a emprendedores locales, con herramientas prácticas para iniciar y mejorar sus proyectos de negocio. Contaremos con expertos en áreas de administración, marketing y finanzas que compartirán sus conocimientos y experiencias.',
          image: '/Eventos/Evento2.webp',
        },
        'evento3': {
          id: 'evento3',
          title: 'Celebración del Día del Niño',
          date: '16 de Julio, 2023',
          location: 'Parque Recreacional',
          description: 'Evento recreativo con juegos, música y premios para los niños de nuestra comunidad, celebrando su día especial. Habrá actividades como pintacaritas, castillos inflables, teatro infantil y muchas sorpresas más para todos los asistentes.',
          image: '/Eventos/Evento3.webp',
        },
      };

      const data = simulatedData[eventId || ''] || null;
      setEvent(data);
      setLoading(false);
    };

    fetchEventData();
  }, [eventId]);

  // Direct navigation function - most reliable approach for mobile
  const goToEvents = () => {
    window.location.href = '/eventos';
  };

  // SVG logo path for background pattern
  const logoBackgroundUrl = "/LogoFUNDACOR.svg";

  if (loading) {
    return (
      <div className={`min-h-screen ${sharedStyles.pageBg} p-6 flex items-center justify-center`}>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[#FFDD08] border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className={`${sharedStyles.titleText} text-xl`}>Cargando...</div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className={`min-h-screen ${sharedStyles.pageBg} p-6 flex items-center justify-center`}>
        <div className="text-center">
          <h1 className={`${sharedStyles.titleText} text-4xl mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]`}>
            Evento no encontrado
          </h1>
          <button 
            onClick={goToEvents}
            className={`inline-flex items-center ${sharedStyles.button} px-6 py-3 rounded-lg active:scale-95 transition-transform`}
            style={{ touchAction: 'manipulation' }}
          >
            <svg 
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            <span className="font-medium">Volver a Eventos</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${sharedStyles.pageBg}`}>
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 z-0 opacity-10" 
        style={{ 
          backgroundImage: `url(${logoBackgroundUrl})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
          backgroundPosition: '30px 30px',
          filter: 'blur(0.5px)',
          pointerEvents: 'none'
        }}
      />
      
      {/* Fixed back button on mobile */}
      <div className="sticky top-0 left-0 right-0 z-[100] bg-[#1F322E]/80 backdrop-blur-md shadow-lg px-4 py-2 sm:hidden">
        <button 
          onClick={goToEvents}
          className="flex items-center justify-center bg-[#FFDD08] text-[#1F322E] px-4 py-2 rounded-lg w-full active:scale-95 transition-transform"
          style={{ touchAction: 'manipulation' }}
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          <span className="font-medium">Volver a Eventos</span>
        </button>
      </div>
      
      <div className={`${sharedStyles.container} relative z-10 p-6`}>
        {/* Desktop back button (hidden on mobile) */}
        <button 
          onClick={goToEvents}
          className={`hidden sm:inline-flex items-center ${sharedStyles.button} px-4 py-2 rounded-lg mb-8 active:scale-95 transition-transform`}
          style={{ touchAction: 'manipulation' }}
        >
          <svg 
            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          <span className="font-medium">Volver a Eventos</span>
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-6 sm:mt-0">
          <div className={`space-y-6 ${sharedStyles.fadeIn}`}>
            <div className="text-center lg:text-left">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center blur-sm opacity-20">
                  <h1 className={`${sharedStyles.importantHeader} text-6xl ${sharedStyles.titleGlow}`}>
                    {event.title}
                  </h1>
                </div>
                <h1 className={`${sharedStyles.importantHeader} text-4xl md:text-5xl mb-4 relative z-10 ${sharedStyles.titleGlow}`}>
                  {event.title}
                </h1>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <div className={`w-16 h-1 ${sharedStyles.divider}`}></div>
                <div className={`w-24 h-1 ${sharedStyles.accentDivider}`}></div>
                <div className={`w-16 h-1 ${sharedStyles.divider}`}></div>
              </div>
            </div>

            <div className="bg-[#1f322e]/50 p-6 rounded-xl border border-[#FFDD08]/30 shadow-lg backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-[#FFDD08] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className={`${sharedStyles.bodyText} text-lg`}>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-[#FFDD08] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className={`${sharedStyles.bodyText} text-lg`}>{event.location}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1f322e]/50 p-6 rounded-xl border border-[#FFDD08]/30 shadow-lg backdrop-blur-sm">
              <h2 className={`${sharedStyles.sectionTitle} text-2xl mb-4 ${sharedStyles.titleGlow}`}>Descripción</h2>
              <p className={`${sharedStyles.bodyText} text-lg leading-relaxed`}>
                {event.description}
              </p>
            </div>
          </div>

          <div className={`relative group ${sharedStyles.fadeIn}`} style={{ animationDelay: '200ms' }}>
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden transform group-hover:scale-[1.02] transition-all duration-500 shadow-xl">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className={`w-20 h-1 ${sharedStyles.accentDivider} mb-2 opacity-80`}></div>
              <h3 className={`${sharedStyles.sectionTitle} text-2xl ${sharedStyles.titleGlow}`}>Galería</h3>
            </div>
          </div>
        </div>
        
        {/* Extra back button at bottom for mobile - better UX */}
        <div className="mt-12 sm:hidden">
          <button 
            onClick={goToEvents}
            className="flex items-center justify-center bg-[#FFDD08] text-[#1F322E] px-4 py-3 rounded-lg w-full active:scale-95 transition-transform"
            style={{ touchAction: 'manipulation' }}
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            <span className="font-medium">Volver a Eventos</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
