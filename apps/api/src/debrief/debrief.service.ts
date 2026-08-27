import { Injectable, NotFoundException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateDebriefDto } from "./dto/create-debrief.dto";
import { UpdateDebriefDto } from "./dto/update-debrief.dto";
import { Debrief } from "./entities/debrief.entity";

@Injectable()
export class DebriefService {
  private readonly logger = new Logger(DebriefService.name);

  constructor(
    @InjectRepository(Debrief)
    private readonly debriefRepository: Repository<Debrief>,
  ) {}

  create(createDebriefDto: CreateDebriefDto) {
    this.logger.log("Creating debrief");
    const debrief = this.debriefRepository.create(createDebriefDto);
    return this.debriefRepository.save(debrief);
  }

  findAll() {
    return this.debriefRepository.find();
  }

  async findOne(id: string) {
    const debrief = await this.debriefRepository.findOneBy({ id });
    if (!debrief) {
      throw new NotFoundException(`Debrief with ID "${id}" not found`);
    }
    return debrief;
  }

  async update(id: string, updateDebriefDto: UpdateDebriefDto) {
    const debrief = await this.findOne(id);
    Object.assign(debrief, updateDebriefDto);
    return this.debriefRepository.save(debrief);
  }

  async remove(id: string) {
    const debrief = await this.findOne(id);
    await this.debriefRepository.remove(debrief);
    return { deleted: true };
  }
}
