import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectsRepository {

  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto) {
    const newProject = this.projectsRepository.create(createProjectDto);
    return await this.projectsRepository.save(newProject);
  }

  async getProjects() {
    return await this.projectsRepository.find();
  }

  async getProjectById(id: string) {
    return await this.projectsRepository.findOneBy({ id });
  }

  async updateProject(id: string, updateProjectDto: UpdateProjectDto) {
    await this.projectsRepository.update(id, updateProjectDto);
    return await this.projectsRepository.findOneBy({ id });
  }

  async filterProjectsByCategory(categoryId: string) {
    return await this.projectsRepository.find({
      where: { categoryId },
    });
  }

  async deleteProject(id: string) {
    return await this.projectsRepository.delete(id);
  }
}
