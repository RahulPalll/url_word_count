import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { ArticleService } from './article.service';

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('process')
  @ApiBody({
    schema: {
      example: { urls: ['https://example.com', 'https://example2.com'] },
    },
  })
  async processArticles(@Body('urls') urls: string[]): Promise<string> {
    await this.articleService.processArticles(urls);
    return 'Processing initiated. Check logs for details.';
  }
}
