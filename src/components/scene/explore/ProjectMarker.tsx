'use client';

/* eslint-disable react-hooks/immutability */
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ProjectItem } from '@/types/project';
import { getStatusTheme } from '@/lib/utils';

export interface ProjectMarkerProps {
  project: ProjectItem;
  position: [number, number, number];
  isNearby: boolean;
  onInspect: (project: ProjectItem) => void;
}

export const ProjectMarker: React.FC<ProjectMarkerProps> = ({
  project,
  position,
  isNearby,
  onInspect,
}) => {
  const orbRef = useRef<THREE.Mesh>(null);
  const formattedIndex = project.index.toString().padStart(2, '0');
  const statusTheme = getStatusTheme(project.status);

  useFrame(({ clock }) => {
    if (!orbRef.current) return;
    const t = clock.getElapsedTime() * (isNearby ? 2.5 : 1.2);
    orbRef.current.position.y = 1.25 + Math.sin(t + project.index) * (isNearby ? 0.12 : 0.06);
    orbRef.current.rotation.y += isNearby ? 0.03 : 0.01;
  });

  return (
    <group position={position}>
      {/* Timber Pedestal Base */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 0.8, 8]} />
        <meshStandardMaterial color="#2F1A17" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Timber Capital Collar */}
      <mesh position={[0, 0.82, 0]}>
        <boxGeometry args={[0.8, 0.06, 0.8]} />
        <meshStandardMaterial color="#5D3025" roughness={0.8} />
      </mesh>

      {/* Floating Talisman Core */}
      <mesh ref={orbRef} position={[0, 1.25, 0]}>
        <octahedronGeometry args={[isNearby ? 0.28 : 0.22, 0]} />
        <meshStandardMaterial
          color={isNearby ? '#EB7340' : '#DF865C'}
          emissive={isNearby ? '#EB7340' : '#914B35'}
          emissiveIntensity={isNearby ? 1.8 : 0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Core Point Light */}
      <pointLight
        position={[0, 1.25, 0]}
        color={isNearby ? '#EB7340' : '#DF865C'}
        intensity={isNearby ? 2.8 : 1.4}
        distance={isNearby ? 6 : 3.5}
      />

      {/* Diegetic Marker Billboard */}
      <Html
        position={[0, 1.9, 0]}
        center
        distanceFactor={8}
        transform
        sprite
        className="pointer-events-none select-none"
      >
        <div
          onClick={() => onInspect(project)}
          className={`flex flex-col items-center gap-1 font-mono text-[10px] whitespace-nowrap transition-all duration-200 ${
            isNearby ? 'scale-110 pointer-events-auto cursor-pointer' : 'opacity-85'
          }`}
        >
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#140805]/95 border backdrop-blur-xs transition-colors ${
              isNearby
                ? 'border-[#EB7340] text-[#EB7340] shadow-[0_0_12px_rgba(235,115,64,0.4)]'
                : 'border-[#5D3025] text-[#DF865C]'
            }`}
          >
            <span className="font-bold">#{formattedIndex}</span>
            <span className="font-semibold">{project.title}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[8px]">
            <span className="text-[#BD6547] uppercase tracking-wider">{project.framework}</span>
            <span className="text-[#5D3025]">•</span>
            <span className={statusTheme.color}>{statusTheme.label}</span>
          </div>
        </div>
      </Html>
    </group>
  );
};