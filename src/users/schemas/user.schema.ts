import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserRole } from "src/auth/dto/register-auth.dto";

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

    @Prop({ required: true, enum: UserRole })
    role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);