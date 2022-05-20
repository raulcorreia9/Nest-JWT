import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, AuthModule, MongooseModule.forRoot(process.env.MONGO_URI)],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
