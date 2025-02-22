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
      image: '/Eventos/Evento1.webp',
      title: 'Evento 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      image: '/Eventos/Evento2.webp',
      title: 'Evento 2',
      description: 'Suspendisse potenti. Nulla quis lorem libero.',
    },
    {
      image: '/Eventos/Evento3.webp',
      title: 'Evento 3',
      description: 'Curabitur ac felis at dolor tincidunt suscipit.',
    },
    {
      image: '/Eventos/Evento2.webp',
      title: 'Evento 4',
      description: 'Otro evento para verificar el scroll en móvil.',
    },
    {
      image: '/Eventos/Evento1.webp',
      title: 'Evento 5',
      description: 'Otro evento para verificar el scroll en móvil.',
    },
  ];

  if (mobile) {
    return (
      <div className="h-[calc(100vh-4rem)] bg-[#1f322e] text-white p-6 font-caviardreams">
        <h2 className="text-2xl font-renogare mb-4 text-[#ffdd08]">Eventos FUNDACOR</h2>
        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          <div className="space-y-4">
        {events.map((ev, idx) => (
          <EventCard key={idx} {...ev} />
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
          bg-gradient-to-l from-[#1f322e] to-transparent
          text-white p-6 font-caviardreams
        `}
        style={{ overflowY: 'auto' }}
      >
        <div className="flex text-justify flex-col h-auto  rounded-bl-xl rounded-l-4xl p-4">
          <div className="flex-1 p-2">
            <h2 className="text-2xl text-center font-renogare mb-4 text-[#ffdd08]">FUNDACOR</h2>
            <div className="grid grid-cols-1 gap-4 mb-6">
              {events.map((ev, idx) => (
                <div key={idx} className="p-4 bg-[#1f322e]/50 border border-[#ffdd08]/20 rounded-lg  hover:border-[#ffdd08]/50 hover:border-2 transition-colors">
                  <EventCard {...ev} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default EventsPanel;
