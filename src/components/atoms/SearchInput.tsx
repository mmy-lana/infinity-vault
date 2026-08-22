'use client';

import React, { useRef } from 'react';
import { Search, X, Command } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  value: string;
  onChange: (val: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search by keyword, tech, aesthetic, or tags...',
  className,
  autoFocus = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    if (onClear) onClear();
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        'relative flex items-center w-full rounded-lg bg-[#140805]/90 border border-[#5D3025] focus-within:border-[#EB7340] focus-within:shadow-[0_0_15px_rgba(235,115,64,0.2)] transition-all duration-200',
        className
      )}
    >
      <div className="flex items-center pl-3.5 pointer-events-none text-[#BD6547]">
        <Search className="w-4 h-4" />
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full bg-transparent py-2.5 pl-2.5 pr-14 text-sm text-[#DF865C] placeholder-[#BD6547]/50 font-mono outline-hidden"
      />

      <div className="absolute right-3 flex items-center gap-1.5">
        {value ? (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-[#BD6547] hover:text-[#EB7340] transition-colors rounded cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#2F1A17] border border-[#5D3025] text-[10px] font-mono text-[#BD6547] pointer-events-none">
            <Command className="w-2.5 h-2.5" />
            <span>K</span>
          </div>
        )}
      </div>
    </div>
  );
};