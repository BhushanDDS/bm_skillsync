import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/message-dto';
import { UserId } from 'src/projects/commons/user.decorator';
import { CookieAuthGuard } from 'src/auth/auth.guard';

@UseGuards(CookieAuthGuard)
@Controller('messages')
export class MessagesController {

    constructor(private readonly messagesService: MessagesService) {}

    @Post()
    create(@Body() createMessageDto: CreateMessageDto, @UserId() userId:number) {
      return this.messagesService.create(createMessageDto, userId);
    }

  
    @Get('project/:projectId')
    findByProject(@Param('projectId',ParseIntPipe) projectId: number) {
      return this.messagesService.findByProject(projectId);
    }
}
