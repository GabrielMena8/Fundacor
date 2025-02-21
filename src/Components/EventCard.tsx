// src/components/EventCard.tsx
import React from 'react';

type EventCardProps = {
  image: string;
  title: string;
  description: string;
};

const EventCard: React.FC<EventCardProps> = ({ image, title, description }) => {
  return (

    <div className=" bg-white/80  backdrop-blur-sm  border-[#FFDD08] text-[#1F322E] p-4 rounded shadow">
      <img src={image} alt={title} className="w-full h-32 object-cover mb-2" />
      <h3 className="font-bold font-renogare text-lg mb-1">{title}</h3>
      <p className="font-caviar text-sm mb-2">{description}</p>
      {/* Enlace en amarillo para resaltar */}
      <a href="#" className="text-[#FFDD08] hover:underline">
        Learn More
      </a>
    </div>
  );
};

export default EventCard;
