// src/types/ModelTypes.ts
import { SpringValue } from '@react-spring/three';
import { Mesh, BufferGeometry, MeshStandardMaterial, Group } from 'three';

export interface ModelRotationProps {
  rotationX: SpringValue<number>;
  rotationY: SpringValue<number>;
  rotationZ: SpringValue<number>;
}

export interface ModelProps {
  onGemClick: () => void;
  rotation: ModelRotationProps;
}

// Tipo para el resultado esperado de useGLTF
export interface GLTFResult {
  nodes: {
    Curve002: Mesh<BufferGeometry, MeshStandardMaterial>;
    Curve003: Mesh<BufferGeometry, MeshStandardMaterial>;
    Curve004: Mesh<BufferGeometry, MeshStandardMaterial>;
  };
  scene: Group;
}
