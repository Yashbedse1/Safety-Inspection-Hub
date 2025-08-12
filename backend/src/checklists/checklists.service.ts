import { Injectable, Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Checklist, ChecklistSummary } from './types/checklist.types';
import { transformToSummary } from './utils/checklist.utils';

@Injectable()
export class ChecklistsService {
  private readonly logger = new Logger(ChecklistsService.name);
  private checklists: Checklist[] = [];

  constructor() {
    this.loadChecklists();
  }

  /**
   * Load checklists from JSON file on startup
   */
  private loadChecklists(): void {
    try {
      const dataPath = join(process.cwd(), 'data', 'checklists.json');
      const rawData = readFileSync(dataPath, 'utf8');
      this.checklists = JSON.parse(rawData);
      this.logger.log(`Loaded ${this.checklists.length} checklists from data file`);
    } catch (error) {
      this.logger.error('Failed to load checklists data:', error);
      throw new Error('Failed to load checklists data');
    }
  }

  /**
   * Get all checklists summaries
   */
  getAllSummaries(): ChecklistSummary[] {
    return this.checklists.map(transformToSummary);
  }

  /**
   * Get a single checklist by ID
   */
  getById(id: string): Checklist | null {
    return this.checklists.find(checklist => checklist.id === id) || null;
  }

  /**
   * Check if a checklist exists
   */
  exists(id: string): boolean {
    return this.checklists.some(checklist => checklist.id === id);
  }
}
