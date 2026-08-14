import { Injectable } from '@nestjs/common';
import { CreateDebriefDto } from './dto/create-debrief.dto';
import { UpdateDebriefDto } from './dto/update-debrief.dto';

@Injectable()
export class DebriefService {
  create(createDebriefDto: CreateDebriefDto) {
    return 'This action adds a new debrief';
  }

  findAll() {
    return `This action returns all debrief`;
  }

  findOne(id: number) {
    return `This action returns a #${id} debrief`;
  }

  update(id: number, updateDebriefDto: UpdateDebriefDto) {
    return `This action updates a #${id} debrief`;
  }

  remove(id: number) {
    return `This action removes a #${id} debrief`;
  }
}
