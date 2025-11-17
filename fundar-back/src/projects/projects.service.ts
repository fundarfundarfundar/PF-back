import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  constructor(private projectsRepository: ProjectsRepository) {}

  async createProject(createProjectDto: CreateProjectDto) {
    return await this.projectsRepository.createProject(createProjectDto);
  }

  async getProjects() {
  return await this.projectsRepository.getProjects();
}

  async getProjectById(id: string) {
    return await this.projectsRepository.getProjectById(id);
  }

  async updateProject(id: string, updateProjectDto: UpdateProjectDto) {
    return await this.projectsRepository.updateProject(id, updateProjectDto);
  }
  
  async filterByCategory(categoryId: string) {
    return await this.projectsRepository.filterProjectsByCategory(categoryId);
  }

  async removeProject(id: string) {
    return await this.projectsRepository.deleteProject(id);
  }
}
