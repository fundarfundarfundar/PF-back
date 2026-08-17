import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async findByName(name: string) {
    return await this.categoriesRepository.findOne({
      where: { name },
    });
  }

 async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const existing = await this.findByName(createCategoryDto.name);

      if (existing) {
        throw new ConflictException(
          `There is already a category with the name ${createCategoryDto.name}`,
        );
      }

      const category = this.categoriesRepository.create(createCategoryDto);

      return await this.categoriesRepository.save(category);
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

  async getCategories() {
    try {
      return this.categoriesRepository.find();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Error retrieving categories';

      throw new InternalServerErrorException(
        `Error retrieving categories: ${message}`,

      );
    }
  }

  async getCategoryById(id: string) {
    try {
      const category = await this.categoriesRepository.findOne({
        where: { id },
      });
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} was not found`);
      }
      return category;
    } catch  (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      const message =
        error instanceof Error
          ? error.message
          : 'Error searching for category';

      throw new InternalServerErrorException(
        `Error searching for category: ${message}`,

      );
    }
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoriesRepository.findOne({
        where: { id },
      });
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} was not found`);
      }

      await this.categoriesRepository.update(id, updateCategoryDto);
      return await this.categoriesRepository.findOne({ where: { id } });
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      const message =
        error instanceof Error ? error.message : 'Error updating category';

      throw new InternalServerErrorException(
        `Error updating category: ${message}`,

      );
    }
  }

  async deleteCategory(id: string) {
    try {
      const result = await this.categoriesRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Category with ID ${id} was not found`);
      }
      return { message: `Category with ID ${id} successfully deleted.` };
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      const message =
        error instanceof Error ? error.message : 'Error deleting category';

      throw new InternalServerErrorException(
        `Error deleting the category: ${message}`,

      );
    }
  }
}
