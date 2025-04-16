// src/Components/DepartmentCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export type DepartmentItem = {
  id: string;
  name: string;
  image?: string; // Opcional
};

type DepartmentCardProps = {
  department: DepartmentItem;
};

const DepartmentCard: React.FC<DepartmentCardProps> = ({ department }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/departamento/${department.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-gradient-to-l from-[#1f322e]/90 via-[#2A433E]/85 to-[#3B544A]/80 border-2 border-[#FFDD08] p-4 rounded-md shadow-lg text-center transition-opacity hover:opacity-95"
    >
      {department.image && (
        <img
          src={department.image}
          alt={department.name}
          className="w-full h-auto object-cover rounded mb-2 shadow-md border border-[#FFDD08]"
        />
      )}
      <h3 className="font-renogare font-bold text-xl mb-1 text-[#FFDD08]">
        {department.name}
      </h3>
    </div>
  );
};

export default DepartmentCard;
