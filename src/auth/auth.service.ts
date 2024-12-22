import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { Book } from '../book/schemas/book.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) {
    console.log('constructor in the AuthService')
  }

  async signUp(signUpDto: SignupDto): Promise<{ token: string }> {
    console.log('start the signup method  in the AuthService')
    const { name, email, password,role } = signUpDto;
    console.log('name ,email ,password here')
    const hashPassword = await bcrypt.hash(password, 10);
    console.log('hashPassword here')
    const user = await this.userModel.create({ name, email, password: hashPassword ,role});
    console.log('create user here')
    const tokenPayload = { id: user.id };
    const token = this.jwtService.sign(tokenPayload);
    console.log('crate token')
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    console.log('name ,email ,password here')
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid email or password');
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new UnauthorizedException('Invalid password');
    const tokenPayload = { id: user.id };
    const token = this.jwtService.sign(tokenPayload);
    return { token };
  }
}
