'use client';

import React from 'react';
import { ProjectCategory, TechStackFamily, ProjectStatus } from '@/types/project';
import { CATEGORIES, FRAMEWORKS, STATUS_FILTERS } from '@/lib/constants';
import { SearchInput } from '@/components/atoms/SearchInput';
import { SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedCategory: ProjectCategory;
  onCategoryChange: (cat: ProjectCategory) => void;
  selectedFramework: TechStackFamily;
  onFrameworkChange: (fw: TechStackFamily) => void;
  selectedStatus: 'All' | ProjectStatus;
  onStatusChange: (st: 'All' | ProjectStatus) => void;
  totalFiltered: number;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedFramework,
  onFrameworkChange,
  selectedStatus,
  onStatusChange,
  totalFiltered,
  totalCount,
}) => {
  return (
    <div className="w-full space-y-4">
      {/* Top Search & Filter Count Line */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:max-w-md">
          <SearchInput
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search projects by name, stack, or aesthetic..."
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto font-mono text-xs text-[#BD6547]">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#EB7340]" />
          <span>
            Showing <strong className="text-[#EB7340]">{totalFiltered}</strong> of {totalCount} Projects
          </span>
        </div>
      </div>

      {/* Category Pills Switchboard */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none font-mono">
        <span className="text-[11px] text-[#BD6547] pr-1 select-none shrink-0 uppercase tracking-wider">
          Category:
        </span>
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={cn(
                'px-3 py-1 text-xs rounded-lg border transition-all duration-150 shrink-0 cursor-pointer select-none',
                isActive
                  ? 'bg-[#EB7340] border-[#EB7340] text-[#140805] font-bold shadow-[0_0_12px_rgba(235,115,64,0.35)]'
                  : 'bg-[#2F1A17]/80 border-[#5D3025] text-[#DF865C] hover:border-[#914B35] hover:text-[#EB7340]'
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Framework & Status Sub-filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-1 border-t border-[#5D3025]/40 font-mono">
        {/* Framework Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] text-[#BD6547] pr-1 select-none shrink-0 uppercase">
            Framework:
          </span>
          {FRAMEWORKS.map((fw) => {
            const isActive = selectedFramework === fw;
            return (
              <button
                key={fw}
                type="button"
                onClick={() => onFrameworkChange(fw)}
                className={cn(
                  'px-2.5 py-0.5 text-[11px] rounded-md border transition-all duration-150 shrink-0 cursor-pointer select-none',
                  isActive
                    ? 'bg-[#DF865C] border-[#DF865C] text-[#140805] font-semibold'
                    : 'bg-[#140805]/70 border-[#5D3025]/60 text-[#BD6547] hover:border-[#914B35] hover:text-[#DF865C]'
                )}
              >
                {fw}
              </button>
            );
          })}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-[#BD6547] pr-1 select-none shrink-0 uppercase">
            Status:
          </span>
          {STATUS_FILTERS.map((st) => {
            const isActive = selectedStatus === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => onStatusChange(st)}
                className={cn(
                  'px-2.5 py-0.5 text-[11px] rounded-md border transition-all duration-150 shrink-0 cursor-pointer select-none',
                  isActive
                    ? 'bg-[#C04D2D] border-[#C04D2D] text-white font-semibold'
                    : 'bg-[#140805]/70 border-[#5D3025]/60 text-[#BD6547] hover:border-[#914B35] hover:text-[#DF865C]'
                )}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};