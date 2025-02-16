import React, { useState, useEffect, useRef } from 'react';
import { Canvas, ThreeEvent, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { Mesh, BufferGeometry, MeshStandardMaterial, Color } from 'three';
import { useSpring } from '@react-spring/three';

// Define el tipo del resultado esperado de useGLTF
type GLTFResult = {
  nodes: {
    Curve002: Mesh<BufferGeometry, MeshStandardMaterial>;
    Curve003: Mesh<BufferGeometry, MeshStandardMaterial>; // Gema (la que cambiará de color)
    Curve004: Mesh<BufferGeometry, MeshStandardMaterial>;
  };
};

// Componente del Modelo
type ModelProps = {
  onGemClick: () => void;
};

const Model: React.FC<ModelProps> = ({ onGemClick }) => {
  // Carga el modelo glTF (asegúrate de que FUNDACOR.gltf esté en public)
  const { nodes } = useGLTF('/FUNDACOR.gltf') as unknown as GLTFResult;

  // Clonamos el material de Curve003 para que su cambio de color no afecte a otros nodos
  useEffect(() => {
    if (nodes.Curve003?.material) {
      nodes.Curve003.material = nodes.Curve003.material.clone();
    }
  }, [nodes]);

  // Referencia para la gema (Curve003)
  const gemRef = useRef<Mesh<BufferGeometry, MeshStandardMaterial>>(null);
  // Estado para el color de la gema; inicia en amarillo (#FFFF00)
  const [gemColor, setGemColor] = useState('#FFFF00');

  // Manejador de clic en la gema: alterna su color y dispara la animación de la cámara
  const handleGemClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    setGemColor(prev => (prev === '#FFFF00' ? '#FF0000' : '#FFFF00'));
    onGemClick();
  };

  // Actualiza el color del material de la gema cuando cambie gemColor
  useEffect(() => {
    if (gemRef.current) {
      gemRef.current.material.color.set(new Color(gemColor));
    }
  }, [gemColor]);

  return (
    // Rotamos el grupo 90° en X para la orientación deseada
    <group rotation={[Math.PI / 2, 0, 0]}>
      <primitive object={nodes.Curve002} />
      <primitive object={nodes.Curve004} />
      <primitive object={nodes.Curve003} ref={gemRef} onClick={handleGemClick} />
    </group>
  );
};

// Componente para animar la cámara usando react-spring/three y useFrame
type AnimatedCameraProps = {
  target: [number, number, number];
};

const AnimatedCamera: React.FC<AnimatedCameraProps> = ({ target }) => {
  const { camera } = useThree();
  const [spring, api] = useSpring(() => ({
    pos: camera.position.toArray() as [number, number, number],
    config: { mass: 1, tension: 50, friction: 20 }
  }));

  // Cuando el target cambie, iniciamos la animación hacia esa posición
  useEffect(() => {
    api.start({ pos: target });
  }, [target, api]);

  // Actualizamos la posición de la cámara cada frame
  useFrame(() => {
    const pos = spring.pos.get();
    camera.position.set(...pos);
  });

  return null;
};

const Scene: React.FC = () => {
  // Definimos la posición original y la alternativa de la cámara
  const initialCameraPos: [number, number, number] = [0, 0, 15];
  const alternativeCameraPos: [number, number, number] = [4, 0, -5];
  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>(initialCameraPos);
  const [showText, setShowText] = useState(false);

  // Alterna la posición de la cámara y el overlay de texto
  const handleGemCameraAnimation = () => {
    if (
      cameraTarget[0] === alternativeCameraPos[0] &&
      cameraTarget[1] === alternativeCameraPos[1] &&
      cameraTarget[2] === alternativeCameraPos[2]
    ) {
      setCameraTarget(initialCameraPos);
      setShowText(false);
    } else {
      setCameraTarget(alternativeCameraPos);
      setShowText(true);
    }
  };

  return (
    <div className="relative w-screen h-screen">
      <Canvas className="w-full h-full" camera={{ position: initialCameraPos, fov: 40 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Environment preset="sunset" />
        <Model onGemClick={handleGemCameraAnimation} />
        <AnimatedCamera target={cameraTarget} />
      </Canvas>
      {showText && (
        <>
          {/* Panel para pantallas medianas en adelante: se posiciona a la derecha */}
          <div className="hidden md:flex absolute top-0 right-0 h-full w-1/4 items-center justify-center bg-gray-900 bg-opacity-75 transition-opacity duration-500">
            <div className="p-6 text-center text-white">
              <h1 className="text-3xl font-bold mb-4">About Us</h1>
              <p className="text-base">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac felis at dolor tincidunt
                suscipit. Integer eu velit sed neque tincidunt vestibulum.
              </p>
            </div>
          </div>
          {/* Panel para pantallas pequeñas: se posiciona en la parte inferior */}
          <div className="md:hidden absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-75 flex items-center justify-center transition-opacity duration-500">
            <div className="p-4 text-center text-white">
              <h1 className="text-2xl font-bold mb-2">About Us</h1>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac felis at dolor tincidunt
                suscipit. Integer eu velit sed neque tincidunt vestibulum.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Scene;
