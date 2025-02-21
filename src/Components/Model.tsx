import React, { useEffect, useRef } from 'react';
import { useGLTF} from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { a } from '@react-spring/three';
import * as THREE from 'three';
import { Color, Box3, Vector3 } from 'three';
import { ModelProps, GLTFResult } from '../Types/modelTypes';
import { MeshStandardMaterial } from 'three';

const Model: React.FC<ModelProps> = ({
  onGemClick,
  rotation,
  scale = 1,
  disableInteractivity = false,
}) => {
  // Cargamos el modelo glTF (asegúrate de tener FUNDACOR.gltf en public/)
  const { nodes, scene } = useGLTF('/LogoFUNDACOR.gltf') as unknown as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);
  const gemRef = useRef<THREE.Mesh>(null);

  // Clonamos el material de la gema para evitar compartir referencias
  useEffect(() => {
    if (nodes.Curve003?.material) {
      (nodes.Curve003.material as MeshStandardMaterial) =
        (nodes.Curve003.material as MeshStandardMaterial).clone();
    }
  }, [nodes]);

  // Centramos el modelo usando el bounding box
  useEffect(() => {
    if (groupRef.current) {
      const box = new Box3().setFromObject(groupRef.current);
      const center = new Vector3();
      box.getCenter(center);
      groupRef.current.position.sub(center);
    }
  }, [scene]);

  // Estado para el color de la gema
  const [gemColor, setGemColor] = React.useState('#FFFF00');

  const handleGemClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    setGemColor(prev => (prev === '#FFFF00' ? '#FF0000' : '#FFFF00'));
    onGemClick();
  };

  useEffect(() => {
    if (gemRef.current) {
      (gemRef.current.material as MeshStandardMaterial).color.set(new Color(gemColor));
    }
  }, [gemColor]);

  return (
    <a.group
      ref={groupRef}
      scale={[scale, scale, scale]}
      rotation-x={rotation.rotationX}
      rotation-y={rotation.rotationY}
      rotation-z={rotation.rotationZ}
    >
      <primitive object={nodes.Curve002} />
      <primitive object={nodes.Curve004} />
      <primitive
        object={nodes.Curve003}
        ref={gemRef}
        onClick={disableInteractivity ? undefined : handleGemClick}
      />
    </a.group>
  );
};

export default Model;
