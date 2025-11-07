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
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  /**
   * - Error 401 si el email no existe o la contraseña es incorrecta.
   */
  async signIn(email: string, password: string) {
    const userFound = await this.usersRepository.findByEmail(email);

    if (!userFound) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Invalid credentials',
        error: 'Unauthorized',
      });
    }

    if (!userFound.password) {
      // El usuario no tiene contraseña (probablemente registrado con Google)
      throw new UnauthorizedException('This user must sign in with Google');
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
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      imageUrl: userFound.imageUrl,
    };

    const token = this.jwtService.sign({
      id: userFound.id,
      email: userFound.email,
      role: userFound.role,
    });

    return {
      statusCode: 200,
      message: 'Login successful',
      result: {
        access_token: token,
        user: userPayload,
      },
    };
  }

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

    const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(',') ?? [];
    
    const role = ADMIN_EMAILS.includes(user.email) ? 'admin' : 'user';

    const newUser = await this.usersRepository.addOne({
      ...user,
      password: hashedPassword,
    });

    const { password, ...userWithoutPassword } = newUser;

    return {
      statusCode: 201,
      message: 'User successfully registered',
      user: userWithoutPassword,
    };
  }

  // En src/auth/auth.service.ts
async findOrCreateGoogleUser(email: string, firstName: string, lastName: string): Promise<User> {
   let user = await this.usersRepository.findByEmail(email);
  if (!user) {
    user = await this.usersRepository.addOne({
      email,
      firstName,
      lastName,
      provider: 'google',
    });
  }
  return user;
}

 generateJwtToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

}
