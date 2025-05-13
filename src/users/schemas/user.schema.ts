import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserRole } from "src/common/enums/user-role.enum";

export type UserDocument = User & Document;

@Schema({ discriminatorKey: "role", timestamps: true })
export class User {
    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, enum: UserRole })
    role: UserRole;

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
                url: { type: String, required: true },
                tipo: { type: String, enum: ["foto", "video"], required: true },
                description: {
                    band: { type: String },
                    instrument: { type: String },
                    year: Number,
                },
            },
        ],
        default: [],
    })
    multimedia: {
        url: string;
        tipo: "foto" | "video",
        description: {
            band?: string;
            instrument?: string;
            year?: number;
        };
    }[];
}

export const UserSchema = SchemaFactory.createForClass(User);