import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  constructor(private projectsRepository: ProjectsRepository) {}

  createProject(createProjectDto: CreateProjectDto) {
    return this.projectsRepository.createProject(createProjectDto);
  }

  getProjects() {
    return this.projectsRepository.getProjects();
  }

  getProjectById(id: string) {
    return this.projectsRepository.getProjectById(id);
  }

  updateProject(id: string, updateProjectDto: UpdateProjectDto) {
    return this.projectsRepository.updateProject(id, updateProjectDto);
  }
  
  filterByCategory(categoryId: string) {
    return this.projectsRepository.filterProjectsByCategory(categoryId);
  }

  removeProject(id: string) {
    return this.projectsRepository.deleteProject(id);
  }
}
