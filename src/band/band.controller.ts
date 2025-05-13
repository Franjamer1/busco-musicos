import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { CreateAdDto } from './dto/create-ad.dto';
import { BandService } from './band.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';

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
}
