import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';


export class LoginDto {

  @IsNotEmpty()
  @IsEmail({},{message:'please enter a valid email address'})
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3,{message:'Please enter a valid password'})
  readonly password: string;
}