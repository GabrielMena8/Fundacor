// src/components/EventsPanel.tsx
import React from 'react';
import EventCard from './EventCard';

type EventsPanelProps = {
  show: boolean; // Indica si el panel se muestra
};

const EventsPanel: React.FC<EventsPanelProps> = ({ show }) => {
  // Datos de ejemplo
  const events = [
    {
      image: '/placeholder.png',
      title: 'Evento 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      image: '/placeholder.png',
      title: 'Evento 2',
      description: 'Suspendisse potenti. Nulla quis lorem libero.'
    },
    {
      image: '/placeholder.png',
      title: 'Evento 3',
      description: 'Curabitur ac felis at dolor tincidunt suscipit.'
    }
  ];

  return (
    <div
      className={`
        fixed top-0 right-0 h-full w-full sm:w-1/2 md:w-1/3 lg:w-1/4
        transform transition-transform duration-500 ease-in-out
        order-l-4 border-[#FFDD08]  /* Outline amarillo en el borde izquierdo del panel */

        bg-gradient-to-l from-[#1F322E] via-[#1F322E]/50 via-75% to-transparent  /* Fondo con degradado y opacidad */
        ${show ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      {/* 
        Contenedor interno con fondo en #1F322E (FUNDACOR Dark), 
        opacidad y blur para dar transparencia. 
        El texto principal va en amarillo para resaltar. 
      */}
      <div className="flex flex-col h-full text-[#FFDD08] p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Eventos</h2>
        <div className="space-y-6">
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
    </div>
  );
};

export default EventsPanel;
