import { IsEnum, IsOptional, IsString } from "class-validator";
import { Genre } from "src/common/enums/genre.enum";
import { Instrument } from "src/common/enums/instrument.enum";
import { Province } from "src/common/enums/province.enum";

export class FilterAdsDto {
    @IsOptional()
    @IsEnum(Province)
    province?: Province;

    @IsOptional()
    @IsEnum(Instrument)
    instrument?: Instrument;

    @IsOptional()
    @IsEnum(Genre)
    genre?: Genre;

    @IsOptional()
    @IsString()
    search?: string;
}