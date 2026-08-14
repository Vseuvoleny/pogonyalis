import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DebriefService } from './debrief.service';
import { CreateDebriefDto } from './dto/create-debrief.dto';
import { UpdateDebriefDto } from './dto/update-debrief.dto';

@Controller('debrief')
export class DebriefController {
  constructor(private readonly debriefService: DebriefService) {}

  @Post()
  create(@Body() createDebriefDto: CreateDebriefDto) {
    return this.debriefService.create(createDebriefDto);
  }

  @Get()
  findAll() {
    return this.debriefService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.debriefService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDebriefDto: UpdateDebriefDto) {
    return this.debriefService.update(+id, updateDebriefDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.debriefService.remove(+id);
  }
}
