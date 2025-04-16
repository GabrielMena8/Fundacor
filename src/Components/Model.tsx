// src/Components/Model.tsx
import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { a } from '@react-spring/three';
import * as THREE from 'three';
import { MeshStandardMaterial, Box3, Vector3 } from 'three';
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

  // Clonamos el material de la gema para evitar compartir referencias y modificarla accidentalmente.
  useEffect(() => {
    if (nodes.Curve003?.material) {
      nodes.Curve003.material = (nodes.Curve003.material as MeshStandardMaterial).clone();
    }
  }, [nodes]);

  // Centramos el modelo a partir de su caja delimitadora.
  useEffect(() => {
    if (groupRef.current) {
      const box = new Box3().setFromObject(groupRef.current);
      const center = new Vector3();
      box.getCenter(center);
      groupRef.current.position.sub(center);
    }
  }, [scene]);

  const isWithinTolerance = (a: number, b: number, tolerance: number): boolean =>
    Math.abs(a - b) < tolerance;

  const handleGemClick = (event: ThreeEvent<MouseEvent>) => {
    if (disableInteractivity) return;
    event.stopPropagation();

    if (!gemRef.current) return;
    const intersection = event.intersections[0];
    if (!intersection) return;

    const localPoint = gemRef.current.worldToLocal(intersection.point.clone());
    console.log('Local point:', localPoint);

    const targetTop = { x: -0.1294, y: 0.44, z: -1.9852 };
    const tolerance = 0.1;

    if (
      isWithinTolerance(localPoint.x, targetTop.x, tolerance) &&
      isWithinTolerance(localPoint.y, targetTop.y, tolerance) &&
      isWithinTolerance(localPoint.z, targetTop.z, tolerance)
    ) {
      onTopClick?.();
    } else if (localPoint.x < -0.1) {
      onLeftClick?.();
    } else if (localPoint.x > 0.1) {
      onRightClick?.();
    }
  };

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
        className="gem-interactive"  // Se aplica la clase para efecto hover
      />
    </a.group>
  );
};

export default Model;

