import { Checklist } from '@/types/checklist.types';

export const generateChecklistCsv = (checklist: Checklist): string => {
  const headers = [
    'checklistId',
    'buildingName',
    'sectionTitle',
    'itemId',
    'question',
    'response',
    'notes',
    'requiresAction',
    'actionId',
    'deficiency',
    'proposedAction',
    'timescale',
    'personResponsible',
    'priority',
    'status'
  ];

  const rows: string[] = [];

  // Add header row
  rows.push(headers.join(','));

  // Add data rows
  checklist.sections.forEach(section => {
    section.items.forEach(item => {
      const row = [
        checklist.id,
        checklist.buildingName,
        section.title,
        item.id,
        `"${item.question.replace(/"/g, '""')}"`, // Escape quotes in question
        item.response || 'Not answered',
        item.notes ? `"${item.notes.replace(/"/g, '""')}"` : '',
        item.requiresAction ? 'Yes' : 'No',
        item.actionItem?.id || '',
        item.actionItem?.deficiency ? `"${item.actionItem.deficiency.replace(/"/g, '""')}"` : '',
        item.actionItem?.proposedAction ? `"${item.actionItem.proposedAction.replace(/"/g, '""')}"` : '',
        item.actionItem?.timescale || '',
        item.actionItem?.personResponsible || '',
        item.actionItem?.priority || '',
        item.actionItem?.status || ''
      ];
      
      rows.push(row.join(','));
    });
  });

  return rows.join('\n');
};
