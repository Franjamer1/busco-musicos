import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsIn } from 'class-validator';

export class CreateMultimediaDto {
    @IsOptional()
    @IsString()
    band?: string;

    @IsOptional()
    @IsString()
    instrument?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    year?: number;

    @IsString()
    @IsIn(["foto", "video"])
    tipo: "foto" | "video";
}