import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsStrongPassword({
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
  })
  @Matches(/^[A-Za-z\d!@#$%^&*]+$/, {
    message:
      'Password can only contain the following symbols: !@#$%^&*',
  })
  @Matches(/[!@#$%^&*]/, {
    message: 'TPassword must contain at least one symbol: !@#$%^&*',
  })
  password: string;
}
