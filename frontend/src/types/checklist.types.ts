export interface ChecklistSummary {
  id: string;
  buildingName: string;
  address: string;
  status: 'draft' | 'in_progress' | 'completed' | 'requires_review';
  completion: number;
  lastUpdated: string;
  pendingActions: number;
}

export interface ApiError {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  code?: string;
}
