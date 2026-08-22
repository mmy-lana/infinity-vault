import React from 'react';
import { ProjectStatus } from '@/types/project';
import { cn, getStatusTheme } from '@/lib/utils';

interface StatusDotProps {
  status: ProjectStatus;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeConfig = {
  sm: { dot: 'w-1.5 h-1.5', ping: 'w-1.5 h-1.5', text: 'text-[10px]' },
  md: { dot: 'w-2 h-2', ping: 'w-2 h-2', text: 'text-xs' },
  lg: { dot: 'w-2.5 h-2.5', ping: 'w-2.5 h-2.5', text: 'text-sm' },
};

export const StatusDot: React.FC<StatusDotProps> = ({
  status,
  showLabel = false,
  size = 'md',
  className,
}) => {
  const theme = getStatusTheme(status);
  const sizes = sizeConfig[size];

  return (
    <span className={cn('inline-flex items-center gap-1.5 font-mono select-none', className)}>
      <span className="relative flex items-center justify-center">
        {status === 'Completed' && (
          <span
            className={cn(
              'absolute inline-flex rounded-full bg-[#EB7340] opacity-75 animate-ping',
              sizes.ping
            )}
          />
        )}
        {status === 'In Progress' && (
          <span
            className={cn(
              'absolute inline-flex rounded-full bg-[#DF865C] opacity-60 animate-pulse',
              sizes.ping
            )}
          />
        )}
        <span
          className={cn(
            'relative inline-flex rounded-full',
            sizes.dot,
            status === 'Completed' && 'bg-[#EB7340] shadow-[0_0_8px_#EB7340]',
            status === 'In Progress' && 'bg-[#DF865C] shadow-[0_0_6px_#DF865C]',
            status === 'Not started' && 'bg-[#5D3025]'
          )}
        />
      </span>
      {showLabel && (
        <span className={cn('font-medium tracking-wide uppercase', sizes.text, theme.color)}>
          {theme.label}
        </span>
      )}
    </span>
  );
};