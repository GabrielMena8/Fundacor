// src/Pages/LandingPage.tsx
import React, { useState } from 'react';
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

  // Posiciones de cámara
  const initialCameraPosMobile: [number, number, number] = [0, 0, 15];
  const initialCameraPosDesktop: [number, number, number] = [0, 1, 15];

  // Overlays en desktop
  const alternativeCameraPosRight: [number, number, number] = [4, 1, 12];
  const alternativeCameraPosLeft: [number, number, number] = [-4, 1, 12];
  const alternativeCameraPosTop: [number, number, number] = [0, 4, 12];

  const initialCameraPos = isMobileOrTablet ? initialCameraPosMobile : initialCameraPosDesktop;

  // Estados para overlays en desktop
  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>(initialCameraPos);
  const [showEventsPanel, setShowEventsPanel] = useState(false);
  const [showOrganigramaPanel, setShowOrganigramaPanel] = useState(false);
  const [showMissionVisionPanel, setShowMissionVisionPanel] = useState(false);

  const [springs, api] = useSpring(() => ({
    rotationX: Math.PI / 2,
    rotationY: 0,
    rotationZ: 0,
    config: { mass: 1, tension: 50, friction: 20 },
  }));

  // Handler para clic en la parte superior -> Misión y Visión
  const handleTopClick = () => {
    if (isMobileOrTablet) {
      setShowMissionVisionPanel(true);
      // Opcional: ocultar otros paneles
      setShowOrganigramaPanel(false);
      setShowEventsPanel(false);
    } else {
      const isAlternative = showMissionVisionPanel;
      if (isAlternative) {
        setCameraTarget(initialCameraPos);
        setShowMissionVisionPanel(false);
        api.start({ rotationX: Math.PI / 2 });
      } else {
        setCameraTarget(alternativeCameraPosTop);
        setShowMissionVisionPanel(true);
        setShowOrganigramaPanel(false);
        setShowEventsPanel(false);
        // Para misión/visión, sin rotación en Z (o ajusta si lo prefieres)
        api.start({ rotationX: Math.PI / 6 });
      }
    }
  };

  // Handler para clic en la parte izquierda -> Organigrama
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

  // Handler para clic en la parte derecha -> Eventos
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

  const modelRotation: ModelRotationProps = {
    rotationX: springs.rotationX,
    rotationY: springs.rotationY,
    rotationZ: springs.rotationZ,
  };

  // Escala del modelo: en mobile 0.75, en desktop 1
  const modelScale = isMobileOrTablet ? 0.75 : 1;
  return (
    <div className="w-screen h-screen bg-gray-50 relative font-caviardreams">
      {isMobileOrTablet ? (
        // MOBILE: Canvas en la mitad superior, secciones debajo
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
          {/* Secciones en orden normal (scroll normal) */}
          <div className="w-full flex flex-col">
            {/* Sección de Eventos */}
            <EventsPanel show={true} mobile={true} />
            {/* Sección de Organigrama */}
            <OrganigramaPanel show={true} mobile={true} />

            {/* Sección de Misión y Visión */}
            <MissionVisionPanel show={true} mobile={true} />
          </div>
        </div>
      ) : (
        // DESKTOP: Canvas a pantalla completa y overlays
        <div className="relative w-full h-full">
          <Canvas className="absolute inset-0" camera={{ position: initialCameraPos, fov: 40 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <Environment preset="sunset" />
            <Model
              onLeftClick={handleLeftClick}
              onRightClick={handleRightClick}
              onTopClick={handleTopClick    }
              rotation={modelRotation}
              scale={modelScale}
            />
            <AnimatedCamera target={cameraTarget} />
          </Canvas>
          <OrganigramaPanel show={showOrganigramaPanel} mobile={false} />
          <EventsPanel show={showEventsPanel} mobile={false} />
          <MissionVisionPanel show={showMissionVisionPanel} mobile={false} />
        </div>
      )}


      {/* Logo FUNDACOR (arriba izquierda) */}
      {!((isMobileOrTablet && showOrganigramaPanel) || (!isMobileOrTablet && showOrganigramaPanel)) && (
        <div className="absolute top-2 left-2 z-50 bg-white/10 p-2 rounded-lg shadow-md">
          <img src={'/LogoFUNDACOR.svg'} alt="Logo" className="w-20" />
        </div>
      )}
      
    </div>


  );
};

export default LandingPage;
