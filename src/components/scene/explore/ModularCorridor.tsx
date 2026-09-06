'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { CorridorSegment } from './CorridorSegment';
import { SwirlingEmbersField } from '@/components/scene/core/SwirlingEmbersField';
import { InstancedLanterns, InstancedLanternData } from '@/components/scene/core/InstancedLanterns';

export interface ModularCorridorProps {
  portalForwardZ: number;
  portalBackZ: number;
  playerZ: number;
  width?: number;
  height?: number;
  segmentLength?: number;
  viewDistance?: number;
}

export const ModularCorridor: React.FC<ModularCorridorProps> = ({
  portalForwardZ,
  portalBackZ,
  playerZ,
  width = 12,
  height = 5,
  segmentLength = 16,
  viewDistance = 28,
}) => {
  const halfH = height / 2;

  // Compute active segment coordinates surrounding player's current position
  const activeSegments = useMemo(() => {
    const minZ = portalForwardZ - 4;
    const maxZ = portalBackZ + 4;

    const playerMinZ = playerZ - viewDistance;
    const playerMaxZ = playerZ + viewDistance;

    const startBound = Math.max(minZ, playerMinZ);
    const endBound = Math.min(maxZ, playerMaxZ);

    const firstCenter = Math.floor(startBound / segmentLength) * segmentLength;
    const lastCenter = Math.ceil(endBound / segmentLength) * segmentLength;

    const centers: number[] = [];
    for (let z = firstCenter; z <= lastCenter; z += segmentLength) {
      if (z >= minZ - segmentLength && z <= maxZ + segmentLength) {
        centers.push(z);
      }
    }
    return centers;
  }, [playerZ, portalForwardZ, portalBackZ, segmentLength, viewDistance]);

  // Aggregate lantern positions from active segments for batch instanced rendering
  const activeLanterns = useMemo<InstancedLanternData[]>(() => {
    const items: InstancedLanternData[] = [];
    for (const cz of activeSegments) {
      items.push({ position: [-2.8, height - 1.2, cz - 4], scale: 0.8 });
      items.push({ position: [2.8, height - 1.2, cz - 4], scale: 0.8 });
      items.push({ position: [-2.8, height - 1.2, cz + 4], scale: 0.8 });
      items.push({ position: [2.8, height - 1.2, cz + 4], scale: 0.8 });
    }
    return items;
  }, [activeSegments, height]);

  return (
    <group>
      {/* Recycled Modular Corridor Slices */}
      {activeSegments.map((centerZ) => (
        <CorridorSegment
          key={`seg-${centerZ}`}
          centerZ={centerZ}
          length={segmentLength}
          width={width}
          height={height}
        />
      ))}

      {/* High-Performance Instanced Corridor Lanterns (2 Draw Calls Total) */}
      <InstancedLanterns lanterns={activeLanterns} />

      {/* Far End-Cap Wall (Ahead of Forward Portal) */}
      <mesh position={[0, halfH, portalForwardZ - 2]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          color="#2F1A17"
          emissive="#5D3025"
          emissiveIntensity={0.05}
          roughness={0.85}
        />
      </mesh>

      {/* Near End-Cap Wall (Behind Rear Portal) */}
      <mesh position={[0, halfH, portalBackZ + 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          color="#2F1A17"
          emissive="#5D3025"
          emissiveIntensity={0.05}
          roughness={0.85}
        />
      </mesh>

      {/* Atmospheric Swirling Embers Follow Volume */}
      <group position={[0, 0, playerZ]}>
        <SwirlingEmbersField
          count={140}
          radiusRange={[0.8, 5]}
          heightBound={4.2}
          particleSize={0.24}
        />
      </group>
    </group>
  );
};