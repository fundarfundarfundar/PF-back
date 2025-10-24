import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class FileUpload {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  type: 'photo' | 'video' | 'document';

  @Column() // <-- RELACIÓN CON 'PROJECT' UNO A UNO (hay q cambiar el decorador y su configuracion {} para crear la relación OneToOne())
  projectId?: string;

  @Column() // <-- RELACIÓN CON 'USER' UNO A UNO (hay q cambiar el decorador y su configuracion {} para crear la relación OneToOne())
  userId?: string;
}
