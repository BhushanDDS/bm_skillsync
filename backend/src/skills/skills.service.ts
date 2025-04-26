import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './skill.entity/skill.entity';
import { Repository } from 'typeorm';
import { SkillDto } from './dto/skill-dto';
@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private skillRepo: Repository<Skill>,
  ) {}

  async save(skill: SkillDto) {
    return this.skillRepo.save(skill);
  }

  async create(name: string) {
    const skill = this.skillRepo.create({ name });
    return this.skillRepo.save(skill);
  }

  async findOneBy(name: string) {
    return this.skillRepo.findOneBy({ name });
  }

}

