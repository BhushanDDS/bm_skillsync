import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from '../../projects/project.entity/project.entity';
import { User } from '../../users/user.entity/user.entity'; 

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Project, (project) => project.messages)
  project: Project;

  @ManyToOne(() => User, (user) => user.messages)
  sender: User;

  @Column('text')
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ nullable: true })
  attachment: string; // Optional file (PDF, image, etc.)
}

