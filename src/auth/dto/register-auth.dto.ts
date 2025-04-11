import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export enum UserRole {
    Musician = "musician",
    Band = "band",
    Admin = "admin",
}
export class RegisterAuthDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @Length(6, 20)
    password: string;

    @IsEmail()
    email: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    edad?: number;

    @IsOptional()
    provincia: string;

    @IsOptional()
    phone?: string;

    @IsString()
    instagram: string;

    @IsOptional()
    profilePhoto: string;

    @IsOptional()
    banner: string;

}