import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from "src/users/schemas/user.schema";
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("register")
  async register(@Body() CreateUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(CreateUserDto);
  }
}
