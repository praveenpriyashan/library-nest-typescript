import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { Book } from '../book/schemas/book.schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private jwtService: JwtService) {}

  async signUp(signUpDto:SignupDto):Promise<string> {
    const { name, email, password } = signUpDto;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({ name, email, password: hashPassword });
    const tokenPayload={id:user.id}
    const token=this.jwtService.sign(tokenPayload)
    return "token:"+token;
  }
}
