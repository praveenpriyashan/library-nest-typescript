import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from '../book/schemas/book.schema';
import {User, UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
     inject:[ConfigService],
       useFactory:(configService:ConfigService):Promise<JwtModuleOptions> | JwtModuleOptions => ({
         secret:configService.get<string>('JWT_SECRET'),
         signOptions: { expiresIn: configService.get<string>('JWT_EXPIRE')},
       })
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
