import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
 constructor(
   @InjectRepository(User) private usersRepository: Repository<User>,
 ) {}

  // async createUser(createUserDto: CreateUserDto) {
  //   const newUser = this.usersRepository.create(createUserDto);
  //   return this.usersRepository.save(newUser);
  // }

 async getUsers() {
   return this.usersRepository.find();
 }

 async getUserById(id: string) {
   return this.usersRepository.findOneBy({ id });
 }

  // async updateUser(id: string, updateUserDto: UpdateUserDto) {
  //   await this.usersRepository.update(id, updateUserDto);
  //   return this.usersRepository.findOneBy({ id });
  // }

  // async deleteUser(id: string) {
  //   return await this.usersRepository.delete(id);
  // }

  async findByEmail(email: string): Promise<User | null> {
        try {
            return await this.usersRepository.findOneBy({email})

        } catch (error) {
            throw new NotFoundException('Error al buscar el usuario por email')
        }
    }
  async addOne(user: Partial<User>): Promise<Omit<User, 'password'>>{
        try {
            // const newUser = this.usersRepository.create(user);

            const newUser = await this.usersRepository.save(user)
    
            const {password, ...userWithoutPassword } = newUser
    
            return userWithoutPassword
            
        } catch (error) {
            console.error(error); 
            throw new NotFoundException('Error al agregar el usuario');
}

  }
 
}
