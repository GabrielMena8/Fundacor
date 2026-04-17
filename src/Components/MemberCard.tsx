import { useState } from 'react';
import { imageUrl } from '../lib/sanity';
import type { Member } from '../Types/sanity';

interface MemberCardProps {
  member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const img = member.image ? imageUrl(member.image, { width: 800, height: 800, crop: true, fpY: 0.35 }) : '';
  const imgHigh = member.image ? imageUrl(member.image, { width: 1000, height: 1000, crop: true, fpY: 0.2 }) : '';
  const imageAlt = member.name;

  return (
    <>
      <article
        className="rounded-2xl border border-white/10 bg-[#1F322E]/90 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        {/* Media */}
        <div className="relative w-full h-40 sm:h-44 overflow-hidden bg-gradient-to-br from-[#1F2A27] to-[#2A3B36]">
          {img && !imageError ? (
            <img
              src={img}
              alt={imageAlt}
              className={`w-full h-full object-cover object-[center_0%] transition-opacity duration-500 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
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

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#1A2B27] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white/80 hover:text-white hover:bg-black/60 transition-colors"
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#1F2A27] to-[#2A3B36]">
              {imgHigh && !imageError ? (
                <img
                  src={imgHigh}
                  alt={imageAlt}
                  className="w-full object-contain"
                />
              ) : (
                <div className="w-full h-64 flex items-center justify-center">
                  <svg className="w-20 h-20 text-[#FFDD08]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1A2B27] to-transparent" />
            </div>

            {/* Detail content */}
            <div className="p-6 text-white">
              <h2 className="text-xl sm:text-2xl font-bold leading-tight mb-1">{member.name}</h2>
              {member.role && (
                <p className="text-[#FFDD08] text-base sm:text-lg font-medium leading-snug mb-3">{member.role}</p>
              )}
              {member.department && (
                <p className="text-white/80 text-sm leading-snug mb-4">
                  <span className="text-[#FFDD08] font-medium">Departamento: </span>
                  {member.department}
                </p>
              )}
              {member.description && (
                <p className="text-white/90 text-sm sm:text-base leading-relaxed">{member.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
