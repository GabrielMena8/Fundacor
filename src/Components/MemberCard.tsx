import { useState } from 'react';
import { imageUrl } from '../lib/sanity';
import type { Member } from '../Types/sanity';

interface MemberCardProps {
  member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const img = member.image ? imageUrl(member.image, { width: 800, height: 600 }) : '';
  const imageAlt = member.name;

  return (
    <article className="rounded-2xl border border-white/10 bg-[#1F322E]/90 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Media */}
      <div className="relative w-full h-40 sm:h-44 overflow-hidden bg-gradient-to-br from-[#1F2A27] to-[#2A3B36]">
        {img && !imageError ? (
          <img
            src={img}
            alt={imageAlt}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setIsImageLoading(false)}
            onError={() => {
              setImageError(true);
              setIsImageLoading(false);
            }}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-[#FFDD08]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A19]/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 text-white">
        <h3 className="text-base sm:text-lg font-semibold leading-tight mb-1">{member.name}</h3>
        {member.role && (
          <p className="text-[#FFDD08] text-sm sm:text-base leading-snug mb-2">{member.role}</p>
        )}
        {member.department && (
          <p className="text-white/80 text-sm leading-snug mb-2">
            <span className="text-[#FFDD08]">Departamento: </span>
            {member.department}
          </p>
        )}
        {member.description && (
          <p className="text-white/80 text-sm sm:text-[15px] leading-snug line-clamp-3">
            {member.description}
          </p>
        )}
      </div>
    </article>
  );
}
