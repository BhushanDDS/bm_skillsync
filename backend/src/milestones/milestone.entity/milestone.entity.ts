import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../../projects/project.entity/project.entity';
import { User } from '../../users/user.entity/user.entity';

@Entity('milestones')
export class Milestone {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.milestones)
  project: Project;

  @Column()
  title: string;

  @Column()
  dueDate: Date;

  @Column({ default: 'pending' })
  status: string; // 'pending', 'complete', 'paid'

  @Column({ default: 'main' })
  type: string; // 'main' or 'support'

  @Column({ nullable: true })
  invoiceFile: string;

  @Column({ nullable: true })
  deliverableFile: string;

  @ManyToOne(() => User, (user) => user.createdMilestones)
  createdBy: User;
}

