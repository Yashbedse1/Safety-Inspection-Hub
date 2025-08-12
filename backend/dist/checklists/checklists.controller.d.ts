import { ChecklistsService } from './checklists.service';
import { ChecklistSummary } from './types/checklist.types';
export declare class ChecklistsController {
    private readonly checklistsService;
    constructor(checklistsService: ChecklistsService);
    getAllSummaries(): ChecklistSummary[];
    getById(id: string): import("./types/checklist.types").Checklist;
}
