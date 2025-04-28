import { Module } from '@nestjs/common';
import { MilestonesController } from './milestones.controller';
import { MilestonesService } from './milestones.service';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryConfigService } from 'src/config/cloudinary.config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity/user.entity';
import { Project } from 'src/projects/project.entity/project.entity';
import { Milestone } from './milestone.entity/milestone.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryConfigModule } from 'src/config/cloudinary-config.module';

@Module({
  imports:[CloudinaryConfigModule,MulterModule.registerAsync({
    imports: [CloudinaryConfigModule],
    inject: [CloudinaryConfigService],
    useFactory: (cloudinaryConfigService: CloudinaryConfigService) => {
      return cloudinaryConfigService.getMulterConfig();
    },
  }),TypeOrmModule.forFeature([User,Project,Milestone]),AuthModule,],
  controllers: [MilestonesController],
  providers: [MilestonesService]
})
export class MilestonesModule {}
