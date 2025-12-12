import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Genre } from "src/common/enums/genre.enum";
import { Instrument } from "src/common/enums/instrument.enum";
import { Province } from "src/common/enums/province.enum";
import { AdApplication, AdApplicationSchema } from "./adApplicants.schema";

@Schema({ _id: true })
export class Ad {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true, enum: Object.values(Genre) })
    genre: Genre;

    @Prop({ required: true, enum: Object.values(Instrument) })
    instrument: Instrument;

    @Prop({ enum: Object.values(Province) })
    province?: Province;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({
        type: [
            {
                musicianId: { type: String, required: true },
                message: { type: String },
                date: { type: Date, default: Date.now },
            },
        ],
        default: [],
    })
    applicants: {
        musicianId: string;
        message?: string;
        date: Date;
    }[];
}

export const AdSchema = SchemaFactory.createForClass(Ad);