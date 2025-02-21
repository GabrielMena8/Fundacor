import React, { useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useSpring } from '@react-spring/three';

type AnimatedCameraProps = {
  target: [number, number, number];
};

const AnimatedCamera: React.FC<AnimatedCameraProps> = ({ target }) => {
  const { camera } = useThree();
  const [spring, api] = useSpring(() => ({
    pos: camera.position.toArray() as [number, number, number],
    config: { mass: 1, tension: 50, friction: 20 },
  }));

  useEffect(() => {
    api.start({ pos: target });
  }, [target, api]);

  useFrame(() => {
    const pos = spring.pos.get();
    camera.position.set(...pos);
  });

  return null;
};

export default AnimatedCamera;
