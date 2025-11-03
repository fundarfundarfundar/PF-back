import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
// import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('file'))
  // @UseGuards(AuthGuard)
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 500 * 1024,
            message: 'El tamaño de la imagen no debe exceder los 200 kb!',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/i,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('uuid') uuid: string,
  ) {
    return this.fileUploadService.uploadImage(file, uuid);
  }

  @Post('uploadTempImage')
@UseInterceptors(FileInterceptor('file'))
async uploadTempImage(
  @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 500 * 1024,
          message: 'El tamaño de la imagen no debe exceder los 200 kb!',
        }),
        new FileTypeValidator({
          fileType: /(jpg|jpeg|png|webp)$/i,
        }),
      ],
    }),
  )
  file: Express.Multer.File,
) {
  const imageUrl = await this.fileUploadService.uploadTempImage(file);
  return {
    statusCode: 201,
    message: 'Imagen subida exitosamente',
    imageUrl,
  };
}
}
