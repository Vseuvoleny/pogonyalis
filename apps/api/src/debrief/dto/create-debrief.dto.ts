import {
  IsDate,
  IsEnum,
  IsIn,
  IsInt,
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

  @IsInt()
  @IsOptional()
  windFrom!: number | null;

  @IsInt()
  @IsOptional()
  windTo!: number | null;

  @IsIn(["ms", "knots"])
  @IsOptional()
  windUnit!: "ms" | "knots" | null;

  @IsInt()
  @IsOptional()
  windGusts!: number | null;

  @IsIn(["С", "СВ", "В", "ЮВ", "Ю", "ЮЗ", "З", "СЗ"])
  @IsOptional()
  windDirection!: string | null;

  @IsString()
  @IsOptional()
  windComment!: string | null;

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
