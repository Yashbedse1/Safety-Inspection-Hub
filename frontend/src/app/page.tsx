'use client';

import { useChecklists } from '@/hooks/useChecklists';
import { ChecklistCard } from '@/components/ChecklistCard';
import { LoadingSkeleton } from '@/components/LoadingSkeleton';
import { ErrorState } from '@/components/ErrorState';

export default function Home() {
  const { data: checklists, isLoading, error, refetch } = useChecklists();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Safety Inspection Hub
            </h1>
            <p className="text-gray-600">
              Manage and track building safety inspection checklists
            </p>
          </div>
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Safety Inspection Hub
            </h1>
            <p className="text-gray-600">
              Manage and track building safety inspection checklists
            </p>
          </div>
          <ErrorState error={error} onRetry={() => refetch()} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Safety Inspection Hub
          </h1>
          <p className="text-gray-600">
            Manage and track building safety inspection checklists
          </p>
        </div>

        {/* Content */}
        {checklists && checklists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checklists.map((checklist) => (
              <ChecklistCard key={checklist.id} checklist={checklist} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No checklists found
            </h3>
            <p className="text-gray-600">
              There are no safety inspection checklists available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
