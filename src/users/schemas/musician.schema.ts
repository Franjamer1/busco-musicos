import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";

@Schema()
export class Musician extends User {
    @Prop()
    edad: number;

    @Prop()
    name: string;
}

export const MusicianSchema = SchemaFactory.createForClass(Musician);