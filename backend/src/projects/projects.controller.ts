import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CookieAuthGuard } from 'src/auth/auth.guard';
import { UserId } from './commons/user.decorator';
import { CreateProjectDto } from './dto/project-dto';
import { UpdateProjectDto } from './dto/update-project-dto';
import { Roles } from './commons/role.decorator';
import { UserRole } from './commons/get-role-decorator';


@UseGuards(CookieAuthGuard)
@Controller('projects')
export class ProjectsController {
constructor(private readonly projectsService: ProjectsService) {}

//create a project 
@Post()
create( @UserId() userId: number,@Body() dto: CreateProjectDto ) {
  return this.projectsService.create(userId, dto);
}

@Get('get-projects')
getAllProjects(@UserId() userId: number) {
  console.log('userId received:👈', userId); // 👈 Add this
  return this.projectsService.getAllProjects(userId);

}

//get open projects ----freelancr
  @Get()
  findAllOpen() {
    return this.projectsService.findAllOpen();
  }

//Get a  project 
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  return this.projectsService.findOne(id);
}

//update a project
@Put(':id')
  update(
    @Param('id',ParseIntPipe) id: number,
    @Body() dto: UpdateProjectDto,
    @UserId() userId: number
  ) {
    return this.projectsService.update(id, userId, dto);
  }


  //deltet
  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number, @UserId() userId:number) {
    return this.projectsService.remove(id,userId);
  }

  //assighn a project to a freelancer
  @Put(':id/assign/:freelancerId')
  assignFreelancer(
    @Param('id', ParseIntPipe) projectId: number,
    @Param('freelancerId',ParseIntPipe) freelancerId: number,
    @UserId() userId:number
  ) {
    return this.projectsService.assignFreelancer(
      projectId,
      userId,
      freelancerId
    );
  }

@Post('test')
// @UseGuards(CookieAuthGuard)
createProject( @UserId() userId: number,@UserRole() userRole: string[] ) {
  console.log(userRole);
  console.log(userId);
}


}
