import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    
    if (!apiKey) {
      console.warn('OPENAI_API_KEY not found. AI summarization will be disabled.');
      this.openai = null;
    } else {
      this.openai = new OpenAI({
        apiKey: apiKey,
      });
    }
  }

  async generateSummary(content: string): Promise<string> {
    if (!this.openai) {
      return 'AI summarization is not available. Please configure OPENAI_API_KEY environment variable.';
    }

    if (!content || content.trim().length === 0) {
      throw new BadRequestException('Document content is empty or could not be extracted');
    }

    // Truncate content if too long (GPT-3.5 has token limits)
    const maxLength = 12000; // Approximate token limit consideration
    const truncatedContent = content.length > maxLength 
      ? content.substring(0, maxLength) + '...[truncated]'
      : content;

    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that creates concise, informative summaries of documents. Provide a clear and structured summary that captures the main points, key findings, and important details.',
          },
          {
            role: 'user',
            content: `Please provide a comprehensive summary of the following document content:\n\n${truncatedContent}`,
          },
        ],
        max_tokens: 500,
        temperature: 0.3,
      });

      const summary = response.choices[0]?.message?.content;
      
      if (!summary) {
        throw new Error('No summary generated');
      }

      return summary.trim();
    } catch (error) {
      console.error('OpenAI API error:', error);
      
      if (error.status === 401) {
        throw new BadRequestException('Invalid OpenAI API key');
      } else if (error.status === 429) {
        throw new BadRequestException('OpenAI API rate limit exceeded. Please try again later.');
      } else if (error.status === 500) {
        throw new BadRequestException('OpenAI service is currently unavailable');
      }
      
      throw new BadRequestException('Failed to generate summary using AI');
    }
  }
}