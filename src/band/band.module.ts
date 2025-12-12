import { Module } from '@nestjs/common';
import { BandService } from './band.service';
import { BandController } from './band.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [BandController],
  providers: [BandService],
  exports: [BandService],
})
export class BandModule { }
