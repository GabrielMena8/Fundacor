// src/Pages/EventDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

type EventData = {
  id: string;
  title: string;
  image?: string;
  date?: string;        // Podrías agregar fecha
  description: string;  // Descripción corta
  fullDescription?: string; // Descripción larga
};

const EventDetail: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<EventData | null>(null);

  // Simulación de datos (podrías traerlos de una API real en tu proyecto)
  useEffect(() => {
    const simulatedData: { [key: string]: EventData } = {
      evento1: {
        id: 'evento1',
        title: 'Evento de Recaudación de Fondos',
        image: '/Eventos/Evento1.webp',
        date: '10 de Mayo de 2025',
        description: 'Recaudación para proyectos comunitarios.',
        fullDescription:
          'En este evento, se reunirán colaboradores, miembros de la comunidad y patrocinadores para impulsar el financiamiento de las próximas iniciativas. Contará con música en vivo, actividades para niños y conferencias informativas sobre los planes de desarrollo comunitario.',
      },
      evento2: {
        id: 'evento2',
        title: 'Feria de Salud Comunitaria',
        image: '/Eventos/Evento2.webp',
        date: '15 de Junio de 2025',
        description: 'Feria de salud para la comunidad local.',
        fullDescription:
          'Ofrecemos chequeos médicos gratuitos, donaciones de insumos, charlas de prevención y stands con información para promover el bienestar integral de la comunidad.',
      },
      // Agrega más eventos según necesites
    };

    const foundEvent = simulatedData[eventId || ''] || null;
    setEvent(foundEvent);
  }, [eventId]);

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f4e7e7] to-[#F5F5F5] p-6 font-caviardreams">
        <p className="text-[#1F322E]">Cargando o evento no encontrado...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4e7e7] to-[#F5F5F5] p-6 font-caviardreams">
      <Link
        to="/"
        className="font-renogare text-[#1F322E] hover:underline"
      >
        ← Volver
      </Link>

      <h1 className="text-3xl font-renogare text-[#1F322E] mt-4 mb-8 text-center">
        {event.title}
      </h1>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
        {/* Imagen del evento */}
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="w-64 h-auto object-cover rounded mb-4 shadow-md"
          />
        )}

        {/* Fecha y descripción */}
        {event.date && (
          <p className="font-caviardreams text-gray-600 mb-4">
            <strong>Fecha:</strong> {event.date}
          </p>
        )}

        <p className="font-caviardreams text-gray-700 text-center mb-4">
          {event.description}
        </p>

        {/* Descripción completa */}
        {event.fullDescription && (
          <p className="font-caviardreams text-gray-700 leading-relaxed text-justify">
            {event.fullDescription}
          </p>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
