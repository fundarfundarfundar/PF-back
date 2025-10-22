import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  private users = [
    {
      id: '1',
      name: 'Máximo',
      email: 'maximo@mail.com',
      password: 'Contraseña1234!',
      city: 'Santa Fe',
      cellphone_number: '1234 567890',
      birthdate: new Date(),
      address: 'Calle Falsa 1234',
      role: 'admin',
      donations: [],
    },
    {
      id: '2',
      name: 'Francisco',
      email: 'maximosposetti@mail.com',
      password: 'Contraseña1234!',
      city: 'Buenos Aires',
      cellphone_number: '4321 098765',
      birthdate: new Date(),
      address: 'Calle Falsa 4321',
      role: 'admin',
      donations: [],
    },
    {
      id: '3',
      name: 'Julio',
      email: 'maximosposetti@mail.com',
      password: 'Contraseña1234!',
      city: 'Misiones',
      cellphone_number: '6789 012345',
      birthdate: new Date(),
      address: 'Calle Falsa 2134',
      role: 'admin',
      donations: [],
    },
    {
      id: '4',
      name: 'Piero',
      email: 'piero@mail.com',
      password: 'Contraseña1234!',
      city: 'Mendoza',
      cellphone_number: '9012 345678',
      birthdate: new Date(),
      address: 'Calle Falsa 4312',
      role: 'admin',
      donations: [],
    },
  ];

  async getUsers() {
    return this.users;
  }
}
