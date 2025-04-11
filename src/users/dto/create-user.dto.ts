import { IsString, IsEmail, MinLength, IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    edad?: number;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    instagram?: string;

    @IsOptional()
    profilePhoto?: string;

    @IsOptional()
    banner?: string;

    @IsOptional()
    multimedia?: {
        url: string;
        description: {
            band: string;
            instrument: string;
            photoYear: number;
        };
    }[];

    @IsEnum(["musician", "band"])
    role: "musician" | "band";
}
