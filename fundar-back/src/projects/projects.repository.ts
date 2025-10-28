import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsRepository {
  private projects = [
    {
      id: '1',
      title: 'Proyecto 1',
      description: 'Descripción 1',
      date: new Date(),
      categoryId: '1',
      imageUrl: 'https://...',
      statusIsCompleted: true,
    },
    {
      id: '2',
      title: 'Proyecto 2',
      description: 'Descripción 2',
      date: new Date(),
      categoryId: '2',
      imageUrl: 'https://...',
      statusIsCompleted: false,
    },
    {
      id: '3',
      title: 'Proyecto 3',
      description: 'Descripción 3',
      date: new Date(),
      imageUrl: 'https://...',
      status: 'active',
      categoryId: '3',
    },
  ];

  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto) {
    const newProject = this.projectsRepository.create(createProjectDto);
    return this.projectsRepository.save(newProject);
  }

  async getProjects() {
    return this.projectsRepository.find();
  }

  async getProjectById(id: string) {
    return this.projectsRepository.findOneBy({ id });
  }

  async updateProject(id: string, updateProjectDto: UpdateProjectDto) {
    await this.projectsRepository.update(id, updateProjectDto);
    return this.projectsRepository.findOneBy({ id });
  }

  async deleteProject(id: string) {
    return this.projectsRepository.delete(id);
  }
}
