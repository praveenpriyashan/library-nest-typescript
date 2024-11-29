import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';


export class SignupDto {

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({})
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5,{message:'Please enter a valid password'})
  readonly password: string;
}