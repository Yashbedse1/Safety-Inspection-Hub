import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiNotFoundResponse, ApiParam } from '@nestjs/swagger';
import { ChecklistsService } from './checklists.service';
import { ChecklistSummaryDto, ChecklistDto } from './dto/checklist.dto';
import { ProblemDetailsDto } from '../common/dto/problem-details.dto';

@ApiTags('checklists')
@Controller('api/checklists')
export class ChecklistsController {
  constructor(private readonly checklistsService: ChecklistsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all checklist summaries',
    description: 'Retrieves a list of all building safety inspection checklists with summary information including building name, address, status, completion percentage, and pending actions.'
  })
  @ApiOkResponse({
    description: 'List of checklist summaries retrieved successfully',
    type: [ChecklistSummaryDto]
  })
  async getAllSummaries(): Promise<ChecklistSummaryDto[]> {
    return this.checklistsService.getAllSummaries();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get checklist by ID',
    description: 'Retrieves a complete building safety inspection checklist by its unique identifier, including all sections, items, and action items.'
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the checklist (e.g., chk-001)',
    example: 'chk-001'
  })
  @ApiOkResponse({
    description: 'Checklist retrieved successfully',
    type: ChecklistDto
  })
  @ApiNotFoundResponse({
    description: 'Checklist not found',
    type: ProblemDetailsDto
  })
  async getById(@Param('id') id: string): Promise<ChecklistDto> {
    const checklist = this.checklistsService.getById(id);
    if (!checklist) {
      throw new NotFoundException({
        type: 'https://example.com/probs/not-found',
        title: 'Checklist Not Found',
        status: 404,
        detail: `Checklist with ID '${id}' was not found.`,
        instance: `/api/checklists/${id}`,
        code: 'CHECKLIST_NOT_FOUND'
      });
    }
    return checklist;
  }
}
