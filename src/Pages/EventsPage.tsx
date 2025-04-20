import   { useEffect, useState } from 'react';  
import { getEvents, urlFor } from '../lib/sanity';
import type { Event } from '../Types/sanity';
import EventCard from '../Components/EventCard';
import { sharedStyles } from '../styles/sharedStyles';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
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
    }

    fetchEvents();
  }, []);

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

  if (error) {
    return (
      <div className={`min-h-screen ${sharedStyles.pageBg} p-6 flex items-center justify-center`}>
        <div className="text-center">
          <h1 className={`${sharedStyles.titleText} text-4xl mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]`}>
            Error al cargar los eventos
          </h1>
          <p className="text-white/80 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className={`inline-flex items-center ${sharedStyles.button} px-6 py-3 rounded-lg active:scale-95 transition-transform`}
          >
            <span className="font-medium">Intentar de nuevo</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${sharedStyles.pageBg}`}>
      <div className={`${sharedStyles.container} relative z-10 p-6`}>
        <div className="text-center mb-12">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center blur-sm opacity-20">
              <h1 className={`${sharedStyles.importantHeader} text-6xl ${sharedStyles.titleGlow}`}>
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
        </div>

        <p className="text-center text-white/90 mb-12 max-w-2xl mx-auto">
          Descubre y participa en nuestros eventos y actividades diseñadas para beneficiar a la comunidad.
          Cada evento es una oportunidad para hacer la diferencia.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
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
            />
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center text-white/80 mt-8">
            No hay eventos programados en este momento.
          </div>
        )}
      </div>
    </div>
  );
} 