import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsRepository {
  private projects = [
    {
      id: 1,
      title: 'Proyecto 1',
      description: 'Descripción 1',
      date: new Date(),
      categoryId: "1",
      imageUrl: 'https://...',
      statusIsCompleted: true,
    },
    {
      id: 2,
      title: 'Proyecto 2',
      description: 'Descripción 2',
      date: new Date(),
      categoryId: "2",
      imageUrl: 'https://...',
      statusIsCompleted: false,
    },
    {
      id: 1,
      title: 'Proyecto 3',
      description: 'Descripción 3',
      date: new Date(),
      categoryId: "3",
      imageUrl: 'https://...',
      statusIsCompleted: false,
    },
  ];

  async getProjects() {
    return this.projects;
  }
}
