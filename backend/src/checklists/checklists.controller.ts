import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { ChecklistSummary } from './types/checklist.types';

@Controller('api/checklists')
export class ChecklistsController {
  constructor(private readonly checklistsService: ChecklistsService) {}

  /**
   * GET /api/checklists
   * Returns summary list for all checklists
   */
  @Get()
  getAllSummaries(): ChecklistSummary[] {
    return this.checklistsService.getAllSummaries();
  }

  /**
   * GET /api/checklists/:id
   * Returns full nested checklist object
   */
  @Get(':id')
  getById(@Param('id') id: string) {
    const checklist = this.checklistsService.getById(id);
    
    if (!checklist) {
      throw new NotFoundException({
        type: 'about:blank',
        title: 'Checklist not found',
        status: 404,
        detail: `Checklist with ID '${id}' was not found`,
        instance: `/api/checklists/${id}`,
        code: 'CHECKLIST_NOT_FOUND'
      });
    }

    return checklist;
  }
}
