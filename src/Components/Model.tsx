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
  const glowRef = useRef<THREE.Mesh | null>(null);
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
  const mat = new THREE.MeshBasicMaterial({ map: tex, color: 0xffffff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, side: THREE.DoubleSide });
  const geo = new THREE.PlaneGeometry(1.6, 1.6);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.renderOrder = 999;
  mesh.frustumCulled = false;
  glowRef.current = mesh;
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
        glowRef.current.scale.set(glowScale, glowScale, 1);
        const mb = glowRef.current.material as THREE.MeshBasicMaterial | undefined;
        if (mb && typeof mb.opacity === 'number') {
          mb.opacity = Math.min(1, 0.25 + pulse * (hovered ? 0.9 : 0.6));
          mb.needsUpdate = true;
        }
      }
    }
  });

  // no quaternion copying needed: glow is a mesh child of the gem so it follows transforms

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

  // Attach glow sprite to the gem when both are ready
  useEffect(() => {
    const gem = gemRef.current;
    const glow = glowRef.current;
    if (!gem || !glow) return;

    // compute gem geometry center (local) to align glow with the actual jewel surface
    try {
      const gemNode = nodes.Curve003 as unknown as THREE.Mesh;
      const localCenter = new THREE.Vector3();
      if (gemNode && gemNode.geometry) {
        const geom = gemNode.geometry as THREE.BufferGeometry;
        if (!geom.boundingBox) geom.computeBoundingBox();
        if (geom.boundingBox) geom.boundingBox.getCenter(localCenter);
      }
      // nudging slightly forward on local z to sit above surface
      localCenter.z += 0.06;

      // try to compute a surface normal near the center so the plane aligns with the jewel
      try {
        const geom = (nodes.Curve003 as unknown as THREE.Mesh).geometry as THREE.BufferGeometry;
        const posAttr = geom.getAttribute('position');
        const norAttr = geom.getAttribute('normal');
        if (posAttr && norAttr) {
          let closestIndex = 0;
          let closestDist = Infinity;
          const v = new THREE.Vector3();
          for (let i = 0; i < posAttr.count; i++) {
            v.set(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
            const d = v.distanceToSquared(localCenter);
            if (d < closestDist) {
              closestDist = d;
              closestIndex = i;
            }
          }
          const nx = norAttr.getX(closestIndex);
          const ny = norAttr.getY(closestIndex);
          const nz = norAttr.getZ(closestIndex);
          const targetNormal = new THREE.Vector3(nx, ny, nz).normalize();
          // orient plane's +Z to match targetNormal
          const alignQuat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), targetNormal);
          glow.quaternion.copy(alignQuat);
        }
      } catch {
        // fallback: leave default orientation
      }

      // ensure it's not already attached
      if (!gem.children.includes(glow)) {
        gem.add(glow);
        glow.position.copy(localCenter);
        glow.scale.set(1.2, 1.2, 1);
      }
    } catch {
      if (!gem.children.includes(glow)) {
        gem.add(glow);
        glow.position.set(0, 0.05, 0.12);
        glow.scale.set(1.2, 1.2, 1);
      }
    }

    return () => {
      try {
        if (gem && glow && gem.children.includes(glow)) {
          gem.remove(glow);
        }
      } catch {
        // ignore
      }
    };
  }, [nodes.Curve003]);

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
      {/* glow sprite is attached in useEffect to keep transform in sync */}
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

