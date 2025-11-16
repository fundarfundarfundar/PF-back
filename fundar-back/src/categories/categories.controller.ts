import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Category } from './entities/category.entity';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
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
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List all categories', type: [Category] })
  getCategories() {
    return this.categoriesService.getCategories();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Category ID (UUID)' })
  @ApiResponse({ status: 200, description: 'Get category by ID', type: Category })
  GetCategoryById(@Param('id') id: string) {
    return this.categoriesService.GetCategoryById(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Category ID (UUID)' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ status: 200, description: 'Category updated successfully', type: Category })
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Category ID (UUID)' })
  @ApiResponse({ status: 204, description: 'Category deleted successfully' })
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.deleteCategory(id);
  }
}