import { IsNotEmpty, IsIn } from 'class-validator';

export class FileUploadDto {
  @IsNotEmpty()
  @IsIn(['invoice', 'deliverable'])
  fileType: string;
}