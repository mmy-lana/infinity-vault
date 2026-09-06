'use client';

/* eslint-disable react-hooks/immutability */
import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';

export interface PlayerControllerProps {
  boundsX?: [number, number];
  boundsZ?: [number, number];
  speed?: number;
  eyeHeight?: number;
  teleportPosition?: [number, number, number] | null;
  onLockChange?: (isLocked: boolean) => void;
}

export const PlayerController: React.FC<PlayerControllerProps> = ({
  boundsX = [-5.2, 5.2],
  boundsZ = [-11.2, 11.2],
  speed = 5.5,
  eyeHeight = 1.6,
  teleportPosition = null,
  onLockChange,
}) => {
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const controlsRef = useRef<React.ComponentRef<typeof PointerLockControls>>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = true;
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          keys.current.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          keys.current.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          keys.current.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          keys.current.right = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const forwardDir = useRef(new THREE.Vector3());
  const sideDir = useRef(new THREE.Vector3());
  const moveVector = useRef(new THREE.Vector3());
  const upAxis = useRef(new THREE.Vector3(0, 1, 0));

  useFrame((state, delta) => {
    if (!controlsRef.current?.isLocked) return;

    const { camera } = state;

    camera.getWorldDirection(forwardDir.current);
    forwardDir.current.y = 0;
    forwardDir.current.normalize();

    sideDir.current.crossVectors(forwardDir.current, upAxis.current).normalize();

    moveVector.current.set(0, 0, 0);

    if (keys.current.forward) moveVector.current.add(forwardDir.current);
    if (keys.current.backward) moveVector.current.sub(forwardDir.current);
    if (keys.current.right) moveVector.current.add(sideDir.current);
    if (keys.current.left) moveVector.current.sub(sideDir.current);

    if (moveVector.current.lengthSq() > 0) {
      moveVector.current.normalize().multiplyScalar(speed * delta);
      camera.position.add(moveVector.current);
    }

    // Handle programmatic teleportation
    if (teleportPosition) {
      camera.position.set(teleportPosition[0], teleportPosition[1], teleportPosition[2]);
    } else {
      // Kinematic room bounds clamping
      camera.position.x = THREE.MathUtils.clamp(camera.position.x, boundsX[0], boundsX[1]);
      camera.position.z = THREE.MathUtils.clamp(camera.position.z, boundsZ[0], boundsZ[1]);
      camera.position.y = eyeHeight;
    }
  });

  return (
    <PointerLockControls
      ref={controlsRef}
      onLock={() => onLockChange?.(true)}
      onUnlock={() => onLockChange?.(false)}
    />
  );
};