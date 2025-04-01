import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Opcional: para que las variables de entorno estén disponibles en toda la app
    }),
    UsersModule,
    MongooseModule.forRoot(process.env.MONGO_URI),  // Usamos la URI de MongoDB desde el archivo .env
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
