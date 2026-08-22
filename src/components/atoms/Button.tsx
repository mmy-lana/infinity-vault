'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'flame' | 'timber';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

const variantMap: Record<ButtonVariant, string> = {
  primary:
    'bg-[#EB7340] text-[#140805] font-semibold border border-[#EB7340] hover:bg-[#DF865C] shadow-[0_0_15px_rgba(235,115,64,0.3)]',
  flame:
    'bg-gradient-to-r from-[#C04D2D] to-[#EB7340] text-[#140805] font-bold border border-[#EB7340] shadow-[0_0_20px_rgba(235,115,64,0.4)] hover:shadow-[0_0_25px_rgba(235,115,64,0.6)]',
  secondary:
    'bg-[#2F1A17] text-[#DF865C] border border-[#5D3025] hover:border-[#914B35] hover:bg-[#5D3025]/30',
  timber:
    'bg-[#140805] text-[#BD6547] border border-[#5D3025] hover:text-[#DF865C] hover:border-[#914B35]',
  ghost:
    'bg-transparent text-[#BD6547] border border-transparent hover:text-[#DF865C] hover:bg-[#2F1A17]/50',
};

const sizeMap: Record<ButtonSize, string> = {
  sm: 'text-xs px-3 py-1.5 rounded-md gap-1.5',
  md: 'text-sm px-4 py-2 rounded-lg gap-2',
  lg: 'text-base px-6 py-3 rounded-lg gap-2.5',
  icon: 'p-2 rounded-lg aspect-square',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'secondary',
      size = 'md',
      isLoading = false,
      icon,
      iconPosition = 'left',
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        disabled={disabled || isLoading}
        className={cn(
          'relative inline-flex items-center justify-center font-mono cursor-pointer transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed select-none overflow-hidden',
          variantMap[variant],
          sizeMap[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className="shrink-0 flex items-center">{icon}</span>
            )}
            {children && <span>{children}</span>}
            {icon && iconPosition === 'right' && (
              <span className="shrink-0 flex items-center">{icon}</span>
            )}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';