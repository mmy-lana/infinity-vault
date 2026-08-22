'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { FloatingLanternsField } from './FloatingLanternsField';
import { SwirlingEmbersField } from './SwirlingEmbersField';

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
        {/* Volumetric Mugen Castle Atmosphere Fog */}
        <color attach="background" args={['#140805']} />
        <fog attach="fog" args={['#140805', 10, 32]} />

        {/* Ambient & Warm Timber Frame Lighting */}
        <ambientLight intensity={0.4} color="#5D3025" />
        <directionalLight position={[5, 10, 5]} intensity={0.6} color="#DF865C" />
        <pointLight position={[0, -5, 5]} intensity={1.5} color="#C04D2D" distance={25} />
        <pointLight position={[0, 8, 8]} intensity={1.2} color="#EB7340" distance={30} />

        <Suspense fallback={null}>
          <FloatingLanternsField count={22} />
          <SwirlingEmbersField count={280} />
        </Suspense>
      </Canvas>

      {/* Shoji Grid Overlay & Depth Vignette */}
      <div className="absolute inset-0 mugen-grid pointer-events-none opacity-40" />
      <div className="absolute inset-0 mugen-radial-vignette pointer-events-none" />
    </div>
  );
};