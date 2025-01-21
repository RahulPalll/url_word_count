import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

// Multer configuration
const storage = diskStorage({
  destination: './uploads', // Path to save files
  filename: (req, file, callback) => {
    const uniqueSuffix = `${uuidv4()}${extname(file.originalname)}`;
    callback(null, uniqueSuffix);
  },
});

@ApiTags('file-upload') // Swagger tag for grouping
@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('single')
  @ApiOperation({ summary: 'Upload a single file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { storage }))
  uploadSingle(@UploadedFile() file: Express.Multer.File) {
    return this.fileUploadService.handleFile(file);
  }

  @Post('multiple')
  @ApiOperation({ summary: 'Upload multiple files' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Files to upload',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', 5, { storage }))
  uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    return this.fileUploadService.handleFiles(files);
  }
}
