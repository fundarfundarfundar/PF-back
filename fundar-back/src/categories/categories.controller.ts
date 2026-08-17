import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
  ConflictException,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags, ApiBody, ApiResponse, ApiParam, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Category } from './entities/category.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Roles('admin')
  @ApiBody({
    description: 'Create a new category',
    type: CreateCategoryDto,
    examples: {
      example1: {
        summary: 'Basic category creation',
        value: {
          name: 'Health'
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Category created successfully', type: Category })
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoriesService.createCategory(createCategoryDto);    
    } catch (error: unknown) {
        if (error instanceof ConflictException) {
        throw error;
      }

      const message =
        error instanceof Error ? error.message : 'Error creating category';

      throw new InternalServerErrorException(
        `Error creating category: ${message}`,
      );
  }
  }

  @Get('seeder')
  @ApiOperation({ summary: 'Agrega categorias de prueba' })
  @ApiResponse({ status: 201, description: 'Categorias agregadas correctamente' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async addCategories() {
      try {
    return await this.categoriesService.seedCategories();
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Error seeding categories';

    throw new InternalServerErrorException(message);
  }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List all categories', type: [Category] })
  async getCategories() {
    try {
      return await this.categoriesService.getCategories();    
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Error fetching categories';

      throw new InternalServerErrorException(message);
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Category ID (UUID)' })
  @ApiResponse({ status: 200, description: 'Get category by ID', type: Category })
  async GetCategoryById(@Param('id') id: string) {
    try {
      return await this.categoriesService.GetCategoryById(id);     
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      const message =
        error instanceof Error ? error.message : 'Error fetching category';

      throw new InternalServerErrorException(message);
    }
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiParam({ name: 'id', description: 'Category ID (UUID)' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ status: 200, description: 'Category updated successfully', type: Category })
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      return await this.categoriesService.updateCategory(id, updateCategoryDto);      
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      const message =
        error instanceof Error ? error.message : 'Error updating category';

      throw new InternalServerErrorException(message);
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiParam({ name: 'id', description: 'Category ID (UUID)' })
  @ApiResponse({ status: 204, description: 'Category deleted successfully' })
  async deleteCategory(@Param('id') id: string) {
    try {
      return await this.categoriesService.deleteCategory(id);    
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      const message =
        error instanceof Error ? error.message : 'Error deleting category';

      throw new InternalServerErrorException(message);
    }
  }
}