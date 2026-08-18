import { Injectable } from "@nestjs/common";
import { CreateDebriefDto } from "./dto/create-debrief.dto";
import { UpdateDebriefDto } from "./dto/update-debrief.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Debrief } from "./entities/debrief.entity";

@Injectable()
export class DebriefService {
  constructor(
    @InjectRepository(Debrief) private debriefRepository: Repository<Debrief>,
  ) {}

  create(createDebriefDto: CreateDebriefDto) {
    const debrief = this.debriefRepository.save(createDebriefDto);
    return debrief;
  }

  findAll() {
    return this.debriefRepository.find();
  }

  async findOne(id: string) {
    const currentDebrief = await this.debriefRepository.findOneBy({ id });
    if (!currentDebrief) {
      throw new Error(`Не найдена сущность с ID:${id}`);
    }

    return currentDebrief;
  }

  async update(id: string, updateDebriefDto: UpdateDebriefDto) {
    const currentDebrief = await this.debriefRepository.findOneBy({ id });
    if (!currentDebrief) {
      throw new Error(`Не найдена сущность с ID:${id}`);
    }
    const newBody: CreateDebriefDto = {
      ...currentDebrief,
      ...updateDebriefDto,
    };
    await this.debriefRepository.update({ id }, newBody);
  }

  remove(id: string) {
    const currentDebrief = this.debriefRepository.findOneBy({ id });
    if (!currentDebrief) {
      throw new Error(`Не найдена сущность с ID:${id}`);
    }
    const result = this.debriefRepository.delete({ id });
    return result;
  }
}
