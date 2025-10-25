import { IsDateString, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, IsStrongPassword, Matches, Max, MaxLength, Min, MinLength } from "class-validator"

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)  
    name: string
    
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @IsStrongPassword({
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
    })
    @Matches(/^[A-Za-z\d!@#$%^&*]+$/, {
        message: 'La contraseña solo puede contener los siguientes símbolos: !@#$%^&*',
    })
    @Matches(/[!@#$%^&*]/, {
        message: 'La contraseña debe contener al menos un símbolo: !@#$%^&*',
    })
    password: string
    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string

    @IsNotEmpty()
    @IsNumber()
    phone: string

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string

    @IsNotEmpty()
    @IsDateString()
    birthDate: Date;

}