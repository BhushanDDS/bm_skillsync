import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity/project.entity';
import { UsersModule } from 'src/users/users.module';
import { SkillsService } from 'src/skills/skills.service';
import { SkillsModule } from 'src/skills/skills.module';

@Module({
  imports:[SkillsModule,UsersModule,AuthModule,TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports:[ProjectsService]
})
export class ProjectsModule {}
