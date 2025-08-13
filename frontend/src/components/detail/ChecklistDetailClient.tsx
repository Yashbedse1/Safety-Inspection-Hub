'use client';

import { useChecklist } from '@/hooks/useChecklist';
import { ChecklistHeader } from './ChecklistHeader';
import { SectionAccordion } from './SectionAccordion';
import { DetailLoadingSkeleton } from './DetailLoadingSkeleton';
import { ErrorState } from '../ErrorState';
import Link from 'next/link';

interface ChecklistDetailClientProps {
  id: string;
}

export const ChecklistDetailClient = ({ id }: ChecklistDetailClientProps) => {
  const { data: checklist, isLoading, error, refetch } = useChecklist(id);

  if (isLoading) {
    return <DetailLoadingSkeleton />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={refetch} />;
  }

  if (!checklist) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Checklist Not Found</h1>
          <p className="text-gray-600 mb-4">The requested checklist could not be found.</p>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ← Back to checklists
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to checklists
          </Link>
        </div>

        <ChecklistHeader checklist={checklist} />

        <div className="space-y-4">
          {checklist.sections.map((section) => (
            <SectionAccordion key={section.id} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
};
