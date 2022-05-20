import { UsersSchema } from './schemas/user.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'User',
        schema: UsersSchema,
      }
    ]),
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
