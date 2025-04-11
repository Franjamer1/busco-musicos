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
}

export const BandSchema = SchemaFactory.createForClass(Band);
