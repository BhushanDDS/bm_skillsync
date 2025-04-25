import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 
'typeorm';
import { User } from '../../users/user.entity/user.entity';
import { Bid } from '../../bids/bid.entity/bid.entity';
import { Milestone } from '../../milestones/milestone.entity/milestone.entity';
import { Message } from '../../messages/message.entity/message.entity';
import { Skill } from '../../skills/skill.entity/skill.entity';
import { Category } from '../../categories/categorie.entity/categorie.entity';


@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.clientProjects)
  client: User;

  @ManyToOne(() => User, (user) => user.freelanceProjects, { nullable: true })
  freelancer: User;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  budget: number;

  @Column()
  deadline: Date;

  @ManyToOne(() => Category, (category) => category.projects)
  category: Category;
  
  @Column()
  status: string; // 'open', 'assigned', 'completed'

  @OneToMany(() => Skill, (skill) => skill.project)
  skills: Skill[];

  @OneToMany(() => Bid, (bid) => bid.project)
  bids: Bid[];

  @OneToMany(() => Milestone, (milestone) => milestone.project)
  milestones: Milestone[];

  @OneToMany(() => Message, (msg) => msg.project)
  messages: Message[];
}
