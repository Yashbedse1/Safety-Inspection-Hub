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

export interface ChecklistSummary {
  id: string;
  buildingName: string;
  address: string;
  status: 'draft' | 'in_progress' | 'completed' | 'requires_review';
  completion: number;
  lastUpdated: string;
  pendingActions: number;
}
