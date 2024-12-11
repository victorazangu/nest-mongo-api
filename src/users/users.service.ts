import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from './helpers/password';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await hashPassword(createUserDto.password);
    const createdUser = await this.userModel.create(createUserDto);
    const userObject = createdUser.toObject();
    delete userObject.password;
    return userObject;
  }

  async findAll(query: object): Promise<User[]> {
    const filter = {};
    if (query['search']) {
      filter['name'] = new RegExp(query['search'], 'i');
    }
    return await this.userModel
      .find(filter)
      .select('-password')
      .skip(parseInt(query['skip']) || 0)
      .limit(parseInt(query['limit']) || 10);
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id }).select('-password');
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }
    return await this.userModel
      .findOneAndUpdate({ _id: id }, updateUserDto, {
        new: true,
      })
      .select('-password');
  }

  async remove(id: string): Promise<{ data: string }> {
    const result = await this.userModel.findOneAndDelete({ _id: id });

    if (!result) {
      return { data: 'User not found' };
    }
    return { data: `User with id ${id} has been deleted` };
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email });
  }
}
