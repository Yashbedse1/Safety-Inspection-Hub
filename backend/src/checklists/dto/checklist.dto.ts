import { ApiProperty } from '@nestjs/swagger';

export class ActionItemDto {
  @ApiProperty({
    description: 'Unique identifier for the action item',
    example: 'act-001-1-1'
  })
  id: string;

  @ApiProperty({
    description: 'Description of the deficiency found',
    example: 'Fire extinguisher missing from third floor'
  })
  deficiency: string;

  @ApiProperty({
    description: 'Proposed action to address the deficiency',
    example: 'Install new fire extinguisher in designated location'
  })
  proposedAction: string;

  @ApiProperty({
    description: 'Timescale for completing the action',
    example: 'Within 7 days'
  })
  timescale: string;

  @ApiProperty({
    description: 'Person responsible for completing the action',
    example: 'John Smith'
  })
  personResponsible: string;

  @ApiProperty({
    description: 'Priority level of the action',
    enum: ['low', 'medium', 'high'],
    example: 'high'
  })
  priority: 'low' | 'medium' | 'high';

  @ApiProperty({
    description: 'Current status of the action',
    enum: ['open', 'pending', 'overdue', 'completed'],
    example: 'open'
  })
  status: 'open' | 'pending' | 'overdue' | 'completed';
}

export class ChecklistItemDto {
  @ApiProperty({
    description: 'Unique identifier for the checklist item',
    example: 'item-001-1-1'
  })
  id: string;

  @ApiProperty({
    description: 'The question being asked',
    example: 'Are fixed electrical installations periodically inspected and tested every five years?'
  })
  question: string;

  @ApiProperty({
    description: 'Help text to guide the assessment',
    example: 'Check for valid electrical installation condition report (EICR)',
    required: false
  })
  helpText?: string;

  @ApiProperty({
    description: 'Response to the question',
    enum: ['yes', 'no', 'n/a', null],
    example: 'yes'
  })
  response: 'yes' | 'no' | 'n/a' | null;

  @ApiProperty({
    description: 'Additional notes about the response',
    example: 'Last inspection completed June 2024, certificate on file',
    required: false
  })
  notes?: string;

  @ApiProperty({
    description: 'Whether this item requires an action',
    example: false
  })
  requiresAction: boolean;

  @ApiProperty({
    description: 'Associated action item if requiresAction is true',
    type: ActionItemDto,
    required: false
  })
  actionItem?: ActionItemDto;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2025-01-15T09:15:00Z',
    required: false
  })
  lastUpdated: string | null;
}

export class ChecklistSectionDto {
  @ApiProperty({
    description: 'Unique identifier for the section',
    example: 'sec-001-1'
  })
  id: string;

  @ApiProperty({
    description: 'Title of the section',
    example: 'Fire Hazards'
  })
  title: string;

  @ApiProperty({
    description: 'Description of what the section covers',
    example: 'Identify potential fire hazards including ignition sources and combustible materials'
  })
  description: string;

  @ApiProperty({
    description: 'Order of the section in the checklist',
    example: 1
  })
  order: number;

  @ApiProperty({
    description: 'Completion percentage of the section',
    example: 100
  })
  completionPercentage: number;

  @ApiProperty({
    description: 'Items in this section',
    type: [ChecklistItemDto]
  })
  items: ChecklistItemDto[];
}

export class ChecklistDto {
  @ApiProperty({
    description: 'Unique identifier for the checklist',
    example: 'chk-001'
  })
  id: string;

  @ApiProperty({
    description: 'Name of the building',
    example: 'Riverside Office Complex'
  })
  buildingName: string;

  @ApiProperty({
    description: 'Address of the building',
    example: '42 Thames Street, London, EC4R 3QT'
  })
  address: string;

  @ApiProperty({
    description: 'Person responsible for the building',
    example: 'Sarah Johnson'
  })
  responsiblePerson: string;

  @ApiProperty({
    description: 'Person conducting the assessment',
    example: 'Michael Chen'
  })
  assessor: string;

  @ApiProperty({
    description: 'Date when the assessment was conducted',
    example: '2025-01-15T09:00:00Z'
  })
  dateOfAssessment: string;

  @ApiProperty({
    description: 'Primary use of the premises',
    example: 'Commercial Office Space'
  })
  useOfPremises: string;

  @ApiProperty({
    description: 'Number of floors in the building',
    example: 5
  })
  numberOfFloors: number;

  @ApiProperty({
    description: 'Construction type of the building',
    example: 'Steel frame with concrete floors'
  })
  construction: string;

  @ApiProperty({
    description: 'Maximum occupancy of the building',
    example: 250
  })
  maxOccupancy: number;

  @ApiProperty({
    description: 'Current status of the checklist',
    enum: ['draft', 'in_progress', 'completed', 'requires_review'],
    example: 'completed'
  })
  status: 'draft' | 'in_progress' | 'completed' | 'requires_review';

  @ApiProperty({
    description: 'Overall completion percentage of the checklist',
    example: 100
  })
  overallCompletionPercentage: number;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2025-01-15T16:30:00Z'
  })
  lastUpdated: string;

  @ApiProperty({
    description: 'Next review date',
    example: '2026-01-15T09:00:00Z'
  })
  nextReviewDate: string;

  @ApiProperty({
    description: 'Sections of the checklist',
    type: [ChecklistSectionDto]
  })
  sections: ChecklistSectionDto[];
}

export class ChecklistSummaryDto {
  @ApiProperty({
    description: 'Unique identifier for the checklist',
    example: 'chk-001'
  })
  id: string;

  @ApiProperty({
    description: 'Name of the building',
    example: 'Riverside Office Complex'
  })
  buildingName: string;

  @ApiProperty({
    description: 'Address of the building',
    example: '42 Thames Street, London, EC4R 3QT'
  })
  address: string;

  @ApiProperty({
    description: 'Current status of the checklist',
    enum: ['draft', 'in_progress', 'completed', 'requires_review'],
    example: 'completed'
  })
  status: 'draft' | 'in_progress' | 'completed' | 'requires_review';

  @ApiProperty({
    description: 'Completion percentage of the checklist',
    example: 100
  })
  completion: number;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2025-01-15T16:30:00Z'
  })
  lastUpdated: string;

  @ApiProperty({
    description: 'Number of pending actions',
    example: 2
  })
  pendingActions: number;
}
