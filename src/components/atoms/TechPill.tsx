import React from 'react';
import { TechStackFamily } from '@/types/project';
import { cn, getFrameworkBadge } from '@/lib/utils';

interface TechPillProps {
  tech: string;
  framework?: TechStackFamily;
  size?: 'xs' | 'sm' | 'md';
  className?: string;
}

const sizeConfig = {
  xs: 'text-[9px] px-1.5 py-0.5',
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
};

export const TechPill: React.FC<TechPillProps> = ({
  tech,
  framework,
  size = 'sm',
  className,
}) => {
  const frameworkStyle = framework ? getFrameworkBadge(framework).badgeColor : '';

  return (
    <span
      className={cn(
        'inline-flex items-center font-mono rounded-md font-medium border transition-colors select-none',
        sizeConfig[size],
        frameworkStyle
          ? frameworkStyle
          : 'bg-[#2F1A17]/80 text-[#DF865C] border-[#5D3025]/60 hover:border-[#914B35]',
        className
      )}
    >
      {tech}
    </span>
  );
};