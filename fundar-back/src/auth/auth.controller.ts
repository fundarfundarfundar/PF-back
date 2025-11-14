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
import { EmailService } from 'src/email/email.service'; 

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService
  ) {}

  @Post('signin')
  async signIn(@Body() credentials: LoginUserDto) {
    try {
      const { email, password } = credentials;
      const result = await this.authService.signIn(email, password);
      return result;
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
     const user = await this.authService.signUp(createUser);
     
      await this.emailService.sendMail(
        user.user.email,
        'Welcome to Fundar.',
        `Hello ${user.user.firstName} ${user.user.lastName}, thank you for registering!`
      );

      return user;
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
  const displayName = profile.displayName;
  const [firstName, ...lastNameParts] = displayName.split(' ');
  const lastName = lastNameParts.join(' ');

  const user = await this.authService.findOrCreateGoogleUser(email, firstName, lastName);

  const token = await this.authService.generateJwtToken(user);

 return res.redirect(
  `http://localhost:3000/google-success?token=${token}&email=${encodeURIComponent(email)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&role=${encodeURIComponent(user.role ?? 'user')}`
);

}
}
