import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from '../schemas/user.schema'
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class AuthGuardd implements CanActivate {      //AthGuardd kiyala nama demme passportJwt eket e namama thiayaa hinda
  constructor(@InjectModel(User.name) private userModel: Model<User>,private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    console.log('start the authguardd')

    // Check for Authorization header
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('no authorization token provided')
      throw new UnauthorizedException('No authorization token provided');
    }
    console.log(' authHeader provided')


    const token = authHeader.split(' ')[1]; // Extract the token
    if (!token){
      console.log('no token in authheader')
      throw new UnauthorizedException('no token in authheader');
    }
    console.log(`token: ${token}`)


    // Verify the JWT token
    try {
      const payload = await this.jwtService.verifyAsync(token);
      if (!payload){
        throw new UnauthorizedException('Token validation failed')
      };
      console.log('payload hear')
      const { id } = payload;
      console.log(`id ${id}`)
      const user = await this.userModel.findById(id);

      request['user'] = user; // Attach user info to the request
      console.log('end the authguardd')
      return true;

    } catch (error) {
      console.log('invalid or expired token '+error)
      throw new UnauthorizedException('Invalid or expired token  '+error.message);
    }
  }
}






// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';
// import { User } from '../schemas/user.schema'
// import { InjectModel } from '@nestjs/mongoose';
// import mongoose, { Model } from 'mongoose';
//
// @Injectable()
// export class AuthGuardd implements CanActivate {
//   constructor(
//     @InjectModel('User') private readonly userModel: Model<any>,
//     private readonly jwtService: JwtService,
//   ) {}
//
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const token = request.headers['authorization']?.split(' ')[1];
//
//     if (!token) {
//       return false;
//     }
//
//     try {
//       const decoded = this.jwtService.verify(token);
//       const user = await this.userModel.findById(decoded.id);
//       if (!user) {
//         return false;
//       }
//
//       request.user = user; // Attach user to the request
//       return true;
//     } catch (err) {
//       return false;
//     }
//   }
// }
