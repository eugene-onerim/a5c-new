import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { OpenAIService } from './openai.service';
import { DocumentParserService } from './document-parser.service';

@Module({
  controllers: [DocumentsController],
  providers: [DocumentsService, OpenAIService, DocumentParserService],
})
export class DocumentsModule {}