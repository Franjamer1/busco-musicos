import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Genre } from "src/common/enums/genre.enum";
import { Instrument } from "src/common/enums/instrument.enum";
import { Province } from "src/common/enums/province.enum";

export class CreateAdDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(Genre)
    genre: Genre;

    @IsEnum(Instrument)
    instrument: Instrument;

    @IsOptional()
    @IsEnum(Province)
    province?: Province;
}