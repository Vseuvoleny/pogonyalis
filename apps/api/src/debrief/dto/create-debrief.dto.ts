import {
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
} from "class-validator";
import { EventType } from "../entities/debrief.entity";
import { PartialType } from "@nestjs/mapped-types";

export class CreateDebriefDto {
  @IsDate()
  eventDate!: string;

  @IsEnum(EventType)
  eventType!: EventType;

  @IsString()
  boatClass!: string;

  @IsString()
  @IsOptional()
  location!: string;

  @IsString()
  @IsOptional()
  wind!: string;

  @IsString()
  @IsOptional()
  current!: string;

  @IsString()
  @IsOptional()
  competitors!: string;

  @IsString()
  @IsOptional()
  comment!: string;

  @IsString()
  @IsOptional()
  nextSteps!: string;
}

export class UpdateDebriefDto extends PartialType(CreateDebriefDto) {}
