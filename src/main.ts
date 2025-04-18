import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

config();
console.log("MongoDB URI manual:", process.env.MONGODB_URI);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // tu frontend Vite
    credentials: true, // si necesitás cookies o headers con auth
  })
  //con esto habilito la validacion de DTOs
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
}
bootstrap();
