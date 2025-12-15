import { Controller, Post, Body, Req, UseGuards, Get, Query, Param } from '@nestjs/common';
import { CreateAdDto } from './dto/create-ad.dto';
import { BandService } from './band.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { FilterAdsDto } from './dto/filter-ads.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('bands')
export class BandController {
  constructor(private readonly bandService: BandService) { }

  @Post('ads')
  @Roles(UserRole.Band)
  async createAd(@Body() createAdDto: CreateAdDto, @Req() req: any) {
    console.log('🎯 BandController - req.user:', req.user);
    const bandId = req.user.userId;
    return this.bandService.createAd(bandId, createAdDto);
  }

  @Get('ads')
  async getAds(@Req() req: any) {
    return this.bandService.getFilteredAds(req.query);
  }

  @Get("ads/:id/applications")
  @Roles(UserRole.Band)
  async getAdApplications(
    @Param("id") adId: string,
  ) {
    return this.bandService.getAdApplications(adId);
  }
}
