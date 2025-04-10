import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) { }

    async register(createUserDto: CreateUserDto): Promise<User> {
        const { username, email, password } = createUserDto;

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
            ...createUserDto,
            password: hashedPassword,
        });
        return newUser;

    }
}
