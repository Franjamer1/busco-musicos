import { Module } from '@nestjs/common';
import { MusicianService } from './musician.service';
import { MusicianController } from './musician.controller';
import { BandService } from 'src/band/band.service';
import { BandModule } from 'src/band/band.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [BandModule, UsersModule],
  controllers: [MusicianController],
  providers: [MusicianService],
})
export class MusicianModule { }
