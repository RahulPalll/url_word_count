import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('products')
  @ApiQuery({ name: 'page', type: Number, required: true })
  @ApiQuery({ name: 'limit', type: Number, required: true })
  @ApiQuery({ name: 'search', type: String, required: false })
  @ApiQuery({ name: 'filter[category]', type: String, required: false })
  @ApiQuery({ name: 'filter[vendor]', type: String, required: false })
  async getProducts(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search?: string,
    @Query('filter') filter?: Record<string, string>,
  ) {
    return this.catalogService.getProducts(page, limit, search, filter);
  }

  @Get('products-pagination')
  @ApiQuery({ name: 'page', type: Number, required: true })
  @ApiQuery({ name: 'limit', type: Number, required: true })
  async getPaginatedProducts(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    if (!page || !limit) {
      throw new BadRequestException(
        'Page and limit are required query parameters.',
      );
    }
    return this.catalogService.getPaginatedProducts(page, limit);
  }
}
