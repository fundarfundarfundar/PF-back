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
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 404, description: 'Users not found' })
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'User UUID' })
  @ApiResponse({
  status: 200,
  description: 'User found',
  schema: {
    example: {
      id: 'b1e7e6c2-1234-4cde-8a2b-123456789abc',
      name: 'John Doe',
      email: 'john@example.com',
      city: 'New York',
      country: 'USA',
      phone: '1234567890',
      birthDate: '2000-01-01T00:00:00.000Z',
      address: '123 Main St',
      imageUrl: 'https://example.com/avatar.jpg',
      role: 'user',
      provider: null,
      donations: [],
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async findOne(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'User UUID' })
  @ApiBody({ type: CreateUserDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUser: CreateUserDto,
  ) {
    return await this.usersService.update(id, updateUser);
  }

  //para cambiar el role desde admin
  @Put(':id/role')
  @ApiOperation({ summary: 'Update user role by ID (admin only)' })
  @ApiParam({ name: 'id', type: 'string', description: 'User UUID' })
  @ApiBody({ schema: { properties: { role: { type: 'string', enum: ['admin', 'user'] } } } })
  async updateRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('role') role: 'admin' | 'user',
  ) {
    return await this.usersService.updateRole(id, role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'User UUID' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.usersService.remove(id);
  }
}
