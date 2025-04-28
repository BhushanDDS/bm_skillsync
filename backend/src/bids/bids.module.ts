import { Module } from '@nestjs/common';
import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectsModule } from 'src/projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bid } from './bid.entity/bid.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  
  imports:[AuthModule,UsersModule ,ProjectsModule,TypeOrmModule.forFeature([Bid])],
  controllers: [BidsController],
  providers: [BidsService]
})
export class BidsModule {}
