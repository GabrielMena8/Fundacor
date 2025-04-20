// src/Components/Model.tsx
import React, { useEffect, useRef, Suspense } from 'react';
import { useGLTF, useTexture, Loader, useBVH } from '@react-three/drei';
import { a } from '@react-spring/three';
import * as THREE from 'three';
import { MeshStandardMaterial, Box3, Vector3, Object3D } from 'three';
import { ModelProps, GLTFResult } from '../Types/modelTypes';
import { ThreeEvent } from '@react-three/fiber';

// Preload the model
useGLTF.preload('/LogoFUNDACOR.gltf');

const ModelContent: React.FC<ModelProps> = ({
  onTopClick,
  onLeftClick,
  onRightClick,
  rotation,
  scale = 1,
  disableInteractivity = false,
}) => {
  const { nodes, scene } = useGLTF('/LogoFUNDACOR.gltf', true) as unknown as GLTFResult; // Enable draco
  const groupRef = useRef<THREE.Group>(null);
  const gemRef = useRef<THREE.Mesh>(null);

  // Apply BVH for optimized raycasting
  useBVH(scene);

  // Cache materials and geometries
  useEffect(() => {
    if (nodes.Curve003?.material) {
      const material = (nodes.Curve003.material as MeshStandardMaterial).clone();
      material.roughness = 0.5; // Optimize material properties
      material.metalness = 0.8;
      nodes.Curve003.material = material;
    }

    // Optimize geometries
    Object.values(nodes).forEach((node: Object3D) => {
      if ('geometry' in node && node.geometry) {
        node.geometry.computeBoundingBox();
        node.geometry.computeBoundingSphere();
      }
    });
  }, [nodes]);

  // Center model optimization
  useEffect(() => {
    if (groupRef.current) {
      const box = new Box3().setFromObject(groupRef.current);
      const center = new Vector3();
      box.getCenter(center);
      groupRef.current.position.sub(center);

      // Cache world matrix
      groupRef.current.updateMatrixWorld(true);
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
      dispose={null} // Prevent disposing cached resources
    >
      <primitive object={nodes.Curve002} />
      <primitive object={nodes.Curve004} />
      <primitive
        object={nodes.Curve003}
        ref={gemRef}
        onClick={handleGemClick}
        className="gem-interactive"
      />
    </a.group>
  );
};

// Wrap the model in Suspense for better loading management
const Model: React.FC<ModelProps> = (props) => {
  return (
    <Suspense fallback={null}>
      <ModelContent {...props} />
    </Suspense>
  );
};

export default Model;

