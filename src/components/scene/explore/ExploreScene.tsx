'use client';

/* eslint-disable react-hooks/immutability */
import React, { Suspense, useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { CastleAtmosphere } from '@/components/scene/core/CastleAtmosphere';
import { CastleRoom } from './CastleRoom';
import { PlayerController } from './PlayerController';
import { ProjectMarker } from './ProjectMarker';
import { ExploreHUD } from './ExploreHUD';
import { ProjectDetailModal } from '@/components/organisms/ProjectDetailModal';
import { PROJECTS_DATA } from '@/data/projectsData';
import { ProjectItem } from '@/types/project';

interface PlacedMarker {
  project: ProjectItem;
  position: [number, number, number];
}

const ProximityObserver: React.FC<{
  markers: PlacedMarker[];
  threshold?: number;
  onActiveChange: (project: ProjectItem | null) => void;
}> = ({ markers, threshold = 2.5, onActiveChange }) => {
  const activeIdRef = useRef<string | null>(null);

  useFrame((state) => {
    let closestProject: ProjectItem | null = null;
    let minDistance = threshold;

    for (const item of markers) {
      const dist = Math.hypot(
        state.camera.position.x - item.position[0],
        state.camera.position.z - item.position[2]
      );
      if (dist < minDistance) {
        minDistance = dist;
        closestProject = item.project;
      }
    }

    const nextId = closestProject ? closestProject.id : null;
    if (nextId !== activeIdRef.current) {
      activeIdRef.current = nextId;
      onActiveChange(closestProject);
    }
  });

  return null;
};

export const ExploreScene: React.FC = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [nearbyProject, setNearbyProject] = useState<ProjectItem | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const testMarkers = useMemo<PlacedMarker[]>(() => {
    return [
      { project: PROJECTS_DATA[0], position: [-4, 0, -6] }, // Markdown Live Previewer
      { project: PROJECTS_DATA[1], position: [4, 0, -6] },  // Crypto Price Tracker Dashboard
      { project: PROJECTS_DATA[3], position: [-4, 0, 4] },  // JSON to TypeScript Interface Converter
      { project: PROJECTS_DATA[9], position: [4, 0, 4] },   // Rest API Response Time Benchmarker
    ];
  }, []);

  const openProjectModal = (project: ProjectItem) => {
    document.exitPointerLock?.();
    setActiveProject(project);
  };

  const handleInspectNearby = () => {
    if (nearbyProject) {
      openProjectModal(nearbyProject);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'KeyE' && nearbyProject && !activeProject) {
        openProjectModal(nearbyProject);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nearbyProject, activeProject]);

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
        totalCount={testMarkers.length}
        nearbyProject={nearbyProject}
        onInspectNearby={handleInspectNearby}
      />

      <Canvas
        camera={{ position: [0, 1.6, 9], fov: 60, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <CastleAtmosphere fogNear={4} fogFar={28} ambientIntensity={0.35} />

        <Suspense fallback={null}>
          <CastleRoom width={12} length={24} height={5} />

          {testMarkers.map((m) => (
            <ProjectMarker
              key={m.project.id}
              project={m.project}
              position={m.position}
              isNearby={nearbyProject?.id === m.project.id}
              onInspect={openProjectModal}
            />
          ))}

          <ProximityObserver
            markers={testMarkers}
            threshold={2.5}
            onActiveChange={setNearbyProject}
          />

          <PlayerController onLockChange={setIsLocked} />
        </Suspense>
      </Canvas>

      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
};