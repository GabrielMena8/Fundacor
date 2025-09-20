// src/Components/DepartmentCard.tsx
import { Link } from 'react-router-dom';
import { imageUrl } from '../lib/sanity';
import type { DepartmentDoc } from '../Types/sanity';

interface DepartmentCardProps {
  department: DepartmentDoc;
}

import { useState } from 'react';
import { useOnVisiblePrefetch, usePrefetchDepartmentDetail } from '../Hooks/usePrefetch';

export default function DepartmentCard({ department }: DepartmentCardProps) {
  const [loaded, setLoaded] = useState(false);
  const prefetchDep = usePrefetchDepartmentDetail();
  const setVisibleRef = useOnVisiblePrefetch(() => prefetchDep(department.name));
  return (
    <Link
      ref={setVisibleRef as unknown as React.Ref<HTMLAnchorElement>}
      to={`/departamento/${department._id}`}
      className="group bg-[#1F322E]/90 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => prefetchDep(department.name)}
      onFocus={() => prefetchDep(department.name)}
    >
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#1F2A27] to-[#2A3B36]">
        {!loaded && <div className="absolute inset-0 bg-white/5 z-[5]"></div>}
        <img
          src={imageUrl(department.image, { width: 400, height: 400 })}
          alt={department.name}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
          className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
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
          {(department.members?.length ?? 0)} members
        </div>
        <span className="text-white group-hover:text-[#FFDD08] transition-colors">
          View Details →
        </span>
      </div>
    </Link>
  );
}
