import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    edad: number;

    @Prop()
    provincia: string;

    @Prop()
    phone?: string;

    @Prop()
    instagram?: string;

    @Prop({ default: " " })
    profilePhoto: string;

    @Prop({ default: " " })
    banner: string;

    @Prop({
        type: [
            {
                url: String,
                description: {
                    band: String,
                    instrument: String,
                    photoYear: Number,
                },
            },
        ],
        default: [],
    })
    multimedia: {
        url: string;
        description: {
            band: string;
            instrument: string;
            photoYear: number;
        };
    }[];

    @Prop({ required: true, enum: ["musician", "band", "admin"], default: "musician" })
    role: "musician" | "band" | "admin";
}

export const UserSchema = SchemaFactory.createForClass(User);