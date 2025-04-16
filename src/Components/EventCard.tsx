// src/Components/EventCard.tsx
import React from 'react';

type EventCardProps = {
  image: string;
  title: string;
  description: string;
};

const EventCard: React.FC<EventCardProps> = ({ image, title, description }) => {
  return (
    <div className="bg-[#FFDD08]/20 border border-[#FFDD08]/50 p-4 rounded-md shadow-lg text-white">
      <img
        src={image}
        alt={title}
        className="w-full h-auto object-cover rounded mb-2 shadow-md"
      />
      {/* Título con fuente para títulos */}
      <h3 className="font-renogare font-bold text-xl mb-1 text-[#FFDD08]">
        {title}
      </h3>
      {/* Descripción con fuente para cuerpo de texto */}
      <p className="font-caviardreams text-sm mb-2">{description}</p>
      <a href="#" className="font-renogare font-bold text-[#FFDD08] hover:underline">
        Learn More
      </a>
    </div>
  );
};

export default EventCard;
