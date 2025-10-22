import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesRepository {
  private categories = [
    {
      id: 1,
      name: 'Category 1',
    },
    {
      id: 2,
      name: 'Category 2',
    },
    {
      id: 3,
      name: 'Category 3',
    },
  ];

  async getCategories() {
    return this.categories;
  }
}
