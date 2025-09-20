// src/Components/Model.tsx
import React, { useEffect, useRef, Suspense, useState } from 'react';
import { useGLTF, useTexture, Loader, useBVH } from '@react-three/drei';
import { a } from '@react-spring/three';
import * as THREE from 'three';
import { MeshStandardMaterial, Box3, Vector3, Object3D } from 'three';
import { ModelProps, GLTFResult } from '../Types/modelTypes';
import { ThreeEvent, useFrame } from '@react-three/fiber';

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
  const gemMaterialRef = useRef<MeshStandardMaterial | null>(null);
  const [hovered, setHovered] = useState(false);

  // Apply BVH for optimized raycasting
  useBVH(scene);

  // Cache materials and geometries
  useEffect(() => {
    if (nodes.Curve003?.material) {
      const material = (nodes.Curve003.material as MeshStandardMaterial).clone();
      material.roughness = 0.5; // Optimize material properties
      material.metalness = 0.8;
  // Give the gem an emissive base so it can "shine" when pulsing
  // Use brand yellow to match UI accents
  material.emissive = new THREE.Color(0xFFDD08);
      material.emissiveIntensity = 0.0;
      nodes.Curve003.material = material;
      gemMaterialRef.current = material;
    }

    // Optimize geometries
    Object.values(nodes).forEach((node: Object3D) => {
      if ('geometry' in node && node.geometry) {
        node.geometry.computeBoundingBox();
        node.geometry.computeBoundingSphere();
      }
    });
  }, [nodes]);

  // Pulse/shine animation on the gem material
  useFrame(({ clock }) => {
    if (!gemMaterialRef.current || disableInteractivity) return;
    const t = clock.getElapsedTime();
  const freq = 0.8; // pulses per second (slower)
    const pulse = (Math.sin(t * Math.PI * freq) + 1) / 2; // 0..1
    const base = 0.05;
    const amp = hovered ? 0.8 : 0.4; // stronger when hovered
    gemMaterialRef.current.emissiveIntensity = base + pulse * amp;
    // optional tiny scale pulse to enhance affordance
    if (gemRef.current) {
      const s = 1 + pulse * 0.03 * (hovered ? 1.4 : 1.0);
      gemRef.current.scale.set(s, s, s);
    }
  });

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

  // keyboard activation when pointer is over the gem
  useEffect(() => {
    if (disableInteractivity) return;
    const onKey = (e: KeyboardEvent) => {
      if (!hovered) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onTopClick?.();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [hovered, disableInteractivity, onTopClick]);

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
        onPointerEnter={() => {
          if (!disableInteractivity) {
            setHovered(true);
            if (typeof document !== 'undefined' && document.body) {
              document.body.style.cursor = 'pointer';
            }
          }
        }}
        onPointerLeave={() => {
          setHovered(false);
          if (typeof document !== 'undefined' && document.body) {
            document.body.style.cursor = '';
          }
        }}
        className="gem-interactive"
        // provide descriptive metadata for tooling / developer accessibility
        userData={{ 'aria-label': 'Joya de la corona, presiona para ver detalles' }}
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

