import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    const result = await this.authService.singIn(email, password);
    return {
      message: `Inicio de sesión exitoso `,
      result,
    };
  }

  @Post('signup')
  async signUp(@Body() createUser: CreateUserDto) {
    return await this.authService.signUp(createUser);
  }
}
