import { Controller, Get, Post, Body, Param, Delete, Put, ParseUUIDPipe, Req, UnauthorizedException } from '@nestjs/common';
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
  async findOne(@Param('id') id:string){
      return await this.usersService.getUserById(id)
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateUser: CreateUserDto,
    // @Req() req
    ){
      // if (req.user.id !== id && req.user.role !== 'admin') {
      //  throw new UnauthorizedException('No puedes actualizar el perfil de otro usuario');
      // }
    return await this.usersService.update(id, updateUser);
    }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string){
    return await this.usersService.remove(id)
  }

}
