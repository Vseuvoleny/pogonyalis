import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from "@nestjs/common";
import { DebriefService } from "./debrief.service";
import { CreateDebriefDto } from "./dto/create-debrief.dto";
import { UpdateDebriefDto } from "./dto/update-debrief.dto";

@Controller("debrief")
export class DebriefController {
  constructor(private readonly debriefService: DebriefService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createDebriefDto: CreateDebriefDto) {
    return this.debriefService.create(createDebriefDto);
  }

  @Get()
  async findAll() {
    const debriefs = await this.debriefService.findAll();
    return { data: debriefs };
  }

  @Get(":id")
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    const debrief = await this.debriefService.findOne(id);
    return { data: debrief };
  }

  @Patch(":id")
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateDebriefDto: UpdateDebriefDto,
  ) {
    return this.debriefService.update(id, updateDebriefDto);
  }

  @Delete(":id")
  @HttpCode(200)
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.debriefService.remove(id);
  }
}
