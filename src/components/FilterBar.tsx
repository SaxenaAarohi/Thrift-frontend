import React from 'react';
import { FilterType } from '../types';

interface FilterBarProps {
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
}

export const FilterBar = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2 flex-shrink-0">
            Filter By:
          </span>
          {Object.values(FilterType).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                activeFilter === filter
                  ? 'bg-pop-pink text-white shadow-lg shadow-pop-pink/30 scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-pop-pink hover:text-pop-pink'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};