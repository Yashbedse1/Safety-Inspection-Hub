import { Checklist } from '../types/checklist.types';
export declare function calculateCompletionPercentage(checklist: Checklist): number;
export declare function calculatePendingActions(checklist: Checklist): number;
export declare function transformToSummary(checklist: Checklist): {
    id: string;
    buildingName: string;
    address: string;
    status: "completed" | "draft" | "in_progress" | "requires_review";
    completion: number;
    lastUpdated: string;
    pendingActions: number;
};
