import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  InternalServerErrorException,
  ConflictException,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() credentials: LoginUserDto) {
    try {
      const { email, password } = credentials;
      return await this.authService.signIn(email, password);
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof InternalServerErrorException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
    }
  }

  @Post('signup')
  async signUp(@Body() createUser: CreateUserDto) {
    try {
      return await this.authService.signUp(createUser);
    } catch (error) {
      if (
        error instanceof InternalServerErrorException ||
        error instanceof ConflictException
      ) {
        throw error;
      }
    }
  }

  @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {}

 @Get('google/callback')
@UseGuards(AuthGuard('google'))
async googleAuthRedirect(@Req() req) {

  const profile = req.user;
  const email = profile.emails[0].value;
  const name = profile.displayName;

  const user = await this.authService.findOrCreateGoogleUser(email, name);

  return {
    message: 'Inicio de sesión con Google exitoso',
    user,
  };
}
}
