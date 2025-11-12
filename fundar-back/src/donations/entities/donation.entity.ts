import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Donation {

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  amount: number;

  @ApiProperty()
  @Column()
  date: Date;

  @ApiProperty()
  @Column()
  paymentMethod: string;

  @ManyToOne(() => User, user => user.donations)
  user: User;

  @ManyToOne(() => Project, project => project.donations)
  project: Project;
}
