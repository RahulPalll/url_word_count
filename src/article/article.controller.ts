import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProcessArticlesDto } from './dto/process-articles.dto';

@ApiTags('Articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Post('process')
  @ApiBody({
    schema: {
      example: { urls: ['https://example.com', 'https://example2.com'] },
    },
  })
  async processArticles(
    @Body() processArticlesDto: ProcessArticlesDto,
  ): Promise<string> {
    try {
      await this.articleService.processArticles(processArticlesDto.urls);
      return 'Processing initiated. Check logs for details.';
    } catch (error) {
      throw new BadRequestException(error.message || 'Processing failed');
    }
  }
}
