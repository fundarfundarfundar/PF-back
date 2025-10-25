import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @Column()
  paymentMethod: string;

  @ManyToOne(() => User, user => user.donations)
  user: User;

  @ManyToOne(() => Project, project => project.donations)
  project: Project;
}
