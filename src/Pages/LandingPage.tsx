import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useSpring } from '@react-spring/three';
import Model from '../Components/Model';
import AnimatedCamera from '../Components/AnimatedCamera';
import { ModelRotationProps } from '../Types/modelTypes';

const LandingPage: React.FC = () => {
  // Posiciones inicial y alternativa para la cámara
  const initialCameraPos: [number, number, number] = [0, 0, 15];
  const alternativeCameraPos: [number, number, number] = [4, 0, 15];

  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>(initialCameraPos);
  const [showText, setShowText] = useState(false);

  // Creamos un spring para cada eje de la rotación
  const [springs, api] = useSpring(() => ({
    rotationX: Math.PI / 2, // rotación fija en X (90°)
    rotationY: 0,           // rotación en Y (variable)
    rotationZ: 0,           // rotación en Z (fija en este ejemplo)
    config: { mass: 1, tension: 50, friction: 20 },
  }));

  // Función para alternar la cámara y la rotación de la corona
  const handleGemCameraAnimation = () => {
    const isAlternative =
      cameraTarget[0] === alternativeCameraPos[0] &&
      cameraTarget[1] === alternativeCameraPos[1] &&
      cameraTarget[2] === alternativeCameraPos[2];

    if (isAlternative) {
      setCameraTarget(initialCameraPos);
      setShowText(false);
      api.start({ rotationX: Math.PI / 2, rotationZ: 0 });
    } else {
      setCameraTarget(alternativeCameraPos);
      setShowText(true);
      api.start({ rotationX: Math.PI/4, rotationZ: -Math.PI/6 }); // 30° en radianes
    }
  };

  // Separamos la lógica para definir las rotaciones a pasar al modelo
  const modelRotation: ModelRotationProps = {
    rotationX: springs.rotationX,
    rotationY: springs.rotationY,
    rotationZ: springs.rotationZ,
  };

  return (
    <div className="relative w-screen h-screen bg-white">
      {/* Logo o Texto FUNDACOR en la esquina superior izquierda */}
      <div className="absolute top-4 left-4">
        <span className="text-xl font-bold text-gray-800">FUNDACOR</span>
      </div>

      {/* Canvas a pantalla completa */}
      <Canvas className="w-full h-full" camera={{ position: initialCameraPos, fov: 40 }}>
        <ambientLight intensity={0.5} />
        {/* <directionalLight position={[10, 10, 5]} intensity={1.5} /> */}
        <Environment preset="sunset" />
        <Model onGemClick={handleGemCameraAnimation} rotation={modelRotation} />
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

      {/* Panel informativo */}
      {showText && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-64 bg-gray-900 bg-opacity-75 text-white p-4">
          <h2 className="text-xl font-bold mb-2">Más Información</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit, tortor ac laoreet varius, 
            velit massa placerat lacus, id feugiat lectus sapien non mi.
          </p>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
