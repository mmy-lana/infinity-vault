'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export interface DummyMarkerProps {
  id: string;
  index: number;
  label: string;
  category: string;
  position: [number, number, number];
}

export const DummyMarker: React.FC<DummyMarkerProps> = ({
  index,
  label,
  category,
  position,
}) => {
  const orbRef = useRef<THREE.Mesh>(null);
  const formattedIndex = index.toString().padStart(2, '0');

  useFrame(({ clock }) => {
    if (!orbRef.current) return;
    const t = clock.getElapsedTime() * 1.5;
    orbRef.current.position.y = 1.25 + Math.sin(t + index) * 0.08;
    orbRef.current.rotation.y += 0.01;
  });

  return (
    <group position={position}>
      {/* Stone / Timber Pedestal Base */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 0.8, 8]} />
        <meshStandardMaterial color="#2F1A17" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Timber Capital Collar */}
      <mesh position={[0, 0.82, 0]}>
        <boxGeometry args={[0.8, 0.06, 0.8]} />
        <meshStandardMaterial color="#5D3025" roughness={0.8} />
      </mesh>

      {/* Floating Talisman Core */}
      <mesh ref={orbRef} position={[0, 1.25, 0]}>
        <octahedronGeometry args={[0.22, 0]} />
        <meshStandardMaterial
          color="#EB7340"
          emissive="#EB7340"
          emissiveIntensity={1.2}
          roughness={0.2}
          wireframe={false}
        />
      </mesh>

      {/* Core Point Light */}
      <pointLight position={[0, 1.25, 0]} color="#EB7340" intensity={1.8} distance={4} />

      {/* Minimal Diegetic Marker Billboard */}
      <Html
        position={[0, 1.85, 0]}
        center
        distanceFactor={8}
        transform
        sprite
        occlude
        className="pointer-events-none select-none"
      >
        <div className="flex flex-col items-center gap-1 font-mono text-[10px] whitespace-nowrap">
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#140805]/90 border border-[#5D3025] text-[#DF865C] backdrop-blur-xs">
            <span className="text-[#EB7340] font-bold">#{formattedIndex}</span>
            <span>{label}</span>
          </div>
          <span className="text-[8px] text-[#BD6547] uppercase tracking-wider">
            {category}
          </span>
        </div>
      </Html>
    </group>
  );
};