import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity/user.entity';
import { Project } from 'src/projects/project.entity/project.entity';
import { Message } from './message.entity/message.entity';

@Module({
  imports:[AuthModule,TypeOrmModule.forFeature([User,Project,Message])],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
