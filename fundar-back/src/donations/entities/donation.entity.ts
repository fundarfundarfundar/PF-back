import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column() // <-- RELACIÓN CON 'USER' UNO A UNO (hay q cambiar el decorador y su configuracion {} para crear la relación OneToOne())
  userId: string;

  @Column() // <-- RELACIÓN CON 'PROJECT' UNO A UNO (hay q cambiar el decorador y su configuracion {} para crear la relación OneToOne())
  projectId: string;
}
