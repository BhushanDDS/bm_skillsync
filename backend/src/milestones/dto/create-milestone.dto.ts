import { IsNotEmpty, IsString, IsDateString, IsIn, IsNumber } from 'class-validator';

export class CreateMilestoneDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  dueDate: string;

  @IsString()
  @IsIn(['main', 'support'])
  type: string = 'main';

  @IsNotEmpty()
  @IsNumber()
  projectId: number;
}
