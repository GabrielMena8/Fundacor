// src/Components/EventCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

type EventCardProps = {
  id: string;                // Agregamos un identificador
  image: string;
  title: string;
  description: string;
};

const EventCard: React.FC<EventCardProps> = ({ id, image, title, description }) => {
  return (
    <div className="bg-[#FFDD08]/20 border border-[#FFDD08]/50 p-4 rounded-md shadow-lg text-white">
      <img
        src={image}
        alt={title}
        className="w-full h-auto object-cover rounded mb-2 shadow-md"
      />
      <h3 className="font-renogare font-bold text-xl mb-1 text-[#FFDD08]">
        {title}
      </h3>
      <p className="font-caviardreams text-sm mb-2">
        {description}
      </p>

      {/* Enlace hacia la ruta de detalle del evento */}
      <Link
        to={`/evento/${id}`}
        className="font-renogare font-bold text-[#FFDD08] hover:underline"
      >
        Learn More
      </Link>
    </div>
  );
};

export default EventCard;
