// src/projects/dto/create-project.dto.ts
import { IsArray, IsDateString, IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  budget: number;

  @IsDateString()
  deadline: string;

  @IsArray()
  @IsString({ each: true })
  skills: string[]; // Array of skill names

  // @IsNumber()
  // category:number;

}
