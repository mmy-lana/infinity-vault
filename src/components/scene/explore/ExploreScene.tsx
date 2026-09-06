'use client';

import React, { Suspense, useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { CastleAtmosphere } from '@/components/scene/core/CastleAtmosphere';
import { ModularCorridor } from './ModularCorridor';
import { PlayerController } from './PlayerController';
import { ProjectMarker } from './ProjectMarker';
import { ToriiPortal } from './ToriiPortal';
import { ExploreHUD } from './ExploreHUD';
import { ProjectDetailModal } from '@/components/organisms/ProjectDetailModal';
import { PROJECTS_DATA } from '@/data/projectsData';
import { ProjectItem } from '@/types/project';
import { buildFloorLayouts, FloorData, PlacedProjectMarker } from '@/lib/exploreLayout';

const PlayerTrackingObserver: React.FC<{
  markers: PlacedProjectMarker[];
  threshold?: number;
  onActiveChange: (project: ProjectItem | null) => void;
  onSegmentChange: (quantizedZ: number) => void;
}> = ({ markers, threshold = 2.5, onActiveChange, onSegmentChange }) => {
  const activeIdRef = useRef<string | null>(null);
  const lastQuantizedZRef = useRef<number>(0);

  useFrame((state) => {
    const camZ = state.camera.position.z;

    // Quantize position into 8m steps to update dynamic module pool without per-frame React re-renders
    const quantizedZ = Math.round(camZ / 8) * 8;
    if (quantizedZ !== lastQuantizedZRef.current) {
      lastQuantizedZRef.current = quantizedZ;
      onSegmentChange(quantizedZ);
    }

    // Proximity detection for project inspection
    let closestProject: ProjectItem | null = null;
    let minDistance = threshold;

    for (const item of markers) {
      const dist = Math.hypot(
        state.camera.position.x - item.position[0],
        camZ - item.position[2]
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
  const [currentFloorIdx, setCurrentFloorIdx] = useState(0);
  const [nearbyProject, setNearbyProject] = useState<ProjectItem | null>(null);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [teleportPos, setTeleportPos] = useState<[number, number, number] | null>(null);
  const [playerQuantizedZ, setPlayerQuantizedZ] = useState(0);
  const [isFlashing, setIsFlashing] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const floors = useMemo<FloorData[]>(() => buildFloorLayouts(PROJECTS_DATA), []);
  const currentFloor = floors[currentFloorIdx] || floors[0];

  const nextFloor = floors[(currentFloorIdx + 1) % floors.length];
  const prevFloor = floors[(currentFloorIdx - 1 + floors.length) % floors.length];

  const handleTeleportToFloor = (targetFloorIndex: number, entryZ = 5) => {
    setIsFlashing(true);
    setNearbyProject(null);

    setTimeout(() => {
      setCurrentFloorIdx(targetFloorIndex);
      setPlayerQuantizedZ(entryZ);
      setTeleportPos([0, 1.6, entryZ]);

      setTimeout(() => {
        setTeleportPos(null);
        setIsFlashing(false);
      }, 100);
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
    return [currentFloor.portalForwardZ - 1.5, currentFloor.portalBackZ + 1.5];
  }, [currentFloor]);

  // Dynamically swap markers based on camera distance (render active window only)
  const visibleMarkers = useMemo<PlacedProjectMarker[]>(() => {
    return currentFloor.placedMarkers.filter(
      (m: PlacedProjectMarker) => Math.abs(m.position[2] - playerQuantizedZ) <= 28
    );
  }, [currentFloor.placedMarkers, playerQuantizedZ]);

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
        isFlashing={isFlashing}
      />

      <Canvas
        camera={{ position: [0, 1.6, 5], fov: 60, near: 0.1, far: 50 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
      >
        <CastleAtmosphere fogNear={6} fogFar={32} ambientIntensity={0.35} />

        <Suspense fallback={null}>
          {/* Recycled physical hallway modules centered around player window */}
          <ModularCorridor
            portalForwardZ={currentFloor.portalForwardZ}
            portalBackZ={currentFloor.portalBackZ}
            playerZ={playerQuantizedZ}
            width={12}
            height={5}
            segmentLength={16}
            viewDistance={28}
          />

          {/* Dynamically swapped visible project markers */}
          {visibleMarkers.map((m) => (
            <ProjectMarker
              key={m.project.id}
              project={m.project}
              position={m.position}
              isNearby={nearbyProject?.id === m.project.id}
              onInspect={openProjectModal}
            />
          ))}

          {/* Forward Gate (loops Chamber IV -> Chamber I) */}
          <ToriiPortal
            position={[0, 0, currentFloor.portalForwardZ]}
            targetChamber={`CHAMBER ${nextFloor.floorRoman}`}
            targetLabel={nextFloor.category}
            onPassThrough={() => handleTeleportToFloor((currentFloorIdx + 1) % floors.length, 5)}
          />

          {/* Rear Gate (loops Chamber I -> Chamber IV) */}
          <ToriiPortal
            position={[0, 0, currentFloor.portalBackZ]}
            rotation={[0, Math.PI, 0]}
            targetChamber={`CHAMBER ${prevFloor.floorRoman}`}
            targetLabel={prevFloor.category}
            onPassThrough={() =>
              handleTeleportToFloor(
                (currentFloorIdx - 1 + floors.length) % floors.length,
                prevFloor.portalForwardZ + 4
              )
            }
          />

          <PlayerTrackingObserver
            markers={currentFloor.placedMarkers}
            threshold={2.5}
            onActiveChange={setNearbyProject}
            onSegmentChange={setPlayerQuantizedZ}
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