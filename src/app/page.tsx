'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Code2, Compass, Layers } from 'lucide-react';
import { PROJECTS_DATA } from '@/data/projectsData';
import { ProjectItem, ProjectCategory, TechStackFamily, ProjectStatus } from '@/types/project';
import { AmbientCastleScene } from '@/components/canvas/AmbientCastleScene';
import { SpatialHUD } from '@/components/dom/SpatialHUD';
import { FlagshipSanctuarySection } from '@/components/organisms/FlagshipSanctuarySection';
import { FilterBar } from '@/components/molecules/FilterBar';
import { BentoProjectCard } from '@/components/molecules/BentoProjectCard';
import { CommandPalette } from '@/components/organisms/CommandPalette';
import { ProjectDetailModal } from '@/components/organisms/ProjectDetailModal';
import { Button } from '@/components/atoms/Button';
import { EXTERNAL_LINKS } from '@/lib/constants';
import { Logo } from '@/components/atoms/Logo';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [selectedFramework, setSelectedFramework] = useState<TechStackFamily>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | ProjectStatus>('All');

  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // Global ⌘K and Escape Shortcut Listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandOpen(false);
        setActiveProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered 90-Project Stream
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((p) => {
      const matchSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.techStack.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.aesthetic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchCategory =
        selectedCategory === 'All' || p.category === selectedCategory;

      const matchFramework =
        selectedFramework === 'All' || p.framework === selectedFramework;

      const matchStatus =
        selectedStatus === 'All' || p.status === selectedStatus;

      return matchSearch && matchCategory && matchFramework && matchStatus;
    });
  }, [searchQuery, selectedCategory, selectedFramework, selectedStatus]);

  const completedCount = useMemo(
    () => PROJECTS_DATA.filter((p) => p.status === 'Completed').length,
    []
  );

  return (
    <main className="relative min-h-screen w-full bg-[#140805] text-[#DF865C] overflow-hidden selection:bg-[#C04D2D] selection:text-white">
      {/* 3D WebGL Mugen Castle Canvas */}
      <AmbientCastleScene />

      {/* Spatial HUD Overlay */}
      <SpatialHUD
        onOpenCommandPalette={() => setIsCommandOpen(true)}
        completedCount={completedCount}
        totalCount={PROJECTS_DATA.length}
      />

      {/* Hero Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2F1A17]/80 border border-[#5D3025] text-xs font-mono text-[#EB7340] mb-6 shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>MMYLANA ARCHITECTURAL VAULT // 無限城</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-7xl font-extrabold font-mono text-[#DF865C] tracking-tight max-w-4xl px-2 break-words"
        >
          Infinity Stream of Frontend Craftsmanship
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-sm sm:text-base md:text-lg text-[#BD6547] max-w-2xl font-sans leading-relaxed px-4"
        >
          An inertia-driven catalog containing 110+ crafted web applications, devtools, and fullstack platforms alongside zero-dependency diagnostic flagship engines.
        </motion.p>

        {/* Hero CTA Action Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md sm:max-w-none px-4"
        >
          <Button
            variant="flame"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => {
              document.getElementById('bento-stream')?.scrollIntoView({ behavior: 'smooth' });
            }}
            icon={<Compass className="w-4 h-4 fill-current" />}
          >
            Explore 110+ Project Bento
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => setIsCommandOpen(true)}
            icon={<Terminal className="w-4 h-4" />}
          >
            Command Palette (⌘K)
          </Button>
        </motion.div>

        {/* Global Metric Counter Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl font-mono"
        >
          <div className="p-4 rounded-xl bg-[#2F1A17]/60 border border-[#5D3025] text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#EB7340]">{PROJECTS_DATA.length}</span>
            <p className="text-xs text-[#BD6547] mt-1">Curated Projects</p>
          </div>
          <div className="p-4 rounded-xl bg-[#2F1A17]/60 border border-[#5D3025] text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#DF865C]">{completedCount}</span>
            <p className="text-xs text-[#BD6547] mt-1">Completed Systems</p>
          </div>
          <div className="p-4 rounded-xl bg-[#2F1A17]/60 border border-[#5D3025] text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#C04D2D]">2</span>
            <p className="text-xs text-[#BD6547] mt-1">Diagnostic Flagships</p>
          </div>
          <div className="p-4 rounded-xl bg-[#2F1A17]/60 border border-[#5D3025] text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#EB7340]">5</span>
            <p className="text-xs text-[#BD6547] mt-1">Framework Stacks</p>
          </div>
        </motion.div>
      </section>

      {/* Flagship Sanctuary Section */}
      <FlagshipSanctuarySection />

      {/* 90-Project Bento Stream Section */}
      <section
        id="bento-stream"
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24"
      >
        {/* Stream Heading */}
        <div className="flex flex-col mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#EB7340] mb-2">
            <Layers className="w-4 h-4" />
            <span>無限格納庫 // CONTINUOUS BENTO STREAM</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-mono text-[#DF865C]">
            Interactive Project Catalog
          </h2>
          <p className="text-sm text-[#BD6547] font-sans mt-1">
            Filter through utilities, developer tooling, fullstack applications, and interactive experiences.
          </p>
        </div>

        {/* Filter Switchboard */}
        <div className="p-5 rounded-2xl bg-[#2F1A17]/90 border border-[#5D3025] backdrop-blur-md mb-8 shadow-xl">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedFramework={selectedFramework}
            onFrameworkChange={setSelectedFramework}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            totalFiltered={filteredProjects.length}
            totalCount={PROJECTS_DATA.length}
          />
        </div>

        {/* Responsive Bento Grid Stream */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <BentoProjectCard
                key={project.id}
                project={project}
                onSelect={(p) => setActiveProject(p)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-[#2F1A17]/40 border border-[#5D3025]/50 font-mono">
            <p className="text-base text-[#DF865C] font-bold">No projects matched your criteria</p>
            <p className="text-xs text-[#BD6547] mt-1">Try broadening your search keywords or resetting filters.</p>
            <Button
              variant="timber"
              size="sm"
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedFramework('All');
                setSelectedStatus('All');
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-[#5D3025]/60 bg-[#140805]/95 py-12 pb-24 lg:pb-12 px-4 sm:px-6 lg:px-8 font-mono text-xs text-[#BD6547]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2">
              <Logo className="w-5 h-5 rounded-md" />
              <span className="font-bold text-[#DF865C]">MMYLANA // 無限城</span>
            </div>
            <span className="hidden sm:inline text-[#5D3025]">|</span>
            <span>Mugen Bento Architecture System</span>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <a
              href={EXTERNAL_LINKS.hub}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DF865C] hover:text-[#EB7340] transition-colors"
            >
              mmylana.my.id
            </a>
            <a
              href={EXTERNAL_LINKS.githubProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#DF865C] hover:text-[#EB7340] transition-colors"
            >
              GitHub Core
            </a>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onSelectProject={(p) => setActiveProject(p)}
      />

      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </main>
  );
}