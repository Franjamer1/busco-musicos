import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsArray,
    ValidateNested,
    IsNumber,
    Length,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserRole } from 'src/common/enums/user-role.enum';

// Multimedia nested DTO (usado por ambos tipos de usuario)
class MultimediaDescriptionDto {
    @IsOptional()
    @IsString()
    band?: string;

    @IsOptional()
    @IsString()
    instrument?: string;

    @IsNotEmpty()
    @IsNumber()
    year: number;
}

class MultimediaDto {
    @IsNotEmpty()
    @IsString()
    url: string;

    @ValidateNested()
    @Type(() => MultimediaDescriptionDto)
    description: MultimediaDescriptionDto;
}

// 👥 DTO principal
export class RegisterAuthDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsString()
    @Length(6, 20)
    password: string;

    @IsEmail()
    email: string;

    @IsEnum(UserRole)
    role: UserRole;

    // Campos comunes
    @IsOptional()
    @IsString()
    provincia?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    instagram?: string;

    @IsOptional()
    @IsString()
    profilePhoto?: string;

    @IsOptional()
    @IsString()
    banner?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MultimediaDto)
    multimedia?: MultimediaDto[];

    // Campos específicos de musician
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    edad?: number;

    // Campos específicos de band
    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    @IsString()
    website?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    socialLinks?: string[];
}
