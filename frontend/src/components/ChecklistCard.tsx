import Link from 'next/link';
import { ChecklistSummary } from '@/types/checklist.types';
import { ProgressBar } from './ProgressBar';
import { formatDate, getStatusColor, getStatusLabel, createChecklistUrl } from '@/lib/utils';

interface ChecklistCardProps {
  checklist: ChecklistSummary;
}

export const ChecklistCard = ({ checklist }: ChecklistCardProps) => {
  const {
    id,
    buildingName,
    address,
    status,
    completion,
    lastUpdated,
    pendingActions,
  } = checklist;

  return (
    <Link
      href={createChecklistUrl(id, buildingName)}
      className="block group"
      aria-label={`View details for ${buildingName}`}
    >
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-gray-300 group-hover:scale-[1.02]">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {buildingName}
            </h3>
            <p className="text-gray-600 text-sm">{address}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
              status
            )}`}
          >
            {getStatusLabel(status)}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <ProgressBar percentage={completion} />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>Updated: {formatDate(lastUpdated)}</span>
          <div className="flex items-center gap-2">
            {pendingActions > 0 && (
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                {pendingActions} pending action{pendingActions !== 1 ? 's' : ''}
              </span>
            )}
            <span className="text-gray-400 group-hover:text-blue-600 transition-colors">
              View details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
