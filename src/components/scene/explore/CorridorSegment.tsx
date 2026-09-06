'use client';

import React from 'react';
import * as THREE from 'three';
import { SingleLantern } from '@/components/scene/core/SingleLantern';

export interface CorridorSegmentProps {
  centerZ: number;
  length?: number; // default 16m
  width?: number;  // default 12m
  height?: number; // default 5m
}

export const CorridorSegment: React.FC<CorridorSegmentProps> = ({
  centerZ,
  length = 16,
  width = 12,
  height = 5,
}) => {
  const halfW = width / 2;
  const halfL = length / 2;
  const halfH = height / 2;

  const pillarsZ = [-6, -2, 2, 6];
  const lanternsZ = [-4, 4];

  return (
    <group position={[0, 0, centerZ]}>
      {/* Floor Slab */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#1b0e0b" roughness={0.85} metalness={0.15} />
      </mesh>

      {/* Outer Timber Base Runners */}
      <mesh position={[-halfW, 0.05, 0]}>
        <boxGeometry args={[0.25, 0.1, length]} />
        <meshStandardMaterial color="#2F1A17" roughness={0.9} />
      </mesh>
      <mesh position={[halfW, 0.05, 0]}>
        <boxGeometry args={[0.25, 0.1, length]} />
        <meshStandardMaterial color="#2F1A17" roughness={0.9} />
      </mesh>

      {/* Ceiling Slab */}
      <mesh position={[0, height, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#140805" roughness={0.95} />
      </mesh>

      {/* Transverse Ceiling Timber Beams */}
      {pillarsZ.map((z) => (
        <mesh key={`beam-${z}`} position={[0, height - 0.15, z]}>
          <boxGeometry args={[width, 0.3, 0.3]} />
          <meshStandardMaterial color="#2F1A17" roughness={0.8} />
        </mesh>
      ))}

      {/* Left Wall (Shoji Screens) */}
      <mesh position={[-halfW, halfH, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial
          color="#2F1A17"
          emissive="#5D3025"
          emissiveIntensity={0.08}
          roughness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Right Wall (Shoji Screens) */}
      <mesh position={[halfW, halfH, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial
          color="#2F1A17"
          emissive="#5D3025"
          emissiveIntensity={0.08}
          roughness={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Perimeter Timber Pillars */}
      {pillarsZ.map((z) => (
        <React.Fragment key={`pillars-${z}`}>
          <mesh position={[-halfW + 0.15, halfH, z]}>
            <boxGeometry args={[0.3, height, 0.3]} />
            <meshStandardMaterial color="#20100d" roughness={0.9} />
          </mesh>
          <mesh position={[halfW - 0.15, halfH, z]}>
            <boxGeometry args={[0.3, height, 0.3]} />
            <meshStandardMaterial color="#20100d" roughness={0.9} />
          </mesh>
        </React.Fragment>
      ))}

      {/* Centralized Overhead Ambient Light per Segment */}
      <pointLight
        position={[0, height - 1.2, 0]}
        color="#EB7340"
        intensity={2.2}
        distance={14}
        decay={2}
      />
    </group>
  );
};