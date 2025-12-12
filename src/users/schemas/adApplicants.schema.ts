import { Prop, SchemaFactory } from "@nestjs/mongoose";

export class AdApplication {
    @Prop({ required: true })
    musicianId: string;

    @Prop()
    message: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const AdApplicationSchema = SchemaFactory.createForClass(AdApplication);
