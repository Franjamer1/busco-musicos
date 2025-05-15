import { IsEnum, IsOptional, IsString } from "class-validator";
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
    @IsString()
    search?: string;
}