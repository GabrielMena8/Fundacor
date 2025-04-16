// src/Pages/LandingPage.tsx
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useSpring } from '@react-spring/three';
import Model from '../Components/Model';
import AnimatedCamera from '../Components/AnimatedCamera';
import EventsPanel from '../Components/EventsPanel';
import OrganigramaPanel from '../Components/OrganigramaPanel';
import MissionVisionPanel from '../Components/MissionVisionPanel';
import { useMediaQuery } from '../Hooks/useMediaQuery';
import { ModelRotationProps } from '../Types/modelTypes';

const LandingPage: React.FC = () => {
  const isMobileOrTablet = useMediaQuery('(max-width: 768px)');

  // -------- POSICIONES DE CÁMARA --------
  const initialCameraPosMobile: [number, number, number] = [0, 0, 15];
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

  // Tooltip (solo desktop)
  const [showTooltip, setShowTooltip] = useState(true);
  useEffect(() => {
    if (!isMobileOrTablet) {
      const timer = setTimeout(() => setShowTooltip(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isMobileOrTablet]);

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
      {isMobileOrTablet ? (
        // ---------------- MÓVIL/TABLET ----------------
        <div className="flex flex-col h-full">
          <div className="w-full h-1/2">
            <Canvas className="w-full h-full" camera={{ position: initialCameraPos, fov: 40 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} />
              <Environment preset="sunset" />
              <Model
                onLeftClick={handleLeftClick}
                onRightClick={handleRightClick}
                onTopClick={handleTopClick}
                rotation={modelRotation}
                scale={modelScale}
                disableInteractivity={false}
              />
              <AnimatedCamera target={cameraTarget} />
            </Canvas>
          </div>

          {/* Render condicional de paneles según estado */}
          <div className="w-full flex flex-col">
            {showEventsPanel && <EventsPanel show={true} mobile={true} />}
            {showOrganigramaPanel && <OrganigramaPanel show={true} mobile={true} />}
            {showMissionVisionPanel && <MissionVisionPanel show={true} mobile={true} />}
          </div>
        </div>
      ) : (
        // ---------------- DESKTOP ----------------
        <div className="relative w-full h-full">
          <Canvas className="absolute inset-0" camera={{ position: initialCameraPos, fov: 40 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <Environment preset="sunset" />
            <Model
              onLeftClick={handleLeftClick}
              onRightClick={handleRightClick}
              onTopClick={handleTopClick}
              rotation={modelRotation}
              scale={modelScale}
            />
            <AnimatedCamera target={cameraTarget} />
          </Canvas>

          {/* Overlays en desktop */}
          <OrganigramaPanel show={showOrganigramaPanel} mobile={false} />
          <EventsPanel show={showEventsPanel} mobile={false} />
          <MissionVisionPanel show={showMissionVisionPanel} mobile={false} />
        </div>
      )}

      {/* Logo y tooltip cuando no hay panel abierto */}
      {!isAnyPanelOpen && (
        <div className="absolute top-2 left-2 z-50 flex items-center space-x-2 bg-white/20 px-4 pb-4 rounded-xl shadow-lg">
          <img src="/LogoFUNDACOR.svg" alt="Logo" className="w-36" />
          {!isMobileOrTablet && showTooltip && (
            <span className="font-renogare text-sm text-[#1F322E] bg-[#FFDD08] px-2 py-1 rounded">
              Haz clic en la gema para explorar
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
