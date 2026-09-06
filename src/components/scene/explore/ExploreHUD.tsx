'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

import { ProjectItem } from '@/types/project';

export interface ExploreHUDProps {
  isLocked: boolean;
  onEnterClick: () => void;
  discoveredCount?: number;
  totalCount?: number;
  nearbyProject?: ProjectItem | null;
  onInspectNearby?: () => void;
}

export const ExploreHUD: React.FC<ExploreHUDProps> = ({
  isLocked,
  onEnterClick,
  discoveredCount = 0,
  totalCount = 4,
  nearbyProject = null,
  onInspectNearby,
}) => {
  return (
    <>
      {/* Top Left: Chamber Designation */}
      <div className="fixed top-5 left-6 z-30 pointer-events-none font-mono text-xs text-[#c9bda6] tracking-wide">
        <div className="flex items-center gap-2 text-[11px] uppercase">
          <span className="text-[#EB7340] font-bold">CHAMBER I</span>
          <span className="text-[#5D3025]">•</span>
          <span>Architectural Proving Grounds</span>
        </div>
      </div>

      {/* Top Right: Minimal Discovery Counter & Return Link */}
      <div className="fixed top-5 right-6 z-30 flex items-center gap-4 font-mono text-xs">
        <div className="flex items-center gap-1.5 text-[#c9bda6] text-[11px] pointer-events-none">
          <span className="w-2 h-2.5 rounded-xs bg-[#EB7340] shadow-[0_0_8px_rgba(235,115,64,0.6)]" />
          <span>{discoveredCount} / {totalCount} discovered</span>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#140805]/80 border border-[#5D3025] hover:border-[#EB7340] text-[11px] text-[#DF865C] transition-colors"
        >
          <ArrowLeft className="w-3 h-3 text-[#BD6547]" />
          <span>Exit</span>
        </Link>
      </div>

      {/* Center Crosshair Dot */}
      {isLocked && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/60 pointer-events-none z-30" />
      )}

      {/* Proximity Interaction Prompt (Ember Minimal) */}
      {isLocked && nearbyProject && (
        <button
          type="button"
          onClick={onInspectNearby}
          className="fixed bottom-16 left-1/2 -translate-x-1/2 z-40 font-mono text-xs text-[#f2e9d8] bg-[#140805]/90 hover:bg-[#2F1A17] px-3.5 py-1.5 border border-[#EB7340]/60 rounded shadow-[0_0_15px_rgba(235,115,64,0.35)] flex items-center gap-2 cursor-pointer transition-all animate-pulse"
        >
          <span className="inline-block border border-[#d8cfc0]/60 rounded px-1.5 py-0.2 text-[10px] text-[#EB7340] font-bold">
            E
          </span>
          <span>inspect {nearbyProject.title}</span>
        </button>
      )}

      {/* Bottom Center Controls Guide */}
      {isLocked ? (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none font-mono text-[11px] text-[#8f8574] px-3 py-1 rounded bg-[#140805]/70 border border-[#5D3025]/50 flex items-center gap-3">
          <span><b className="text-[#DF865C]">WASD</b> move</span>
          <span><b className="text-[#DF865C]">MOUSE</b> look</span>
          <span><b className="text-[#DF865C]">ESC</b> release</span>
        </div>
      ) : (
        /* Click-to-lock Entry Modal */
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#140805]/60 backdrop-blur-xs">
          <button
            type="button"
            onClick={onEnterClick}
            className="flex flex-col items-center gap-3 p-6 rounded-xl bg-[#2F1A17]/95 border border-[#5D3025] hover:border-[#EB7340] text-center font-mono cursor-pointer transition-all shadow-2xl group"
          >
            <Compass className="w-6 h-6 text-[#EB7340] group-hover:rotate-45 transition-transform duration-300" />
            <div>
              <p className="text-sm font-bold text-[#DF865C]">Enter Mugen Chamber</p>
              <p className="text-xs text-[#BD6547] mt-1">Click anywhere to lock pointer and walk</p>
            </div>
          </button>
        </div>
      )}
    </>
  );
};