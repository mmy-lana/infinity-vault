'use client';

import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  copiedLabel?: string;
  variant?: 'minimal' | 'button';
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  label,
  copiedLabel = 'Copied!',
  variant = 'minimal',
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className={cn(
          'inline-flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-xs transition-all duration-200 border cursor-pointer select-none',
          copied
            ? 'bg-[#EB7340]/20 border-[#EB7340] text-[#EB7340] shadow-[0_0_10px_rgba(235,115,64,0.2)]'
            : 'bg-[#2F1A17] border-[#5D3025] text-[#DF865C] hover:border-[#914B35]',
          className
        )}
      >
        {copied ? <Check className="w-3.5 h-3.5 text-[#EB7340]" /> : <Copy className="w-3.5 h-3.5" />}
        <span>{copied ? copiedLabel : label || 'Copy'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={copied ? 'Copied!' : 'Copy to clipboard'}
      aria-label="Copy to clipboard"
      className={cn(
        'p-1.5 rounded-md border transition-all duration-150 cursor-pointer',
        copied
          ? 'bg-[#EB7340]/20 border-[#EB7340] text-[#EB7340]'
          : 'bg-[#2F1A17]/80 border-[#5D3025]/60 text-[#BD6547] hover:text-[#DF865C] hover:border-[#914B35]',
        className
      )}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
};