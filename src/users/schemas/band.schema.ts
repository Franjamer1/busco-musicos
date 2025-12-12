import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Instrument } from "src/common/enums/instrument.enum";
import { Province } from "src/common/enums/province.enum";
import { Genre } from "src/common/enums/genre.enum";
import { Types } from "mongoose";
import { Ad, AdSchema } from "./ad.schema";

@Schema()
export class Band extends User {
    @Prop()
    bio: string;

    @Prop()
    website: string;

    @Prop({ type: [String], default: [] })
    socialLinks: string[];

    @Prop({ type: [AdSchema], default: [] })
    ads: Ad[];
}

export const BandSchema = SchemaFactory.createForClass(Band);
