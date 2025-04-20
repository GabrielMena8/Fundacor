// src/Pages/EventDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sharedStyles } from '../styles/sharedStyles';
import { getEvent, urlFor } from '../lib/sanity';
import type { Event } from '../Types/sanity';

const EventDetail: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventData = async () => {
      setLoading(true);
      try {
        if (!eventId) {
          throw new Error('No event ID provided');
        }
        const eventData = await getEvent(eventId);
        setEvent(eventData);
        setError(null);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to load event');
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  const goToEvents = () => {
    navigate('/eventos');
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${sharedStyles.pageBg} p-6 flex items-center justify-center`}>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[#FFDD08] border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className={`${sharedStyles.titleText} text-xl`}>Cargando evento...</div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className={`min-h-screen ${sharedStyles.pageBg} p-6 flex items-center justify-center`}>
        <div className="text-center">
          <h1 className={`${sharedStyles.titleText} text-4xl mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]`}>
            Evento no encontrado
          </h1>
          <p className="text-white/80 mb-6">{error || 'El evento que buscas no existe o ha sido eliminado.'}</p>
          <button 
            onClick={goToEvents}
            className={`inline-flex items-center ${sharedStyles.button} px-6 py-3 rounded-lg active:scale-95 transition-transform`}
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
      {/* Fixed back button on mobile */}
      <div className="sticky top-0 left-0 right-0 z-[100] bg-[#1F322E]/80 backdrop-blur-md shadow-lg px-4 py-2 sm:hidden">
        <button 
          onClick={goToEvents}
          className="flex items-center justify-center bg-[#FFDD08] text-[#1F322E] px-4 py-2 rounded-lg w-full active:scale-95 transition-transform"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span className="text-white/90">
                    {new Date(event.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-[#FFDD08] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span className="text-white/90">{event.location}</span>
                </div>
                {event.department && (
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-[#FFDD08] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    <span className="text-white/90">{event.department}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#1f322e]/50 p-6 rounded-xl border border-[#FFDD08]/30 shadow-lg backdrop-blur-sm">
              <h2 className={`${sharedStyles.importantHeader} text-2xl mb-4 ${sharedStyles.titleGlow}`}>
                Descripción
              </h2>
              <p className="text-white/90 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>

          <div className={`${sharedStyles.fadeIn}`}>
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A19]/80 to-transparent"></div>
              <img
                src={event.image ? urlFor(event.image).toString() : ''}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;

