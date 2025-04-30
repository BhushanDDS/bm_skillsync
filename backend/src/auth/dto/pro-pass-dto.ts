// update-profile.dto.ts
export class UpdateProfile {
    name?: string;
    bio?: string;
  }
  
  // change-password.dto.ts
  export class ChangePasswordDto {
    oldPassword: string;
    newPassword: string;
  }