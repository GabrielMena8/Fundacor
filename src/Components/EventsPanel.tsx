// src/Components/EventsPanel.tsx
import React from 'react';
import EventCard from './EventCard';

export type EventItem = {
  id: string;          // ← Agregamos un id para enlazar al detalle
  image: string;
  title: string;
  description: string;
};

// Datos de ejemplo, cada evento con un id único:
const events: EventItem[] = [
  {
    id: 'evento1',
    image: '/Eventos/Evento1.webp',
    title: 'Evento 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    id: 'evento2',
    image: '/Eventos/Evento2.webp',
    title: 'Evento 2',
    description: 'Suspendisse potenti. Nulla quis lorem libero.',
  },
  {
    id: 'evento3',
    image: '/Eventos/Evento3.webp',
    title: 'Evento 3',
    description: 'Curabitur ac felis at dolor tincidunt suscipit.',
  },
  {
    id: 'evento4',
    image: '/Eventos/Evento2.webp',
    title: 'Evento 4',
    description: 'Otro evento para verificar el scroll en móvil.',
  },
  {
    id: 'evento5',
    image: '/Eventos/Evento1.webp',
    title: 'Evento 5',
    description: 'Otro evento para verificar el scroll en móvil.',
  },
];

type EventsPanelProps = {
  show: boolean;
  mobile: boolean;
};

const EventsPanel: React.FC<EventsPanelProps> = ({ show, mobile }) => {
  if (mobile) {
    return (
      <div className="h-[calc(100vh-4rem)] bg-[#1f322e] text-white p-6 font-caviardreams">
        <h2 className="text-2xl font-renogare mb-4 text-[#ffdd08]">
          Eventos Fundación Coromotana
        </h2>
        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          <div className="space-y-4">
            {events.map((ev) => (
              // Pasamos todas las propiedades: id, image, title, description
              <EventCard key={ev.id} {...ev} />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`
          fixed top-0 right-0 h-full w-full sm:w-1/2 md:w-1/3 lg:w-1/4
          transform transition-transform duration-500 ease-in-out
          ${show ? 'translate-x-0' : 'translate-x-full'}
          bg-gradient-to-l from-[#1f322e]/90 via-[#2A433E]/85 to-[#3B544A]/80
          text-white p-6 font-caviardreams
        `}
        style={{ overflowY: 'auto' }}
      >
        <div className="flex flex-col h-auto rounded-bl-xl rounded-l-4xl p-4">
          <h2 className="text-2xl text-center font-bold font-renogare mb-4 text-[#ffdd08]">
            Eventos Fundación Coromotana
          </h2>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {events.map((ev) => (
              <EventCard key={ev.id} {...ev} />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default EventsPanel;
