import { IsOptional, IsString } from "class-validator";

export class UpdateProfile{
    

        @IsOptional()
        @IsString()
        bio?:string;
    
        @IsString()
        @IsOptional()
        password?:string;
    
        @IsString()
        @IsOptional()
        profileImage:string;
    
}