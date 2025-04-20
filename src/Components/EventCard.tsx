// src/Components/EventCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface EventCardProps {
  _id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  location: string;
  department: string;
  style?: React.CSSProperties;
}

export default function EventCard({
  _id,
  title,
  date,
  description,
  imageUrl,
  location,
  department,
  style
}: EventCardProps) {
  return (
    <Link
      to={`/evento/${_id}`}
      className="group bg-gradient-to-r from-[#1F322E] to-[#3B544A] backdrop-blur-md hover:from-[#1F322E] hover:to-[#3B544A] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      style={style}
    >
      <div className="relative h-44 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A19]/80 to-transparent z-10"></div>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
          <h3 className="text-lg font-semibold mb-1 group-hover:text-[#FFDD08] transition-colors">
            {title}
          </h3>
          <div className="flex items-center text-xs text-white/90">
            <svg className="w-3.5 h-3.5 mr-1.5 text-[#FFDD08]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            {date}
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-white/80 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm text-white/80">
            <svg className="w-3.5 h-3.5 mr-1.5 text-[#FFDD08]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            {location}
          </div>
          <div className="text-sm text-[#FFDD08]">{department}</div>
        </div>
      </div>
    </Link>
  );
}
