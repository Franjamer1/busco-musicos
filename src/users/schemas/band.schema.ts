import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";

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
                instrument: { type: String, required: true },
                province: { type: String },
                createdAt: { type: Date, default: Date.now },
            },
        ],
        default: [],
    })
    ads: {
        title: string;
        description: string;
        instrument: string;
        province?: string;
        createdAt: Date;
    }[];
}

export const BandSchema = SchemaFactory.createForClass(Band);
