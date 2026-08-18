import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  IsDate,
  IsEnum,
} from "class-validator";

export enum EventType {
  TRAINING = "training",
  RACE = "race",
  TRAINING_RACE = "training_race",
}

export interface IDebrief {
  id: string; // uuid v4
  eventDate: string;
  eventType: EventType;
  boatClass: string;
  location: string;
  wind: string;
  current: string;
  competitors: string;
  comment: string;
  nextSteps: string;
}

export class CreateDebriefDto implements IDebrief {
  @IsString()
  @IsUUID()
  id!: string;
  @IsDate()
  eventDate!: string;
  @IsEnum(EventType)
  eventType!: EventType;
  @IsString()
  boatClass!: string;
  @IsString()
  location!: string;
  @IsString()
  wind!: string;
  @IsString()
  current!: string;
  @IsString()
  competitors!: string;
  @IsString()
  comment!: string;
  @IsString()
  nextSteps!: string;
}
