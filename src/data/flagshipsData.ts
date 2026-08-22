import { FlagshipItem } from '@/types/project';

export const FLAGSHIPS: FlagshipItem[] = [
  {
    id: 'fetch-doctor',
    name: 'fetch-doctor',
    tagline: 'Zero-dependency, SOLID HTTP request profiler, zombie fetch detector & AbortSignal monitor',
    description:
      'Autonomous network profiling engine for React and headless runtimes. Monitors in-flight HTTP requests, catches zombie fetches, audits AbortController signal lifecycles, and executes automated CDP network audits without external runtime baggage.',
    githubUrl: 'https://github.com/mmy-lana/fetch-doctor',
    npmScope: '@fetch-doctor',
    packages: ['@fetch-doctor/core', '@fetch-doctor/react', '@fetch-doctor/shared'],
    highlights: [
      'Zero Runtime Dependencies',
      'Zombie Request Auto-Abort',
      'Puppeteer CDP Network Audit',
      'Strict SOLID Architecture',
    ],
    architecturePoints: [
      'Interceptor Pipeline: WeakMap-anchored request state mapping',
      'Signal Lifecycle: AbortSignal listener auto-cleanup verification',
      'Headless Inspector: Chrome DevTools Protocol request payload audits',
    ],
    interactiveType: 'fetch',
    accentColor: '#EB7340',
    badgeText: 'NETWORK ARCHITECTURE PROFILER',
  },
  {
    id: 'leak-doctor',
    name: 'leak-doctor',
    tagline: 'Zero-dependency, SOLID frontend memory leak diagnostic engine & WeakRef heap auditor',
    description:
      'Proactive runtime memory leak detection engine. Harnesses WeakRef and FinalizationRegistry to audit detached DOM trees, dangling EventListeners, uncollected closures, and Shadow DOM component boundaries with instant Puppeteer CDP heap assertions.',
    githubUrl: 'https://github.com/mmy-lana/leak-doctor',
    npmScope: '@leak-doctor',
    packages: ['@leak-doctor/core', '@leak-doctor/react', '@leak-doctor/shared'],
    highlights: [
      'WeakRef & FinalizationRegistry',
      'Shadow DOM Leak Isolation',
      'CDP Heap Snapshot Diagnostics',
      'Lifecycle Listener Tracker',
    ],
    architecturePoints: [
      'Registry Auditor: Native GC finalization hooks for unmounted component trees',
      'DOM Retainer Graph: Detached DOM node tree traversal',
      'Automated CDP Heap Profiler: Headless browser heap allocation difference assertions',
    ],
    interactiveType: 'leak',
    accentColor: '#C04D2D',
    badgeText: 'MEMORY FORENSIC DIAGNOSTICS',
  },
];