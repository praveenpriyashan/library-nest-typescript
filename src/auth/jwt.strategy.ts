import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as process from 'process';


// this is for any incomming requests check the token
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
    console.log('constructor in the JwtStrategy')
  }

  async validate(payload) {
    console.log('validate fuction')
    const { id } = payload;
    const user = await this.userModel.findById(id);
    if (!user) throw new UnauthorizedException('login first to access this end point')
    return user;
  }
}
