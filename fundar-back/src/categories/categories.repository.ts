import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesRepository {
  private categories = [
    {
      id: 1,
      categoryName: 'Category 1',
    },
    {
      id: 2,
      categoryName: 'Category 2',
    },
    {
      id: 3,
      categoryName: 'Category 3',
    },
  ];

  async getCategories() {
    return this.categories;
  }
}
