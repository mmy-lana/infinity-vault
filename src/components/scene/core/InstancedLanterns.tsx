'use client';

import React from 'react';
import { Instances, Instance } from '@react-three/drei';

export interface InstancedLanternData {
  position: [number, number, number];
  scale?: number;
}

export const InstancedLanterns: React.FC<{
  lanterns: InstancedLanternData[];
}> = ({ lanterns }) => {
  if (lanterns.length === 0) return null;

  return (
    <group>
      {/* Instanced Paper Lantern Bodies (1 Draw Call) */}
      <Instances range={lanterns.length}>
        <cylinderGeometry args={[0.32, 0.28, 0.85, 8]} />
        <meshStandardMaterial
          color="#EB7340"
          emissive="#EB7340"
          emissiveIntensity={0.7}
          roughness={0.4}
          metalness={0.1}
        />
        {lanterns.map((l, i) => (
          <Instance
            key={`lantern-body-${i}`}
            position={l.position}
            scale={l.scale ?? 0.8}
          />
        ))}
      </Instances>

      {/* Instanced Timber Caps (1 Draw Call for All Caps) */}
      <Instances range={lanterns.length * 2}>
        <cylinderGeometry args={[0.38, 0.36, 0.08, 8]} />
        <meshStandardMaterial color="#2F1A17" roughness={0.9} metalness={0.2} />
        {lanterns.flatMap((l, i) => {
          const s = l.scale ?? 0.8;
          return [
            <Instance
              key={`lantern-top-${i}`}
              position={[l.position[0], l.position[1] + 0.45 * s, l.position[2]]}
              scale={s}
            />,
            <Instance
              key={`lantern-bot-${i}`}
              position={[l.position[0], l.position[1] - 0.45 * s, l.position[2]]}
              scale={s}
            />,
          ];
        })}
      </Instances>
    </group>
  );
};