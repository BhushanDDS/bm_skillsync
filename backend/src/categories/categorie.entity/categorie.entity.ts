import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Project } from '../../projects/project.entity/project.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // 'music', 'website', 'app', 'advertisement', etc.

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Project, (project) => project.category)
  projects: Project[];
}
