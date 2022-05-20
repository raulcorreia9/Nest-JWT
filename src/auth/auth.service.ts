import { JwtPayload } from './models/jwt-payload.model';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { User } from 'src/users/models/users.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User')
        private readonly usersModel: Model<User>
    ) {}

    public async createAcessToken(userId: string): Promise<string> {
        return sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
        })
   }

   public async validateUser(jwtPayload: JwtPayload): Promise<User> {
       const user = await this.usersModel.findOne({ _id: jwtPayload.userId});
       if(!user) {
           throw new UnauthorizedException('User not found.');
       }

       return user;
   }

   private static jwtExtractor(requests: Request): string {
       const authHeader = requests.headers.authorization;

       if(!authHeader) {
           throw new BadRequestException('Bad request.')
       }

       //Destructering do authHeader = 'Bearer[0] meuToken[1]'
       const [bearer, token] = authHeader.split(' ');

       return token;
   }

   public returnJwtExtractor(): (request: Request) => string {
       return AuthService.jwtExtractor;
   }
}
