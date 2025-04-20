// src/Pages/LandingPage.tsx
import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Preload } from '@react-three/drei';
import { useSpring } from '@react-spring/three';
import Model from '../Components/Model';
import AnimatedCamera from '../Components/AnimatedCamera';
import EventsPanel from '../Components/EventsPanel';
import OrganigramaPanel from '../Components/OrganigramaPanel';
import MissionVisionPanel from '../Components/MissionVisionPanel';
import { useMediaQuery } from '../Hooks/useMediaQuery';
import { ModelRotationProps } from '../Types/modelTypes';
import { sharedStyles } from '../styles/sharedStyles';

// SVG logo path for background pattern
const logoBackgroundUrl = new URL('/LogoFUNDACOR.svg', import.meta.url).href;

// Progressive loading states
const LoadingStates = {
  INITIAL: 'initial',
  MODEL_LOADED: 'model_loaded',
  COMPLETE: 'complete'
} as const;

type LoadingState = typeof LoadingStates[keyof typeof LoadingStates];

const Loader: React.FC<{ loadingState: LoadingState }> = ({ loadingState }) => {
  const getLoadingText = () => {
    switch (loadingState) {
      case LoadingStates.INITIAL:
        return 'Iniciando...';
      case LoadingStates.MODEL_LOADED:
        return 'Cargando recursos...';
      case LoadingStates.COMPLETE:
        return 'Completado';
      default:
        return 'Cargando...';
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-l from-[#1f322e]/50 via-[#2A433E]/40 to-[#3B544A]/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-[#FFDD08]/80 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className={`${sharedStyles.titleText} text-xl opacity-80`}>{getLoadingText()}</div>
        <div className="mt-2 text-sm text-white/60">
          {loadingState === LoadingStates.MODEL_LOADED && 'Optimizando renderizado...'}
        </div>
      </div>
    </div>
  );
};

const Tooltip: React.FC<{ show: boolean }> = ({ show }) => {
  return (
    <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[60] transition-all duration-500 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
      <div className="bg-[#1f322e]/95 backdrop-blur-md border-2 border-[#FFDD08]/50 rounded-xl p-4 shadow-lg shadow-[#FFDD08]/20">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-[#FFDD08]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className={`${sharedStyles.importantHeader} text-lg mb-1 ${sharedStyles.titleGlow}`}>¡Explora la Corona!</h3>
            <p className={`${sharedStyles.bodyText} text-sm`}>
              Haz clic en los diferentes elementos para descubrir más información
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingPage: React.FC = () => {
  const isMobileOrTablet = useMediaQuery('(max-width: 768px)');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingStates.INITIAL);
  const [showTooltip, setShowTooltip] = useState(true);

  // -------- POSICIONES DE CÁMARA --------
  const initialCameraPosMobile: [number, number, number] = [0, 0, 15]; // Restore original position
  const initialCameraPosDesktop: [number, number, number] = [0, 1, 15];

  const alternativeCameraPosRight: [number, number, number] = [4, 1, 12];
  const alternativeCameraPosLeft: [number, number, number] = [-4, 1, 12];
  const alternativeCameraPosTop: [number, number, number] = [0, 4, 12];

  const initialCameraPos = isMobileOrTablet
    ? initialCameraPosMobile
    : initialCameraPosDesktop;

  // -------- ESTADOS DE INTERFAZ --------
  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>(
    initialCameraPos
  );

  const [showEventsPanel, setShowEventsPanel] = useState(false);
  const [showOrganigramaPanel, setShowOrganigramaPanel] = useState(false);
  const [showMissionVisionPanel, setShowMissionVisionPanel] = useState(false);

  // Para saber si ya hay algún panel abierto
  const isAnyPanelOpen =
    showEventsPanel || showOrganigramaPanel || showMissionVisionPanel;

  // Loading state management
  useEffect(() => {
    // Initial loading state
    const initialTimer = setTimeout(() => {
      setLoadingState(LoadingStates.MODEL_LOADED);
    }, 1000);

    // Complete loading state
    const completeTimer = setTimeout(() => {
      setLoadingState(LoadingStates.COMPLETE);
      setShowTooltip(false);
    }, 2000);

    // Add event listener for closing events panel
    const handleCloseEventsPanel = () => {
      setShowEventsPanel(false);
    };
    
    window.addEventListener('closeEventsPanel', handleCloseEventsPanel);
    
    return () => {
      clearTimeout(initialTimer);
      clearTimeout(completeTimer);
      window.removeEventListener('closeEventsPanel', handleCloseEventsPanel);
    };
  }, []); // Run once on component mount

  const isLoading = loadingState !== LoadingStates.COMPLETE;

  // -------- ANIMACIÓN DE ROTACIÓN DEL MODELO --------
  const [springs, api] = useSpring(() => ({
    rotationX: Math.PI / 2, // Rotación inicial
    rotationY: 0,
    rotationZ: 0,
    config: { mass: 1, tension: 50, friction: 20 },
  }));

  // Función que resetea el modelo a su rotación/cámara inicial:
  const resetToInitialState = () => {
    // Cierra todos los paneles
    setShowEventsPanel(false);
    setShowOrganigramaPanel(false);
    setShowMissionVisionPanel(false);

    // Devuelve la corona a la rotación inicial
    api.start({
      rotationX: Math.PI / 2,
      rotationY: 0,
      rotationZ: 0,
    });

    // Cámara a la posición inicial
    setCameraTarget(initialCameraPos);
  };

  // Funciones para abrir cada panel, con su respectiva rotación/cámara
  const openMissionVision = () => {
    setShowMissionVisionPanel(true);
    setShowOrganigramaPanel(false);
    setShowEventsPanel(false);

    setCameraTarget(alternativeCameraPosTop);
    api.start({
      rotationX: Math.PI / 6, // Corona algo inclinada
      rotationY: 0,
      rotationZ: 0,
    });
  };

  const openOrganigrama = () => {
    setShowOrganigramaPanel(true);
    setShowEventsPanel(false);
    setShowMissionVisionPanel(false);

    setCameraTarget(alternativeCameraPosLeft);
    api.start({
      rotationX: Math.PI / 2,
      rotationY: 0,
      rotationZ: Math.PI / 6,
    });
  };

  const openEvents = () => {
    setShowEventsPanel(true);
    setShowOrganigramaPanel(false);
    setShowMissionVisionPanel(false);

    setCameraTarget(alternativeCameraPosRight);
    api.start({
      rotationX: Math.PI / 2,
      rotationY: 0,
      rotationZ: -Math.PI / 6,
    });
  };

  // -------- HANDLERS --------
  const handleTopClick = () => {
    if (isMobileOrTablet) {
      // Mobile: abrimos directamente (sin animaciones intermedias)
      setShowMissionVisionPanel(true);
      setShowOrganigramaPanel(false);
      setShowEventsPanel(false);
      return;
    }

    // Desktop
    if (showMissionVisionPanel) {
      // Misión/Visión ya está abierto => Cerrarlo y reset
      resetToInitialState();
    } else {
      // Si hay otro panel abierto (Organigrama/Events), primero reset
      if (isAnyPanelOpen) {
        resetToInitialState();
        // Esperar un breve lapso para que se complete la animación de reset,
        // luego abrir Misión/Visión
        setTimeout(() => {
          openMissionVision();
        }, 600); // medio segundo, por ejemplo
      } else {
        // No hay panel abierto => abrir Misión/Visión inmediatamente
        openMissionVision();
      }
    }
  };

  const handleLeftClick = () => {
    if (isMobileOrTablet) {
      setShowOrganigramaPanel(true);
      setShowEventsPanel(false);
      setShowMissionVisionPanel(false);
      return;
    }

    if (showOrganigramaPanel) {
      // Organigrama ya abierto => Cerrar y reset
      resetToInitialState();
    } else {
      // Si hay otro panel abierto
      if (isAnyPanelOpen) {
        resetToInitialState();
        setTimeout(() => {
          openOrganigrama();
        }, 600);
      } else {
        openOrganigrama();
      }
    }
  };

  const handleRightClick = () => {
    if (isMobileOrTablet) {
      setShowEventsPanel(true);
      setShowOrganigramaPanel(false);
      setShowMissionVisionPanel(false);
      return;
    }

    if (showEventsPanel) {
      // Eventos ya abierto => Cerrar y reset
      resetToInitialState();
    } else {
      // Otro panel estaba abierto => reset, luego abrir
      if (isAnyPanelOpen) {
        resetToInitialState();
        setTimeout(() => {
          openEvents();
        }, 600);
      } else {
        openEvents();
      }
    }
  };

  // -------- PROPS PARA EL MODELO --------
  const modelRotation: ModelRotationProps = {
    rotationX: springs.rotationX,
    rotationY: springs.rotationY,
    rotationZ: springs.rotationZ,
  };

  const modelScale = isMobileOrTablet ? 0.75 : 1;

  // -------- RENDER --------
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[#f4e7e7] to-[#F5F5F5] relative font-caviardreams">
      {isLoading && <Loader loadingState={loadingState} />}
      
      {/* Copyright disclaimer */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-[#1F322E]/70 text-center z-10 w-full px-4">
        <p>© 2023 Fundación Coromotana. Todos los derechos reservados.</p>
        <p className="text-[10px] mt-1">Diseño por Vortex.</p>
      </div>
      
      {/* Show tooltip only if not loading */}
      {showTooltip && !isLoading && <Tooltip show={showTooltip} />}
      
      {isMobileOrTablet ? (
        // ---------------- MÓVIL/TABLET ----------------
        <div className="flex flex-col h-full">
          {/* SVG Background Pattern */}
          <div 
            className="absolute inset-0 z-0 opacity-15" 
            style={{ 
              backgroundImage: `url(${logoBackgroundUrl})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '200px',
              backgroundPosition: '30px 30px',
              filter: 'blur(0.5px)',
              pointerEvents: 'none',
              willChange: 'background-image'
            }}
            role="presentation"
            aria-hidden="true"
          />
          
          <div className="w-full h-3/5 relative z-10 flex items-center justify-center">
            <Canvas className="w-full h-full" camera={{ position: initialCameraPos, fov: 40 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <Environment preset="sunset" />
                <Model
                  onLeftClick={handleLeftClick}
                  onRightClick={handleRightClick}
                  onTopClick={handleTopClick}
                  rotation={modelRotation}
                  scale={modelScale}
                  disableInteractivity={isLoading}
                />
                <AnimatedCamera target={cameraTarget} />
                <Preload all />
              </Suspense>
            </Canvas>
            
            {/* Mobile navigation guidance - show more prominent buttons instead */}
            {!isAnyPanelOpen && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="bg-[#1F322E]/80 backdrop-blur-sm rounded-full px-5 py-3 flex items-center space-x-3 shadow-lg border border-[#FFDD08]/20">
                  <div className="text-xs text-center text-white/80">
                    <span className="text-[#FFDD08] font-renogare">Toca</span> los botones para explorar
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile navigation buttons - make these more prominent */}
          {!isAnyPanelOpen && (
            <div className="absolute bottom-28 left-0 right-0 flex justify-center items-center space-x-6 z-20">
              <button 
                onClick={handleLeftClick}
                className="p-4 bg-[#1F322E]/90 rounded-full shadow-lg border-2 border-[#FFDD08]/50 hover:border-[#FFDD08]/80 transition-all duration-300 active:scale-95"
                aria-label="Ver organigrama"
              >
                <svg className="w-7 h-7 text-[#FFDD08]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </button>
              <button 
                onClick={handleTopClick}
                className="p-4 bg-[#1F322E]/90 rounded-full shadow-lg border-2 border-[#FFDD08]/50 hover:border-[#FFDD08]/80 transition-all duration-300 active:scale-95"
                aria-label="Ver misión y visión"
              >
                <svg className="w-7 h-7 text-[#FFDD08]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </button>
              <button 
                onClick={handleRightClick}
                className="p-4 bg-[#1F322E]/90 rounded-full shadow-lg border-2 border-[#FFDD08]/50 hover:border-[#FFDD08]/80 transition-all duration-300 active:scale-95"
                aria-label="Ver eventos"
              >
                <svg className="w-7 h-7 text-[#FFDD08]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          )}

          {/* Render panels */}
          <div className="w-full flex flex-col">
            <EventsPanel show={showEventsPanel} isMobile={isMobileOrTablet} />
            <OrganigramaPanel show={showOrganigramaPanel} isMobile={isMobileOrTablet} />
            <MissionVisionPanel show={showMissionVisionPanel} isMobile={isMobileOrTablet} />
          </div>
          {/* Show a close button when a panel is open */}
          {isAnyPanelOpen && (
            <button 
              onClick={resetToInitialState}
              className="fixed top-4 right-4 p-2 bg-[#1F322E]/90 rounded-full shadow-lg border border-[#FFDD08]/30 hover:border-[#FFDD08]/50 transition-all duration-300 z-50"
            >
              <svg className="w-5 h-5 text-[#FFDD08]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      ) : (
        // ---------------- DESKTOP ----------------
        <div className="relative w-full h-full">
          {/* SVG Background Pattern */}
          <div 
            className="absolute inset-0 z-0 opacity-15" 
            style={{ 
              backgroundImage: `url(${logoBackgroundUrl})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '200px',
              backgroundPosition: '30px 30px',
              filter: 'blur(0.5px)',
              pointerEvents: 'none',
              willChange: 'background-image'
            }}
            role="presentation"
            aria-hidden="true"
          />
          
          <Canvas className="absolute inset-0 z-10" camera={{ position: initialCameraPos, fov: 40 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} />
              <Environment preset="sunset" />
              <Model
                onLeftClick={handleLeftClick}
                onRightClick={handleRightClick}
                onTopClick={handleTopClick}
                rotation={modelRotation}
                scale={modelScale}
                disableInteractivity={isLoading}
              />
              <AnimatedCamera target={cameraTarget} />
              <Preload all />
            </Suspense>
          </Canvas>

          {/* Render panels */}
          <EventsPanel show={showEventsPanel} isMobile={isMobileOrTablet} />
          <OrganigramaPanel show={showOrganigramaPanel} isMobile={isMobileOrTablet} />
          <MissionVisionPanel show={showMissionVisionPanel} isMobile={isMobileOrTablet} />
        </div>
      )}
    </div>
  );
};

export default LandingPage;
