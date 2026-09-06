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

import { buildFloorLayouts, FloorData } from '@/lib/exploreLayout';
import { ToriiPortal } from './ToriiPortal';

export const ExploreScene: React.FC = () => {
  const [isLocked, setIsLocked] = useState(false);
  const [currentFloorIdx, setCurrentFloorIdx] = useState(0);
  const [nearbyProject, setNearbyProject] = useState<ProjectItem | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [teleportPos, setTeleportPos] = useState<[number, number, number] | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const floors = useMemo<FloorData[]>(() => buildFloorLayouts(PROJECTS_DATA), []);
  const currentFloor = floors[currentFloorIdx] || floors[0];

  const nextFloor = floors[(currentFloorIdx + 1) % floors.length];
  const prevFloor = floors[(currentFloorIdx - 1 + floors.length) % floors.length];

  const handleTeleportToFloor = (targetFloorIndex: number) => {
    setCurrentFloorIdx(targetFloorIndex);
    setNearbyProject(null);
    setTeleportPos([0, 1.6, 5]);

    setTimeout(() => {
      setTeleportPos(null);
    }, 100);
  };

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

  const boundsZ: [number, number] = useMemo(() => {
    return [currentFloor.portalForwardZ - 2, currentFloor.portalBackZ + 2];
  }, [currentFloor]);

  return (
    <div ref={canvasRef} className="relative w-full h-full">
      <ExploreHUD
        isLocked={isLocked}
        onEnterClick={requestLock}
        discoveredCount={0}
        totalCount={PROJECTS_DATA.length}
        nearbyProject={nearbyProject}
        onInspectNearby={handleInspectNearby}
        floorRoman={currentFloor.floorRoman}
        categoryTitle={currentFloor.category}
        floorTotal={currentFloor.projects.length}
      />

      <Canvas
        camera={{ position: [0, 1.6, 5], fov: 60, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <CastleAtmosphere fogNear={6} fogFar={34} ambientIntensity={0.35} />

        <Suspense fallback={null}>
          {/* Dynamically dimensioned architectural hallway */}
          <CastleRoom
            key={currentFloor.id}
            width={12}
            length={currentFloor.corridorLength}
            height={5}
          />

          {/* Procedurally placed real project markers for this chamber */}
          {currentFloor.placedMarkers.map((m) => (
            <ProjectMarker
              key={m.project.id}
              project={m.project}
              position={m.position}
              isNearby={nearbyProject?.id === m.project.id}
              onInspect={openProjectModal}
            />
          ))}

          {/* Forward Gate to next chamber */}
          <ToriiPortal
            position={[0, 0, currentFloor.portalForwardZ]}
            targetChamber={`CHAMBER ${nextFloor.floorRoman}`}
            targetLabel={nextFloor.category}
            onPassThrough={() => handleTeleportToFloor((currentFloorIdx + 1) % floors.length)}
          />

          {/* Rear Gate to previous chamber */}
          <ToriiPortal
            position={[0, 0, currentFloor.portalBackZ]}
            rotation={[0, Math.PI, 0]}
            targetChamber={`CHAMBER ${prevFloor.floorRoman}`}
            targetLabel={prevFloor.category}
            onPassThrough={() =>
              handleTeleportToFloor((currentFloorIdx - 1 + floors.length) % floors.length)
            }
          />

          <ProximityObserver
            markers={currentFloor.placedMarkers}
            threshold={2.5}
            onActiveChange={setNearbyProject}
          />

          <PlayerController
            boundsX={[-5.2, 5.2]}
            boundsZ={boundsZ}
            teleportPosition={teleportPos}
            onLockChange={setIsLocked}
          />
        </Suspense>
      </Canvas>

      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
};