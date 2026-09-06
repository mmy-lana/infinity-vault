'use client';

import React from 'react';

export interface CastleAtmosphereProps {
  fogColor?: string;
  fogNear?: number;
  fogFar?: number;
  ambientColor?: string;
  ambientIntensity?: number;
  directionalColor?: string;
  directionalIntensity?: number;
}

export const CastleAtmosphere: React.FC<CastleAtmosphereProps> = ({
  fogColor = '#140805',
  fogNear = 10,
  fogFar = 32,
  ambientColor = '#5D3025',
  ambientIntensity = 0.4,
  directionalColor = '#DF865C',
  directionalIntensity = 0.6,
}) => {
  return (
    <>
      <color attach="background" args={[fogColor]} />
      <fog attach="fog" args={[fogColor, fogNear, fogFar]} />

      <ambientLight intensity={ambientIntensity} color={ambientColor} />
      <directionalLight position={[5, 10, 5]} intensity={directionalIntensity} color={directionalColor} />
      <pointLight position={[0, -5, 5]} intensity={1.5} color="#C04D2D" distance={25} />
      <pointLight position={[0, 8, 8]} intensity={1.2} color="#EB7340" distance={30} />
    </>
  );
};