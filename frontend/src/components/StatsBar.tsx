import { Stats } from '@/types/checklist.types';
import { formatPercent } from '@/lib/utils';

interface StatsBarProps {
  stats: Stats;
}

export const StatsBar = ({ stats }: StatsBarProps) => {
  const {
    totalBuildings,
    completedCount,
    inProgressCount,
    requiresReviewCount,
    draftCount,
    averageCompletion,
    totalPendingActions,
  } = stats;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {/* Total Buildings */}
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{totalBuildings}</div>
          <div className="text-sm text-gray-600">Total Buildings</div>
        </div>

        {/* Completed */}
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{completedCount}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>

        {/* In Progress */}
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-600">{inProgressCount}</div>
          <div className="text-sm text-gray-600">In Progress</div>
        </div>

        {/* Requires Review */}
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{requiresReviewCount}</div>
          <div className="text-sm text-gray-600">Needs Review</div>
        </div>

        {/* Draft */}
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600">{draftCount}</div>
          <div className="text-sm text-gray-600">Draft</div>
        </div>

        {/* Average Completion */}
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{formatPercent(averageCompletion)}</div>
          <div className="text-sm text-gray-600">Avg Completion</div>
        </div>

        {/* Pending Actions */}
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{totalPendingActions}</div>
          <div className="text-sm text-gray-600">Pending Actions</div>
        </div>
      </div>
    </div>
  );
};
