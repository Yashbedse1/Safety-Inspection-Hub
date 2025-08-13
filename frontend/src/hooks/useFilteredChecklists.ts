import { useMemo } from 'react';
import { ChecklistSummary, FilterState, Stats } from '@/types/checklist.types';

export const useFilteredChecklists = (
  checklists: ChecklistSummary[],
  filters: FilterState
) => {
  const filteredAndSortedChecklists = useMemo(() => {
    let filtered = [...checklists];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        checklist =>
          checklist.buildingName.toLowerCase().includes(searchTerm) ||
          checklist.address.toLowerCase().includes(searchTerm)
      );
    }

    // Apply status filter
    if (filters.status.length > 0) {
      filtered = filtered.filter(checklist =>
        filters.status.includes(checklist.status)
      );
    }

    // Apply completion filter
    switch (filters.completion) {
      case 'not_started':
        filtered = filtered.filter(checklist => checklist.completion === 0);
        break;
      case 'partial':
        filtered = filtered.filter(checklist => 
          checklist.completion > 0 && checklist.completion < 100
        );
        break;
      case 'completed':
        filtered = filtered.filter(checklist => checklist.completion === 100);
        break;
      default:
        // 'all' - no filtering
        break;
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sort) {
        case 'lastUpdated':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'completion:desc':
          return b.completion - a.completion;
        case 'completion:asc':
          return a.completion - b.completion;
        case 'name:asc':
          return a.buildingName.localeCompare(b.buildingName);
        default:
          return 0;
      }
    });

    return filtered;
  }, [checklists, filters]);

  // Calculate stats from filtered results
  const stats = useMemo((): Stats => {
    const totalBuildings = filteredAndSortedChecklists.length;
    
    const completedCount = filteredAndSortedChecklists.filter(
      checklist => checklist.status === 'completed'
    ).length;
    
    const inProgressCount = filteredAndSortedChecklists.filter(
      checklist => checklist.status === 'in_progress'
    ).length;
    
    const requiresReviewCount = filteredAndSortedChecklists.filter(
      checklist => checklist.status === 'requires_review'
    ).length;
    
    const draftCount = filteredAndSortedChecklists.filter(
      checklist => checklist.status === 'draft'
    ).length;
    
    const averageCompletion = totalBuildings > 0
      ? filteredAndSortedChecklists.reduce((sum, checklist) => sum + checklist.completion, 0) / totalBuildings
      : 0;
    
    const totalPendingActions = filteredAndSortedChecklists.reduce(
      (sum, checklist) => sum + checklist.pendingActions, 0
    );

    return {
      totalBuildings,
      completedCount,
      inProgressCount,
      requiresReviewCount,
      draftCount,
      averageCompletion,
      totalPendingActions,
    };
  }, [filteredAndSortedChecklists]);

  return {
    filteredChecklists: filteredAndSortedChecklists,
    stats,
  };
};
