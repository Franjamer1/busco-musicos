import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards, UseInterceptors, UploadedFile, Req, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMultimediaDto } from './dto/create-multimedia.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { query } from 'express';

@UseGuards(AuthGuard("jwt"))
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  //foto de perfil(para todo tipo de usuarios)
  @Post("upload/profile-photo")
  @UseInterceptors(FileInterceptor("file"))
  async uploadProfilePhoto(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    const userId = req.user.userId;

    const uploadResult = await this.cloudinaryService.uploadImage(file);

    return this.usersService.updateProfilePhoto(userId, uploadResult.secure_url);

  }

  @Post("upload/banner")
  @UseInterceptors(FileInterceptor("file"))
  async uploadBanner(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    const userId = req.user.userId

    const uploadResult = await this.cloudinaryService.uploadImage(file);

    return this.usersService.updateBanner(userId, uploadResult.secure_url);

  }

  @Post("upload/multimedia")
  @UseInterceptors(FileInterceptor("file"))
  async uploadMultimedia(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateMultimediaDto,
    @Req() req: any,
  ) {
    const userId = req.user.userId;
    const uploadResult = await this.cloudinaryService.uploadImage(file);

    return this.usersService.addMultimedia(userId, uploadResult.secure_url, body.tipo, {
      band: body.band,
      instrument: body.instrument,
      year: body.year
    });
  }

  @Post("register")
  create() {
    throw new BadRequestException("Usa /auth/register para crear usuarios")
  }

  @Get()
  findAll(@Query() query: any) {
    if (query.id) {
      throw new BadRequestException("Este endpoint no acepta ?id=. Usa GET /users/:id para buscar un usuario por id")
    }
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

}
