import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  // @IsNotEmpty()
  // @IsString()
  // @MinLength(3)
  // @MaxLength(80)
  address?: string;

  // @IsNotEmpty()
  // @IsNumber()
  // @IsString()
  phone?: string;

  // @IsString()
  // @MinLength(5)
  // @MaxLength(20)
  country?: string;

  // @IsString()
  // @MinLength(5)
  // @MaxLength(20)
  city?: string;

  // @IsNotEmpty()
  // @IsDateString()
  birthDate?: Date;

  // @IsNotEmpty()
  // @IsString()
  role?: 'admin' | 'user';
}
