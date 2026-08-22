'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Play,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
} from 'lucide-react';
import { FlagshipItem } from '@/types/project';
import { Button } from '@/components/atoms/Button';
import { CopyButton } from '@/components/atoms/CopyButton';
import { Badge } from '@/components/atoms/Badge';

interface FlagshipTerminalCardProps {
  flagship: FlagshipItem;
}

interface LogEntry {
  id: string;
  time: string;
  type: 'info' | 'warn' | 'success' | 'alert';
  message: string;
}

const getInitialLogs = (type: 'fetch' | 'leak'): LogEntry[] => {
  if (type === 'fetch') {
    return [
      { id: '1', time: '12:00:00', type: 'info', message: '[@fetch-doctor/core] Initialized with SOLID pipeline' },
      { id: '2', time: '12:00:01', type: 'info', message: 'WeakMap request registry attached. Monitoring active hooks...' },
    ];
  }
  return [
    { id: '1', time: '12:00:00', type: 'info', message: '[@leak-doctor/core] Heap diagnostic registry initialized' },
    { id: '2', time: '12:00:01', type: 'info', message: 'WeakRef & FinalizationRegistry active. Listening to DOM lifecycles...' },
  ];
};

export const FlagshipTerminalCard: React.FC<FlagshipTerminalCardProps> = ({ flagship }) => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'arch'>('terminal');
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>(() => getInitialLogs(flagship.interactiveType));
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    const now = () => new Date().toISOString().substring(11, 19);

    if (flagship.interactiveType === 'fetch') {
      const step1: LogEntry = {
        id: Math.random().toString(),
        time: now(),
        type: 'info',
        message: 'Dispatched [GET /api/v2/stream-payload] (Req #108)...',
      };
      setLogs((prev) => [...prev, step1]);

      setTimeout(() => {
        const step2: LogEntry = {
          id: Math.random().toString(),
          time: now(),
          type: 'warn',
          message: 'Component unmounted while Req #108 in-flight. Zombie fetch detected!',
        };
        setLogs((prev) => [...prev, step2]);
      }, 500);

      setTimeout(() => {
        const step3: LogEntry = {
          id: Math.random().toString(),
          time: now(),
          type: 'alert',
          message: 'Triggered AbortSignal.cancel() - Orphan HTTP socket cleanly terminated in 12ms',
        };
        const step4: LogEntry = {
          id: Math.random().toString(),
          time: now(),
          type: 'success',
          message: 'CDP Audit Score: 100/100. 0 lingering network listeners.',
        };
        setLogs((prev) => [...prev, step3, step4]);
        setIsRunning(false);
      }, 1100);
    } else {
      const step1: LogEntry = {
        id: Math.random().toString(),
        time: now(),
        type: 'info',
        message: 'Simulating component unmount with 14 detached <div> nodes & 3 event listeners...',
      };
      setLogs((prev) => [...prev, step1]);

      setTimeout(() => {
        const step2: LogEntry = {
          id: Math.random().toString(),
          time: now(),
          type: 'warn',
          message: 'Heap retainer alert: Window.addEventListener("resize") retained via closure scope!',
        };
        setLogs((prev) => [...prev, step2]);
      }, 600);

      setTimeout(() => {
        const step3: LogEntry = {
          id: Math.random().toString(),
          time: now(),
          type: 'alert',
          message: 'FinalizationRegistry: Reclaimed 1.42MB heap. Detached DOM nodes dereferenced.',
        };
        const step4: LogEntry = {
          id: Math.random().toString(),
          time: now(),
          type: 'success',
          message: 'Audit passed: Zero memory leak detected in unmounted subtree.',
        };
        setLogs((prev) => [...prev, step3, step4]);
        setIsRunning(false);
      }, 1200);
    }
  };

  const clearLogs = () => {
    setLogs(getInitialLogs(flagship.interactiveType));
  };

  const installCommand = `pnpm add ${flagship.npmScope}/core ${flagship.npmScope}/react`;

  return (
    <div className="relative flex flex-col rounded-2xl bg-[#2F1A17]/80 border border-[#5D3025] hover:border-[#914B35] transition-all duration-300 backdrop-blur-md overflow-hidden shadow-2xl group">
      {/* Top Banner Accent Line */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${flagship.accentColor}, transparent)`,
        }}
      />

      {/* Header */}
      <div className="p-6 pb-4 border-b border-[#5D3025]/60 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div
              className="p-2 rounded-lg border text-[#DF865C]"
              style={{
                backgroundColor: `${flagship.accentColor}15`,
                borderColor: `${flagship.accentColor}40`,
              }}
            >
              {flagship.interactiveType === 'fetch' ? (
                <Zap className="w-5 h-5" style={{ color: flagship.accentColor }} />
              ) : (
                <Activity className="w-5 h-5" style={{ color: flagship.accentColor }} />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-mono text-[#DF865C] tracking-tight">
                  {flagship.name}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#140805] text-[#BD6547] border border-[#5D3025]">
                  v1.0.0
                </span>
              </div>
              <p className="text-xs font-mono text-[#BD6547] mt-0.5">
                {flagship.badgeText}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={flagship.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#140805] border border-[#5D3025] hover:border-[#EB7340] text-xs font-mono text-[#DF865C] transition-colors"
            >
              <span>Source</span>
              <ExternalLink className="w-3 h-3 text-[#BD6547]" />
            </a>
          </div>
        </div>

        <p className="text-xs leading-relaxed text-[#DF865C]/80 font-sans">
          {flagship.description}
        </p>

        {/* Install Command Snippet */}
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#140805]/90 border border-[#5D3025]/80 font-mono text-xs text-[#DF865C]">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[#BD6547] select-none">$</span>
            <span className="truncate text-[#DF865C]/90">{installCommand}</span>
          </div>
          <CopyButton textToCopy={installCommand} className="shrink-0 ml-2" />
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {flagship.highlights.map((highlight, idx) => (
            <Badge key={idx} variant="amber" size="xs">
              <ShieldCheck className="w-3 h-3 text-[#EB7340] shrink-0" />
              {highlight}
            </Badge>
          ))}
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="flex items-center justify-between px-6 pt-3 border-b border-[#5D3025]/40 bg-[#140805]/40">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-1.5 pb-2.5 text-xs font-mono border-b-2 transition-all cursor-pointer ${
              activeTab === 'terminal'
                ? 'border-[#EB7340] text-[#DF865C] font-semibold'
                : 'border-transparent text-[#BD6547] hover:text-[#DF865C]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('arch')}
            className={`flex items-center gap-1.5 pb-2.5 text-xs font-mono border-b-2 transition-all cursor-pointer ${
              activeTab === 'arch'
                ? 'border-[#EB7340] text-[#DF865C] font-semibold'
                : 'border-transparent text-[#BD6547] hover:text-[#DF865C]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Architecture Breakdown</span>
          </button>
        </div>

        {activeTab === 'terminal' && (
          <div className="flex items-center gap-1.5 pb-2">
            <button
              type="button"
              onClick={clearLogs}
              title="Reset terminal"
              className="p-1 rounded text-[#BD6547] hover:text-[#DF865C] hover:bg-[#2F1A17] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Tab Body */}
      <div className="p-6 pt-4 flex-1 flex flex-col min-h-[220px] bg-[#140805]/70 font-mono">
        <AnimatePresence mode="wait">
          {activeTab === 'terminal' ? (
            <motion.div
              key="terminal-tab"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="flex-1 flex flex-col justify-between gap-3"
            >
              <div
                ref={logContainerRef}
                className="h-36 overflow-y-auto space-y-1.5 pr-2 font-mono text-xs scrollbar-thin"
              >
                {logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-[#BD6547]/60 text-[10px] select-none shrink-0 pt-0.5">
                      {log.time}
                    </span>
                    <span
                      className={`break-all ${
                        log.type === 'success'
                          ? 'text-[#EB7340] font-semibold'
                          : log.type === 'alert'
                          ? 'text-[#DF865C]'
                          : log.type === 'warn'
                          ? 'text-amber-400'
                          : 'text-[#BD6547]'
                      }`}
                    >
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#5D3025]/40 flex items-center justify-between gap-3">
                <span className="text-[11px] text-[#BD6547] font-mono">
                  Simulation engine ready
                </span>
                <Button
                  variant="flame"
                  size="sm"
                  onClick={runSimulation}
                  isLoading={isRunning}
                  icon={<Play className="w-3.5 h-3.5 fill-current" />}
                >
                  {isRunning ? 'Analyzing...' : 'Run Audit Trace'}
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="arch-tab"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="space-y-3 font-mono text-xs"
            >
              {flagship.architecturePoints.map((point, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#2F1A17]/60 border border-[#5D3025]/60 flex items-start gap-2.5"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#EB7340] mt-1.5 shrink-0" />
                  <p className="text-[#DF865C] leading-relaxed">{point}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};