import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Instrument } from "src/common/enums/instrument.enum";
import { Province } from "src/common/enums/province.enum";
import { Genre } from "src/common/enums/genre.enum";

@Schema()
export class Band extends User {
    @Prop()
    bio: string;

    @Prop()
    website: string;

    @Prop({ type: [String], default: [] })
    socialLinks: string[];

    //futuro:relacion con anuncios de busqueda de musicos
    @Prop({
        type: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
                genre: {
                    type: String,
                    enum: Object.values(Genre),
                    required: true,
                },
                instrument: {
                    type: String,
                    enum: Object.values(Instrument),
                    required: true,
                },
                province: {
                    type: String,
                    enum: Object.values(Province),
                    required: false,
                },
                createdAt: { type: Date, default: Date.now },
            },
        ],
        default: [],
    })
    ads: {
        title: string;
        description: string;
        genre: Genre;
        instrument: Instrument;
        province?: Province;
        createdAt: Date;
    }[];
}

export const BandSchema = SchemaFactory.createForClass(Band);
