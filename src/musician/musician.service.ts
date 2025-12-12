import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class MusicianService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    ) { }
    async getMusicianApplications(musicianId: string) {
        const BandModel = this.userModel.discriminators?.["band"];
        if (!BandModel) throw new Error('Discriminador "band" no definido');

        const bands = await BandModel.find().lean();

        const results = [];

        for (const band of bands) {
            for (const ad of band.ads) {
                if (!ad.applicants) continue;

                ad.applicants.forEach(app => {
                    if (app.musicianId === musicianId) {
                        results.push({
                            bandId: band._id,
                            bandName: band.username,
                            adId: ad._id,
                            adTitle: ad.title,
                            message: app.message,
                            date: app.createdAt || app.date,
                        });
                    }
                });
            }
        }

        return results;
    }
}
