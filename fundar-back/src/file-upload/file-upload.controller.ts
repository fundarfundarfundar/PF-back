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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Subir Imagen - Endpoints')
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Agrega una imagen a un user o project buscándolo por su UUID',
  })
  @ApiResponse({
    status: 200,
    description: 'Imagen agregada',
  })
  @ApiResponse({
    status: 400,
    description: 'Archivo inválido o error de validación',
  })
  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('file'))
  // @UseGuards(AuthGuard)
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200 * 1024,
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
}
