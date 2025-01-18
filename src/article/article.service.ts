import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import axios from 'axios';
import * as fs from 'fs/promises';

@Injectable()
export class ArticleService {
  private readonly logger = new Logger(ArticleService.name);
  private readonly concurrency = 3;

  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async processArticles(urls: string[]): Promise<void> {
    const results = [];
    const queue = urls.slice();

    const workers = Array(this.concurrency)
      .fill(null)
      .map(() => this.worker(queue, results));

    await Promise.all(workers);
    await this.saveResults(results);
  }

  private async worker(
    queue: string[],
    results: { url: string; wordCount: number }[],
  ) {
    while (queue.length) {
      const url = queue.shift();
      if (!url) break;

      this.logger.log(`Starting download for: ${url}`);
      try {
        const response = await axios.get(url);
        const wordCount = this.countWords(response.data);
        results.push({ url, wordCount });
        this.logger.log(`Completed: ${url} with ${wordCount} words.`);
        await this.articleRepository.save({ url, wordCount, failed: false });
      } catch (error) {
        this.logger.error(`Failed to process: ${url}`, error.stack);
        results.push({ url, wordCount: 0 });
        await this.articleRepository.save({ url, wordCount: 0, failed: true });
      }
    }
  }

  private countWords(content: string): number {
    return content.split(/\s+/).length;
  }

  private async saveResults(
    results: { url: string; wordCount: number }[],
  ): Promise<void> {
    const content = results.map((r) => `${r.url}, ${r.wordCount}`).join('\n');
    await fs.writeFile('results.txt', content);
    this.logger.log('Results saved to results.txt');
  }
}
