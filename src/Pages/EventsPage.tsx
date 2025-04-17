import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sharedStyles } from '../styles/sharedStyles';

interface Event {
  id: string;
  title: string;
  date: string;
  image: string;
  location: string;
  description?: string;
}

// These are the same sample events from EventsPanel component
const sampleEvents: Event[] = [
  {
    id: 'evento1',
    title: 'Jornada de Atención Médica',
    date: '15 de Mayo, 2023',
    location: 'Plaza Bolívar, Carora',
    image: '/Eventos/Evento1.webp',
    description: 'Jornada gratuita de atención médica para la comunidad, ofreciendo servicios básicos de salud, consultas y medicamentos.'
  },
  {
    id: 'evento2',
    title: 'Taller de Emprendimiento Comunitario',
    date: '22 de Junio, 2023',
    location: 'Centro Cultural Carora',
    image: '/Eventos/Evento2.webp',
    description: 'Taller dirigido a emprendedores locales, con herramientas prácticas para iniciar y mejorar sus proyectos de negocio.'
  },
  {
    id: 'evento3',
    title: 'Celebración del Día del Niño',
    date: '16 de Julio, 2023',
    location: 'Parque Recreacional',
    image: '/Eventos/Evento3.webp',
    description: 'Evento recreativo con juegos, música y premios para los niños de nuestra comunidad, celebrando su día especial.'
  },
  {
    id: 'evento4',
    title: 'Seminario de Desarrollo Sostenible',
    date: '5 de Agosto, 2023',
    location: 'Auditorio Municipal',
    image: '/Eventos/Evento1.webp',
    description: 'Seminario sobre prácticas sostenibles y cuidado del medio ambiente, dirigido a toda la comunidad.'
  },
  {
    id: 'evento5',
    title: 'Feria de Artesanía Local',
    date: '18 de Septiembre, 2023',
    location: 'Plaza Central',
    image: '/Eventos/Evento2.webp',
    description: 'Exposición y venta de artesanías locales, promoviendo el talento y la cultura de nuestra región.'
  }
];

const EventsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);

  // Direct navigation to home page
  const goToHome = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setEvents(sampleEvents);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Logo path for background pattern
  const logoBackgroundUrl = "/LogoFUNDACOR.svg";

  if (loading) {
    return (
      <div className={`min-h-screen ${sharedStyles.pageBg} p-6 flex items-center justify-center`}>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[#FFDD08] border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className={`${sharedStyles.titleText} text-xl`}>Cargando eventos...</div>
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
          onClick={goToHome}
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
          <span className="font-medium">Volver al Inicio</span>
        </button>
      </div>
      
      <div className={`${sharedStyles.container} relative z-10 p-6`}>
        <button 
          onClick={goToHome}
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
          <span className="font-medium">Volver al Inicio</span>
        </button>
        
        <div className={`text-center mb-12 ${sharedStyles.fadeIn} mt-6 sm:mt-0`}>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center blur-sm opacity-20">
              <h1 className={`${sharedStyles.importantHeader} text-7xl ${sharedStyles.titleGlow}`}>
                Eventos
              </h1>
            </div>
            <h1 className={`${sharedStyles.importantHeader} text-4xl md:text-5xl mb-4 relative z-10 ${sharedStyles.titleGlow}`}>
              Eventos
            </h1>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <div className={`w-16 h-1 ${sharedStyles.divider}`}></div>
            <div className={`w-24 h-1 ${sharedStyles.accentDivider}`}></div>
            <div className={`w-16 h-1 ${sharedStyles.divider}`}></div>
          </div>
          
          <p className="max-w-2xl mx-auto mt-4 text-white/80">
            Conoce nuestras actividades y eventos en beneficio de la comunidad
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <Link
              key={event.id}
              to={`/evento/${event.id}`}
              className="bg-gradient-to-r from-[#1F322E] to-[#2A433E] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A19]/80 to-transparent z-10"></div>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                  <h3 className="text-xl font-semibold mb-1 group-hover:text-[#FFDD08] transition-colors">
                    {event.title}
                  </h3>
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center text-sm text-white/90">
                    <svg className="w-4 h-4 mr-2 text-[#FFDD08]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-white/90">
                    <svg className="w-4 h-4 mr-2 text-[#FFDD08]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    {event.location}
                  </div>
                </div>
                <p className="mt-3 text-white/80 text-sm line-clamp-2">
                  {event.description || 'Más información próximamente...'}
                </p>
                <div className="mt-4 flex justify-end">
                  <span className="text-sm text-[#FFDD08] flex items-center group-hover:translate-x-1 transition-transform duration-300 font-medium">
                    Ver detalles
                    <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage; 