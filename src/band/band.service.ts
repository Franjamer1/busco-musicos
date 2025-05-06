import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { CreateAdDto } from './dto/create-ad.dto';

@Injectable()
export class BandService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }

  async createAd(bandId: string, createAdDto: CreateAdDto) {
    const BandModel = this.userModel.discriminators?.['band'];
    if (!BandModel) {
      throw new Error('El discriminador "band" no está definido');
    }

    const band = await BandModel.findById(bandId);
    if (!band) {
      throw new NotFoundException('Banda no encontrada');
    }

    const ad = {
      ...createAdDto,
      createdAt: new Date(),
    };

    band.ads.push(ad);
    await band.save();
    return band;
  }
}