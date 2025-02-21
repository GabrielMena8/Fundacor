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
  scale?: number; // Propiedad opcional para ajustar la escala
  disableInteractivity?: boolean; // Para deshabilitar onClick en móviles
}

export interface GLTFResult {
  nodes: {
    Curve002: Mesh<BufferGeometry, MeshStandardMaterial>;
    Curve003: Mesh<BufferGeometry, MeshStandardMaterial>;
    Curve004: Mesh<BufferGeometry, MeshStandardMaterial>;
  };
  scene: Group;
}
