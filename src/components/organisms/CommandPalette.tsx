'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, ExternalLink, Code2 } from 'lucide-react';
import { ProjectItem } from '@/types/project';
import { PROJECTS_DATA } from '@/data/projectsData';
import { FLAGSHIPS } from '@/data/flagshipsData';
import { EXTERNAL_LINKS } from '@/lib/constants';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Body Scroll Lock while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    const search = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(search) ||
      p.techStack.toLowerCase().includes(search) ||
      p.aesthetic.toLowerCase().includes(search) ||
      p.tags.some((t) => t.toLowerCase().includes(search))
    );
  }).slice(0, 8);

  const filteredFlagships = FLAGSHIPS.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase()) ||
    f.tagline.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent
        className="fixed inset-0 z-50 flex items-start sm:items-center justify-center pt-14 sm:pt-0 px-3 sm:px-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#140805]/85 backdrop-blur-md"
        />

        {/* Command Palette Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-2xl max-h-[85vh] rounded-2xl bg-[#2F1A17] border border-[#5D3025] shadow-2xl overflow-hidden z-10 flex flex-col font-mono"
        >
          {/* Search Header */}
          <div className="flex items-center px-3.5 sm:px-4 border-b border-[#5D3025]/80 bg-[#140805]/95">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#EB7340] shrink-0 mr-2 sm:mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search project, stack, or command..."
              className="w-full bg-transparent py-3.5 sm:py-4 text-xs sm:text-sm text-[#DF865C] placeholder-[#BD6547]/60 outline-hidden font-mono"
            />
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1 px-2 py-1 rounded bg-[#2F1A17] border border-[#5D3025] text-[10px] text-[#BD6547] shrink-0 select-none hover:text-[#EB7340]"
            >
              <span>ESC</span>
            </button>
          </div>

          {/* Results List */}
          <div
            data-lenis-prevent
            className="flex-1 max-h-[60vh] sm:max-h-[380px] overflow-y-auto p-2 space-y-4 overscroll-contain"
          >
            {/* Quick Portals */}
            {!query && (
              <div>
                <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-[#BD6547]/70 font-semibold">
                  Global Portals
                </div>
                <div className="space-y-1 mt-1">
                  <a
                    href={EXTERNAL_LINKS.hub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#140805]/50 hover:bg-[#140805] border border-transparent hover:border-[#5D3025] text-xs text-[#DF865C] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-3.5 h-3.5 text-[#EB7340]" />
                      <span>Return to Primary Hub (mmylana.my.id)</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#BD6547]" />
                  </a>
                  <a
                    href={EXTERNAL_LINKS.githubProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#140805]/50 hover:bg-[#140805] border border-transparent hover:border-[#5D3025] text-xs text-[#DF865C] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 text-[#DF865C]" />
                      <span>GitHub Core Profile (@mmy-lana)</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#BD6547]" />
                  </a>
                </div>
              </div>
            )}

            {/* Flagships */}
            {filteredFlagships.length > 0 && (
              <div>
                <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-[#EB7340] font-semibold">
                  Flagship Engines
                </div>
                <div className="space-y-1 mt-1">
                  {filteredFlagships.map((f) => (
                    <a
                      key={f.id}
                      href={f.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#140805]/80 hover:bg-[#140805] border border-[#5D3025]/60 hover:border-[#EB7340] text-xs text-[#DF865C] transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#EB7340]" />
                        <span className="font-bold text-[#EB7340]">{f.name}</span>
                        <span className="text-[11px] text-[#BD6547] truncate max-w-xs">{f.tagline}</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[#BD6547]" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {filteredProjects.length > 0 && (
              <div>
                <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-[#BD6547]/70 font-semibold">
                  Projects Vault ({filteredProjects.length})
                </div>
                <div className="space-y-1 mt-1">
                  {filteredProjects.map((p, index) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        onSelectProject(p);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                        index === selectedIndex
                          ? 'bg-[#140805] border border-[#EB7340] text-[#EB7340]'
                          : 'bg-[#140805]/50 hover:bg-[#140805] border border-transparent hover:border-[#5D3025] text-[#DF865C]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-[10px] text-[#BD6547] shrink-0 font-bold">
                          #{p.index.toString().padStart(2, '0')}
                        </span>
                        <span className="font-semibold truncate">{p.title}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#2F1A17] text-[#BD6547] shrink-0 border border-[#5D3025]/50">
                          {p.framework}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#BD6547] shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredProjects.length === 0 && filteredFlagships.length === 0 && (
              <div className="py-8 text-center text-xs text-[#BD6547]">
                No projects found matching &ldquo;{query}&rdquo;
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#140805] border-t border-[#5D3025]/80 text-[10px] text-[#BD6547]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Command className="w-3 h-3" /> Navigation Active
              </span>
            </div>
            <span>MMYLANA // 無限城 SYSTEM DOCK</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};