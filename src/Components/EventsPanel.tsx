// src/Components/EventsPanel.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, urlFor } from '../lib/sanity';
import type { Event } from '../Types/sanity';
import EventCard from './EventCard';

type EventsPanelProps = {
  show: boolean;
  isMobile?: boolean;
};

export const EventsPanel: React.FC<EventsPanelProps> = ({ show }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleViewAllClick = (e: React.MouseEvent) => {
    if (show) {
      e.preventDefault();
    }
  };

  return (
    <div
      className="fixed md:right-0 inset-x-0 md:inset-x-auto top-0 bottom-0 w-full md:w-[400px] bg-[#1F322E]/90 backdrop-blur-lg shadow-2xl z-50 overflow-hidden"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateX(0)' : 'translateX(100%)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        visibility: show ? 'visible' : 'hidden'
      }}
    >
      <div className="h-full overflow-y-auto">
        <div className="p-4 md:p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-[#FFDD08]"></div>
              <h2 className="text-[#FFDD08] text-xl md:text-2xl font-bold tracking-wider">
                EVENTOS
              </h2>
              <div className="w-8 h-[2px] bg-[#FFDD08]"></div>
            </div>
            <p className="text-white/90 text-sm mb-6">
              Descubre nuestros próximos eventos y actividades
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <div className="w-12 h-12 border-4 border-[#FFDD08] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center text-white/80 min-h-[200px] flex items-center justify-center">
              <p>{error}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event, index) => (
                <EventCard
                  key={event._id}
                  _id={event._id}
                  title={event.title}
                  date={new Date(event.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  description={event.description}
                  imageUrl={event.image ? urlFor(event.image).toString() : ''}
                  location={event.location}
                  department={event.department || ''}
                  style={{
                    opacity: show ? 1 : 0,
                    transform: show ? 'translateX(0)' : 'translateX(-1rem)',
                    transition: 'all 0.5s ease-out',
                    transitionDelay: `${200 + (index * 75)}ms`
                  }}
                />
              ))}

              {events.length === 0 && (
                <div className="text-center text-white/80 mt-8 min-h-[200px] flex items-center justify-center">
                  <p>No hay eventos programados.</p>
                </div>
              )}

              <div 
                className="flex justify-center mt-8 pb-4"
                style={{ 
                  opacity: show ? 1 : 0, 
                  transform: show ? 'translateY(0)' : 'translateY(1rem)',
                  transition: 'all 0.5s ease-out',
                  transitionDelay: '800ms'
                }}
              >
                <Link 
                  to="/eventos" 
                  onClick={handleViewAllClick}
                  className="flex items-center justify-center px-6 py-3 bg-[#1F322E] hover:bg-[#2A433E] border-2 border-[#FFDD08]/60 hover:border-[#FFDD08] rounded-lg text-white text-sm transition-all duration-300 hover:shadow-lg group"
                >
                  <span className="font-medium">Ver todos los eventos</span>
                  <svg 
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPanel;
