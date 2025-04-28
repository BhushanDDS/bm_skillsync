import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';
import { Milestone } from './milestone.entity/milestone.entity';
import { Project } from 'src/projects/project.entity/project.entity';
import { User } from 'src/users/user.entity/user.entity';

@Injectable()
export class MilestonesService {
  constructor(
    @InjectRepository(Milestone)
    private milestonesRepository: Repository<Milestone>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getProjectMilestones(projectId: number): Promise<Milestone[]> {
    return this.milestonesRepository.find({
      where: { project: { id: projectId } },
      relations: ['project', 'createdBy'],
    });
  }

  async createMilestone(
    createMilestoneDto: CreateMilestoneDto,
    userId: number,
  ): Promise<Milestone> {
    const { projectId, ...milestoneData } = createMilestoneDto;

    const project = await this.projectsRepository.findOne({
      where: { id: projectId },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const newMilestone = this.milestonesRepository.create({
      ...milestoneData,
      project,
      createdBy: user,
      status: 'pending',
    });

    return this.milestonesRepository.save(newMilestone);
  }

  async updateMilestone(
    id: number,
    updateMilestoneDto: UpdateMilestoneDto,
  ): Promise<Milestone> {
    const milestone = await this.milestonesRepository.findOne({
      where: { id },
      relations: ['project', 'createdBy'],
    });

    if (!milestone) {
      throw new NotFoundException(`Milestone with ID ${id} not found`);
    }

    Object.assign(milestone, updateMilestoneDto);
    return this.milestonesRepository.save(milestone);
  }

  async updateMilestoneFile(
    id: number,
    fileType: string,
    fileUrl: string,
  ): Promise<Milestone> {
    const milestone = await this.milestonesRepository.findOne({
      where: { id },
      relations: ['project', 'createdBy'],
    });

    if (!milestone) {
      throw new NotFoundException(`Milestone with ID ${id} not found`);
    }

    if (fileType === 'invoice') {
      milestone.invoiceFile = fileUrl;
    } else if (fileType === 'deliverable') {
      milestone.deliverableFile = fileUrl;
    } else {
      throw new Error('Invalid file type');
    }

    return this.milestonesRepository.save(milestone);
  }
}