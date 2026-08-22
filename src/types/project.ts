export type ProjectCategory =
  | 'All'
  | 'Developer Tooling'
  | 'Fullstack Application'
  | 'Interactive UI / Creative'
  | 'Utility & System';

export type ProjectStatus = 'Completed' | 'In Progress' | 'Not started';

export type TechStackFamily =
  | 'All'
  | 'React'
  | 'Next.js'
  | 'Vue 3'
  | 'Svelte'
  | 'Angular';

export interface ProjectItem {
  id: string;
  index: number;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  techStack: string;
  framework: Exclude<TechStackFamily, 'All'>;
  aesthetic: string;
  status: ProjectStatus;
  githubUrl: string;
  liveUrl?: string;
  description: string;
  tags: string[];
  featured?: boolean;
}

export interface FlagshipItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  githubUrl: string;
  npmScope: string;
  packages: string[];
  highlights: string[];
  architecturePoints: string[];
  interactiveType: 'fetch' | 'leak';
  accentColor: string;
  badgeText: string;
}

export interface FilterState {
  searchQuery: string;
  selectedCategory: ProjectCategory;
  selectedFramework: TechStackFamily;
  selectedStatus: 'All' | ProjectStatus;
}

export interface MetricSummary {
  totalProjects: number;
  completedProjects: number;
  inProgressProjects: number;
  plannedProjects: number;
  flagshipCount: number;
}