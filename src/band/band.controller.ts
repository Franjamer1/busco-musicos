import { Controller, Get, Post, Req, Body, UseGuards } from '@nestjs/common';
import { BandService } from './band.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('bands')
export class BandController {
  constructor(private readonly bandService: BandService) { }

  @Post("ads")
  async createAd(@Body() createAdDto: CreateAdDto, @Req() req: any) {
    const bandId = req.user.userId;
    return this.bandService.createAd(bandId, createAdDto);
  }
}
