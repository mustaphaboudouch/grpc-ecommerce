import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfanityService } from 'src/profanity/profanity.service';
import { AuthModule } from 'src/auth/auth.module';
import { Product, ProductSchema } from './entity/product.schema';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    AuthModule,
  ],
  providers: [ProductService, ProfanityService],
  controllers: [ProductController],
})
export class ProductModule {}
