import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterAuthDto, UserRole } from 'src/auth/dto/register-auth.dto';


@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }


  async create(userData: RegisterAuthDto): Promise<User> {
    const { role } = userData;

    // ¡Ojo! Acá usamos `this.userModel.discriminators` para acceder a los modelos
    const discriminatorModel = this.userModel.discriminators?.[role];
    if (discriminatorModel) {
      return new discriminatorModel(userData).save();
    }

    // Si el rol no tiene discriminador, usar el modelo base
    return new this.userModel(userData).save();
  }


  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findByRole(role: UserRole): Promise<User[]> {
    return this.userModel.find({ role }).exec();
  }

  async updateProfilePhoto(userId: string, photoUrl: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { profilePhoto: photoUrl },
      { new: true },
    );
  }

  async updateBanner(userId: string, bannerUrl: string) {
    return this.userModel.findByIdAndUpdate(
      userId,
      { banner: bannerUrl },
      { new: true },
    );
  }

  async addMultimedia(userId: string, url: string, tipo: "foto" | "video", description: any) {
    return this.userModel.findByIdAndUpdate(
      userId,
      {
        $push: {
          multimedia: { url, tipo, description },
        },
      },
      { new: true }
    );
  }

  async findByUsernameOrEmail(username: string, email: string): Promise<User | null> {
    return this.userModel.findOne({
      $or: [{ username }, { email }],
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username });
  }
}
