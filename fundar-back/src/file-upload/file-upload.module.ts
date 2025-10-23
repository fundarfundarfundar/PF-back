import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { Project } from 'src/projects/entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileUploadRepository } from './file-upload.repository';
import { CloudinaryConfig } from 'config/cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [FileUploadController],
  providers: [FileUploadService, FileUploadRepository, CloudinaryConfig],
})
export class FileUploadModule {}
