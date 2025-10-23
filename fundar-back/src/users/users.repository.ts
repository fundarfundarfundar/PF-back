import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  async getUsers() {
    return this.usersRepository.find();
  }

  async getUserById(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOneBy({ id });
  }

  async deleteUser(id: string) {
    return await this.usersRepository.delete(id);
  }
}
