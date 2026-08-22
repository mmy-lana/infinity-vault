import React from 'react';
import { cn } from '@/lib/utils';

export type BadgeVariant =
  | 'timber'
  | 'amber'
  | 'crimson'
  | 'muted'
  | 'outline'
  | 'dark';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'xs' | 'sm' | 'md';
  icon?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  timber: 'bg-[#2F1A17] border-[#5D3025] text-[#DF865C] hover:border-[#914B35]',
  amber: 'bg-[#EB7340]/15 border-[#EB7340]/40 text-[#EB7340] shadow-[0_0_10px_rgba(235,115,64,0.15)]',
  crimson: 'bg-[#8C341C]/20 border-[#C04D2D]/40 text-[#DF865C]',
  muted: 'bg-[#140805] border-[#5D3025]/50 text-[#BD6547]',
  outline: 'bg-transparent border-[#914B35]/50 text-[#DF865C]',
  dark: 'bg-[#140805]/80 border-[#2F1A17] text-[#BD6547]',
};

const sizeStyles = {
  xs: 'text-[9px] px-1.5 py-0.5 tracking-wider gap-1',
  sm: 'text-[11px] px-2 py-0.5 tracking-wide gap-1.5',
  md: 'text-xs px-2.5 py-1 tracking-normal gap-2',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'timber',
  size = 'sm',
  icon,
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-mono rounded-md border font-medium transition-all duration-200 backdrop-blur-xs',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0 flex items-center justify-center">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};