import { useQuery } from '@tanstack/react-query';
import { checklistsApi } from '@/lib/api';
import { ChecklistSummary } from '@/types/checklist.types';

export const useChecklists = () => {
  return useQuery<ChecklistSummary[]>({
    queryKey: ['checklists'],
    queryFn: checklistsApi.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};
