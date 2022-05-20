import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Responsável por fazer as validações do class-validator(anotações do DTO)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
