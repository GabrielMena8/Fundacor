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

  // Posiciones de cámara (sin modificar el tamaño de la corona)
  const initialCameraPosMobile: [number, number, number] = [0, 0, 15];
  const initialCameraPosDesktop: [number, number, number] = [0, 1, 15];

  // Para desktop, mantenemos los targets originales
  const alternativeCameraPosRight: [number, number, number] = [4, 1, 12];
  const alternativeCameraPosLeft: [number, number, number] = [-4, 1, 12];
  const alternativeCameraPosTop: [number, number, number] = [0, 4, 12];

  const initialCameraPos = isMobileOrTablet ? initialCameraPosMobile : initialCameraPosDesktop;

  // Estados para overlays
  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>(initialCameraPos);
  const [showEventsPanel, setShowEventsPanel] = useState(false);
  const [showOrganigramaPanel, setShowOrganigramaPanel] = useState(false);
  const [showMissionVisionPanel, setShowMissionVisionPanel] = useState(false);

  // Tooltip (solo desktop)
  const [showTooltip, setShowTooltip] = useState(true);
  useEffect(() => {
    if (!isMobileOrTablet) {
      const timer = setTimeout(() => setShowTooltip(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isMobileOrTablet]);

  // Animaciones de rotación
  const [springs, api] = useSpring(() => ({
    rotationX: Math.PI / 2,
    rotationY: 0,
    rotationZ: 0,
    config: { mass: 1, tension: 50, friction: 20 },
  }));

  // ---------------- HANDLERS ----------------
  const handleTopClick = () => {
    if (isMobileOrTablet) {
      setShowMissionVisionPanel(true);
      setShowOrganigramaPanel(false);
      setShowEventsPanel(false);
    } else {
      if (showMissionVisionPanel) {
        setCameraTarget(initialCameraPos);
        setShowMissionVisionPanel(false);
        api.start({ rotationX: Math.PI / 2 });
      } else {
        setCameraTarget(alternativeCameraPosTop);
        setShowMissionVisionPanel(true);
        setShowOrganigramaPanel(false);
        setShowEventsPanel(false);
        api.start({ rotationX: Math.PI / 6 });
      }
    }
  };

  const handleLeftClick = () => {
    if (isMobileOrTablet) {
      setShowOrganigramaPanel(true);
      setShowEventsPanel(false);
      setShowMissionVisionPanel(false);
    } else {
      const isAlternative =
        cameraTarget[0] === alternativeCameraPosLeft[0] &&
        cameraTarget[2] === alternativeCameraPosLeft[2] &&
        showOrganigramaPanel;
      if (isAlternative) {
        setCameraTarget(initialCameraPos);
        setShowOrganigramaPanel(false);
        api.start({ rotationZ: 0 });
      } else {
        setCameraTarget(alternativeCameraPosLeft);
        setShowOrganigramaPanel(true);
        setShowEventsPanel(false);
        setShowMissionVisionPanel(false);
        api.start({ rotationZ: Math.PI / 6 });
      }
    }
  };

  const handleRightClick = () => {
    if (isMobileOrTablet) {
      setShowEventsPanel(true);
      setShowOrganigramaPanel(false);
      setShowMissionVisionPanel(false);
    } else {
      const isAlternative =
        cameraTarget[0] === alternativeCameraPosRight[0] &&
        cameraTarget[2] === alternativeCameraPosRight[2] &&
        showEventsPanel;
      if (isAlternative) {
        setCameraTarget(initialCameraPos);
        setShowEventsPanel(false);
        api.start({ rotationZ: 0 });
      } else {
        setCameraTarget(alternativeCameraPosRight);
        setShowEventsPanel(true);
        setShowOrganigramaPanel(false);
        setShowMissionVisionPanel(false);
        api.start({ rotationZ: -Math.PI / 6 });
      }
    }
  };

  // Prop para rotaciones
  const modelRotation: ModelRotationProps = {
    rotationX: springs.rotationX,
    rotationY: springs.rotationY,
    rotationZ: springs.rotationZ,
  };

  // Escala del modelo
  const modelScale = isMobileOrTablet ? 0.75 : 1;

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[#f4e7e7] to-[#F5F5F5] relative font-caviardreams">
      {isMobileOrTablet ? (
        // MOBILE
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
          <div className="w-full flex flex-col">
            <EventsPanel show={true} mobile={true} />
            <OrganigramaPanel show={true} mobile={true} />
            <MissionVisionPanel show={true} mobile={true} />
          </div>
        </div>
      ) : (
        // DESKTOP
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
      {!(showOrganigramaPanel || showEventsPanel || showMissionVisionPanel) && (
        <div className="absolute top-2 left-2 z-50 flex items-center space-x-2 bg-white/20 px-3 py-1 rounded shadow-lg">
          <img src="/LogoFUNDACOR.svg" alt="Logo" className="w-16" />
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
