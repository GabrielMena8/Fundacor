import { SpringValue } from '@react-spring/three';
import { Mesh, BufferGeometry, MeshStandardMaterial, Group } from 'three';

export interface ModelRotationProps {
  rotationX: SpringValue<number>;
  rotationY: SpringValue<number>;
  rotationZ: SpringValue<number>;
}

export interface ModelProps {
  /** Se llama al hacer clic en la parte izquierda de la gema */
  onLeftClick: () => void;
  /** Se llama al hacer clic en la parte derecha de la gema */
  onRightClick: () => void;

  /** Rotaciones animadas con react-spring */
  rotation: ModelRotationProps;

  /** Factor de escala (opcional) */
  scale?: number;

  /** Para deshabilitar la interactividad en móviles o cuando lo requieras */
  disableInteractivity?: boolean;
}

export interface GLTFResult {
  nodes: {
    Curve002: Mesh<BufferGeometry, MeshStandardMaterial>;
    Curve003: Mesh<BufferGeometry, MeshStandardMaterial>;
    Curve004: Mesh<BufferGeometry, MeshStandardMaterial>;
  };
  scene: Group;
}
