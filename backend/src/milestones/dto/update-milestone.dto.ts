import { IsOptional, IsString, IsDateString, IsIn } from 'class-validator';

export class UpdateMilestoneDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsString()
  @IsIn(['pending', 'complete', 'paid'])
  status?: string;

  @IsOptional()
  @IsString()
  @IsIn(['main', 'support'])
  type?: string;

  @IsOptional()
  @IsString()
  invoiceFile?: string;

  @IsOptional()
  @IsString()
  deliverableFile?: string;
}

