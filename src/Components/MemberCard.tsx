import { useState } from 'react';
import { urlFor } from '../lib/sanity';
import type { Member } from '../Types/sanity';

interface MemberCardProps {
  member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  
  const imageUrl = member.image ? urlFor(member.image).toString() : '';
  
  const handleImageError = () => {
    setImageError(true);
    setIsImageLoading(false);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };
  
  return (
    <div className="bg-[#1F322E]/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1F322E]/50">
            <div className="w-8 h-8 border-2 border-[#FFDD08]/80 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={member.name}
            className={`w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#1F322E]">
            <svg className="w-12 h-12 text-[#FFDD08]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A19]/80 to-transparent"></div>
      </div>
      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
        <p className="text-[#FFDD08] text-sm mb-2">{member.role}</p>
        {member.department && (
          <p className="text-white/80 text-sm mb-2">
            <span className="text-[#FFDD08]">Departamento: </span>
            {member.department}
          </p>
        )}
        <p className="text-white/80 text-sm line-clamp-3">{member.description}</p>
      </div>
    </div>
  );
}
