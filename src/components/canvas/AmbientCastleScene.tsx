'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { CastleAtmosphere } from '@/components/scene/core/CastleAtmosphere';
import { FloatingLanternsField } from '@/components/scene/core/FloatingLanternsField';
import { SwirlingEmbersField } from '@/components/scene/core/SwirlingEmbersField';

export const AmbientCastleScene: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#140805]"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <CastleAtmosphere />

        <Suspense fallback={null}>
          <FloatingLanternsField count={22} />
          <SwirlingEmbersField count={280} />
        </Suspense>
      </Canvas>

      <div className="absolute inset-0 mugen-grid pointer-events-none opacity-40" />
      <div className="absolute inset-0 mugen-radial-vignette pointer-events-none" />
    </div>
  );
};