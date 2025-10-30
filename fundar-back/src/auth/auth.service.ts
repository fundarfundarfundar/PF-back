import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * - Error 401 si el email no existe o la contraseña es incorrecta.
   */
  async singIn(email: string, password: string) {
    const userFound = await this.usersRepository.findByEmail(email);

    if (!userFound) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid credentials',
        error: 'Unauthorized',
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, userFound.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid credentials',
        error: 'Unauthorized',
      });
    }

    const userPayload = {
      id: userFound.id,
      email: userFound.email,
      role: userFound.role,
    };

    const token = this.jwtService.sign(userPayload);

    return {
      statusCode: 200,
      message: 'Login successful',
      access_token: token,
      user: userPayload,
    };
  }

  /**
   * - Error 409 si el email ya está registrado.
   * - Error 500 si falla el hash de contraseña.
   */
  async signUp(user: CreateUserDto) {
    const userFound = await this.usersRepository.findByEmail(user.email);

    if (userFound) {
      throw new ConflictException({
        statusCode: 409,
        message: 'Email is already registered',
        error: 'Conflict',
      });
    }

    let hashedPassword: string;
    try {
      hashedPassword = await bcrypt.hash(user.password, 10);
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: 'Error hashing password',
        error: 'HashError',
      });
    }

    await this.usersRepository.addOne({
      ...user,
      password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = user;

    return {
      statusCode: 201,
      message: 'User successfully registered',
      user: userWithoutPassword,
    };
  }
}
