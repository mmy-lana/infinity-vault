'use client';

import React, { useMemo } from 'react';
import { SingleLantern, LanternData } from './SingleLantern';

const LANTERN_COLORS = ['#EB7340', '#DF865C', '#C04D2D', '#914B35'];

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999 + 1) * 10000;
  return x - Math.floor(x);
}

export interface FloatingLanternsFieldProps {
  count?: number;
  radiusRange?: [number, number];
  heightRange?: number;
}

export const FloatingLanternsField: React.FC<FloatingLanternsFieldProps> = ({
  count = 24,
  radiusRange = [6, 20],
  heightRange = 24,
}) => {
  const lanterns = useMemo<LanternData[]>(() => {
    const items: LanternData[] = [];
    const [minR, maxR] = radiusRange;
    const deltaR = maxR - minR;

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
      const radius = minR + r2 * deltaR;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius - 5;
      const y = (r3 - 0.5) * heightRange;

      items.push({
        position: [x, y, z],
        rotationSpeed: (r4 - 0.5) * 0.4,
        bobbingSpeed: 0.5 + r5 * 0.8,
        bobbingOffset: r6 * Math.PI * 2,
        bobbingAmplitude: 0.3 + r7 * 0.5,
        scale: 0.6 + r8 * 0.5,
        lightIntensity: 0.8 + r1 * 1.2,
        color: LANTERN_COLORS[Math.floor(r2 * LANTERN_COLORS.length)],
        animate: true,
      });
    }
    return items;
  }, [count, radiusRange, heightRange]);

  return (
    <group>
      {lanterns.map((data, idx) => (
        <SingleLantern key={idx} data={data} />
      ))}
    </group>
  );
};