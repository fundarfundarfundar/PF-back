import { Donation } from 'src/donations/entities/donation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @Column()
  phone: string;

  @Column()
  birthDate: Date;

  @Column()
  address: string;

  @Column()
  role: 'admin' | 'user';

  @OneToMany(() => Donation, donation => donation.user)
  donations?: Donation[];
}
