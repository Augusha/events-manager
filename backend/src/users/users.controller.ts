import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../entities/user';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { RoleGuard } from '../auth/role.guard';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('list')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('contacts')
  getContacts() {
    return this.userService.getContacts();
  }

  @Get('')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit = 10,
    @Query('sortField') sortField: string,
    @Query('sortOrder') sortOrder: string,
  ): Promise<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;
    return this.userService.paginate({
      page,
      limit,
      route: 'http://localhost:3000/users/',
      sortField,
      sortOrder,
    });
  }

  @UseGuards(RoleGuard)
  @Post('delete-user')
  deleteUser(@Body() deleteUserDto: { userId: number }) {
    return this.userService.deleteUser(deleteUserDto.userId);
  }

  @UseGuards(RoleGuard)
  @Post('update-user')
  updateUser(@Body() updateUserDto: Record<string, any>) {
    return this.userService.updateUser(
      updateUserDto.userId,
      updateUserDto.email,
      updateUserDto.password,
      updateUserDto.firstname,
      updateUserDto.lastname,
      updateUserDto.position,
      updateUserDto.role,
      updateUserDto.profileImageId,
      updateUserDto.image,
    );
  }

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
