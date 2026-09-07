'use client';

import React from 'react';
import * as THREE from 'three';

export interface CorridorSegmentProps {
  centerZ: number;
  length?: number; // default 16m
  width?: number;  // default 12m
  height?: number; // default 5m
}

// Segments are always instantiated at the same fixed 12m x 16m x 5m
// dimensions, so every segment shares these geometries/materials instead of
// each mount allocating its own GPU buffers from scratch. Re-allocating ~15
// buffers every time a segment scrolled into view was the source of the
// frame hitch on movement — this removes that allocation entirely.
const FLOOR_GEOMETRY = new THREE.PlaneGeometry(12, 16);
const CEILING_GEOMETRY = new THREE.PlaneGeometry(12, 16);
const WALL_GEOMETRY = new THREE.PlaneGeometry(16, 5);
const RUNNER_GEOMETRY = new THREE.BoxGeometry(0.25, 0.1, 16);
const BEAM_GEOMETRY = new THREE.BoxGeometry(12, 0.3, 0.3);
const PILLAR_GEOMETRY = new THREE.BoxGeometry(0.3, 5, 0.3);

const FLOOR_MATERIAL = new THREE.MeshStandardMaterial({
  color: '#3d2018',
  emissive: '#5D3025',
  emissiveIntensity: 0.18,
  roughness: 0.85,
  metalness: 0,
});
const CEILING_MATERIAL = new THREE.MeshStandardMaterial({ color: '#140805', roughness: 0.95 });
const RUNNER_MATERIAL = new THREE.MeshStandardMaterial({ color: '#2F1A17', roughness: 0.9 });
const BEAM_MATERIAL = new THREE.MeshStandardMaterial({ color: '#2F1A17', roughness: 0.8 });
const WALL_MATERIAL = new THREE.MeshStandardMaterial({
  color: '#2F1A17',
  emissive: '#5D3025',
  emissiveIntensity: 0.08,
  roughness: 0.8,
  side: THREE.DoubleSide,
});
const PILLAR_MATERIAL = new THREE.MeshStandardMaterial({ color: '#20100d', roughness: 0.9 });

export const CorridorSegment: React.FC<CorridorSegmentProps> = ({
  centerZ,
  width = 12,
  height = 5,
}) => {
  const halfW = width / 2;
  const halfH = height / 2;

  const pillarsZ = [-6, -2, 2, 6];

  return (
    <group position={[0, 0, centerZ]}>
      {/* Floor Slab */}
      <mesh
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
        geometry={FLOOR_GEOMETRY}
        material={FLOOR_MATERIAL}
      />

      {/* Outer Timber Base Runners */}
      <mesh position={[-halfW, 0.05, 0]} geometry={RUNNER_GEOMETRY} material={RUNNER_MATERIAL} />
      <mesh position={[halfW, 0.05, 0]} geometry={RUNNER_GEOMETRY} material={RUNNER_MATERIAL} />

      {/* Ceiling Slab */}
      <mesh
        position={[0, height, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={CEILING_GEOMETRY}
        material={CEILING_MATERIAL}
      />

      {/* Transverse Ceiling Timber Beams */}
      {pillarsZ.map((z) => (
        <mesh key={`beam-${z}`} position={[0, height - 0.15, z]} geometry={BEAM_GEOMETRY} material={BEAM_MATERIAL} />
      ))}

      {/* Left Wall (Shoji Screens) */}
      <mesh
        position={[-halfW, halfH, 0]}
        rotation={[0, Math.PI / 2, 0]}
        geometry={WALL_GEOMETRY}
        material={WALL_MATERIAL}
      />

      {/* Right Wall (Shoji Screens) */}
      <mesh
        position={[halfW, halfH, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        geometry={WALL_GEOMETRY}
        material={WALL_MATERIAL}
      />

      {/* Perimeter Timber Pillars */}
      {pillarsZ.map((z) => (
        <React.Fragment key={`pillars-${z}`}>
          <mesh position={[-halfW + 0.15, halfH, z]} geometry={PILLAR_GEOMETRY} material={PILLAR_MATERIAL} />
          <mesh position={[halfW - 0.15, halfH, z]} geometry={PILLAR_GEOMETRY} material={PILLAR_MATERIAL} />
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