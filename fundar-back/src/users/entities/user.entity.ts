import { Donation } from 'src/donations/entities/donation.entity';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column() // <-- RELACIÓN CON 'DONATIONS' UNO A MUCHOS (hay q cambiar el decorador y su configuracion {} para crear la relación OneToMany())
  donations: Donation[];
}
