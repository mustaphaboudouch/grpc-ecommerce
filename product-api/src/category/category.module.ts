import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfanityService } from 'src/profanity/profanity.service';
import { AuthModule } from 'src/auth/auth.module';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category, CategorySchema } from './entity/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
    AuthModule,
  ],
  providers: [CategoryService, ProfanityService],
  controllers: [CategoryController],
})
export class CategoryModule {}
