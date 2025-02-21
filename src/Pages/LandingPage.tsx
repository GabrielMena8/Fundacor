// src/pages/LandingPage.tsx
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useSpring } from '@react-spring/three';
import Model from '../Components/Model';
import AnimatedCamera from '../Components/AnimatedCamera';
import EventsPanel from '../Components/EventsPanel';

const LandingPage: React.FC = () => {
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

  // Al hacer clic en la gema, alternamos la cámara y mostramos/ocultamos el panel
  const handleGemCameraAnimation = () => {
    const isAlternative =
      cameraTarget[0] === alternativeCameraPos[0] &&
      cameraTarget[1] === alternativeCameraPos[1] &&
      cameraTarget[2] === alternativeCameraPos[2];

    if (isAlternative) {
      setCameraTarget(initialCameraPos);
      setShowPanel(false);
      api.start({ rotationZ:0 });
    } else {
      setCameraTarget(alternativeCameraPos);
      setShowPanel(true);
      api.start({ rotationZ: -Math.PI / 6 });
    }
  };

  return (
    <div className="relative w-screen h-screen bg-white">
      {/* Logo / Texto en la esquina superior izquierda */}
      <div className="absolute top-4 left-4">
        <span className="text-xl font-bold text-gray-800">FUNDACOR</span>
      </div>

      {/* Canvas principal */}
      <Canvas className="w-full h-full" camera={{ position: initialCameraPos, fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Environment preset="sunset" />

        {/* Nuestro modelo con animación de rotación */}
        <Model
          onGemClick={handleGemCameraAnimation}
          rotation={{
            rotationX: springs.rotationX,
            rotationY: springs.rotationY,
            rotationZ: springs.rotationZ
          }}
        />

        {/* Animación de la cámara */}
        <AnimatedCamera target={cameraTarget} />
      </Canvas>

      {/* Texto inferior centrado */}
      <div className="absolute bottom-4 w-full flex flex-col items-center justify-center text-gray-700 text-sm">
        <span>FUNDACOR © 2019 - 2020</span>
        <div className="mt-2">
          <div className="w-6 h-6 rounded-full border border-gray-700 flex items-center justify-center">
            <span className="text-xs">i</span>
          </div>
        </div>
      </div>

      {/* Panel de eventos que se desliza desde la derecha */}
      <EventsPanel show={showPanel} />
    </div>
  );
};

export default LandingPage;
