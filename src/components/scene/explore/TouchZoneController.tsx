'use client';

import React, { useRef, useState, useEffect } from 'react';

export interface TouchMoveVector {
  x: number;
  y: number;
}

export interface TouchLookDelta {
  x: number;
  y: number;
}

interface TouchZoneControllerProps {
  onMove: (vector: TouchMoveVector) => void;
  onLook: (delta: TouchLookDelta) => void;
  disabled?: boolean;
}

export const TouchZoneController: React.FC<TouchZoneControllerProps> = ({
  onMove,
  onLook,
  disabled = false,
}) => {
  const [joystickOrigin, setJoystickOrigin] = useState<{ x: number; y: number } | null>(null);
  const [joystickKnob, setJoystickKnob] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const moveTouchIdRef = useRef<number | null>(null);
  const lookTouchIdRef = useRef<number | null>(null);
  const lastLookPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  if (disabled) return null;

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const halfWidth = window.innerWidth / 2;

    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];

      // Left half touch: Movement Joystick
      if (touch.clientX < halfWidth && moveTouchIdRef.current === null) {
        moveTouchIdRef.current = touch.identifier;
        setJoystickOrigin({ x: touch.clientX, y: touch.clientY });
        setJoystickKnob({ x: 0, y: 0 });
        onMove({ x: 0, y: 0 });
      }

      // Right half touch: Camera Look
      if (touch.clientX >= halfWidth && lookTouchIdRef.current === null) {
        lookTouchIdRef.current = touch.identifier;
        lastLookPosRef.current = { x: touch.clientX, y: touch.clientY };
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];

      if (touch.identifier === moveTouchIdRef.current && joystickOrigin) {
        const dx = touch.clientX - joystickOrigin.x;
        const dy = touch.clientY - joystickOrigin.y;
        const maxRadius = 45;

        const distance = Math.hypot(dx, dy);
        const clampedDist = Math.min(distance, maxRadius);
        const angle = Math.atan2(dy, dx);

        const clampedX = Math.cos(angle) * clampedDist;
        const clampedY = Math.sin(angle) * clampedDist;

        setJoystickKnob({ x: clampedX, y: clampedY });
        onMove({
          x: clampedX / maxRadius,
          y: clampedY / maxRadius,
        });
      }

      if (touch.identifier === lookTouchIdRef.current) {
        const dx = touch.clientX - lastLookPosRef.current.x;
        const dy = touch.clientY - lastLookPosRef.current.y;
        lastLookPosRef.current = { x: touch.clientX, y: touch.clientY };

        onLook({
          x: dx * 0.003,
          y: dy * 0.003,
        });
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];

      if (touch.identifier === moveTouchIdRef.current) {
        moveTouchIdRef.current = null;
        setJoystickOrigin(null);
        setJoystickKnob({ x: 0, y: 0 });
        onMove({ x: 0, y: 0 });
      }

      if (touch.identifier === lookTouchIdRef.current) {
        lookTouchIdRef.current = null;
        onLook({ x: 0, y: 0 });
      }
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      className="fixed inset-0 z-30 touch-none select-none"
    >
      {/* Dynamic Minimalist Left Joystick Visual */}
      {joystickOrigin && (
        <div
          className="pointer-events-none fixed w-24 h-24 -ml-12 -mt-12 rounded-full border border-shoji-amber/40 bg-abyssal-void/40 backdrop-blur-xs flex items-center justify-center transition-opacity duration-150"
          style={{ left: joystickOrigin.x, top: joystickOrigin.y }}
        >
          <div
            className="w-8 h-8 rounded-full bg-shoji-amber/70 border border-golden-glow shadow-[0_0_10px_rgba(235,115,64,0.5)]"
            style={{
              transform: `translate(${joystickKnob.x}px, ${joystickKnob.y}px)`,
            }}
          />
        </div>
      )}
    </div>
  );
};