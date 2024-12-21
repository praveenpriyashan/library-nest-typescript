import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signupDto:SignupDto):Promise<{token:string}>{
    console.log(' sign up method called in controller');
    return this.authService.signUp(signupDto);
  }

  @Post('login')
  login(@Body() loginDto:LoginDto):Promise<{token:string}>{
    console.log('login method called in controller');
    return this.authService.login(loginDto);
  }
}


