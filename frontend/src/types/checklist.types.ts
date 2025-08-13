export interface ChecklistSummary {
  id: string;
  buildingName: string;
  address: string;
  status: 'draft' | 'in_progress' | 'completed' | 'requires_review';
  completion: number;
  lastUpdated: string;
  pendingActions: number;
}

export interface ActionItem {
  id: string;
  deficiency: string;
  proposedAction: string;
  timescale: string;
  personResponsible: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'pending' | 'overdue' | 'completed';
}

export interface ChecklistItem {
  id: string;
  question: string;
  helpText?: string;
  response: 'yes' | 'no' | 'n/a' | null;
  notes?: string;
  requiresAction: boolean;
  actionItem?: ActionItem;
  lastUpdated: string | null;
}

export interface ChecklistSection {
  id: string;
  title: string;
  description: string;
  order: number;
  completionPercentage: number;
  items: ChecklistItem[];
}

export interface Checklist {
  id: string;
  buildingName: string;
  address: string;
  responsiblePerson: string;
  assessor: string;
  dateOfAssessment: string;
  useOfPremises: string;
  numberOfFloors: number;
  construction: string;
  maxOccupancy: number;
  status: 'draft' | 'in_progress' | 'completed' | 'requires_review';
  overallCompletionPercentage: number;
  lastUpdated: string;
  nextReviewDate: string;
  sections: ChecklistSection[];
}

export interface ApiError {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  code?: string;
}

// Filter and Sort Types
export type StatusFilter = 'draft' | 'in_progress' | 'completed' | 'requires_review';

export type CompletionFilter = 'all' | 'not_started' | 'partial' | 'completed';

export type SortOption = 'lastUpdated' | 'completion:desc' | 'completion:asc' | 'name:asc';

export interface FilterState {
  search: string;
  status: StatusFilter[];
  completion: CompletionFilter;
  sort: SortOption;
}

export interface Stats {
  totalBuildings: number;
  completedCount: number;
  inProgressCount: number;
  requiresReviewCount: number;
  draftCount: number;
  averageCompletion: number;
  totalPendingActions: number;
}
