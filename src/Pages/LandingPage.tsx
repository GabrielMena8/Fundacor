// src/pages/LandingPage.tsx
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useSpring } from '@react-spring/three';
import Model from '../Components/Model';
import AnimatedCamera from '../Components/AnimatedCamera';
import EventsPanelWrapper from '../Components/EventsPanelWrapper';
import { useMediaQuery } from '../Hooks/useMediaQuery';
import { ModelRotationProps } from '../Types/modelTypes';

const LandingPage: React.FC = () => {
  const isMobileOrTablet = useMediaQuery("(max-width: 768px)");
  const initialCameraPos: [number, number, number] = [0, 0, 15];
  const alternativeCameraPos: [number, number, number] = [4, 0, 15];

  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>(initialCameraPos);
  const [showPanel, setShowPanel] = useState(false);

  const [springs, api] = useSpring(() => ({
    rotationX: Math.PI / 2,
    rotationY: 0,
    rotationZ: 0,
    config: { mass: 1, tension: 50, friction: 20 },
  }));

  const handleGemCameraAnimation = () => {
    if (isMobileOrTablet) return;
    const isAlternative =
      cameraTarget[0] === alternativeCameraPos[0] &&
      cameraTarget[1] === alternativeCameraPos[1] &&
      cameraTarget[2] === alternativeCameraPos[2];
    if (isAlternative) {
      setCameraTarget(initialCameraPos);
      setShowPanel(false);
      api.start({ rotationZ: 0 });
    } else {
      setCameraTarget(alternativeCameraPos);
      setShowPanel(true);
      api.start({ rotationZ: -Math.PI / 6 });
    }
  };

  const modelRotation: ModelRotationProps = {
    rotationX: springs.rotationX,
    rotationY: springs.rotationY,
    rotationZ: springs.rotationZ,
  };

  return (
    <div className="w-screen min-h-screen bg-white flex flex-col relative">
      {isMobileOrTablet ? (
        <>
          {/* Móviles: Canvas ocupa la mitad superior */}
          <div className="w-full h-1/2">
            <Canvas className="w-full h-full" camera={{ position: initialCameraPos, fov: 60 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} />
              <Environment preset="sunset" />
              <Model
                onGemClick={() => {}}
                rotation={modelRotation}
                scale={0.5}
                disableInteractivity={true}
              />
              <AnimatedCamera target={cameraTarget} />
            </Canvas>
          </div>
          {/* El wrapper de eventos se renderiza debajo */}
          <EventsPanelWrapper show={true} mobile={true} />
        </>
      ) : (
        <>
          {/* Desktop: Canvas ocupa toda la pantalla */}
          <div className="relative flex-1">
            <Canvas className="w-full h-full" camera={{ position: initialCameraPos, fov: 40 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} />
              <Environment preset="sunset" />
              <Model onGemClick={handleGemCameraAnimation} rotation={modelRotation} />
              <AnimatedCamera target={cameraTarget} />
            </Canvas>
            {/* Wrapper para el panel overlay en desktop */}
            <EventsPanelWrapper show={showPanel} mobile={false} />
          </div>
        </>
      )}

      {/* Elementos fijos: Logo y texto inferior */}
      <div className="absolute top-4 left-4">
        <span className="text-xl font-bold text-gray-800 font-renogare">FUNDACOR</span>
      </div>
      <div className="mt-auto w-full flex flex-col items-center justify-center text-gray-700 text-sm font-caviardreams">
        <span>FUNDACOR © 2019 - 2020</span>
        <div className="mt-2">
          <div className="w-6 h-6 rounded-full border border-gray-700 flex items-center justify-center">
            <span className="text-xs">i</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
