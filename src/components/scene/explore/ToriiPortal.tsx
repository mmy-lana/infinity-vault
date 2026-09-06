'use client';

/* eslint-disable react-hooks/immutability */
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export interface ToriiPortalProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  targetLabel: string;
  targetChamber: string;
  onPassThrough?: () => void;
  triggerDistance?: number;
}

export const ToriiPortal: React.FC<ToriiPortalProps> = ({
  position,
  rotation = [0, 0, 0],
  targetLabel,
  targetChamber,
  onPassThrough,
  triggerDistance = 1.8,
}) => {
  const portalGlowRef = useRef<THREE.Mesh>(null);
  const triggerFiredRef = useRef(false);

  useFrame((state) => {
    if (portalGlowRef.current) {
      const t = state.clock.getElapsedTime();
      const material = portalGlowRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 1.2 + Math.sin(t * 2) * 0.4;
    }

    // Trigger pass-through when player walks directly into portal plane
    const dx = state.camera.position.x - position[0];
    const dz = state.camera.position.z - position[2];
    const distance = Math.hypot(dx, dz);

    if (distance < triggerDistance && Math.abs(dx) < 1.6) {
      if (!triggerFiredRef.current) {
        triggerFiredRef.current = true;
        onPassThrough?.();
        setTimeout(() => {
          triggerFiredRef.current = false;
        }, 1200);
      }
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Torii Vertical Timber Pillars */}
      <mesh position={[-1.8, 2.2, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 4.4, 8]} />
        <meshStandardMaterial color="#8C341C" roughness={0.8} />
      </mesh>
      <mesh position={[1.8, 2.2, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 4.4, 8]} />
        <meshStandardMaterial color="#8C341C" roughness={0.8} />
      </mesh>

      {/* Main Top Lintel (Kasagi) */}
      <mesh position={[0, 4.3, 0]}>
        <boxGeometry args={[4.4, 0.25, 0.35]} />
        <meshStandardMaterial color="#5F1906" roughness={0.7} />
      </mesh>

      {/* Secondary Sub-Beam (Nuki) */}
      <mesh position={[0, 3.6, 0]}>
        <boxGeometry args={[3.8, 0.16, 0.24]} />
        <meshStandardMaterial color="#5F1906" roughness={0.7} />
      </mesh>

      {/* Center Plaque (Gakuzuka) */}
      <mesh position={[0, 3.95, 0.05]}>
        <boxGeometry args={[0.45, 0.55, 0.1]} />
        <meshStandardMaterial color="#2F1A17" roughness={0.9} />
      </mesh>

      {/* Luminous Volumetric Veil */}
      <mesh ref={portalGlowRef} position={[0, 2, 0]}>
        <planeGeometry args={[3.2, 4]} />
        <meshStandardMaterial
          color="#EB7340"
          emissive="#EB7340"
          emissiveIntensity={1.2}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Torii Portal Point Light */}
      <pointLight position={[0, 2.5, 0]} color="#EB7340" intensity={3.5} distance={8} decay={2} />

      {/* Chamber Navigation Billboard */}
      <Html position={[0, 4.8, 0]} center transform sprite distanceFactor={9} className="select-none pointer-events-none">
        <div className="flex flex-col items-center gap-0.5 font-mono text-center whitespace-nowrap">
          <span className="text-[9px] uppercase tracking-widest text-[#EB7340] font-bold px-2 py-0.5 rounded bg-[#140805]/95 border border-[#5D3025]">
            {targetChamber}
          </span>
          <span className="text-[8px] text-[#DF865C] bg-[#140805]/80 px-1.5 py-0.2 rounded">
            {targetLabel}
          </span>
        </div>
      </Html>
    </group>
  );
};