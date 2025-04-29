import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user-dto';
import { UpdateProfile } from './dto/updat-dto';

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


     async updateUser(userId: number, dto: UpdateProfile){
        const user= await this.repo.findOne({ where: { id:userId } });
        if(!user){
          throw new NotFoundException("user not found");
        }

        Object.assign(user, dto);
        return await this.repo.save(user);
      }

      async updateMilestoneFile(userId:number,fileUrl:string){
        const user= await this.repo.findOne({ where: { id:userId } });
        if(!user){
          throw new NotFoundException("user not found");
        }

        user.profileImage=fileUrl;
        return await this.repo.save(user);
      }

    async saveUser(user: User) {
      return await this.repo.save(user);

    }

      
}
