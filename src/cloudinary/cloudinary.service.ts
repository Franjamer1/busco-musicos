import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Readable } from 'stream';
import toStream = require('buffer-to-stream');
@Injectable()
export class CloudinaryService {
    constructor(private configService: ConfigService) {
        cloudinary.config({
            cloud_name: this.configService.get<string>("CLOUDINARY_NAME"),
            api_key: this.configService.get<string>("CLOUDINARY_API_KEY"),
            api_secret: this.configService.get<string>("CLOUDINARY_API_SECRET"),
        });
    }

    async uploadImage(file: Express.Multer.File, folder = "busco-musicos"): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
                { folder },
                (error, result) => {
                    if (error) return reject(error);
                    return resolve(result);
                },
            );
            toStream(file.buffer).pipe(upload);
        });
    }

    async deleteImage(publicId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) return reject(error);
                resolve();
            })
        })
    }
}
