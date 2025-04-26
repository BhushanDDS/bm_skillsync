import { ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';
import { Project } from './project.entity/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { SkillsService } from 'src/skills/skills.service';

@Injectable()
export class ProjectsService {

  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
    private userservice: UsersService,
    private skillRepo: SkillsService  
  ) {}

  async update(id: number, clientId: number, dto: UpdateProjectDto) {
    const project = await this.validateOwnership(id, clientId);
    
    if (dto.skills) {
      project.skills = await this.processSkills(dto.skills);
    }

    
    Object.assign(project, dto);
    return this.projectRepo.save(project);
  }

  private async validateOwnership(projectId: number, clientId: number) {
    const project = await this.projectRepo.findOne({
      where: { id: projectId },
      relations: ['client']
    });
    if (!project) throw new NotFoundException('Project not found');
    if (project.client.id !== clientId) throw new ForbiddenException();
    if (project.freelancer) throw new ForbiddenException('Project already assigned');
    return project;
  }

  async remove(id: number, clientId: number) {
    const project = await this.validateOwnership(id, clientId);
    return this.projectRepo.remove(project);
  }

  async assignFreelancer(projectId: number, clientId: number, freelancerId: number) {
    const project = await this.validateOwnership(projectId, clientId);
    const freelancer = await this.userservice.findById( freelancerId );
    
    if (!freelancer) throw new NotFoundException('Freelancer not found');
    
    project.freelancer = freelancer;
    return this.projectRepo.save(project);
  }


  async findOne(id: number) {
    const project = await this.projectRepo.findOne({
      where: { id },
      relations: ['skills', 'client', 'freelancer']
    });
    
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async findAllOpen() {
    return this.projectRepo.find({
      where: { status: "open" },
      relations: ['skills', 'client']
    });
  }

//********************************************************* */
  async create(clientId: number, dto: CreateProjectDto) {

    const client = await this.userservice.findById(clientId);
    if (!client) throw new NotFoundException('Client not found');

    // const category= await this.categoryRepo.findOneBy({id:dto.category});
  

    const project = this.projectRepo.create({
      ...dto,
      status:"open",
      client: client,
      freelancer: null,
      // category: dto.category,
      skills: await this.processSkills(dto.skills)
    });

    const savedProject = await this.projectRepo.save(project);

    return savedProject;
  }
  private async processSkills(skillNames: string[]) {
    const skills = await Promise.all(
      skillNames.map(async name => {
        let skill = await this.skillRepo.findOneBy(name);
        if (!skill) {
          skill = await this.skillRepo.create(name);
        }
        return skill;
      })
    );
    
    return skills;
  }

  async getSkills(projectId: number) {
    const project = await this.projectRepo.findOne({
      where: { id: projectId },
      relations: ['skills']
    });
    return project?.skills || [];
  }

  // getAllProjects(userId: number) {
  //   console.log('userId in service:', userId);
    
  //   if (!userId || isNaN(userId)) {
  //     throw new Error('Invalid user ID provided');
  //   }
    
  //   return this.projectRepo.find({
  //     where: {
  //       client: {
  //         id: 3
  //       }
  //     },
  //     relations: ['skills', 'client', 'freelancer', 'status']
  //   });
  // }

  getAllProjects(userId:number){
    
try {
  return this.projectRepo.findBy({
    client:{id:userId}    });} 
    catch (error) {
  throw new InternalServerErrorException('Failed to load projects');
}
   }
  
}

