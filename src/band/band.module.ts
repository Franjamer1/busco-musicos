import { Module } from '@nestjs/common';
import { BandService } from './band.service';
import { BandController } from './band.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [BandController],
  providers: [BandService],
})
export class BandModule { }
