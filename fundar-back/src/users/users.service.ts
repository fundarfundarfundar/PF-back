import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUsers() {
    return this.usersRepository.getUsers();
  }

  async getUserById(id: string): Promise<User | null> {
    return this.usersRepository.getUserById(id);
  }

  async update(id: string, updateUser: CreateUserDto) {
    return await this.usersRepository.update(id, updateUser);
  }
  async remove(id: string) {
    return await this.usersRepository.delete(id);
  }
}
