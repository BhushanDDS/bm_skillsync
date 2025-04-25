import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../../projects/project.entity/project.entity';
import { User } from '../../users/user.entity/user.entity';

@Entity('bids')
export class Bid {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.bids)
  project: Project;

  @ManyToOne(() => User, (user) => user.bids)
  freelancer: User;

  @Column()
  amount: number;

  @Column()
  duration: string;

  @Column('text')
  message: string;
}

