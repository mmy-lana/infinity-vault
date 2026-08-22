'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Sparkles, Layers } from 'lucide-react';
import { ProjectItem } from '@/types/project';
import { StatusDot } from '@/components/atoms/StatusDot';
import { TechPill } from '@/components/atoms/TechPill';
import { Badge } from '@/components/atoms/Badge';
import { getCategoryBadge } from '@/lib/utils';

interface BentoProjectCardProps {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
}

export const BentoProjectCard: React.FC<BentoProjectCardProps> = ({ project, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // 3D Tilt Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    damping: 20,
    stiffness: 200,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    damping: 20,
    stiffness: 200,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);

    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const catBadge = getCategoryBadge(project.category);
  const formattedIndex = project.index.toString().padStart(2, '0');

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -4 }}
      className="relative flex flex-col justify-between p-5 rounded-xl bg-[#2F1A17]/85 border border-[#5D3025] hover:border-[#914B35] transition-colors duration-200 cursor-pointer overflow-hidden group select-none shadow-lg backdrop-blur-xs"
    >
      {/* Dynamic Cursor Border Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-xl"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(235, 115, 64, 0.18), transparent 70%)`
            : 'none',
        }}
      />

      <div className="relative z-10 flex flex-col gap-3">
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#BD6547] group-hover:text-[#EB7340] transition-colors">
              #{formattedIndex}
            </span>
            <span
              className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border ${catBadge.bg} ${catBadge.border} ${catBadge.text}`}
            >
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {project.featured && (
              <span title="Featured Marquee Project" className="flex items-center text-[#EB7340]">
                <Sparkles className="w-3.5 h-3.5 fill-[#EB7340]/20" />
              </span>
            )}
            <StatusDot status={project.status} size="sm" />
          </div>
        </div>

        {/* Project Title */}
        <div>
          <h4 className="text-base font-bold font-mono text-[#DF865C] group-hover:text-[#EB7340] transition-colors leading-snug line-clamp-1">
            {project.title}
          </h4>
          <p className="text-xs text-[#BD6547] line-clamp-2 mt-1 leading-relaxed font-sans">
            {project.description}
          </p>
        </div>

        {/* UI Aesthetic Tag */}
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#BD6547]/80 bg-[#140805]/50 px-2.5 py-1 rounded-md border border-[#5D3025]/40 truncate">
          <Layers className="w-3 h-3 text-[#EB7340] shrink-0" />
          <span className="truncate">{project.aesthetic}</span>
        </div>
      </div>

      {/* Bottom Stack & Footer Actions */}
      <div className="relative z-10 pt-3 mt-3 border-t border-[#5D3025]/50 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          <TechPill tech={project.techStack} framework={project.framework} size="xs" />
        </div>

        <div className="flex items-center gap-1">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="GitHub Repository"
              className="p-1.5 rounded-md text-[#BD6547] hover:text-[#EB7340] hover:bg-[#140805] transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            title="Inspect project drawer"
            className="p-1.5 rounded-md text-[#BD6547] hover:text-[#EB7340] hover:bg-[#140805] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};