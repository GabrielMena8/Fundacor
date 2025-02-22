import React from 'react';

type EventCardProps = {
  image: string;
  title: string;
  description: string;
};

const EventCard: React.FC<EventCardProps> = ({ image, title, description }) => {
  return (
    <div className="scrollbar-hide text-white p-4  ">
      <img src={image} alt={title} className="w-full h-auto object-cover rounded mb-2" />
      <h3 className="font-bold text-lg mb-1 text-[#FFDD08]">{title}</h3>
      <p className="text-sm mb-2">{description}</p>
      <a href="#" className="text-[#FFDD08] hover:underline">
        Learn More
      </a>
    </div>
  );
};

export default EventCard;
