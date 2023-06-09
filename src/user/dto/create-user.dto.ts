import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    name: string;
    
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
    
    role: string
}
