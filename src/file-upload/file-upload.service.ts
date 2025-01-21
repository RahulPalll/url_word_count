import { Injectable, Logger } from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class FileUploadService {
  private readonly logger = new Logger(FileUploadService.name);

  handleFile(file: Express.Multer.File) {
    this.logger.log(`File uploaded: ${file.originalname}`);
    return {
      message: 'File uploaded successfully',
      file: {
        originalName: file.originalname,
        filename: file.filename,
        path: file.path,
      },
    };
  }

  handleFiles(files: Express.Multer.File[]) {
    this.logger.log(`Files uploaded: ${files.length}`);
    return {
      message: 'Files uploaded successfully',
      files: files.map((file) => ({
        originalName: file.originalname,
        filename: file.filename,
        path: file.path,
      })),
    };
  }
}
