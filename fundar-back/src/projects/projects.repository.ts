import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import * as data from './utils/seeders/data.json';

@Injectable()
export class ProjectsRepository {

  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
     @InjectRepository(Category) private categoriesRepository: Repository<Category>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto) {
    try {
      const newProject = this.projectsRepository.create(createProjectDto);
      return await this.projectsRepository.save(newProject);    
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error creating project');
    }
  }

  async addProjects() {
  try {

    const categories = await this.categoriesRepository.find();

    type ProjectSeed = {
      title: string;
      resume: string,
      description: string;
      country: string;
      goalAmount: number;
      currentAmount: number;
      imageUrls: string[];
      status: 'active' | 'inactive' | 'completed';
      category: string; 

    };

       for (const element of (data as any).default as ProjectSeed[]) {
        const relatedCategory = categories.find(
          (category) => category.name === element.category,
        );
   
      if (!relatedCategory) {
        throw new NotFoundException(
          `Categoría '${element.category}' no encontrada para el proyecto '${element.title}'`,
        );
      }

      const project = new Project();
      project.title = element.title;
      project.resume = element.resume;
      project.description = element.description;
      project.country = element.country;
      project.goalAmount = element.goalAmount;
      project.currentAmount = element.currentAmount;
      project.imageUrls = element.imageUrls;
      project.status = element.status;
      project.category = relatedCategory;

      await this.projectsRepository
        .createQueryBuilder()
        .insert()
        .into(Project)
        .values(project)
        .orUpdate(['resume', 'description', 'goalAmount'], ['title'])
        .execute();
    }
    return 'Proyectos agregados';
  } catch (error) {
      console.error(error); 
      throw new InternalServerErrorException('Error al agregar proyectos');
  }
  }

  async getProjects() {
    try {
      return await this.projectsRepository.find();     
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error fetching projects');
    }
  }

  async getProjectById(id: string) {
    try {
      return await this.projectsRepository.findOneBy({ id });
    } catch (error) {
       if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error fetching project');
    }
  }

  async updateProject(id: string, updateProjectDto: UpdateProjectDto) {
    try {
      await this.projectsRepository.update(id, updateProjectDto);
      return await this.projectsRepository.findOneBy({ id });    
    } catch (error) {
       if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error updating project');
    }
  }

  async filterProjectsByCategory(categoryId: string) {
    try {
      return await this.projectsRepository.find({
        where: { categoryId },
      });   
    } catch (error) {
        throw new InternalServerErrorException(error.message || 'Error filtering projects');
    }
  }

  async deleteProject(id: string) {
    try {
      return await this.projectsRepository.delete(id);     
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(error.message || 'Error deleting project');
    }
  }
}
