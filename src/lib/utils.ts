import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ProjectCategory, ProjectStatus, TechStackFamily } from '@/types/project';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getStatusTheme(status: ProjectStatus): {
  color: string;
  bgColor: string;
  borderColor: string;
  label: string;
  glow: string;
} {
  switch (status) {
    case 'Completed':
      return {
        color: 'text-[#EB7340]',
        bgColor: 'bg-[#EB7340]/15',
        borderColor: 'border-[#EB7340]/40',
        label: 'Completed',
        glow: 'shadow-[0_0_12px_rgba(235,115,64,0.4)]',
      };
    case 'In Progress':
      return {
        color: 'text-[#DF865C]',
        bgColor: 'bg-[#DF865C]/15',
        borderColor: 'border-[#DF865C]/40',
        label: 'In Progress',
        glow: 'shadow-[0_0_12px_rgba(223,134,92,0.4)]',
      };
    case 'Not started':
    default:
      return {
        color: 'text-[#BD6547]/80',
        bgColor: 'bg-[#5D3025]/20',
        borderColor: 'border-[#5D3025]/40',
        label: 'Planned',
        glow: 'shadow-none',
      };
  }
}

export function getCategoryBadge(category: ProjectCategory): {
  bg: string;
  border: string;
  text: string;
} {
  switch (category) {
    case 'Developer Tooling':
      return {
        bg: 'bg-[#8C341C]/20',
        border: 'border-[#C04D2D]/30',
        text: 'text-[#EB7340]',
      };
    case 'Fullstack Application':
      return {
        bg: 'bg-[#914B35]/25',
        border: 'border-[#DF865C]/30',
        text: 'text-[#DF865C]',
      };
    case 'Interactive UI / Creative':
      return {
        bg: 'bg-[#C04D2D]/20',
        border: 'border-[#EB7340]/30',
        text: 'text-[#EB7340]',
      };
    case 'Utility & System':
    default:
      return {
        bg: 'bg-[#5D3025]/30',
        border: 'border-[#914B35]/30',
        text: 'text-[#BD6547]',
      };
  }
}

export function getFrameworkBadge(framework: TechStackFamily): {
  badgeColor: string;
} {
  switch (framework) {
    case 'React':
      return { badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-950/30' };
    case 'Next.js':
      return { badgeColor: 'border-neutral-400/30 text-neutral-200 bg-neutral-900/40' };
    case 'Vue 3':
      return { badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/30' };
    case 'Svelte':
      return { badgeColor: 'border-orange-500/30 text-orange-400 bg-orange-950/30' };
    case 'Angular':
      return { badgeColor: 'border-rose-500/30 text-rose-400 bg-rose-950/30' };
    default:
      return { badgeColor: 'border-[#5D3025] text-[#BD6547] bg-[#2F1A17]' };
  }
}