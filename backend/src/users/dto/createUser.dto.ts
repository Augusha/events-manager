import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  position: string;

  @IsString()
  role: string;

  @IsString()
  profileImageId?: number;

  @IsString()
  profileImage?: string;
}
