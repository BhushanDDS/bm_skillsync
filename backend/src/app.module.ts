import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { BidsModule } from './bids/bids.module';
import { MilestonesModule } from './milestones/milestones.module';
import { MessagesModule } from './messages/messages.module';
import { SkillsModule } from './skills/skills.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryConfigModule } from './config/cloudinary-config.module';

@Module({
  imports: [   ConfigModule.forRoot({
    isGlobal: true,
  }),TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'NewPassword',
    database: 'skillsync',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'], 
  synchronize: false,
    logging: ['query', 'error'], 
    logger: 'advanced-console', 
  }), UsersModule, ProjectsModule, BidsModule, MilestonesModule, MessagesModule, SkillsModule, CategoriesModule, AuthModule,CloudinaryConfigModule]
})
export class AppModule {}
