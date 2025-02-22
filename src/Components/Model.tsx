// src/Components/Model.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { a } from '@react-spring/three';
import * as THREE from 'three';
import { Color, Box3, Vector3 } from 'three';
import { MeshStandardMaterial } from 'three';
import { ModelProps, GLTFResult } from '../Types/modelTypes';
import { ThreeEvent } from '@react-three/fiber';

const Model: React.FC<ModelProps> = ({
  onTopClick,
  onLeftClick,
  onRightClick,
  rotation,
  scale = 1,
  disableInteractivity = false,
}) => {
  const { nodes, scene } = useGLTF('/LogoFUNDACOR.gltf') as unknown as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);
  const gemRef = useRef<THREE.Mesh>(null);

  // Clonamos el material de la gema para no compartir referencias
  useEffect(() => {
    if (nodes.Curve003?.material) {
      (nodes.Curve003.material as MeshStandardMaterial) =
        (nodes.Curve003.material as MeshStandardMaterial).clone();
    }
  }, [nodes]);

  // Centramos el modelo y aplicamos un offset en Y
  useEffect(() => {
    if (groupRef.current) {
      const box = new Box3().setFromObject(groupRef.current);
      const center = new Vector3();
      box.getCenter(center);
      groupRef.current.position.sub(center);
      //groupRef.current.position.y -= 0.5; // Ajusta este valor según convenga
    }
  }, [scene]);

  // Estado para el color de la gema (opcional)
  const [gemColor, setGemColor] = useState('#FFFF00');

  const handleGemClick = (event: ThreeEvent<MouseEvent>) => {
    if (disableInteractivity) return;
    event.stopPropagation();

    // Alterna color (ejemplo)
    setGemColor(prev => (prev === '#FFFF00' ? '#1F322E' : '#FFFF00'));

    if (!gemRef.current) return;
    const intersection = event.intersections[0];
    if (!intersection) return;
    const localPoint = gemRef.current.worldToLocal(intersection.point.clone());
    console.log('Local point:', localPoint);
    // Punto central aproximado para la parte superior
    const targetPoint = {
      x: -0.12939901825966277,
      y: 0.4399999678134901,
      z: -1.9852197650435117
    };
    
    const tolerance = 0.1; // Ajusta este valor según necesites
    
    // Primero verificamos si es un clic en la parte superior
    if (Math.abs(localPoint.x - targetPoint.x) < tolerance &&
      Math.abs(localPoint.y - targetPoint.y) < tolerance &&
      Math.abs(localPoint.z - targetPoint.z) < tolerance) {
      if (onTopClick) onTopClick();
    } 
    // Si no es la parte superior, verificamos los lados usando la coordenada X
    else if (localPoint.x < -0.1) { // Ajusta este valor según necesites
      if (onLeftClick) onLeftClick();
    } else if (localPoint.x > 0.1) { // Ajusta este valor según necesites
      if (onRightClick) onRightClick();
    }
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
      <primitive object={nodes.Curve003} ref={gemRef} onClick={handleGemClick} />
    </a.group>
  );
};

export default Model;
