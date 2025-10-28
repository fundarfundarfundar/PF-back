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
    summary: 'Agrega una imagen del proyecto buscandolo por su UUID',
  })
  @ApiResponse({
    status: 200,
    description: 'Imágen agregada',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  // @UseGuards(AuthGuard)
  async uploadProduct(
    @Param('id') userId: string,
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
    @Body('productId') productId: string,
  ) {
    return this.fileUploadService.uploadProductImage(file, productId, userId);
  }
}
