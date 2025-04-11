import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ discriminatorKey: "role", timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, unique: true })
    email: string;

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
                    band: { type: String, default: " " },
                    instrument: { type: String, default: " " },
                    photoYear: Number,
                },
            },
        ],
        default: [],
    })
    multimedia: {
        url: string;
        description: {
            band?: string;
            instrument?: string;
            photoYear: number;
        };
    }[];
}

export const UserSchema = SchemaFactory.createForClass(User);