import { IsOptional, IsString } from "class-validator";

export class ApplyAdDto {
    @IsOptional()
    @IsString()
    message?: string;
}