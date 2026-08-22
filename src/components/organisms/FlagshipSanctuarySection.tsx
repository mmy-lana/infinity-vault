'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles } from 'lucide-react';
import { FLAGSHIPS } from '@/data/flagshipsData';
import { FlagshipTerminalCard } from '@/components/molecules/FlagshipTerminalCard';

export const FlagshipSanctuarySection: React.FC = () => {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 z-10">
      {/* Sanctuary Heading */}
      <div className="flex flex-col items-center text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2F1A17] border border-[#5D3025] text-xs font-mono text-[#EB7340] mb-3"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>無限中枢 // CORE ARCHITECTURAL ENGINE</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-2xl sm:text-4xl font-extrabold font-mono text-[#DF865C] tracking-tight"
        >
          Flagship Diagnostic Suites
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-2 text-sm sm:text-base text-[#BD6547] max-w-2xl font-sans"
        >
          Zero-dependency, SOLID-compliant frontend diagnostic runtimes engineered for automated network leak interception and heap memory forensics.
        </motion.p>
      </div>

      {/* Dual Flagship Terminal Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {FLAGSHIPS.map((flagship, idx) => (
          <motion.div
            key={flagship.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.15 }}
          >
            <FlagshipTerminalCard flagship={flagship} />
          </motion.div>
        ))}
      </div>

      {/* Architectural Guarantee Pill */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#140805]/80 border border-[#5D3025] text-xs font-mono text-[#BD6547]">
          <Shield className="w-4 h-4 text-[#EB7340]" />
          <span>
            Production Verified: Zero external runtime baggage, tree-shakeable ES modules, 100% test coverage.
          </span>
        </div>
      </div>
    </section>
  );
};