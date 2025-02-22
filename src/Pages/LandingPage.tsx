// src/Pages/LandingPage.tsx
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useSpring } from '@react-spring/three';
import Model from '../Components/Model';
import AnimatedCamera from '../Components/AnimatedCamera';
import EventsPanel from '../Components/EventsPanel';
import OrganigramaPanel from '../Components/OrganigramaPanel';
import { useMediaQuery } from '../Hooks/useMediaQuery';
import { ModelRotationProps } from '../Types/modelTypes';

const LandingPage: React.FC = () => {
  const isMobileOrTablet = useMediaQuery('(max-width: 768px)');

  // Ajustes de cámara
  const initialCameraPosMobile: [number, number, number] = [0, 0, 15];
  // En desktop, subimos la cámara un poco (y=1) y la alejamos a z=12
  const initialCameraPosDesktop: [number, number, number] = [0, 1, 15];

  const alternativeCameraPosRight: [number, number, number] = [4, 1, 12];
  const alternativeCameraPosLeft: [number, number, number] = [-4, 1, 12];

  // Selecciona la posición de cámara inicial
  const initialCameraPos = isMobileOrTablet ? initialCameraPosMobile : initialCameraPosDesktop;

  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>(initialCameraPos);
  const [showEventsPanel, setShowEventsPanel] = useState(false);
  const [showOrganigramaPanel, setShowOrganigramaPanel] = useState(false);

  const [springs, api] = useSpring(() => ({
    rotationX: Math.PI / 2,
    rotationY: 0,
    rotationZ: 0,
    config: { mass: 1, tension: 50, friction: 20 },
  }));

 
   // Clic en la parte izquierda -> Organigrama
  const handleLeftClick = () => {
    if (isMobileOrTablet) {
      setShowOrganigramaPanel(true);
      setShowEventsPanel(false);
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
        api.start({ rotationZ: Math.PI / 6 });
      }
    }
  };

  // Clic en la parte derecha -> Eventos
  const handleRightClick = () => {
    if (isMobileOrTablet) {
      setShowEventsPanel(true);
      setShowOrganigramaPanel(false);
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
        api.start({ rotationZ: -Math.PI / 6 });
      }
    }
  };

  const modelRotation: ModelRotationProps = {
    rotationX: springs.rotationX,
    rotationY: springs.rotationY,
    rotationZ: springs.rotationZ,
  };

  // Escala del modelo: en desktop lo hacemos 1.2 en lugar de 1.5
  const modelScale = isMobileOrTablet ? 0.75 : 1;

  return (
    <div className="w-screen h-screen bg-white relative">
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
                rotation={modelRotation}
                scale={modelScale}
                disableInteractivity={false}
              />
              <AnimatedCamera target={cameraTarget} />
            </Canvas>
          </div>
          {/* Secciones en orden normal */}
          <div className="w-full flex flex-col">
            <OrganigramaPanel show={true} mobile={true} />
            <EventsPanel show={true} mobile={true} />
          </div>
        </div>
      ) : (
        // DESKTOP
        <div className="relative w-full h-full">
          {/* Canvas a pantalla completa */}
          <Canvas className="absolute inset-0" camera={{ position: initialCameraPos, fov: 40 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <Environment preset="sunset" />
            <Model
              onLeftClick={handleLeftClick}
              onRightClick={handleRightClick}
              rotation={modelRotation}
              scale={modelScale}
            />
            <AnimatedCamera target={cameraTarget} />
          </Canvas>
          {/* Overlays */}
          <OrganigramaPanel show={showOrganigramaPanel} mobile={false} />
          <EventsPanel show={showEventsPanel} mobile={false} />
        </div>
      )}

      {/* Logo FUNDACOR */}
      {!(isMobileOrTablet && showOrganigramaPanel) && (
        <div className="absolute top-4 left-4 z-50">
          <span className="text-xl font-bold text-gray-800 font-renogare">FUNDACOR</span>
        </div>
      )}

      {/* Footer */}
      
    </div>
  );
};

export default LandingPage;
