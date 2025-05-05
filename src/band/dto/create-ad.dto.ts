import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAdDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    instrument: string;

    @IsString()
    @IsOptional()
    province?: string;
}