import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersSchema } from 'src/users/schemas/user.schemas';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UsersSchema,
      }
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION
      }
    })
  ],
  providers: [AuthService],
  //Exportação para conseguir utilizar AuthService em outros módulos
  exports: [AuthService]
})
export class AuthModule {}
