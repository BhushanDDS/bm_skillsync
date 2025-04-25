import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Project } from '../../projects/project.entity/project.entity';
import { Bid } from '../../bids/bid.entity/bid.entity';
import { Milestone } from '../../milestones/milestone.entity/milestone.entity';
import { Message } from '../../messages/message.entity/message.entity';
import { Skill } from '../../skills/skill.entity/skill.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  category: string; 

  @Column()
  password: string;

  @Column('simple-array')
  role: string[]; // 'client' or 'freelancer'

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  profileImage: string;

  @OneToMany(() => Skill, (skill) => skill.user)
  skills: Skill[];

  @OneToMany(() => Project, (project) => project.client)
  clientProjects: Project[];

  @OneToMany(() => Project, (project) => project.freelancer)
  freelanceProjects: Project[];

  @OneToMany(() => Bid, (bid) => bid.freelancer)
  bids: Bid[];

  @OneToMany(() => Milestone, (milestone) => milestone.createdBy)
  createdMilestones: Milestone[];

  @OneToMany(() => Message, (msg) => msg.sender)
  messages: Message[];
}
