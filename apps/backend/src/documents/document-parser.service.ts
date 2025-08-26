import { Injectable, BadRequestException } from '@nestjs/common';
import * as mammoth from 'mammoth';
import * as pdf from 'pdf-parse';

@Injectable()
export class DocumentParserService {
  async parseDocument(file: Express.Multer.File): Promise<string> {
    const { mimetype, buffer } = file;

    try {
      switch (mimetype) {
        case 'application/pdf':
          return await this.parsePDF(buffer);
        
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        case 'application/msword':
          return await this.parseWord(buffer);
        
        default:
          throw new BadRequestException(`Unsupported file type: ${mimetype}`);
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to parse document content');
    }
  }

  private async parsePDF(buffer: Buffer): Promise<string> {
    try {
      const data = await pdf(buffer);
      return data.text;
    } catch (error) {
      throw new BadRequestException('Failed to parse PDF document');
    }
  }

  private async parseWord(buffer: Buffer): Promise<string> {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } catch (error) {
      throw new BadRequestException('Failed to parse Word document');
    }
  }
}