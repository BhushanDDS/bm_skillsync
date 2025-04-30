import { IsOptional, IsString } from "class-validator";

export class UpdateProfile{
    

        name:string
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