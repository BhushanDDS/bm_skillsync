import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MilestonesService } from './milestones.service';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';
import { CloudinaryConfigService } from '../config/cloudinary.config';
import { Request } from 'express';
import { Multer } from 'multer';
import { CookieAuthGuard } from 'src/auth/auth.guard';
import { UserId } from 'src/projects/commons/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api')
@UseGuards(CookieAuthGuard)
export class MilestonesController {
  constructor(
    private  milestonesService: MilestonesService,
    private  cloudinaryConfigService: CloudinaryConfigService,   ) {}

  @Get('projects/:projectId/milestones')
  async getProjectMilestones(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.milestonesService.getProjectMilestones(projectId);
  }

  @Post('milestones')
  async createMilestone(
    @Body() createMilestoneDto: CreateMilestoneDto,
    @Req() request: Request,
    @UserId() userId:number
  ) {
    console.log(`in milestone `,userId);
    
    return this.milestonesService.createMilestone(createMilestoneDto, userId);
  }

  @Patch('milestones/:id')
  async updateMilestone(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMilestoneDto: UpdateMilestoneDto,
  ) {
    return this.milestonesService.updateMilestone(id, updateMilestoneDto);
  }

  @Post('milestones/:id/upload/:fileType')
  @UseInterceptors(FileInterceptor('file' ))
  async uploadFile(
    @Param('id', ParseIntPipe) id: number,
    @Param('fileType') fileType: 'invoice' | 'deliverable',
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    // File URL is provided by Cloudinary via multer
    const fileUrl = file.path;
    const milestone = await this.milestonesService.updateMilestoneFile(
      id,
      fileType,
      fileUrl,
    );

    return {
      message: 'File uploaded successfully',
      milestone,
    };
  }
}
