import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getProducts(
    page: number,
    limit: number,
    search?: string,
    filter?: Record<string, string>,
  ): Promise<any> {
    if (!page || !limit) {
      throw new BadRequestException(
        'Page and limit are required query parameters.',
      );
    }

    const offset = (page - 1) * limit;

    // Initialize where clause and parameter array
    let whereClause = '1=1'; // Default where clause
    const parameters: any[] = [];

    // Add search functionality
    if (search) {
      whereClause += ' AND (p.name LIKE $1)';
      parameters.push(`%${search}%`);
    }

    // Add filters
    if (filter?.category) {
      whereClause += ' AND c.name = $2';
      parameters.push(filter.category);
    }
    if (filter?.vendor) {
      whereClause += ' AND v.name = $3';
      parameters.push(filter.vendor);
    }

    // Execute raw SQL query
    const [data, total] = await this.productRepository.query(
      `
      SELECT p.*, c.name AS category_name, v.name AS vendor_name
      FROM product p
      JOIN category c ON p.category_id = c.id
      JOIN vendor v ON p.vendor_id = v.id
      WHERE ${whereClause}
      ORDER BY p.id ASC
      LIMIT $${parameters.length + 1} OFFSET $${parameters.length + 2}
      `,
      [...parameters, limit, offset], // Pass parameters as an array
    );

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async getPaginatedProducts(page: number, limit: number): Promise<any> {
    const offset = (page - 1) * limit;

    // with orm

    // const [data, total] = await this.productRepository
    //   .createQueryBuilder('product')
    //   .select([
    //     'product.id',
    //     'product.name',
    //     'product.price',
    //     'product.category_id',
    //     'product.vendor_id',
    //   ])
    //   .orderBy('product.id', 'ASC')
    //   .skip(offset) // Offset for pagination
    //   .take(limit) // Limit for pagination
    //   .getManyAndCount(); // Fetch data and count in one query

    // Execute with raw SQL
    const data = await this.productRepository.query(
      `
      SELECT * FROM product
      ORDER BY id ASC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset], // Pass parameters as an array
    );

    const total = await this.productRepository.query(
      `SELECT COUNT(*) FROM product`,
    );

    return {
      data,
      total: parseInt(total[0].count, 10),
      page,
      limit,
    };
  }
}
