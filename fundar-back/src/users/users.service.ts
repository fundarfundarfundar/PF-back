import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  // createUser(createUserDto: CreateUserDto) {
  //   return this.usersRepository.createUser(createUserDto);
  // }

  async getUsers() {
    return this.usersRepository.getUsers();
  }

  async getUserById(id: string) : Promise<User| null>  {
    return this.usersRepository.getUserById(id)
  }

  // updateUser(id: string, updateUserDto: UpdateUserDto) {
  //   return this.usersRepository.updateUser(id, updateUserDto);
  // }

  // deleteUser(id: string) {
  //   return this.usersRepository.deleteUser(id);
  // }
}
