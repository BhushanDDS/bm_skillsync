import { Body, Controller, Get, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';


@Controller('users')
export class UsersController {



    // @Get()
    // getUserById(@UserId() userId:number){
    //     return this.userservice.findById(userId);
    // }

  //   @Patch('/update-profile')
  //   updateProfile(@UserId()userId:number,@Body()dto:UpdateProfile){
  //       return this.userservice.updateUser(userId,dto);
  //   }

  //   @Post('/upload-profile')
  //   @UseInterceptors(FileInterceptor('file'))
  //  async uploadProfilePicture(
  //   @UserId()userId:number,
  //   @UploadedFile() file:Express.Multer.File,
  //  ){

  //   if (!file) {
  //       throw new Error('No file uploaded');
  //     }
  
  //     // File URL is provided by Cloudinary via multer
  //     const fileUrl = file.path;
  //     const milestone = await this.userservice.updateMilestoneFile(
  //       userId,
  //       fileUrl
  //     );
  
  //     return {
  //       message: 'File uploaded successfully',
  //       milestone,
  //     };
  


  //   }
}
