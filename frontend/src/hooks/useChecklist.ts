import { useQuery } from '@tanstack/react-query';
import { checklistsApi } from '@/lib/api';
import { Checklist } from '@/types/checklist.types';

export const useChecklist = (id: string) => {
  return useQuery<Checklist>({
    queryKey: ['checklist', id],
    queryFn: () => checklistsApi.getById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    enabled: !!id,
  });
};
