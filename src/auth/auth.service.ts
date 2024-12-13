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
  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) {}

  async signUp(signUpDto: SignupDto): Promise<{ token: string }> {
    const { name, email, password,role } = signUpDto;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({ name, email, password: hashPassword ,role});
    const tokenPayload = { id: user.id };
    const token = this.jwtService.sign(tokenPayload);
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Invalid email or password');
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new UnauthorizedException('Invalid password');
    const tokenPayload = { id: user.id };
    const token = this.jwtService.sign(tokenPayload);
    return { token };
  }
}
