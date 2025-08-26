import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadDocumentDto {
  @ApiProperty({
    description: 'The uploaded document file',
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  file: Express.Multer.File;
}

export class DocumentSummaryResponse {
  @ApiProperty({
    description: 'The original filename of the uploaded document',
    example: 'document.pdf',
  })
  @IsString()
  filename: string;

  @ApiProperty({
    description: 'The extracted content from the document',
    example: 'This is the content of the document...',
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'AI-generated summary of the document',
    example: 'This document discusses...',
  })
  @IsString()
  summary: string;

  @ApiProperty({
    description: 'Timestamp when the document was processed',
    example: '2025-08-26T10:40:00Z',
  })
  @IsString()
  processedAt: string;

  @ApiProperty({
    description: 'Document file size in bytes',
    example: 1024,
  })
  size: number;

  @ApiProperty({
    description: 'Document MIME type',
    example: 'application/pdf',
  })
  @IsString()
  mimeType: string;
}