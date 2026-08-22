'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 7919 + 1) * 10000;
  return x - Math.floor(x);
}

export const SwirlingEmbersField: React.FC<{ count?: number }> = ({ count = 350 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors, randomSpeeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count * 3);

    const emberPalette = [
      new THREE.Color('#EB7340'),
      new THREE.Color('#DF865C'),
      new THREE.Color('#C04D2D'),
      new THREE.Color('#BD6547'),
    ];

    for (let i = 0; i < count; i++) {
      const r1 = seededRandom(i * 6 + 1);
      const r2 = seededRandom(i * 6 + 2);
      const r3 = seededRandom(i * 6 + 3);
      const r4 = seededRandom(i * 6 + 4);
      const r5 = seededRandom(i * 6 + 5);
      const r6 = seededRandom(i * 6 + 6);

      // Cylindrical spatial distribution
      const radius = 1.5 + r1 * 16;
      const angle = r2 * Math.PI * 2;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (r3 - 0.5) * 32;
      pos[i * 3 + 2] = Math.sin(angle) * radius - 2;

      const chosenColor = emberPalette[Math.floor(r4 * emberPalette.length)];
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;

      spd[i * 3] = 0.002 + r5 * 0.006; // Swirl velocity
      spd[i * 3 + 1] = 0.015 + r6 * 0.035; // Upward drift
      spd[i * 3 + 2] = r1 * Math.PI * 2; // Phase
    }

    return [pos, col, spd];
  }, [count]);

  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(235, 115, 64, 0.8)');
      gradient.addColorStop(0.7, 'rgba(192, 77, 45, 0.3)');
      gradient.addColorStop(1, 'rgba(20, 8, 5, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const positionAttr = geo.attributes.position;
    const posArray = positionAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const swirlSpeed = randomSpeeds[i3];
      const upwardSpeed = randomSpeeds[i3 + 1];

      // Circular vortex around center Y-axis
      const currentX = posArray[i3];
      const currentZ = posArray[i3 + 2];
      const currentAngle = Math.atan2(currentZ, currentX) + swirlSpeed;
      const radius = Math.sqrt(currentX * currentX + currentZ * currentZ);

      posArray[i3] = Math.cos(currentAngle) * radius;
      posArray[i3 + 1] += upwardSpeed;
      posArray[i3 + 2] = Math.sin(currentAngle) * radius;

      // Wrap around upper boundary
      if (posArray[i3 + 1] > 18) {
        posArray[i3 + 1] = -18;
      }
    }

    positionAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.28}
        vertexColors
        transparent
        opacity={0.85}
        map={circleTexture}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};