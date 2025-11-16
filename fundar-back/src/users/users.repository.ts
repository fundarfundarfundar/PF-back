import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers() {
    return this.usersRepository.find({ relations: ['donations'] });
  }

  async getUserById(id: string) {
    return this.usersRepository.findOne({ 
      relations: ['donations'],
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return await this.usersRepository.findOneBy({ email });
    } catch (error) {
      throw new NotFoundException('Error searching user by email');
    }
  }
  async addOne(user: Partial<User>): Promise<User> {
    try {
      const newUser = await this.usersRepository.save(user);
      return newUser;
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Error adding user');
    }
  }

  async update(id: string, user: Partial<User>): Promise<Partial<User>> {
    try {
      await this.usersRepository.update(id, user);

      const updateUser = await this.usersRepository.findOneBy({ id });

      if (!updateUser) {
        throw new NotFoundException('User not found');
      }

      const { password, ...userWithoutPassword } = updateUser;

      return userWithoutPassword;
    } catch (error) {
      throw new NotFoundException('Error updating user');
    }
  }
  async findById(id: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async save(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async delete(id: string): Promise<Partial<User>> {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      this.usersRepository.remove(user);

      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    } catch (error) {
      throw new NotFoundException('Error deleting user');
    }
  }
}
