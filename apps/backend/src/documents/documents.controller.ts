import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { UploadDocumentDto, DocumentSummaryResponse } from './dto/upload-document.dto';

@ApiTags('documents')
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, callback) => {
      const allowedMimes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
      ];
      
      if (allowedMimes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(new BadRequestException('Only PDF and Word documents are allowed'), false);
      }
    },
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Document file upload',
    type: UploadDocumentDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Document processed successfully',
    type: DocumentSummaryResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid file type or size',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error during processing',
  })
  async uploadDocument(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<DocumentSummaryResponse> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      const result = await this.documentsService.processDocument(file);
      return result;
    } catch (error) {
      console.error('Error processing document:', error);
      throw new InternalServerErrorException('Failed to process document');
    }
  }
}