import { PartialType } from '@nestjs/mapped-types';
import { CreateDebriefDto } from './create-debrief.dto';

export class UpdateDebriefDto extends PartialType(CreateDebriefDto) {}
