import { ActionItem } from '@/types/checklist.types';
import { getPriorityColor, getActionStatusColor } from '@/lib/utils';

interface ActionItemCalloutProps {
  actionItem: ActionItem;
}

export const ActionItemCallout = ({ actionItem }: ActionItemCalloutProps) => {
  const {
    deficiency,
    proposedAction,
    timescale,
    personResponsible,
    priority,
    status,
  } = actionItem;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-3">
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-sm font-semibold text-amber-900">Action Required</h4>
        <div className="flex gap-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
              priority
            )}`}
          >
            {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${getActionStatusColor(
              status
            )}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="space-y-3 text-sm">
        <div>
          <span className="font-medium text-amber-900">Deficiency:</span>
          <p className="text-amber-800 mt-1">{deficiency}</p>
        </div>
        
        <div>
          <span className="font-medium text-amber-900">Proposed Action:</span>
          <p className="text-amber-800 mt-1">{proposedAction}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <span className="font-medium text-amber-900">Timescale:</span>
            <p className="text-amber-800 mt-1">{timescale}</p>
          </div>
          <div>
            <span className="font-medium text-amber-900">Person Responsible:</span>
            <p className="text-amber-800 mt-1">{personResponsible}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
