import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

config();
console.log("MongoDB URI manual:", process.env.MONGODB_URI);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //con esto habilito la validacion de DTOs
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
}
bootstrap();
