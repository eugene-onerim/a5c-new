import { Injectable } from '@nestjs/common';
import { DocumentSummaryResponse } from './dto/upload-document.dto';
import { DocumentParserService } from './document-parser.service';
import { OpenAIService } from './openai.service';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly documentParser: DocumentParserService,
    private readonly openAI: OpenAIService,
  ) {}

  async processDocument(file: Express.Multer.File): Promise<DocumentSummaryResponse> {
    // Extract content from document
    const content = await this.documentParser.parseDocument(file);

    // Generate summary using OpenAI
    const summary = await this.openAI.generateSummary(content);

    return {
      filename: file.originalname,
      content: content,
      summary: summary,
      processedAt: new Date().toISOString(),
      size: file.size,
      mimeType: file.mimetype,
    };
  }
}