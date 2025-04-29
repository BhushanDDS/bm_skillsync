import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMessageDto } from './dto/message-dto';
import { Message } from './message.entity/message.entity';
import { Project } from 'src/projects/project.entity/project.entity';
import { User } from 'src/users/user.entity/user.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createMessageDto: CreateMessageDto, userId: number): Promise<Message> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const project = await this.projectsRepository.findOne({ where: { id: createMessageDto.projectId } });
    
    if (!user || !project) {
      throw new Error('User or project not found');
    }


    const newMessage= await this.messagesRepository.create({
        content : createMessageDto.content,
        sender :user,
        project : project,
        attachment : createMessageDto.attachment
    })

    return this.messagesRepository.save(newMessage);
  }

  async findByProject(projectId: number): Promise<Message[]> {
    return this.messagesRepository.find({
      where: { project: { id: projectId } },
      relations: ['sender'],
      order: { timestamp: 'ASC' }
    });
  }
}