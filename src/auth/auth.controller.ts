import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from "src/users/schemas/user.schema";
import { RegisterAuthDto } from './dto/register-auth.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("register")
  async register(@Body() registerDto: RegisterAuthDto): Promise<User> {
    return this.authService.register(registerDto);
  }

  @Post("login")
  async login(@Body() body: { username: string, password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      throw new UnauthorizedException("Credenciales invalidas");
    }
    return this.authService.login(user);
  }
}
