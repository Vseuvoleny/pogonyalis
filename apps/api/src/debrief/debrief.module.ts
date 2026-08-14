import { Module } from '@nestjs/common';
import { DebriefService } from './debrief.service';
import { DebriefController } from './debrief.controller';

@Module({
  controllers: [DebriefController],
  providers: [DebriefService],
})
export class DebriefModule {}
