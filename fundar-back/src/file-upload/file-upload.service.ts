import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async uploadProductImage(
    file: Express.Multer.File,
    projectId: string,
    userId: string,
  ) {
    const productExists = await this.projectRepository.findOneBy({
      id: projectId,
    });

    if (!productExists) {
      throw new NotFoundException('El producto no existe!');
    }

    const uploadedImage = await this.fileUploadRepository.uploadImage(file);

    await this.projectRepository.update(projectId, {
      imageUrl: uploadedImage.secure_url,
    });

    const updatedProduct = await this.projectRepository.findOneBy({
      // Busco de vuelta el mismo producto, esta vez con la imagen nueva ya subida
      id: projectId,
    });

    return updatedProduct; // Lo retrono
  }
}
