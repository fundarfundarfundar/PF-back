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
  Res,
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
async googleAuthRedirect(@Req() req, @Res() res) {

  const profile = req.user;
  const email = profile.emails[0].value;
  const name = profile.displayName;

  const user = await this.authService.findOrCreateGoogleUser(email, name);

  const token = await this.authService.generateJwtToken(user);

  return res.redirect(
      `http://localhost:3000/google-success?token=${token}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`
    );

    //  if (req.query.redirect === 'true') {
    //    return res.redirect(
    //      `http://localhost:3000/google-success?token=${token}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`
    //    );
    //  }

    // Responde igual que /auth/signin
    //  return res.json({
    //    statusCode: 200,
    //    message: 'Login successful',
    //    result: {
    //      access_token: token,
    //      user: {
    //        id: user.id,
    //        email: user.email,
    //        role: user.role,
    //        name: user.name,
    //      },
    //    },
    //  });

}
}
