import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: CreateUserDto,
  ) {
    return await this.usersService.update(id, updateUser);
  }

  //para cambiar el role desde admin
  @Put(':id/role')
  async updateRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('role') role: 'admin' | 'user',
  ) {
    return await this.usersService.updateRole(id, role);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.remove(id);
  }
}
