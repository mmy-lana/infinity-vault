'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { SwirlingEmbersField } from '@/components/scene/core/SwirlingEmbersField';
import { SingleLantern } from '@/components/scene/core/SingleLantern';

export interface CastleRoomProps {
  width?: number; // X axis default 12m
  length?: number; // Z axis default 24m
  height?: number; // Y axis default 5m
}

interface RoomDecorations {
  pillarPositions: [number, number, number][];
  ceilingBeams: number[];
  hangingLanterns: [number, number, number][];
}

export const CastleRoom: React.FC<CastleRoomProps> = ({
  width = 12,
  length = 24,
  height = 5,
}) => {
  const halfW = width / 2;
  const halfL = length / 2;
  const halfH = height / 2;

  const { pillarPositions, ceilingBeams, hangingLanterns } = useMemo<RoomDecorations>(() => {
    const pillars: [number, number, number][] = [];
    const beams: number[] = [];
    const lanterns: [number, number, number][] = [];

    const zStart = Math.floor(-halfL + 2);
    const zEnd = Math.floor(halfL - 2);

    for (let z = zStart; z <= zEnd; z += 4) {
      pillars.push([-halfW + 0.15, halfH, z]);
      pillars.push([halfW - 0.15, halfH, z]);
      beams.push(z);
    }

    for (let z = zStart + 2; z <= zEnd - 2; z += 8) {
      lanterns.push([-2.8, height - 1.2, z]);
      lanterns.push([2.8, height - 1.2, z]);
    }

    return { pillarPositions: pillars, ceilingBeams: beams, hangingLanterns: lanterns };
  }, [halfW, halfH, halfL, height]);

  return (
    <group>
      {/* Floor */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial
          color="#3d2018"
          emissive="#5D3025"
          emissiveIntensity={0.18}
          roughness={0.85}
          metalness={0}
        />
      </mesh>

      {/* Floor Border Beams */}
      <mesh position={[0, 0.05, -halfL]}>
        <boxGeometry args={[width, 0.1, 0.2]} />
        <meshStandardMaterial color="#2F1A17" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.05, halfL]}>
        <boxGeometry args={[width, 0.1, 0.2]} />
        <meshStandardMaterial color="#2F1A17" roughness={0.9} />
      </mesh>
      <mesh position={[-halfW, 0.05, 0]}>
        <boxGeometry args={[0.2, 0.1, length]} />
        <meshStandardMaterial color="#2F1A17" roughness={0.9} />
      </mesh>
      <mesh position={[halfW, 0.05, 0]}>
        <boxGeometry args={[0.2, 0.1, length]} />
        <meshStandardMaterial color="#2F1A17" roughness={0.9} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, height, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color="#140805" roughness={0.95} />
      </mesh>

      {/* Transverse Ceiling Timber Beams */}
      {ceilingBeams.map((z) => (
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

      {/* Far Back Wall */}
      <mesh position={[0, halfH, -halfL]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          color="#2F1A17"
          emissive="#5D3025"
          emissiveIntensity={0.05}
          roughness={0.85}
        />
      </mesh>

      {/* Front Entry Wall */}
      <mesh position={[0, halfH, halfL]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          color="#2F1A17"
          emissive="#5D3025"
          emissiveIntensity={0.05}
          roughness={0.85}
        />
      </mesh>

      {/* Architectural Timber Pillars */}
      {pillarPositions.map((pos, idx) => (
        <mesh key={`pillar-${idx}`} position={pos}>
          <boxGeometry args={[0.3, height, 0.3]} />
          <meshStandardMaterial color="#20100d" roughness={0.9} />
        </mesh>
      ))}

      {/* Atmospheric Overhead Embers */}
      <SwirlingEmbersField
        count={120}
        radiusRange={[0.8, 5]}
        heightBound={4.2}
        particleSize={0.22}
      />

      {/* Hanging Ambient Room Lanterns */}
      {hangingLanterns.map((pos, idx) => (
        <SingleLantern
          key={`hang-${idx}`}
          data={{
            position: pos,
            scale: 0.8,
            lightIntensity: 0.9,
            color: '#EB7340',
            bobbingSpeed: 0.4,
            bobbingAmplitude: 0.15,
            bobbingOffset: idx * 1.5,
          }}
        />
      ))}
    </group>
  );
};