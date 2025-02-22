// src/Components/EventsPanel.tsx
import React from 'react';
import EventCard from './EventCard';

type EventsPanelProps = {
  show: boolean;
  mobile: boolean;
};

const EventsPanel: React.FC<EventsPanelProps> = ({ show, mobile }) => {
  const events = [
    {
      image: '/placeholder.png',
      title: 'Evento 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      image: '/placeholder.png',
      title: 'Evento 2',
      description: 'Suspendisse potenti. Nulla quis lorem libero.',
    },
    {
      image: '/placeholder.png',
      title: 'Evento 3',
      description: 'Curabitur ac felis at dolor tincidunt suscipit.',
    },
    {
      image: '/placeholder.png',
      title: 'Evento 4',
      description: 'Otro evento para verificar el scroll en móvil.',
    },
  ];

  if (mobile) {
    return (
      <div className="flex flex-col  h-full bg-gradient-to-t max-h-fit from-[#1F322E]/80 to-transparent backdrop-blur-md text-[#FFDD08] p-4 overflow-y-auto scrollbar-hide">
        <h2 className="text-2xl font-bold mb-2 text-center">Eventos</h2>
        <div className="flex flex-col items-center  overflow-y-auto space-y-4">
          {events.map((ev, idx) => (
            <EventCard key={idx} {...ev} />
          ))}
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
          bg-gradient-to-l from-[#1F322E]/80 to-transparent backdrop-blur-md text-[#FFDD08] p-4
        `}
        style={{ overflowY: 'auto' }}
      >
        <div className="flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-2 text-center">Eventos</h2>
          <div className="flex-1 overflow-y-auto space-y-4">
            {events.map((ev, idx) => (
              <EventCard key={idx} {...ev} />
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default EventsPanel;
