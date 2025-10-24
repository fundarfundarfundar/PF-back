import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
 
  private users : User[] = [
    {
      id: '1',
      name: 'Máximo',
      email: 'maximo@mail.com',
      password: 'Contraseña1234!',
      city: 'Santa Fe',
      country: 'argentina',
      phone: '1234 567890',
      birthdate: new Date('1990-01-01'),
      address: 'Calle Falsa 1234',
      role: 'admin',
      // donations: [],
    },
    {
      id: '2',
      name: 'Francisco',
      email: 'maximosposetti@mail.com',
      password: 'Contraseña1234!',
      city: 'Buenos Aires',
      country: 'argentina',
      phone: '4321 098765',
      birthdate: new Date('1990-01-01'),
      address: 'Calle Falsa 4321',
      role: 'admin',
      // donations: [],
    },
    {
      id: '3',
      name: 'Julio',
      email: 'maximosposetti@mail.com',
      password: 'Contraseña1234!',
      city: 'Misiones',
      country: 'argentina',
      phone: '6789 012345',
      birthdate: new Date('1990-01-01'),
      address: 'Calle Falsa 2134',
      role: 'admin',
      // donations: [],
    },
    {
      id: '4',
      name: 'Piero',
      email: 'piero@mail.com',
      password: 'Contraseña1234!',
      city: 'Mendoza',
      country: 'argentina',
      phone: '9012 345678',
      birthdate: new Date('1990-01-01'),
      address: 'Calle Falsa 4312',
      role: 'admin',
      // donations: [],
    },
  ];

  async getUsers() {
    return this.users;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  } // habria que modificarlo luego de implementar typeorm
 
  async findOne(id: string) {
      return this.users.find(user => user.id === id);
  }
}
