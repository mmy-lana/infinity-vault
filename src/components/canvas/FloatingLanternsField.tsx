'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LanternData {
  position: [number, number, number];
  rotationSpeed: number;
  bobbingSpeed: number;
  bobbingOffset: number;
  bobbingAmplitude: number;
  scale: number;
  lightIntensity: number;
  color: string;
}

const LANTERN_COLORS = ['#EB7340', '#DF865C', '#C04D2D', '#914B35'];

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999 + 1) * 10000;
  return x - Math.floor(x);
}

export const FloatingLanternsField: React.FC<{ count?: number }> = ({ count = 24 }) => {
  const lanterns = useMemo<LanternData[]>(() => {
    const items: LanternData[] = [];
    for (let i = 0; i < count; i++) {
      const r1 = seededRandom(i * 8 + 1);
      const r2 = seededRandom(i * 8 + 2);
      const r3 = seededRandom(i * 8 + 3);
      const r4 = seededRandom(i * 8 + 4);
      const r5 = seededRandom(i * 8 + 5);
      const r6 = seededRandom(i * 8 + 6);
      const r7 = seededRandom(i * 8 + 7);
      const r8 = seededRandom(i * 8 + 8);

      const angle = r1 * Math.PI * 2;
      const radius = 6 + r2 * 14;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius - 5;
      const y = (r3 - 0.5) * 24;

      items.push({
        position: [x, y, z],
        rotationSpeed: (r4 - 0.5) * 0.4,
        bobbingSpeed: 0.5 + r5 * 0.8,
        bobbingOffset: r6 * Math.PI * 2,
        bobbingAmplitude: 0.3 + r7 * 0.5,
        scale: 0.6 + r8 * 0.5,
        lightIntensity: 0.8 + r1 * 1.2,
        color: LANTERN_COLORS[Math.floor(r2 * LANTERN_COLORS.length)],
      });
    }
    return items;
  }, [count]);

  return (
    <group>
      {lanterns.map((data, idx) => (
        <SingleLantern key={idx} data={data} />
      ))}
    </group>
  );
};

const SingleLantern: React.FC<{ data: LanternData }> = ({ data }) => {
  const groupRef = useRef<THREE.Group>(null);
  const initialY = data.position[1];

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const elapsedTime = clock.getElapsedTime();

    // Floating bobbing motion
    groupRef.current.position.y =
      initialY + Math.sin(elapsedTime * data.bobbingSpeed + data.bobbingOffset) * data.bobbingAmplitude;

    // Slow ambient rotation
    groupRef.current.rotation.y += data.rotationSpeed * 0.01;
    groupRef.current.rotation.z = Math.sin(elapsedTime * 0.4 + data.bobbingOffset) * 0.05;
  });

  return (
    <group ref={groupRef} position={data.position} scale={data.scale}>
      {/* Paper Lantern Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.28, 0.85, 8]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={0.65}
          roughness={0.4}
          metalness={0.1}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Top Timber Cap */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.38, 0.36, 0.08, 8]} />
        <meshStandardMaterial color="#2F1A17" roughness={0.9} metalness={0.2} />
      </mesh>

      {/* Bottom Timber Cap */}
      <mesh position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.32, 0.35, 0.08, 8]} />
        <meshStandardMaterial color="#2F1A17" roughness={0.9} metalness={0.2} />
      </mesh>

      {/* Hanging Cord */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.6, 4]} />
        <meshBasicMaterial color="#5D3025" />
      </mesh>

      {/* Inner Flame Glow Light */}
      <pointLight
        color={data.color}
        intensity={data.lightIntensity * 1.5}
        distance={4.5}
        decay={2}
      />
    </group>
  );
};