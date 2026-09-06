'use client';

import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { CastleAtmosphere } from '@/components/scene/core/CastleAtmosphere';
import { CastleRoom } from './CastleRoom';
import { PlayerController } from './PlayerController';
import { DummyMarker } from './DummyMarker';
import { ExploreHUD } from './ExploreHUD';

const DUMMY_MARKERS = [
  {
    id: 'dummy-1',
    index: 1,
    label: 'Prototype Request Engine',
    category: 'Developer Tooling',
    position: [-4, 0, -6] as [number, number, number],
  },
  {
    id: 'dummy-2',
    index: 2,
    label: 'Heap Profiler Rig',
    category: 'Utility & System',
    position: [4, 0, -6] as [number, number, number],
  },
  {
    id: 'dummy-3',
    index: 3,
    label: 'WebGL Luminous Matrix',
    category: 'Interactive UI / Creative',
    position: [-4, 0, 4] as [number, number, number],
  },
  {
    id: 'dummy-4',
    index: 4,
    label: 'Async Pipeline Dispatcher',
    category: 'Fullstack Application',
    position: [4, 0, 4] as [number, number, number],
  },
];

export const ExploreScene: React.FC = () => {
  const [isLocked, setIsLocked] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const requestLock = () => {
    const canvasElement = canvasRef.current?.querySelector('canvas');
    canvasElement?.requestPointerLock();
  };

  return (
    <div ref={canvasRef} className="relative w-full h-full">
      <ExploreHUD
        isLocked={isLocked}
        onEnterClick={requestLock}
        discoveredCount={0}
        totalCount={DUMMY_MARKERS.length}
      />

      <Canvas
        camera={{ position: [0, 1.6, 9], fov: 60, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <CastleAtmosphere fogNear={4} fogFar={28} ambientIntensity={0.35} />

        <Suspense fallback={null}>
          <CastleRoom width={12} length={24} height={5} />
          {DUMMY_MARKERS.map((m) => (
            <DummyMarker key={m.id} {...m} />
          ))}
          <PlayerController onLockChange={setIsLocked} />
        </Suspense>
      </Canvas>
    </div>
  );
};