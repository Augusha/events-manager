import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from '../entities/user';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Image } from '../entities/image';

export interface User {
  userId: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  position: string;
  role: string;
  profileImageId?: number;
  image?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private jwtService: JwtService,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    const userEntity = await this.userRepository.findOne({ where: { email } });
    if (!userEntity) {
      return undefined;
    }
    return {
      userId: userEntity.id,
      email: userEntity.email,
      password: userEntity.password,
      firstname: userEntity.firstname,
      lastname: userEntity.lastname,
      position: userEntity.position,
      role: userEntity.role,
      profileImageId: userEntity.profileImageId,
    };
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users.map((user) => ({
      userId: user.id,
      email: user.email,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      position: user.position,
      role: user.role,
      profileImageId: user.profileImageId,
    }));
  }

  async getContacts(): Promise<any[]> {
    const users = await this.userRepository.find();
    return users.map((user) => ({
      userId: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      position: user.position,
      role: user.role,
      profileImageId: user.profileImageId,
    }));
  }

  async paginate(
    options: IPaginationOptions & { sortField?: string; sortOrder?: string },
  ): Promise<Pagination<UserEntity>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    if (options.sortField && options.sortOrder) {
      queryBuilder.orderBy(
        `user.${options.sortField}`,
        options.sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC',
      );
    } else {
      queryBuilder.orderBy('user.id', 'DESC'); // Default sorting
    }

    return paginate<UserEntity>(queryBuilder, options);
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ access_token: string }> {
    const userExists: UserEntity = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (userExists) {
      throw new UnauthorizedException('User already exists');
    }

    if (createUserDto.profileImage !== '') {
      const newImage = this.imageRepository.create({
        image: createUserDto.profileImage,
      });
      const savedImage = await this.imageRepository.save(newImage);
      createUserDto.profileImageId = savedImage.id;
    }

    const newUser = this.userRepository.create(createUserDto);
    const payloadUser = await this.userRepository.save(newUser);
    const payload = {
      sub: payloadUser.id,
      email: payloadUser.email,
      firstname: payloadUser.firstname,
      lastname: payloadUser.lastname,
      position: payloadUser.position,
      role: payloadUser.role,
      profileImageId: payloadUser.profileImageId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async updateUser(
    userId: number,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    position: string,
    role: string,
    profileImageId?: number,
    image?: string,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    if (image !== '') {
      if (profileImageId === 0) {
        const newImage = this.imageRepository.create({ image: image });
        const savedImage = await this.imageRepository.save(newImage);
        profileImageId = savedImage.id;
      } else {
        const existingImage = await this.imageRepository.findOne({
          where: { id: profileImageId },
        });
        if (existingImage) {
          existingImage.image = image;
          await this.imageRepository.save(existingImage);
          console.log('Image updated');
        } else {
          const newImage = this.imageRepository.create({ image: image });
          const savedImage = await this.imageRepository.save(newImage);
          profileImageId = savedImage.id;
          console.log('No existing images, created new image');
        }
      }
    } else {
      console.log('No image provided');
    }

    user.email = email;
    user.password = password;
    user.firstname = firstname;
    user.lastname = lastname;
    user.position = position;
    user.role = role;
    user.profileImageId = profileImageId;

    await this.userRepository.save(user);

    return { message: 'User successfully updated' };
  }

  async deleteUser(userId: number): Promise<{ message: string }> {
    const userExists = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!userExists) {
      throw new Error('User not found');
    }

    await this.userRepository.delete(userId);

    return { message: 'User successfully deleted' };
  }

  async addNewUser(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    position: string,
    role: string,
  ): Promise<User | undefined> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      return undefined;
    }

    const newUser = this.userRepository.create({
      email,
      password,
      firstname,
      lastname,
      position,
      role,
    });

    await this.userRepository.save(newUser);

    return {
      userId: newUser.id,
      email: newUser.email,
      password: newUser.password,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      position: newUser.position,
      role: newUser.role,
      profileImageId: 0,
    };
  }
}
