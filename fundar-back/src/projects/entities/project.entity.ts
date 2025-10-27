import { Category } from 'src/categories/entities/category.entity';
import { Donation } from 'src/donations/entities/donation.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  imageUrl: string;

  @Column()
  status: 'active' | 'inactive';

  @OneToMany(() => Donation, donation => donation.project)
  donations: Donation[];

  @ManyToOne(() => Category, (category) => category.projects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
