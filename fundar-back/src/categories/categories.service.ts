import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  createCategory(createCategoryDto: CreateCategoryDto) {
    return this.categoriesRepository.createCategory(createCategoryDto);
  }

  getCategories() {
    return this.categoriesRepository.getCategories();
  }

  GetCategoryById(id: string) {
    return this.categoriesRepository.getCategoryById(id);
  }

  updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesRepository.updateCategory(id, updateCategoryDto);
  }

  deleteCategory(id: string) {
    return this.categoriesRepository.deleteCategory(id);
  }
}
