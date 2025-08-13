'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

interface ChecklistDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ChecklistDetailPage({ params }: ChecklistDetailPageProps) {
  // Extract the ID from the slug (format: building-name-id)
  const id = params.slug.split('-').pop();
  const buildingName = params.slug
    .split('-')
    .slice(0, -1)
    .join('-')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {buildingName || 'Checklist Details'}
          </h1>
          <p className="text-gray-600">
            Safety inspection checklist details
            {id && (
              <span className="ml-2 text-sm text-gray-500">
                (ID: {id})
              </span>
            )}
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-blue-400"
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
              Detailed View Coming Soon
            </h3>
            <p className="text-gray-600 mb-4">
              This page will be implemented in Stage 3 to show the complete safety inspection details.
            </p>
          </div>

          {/* Building Information Preview */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">
              Building Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Building Name:</span>
                <p className="text-gray-900">{buildingName || 'Loading...'}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Checklist ID:</span>
                <p className="text-gray-900 font-mono">{id || 'Loading...'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
