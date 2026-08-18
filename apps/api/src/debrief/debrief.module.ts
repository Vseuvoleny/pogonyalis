import { Module } from "@nestjs/common";
import { DebriefService } from "./debrief.service";
import { DebriefController } from "./debrief.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Debrief } from "./entities/debrief.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Debrief])],
  controllers: [DebriefController],
  providers: [DebriefService],
})
export class DebriefModule {}
