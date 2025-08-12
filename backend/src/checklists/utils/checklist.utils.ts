import { Checklist, ChecklistItem } from '../types/checklist.types';

/**
 * Calculate completion percentage for a checklist
 * completion (%) = round(100 * answered / total) where answered ∈ ['yes','no','n/a']
 */
export function calculateCompletionPercentage(checklist: Checklist): number {
  let totalItems = 0;
  let answeredItems = 0;

  for (const section of checklist.sections) {
    for (const item of section.items) {
      totalItems++;
      if (item.response === 'yes' || item.response === 'no' || item.response === 'n/a') {
        answeredItems++;
      }
    }
  }

  return totalItems === 0 ? 0 : Math.round((answeredItems / totalItems) * 100);
}

/**
 * Count pending actions for a checklist
 * pendingActions = count of items where actionItem.status ∈ ['open','pending','overdue']
 */
export function calculatePendingActions(checklist: Checklist): number {
  let pendingCount = 0;

  for (const section of checklist.sections) {
    for (const item of section.items) {
      if (item.actionItem && ['open', 'pending', 'overdue'].includes(item.actionItem.status)) {
        pendingCount++;
      }
    }
  }

  return pendingCount;
}

/**
 * Transform a full checklist to a summary
 */
export function transformToSummary(checklist: Checklist) {
  return {
    id: checklist.id,
    buildingName: checklist.buildingName,
    address: checklist.address,
    status: checklist.status,
    completion: calculateCompletionPercentage(checklist),
    lastUpdated: checklist.lastUpdated,
    pendingActions: calculatePendingActions(checklist),
  };
}
