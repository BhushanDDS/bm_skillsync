import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user-dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

    async findByEmail(email: string) {
        return this.repo.findOne({ where: { email } });
      }
      
      async findById(id: number) {
        return this.repo.findOne({ where: { id } });
      }
      
      async create(dto: CreateUserDto) {
        const user = this.repo.create(dto);
        return this.repo.save(user);
      }

      async findByProjectRole(id: number) {
        return this.repo.findOne({
          where: { id },
          select: ['id', 'role'], // Explicitly select role
          relations: [] // Add any relations if needed
        });
      }
      
      async getAllUsers() {
        return this.repo.find();
      }
}
