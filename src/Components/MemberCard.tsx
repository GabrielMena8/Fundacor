// src/Components/MemberCard.tsx
import React from 'react';

export type Member = {
  id: string;
  name: string;
  position: string;
  photo: string;
};

type MemberCardProps = {
  member: Member;
};

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    <div className="cursor-pointer bg-gradient-to-l from-[#1f322e]/90 via-[#2A433E]/85 to-[#3B544A]/80 border-2 border-[#FFDD08] p-4 rounded-md shadow-lg text-center transition-opacity hover:opacity-95">
      <img
        src={member.photo}
        alt={member.name}
        className="w-32 h-32 object-cover rounded-full border border-[#FFDD08] mx-auto mb-4 shadow-md"
      />
      <h2 className="font-renogare font-bold text-xl mb-1 text-[#FFDD08]">
        {member.name}
      </h2>
      <p className="font-caviardreams text-[#FFDD08] text-sm">
        {member.position}
      </p>
    </div>
  );
};

export default MemberCard;
