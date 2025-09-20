// src/Components/Model.tsx
import React, { useEffect, useRef, Suspense, useState } from 'react';
import { useGLTF } from '@react-three/drei';
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
  const glowRef = useRef<THREE.Sprite | null>(null);
  const gemMaterialRef = useRef<MeshStandardMaterial | null>(null);
  const [hovered, setHovered] = useState(false);

  // (BVH optimization removed - keep code simpler and avoid extra typings)

  // Cache materials and geometries
  useEffect(() => {
    if (nodes.Curve003?.material) {
      const material = (nodes.Curve003.material as MeshStandardMaterial).clone();
      // Make the gem shinier
      material.roughness = 0.15;
      material.metalness = 0.95;
      // Emissive base using brand yellow
      material.emissive = new THREE.Color(0xFFDD08);
      // Start with a visible emissiveIntensity so the gem is noticeable
      material.emissiveIntensity = 0.15;
      // Slightly increase envMapIntensity if available for extra shine
      const matAny = material as unknown as Record<string, unknown>;
      if (typeof matAny.envMapIntensity === 'number') {
        (matAny.envMapIntensity as number) = 1.2;
      }

      nodes.Curve003.material = material;
      gemMaterialRef.current = material;
    }

    // Create a radial glow sprite texture and sprite, attach to gem
    try {
      const size = 256;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grd = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
        grd.addColorStop(0, 'rgba(255,221,8,0.95)');
        grd.addColorStop(0.4, 'rgba(255,221,8,0.6)');
        grd.addColorStop(1, 'rgba(255,221,8,0)');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, size, size);
        const tex = new THREE.CanvasTexture(canvas);
        tex.needsUpdate = true;
        const spriteMat = new THREE.SpriteMaterial({ map: tex, color: 0xFFFFFF, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.scale.set(1.6, 1.6, 1);
        glowRef.current = sprite;
        // attach later when gemRef is available
      }
    } catch {
      // ignore if DOM unavailable
    }

    // Optimize geometries where available
    Object.values(nodes).forEach((node: Object3D) => {
      // geometry can be BufferGeometry with computeBoundingBox/computeBoundingSphere
      // Use runtime checks to avoid TS errors
      const anyNode = node as unknown as { geometry?: { computeBoundingBox?: () => void; computeBoundingSphere?: () => void } };
      if (anyNode.geometry && typeof anyNode.geometry.computeBoundingBox === 'function') {
        anyNode.geometry.computeBoundingBox();
      }
      if (anyNode.geometry && typeof anyNode.geometry.computeBoundingSphere === 'function') {
        anyNode.geometry.computeBoundingSphere();
      }
    });
  }, [nodes]);

  // Pulse/shine animation on the gem material
  useFrame(({ clock }) => {
    if (!gemMaterialRef.current || disableInteractivity) return;
    const t = clock.getElapsedTime();
    const freq = 1.0; // pulses per second
    const pulse = (Math.sin(t * Math.PI * freq) + 1) / 2; // 0..1
    const base = 0.15; // higher base glow
    const amp = hovered ? 1.4 : 0.9; // stronger when hovered
    gemMaterialRef.current.emissiveIntensity = base + pulse * amp;
    // optional tiny scale pulse to enhance affordance
    if (gemRef.current) {
      const s = 1 + pulse * 0.045 * (hovered ? 1.6 : 1.0);
      gemRef.current.scale.set(s, s, s);
      // update glow size and intensity if available
      if (glowRef.current && gemRef.current) {
        const glowScale = 1.2 + pulse * (hovered ? 0.9 : 0.6);
        glowRef.current.scale.set(glowScale * s, glowScale * s, 1);
        const mat = glowRef.current.material as THREE.SpriteMaterial;
        if (mat) mat.opacity = Math.min(1, 0.25 + pulse * (hovered ? 0.9 : 0.6));
      }
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
      {/* Attach glow sprite as child of gem mesh when both exist */}
      {gemRef.current && glowRef.current && !gemRef.current.children.includes(glowRef.current) && (() => {
        gemRef.current.add(glowRef.current);
        // Position the sprite slightly in front of the gem
        glowRef.current.position.set(0, 0.05, 0.1);
        return null as unknown as JSX.Element;
      })()}
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

