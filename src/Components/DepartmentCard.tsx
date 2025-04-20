// src/Components/DepartmentCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { urlFor } from '../lib/sanity';
import type { Department } from '../Types/sanity';

interface DepartmentCardProps {
  department: Department;
}

export default function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <Link
      to={`/departamento/${department._id}`}
      className="group bg-[#1F322E]/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={urlFor(department.image).width(400).height(400).url()}
          alt={department.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A19]/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-semibold mb-1 group-hover:text-[#FFDD08] transition-colors">
            {department.name}
          </h3>
          <p className="text-white/80 text-sm line-clamp-2">{department.description}</p>
        </div>
      </div>
      <div className="p-4 flex justify-between items-center">
        <div className="text-[#FFDD08] text-sm">
          {department.members.length} members
        </div>
        <span className="text-white group-hover:text-[#FFDD08] transition-colors">
          View Details →
        </span>
      </div>
    </Link>
  );
}
