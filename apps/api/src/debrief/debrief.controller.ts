import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
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
  async findOne(@Param("id") id: string) {
    const debrief = await this.debriefService.findOne(id);
    return { data: debrief };
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateDebriefDto: UpdateDebriefDto,
  ) {
    return await this.debriefService.update(id, updateDebriefDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.debriefService.remove(id);
  }
}
