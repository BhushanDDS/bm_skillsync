import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/user.entity/user.entity';
import { Project } from '../../projects/project.entity/project.entity'; 

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.skills, { nullable: true, onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Project, (project) => project.skills, { nullable: true, onDelete: 'CASCADE' })
  project: Project;
}
