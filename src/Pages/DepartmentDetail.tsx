// src/Pages/DepartmentDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { sharedStyles } from '../styles/sharedStyles';
import { getMembers } from '../lib/sanity';
import type { Member } from '../Types/sanity';
import MemberCard from '../Components/MemberCard';

const DepartmentDetail: React.FC = () => {
  const { departmentName } = useParams<{ departmentName: string }>();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        if (!departmentName) {
          throw new Error('No department name provided');
        }
        const allMembers = await getMembers();
        console.log('All members:', allMembers);
        
        // Decode the URL parameter and capitalize first letter
        const decodedDepartment = decodeURIComponent(departmentName);
        const formattedDepartment = decodedDepartment.charAt(0).toUpperCase() + decodedDepartment.slice(1);
        console.log('Looking for department:', formattedDepartment);
        
        const departmentMembers = allMembers.filter(member => {
          console.log('Comparing:', member.department, 'with', formattedDepartment);
          return member.department === formattedDepartment;
        });
        console.log('Filtered members:', departmentMembers);
        
        setMembers(departmentMembers);
        setError(null);
      } catch (err) {
        console.error('Error fetching members:', err);
        setError('Failed to load department members');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [departmentName]);

  const goBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${sharedStyles.pageBg} p-6 flex items-center justify-center`}>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[#FFDD08] border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className={`${sharedStyles.titleText} text-xl`}>Cargando miembros...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${sharedStyles.pageBg} p-6 flex items-center justify-center`}>
        <div className="text-center">
          <h1 className={`${sharedStyles.titleText} text-4xl mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]`}>
            Error al cargar los miembros
          </h1>
          <p className="text-white/80 mb-6">{error}</p>
          <button 
            onClick={goBack}
            className={`inline-flex items-center ${sharedStyles.button} px-6 py-3 rounded-lg active:scale-95 transition-transform`}
          >
            <svg 
              className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            <span className="font-medium">Volver al Inicio</span>
          </button>
        </div>
      </div>
    );
  }

  const decodedDepartment = decodeURIComponent(departmentName || '');
  const formattedDepartment = decodedDepartment.charAt(0).toUpperCase() + decodedDepartment.slice(1);

  return (
    <div className={`min-h-screen ${sharedStyles.pageBg}`}>
      {/* Fixed back button on mobile */}
      <div className="sticky top-0 left-0 right-0 z-[100] bg-[#1F322E]/80 backdrop-blur-md shadow-lg px-4 py-2 sm:hidden">
        <button 
          onClick={goBack}
          className="flex items-center justify-center bg-[#FFDD08] text-[#1F322E] px-4 py-2 rounded-lg w-full active:scale-95 transition-transform"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          <span className="font-medium">Volver al Inicio</span>
        </button>
      </div>
      
      <div className={`${sharedStyles.container} relative z-10 p-6`}>
        {/* Desktop back button (hidden on mobile) */}
        <button 
          onClick={goBack}
          className={`hidden sm:inline-flex items-center ${sharedStyles.button} px-4 py-2 rounded-lg mb-8 active:scale-95 transition-transform`}
        >
          <svg 
            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          <span className="font-medium">Volver al Inicio</span>
        </button>
        
        <div className="text-center mb-12">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center blur-sm opacity-20">
              <h1 className={`${sharedStyles.importantHeader} text-6xl ${sharedStyles.titleGlow}`}>
                {formattedDepartment}
              </h1>
            </div>
            <h1 className={`${sharedStyles.importantHeader} text-4xl md:text-5xl mb-4 relative z-10 ${sharedStyles.titleGlow}`}>
              {formattedDepartment}
            </h1>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <div className={`w-16 h-1 ${sharedStyles.divider}`}></div>
            <div className={`w-24 h-1 ${sharedStyles.accentDivider}`}></div>
            <div className={`w-16 h-1 ${sharedStyles.divider}`}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <MemberCard key={member._id} member={member} />
          ))}
        </div>

        {members.length === 0 && (
          <div className="text-center text-white/80 mt-8">
            No hay miembros en este departamento.
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentDetail;
