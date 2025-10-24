import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersRepository } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
      constructor(private readonly usersRepository: UsersRepository,
      private jwtService: JwtService,
    ){}

     async singIn(email: string, password: string){
        const userFound = await this.usersRepository.findByEmail(email)

        if (!userFound) {
          throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordMatch = await bcrypt.compare(password, userFound.password);

        if (!userFound || !isPasswordMatch) {
            return 'Credenciales incorrectas';
        }

        const userPayload = {
            id: userFound.id,
            email: userFound.email,
            role: userFound.role,
        }

        const token = this.jwtService.sign(userPayload);

        return {
            message: 'Login exitoso',
            access_token: token,
           user: userPayload,
          }
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
