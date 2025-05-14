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

  async getFilteredAds(filters: {
    province?: string;
    instrument?: string;
    search?: string;
  }) {
    const { province, instrument, search } = filters;

    const BandModel = this.userModel.discriminators?.['band'];
    if (!BandModel) {
      throw new Error('Discriminador "band" no definido');
    }

    // Traemos solo campos necesarios para mostrar los anuncios
    const bands = await BandModel.find().select('username profilePhoto socialLinks ads').lean();

    const anuncios = [];

    for (const band of bands) {
      const anunciosFiltrados = band.ads.filter((ad) => {
        const matchProvince = province ? ad.province?.toLowerCase() === province.toLowerCase() : true;
        const matchInstrument = instrument ? ad.instrument?.toLowerCase() === instrument.toLowerCase() : true;
        const matchSearch =
          search
            ? (ad.title + ad.description).toLowerCase().includes(search.toLowerCase())
            : true;

        return matchProvince && matchInstrument && matchSearch;
      });

      for (const ad of anunciosFiltrados) {
        anuncios.push({
          ...ad,
          band: {
            _id: band._id,
            username: band.username,
            profilePhoto: band.profilePhoto,
            socialLinks: band.socialLinks,
          },
        });
      }
    }

    return anuncios;
  }



}