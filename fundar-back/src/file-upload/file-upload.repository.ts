import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as Cloudinary } from 'cloudinary';
import toStream from 'buffer-to-stream';

@Injectable()
export class FileUploadRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = Cloudinary.uploader.upload_stream(
        // Subo la imagen al cloud
        {
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result!);
          }
        },
      );
      toStream(file.buffer).pipe(upload); // Convierto el buffer del archivo en un stream usando toStream(file.buffer)
    });
  }
}
