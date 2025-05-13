import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/users/schemas/user.schema';
import { RegisterAuthDto, UserRole } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterAuthDto): Promise<User> {
        const { username, email, password, role } = registerDto;

        //evitar que se registre un admin desde el endpoint publico
        if (role === UserRole.Admin) {
            throw new ForbiddenException("No esta permitido crear usuarios con rol de administrador.")
        }

        //verificacion de que el usuario o email ya existen
        const existingUser = await this.userService.findByUsernameOrEmail(username, email)
        if (existingUser) {
            throw new ConflictException("El usuario o email ya estan registrados.");
        }

        //Hasheo de contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //creacion del usuario con la contraseña encriptada
        const newUser = await this.userService.create({
            ...registerDto,
            password: hashedPassword,
        });
        return newUser;
    }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findByUsername(username) as UserDocument;
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user.toObject();
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user._id, role: user.role };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
