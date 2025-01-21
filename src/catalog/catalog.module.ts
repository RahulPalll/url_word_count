import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Vendor } from './entities/vendor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Vendor])],
  providers: [CatalogService],
  controllers: [CatalogController],
})
export class CatalogModule {}
