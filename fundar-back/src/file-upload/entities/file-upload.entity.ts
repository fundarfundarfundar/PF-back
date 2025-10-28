import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FileUpload {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  type: 'photo' | 'video' | 'document';

  @ManyToOne(() => Project, project => project.id, { nullable: true })
  project?: Project;

  @ManyToOne(() => User, user => user.id, { nullable: true })
  user?: User;
}
