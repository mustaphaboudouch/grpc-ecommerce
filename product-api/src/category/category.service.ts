import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category as CategoryPb } from '../stubs/product/message';
import { Category, CategoryDocument } from './entity/category.schema';
import { CreateCategoryDto, UpdateCategoryDto } from './entity/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  toCategoryPb(category: Partial<CategoryDocument>): CategoryPb {
    return {
      id: category._id.toString(),
      name: category.name,
      description: category.description,
    };
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const createdCategory = new this.categoryModel(createCategoryDto);
      return await createdCategory.save();
    } catch (error) {
      if ((error?.message as string)?.includes('E11000')) {
        throw new Error(`${createCategoryDto.name} name is taken`);
      }
    }
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async find(id: string | number, name: string) {
    const category = await this.categoryModel.findOne({ id, name });

    if (!category) {
      throw new Error(`category with id ${id} or name ${name} not found`);
    }

    return category;
  }

  async updateCategory(
    { id, name }: { name?: string; id?: string },
    uCategory: UpdateCategoryDto,
  ): Promise<Category> {
    let category: CategoryDocument;
    if (id) {
      category = await this.categoryModel.findById(id);
    } else {
      category = await this.categoryModel.findOne({ name });
    }

    if (!category) {
      throw new Error(`category with id ${id} or name ${name} not found`);
    }

    Object.assign(category, uCategory);

    await category.save();
    return category;
  }

  async deleteCategory(id: number | string) {
    const category = await this.categoryModel.findOneAndDelete({
      name: { $regex: `^${id}$`, $options: 'i' },
    });

    if (!category) {
      throw new Error(`category with name ${id} not found`);
    }

    return category;
  }
}
