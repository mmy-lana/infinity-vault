'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, Layers, Tag, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProjectItem } from '@/types/project';
import { StatusDot } from '@/components/atoms/StatusDot';
import { TechPill } from '@/components/atoms/TechPill';
import { Badge } from '@/components/atoms/Badge';
import { CopyButton } from '@/components/atoms/CopyButton';
import { Button } from '@/components/atoms/Button';
import { getCategoryBadge } from '@/lib/utils';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  // Body Scroll Lock while modal is open
  React.useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  const catBadge = getCategoryBadge(project.category);
  const formattedIndex = project.index.toString().padStart(2, '0');

  const triggerCelebration = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#EB7340', '#DF865C', '#C04D2D', '#914B35'],
    });
  };

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#140805]/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl max-h-[90vh] rounded-2xl bg-[#2F1A17] border border-[#5D3025] shadow-2xl overflow-hidden z-10 flex flex-col font-mono"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#5D3025]/80 bg-[#140805]/90">
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-bold text-[#EB7340]">#{formattedIndex}</span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-md border ${catBadge.bg} ${catBadge.border} ${catBadge.text}`}
              >
                {project.category}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <StatusDot status={project.status} showLabel size="sm" />
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-md text-[#BD6547] hover:text-[#EB7340] hover:bg-[#2F1A17] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div
            data-lenis-prevent
            className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto overscroll-contain"
          >
            {/* Title & Description */}
            <div>
              <h3 className="text-xl font-bold text-[#DF865C] leading-snug">
                {project.title}
              </h3>
              <p className="text-sm text-[#BD6547] mt-2 leading-relaxed font-sans">
                {project.description}
              </p>
            </div>

            {/* UI Theme & Aesthetic Profile */}
            <div className="p-4 rounded-xl bg-[#140805]/70 border border-[#5D3025]/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#EB7340]">
                <Layers className="w-4 h-4" />
                <span>UI Theme & Aesthetic</span>
              </div>
              <p className="text-xs text-[#DF865C] font-sans leading-relaxed">
                {project.aesthetic}
              </p>
            </div>

            {/* Tech Stack & Framework */}
            <div className="space-y-2">
              <span className="text-xs text-[#BD6547] uppercase tracking-wider font-semibold">
                Technology Specifications
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                <TechPill tech={project.techStack} framework={project.framework} size="md" />
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-[#BD6547] uppercase tracking-wider font-semibold">
                <Tag className="w-3.5 h-3.5 text-[#EB7340]" />
                <span>Tags</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag, idx) => (
                  <Badge key={idx} variant="dark" size="xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Clone Repository Snippet */}
            {project.githubUrl && (
              <div className="p-3.5 rounded-xl bg-[#140805] border border-[#5D3025] flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 truncate text-xs text-[#DF865C]">
                  <span className="text-[#BD6547] select-none">$</span>
                  <span className="truncate">git clone {project.githubUrl}.git</span>
                </div>
                <CopyButton textToCopy={`git clone ${project.githubUrl}.git`} className="shrink-0" />
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between p-4 px-6 border-t border-[#5D3025]/80 bg-[#140805]/95">
            {project.status === 'Completed' ? (
              <button
                type="button"
                onClick={triggerCelebration}
                className="inline-flex items-center gap-1.5 text-xs text-[#EB7340] hover:text-[#DF865C] transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Celebrate Completion</span>
              </button>
            ) : (
              <span className="text-xs text-[#BD6547] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Planned in Development Roadmap
              </span>
            )}

            <div className="flex items-center gap-2">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#EB7340] text-[#140805] font-bold text-xs hover:bg-[#DF865C] transition-colors shadow-[0_0_15px_rgba(235,115,64,0.3)]"
                >
                  <span>Open GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <Button variant="timber" size="sm" onClick={onClose}>
                  Close Drawer
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};