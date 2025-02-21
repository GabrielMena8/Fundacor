import React from 'react';

type EventCardProps = {
  image: string;
  title: string;
  description: string;
};

const EventCard: React.FC<EventCardProps> = ({ image, title, description }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm  text-[#1F322E] p-4 rounded shadow ">
      <img src={image} alt={title} className="w-full h-32 object-cover mb-2" />
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-sm mb-2">{description}</p>
      <a href="#" className="text-[#FFDD08] hover:underline">
        Learn More
      </a>
    </div>
  );
};

export default EventCard;
