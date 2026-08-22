'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, ChevronUp, ExternalLink, Sparkles, Shield } from 'lucide-react';
import { EXTERNAL_LINKS } from '@/lib/constants';

interface SpatialHUDProps {
  onOpenCommandPalette: () => void;
  completedCount: number;
  totalCount: number;
}

export const SpatialHUD: React.FC<SpatialHUDProps> = ({
  onOpenCommandPalette,
  completedCount,
  totalCount,
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Floating Glass Header HUD */}
      <header className="fixed top-3 sm:top-4 inset-x-0 z-40 max-w-7xl mx-auto px-3 sm:px-6 pointer-events-none">
        <div className="flex items-center justify-between p-2 sm:p-2.5 sm:px-4 rounded-xl sm:rounded-2xl bg-[#2F1A17]/90 border border-[#5D3025] backdrop-blur-md shadow-2xl pointer-events-auto">
          {/* Brand Logo & Telemetry Beacon */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={EXTERNAL_LINKS.portfolioSubdomain}
              className="flex items-center gap-2 text-xs sm:text-sm font-bold font-mono text-[#DF865C] hover:text-[#EB7340] transition-colors"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#EB7340] animate-ping" />
              <span>MMYLANA // 無限城</span>
            </a>
            <span className="hidden md:inline-flex text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#140805] text-[#BD6547] border border-[#5D3025]">
              DOOMSCROLLING STREAM
            </span>
          </div>

          {/* Quick Actions & ⌘K Palette Button */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              type="button"
              onClick={onOpenCommandPalette}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#140805] border border-[#5D3025] hover:border-[#EB7340] text-[11px] sm:text-xs font-mono text-[#DF865C] transition-all duration-150 cursor-pointer shadow-xs"
            >
              <Command className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#EB7340]" />
              <span>Search</span>
              <span className="text-[10px] text-[#BD6547] hidden sm:inline ml-1">⌘K</span>
            </button>

            <a
              href={EXTERNAL_LINKS.hub}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#2F1A17] hover:bg-[#5D3025]/50 border border-[#5D3025] text-[11px] sm:text-xs font-mono text-[#DF865C] transition-colors"
            >
              <span className="hidden sm:inline">Main Hub</span>
              <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#BD6547]" />
            </a>
          </div>
        </div>
      </header>

      {/* Floating Bottom Quick Dock / Back To Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-40"
          >
            <button
              type="button"
              onClick={scrollToTop}
              title="Return to top"
              className="flex items-center justify-center p-3 rounded-full bg-[#EB7340] text-[#140805] hover:bg-[#DF865C] border border-[#EB7340] shadow-[0_0_20px_rgba(235,115,64,0.5)] transition-all cursor-pointer"
            >
              <ChevronUp className="w-5 h-5 stroke-[2.5]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spatial Telemetry Status Capsule */}
      <div className="fixed bottom-6 left-6 z-30 hidden lg:flex items-center gap-3 p-2.5 px-3.5 rounded-xl bg-[#140805]/90 border border-[#5D3025] backdrop-blur-md font-mono text-[11px] text-[#BD6547] pointer-events-none shadow-xl">
        <span className="flex items-center gap-1 text-[#EB7340]">
          <Sparkles className="w-3 h-3" />
          <span>{completedCount} / {totalCount} Built</span>
        </span>
        <span className="text-[#5D3025]">|</span>
        <span className="flex items-center gap-1">
          <Shield className="w-3 h-3 text-[#DF865C]" />
          <span>Mugen Bento Stream Active</span>
        </span>
      </div>
    </>
  );
};