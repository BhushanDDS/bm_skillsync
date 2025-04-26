import { CreateProjectDto } from "./project-dto";
import { PartialType } from '@nestjs/swagger';
export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
