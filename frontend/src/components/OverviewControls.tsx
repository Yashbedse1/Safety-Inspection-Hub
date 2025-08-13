'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FilterState, StatusFilter, CompletionFilter, SortOption } from '@/types/checklist.types';
import { debounce } from '@/lib/utils';

interface OverviewControlsProps {
  onFiltersChange: (filters: FilterState) => void;
}

export const OverviewControls = ({ onFiltersChange }: OverviewControlsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get('q') || '',
    status: (searchParams.get('status')?.split(',') as StatusFilter[]) || [],
    completion: (searchParams.get('completion') as CompletionFilter) || 'all',
    sort: (searchParams.get('sort') as SortOption) || 'lastUpdated',
  });

  // Debounced search function
  const debouncedSearch = debounce((searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  }, 300);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.search) params.set('q', filters.search);
    if (filters.status.length > 0) params.set('status', filters.status.join(','));
    if (filters.completion !== 'all') params.set('completion', filters.completion);
    if (filters.sort !== 'lastUpdated') params.set('sort', filters.sort);
    
    const newUrl = params.toString() ? `/?${params.toString()}` : '/';
    router.replace(newUrl, { scroll: false });
    
    onFiltersChange(filters);
  }, [filters, router, onFiltersChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleStatusChange = (status: StatusFilter) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }));
  };

  const handleCompletionChange = (completion: CompletionFilter) => {
    setFilters(prev => ({ ...prev, completion }));
  };

  const handleSortChange = (sort: SortOption) => {
    setFilters(prev => ({ ...prev, sort }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: [],
      completion: 'all',
      sort: 'lastUpdated',
    });
  };

  const hasActiveFilters = filters.search || filters.status.length > 0 || filters.completion !== 'all';

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="space-y-4">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Buildings
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by building name or address..."
            defaultValue={filters.search}
            onChange={handleSearchChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="space-y-2">
              {(['draft', 'in_progress', 'completed', 'requires_review'] as StatusFilter[]).map((status) => (
                <label key={status} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.status.includes(status)}
                    onChange={() => handleStatusChange(status)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {status === 'in_progress' ? 'In Progress' : 
                     status === 'requires_review' ? 'Requires Review' : 
                     status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Completion Filter */}
          <div>
            <label htmlFor="completion" className="block text-sm font-medium text-gray-700 mb-2">
              Completion
            </label>
            <select
              id="completion"
              value={filters.completion}
              onChange={(e) => handleCompletionChange(e.target.value as CompletionFilter)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All</option>
              <option value="not_started">Not Started (0%)</option>
              <option value="partial">Partially Completed (1-99%)</option>
              <option value="completed">Fully Completed (100%)</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              id="sort"
              value={filters.sort}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="lastUpdated">Last Updated (Newest)</option>
              <option value="completion:desc">Completion (High → Low)</option>
              <option value="completion:asc">Completion (Low → High)</option>
              <option value="name:asc">Name (A → Z)</option>
            </select>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="pt-2">
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
