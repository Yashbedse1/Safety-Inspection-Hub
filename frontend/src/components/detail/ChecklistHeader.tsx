import { Checklist } from '@/types/checklist.types';
import { formatDate, getStatusColor, getStatusLabel, formatPercent, downloadCsv, generateCsvFilename, createBuildingSlug, calculateCompletionPercentage } from '@/lib/utils';
import { generateChecklistCsv } from '@/lib/csvExport';

interface ChecklistHeaderProps {
  checklist: Checklist;
}

export const ChecklistHeader = ({ checklist }: ChecklistHeaderProps) => {
  const handleExportCsv = () => {
    const csvData = generateChecklistCsv(checklist);
    const slug = createBuildingSlug(checklist.buildingName);
    const filename = generateCsvFilename(slug);
    downloadCsv(csvData, filename);
  };

  // Calculate completion percentage to ensure consistency with dashboard
  const completionPercentage = calculateCompletionPercentage(checklist);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {checklist.buildingName}
              </h1>
              <p className="text-gray-600 text-lg">{checklist.address}</p>
            </div>
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export CSV
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Responsible Person</dt>
              <dd className="text-sm text-gray-900">{checklist.responsiblePerson}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Assessor</dt>
              <dd className="text-sm text-gray-900">
                {checklist.assessor ? checklist.assessor : '—'}
                </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Assessment Date</dt>
              <dd className="text-sm text-gray-900">
                {checklist.dateOfAssessment ? formatDate(checklist.dateOfAssessment) : '—'}
                </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Next Review</dt>
              <dd className="text-sm text-gray-900">
                {checklist.nextReviewDate ? formatDate(checklist.nextReviewDate) : '—'}
              </dd>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">Completion:</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatPercent(completionPercentage)}
              </span>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                checklist.status
              )}`}
            >
              {getStatusLabel(checklist.status)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
