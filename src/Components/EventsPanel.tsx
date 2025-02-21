// src/components/EventsPanel.tsx
import React from 'react';
import EventCard from './EventCard';

type EventsPanelProps = {
    show: boolean;
  };
  

const EventsPanel: React.FC<EventsPanelProps> = () => {
  const events = [
    {
      image: '/placeholder.png',
      title: 'Evento 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      image: 'placeholder.png',
      title: 'Evento 2',
      description: 'Suspendisse potenti. Nulla quis lorem libero.',
    },
    {
      image: 'placeholder.png',
      title: 'Evento 3',
      description: 'Curabitur ac felis at dolor tincidunt suscipit.',
    },
    // Puedes agregar más eventos
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Título fijo */}
      <h2 className="text-2xl font-bold mb-2 text-center">Eventos</h2>
      {/* Lista de tarjetas con scroll interno */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {events.map((ev, idx) => (
          <EventCard
            key={idx}
            image={ev.image}
            title={ev.title}
            description={ev.description}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsPanel;
