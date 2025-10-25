import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // createUser(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.createUser(createUserDto);
  // }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id:string){
      return await this.usersService.getUserById(id)
  }

  // @Put(':id')
  // updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.updateUser(id, updateUserDto);
  // }

  // @Delete(':id')
  // deleteUser(@Param('id') id: string) {
  //   return this.usersService.deleteUser(id);
  // }
}
