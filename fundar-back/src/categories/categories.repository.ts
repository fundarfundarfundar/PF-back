import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  private categories = [
    {
      id: '1',
      name: 'Category 1',
    },
    {
      id: '2',
      name: 'Category 2',
    },
    {
      id: '3',
      name: 'Category 3',
    },
  ];

  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  async getCategories() {
    return this.categoriesRepository.find();
  }

  async getCategoryById(id: string) {
    return this.categoriesRepository.findOne({ where: { id } });
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    await this.categoriesRepository.update(id, updateCategoryDto);
    return this.categoriesRepository.findOne({ where: { id } });
  }

  async deleteCategory(id: string) {
    await this.categoriesRepository.delete(id);
  }
}
