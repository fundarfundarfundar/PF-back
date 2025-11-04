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

  @Column({  length: 180 })
  resume: string;

  @Column({ length: 600 })
  description: string;

  @Column()
  country: string;

  @Column({ type: 'float', default: 0 })
  goalAmount: number;

  @Column({nullable: true, type: 'float', default: 0 })
  currentAmount: number;

  @Column('text', { array: true, default: [] })
  imageUrls: string[];

  @Column({nullable: true, default: 'active' })
  status: 'active' | 'inactive';

  @Column({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'category_id', nullable: true  })
  categoryId?: string;

  @OneToMany(() => Donation, (donation) => donation.project)
  donations: Donation[];

  @ManyToOne(() => Category, (category) => category.projects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
