import { Module } from '@nestjs/common';
import { ChecklistsModule } from './checklists/checklists.module';

@Module({
  imports: [ChecklistsModule],
})
export class AppModule {}
