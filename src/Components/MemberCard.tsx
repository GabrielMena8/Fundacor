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
    <div className="group cursor-pointer bg-gradient-to-l from-[#1f322e]/90 via-[#2A433E]/85 to-[#3B544A]/80 border-2 border-[#FFDD08]/50 p-6 rounded-xl shadow-lg text-center transition-all duration-300 hover:border-[#FFDD08] hover:shadow-[#FFDD08]/20 hover:shadow-xl hover:scale-[1.02]">
      <div className="relative">
        <div className="absolute inset-0 bg-[#FFDD08]/10 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <img
          src={member.photo}
          alt={member.name}
          className="w-36 h-36 object-cover rounded-full border-2 border-[#FFDD08]/50 mx-auto mb-6 shadow-md group-hover:border-[#FFDD08] transition-all duration-300"
        />
      </div>
      <h2 className="font-renogare font-bold text-2xl mb-2 text-[#FFDD08] group-hover:text-[#FFDD08]/90 transition-colors duration-300">
        {member.name}
      </h2>
      <p className="font-caviardreams text-[#FFDD08]/80 text-base group-hover:text-[#FFDD08] transition-colors duration-300">
        {member.position}
      </p>
    </div>
  );
};

export default MemberCard;
