import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { MusicianService } from './musician.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { ApplyAdDto } from './dto/applyAdd.dto';
import { BandService } from 'src/band/band.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('musician')
export class MusicianController {
  constructor(
    private readonly musicianService: MusicianService,
    private readonly bandService: BandService,
  ) { }

  //ApplyAd

  @Post("apply/:adId")
  @Roles(UserRole.Musician)
  applyToAd(@Param("adId") adId: string, @Req() req: any, @Body() applyDto: ApplyAdDto) {
    console.log("🔎 req.user:", req.user);
    const musicianId = req.user.userId;
    return this.bandService.applyToAd(adId, musicianId, applyDto.message);
  };

  //ver postulaciones de el musico logeado
  @Get("applications")
  @Roles(UserRole.Musician)
  getMyApplications(@Req() req: any) {
    const musicianId = req.user.userId;
    return this.musicianService.getMusicianApplications(musicianId);
  };
}
