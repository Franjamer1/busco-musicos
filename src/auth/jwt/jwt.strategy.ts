import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        // Devolvés estos datos al req.user
        console.log("✅ JWT Strategy fue ejecutado");
        console.log("🐛 validate() payload:", payload);
        return {
            userId: payload.sub,
            username: payload.username,
            role: payload.role,
        };
    }
}


// import { Injectable, UnauthorizedException } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt, Strategy } from "passport-jwt";

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//     constructor(private configService: ConfigService) {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ignoreExpiration: false,
//             secretOrKey: configService.get<string>("JWT_SECRET"),
//         });
//     }

// async validate(payload: any) {
//     return { userId: payload.sub, username: payload.username, role: payload.role }
// }

//     async validate(payload: any) {
//         console.log("JWT Strategy payload:", payload);
//         return {
//             // userId: payload.sub,
//             _id: payload.sub,
//             username: payload.username,
//             role: payload.role, // <-- esto es clave
//         };
//     }
// }