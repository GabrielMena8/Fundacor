// src/Pages/DepartmentDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MemberCard, { Member } from '../Components/MemberCard';
import { sharedStyles } from '../styles/sharedStyles';

type DepartmentData = {
  id: string;
  name: string;
  members: Member[];
};

const DepartmentDetail: React.FC = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const [department, setDepartment] = useState<DepartmentData | null>(null);
  const [loading, setLoading] = useState(true);

  // Direct navigation to home page
  const goToHome = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    const fetchDepartmentData = async () => {
      setLoading(true);
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const simulatedData: { [key: string]: DepartmentData } = {
        'gerencia': {
          id: 'gerencia',
          name: 'Gerencia',
          members: [
            {
              id: 'gerencia-1',
              name: 'José Mendoza',
              position: 'Gerente General',
              photo: '/placeholder.png',
            },
            {
              id: 'gerencia-2',
              name: 'María Ramírez',
              position: 'Asistente de Gerencia',
              photo: '/placeholder.png',
            },
          ],
        },
        'administracion': {
          id: 'administracion',
          name: 'Administración',
          members: [
            {
              id: 'admin-1',
              name: 'Rafael Torres',
              position: 'Director Administrativo',
              photo: '/placeholder.png',
            },
            {
              id: 'admin-2',
              name: 'Carmen Silva',
              position: 'Coordinadora Administrativa',
              photo: '/placeholder.png',
            },
            {
              id: 'admin-3',
              name: 'Eduardo Blanco',
              position: 'Asistente Administrativo',
              photo: '/placeholder.png',
            },
          ],
        },
        'contabilidad': {
          id: 'contabilidad',
          name: 'Contabilidad',
          members: [
            {
              id: 'conta-1',
              name: 'Laura Rodríguez',
              position: 'Contadora General',
              photo: '/placeholder.png',
            },
            {
              id: 'conta-2',
              name: 'Daniel Morales',
              position: 'Auxiliar Contable',
              photo: '/placeholder.png',
            },
          ],
        },
        'legal': {
          id: 'legal',
          name: 'Legal',
          members: [
            {
              id: 'legal-1',
              name: 'Alicia Fernández',
              position: 'Asesora Legal',
              photo: '/placeholder.png',
            },
            {
              id: 'legal-2',
              name: 'Víctor Guzmán',
              position: 'Abogado',
              photo: '/placeholder.png',
            },
          ],
        },
        'recursos-humanos': {
          id: 'recursos-humanos',
          name: 'Recursos Humanos',
          members: [
            {
              id: 'rrhh-1',
              name: 'Marina Pérez',
              position: 'Directora de RRHH',
              photo: '/placeholder.png',
            },
            {
              id: 'rrhh-2',
              name: 'Juan Soto',
              position: 'Especialista en Reclutamiento',
              photo: '/placeholder.png',
            },
            {
              id: 'rrhh-3',
              name: 'Patricia Mendez',
              position: 'Coordinadora de Bienestar Laboral',
              photo: '/placeholder.png',
            },
          ],
        },
        'marketing': {
          id: 'marketing',
          name: 'Marketing',
          members: [
            {
              id: 'marketing-1',
              name: 'Carlos Andrade',
              position: 'Director de Marketing',
              photo: '/placeholder.png',
            },
            {
              id: 'marketing-2',
              name: 'Ana Castillo',
              position: 'Diseñadora Gráfica',
              photo: '/placeholder.png',
            },
            {
              id: 'marketing-3',
              name: 'Gabriel Mena',
              position: 'Community Manager',
              photo: '/placeholder.png',
            },
          ],
        },
        'tecnologia': {
          id: 'tecnologia',
          name: 'Tecnología',
          members: [
            {
              id: 'tech-1',
              name: 'Roberto Suárez',
              position: 'Director de Tecnología',
              photo: '/placeholder.png',
            },
            {
              id: 'tech-2',
              name: 'Isabel Martínez',
              position: 'Desarrolladora Frontend',
              photo: '/placeholder.png',
            },
            {
              id: 'tech-3',
              name: 'Miguel Ángel',
              position: 'Desarrollador Backend',
              photo: '/placeholder.png',
            },
          ],
        },
        'operaciones': {
          id: 'operaciones',
          name: 'Operaciones',
          members: [
            {
              id: 'ops-1',
              name: 'Fernando Jiménez',
              position: 'Director de Operaciones',
              photo: '/placeholder.png',
            },
            {
              id: 'ops-2',
              name: 'Luisa Hernández',
              position: 'Coordinadora de Logística',
              photo: '/placeholder.png',
            },
            {
              id: 'ops-3',
              name: 'Ricardo Ponce',
              position: 'Supervisor de Campo',
              photo: '/placeholder.png',
            },
          ],
        },
      };

      const data = simulatedData[departmentId || ''] || null;
      setDepartment(data);
      setLoading(false);
    };

    fetchDepartmentData();
  }, [departmentId]);

  // SVG logo path for background pattern
  const logoBackgroundUrl = "/LogoFUNDACOR.svg";

  if (loading) {
    return (
      <div className={`min-h-screen ${sharedStyles.pageBg} p-6 flex items-center justify-center`}>
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-[#FFDD08] border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className={`${sharedStyles.titleText} text-xl`}>Cargando departamento...</div>
        </div>
      </div>
    );
  }

  if (!department) {
    return (
      <div className={`min-h-screen ${sharedStyles.pageBg} p-6 flex items-center justify-center`}>
        <div className="text-center">
          <h1 className={`${sharedStyles.titleText} text-4xl mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]`}>
            Departamento no encontrado
          </h1>
          <button 
            onClick={goToHome}
            className={`inline-flex items-center ${sharedStyles.button} px-6 py-3 rounded-lg active:scale-95 transition-transform`}
            style={{ touchAction: 'manipulation' }}
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

  return (
    <div className={`min-h-screen ${sharedStyles.pageBg}`}>
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 z-0 opacity-10" 
        style={{ 
          backgroundImage: `url(${logoBackgroundUrl})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px',
          backgroundPosition: '30px 30px',
          filter: 'blur(0.5px)',
          pointerEvents: 'none'
        }}
      />
      
      {/* Fixed back button on mobile */}
      <div className="sticky top-0 left-0 right-0 z-[100] bg-[#1F322E]/80 backdrop-blur-md shadow-lg px-4 py-2 sm:hidden">
        <button 
          onClick={goToHome}
          className="flex items-center justify-center bg-[#FFDD08] text-[#1F322E] px-4 py-2 rounded-lg w-full active:scale-95 transition-transform"
          style={{ touchAction: 'manipulation' }}
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
          onClick={goToHome}
          className={`hidden sm:inline-flex items-center ${sharedStyles.button} px-4 py-2 rounded-lg mb-8 active:scale-95 transition-transform`}
          style={{ touchAction: 'manipulation' }}
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
        
        <div className={`text-center mb-12 ${sharedStyles.fadeIn} mt-6 sm:mt-0`}>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center blur-sm opacity-20">
              <h1 className={`${sharedStyles.importantHeader} text-7xl ${sharedStyles.titleGlow}`}>
                {department.name}
              </h1>
            </div>
            <h1 className={`${sharedStyles.importantHeader} text-4xl md:text-5xl mb-4 relative z-10 ${sharedStyles.titleGlow}`}>
              {department.name}
            </h1>
          </div>
          
          <div className="flex items-center justify-center space-x-4">
            <div className={`w-16 h-1 ${sharedStyles.divider}`}></div>
            <div className={`w-24 h-1 ${sharedStyles.accentDivider}`}></div>
            <div className={`w-16 h-1 ${sharedStyles.divider}`}></div>
          </div>
          
          <p className="max-w-2xl mx-auto mt-4 text-white/80">
            Equipo de profesionales que conforman el departamento de {department.name}
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {department.members.map((member, index) => (
            <div 
              key={member.id}
              className={`${sharedStyles.fadeIn}`}
              style={{ 
                animationDelay: `${index * 150}ms`,
                transform: `translateY(${index * 10}px)`, 
                opacity: 0,
                animation: `fadeInUp 0.6s ease-out ${index * 0.15}s forwards`
              }}
            >
              <MemberCard member={member} />
            </div>
          ))}
        </div>
        
        {/* Extra back button at bottom for mobile - better UX */}
        <div className="mt-12 sm:hidden">
          <button 
            onClick={goToHome}
            className="flex items-center justify-center bg-[#FFDD08] text-[#1F322E] px-4 py-3 rounded-lg w-full active:scale-95 transition-transform"
            style={{ touchAction: 'manipulation' }}
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
      </div>
    </div>
  );
};

export default DepartmentDetail;
