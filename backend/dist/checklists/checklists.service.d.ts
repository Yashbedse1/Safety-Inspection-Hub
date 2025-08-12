import { Checklist, ChecklistSummary } from './types/checklist.types';
export declare class ChecklistsService {
    private readonly logger;
    private checklists;
    constructor();
    private loadChecklists;
    getAllSummaries(): ChecklistSummary[];
    getById(id: string): Checklist | null;
    exists(id: string): boolean;
}
