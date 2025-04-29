import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMessageDto {

    @IsString()
    content: string;
    @IsNumber()
    projectId: number;
    @IsString()
  
    @IsString()
    @IsOptional()
    attachment?: string;
  }