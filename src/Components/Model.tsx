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
  onLeftClick,
  onRightClick,
  rotation,
  scale = 1,
  disableInteractivity = false,
}) => {
  const { nodes, scene } = useGLTF('/LogoFUNDACOR.gltf') as unknown as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);
  const gemRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    // Clonamos material de la gema
    if (nodes.Curve003?.material) {
      (nodes.Curve003.material as MeshStandardMaterial) =
        (nodes.Curve003.material as MeshStandardMaterial).clone();
    }
  }, [nodes]);

  useEffect(() => {
    if (groupRef.current) {
      // Centrar el modelo en el origen
      const box = new Box3().setFromObject(groupRef.current);
      const center = new Vector3();
      box.getCenter(center);
      groupRef.current.position.sub(center);

      // Ajustar un offset en Y para que la corona se vea centrada verticalmente
     
      // Ajusta este valor según necesites
    }
  }, [scene]);

  // Manejo de color de la gema (opcional)
  const [gemColor, setGemColor] = useState('#FFFF00');

  const handleGemClick = (event: ThreeEvent<MouseEvent>) => {
    if (disableInteractivity) return;
    event.stopPropagation();
    // Cambia color de ejemplo
    setGemColor(prev => (prev === '#FFFF00' ? '#FF0000' : '#FFFF00'));

    // Detectamos la parte izquierda/derecha
    if (!gemRef.current) return;
    const intersection = event.intersections[0];
    if (!intersection) return;
    const localPoint = gemRef.current.worldToLocal(intersection.point.clone());
    if (localPoint.x < 0) {
      if (onLeftClick) onLeftClick();
    } else {
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
      <primitive
        object={nodes.Curve003}
        ref={gemRef}
        onClick={handleGemClick}
      />
    </a.group>
  );
};

export default Model;
