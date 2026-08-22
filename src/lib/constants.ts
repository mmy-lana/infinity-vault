import { ProjectCategory, TechStackFamily, ProjectStatus } from '@/types/project';

export const MUGEN_COLORS = {
  abyssalVoid: '#140805',
  darkMahogany: '#2F1A17',
  timberFrame: '#5D3025',
  warmCedar: '#914B35',
  deepCrimson: '#8C341C',
  volumetricShadow: '#5F1906',
  lanternCrimson: '#C04D2D',
  terracotta: '#BD6547',
  shojiAmber: '#EB7340',
  goldenGlow: '#DF865C',
} as const;

export const CATEGORIES: ProjectCategory[] = [
  'All',
  'Developer Tooling',
  'Fullstack Application',
  'Interactive UI / Creative',
  'Utility & System',
];

export const FRAMEWORKS: TechStackFamily[] = [
  'All',
  'React',
  'Next.js',
  'Vue 3',
  'Svelte',
  'Angular',
];

export const STATUS_FILTERS: ('All' | ProjectStatus)[] = [
  'All',
  'Completed',
  'In Progress',
  'Not started',
];

export const EXTERNAL_LINKS = {
  hub: 'https://mmylana.my.id',
  portfolioSubdomain: 'https://portfolio.mmylana.my.id',
  githubProfile: 'https://github.com/mmy-lana',
  fetchDoctor: 'https://github.com/mmy-lana/fetch-doctor',
  leakDoctor: 'https://github.com/mmy-lana/leak-doctor',
} as const;