'use client';

import { useState } from 'react';
import { useChecklists } from '@/hooks/useChecklists';
import { useFilteredChecklists } from '@/hooks/useFilteredChecklists';
import { FilterState } from '@/types/checklist.types';
import { ChecklistCard } from '@/components/ChecklistCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ErrorState } from '@/components/ErrorState';
import { OverviewControls } from '@/components/OverviewControls';
import { StatsBar } from '@/components/StatsBar';

export default function HomePage() {
  const { data: checklists = [], isLoading, error, refetch } = useChecklists();
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: [],
    completion: 'all',
    sort: 'lastUpdated',
  });

  const { filteredChecklists, stats } = useFilteredChecklists(checklists, filters);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Fire Safety Inspection Hub
          </h1>
          <p className="text-gray-600">
            Manage and review building safety inspection checklists
          </p>
        </div>

        {/* Controls */}
        <OverviewControls onFiltersChange={setFilters} />

        {/* Statistics */}
        <StatsBar stats={stats} />

        {/* Results */}
        {filteredChecklists.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No checklists found
            </h3>
            <p className="text-gray-600">
              {checklists.length === 0
                ? 'No checklists are available.'
                : 'Try adjusting your search or filters to find what you\'re looking for.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChecklists.map((checklist) => (
              <ChecklistCard key={checklist.id} checklist={checklist} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
