import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

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
   async signUp(user: CreateUserDto) {
        const userFound = await this.usersRepository.findByEmail(user.email);
        if (userFound) {
            return 'El usuario ya existe';
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        if(!hashedPassword) {
            return 'Error al hashear la contraseña';
        }

        await this.usersRepository.addOne({
            ...user,
            password: hashedPassword,
        })

        const { password, ...userWithoutPassword } = user; 
        
        return userWithoutPassword; 
    }
  }

 
