// src/Components/EventCard.tsx
import React, { useState } from 'react';
import { usePrefetchEventDetail, useOnVisiblePrefetch } from '../Hooks/usePrefetch';
import { Link } from 'react-router-dom';
import placeholder from '../placeholder.png';

interface EventCardProps {
  _id: string;
  title: string;
  date: string;
  description: string;
  imageUrl: string;
  location: string;
  department: string;
  style?: React.CSSProperties;
  variant?: 'panel' | 'grid';
}

export default function EventCard({
  _id,
  title,
  date,
  description,
  imageUrl,
  location,
  department,
  style,
  variant = 'grid'
}: EventCardProps) {
  // Track which events we already prefetched to avoid redundant requests
  const staticPrefetch = (EventCard as unknown as { _prefetched?: Set<string> })._prefetched || new Set<string>();
  (EventCard as unknown as { _prefetched?: Set<string> })._prefetched = staticPrefetch;
  const hasImage = Boolean(imageUrl);
  const prefetchEvent = usePrefetchEventDetail();
  const setVisibleRef = useOnVisiblePrefetch(() => prefetchEvent(_id));
  const [imgLoaded, setImgLoaded] = useState(!hasImage);
  // Safe date parsing
  const safeDate = (() => {
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return '';
    }
  })();

  const imageHeightClass = variant === 'panel' ? 'h-36 md:h-40' : 'h-44 md:h-48';
  const titleSizeClass = variant === 'panel' ? 'text-base md:text-[17px]' : 'text-base md:text-lg';
  const descTextClass = variant === 'panel' ? 'text-[13px] md:text-sm' : 'text-[13px] md:text-sm';
  const containerPadding = variant === 'panel' ? 'p-3 md:p-3.5' : 'p-3.5 md:p-4';
  const imgLoadingMode = variant === 'panel' ? 'eager' : 'lazy';

  return (
    <Link
      ref={setVisibleRef as unknown as React.Ref<HTMLAnchorElement>}
      to={`/evento/${_id}`}
        className="group bg-[#203732]/70 hover:bg-[#2E4741]/75 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/5"
      style={style}
      onMouseEnter={() => prefetchEvent(_id)}
      onFocus={() => prefetchEvent(_id)}
    >
      <div className={`relative ${imageHeightClass} overflow-hidden bg-gradient-to-br from-[#1F2A27] to-[#2A3B36]`}>
        {hasImage && !imgLoaded && (
          <div className="absolute inset-0 bg-white/5 z-[5]"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A19]/80 to-transparent z-10 rounded-t-xl"></div>
        <img
          src={imageUrl || placeholder}
          alt={title}
          onLoad={() => setImgLoaded(true)}
          onError={(e) => {
            (e.target as HTMLImageElement).src = placeholder;
            setImgLoaded(true);
          }}
          loading={imgLoadingMode as 'eager' | 'lazy'}
          decoding="async"
          className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ${hasImage ? '' : 'opacity-60'} ${imgLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        />
        <div className="absolute top-2.5 left-3 right-3 z-20 flex justify-between items-center">
          <span className="px-2.5 py-1 text-[11px] rounded-full bg-black/50 text-[#FFDD08] border border-[#FFDD08]/30 whitespace-nowrap">
            {department || 'Sin departamento'}
          </span>
          <span className="px-2.5 py-1 text-[11px] rounded-full bg-black/40 text-white border border-white/20 whitespace-nowrap">
            {safeDate || 'Fecha por confirmar'}
          </span>
        </div>
        <div className={`absolute bottom-0 left-0 right-0 ${containerPadding} text-white z-20`}>
          <h3 className={`${titleSizeClass} font-semibold mb-0.5 group-hover:text-[#FFDD08] transition-colors drop-shadow line-clamp-2 tracking-wide`}>
            {title}
          </h3>
        </div>
      </div>
      <div className={`${containerPadding}`}>
        <p className={`text-white/85 ${descTextClass} mb-3 md:mb-3.5 line-clamp-2 min-h-[34px] md:min-h-[38px]`}>{description}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-[13px] md:text-sm text-white/80">
            <svg className="w-3.5 h-3.5 mr-1.5 text-[#FFDD08]/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            {location || 'Ubicación por confirmar'}
          </div>
          <svg className="w-5 h-5 text-white/60 group-hover:text-[#FFDD08] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
