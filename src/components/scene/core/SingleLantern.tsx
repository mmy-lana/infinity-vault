'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface LanternData {
  position: [number, number, number];
  rotationSpeed?: number;
  bobbingSpeed?: number;
  bobbingOffset?: number;
  bobbingAmplitude?: number;
  scale?: number;
  lightIntensity?: number;
  color?: string;
  animate?: boolean;
}

export const SingleLantern: React.FC<{ data: LanternData }> = ({ data }) => {
  const groupRef = useRef<THREE.Group>(null);
  const initialY = data.position[1];

  const {
    rotationSpeed = 0,
    bobbingSpeed = 0.6,
    bobbingOffset = 0,
    bobbingAmplitude = 0.4,
    scale = 1,
    lightIntensity = 1,
    color = '#EB7340',
    animate = true,
  } = data;

  useFrame(({ clock }) => {
    if (!groupRef.current || !animate) return;
    const elapsedTime = clock.getElapsedTime();

    groupRef.current.position.y =
      initialY + Math.sin(elapsedTime * bobbingSpeed + bobbingOffset) * bobbingAmplitude;

    groupRef.current.rotation.y += rotationSpeed * 0.01;
    groupRef.current.rotation.z = Math.sin(elapsedTime * 0.4 + bobbingOffset) * 0.05;
  });

  return (
    <group ref={groupRef} position={data.position} scale={scale}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.28, 0.85, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.65}
          roughness={0.4}
          metalness={0.1}
          transparent
          opacity={0.88}
        />
      </mesh>

      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.38, 0.36, 0.08, 8]} />
        <meshStandardMaterial color="#2F1A17" roughness={0.9} metalness={0.2} />
      </mesh>

      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.32, 0.35, 0.08, 8]} />
        <meshStandardMaterial color="#2F1A17" roughness={0.9} metalness={0.2} />
      </mesh>

      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.6, 4]} />
        <meshBasicMaterial color="#5D3025" />
      </mesh>

      <pointLight
        color={color}
        intensity={lightIntensity * 1.5}
        distance={4.5}
        decay={2}
      />
    </group>
  );
};