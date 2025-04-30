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
import { EmailModule } from './email/email.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('HOST'),
        port: configService.get<number>('PORT'),
        username: configService.get<string>('USER_NAME'),
        password: configService.get<string>('PASSWORD'),
        database: configService.get<string>('DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        synchronize: false,
        logging: ['query', 'error'],
        logger: 'advanced-console',
      }),
    }),
    UsersModule,
    ProjectsModule,
    BidsModule,
    MilestonesModule,
    MessagesModule,
    SkillsModule,
    CategoriesModule,
    AuthModule,
    CloudinaryConfigModule,
    EmailModule,
  ],
})
export class AppModule {}
