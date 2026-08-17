import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './categories.repository';
import categoriesData from './utils/data.json';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoriesRepository.createCategory(createCategoryDto);      
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Error creating category';

      throw new InternalServerErrorException(message);
    }
  }

  async seedCategories() {
    try {
      const createdCategories: Category[] = [];
      const skippedCategories: string[] = [];

      for (const categoryData of categoriesData) {
        const existingCategory =
          await this.categoriesRepository.findByName(categoryData.name);

        if (existingCategory) {
          skippedCategories.push(categoryData.name);
          continue;
        }

        const createdCategory =
          await this.categoriesRepository.createCategory(categoryData);

        createdCategories.push(createdCategory);
      }

      return {
        message: 'Categories seeded successfully',
        created: createdCategories,
        skipped: skippedCategories,
    };
    } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Error seeding categories';

    throw new InternalServerErrorException(message);
  }
  }


  async getCategories() {
    try {
      return await this.categoriesRepository.getCategories();     
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Error fetching categories';

      throw new InternalServerErrorException(message);
    }
  }

  async GetCategoryById(id: string) {
    try {
      return await this.categoriesRepository.getCategoryById(id);      
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Error fetching category';

      throw new InternalServerErrorException(message);
    }
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.categoriesRepository.updateCategory(id, updateCategoryDto);   
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Error updating category';

      throw new InternalServerErrorException(message);
    }
  }

  async deleteCategory(id: string) {
    try {
      return await this.categoriesRepository.deleteCategory(id); 
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Error deleting category';

      throw new InternalServerErrorException(message);
    }
  }
}
