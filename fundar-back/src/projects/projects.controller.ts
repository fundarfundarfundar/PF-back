import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiTags, ApiBody, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Project } from './entities/project.entity';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
    @ApiResponse({
    status: 200,
    description: 'List all projects',
    type: [Project],
  })
  async getProjects() {
  return await this.projectsService.getProjects();
  }

  @Get('filter')
  @ApiQuery({ name: 'category', required: true, description: 'Category to filter projects' })
  @ApiResponse({
    status: 200,
    description: 'List projects by category',
    type: [Project],
  })
  async filterProjects(@Query('category') category: string) {
    return await this.projectsService.filterByCategory(category);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiResponse({
    status: 200,
    description: 'Get project by ID',
    type: Project,
  })
  async getProjectById(@Param('id') id: string) {
    return await this.projectsService.getProjectById(id);
  }

  @Post()
   @ApiBody({
    type: CreateProjectDto,
    examples: {
      example1: {
        summary: 'Basic project creation',
        value: {
          title: 'Clean Water Initiative',
          description: 'Providing clean water to rural areas.',
          category: 'Health',
          goalAmount: 10000,
          startDate: '2025-01-01',
          endDate: '2025-06-01'
        }
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Project created successfully',
    type: Project,
  })
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectsService.createProject(createProjectDto);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiBody({
    type: UpdateProjectDto,
    examples: {
      example1: {
        summary: 'Update project details',
        value: {
          title: 'Clean Water Initiative Updated',
          description: 'Updated description.',
          category: 'Health',
          goalAmount: 12000,
          startDate: '2025-01-01',
          endDate: '2025-07-01'
        }
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Project updated successfully',
    type: Project,
  })
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectsService.updateProject(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Project ID' })
  @ApiResponse({
    status: 204,
    description: 'Project deleted successfully',
  })
  async removeProject(@Param('id') id: string) {
    return await this.projectsService.removeProject(id);
  }
}
