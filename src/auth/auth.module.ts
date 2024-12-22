import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from '../book/schemas/book.schema';
import {User, UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { AuthGuardd } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
     inject:[ConfigService],         //inject the config module
       useFactory:(configService:ConfigService):Promise<JwtModuleOptions> | JwtModuleOptions => ({
         secret:configService.get<string>('JWT_SECRET'),
         signOptions: { expiresIn: configService.get<string|number>('JWT_EXPIRE')},
       })
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,JwtModule,AuthGuardd, RolesGuard],
  exports:[JwtStrategy,PassportModule,JwtModule,AuthGuardd, RolesGuard,MongooseModule]
})
export class AuthModule {}
