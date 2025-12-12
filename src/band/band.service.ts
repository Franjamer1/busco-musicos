import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { CreateAdDto } from './dto/create-ad.dto';
import { Genre } from 'src/common/enums/genre.enum';

@Injectable()
export class BandService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }

  async createAd(bandId: string, createAdDto: CreateAdDto) {
    const BandModel = this.userModel.discriminators?.["band"];

    if (!BandModel) {
      throw new Error(`Discriminador "band" no esta definido`);
    };

    const band = await BandModel.findById(bandId);
    if (!band) {
      throw new NotFoundException("Banda no encontrada");
    };

    const ad = {
      ...createAdDto,
      createdAt: new Date(),
      applicants: [],
    };

    band.ads.push(ad);
    await band.save();

    return band.ads[band.ads.length - 1]; //return the last ad recently created
  }

  async getFilteredAds(filters: {
    province?: string;
    instrument?: string;
    genre?: Genre;
    search?: string;
  }) {
    const BandModel = this.userModel.discriminators?.['band'];
    if (!BandModel) throw new Error('Discriminador "band" no definido');

    const bands = await BandModel.find().select('username profilePhoto socialLinks ads').lean();

    const anuncios = [];

    for (const band of bands) {
      const adsFiltrados = band.ads.filter((ad) => {
        const matchProvince = filters.province ? ad.province?.toLowerCase() === filters.province.toLowerCase() : true;
        const matchInstrument = filters.instrument ? ad.instrument?.toLowerCase() === filters.instrument.toLowerCase() : true;
        const matchGenre = filters.genre ? ad.genre === filters.genre : true;
        const matchSearch = filters.search
          ? (ad.title + ad.description).toLowerCase().includes(filters.search.toLowerCase())
          : true;

        return matchProvince && matchInstrument && matchGenre && matchSearch;
      });

      for (const ad of adsFiltrados) {
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
  };



  async applyToAd(adId: string, musicianId: string, message?: string) {
    const BandModel = this.userModel.discriminators?.['band'];
    if (!BandModel) throw new Error('Discriminador "band" no definido');

    // buscar banda que contiene el anuncio
    const band = await BandModel.findOne({ 'ads._id': adId });
    if (!band) throw new NotFoundException('Anuncio no encontrado');

    const ad = band.ads.id(adId);

    // evitar duplicados
    const alreadyApplied = ad.applicants?.some((a) => a.musicianId === musicianId);
    if (alreadyApplied) {
      throw new BadRequestException('Ya te postulaste a este anuncio');
    }

    // agregar postulante
    ad.applicants = ad.applicants || [];

    ad.applicants.push({
      musicianId,
      message,
      createdAt: new Date(),
    });

    await band.save();

    return { message: 'Postulación enviada con éxito' };
  }


}


// async createAd(bandId: string, createAdDto: CreateAdDto) {
//   const BandModel = this.userModel.discriminators?.['band'];
//   if (!BandModel) {
//     throw new Error('El discriminador "band" no está definido');
//   }

//   const band = await BandModel.findById(bandId);
//   if (!band) {
//     throw new NotFoundException('Banda no encontrada');
//   }

//   const ad = {
//     ...createAdDto,
//     createdAt: new Date(),
//   };

//   band.ads.push(ad);
//   await band.save();
//   return band;
// }

// async getFilteredAds(filters: {
//   province?: string;
//   instrument?: string;
//   genre?: Genre;
//   search?: string;
// }) {
//   const { province, instrument, genre, search } = filters;

//   const BandModel = this.userModel.discriminators?.['band'];
//   if (!BandModel) {
//     throw new Error('Discriminador "band" no definido');
//   }

//   const bands = await BandModel.find().select('username profilePhoto socialLinks ads').lean();

//   const anuncios = [];

//   for (const band of bands) {
//     const anunciosFiltrados = band.ads.filter((ad) => {
//       const matchProvince = province ? ad.province?.toLowerCase() === province.toLowerCase() : true;
//       const matchInstrument = instrument ? ad.instrument?.toLowerCase() === instrument.toLowerCase() : true;
//       const matchGenre = genre ? ad.genre === genre : true;
//       const matchSearch = search
//         ? (ad.title + ad.description).toLowerCase().includes(search.toLowerCase())
//         : true;

//       return matchProvince && matchInstrument && matchGenre && matchSearch;
//     });

//     for (const ad of anunciosFiltrados) {
//       anuncios.push({
//         ...ad,
//         band: {
//           _id: band._id,
//           username: band.username,
//           profilePhoto: band.profilePhoto,
//           socialLinks: band.socialLinks,
//         },
//       });
//     }
//   }

//   return anuncios;
// }

// async applyToAd(adId: string, musicianId: string, message?: string) {
//   const BandModel = this.userModel.discriminators?.["band"];

//   if (!BandModel) {
//     throw new Error(`El discriminador "band" no esta definido`);
//   };

//   //Buscar la bana que contiene el ad
//   const band = await BandModel.findOne({ "ads._id": adId });

//   if (!band) {
//     throw new NotFoundException("Anuncio no encontrado");
//   };

//   const ad = band.ads.id(adId);

//   //evitar mas de una postulacion por musico
//   const alreadyApplied = ad.applicants.some((a) => a.musicianId === musicianId)

//   if (alreadyApplied) {
//     throw new BadRequestException("Ya te postulaste a este anuncio");
//   }

//   //agregar postulacion
//   ad.applicants.push({
//     musicianId,
//     message,
//     createdAt: new Date(),
//   });

//   await band.save();
//   return { message: "Postulacion enviada con éxito" };

// }
// }


