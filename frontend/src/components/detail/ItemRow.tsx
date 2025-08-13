import { ChecklistItem } from '@/types/checklist.types';
import { mapResponseToLabel } from '@/lib/utils';
import { ActionItemCallout } from './ActionItemCallout';

interface ItemRowProps {
  item: ChecklistItem;
}

export const ItemRow = ({ item }: ItemRowProps) => {
  const { question, helpText, response, notes, requiresAction, actionItem } = item;

  return (
    <div className="border-b border-gray-200 py-4 last:border-b-0">
      <div className="space-y-3">
        {/* Question */}
        <div>
          <h4 className="font-medium text-gray-900 mb-1">{question}</h4>
          {helpText && (
            <p className="text-sm text-gray-600 mb-2">{helpText}</p>
          )}
        </div>

        {/* Response */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Response:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              response === 'yes'
                ? 'bg-green-100 text-green-800'
                : response === 'no'
                ? 'bg-red-100 text-red-800'
                : response === 'n/a'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {mapResponseToLabel(response)}
          </span>
        </div>

        {/* Notes */}
        {notes && (
          <div>
            <span className="text-sm font-medium text-gray-700">Notes:</span>
            <p className="text-sm text-gray-600 mt-1">{notes}</p>
          </div>
        )}

        {/* Action Item */}
        {requiresAction && actionItem && (
          <ActionItemCallout actionItem={actionItem} />
        )}
      </div>
    </div>
  );
};
